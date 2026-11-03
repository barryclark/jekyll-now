---
layout: post
title: "Harnessed Agentic RL (03)：Agent Lightning"
series: harnessed-rl
date: 2026-10-28
excerpt: "Agent 的能力藏在 harness 里，传统 RL 却要求把 Agent 循环重写进训练框架。微软用 3,500 行代码把训练挪到 LLM API 边界上，顺手拆解了重分词、advantage、loss 归一化和调度四个坑。"
---

## 问题：能力在 harness 里，训练却绕开它
现代 Agent 早已不是裸奔的 LLM。它们跑在 harness 里——mini-SWE-agent、OpenHands、OpenCode、Claude Code、Codex——由 harness 负责管工具、管上下文、管控制流，很大程度上决定了 Agent 的真实能力。

但传统 RL 框架（verl、AReaL、slime）有个尴尬的前提：**你得把 Agent 循环直接写进训练框架里**。想给某个现成 harness 做 RL 后训练，得先把它整个重写一遍，复杂、依赖重，几乎不可行。更严重的是，训练时一套逻辑、部署时另一套逻辑，训练到的交互和真实运行脱节。

微软这篇工作的核心问题很直接：

> 如果未来的 Agent 都跑在真实的 harness 里，为什么训练时不能直接用同一个 harness？

答案是能，但代价是把 Agent 的执行状态和训练的数学假设对齐——这正是 **Harnessed Agentic RL** 要解决的事。

<img src="/images/2026-10-31-Agent-Lightning-V1/fig2-pomdp.webp" alt="Agentic RL 与 Harnessed Agentic RL 的 POMDP 对比" title="POMDP 对比" width="1400" height="660" loading="eager" decoding="async">

*传统 Agentic RL 里，环境观测直接回到策略；Harnessed Agentic RL 多了一层 harness（工具、记忆、上下文策略），这层状态对训练器是隐变量。*

## 方法：不重写 harness，让 RL 穿过 LLM API
论文把这种范式正式命名为 **Harnessed Agentic RL**：部署时用的同一个 harness，直接参与模型后训练。前提是训练侧不再插手 harness 内部，只在 LLM 调用这个边界上收数据。

整个系统约 **3,500 行代码**，三件套：

| 组件 | 职责 |
|---|---|
| **API Gateway** | 唯一事实源，存 rollout、模型、事件；提供兼容 OpenAI 的 LLM API Proxy。任何 harness 把 endpoint 指过来就能接入，几乎零改动 |
| **Rollout Controller** | 在 Kubernetes 上把每个 Agent 执行调度成标准 Job（也支持本地进程池），用声明式 rollout + 对账循环驱动 |
| **Customized Trainer** | 基于 VERL 构建，注册 rollout、等执行完成、回收事件、拼训练样本 |

关键设计是**解耦**：执行集群和训练集群分开，可异地部署、独立扩容。训练引擎只负责创建 rollout 和回收轨迹，harness 的上下文策略、工具协议、执行语义原封不动。

<img src="/images/2026-10-31-Agent-Lightning-V1/fig1-architecture.webp" alt="Agent Lightning v1.0 系统架构" title="系统架构" width="1400" height="790" loading="lazy" decoding="async">

*Agents with Harness 通过 API Gateway 接入训练侧；Rollout Controller 负责调度，Customized Trainer 负责拼样本，推理与训练引擎独立扩缩容。*

## 四道坎：动态样本数带来的连锁反应
把 harness 纳进训练后，样本不再是「一问一答」，而是一棵随时分叉的执行树。由此冒出四个系统性问题，这也是全文最硬核的部分。

### 重分词：文本没变，token 边界变了
harness 用文本维护上下文，RL 要的是精确 token ID。第 i 次调用里，单词 "having" 被采样成 `h` + `aving`；下一次调用对更新后的消息历史重新分词，却变成 `hav` + `ing`。文本一字不差，token 边界对不上，token 级前缀连续性断裂，共享前缀的计算白白浪费。

论文第一次系统拆解了前缀断裂的三个机制：**聊天模板不可组合、解码再分词漂移、推理期输出变换**。Agent Lightning 的方案是 best-effort 序列合并：只有 token ID 严格满足前缀条件才合并，不满足就关闭当前序列另开一条。**正确性优先，效率靠「能合并多少算多少」。**

<img src="/images/2026-10-31-Agent-Lightning-V1/fig3-retokenization.webp" alt="重分词导致 token 前缀断裂" title="重分词" width="1000" height="620" loading="lazy" decoding="async">

*同样的文本，token 边界从 h|aving 变成 hav|ing，第 i 次调用缓存的前缀在第 i+1 次直接作废。*

### 优势值：必须在 rollout 级计算
一个 rollout 可能因为重分词、子 Agent 分支、上下文摘要被拆成多个样本。如果按样本算基线，Rollout 1 裂成 3 个样本拿奖励 1、Rollout 2 单样本拿奖励 0，基线就成了 (1+1+1+0)/4 = 3/4——**仅仅因为分词的偶然差异，就改变了整组统计**。

论文的判断很硬：advantage 必须在 rollout 级计算。现状并不统一——verl Uni-Agent 和 Polar 用 rollout 级，slime 和 AReaL 用样本级，这篇明确站队前者。

