---
layout: post
title: "Harness 自进化 (01)：从运行时工程到递归改进"
series: harness-rsi
date: 2026-10-29
excerpt: "模型直接改权重还太远，真正的近路在模型外面那层执行系统。Lilian Weng 把 harness 工程拆成三个设计模式、五级台阶和七道坎，也指出护城河正在从模型层外移。"
---

Harness Engineering for Self-Improvement

<div id="toc-slot"></div>

## 问题：RSI 的「模型改权重」路线太远

递归自我改进（Recursive Self-Improvement，RSI）的概念可以追溯到 1965 年 I. J. Good 对「超级智能机器」的定义——一台能在所有智力活动中超越人类、并能设计出更好机器的机器。Yudkowsky（2008）进一步把 RSI 描述成一个反馈循环：AI 用当前智能去改进产生其智能的认知机制。

但在 2026 年，「模型直接改写自己权重」这条路依然充满安全与工程上的不确定性。前沿实验室确实在推进，但对绝大多数 AI 产品和研究者来说，这是一条远路。

Lilian Weng 在 2026 年 7 月的长文《Harness Engineering for Self-Improvement》里给了一个方向判断：

> 短期内，RSI 的突破口不在模型层，而在模型外面那层执行系统——Harness。

这里的 Harness 不只是早期 agent 框架里「LLM + memory + tools + planning + action」的老公式，而是包含**工作流设计、评估机制、权限控制、持久化状态管理**的一整套软件系统。它更像操作系统：封装复杂底层逻辑，向模型暴露简单通用的接口。

所以核心问题不是「RSI 能不能实现」，而是：**在改权重还不现实的今天，Harness 这层有哪些已被验证的优化路径，又有哪些没解决的硬骨头？**

## Harness 是运行时，不是 prompt
Lilian 反复强调：Harness 工程不是 prompt engineering 的升级版，而是 **runtime 和软件系统设计**。Claude Code、Codex、Cursor 之所以强，核心不在于模型多聪明，而在于它们有成熟的文件系统接口、工具调用协议、子 Agent 生命周期管理。

<img src="/images/2026-10-31-Harness-Self-Improvement/fig1-runtime.webp" alt="Harness 是模型外面的一层运行时" title="Harness 运行时" width="903" height="502" loading="eager" decoding="async">

*模型只能看到 harness 喂给它的东西，也只能通过 harness 暴露的接口行动；提示词、工具、上下文、控制流、权限都在这一层。*

这也是为什么「换壳」能带来几十个百分点的差异：模型权重没变，但它观察世界、采取行动、检查自己的方式全变了。

## 三个设计模式
### 工作流自动化
定义一个目标导向的循环：规划 → 执行 → 观察/测试 → 改进 → 再执行，直到目标达成。过程中模型还可以主动请求用户澄清。

Karpathy 的 autoresearch 仓库是个干净的范例：一个「计划、执行、观察、改进」的循环，模型就能自己跑、自己测、自己迭代。本质上是软件工程的 PDCA 循环被搬进了 agent 运行时。

三个设计要点：循环必须有明确终止条件，否则无限迭代烧 token；每轮要产出可观测的中间产物（测试报告、diff、日志）；允许模型主动请求人类澄清，而不是盲目执行。

### 文件系统作为持久记忆
上下文窗口再长也会爆。方案是把实验日志、代码 diff、错误轨迹、历史运行记录全部写进文件系统。

为什么是文件系统？**简单**（读写文件是模型的基础技能，不需要额外训练）、**可检查**（人类能直接打开审查）、**可恢复**（崩溃后可从文件恢复状态）。

更关键的是一个反直觉的特性：**模型越强，文件系统的收益越大**。更强的模型能更好地组织文件结构、定位历史信息、压缩和检索记忆。

### 子 Agent 与后台任务
主 Agent 的上下文是宝贵资源。如果它亲自盯着每个耗时任务，中间数据会塞满上下文，导致遗忘和幻觉。

多 Agent 协作的核心，是把上下文复杂度平摊到各个子 Agent：每个子 Agent 有自己的窗口、执行自己的子任务，主 Agent 只负责协调与汇总。配合状态落盘，每个子 Agent 的执行都可追踪，失败也能恢复。Lilian 特别提到 `spawn_agent`、`wait_agent` 这类背景任务原语——说明多 Agent 协作已经从「架构理念」推进到「接口设计」。

<img src="/images/2026-10-31-Harness-Self-Improvement/fig2-patterns.webp" alt="三个设计模式" title="设计模式" width="982" height="455" loading="lazy" decoding="async">

*循环要终止条件，记忆要有 schema，子 Agent 要有生命周期控制——三者都是软件工程问题。*

## 五级台阶：改什么，决定了能改多深
Lilian 给出一条清晰的优化对象进阶链：

1. **Prompt**：改指令措辞，最浅、最灵活，也最容易退化
2. **Structured Context**：用 schema 组织关键信息，让模型更容易定位
3. **Workflow**：调整执行流程，加检查点、引入新循环
4. **Harness Code**：改 harness 本身的代码，新增工具、改接口、调状态管理
5. **Optimizer Code**：连「负责改进的那个东西」也一起改

越往上越「元」，最终变成 meta-methodology——不只提升回答质量，而是提升获取答案的机制本身。

<img src="/images/2026-10-31-Harness-Self-Improvement/fig3-levels.webp" alt="五级台阶" title="五级台阶" width="925" height="449" loading="lazy" decoding="async">

