---
layout: post
title: "Harnessed Agentic RL (02)：Polar 与黑盒 RL"
series: harnessed-rl
excerpt: "Polar 常被概括成一句「API 代理」，但它真正解决的是训练样本：如何在不打开 Harness 的前提下，把一次 Agent 运行还原成 token 级保真轨迹，让黑盒训练在数学上成立。"
---

## 一个容易误解的点：Polar 不只是 API Proxy
Polar 常被概括成一句话：在 Harness 和推理服务之间插一个代理，让任意 Agent 框架不改代码就能接上 RL。这个说法没错，但它解释不了另一件事——**为什么这种「黑盒训练」在数学上仍然成立**。

不改代码只是接口层的优化。真正影响的是训练的样本：从「一次 LLM 请求」怎么恢复「一条 token 级保真轨迹」。Polar 的核心问题，这样理解可能更准确：

> Can we train Agents with RL on Any Harness without opening it? 

「Any Harness」靠 API 边界解决，「without opening it」则必须靠 token 保真兜底。前者是工程，后者才是 Polar 的核心。

## request 级样本为什么失效
最保守的做法是 `per_request`：每一次模型调用单独成一条 trace。它对单次调用无损，但会把一次完整长程任务碎片化——coding harness 解一道题可以产生数百条这样的碎片样本。

碎片化带来两个后果。第一，训练器要处理的样本量x10x100增长；第二，信用分配噪声。Polar做了一个实验很说明问题：把 session 级 outcome reward 广播到每条 request 级 trace 上，出现了明显的 reward hacking。原因是单条请求可能因为「碰巧接在成功轨迹里」而拿到整段任务的奖励，模型于是学会hacking采样路径，而不是解决问题。

样本单位不是实现细节，它直接决定了梯度在为什么东西投票。

## 一条不变量撑起黑盒训练
Polar 的 correctness 准则：

> **每个训练样本的 token，都必须来自 rollout 时行为策略的真实采样。**

围绕这个准则，有三个机制。

**一，代理负责「看见」。** Harness 的 base URL 指向 Gateway 后，代理依次做四件事：识别协议（Anthropic Messages、OpenAI Chat、OpenAI Responses、Google generateContent）、归一化成 OpenAI Chat 形状并强制 `logprobs=true`、记录 prompt token IDs / sampled response token IDs / logprob、再还原成 Harness 期望的协议。流式请求会被换成「先拿完整响应，再合成 SSE」，Harness 无感知。

**二，合并必须匹配前缀。** `prefix_merging` 不假设整个 session 是一条对话。只有当后一次请求的 prompt 与前一条链的末尾满足严格 token 前缀关系、且消息级分组键匹配时，才允许接上；遇到上下文压缩、子 agent、并行分支，就自然断成新链。

**三，loss mask 守住边界。** 合并后的轨迹里，assistant 的历史内容不能直接用服务端渲染的 canonical token，必须换回当时采样出的原始 token；夹在中间的 interstitial token 被 mask 掉，logprob 用合成值占位，只为保持数组对齐。

结果是：轨迹变长、样本变少，但每个参与训练的 token 都「确实发生过」。这也是 Polar 与「把日志拼一拼」的本质区别。

<img src="/images/2026-10-27-Harnessed-Agentic-RL-Polar/traj_build.webp" alt="这是图片" title="Trajectory Reconstruction" width="1400" height="753" loading="eager" decoding="async">

## 为这条不变量付出的系统代价
Token 保真不是免费的。它要求代理、运行时、评测都在同一个 session 生命周期里协作，Polar 因此把 rollout 做成服务：Rollout Server 负责把任务展开成多个 session、调度、持久化结果、接收回调；Gateway 负责启动 runtime、运行 Harness、构建轨迹、执行评测、回收资源。

Gateway 内部把生命周期拆成四段 worker pool：INIT（起容器、装依赖）、READY（预热好的 runtime 排队）、RUNNING（执行 Harness）、POSTRUN（重建轨迹、评测、回调、清理）。这样 CPU 密集的环境准备和长尾评测不会堵住 GPU 上的 Agent 执行；session 超时后也仍然进入 POSTRUN，把已经捕获的部分轨迹抢救回来。

