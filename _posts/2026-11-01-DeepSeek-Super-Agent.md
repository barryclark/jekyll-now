---

layout: post
title: "DeepSeek最新Super-agent：迈向更自主的 Agent 系统"
series: agent-arch
excerpt: "一个人的注意力只能同时跟进三五个 Session，这就是多任务的天花板。DeepSeek 的解法是把 Agent 从会话里解绑：Router 调度、Worker 执行、事件驱动、上下文分层落盘。"
---

<div class="callout">
<p>看到 DeepSeek Super-agent 的 Router + Worker 设计，和我 6 月份在 AI 搜上做的那版 Router 思路方向几乎一致。技术判断我们更早（4 个月），但工程化 DS 做得更深。</p>
<p>当时 AI 搜 Router 只上线了简单版 1.0，2.0 的设计因为意外没完整展开（技术设计稿未来得及大范围发出）。Router 2.0：</p>
<ol>
<li><strong>入口处</strong>：Router 只下发 Guidance——搜不搜、工具清单、模型档位、上下文策略，具体执行交给 Worker 自己跑。</li>
<li><strong>过程中</strong>：Router 侧挂 Watchdog，由观察流触发，Worker 跑偏了才介入。</li>
<li><strong>全程中</strong>：Router 自己负责隔离与摘要，并把开销压在搜索总延迟的 5–10% 以内。</li>
</ol>
<p>和 DeepSeek 一致的点：<u>Router 只派活不干活、先轻后重、摘要回传、自身不能成为性能瓶颈。</u></p>
<p>和 DeepSeek 差异的点：在场景——AI 搜要的是快又好，DS 面对的是长任务、大会话和异步批处理（速度有容忍度），<u>产品业务差异带来技术细节差异。</u></p>
<p><strong>总结：Router 架构方向是对的，技术趋势判断 / 架构也是对的。</strong></p>
</div>

DeepSeek：Super-agent 设计探索，迈向更自主的 Agent 系统

<div id="toc-slot"></div>

## 问题：多任务的上限卡在了人的注意力

现有 Agent 以单 Session 为单位，并行多任务要手动切换会话、手动管上下文。DeepSeek 观察到的数字是：**一个人通常只能同时跟进 3 到 5 个活跃 Session。**

单任务的上限取决于模型能力，多任务的上限取决于人的注意力。

CLI、MCP、外部连接器能接入更多消息，但仍解决不了三件事：同步阻塞、多任务上下文混乱、本地关机即停。所以 Super-agent 要做的不是「让 Session 更多」，而是把 Agent 从会话里解绑——跨会话保持上下文，同时推进多项任务且互不干扰。

<img src="/images/2026-11-01-DeepSeek-Super-Agent/fig1-session-vs-goal.webp" alt="Session 中心与 Goal 中心" title="两种组织方式" width="1000" height="480" loading="eager" decoding="async">

*每个渠道一个会话，上下文靠人脑缝合；一个 Agent 下挂多个任务，上下文跟着任务走。*

## 方法：Router + Worker 双层架构

设计目标四个词：连续、高效、主动、持久。

<img src="/images/2026-11-01-DeepSeek-Super-Agent/fig5-goals.webp" alt="四个基础特征" title="四个特征" width="1000" height="420" loading="lazy" decoding="async">

*单会话 Agent 一个都给不全。*

**Router** 负责理解意图、管理全局上下文、分派任务、统一回复，可用轻量模型。三个细节：跨信道聚合、订阅直通（同 Thread 后续事件直接给 Worker，不必重新判断）、事件合并。

**Worker** 拥有独立 Session、上下文隔离、专注单任务，完成后休眠；后续事件到达时从 Session DB 恢复。Task 与 Session 解耦：一个任务可以跨多个 Session，但用户看到的是同一个任务在推进。

<img src="/images/2026-11-01-DeepSeek-Super-Agent/fig2-router-worker.webp" alt="Router + Worker 架构" title="双层架构" width="1000" height="580" loading="lazy" decoding="async">

*Router 只做语义路由与协调，Worker 各自带上下文执行，状态统一落进 Session DB。*

这套结构与分布式系统的「调度器 + 工作节点」同构。DeepSeek 自己也承认：相似的设计约束会导出相似的架构选择。

## 事件驱动：从 Prompt 驱动走向环境监听

传统 Agent 等用户输入；Super-agent 还能监听 IM、GitHub 评论、CI、邮件。做法是**两级过滤**：

- **Fast Path**：规则筛噪音（关键词、频道白名单、消息类型），不调模型
- **Slow Path**：模型判断是否值得处理、属于哪个任务、要不要新建 Worker

核心是**用廉价规则处理大部分噪音，把模型调用留给真正需要判断的情况**。同 Thread 的后续事件直连已订阅的 Worker，不重走 Router。

<img src="/images/2026-11-01-DeepSeek-Super-Agent/fig3-events.webp" alt="事件两级过滤" title="事件过滤" width="1000" height="500" loading="lazy" decoding="async">