*层级越高杠杆越大，但归因也越难：改 prompt 可以立刻回滚，改优化器则可能连评估标准一起改掉。*

## 四条路线，各自卡在哪
### 上下文工程（ACE → MCE → Meta-Harness）
把「上下文」本身当作可优化对象：让模型学会决定什么信息该进上下文、以什么格式、在什么时机。

### 自修改 Harness（STOP / Self-Harness / AHE）
让模型直接读写自己的 harness 代码。STOP 的实验很关键：在 GPT-4 上有效，但在 GPT-3.5、Mixtral 上反而退化——**递归结构不是万能药，底座模型的能力天花板仍然存在**。

AHE 则指出瓶颈在可观测性：一次 rollout 失败时，得知道是哪个组件负责，否则改动就是盲改。

### 进化搜索（DGM / AlphaEvolve / ShinkaEvolve / ThetaEvolve）
在 harness 代码空间做进化搜索。DGM（Darwin Gödel Machine）让 Agent 修改自己的 harness 代码库，用 Claude 3.5 Sonnet 做底座时，SWE-bench Verified 从 20% 提升到 50%，Polyglot 从 14.2% 到 30.7%。但这类方法的共同前提是**候选能被自动评估**——没有自动评分器的开放任务，进化搜索转不起来。

### 联合优化（SIA / Continual Harness）
把权重更新与 harness 改进放进同一个闭环，最接近「真正的 RSI」，但目前仍处早期。

<img src="/images/2026-10-31-Harness-Self-Improvement/fig4-routes.webp" alt="四条路线" title="四条路线" width="967" height="462" loading="lazy" decoding="async">

*前三条都假设有自动打分器；第四条才真正涉及权重更新，也最不成熟。*

## 七个未解难题
1. **弱且模糊的评估器**。科研品味、新颖性、长期价值没有快速精确的自动评判标准。现有 evaluator 要么是 LLM 本身（有偏差），要么是代理指标（容易 Goodhart 化）。**谁能可信地判断一次改进是否真的有效，谁就卡住了 RSI 的咽喉。**
2. **上下文与记忆的生命周期**。什么该存、何时存、怎么检索、怎么遗忘——这些问题在认知科学里都没完全解决。
3. **负结果无处安放**。失败轨迹常被丢弃，因为「没用」。而这恰恰是最大的浪费：失败里藏着最宝贵的学习信号。
4. **多样性坍缩**。优化会让 Agent 收敛到单一最优路径，降低探索能力。和 RL 的 exploration-exploitation 是同一个问题，只是搜索空间从参数变成了 harness 代码。
5. **奖励黑客**。Agent 优化 reward 而非真实目标，表现为找评测漏洞刷分，而不是真正变强。
6. **长期成功**。需要从「当前动作 → 即时奖励」转向「当前动作 → 未来状态 → 长期结果」，这在 RL 里都还没解决。
7. **人的位置**。评估和权限必须放在自进化循环外面。Lilian 的原话是：「人类应该向上移动，而不是被移除。」（Humans should move up the stack, not be removed from the loop.）

关于第 7 点，她还给了一个很扎心的案例：让 AI 自主做研究，最终只有 4 个想法被人类专家选中进入完整流程，只有 1 个真正跑通。失败模式里最扎眼的是**过度乐观**——模型会在信号还是噪声时宣布成功，会给自己贴「数值胶带」，会 p-hacking。如果连「判断一次改进是否有效」都做不到，自我改进就会变成自我欺骗。

## 本质：护城河正在外移，但有半衰期
这篇长文最大的价值不是提出某个具体技术，而是给整个 RSI 领域做了一次方向校准：把焦点从「模型改自己」拉回到「系统改自己」——改 prompt、改流程、改工具接口、改评估器。这些事今天就能做，Claude Code 和 Cursor 已经在证明它有效。

对做 Agent 的人，三条实用启示：

1. **别只盯着模型升级**。同一个模型，harness 搭得好不好差别巨大。改 harness 比改权重便宜 100 倍、可观测 10 倍、可回滚无数次。
2. **文件系统是最好的朋友**。上下文会爆、记忆会丢，但文件不会；而且模型越强，这层设计的收益越大。
3. **评估器是咽喉**。七道坎里它排第一，其他所有改进都依赖「你能判断改进是否真实」这个前提。

还有一个容易被忽略的点：**许多 harness 改进最终会被内化进下一代模型权重**，就像 prompt 技巧的演化——上一代精妙的 prompt，下一代模型一句话就能做到。这意味着 harness 的优势有半衰期。

所以真正的壁垒可能不是「谁有更好的 harness」，而是**快速可信的评估器、高质量的经验数据飞轮、以及人与 Agent 的协作机制**。

原文：<https://lilianweng.github.io/posts/2026-07-04-harness/>

## Citation
Please cite this work as:

> Claire. "Harness Self-Evolution: From Runtime Engineering to Recursive Improvement". Claire-notes (Oct 2026). https://claire-notes.github.io/Harness-Self-Improvement

Or use the BibTeX citation:

```bibtex
@article{Claire-HarnessSelfImprovement,
  title = {Harness Self-Evolution: From Runtime Engineering to Recursive Improvement},
  author = {Claire (qingYe)},
  journal = {claire-notes.github.io},
  year = {2026},
  month = {October},
  url = "https://claire-notes.github.io/Harness-Self-Improvement"
}
```