<img src="/images/2026-10-27-Harnessed-Agentic-RL-Polar/polar_arch.webp" alt="这是图片" title="Polar Architecture" width="1400" height="902" loading="lazy" decoding="async">

训练框架因此可以完全独立：Slime 只需要提交任务、接回调、把 trace 转成 Sample。Polar 不替代 trainer，它只提供「可训练的轨迹」这一层底座。

## 数字背后的真正信号
实验用同一个 Qwen3.5-4B、同一套 GRPO、SWE-Gym 293 个任务，只换 Harness：

| Harness | Base | Polar RL | Gain |
|------|------|------|------|
| Codex | 3.8% | 26.4% | +22.6 |
| Claude Code | 29.8% | 34.6% | +4.8 |
| Qwen Code | 34.6% | 35.2% | +0.6 |
| Pi | 34.2% | 40.4% | +6.2 |

最容易读错的是 Codex 那 22.6 分。它不是「Polar 提升了模型能力」，而是「模型第一次在自己不熟悉的执行协议上被优化」——Qwen 原本不是 Codex-native policy，Polar 把奖励绑到了 Codex 路径上真实采样的 token，收益自然最大。Qwen Code 只涨 0.6，则因为基座本来就与这套 Harness 对齐。

真正值得记住的结论是：**同一模型、同一算法，换一个 Harness 可以差出二十多分。** Harness 不是外壳，它是能力的一部分。

效率上，同样三步训练，`prefix_merging` 把 trainer 更新从 1,185 条压到 218 条，耗时从 189.5 分钟降到 35.2 分钟（5.39x），rollout GPU 利用率从 20.4% 提到 87.7%。离线场景也能复用：Qwen3.5-122B-A10B 在 pi harness 上跑 1,638 次，按 SWE-Bench 测试过滤后留下 504 条（30.8%），约 64 GPU-hours。

<img src="/images/2026-10-27-Harnessed-Agentic-RL-Polar/prefix_merging_redraw.webp" alt="GPU 利用率：两种执行模式对比" title="GPU 利用率" width="1400" height="1080" loading="lazy" decoding="async">

*上：trainer GPU 利用率；下：rollout GPU 利用率。曲线为近似示意。*

<img src="/images/2026-10-27-Harnessed-Agentic-RL-Polar/prefix_merging_concept.webp" alt="同一工作负载的耗时对比" title="耗时对比" width="1400" height="720" loading="lazy" decoding="async">

*同一工作负载，`prefix_merging` 把训练耗时从 189.5 分钟压到 35.2 分钟。*

## Polar 放弃了什么
把 Harness 当黑盒，换来的是行为保真，代价是环境透明。代理只能看到模型调用，看不到 Harness 内部的状态迁移、工具副作用和中间决策；需要 dense process reward 的任务，仅靠 token 流量很难还原。

Polar 自己也留下了两个未解口子：per-request 的信用分配会诱发 reward hacking；session 级归一化和过程奖励仍在路线图上。这意味着 Polar 目前最适合的是**结果可验证**的任务（SWE、测试通过与否），而不是奖励需要细粒度拆解的场景。

## 结论
Polar 的贡献不是「多了一个兼容层」，而是证明了：只要样本的 token 保真，Harness 就可以是一个不透明的环境。代理负责看见，合并负责重建，loss mask 负责守真——三者合起来，才让「不打开黑盒」从一句口号变成可训练的系统。

论文：<https://arxiv.org/abs/2605.24220>  
代码：<https://github.com/NVIDIA-NeMo/ProRL-Agent-Server>  
数据：<https://huggingface.co/datasets/nvidia/polar-swegym-pi-qwen35-122b-a10b-trajectories>

## Citation
Please cite this work as:

> Claire. "Harnessed Agentic RL: Polar and Black-box RL". Claire-notes (Oct 2026). https://claire-notes.github.io/Harnessed-Agentic-RL-Polar

Or use the BibTeX citation:

```bibtex
@article{Claire-HarnessAgenticRL-Polar,
  title = {Harnessed Agentic RL: Polar and Black-box RL},
  author = {Claire (qingYe)},
  journal = {claire-notes.github.io},
  year = {2026},
  month = {October},
  url = "https://claire-notes.github.io/Harnessed-Agentic-RL-Polar"
}
```