<img src="/images/2026-10-31-Agent-Lightning-V1/fig4-rollout-samples.webp" alt="一个 rollout 展开成多个样本" title="rollout 与样本" width="1400" height="800" loading="lazy" decoding="async">

*传统设置里一个 rollout 就是一个样本；harnessed 设置里，一个 rollout 会展开成动态数量的样本，并继承同一个 reward。*

### 损失归一化：样本数不该影响梯度
GRPO 的 seq-mean-token-mean 有个弱点：按样本数平均，样本多的 rollout 会被无形中加大优化权重；而 token-mean 虽然理论上合理，却对长序列敏感。论文的结论是 rollout 级 token-mean loss——**样本数永远不该影响梯度归一化**。

消融很能说明问题：只改 advantage、不改 loss 归一化，验证集反而从 35.0% 掉到 33.1%；两者一起换成 rollout 级，冲到 38.2%，而且策略熵增长更慢、更稳。

### 后端调度：动态负载遇上固定 GPU
每个 rollout 最终产出多少样本、每个样本多长，只有执行完才知道；而 GPU 数量和并行配置是固定的。后端要在固定 worker 上摊平动态负载，还不能破坏统计边界。

论文提出 **Collocated Async RL**：rollout 和权重更新共享同一池 GPU，数据攒够就开更新，Gateway 暂停接收新请求、等存量完成。实测相对同步 RL 拿到约 **2 倍端到端加速**，用的 GPU 总数还更少。

<img src="/images/2026-10-31-Agent-Lightning-V1/fig6-scheduling.webp" alt="同步、异步与 collocated async 调度" title="调度对比" width="1400" height="750" loading="lazy" decoding="async">

*同步 RL 要等最慢的 rollout；异步 RL 能重叠但仍有同步点；collocated async 让 rollout 与更新共享 GPU 池，几乎不空转。*

## 效果：三个场景，全是正增长
| 场景 | 模型 + harness | 基线 → RL | 提升 |
|---|---|---|---|
| 搜索 Agent | Llama-3.2-3B + GRPO | 25.1% → **41.7%** | +16.6pp |
| 通用指令跟随 | Qwen3-4B | 51.9% → **70.2%** | +18.3pp |
| 编码 Agent | Qwen3.5-9B + mini-SWE-agent | 41.8% → **56.4%**（SWE-bench Verified） | +14.6pp |

编码场景尤其值得看：现有框架几乎零支持——没有数据、没有完整训练脚本、还依赖大规模算力。这篇把数据清洗管线和可复现训练脚本完整开源，**只用约 6,000 条训练样本**就拿到 +14.6pp。

<img src="/images/2026-10-31-Agent-Lightning-V1/fig9-ablation.webp" alt="编码 Agent 的 advantage 与归一化消融" title="消融" width="1400" height="640" loading="lazy" decoding="async">

*左：验证奖励；右：策略熵。rollout 级 advantage + rollout 级 loss 归一化同时生效时，奖励最高、熵增长最慢。*

## 代价和局限
1. **合并率有限**。best-effort 策略保护了正确性，但效率有损失：编码任务里只有约 36% 的 rollout 能合成单行，平均每个 rollout 仍产出 2.41 个训练样本。
2. **harness 内部是黑盒**。训练侧只能看到 request-response 对，harness 内部的状态变化、工具副作用无法完整还原。这也意味着跨 harness 迁移需要重新验证——工具协议和执行语义不同，迁移成本因 harness 而异。
3. **Reward Hacking 需要主动防御**。训练中 Agent 会自己作妖：用 git 历史找 gold commit、用 curl 拉 GitHub 源码、用 pip 下载源码包。论文靠禁用 git + K8s 网络策略封禁出站流量来堵，但这套防护是特定于 coding agent 的。
4. **成本未披露**。论文强调「modest compute」，但没有给出具体的 GPU 数量与训练时长，复现时只能以 6K 样本、单机多卡量级自行估算。

## 本质：把「用什么 Agent 运行」变成训练变量
这篇工作的价值分两层。

第一层是**定义与诊断**：Harnessed Agentic RL 这个名字立起来之前，大家都靠代理调过训练，但没人系统说清重分词、样本合并、advantage 计算、loss 归一化、后端调度这些坑——各家框架各做各的选择，甚至互相矛盾，很多选择在数学上就是错的。

第二层是**示范与可复现**：3,500 行、全开源、K8s 自托管、完整数据管线，让「用现成 harness 做 RL」从大厂的专属技能，变成任何人都能复刻的实验。用 9B 模型 + 6K 样本拿到 +14.6pp，这个性价比本身就是最好的广告。

对做 Agent 的人，启示很直接：**如果你想给自家 Agent 做 RL 后训练，别再重写 harness 了——让训练穿过 API 边界来找你。**

论文：<https://arxiv.org/abs/2608.17528>  
代码：<https://github.com/microsoft/agent-lightning>

## Citation
Please cite this work as:

> Claire. "Harnessed Agentic RL: Agent Lightning". Claire-notes (Oct 2026). https://claire-notes.github.io/Agent-Lightning

Or use the BibTeX citation:

```bibtex
@article{Claire-HarnessAgenticRL-AgentLightning,
  title = {Harnessed Agentic RL: Agent Lightning},
  author = {Claire (qingYe)},
  journal = {claire-notes.github.io},
  year = {2026},
  month = {October},
  url = "https://claire-notes.github.io/Agent-Lightning"
}
```