*规则层吸收噪音，模型层只处理需要判断的事件。*

原则是「主动不等于打扰」：可以在用户讨论方案时提前复现问题，没有结果就保持安静。

## 上下文管理：Inline & Spill 与 Chain of Recall

- **Inline**：高频信息留在上下文内——近期对话、关键决策、待办
- **Spill**：低频信息溢出到 Session DB——历史摘要、已完成工作、跨任务关联
- **按需读取**：需要时从 Spill 加载，而不是全量召回

这样既共享上下文（连续性），又避免任务间互相污染（隔离性）。**Chain of Recall** 则沿对象引用逐跳找回，不做全库搜索，更准也更省 token。

<img src="/images/2026-11-01-DeepSeek-Super-Agent/fig4-context.webp" alt="上下文分层与召回" title="上下文管理" width="1000" height="560" loading="lazy" decoding="async">

*热数据放 Inline，冷数据放 Spill；召回沿引用链走。*

## 异步、存算分离与 Watchdog

**异步全双工**：耗时任务放后台，Agent 仍可响应新消息；Router 判断相关性，无关就新建 Worker，相关则中断或排队。

**存算分离**：推理在云端弹性扩缩容，状态存在 Session DB，执行可在用户本地经轻量 daemon 完成。关机不丢任务，Agent 变成跨设备的连续实体。

<img src="/images/2026-11-01-DeepSeek-Super-Agent/fig6-storage.webp" alt="计算、状态、执行三层解耦" title="存算分离" width="1000" height="500" loading="lazy" decoding="async">

*云端推理、DB 存状态、本地执行——三者解耦。*

**Watchdog** 是独立守护：监控进度、检测死循环与目标偏离、异常时从 DB 恢复。借鉴操作系统的看门狗定时器——执行单元会坏，需要外部观察者兜底。

<img src="/images/2026-11-01-DeepSeek-Super-Agent/fig7-watchdog.webp" alt="Watchdog 的四项职责" title="Watchdog" width="1000" height="500" loading="lazy" decoding="async">

*监控的是健康度，不只是进程活着。*

## 效果：一组模拟数据

| 指标 | Super-agent | 单 Session |
|---|---|---|
| p50 | 12.4 分钟 | 未给出 |
| p95 | 15.7 分钟 | 29.5 分钟 |
| 缓存 token | 基准 | +27% |

p95 几乎快一倍，长尾加速明显；p50 与 p95 差距小，完成时间更稳定。缓存 token 比单 Session 低约 27%，因为后续事件不必重新加载完整上下文。

<img src="/images/2026-11-01-DeepSeek-Super-Agent/fig8-latency.webp" alt="延迟对比（模拟数据）" title="延迟" width="1000" height="470" loading="lazy" decoding="async">

*p95 从 29.5 分钟降到 15.7 分钟。*

**这是模拟数据，不是生产指标**；真实环境还有并发冲突、资源竞争、API 限流。

## 代价和局限

- **复杂度翻几倍**：多 Worker、多 Session、多次唤醒，调试与排查路径都变长；运维要同时管 Router 高可用、Worker 扩缩容、DB 持久化、Watchdog 部署。
- **「主动」的边界难定义**：太安静像没干活，太主动变骚扰；「没有有效结果就安静」本身要靠模型判断。
- **和 Redis 分片的质疑**：有人说本质是「一个 key 一个 worker」。差异在 Router 要做语义路由、任务归属与跨任务依赖；但若核心只是把经典分布式思想搬进 Agent，护城河未必深。
- **多轮与复杂拓扑未验证**：跨组织、跨权限、跨时区的场景仍是开放问题。

## 本质：从 Session 中心到 Goal 中心

Session 是工具时代的产物：发一条指令，得一条回复，对话结束。真实工作不是这样——一个 PR 改好几轮，一个 Bug 讨论半天，一个需求跨三个渠道推进。

Super-agent 把组织单位从「对话」升级为「任务」，Session 降级为实现细节。

和 ModularRSI 对照：一个向内优化 harness，一个向外扩展承载多任务。两者指向同一结论：**模型决定能力上限，Harness 决定这些能力能否转化为持续生产力。**

一句话：**未来 Agent 的竞争从「谁更聪明」转向「谁更可靠」。**

原文：<https://zhuanlan.zhihu.com/p/2099987320443237060>

## Citation

Please cite this work as:

> Claire. "Agent Architecture: DeepSeek Super-agent and Multi-task Design". Claire-notes (Nov 2026). https://claire-notes.github.io/DeepSeek-Super-Agent

Or use the BibTeX citation:

```bibtex
@article{Claire-DeepSeekSuperAgent,
  title = {Agent Architecture: DeepSeek Super-agent and Multi-task Design},
  author = {Claire (qingYe)},
  journal = {claire-notes.github.io},
  year = {2026},
  month = {November},
  url = "https://claire-notes.github.io/DeepSeek-Super-Agent"
}
```
