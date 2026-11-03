---
layout: post
title: "Harness 自进化 (02)：Harness² 递归进化"
series: harness-rsi
excerpt: "没有标准答案，Harness 怎么知道自己改得好不好？Harness² 用行为对比替代结果打分，把 Harness 自进化从「需要标准答案的实验室」推向真实工作场景。"
---

Harness²: Recursive Agent Harnessing for an Open World

<div id="toc-slot"></div>

## 问题：真实世界中，谁来给 Harness 打分

同一个模型，换一套 Harness，表现能差出几十个百分点。这件事已经被 Polar 那篇工作证明过一次，但新的问题随之而来：

**在真实工作场景里，没有标准答案，Harness 怎么知道自己改得好不好？**

已有的 Harness 自进化方法，大多绕不开一个前提——**verifier**。Meta-Harness 靠轨迹驱动优化，Self-Harness 靠弱点挖掘闭环，DGM 靠档案库验证，它们本质上都是「给一个打分器，分数高的留下」。这套逻辑在封闭评测集上有效，一到开放世界就失效：任务没见过，答案不存在，代理信号也不可靠。

Google 的 Harness² 换了一条路，一句话概括：

> 从「看结果对不对」，转向「看做法有没有变好」。

## 方法一：把 Harness 拆成八个组件
Harness² 不把 Harness 当成一个整体去改，而是拆成八个可编辑组件：系统提示词、护栏、记忆、技能、工具说明、脚本、子 Agent、中间件插件。每个组件以文件形式挂载，每次修改就是一份 diff——改了什么、为什么改，都能追溯。

更关键的是**分两个版本改**：

- **Invariant 版**只动通用做事方式。比如加一条护栏「开工前先盘点所有输入」，或加一个检查脚本「交付前必须重新打开文件核对」。换任务也能用。
- **Domain 版**只补当前领域的知识。比如「排期、人员、预算对不上时以谁为准」，「表格里的数字常被存成带美元符号的字符串」。

论文的消融很直接：去掉这种分工、换成两个通用编辑器后，WorkBuddy-Bench 从 **77.5 掉到 74.6**，JobBench 从 **36.0 掉到 32.3**。同样的候选数量、同样的探测预算，只是不再按范围阅读轨迹，效果就明显下滑。

背后的直觉是：通用流程和领域知识是两种经验，混在一起改会交叉污染——领域细节被当成通用规则泛化出去，通用经验又被领域特例带偏。

<img src="/images/2026-10-30-Harness2/components.webp" alt="这是图片" title="Eight Harness Components" width="821" height="294" loading="eager" decoding="async">

## 方法二：Propose–Probe–Compose，用行为当证据
两个版本改完之后，怎么决定哪些改动留下？Harness² 不看分数，看**行为对比**。

一轮改进分三步：

1. **Propose**：基于当前 Harness、任务、参考执行记录，分别提出 invariant 和 domain 两个候选。
2. **Probe**：两个候选在相同模型、相同环境下各跑一遍，把它们的轨迹和产物与参考执行对比——不是判断对错，而是看目标毛病有没有消失、有没有引入回归。
3. **Compose**：有选择地合并。可以采纳、改写冲突、只取一个，也可以保留原样；每个决定都要绑定一条具体观察。

举个论文里的例子：原版从不回头检查。那新版执行记录里必须真的出现「检查脚本被调用」这一步。说「看起来更规范」不算数，**必须有执行证据**。

论文展示了一个预算对账任务：原版跑完事后评分 **43.1**，问题是数字没对过、文件写完没检查。Harness² 在护栏、脚本、技能、工具说明四处做了改动，合并后重跑，评分升到 **77.8**。

这个对比可以继续加预算：并行递归一次探测多个候选、独立组合；串行递归把上一轮的 Harness 和执行证据带进下一轮。论文里预算 K 从 1 加到 5，两条曲线都单调上升。

<img src="/images/2026-10-30-Harness2/harness2_main_new.webp" alt="这是图片" title="Harness2 Pipeline" width="1014" height="327" loading="lazy" decoding="async">

## 方法三：经验库让下一个任务少走弯路
单个任务改完，Harness² 会把这次采用的 Harness 和一份「经验笔记」存进 improvement library。下一个任务**仍然从原始 Harness 出发**——因为为上一个任务量身定做的改动，换个任务可能帮倒忙；但笔记可以传下去，告诉编辑器「什么招在什么情况下管用」。

消融显示，拿掉经验库，WorkBuddy-Bench 掉 3.1 分、JobBench 掉 1.8 分。更有意思的是迁移：用 JobBench 积累的库去改 WorkBuddy-Bench，一轮改进也能涨分，而且不需要额外的探测。

这就是论文标题里两个递归的含义：**任务级递归**改当前 Harness，**Harnessing 级递归**改「改 Harness 的方法」。

## 效果：不改权重，弱模型反超强模型
主实验覆盖 3 个专业评测、4 种「模型 + Harness」组合：

| 场景 | 原版 | Harness² | 提升 |
|---|---|---|---|
| WorkBuddy-Bench（GLM-5 / OpenCode） | 64.2 | **75.7** | +11.5 |
| JobBench（Gemini 3.5 Flash / OpenCode） | 31.5 | **36.0** | +4.5 |
| LAB（法律，Partial pass） | — | — | **+11.8** |

WorkBuddy-Bench 上，GLM-5 优化后 **75.7**，已经超过没改过的 Gemini 3.5 Flash（**72.4** / **74.5**，取决于初始 Harness）。四种组合、一轮改进，全部高于原版。

一句话：**不动模型权重，只改外面那层「干活的方法」，弱模型可以反超强模型。**

## 代价和局限
1. **算力不便宜**。每个任务要多跑多轮候选，预算 K 越大，token 和延迟越高。论文把它画在 compute–performance 的 Pareto 前沿上，但前沿本身就很贵。
2. **行为证据 ≠ 结果正确**。Probe 只能证明「做法变了」，不能证明「答案对了」。给足预算时，选择器可能在一堆结果里挑中 55 分、扔掉 95 分。
3. **提升有一部分来自更强的编辑器**。默认用 Claude Opus 4.8 改 Harness：Opus 改 GLM-5 涨 **11.05** 分，GLM-5 自己改自己只涨 **4.01** 分。不过在 LAB 上，GLM-5 自改反而更好，说明结论依赖领域。
4. **评价泄露的嫌疑**。JobBench 的评分由 Claude Opus 4.8 完成，而改 Harness 的默认也是它——裁判和教练是同一个模型，方法论上需要更干净的隔离。

<img src="/images/2026-10-30-Harness2/same_model.webp" alt="这是图片" title="Same Model as Executor and Editor" width="1400" height="401" loading="lazy" decoding="async">

## 本质：换了一个验证哲学
把 Harness² 放回 Harness 自进化的脉络里，它的位置很清楚。

Meta-Harness、Self-Harness 的核心是「结果驱动」：先有分数，再决定去留。Harness² 的核心是「过程驱动」：没有分数，就对比行为，用执行轨迹里的证据决定改什么、留什么。

这不是技术上的小修小补，而是把 Harness 自进化从「需要标准答案的实验室场景」，推向了「没有标准答案的真实工作场景」。

以后拼的可能不只是更大的模型，而是更聪明的 Harness。

论文：<https://arxiv.org/abs/2610.14224>  
代码：<https://github.com/google-research/harness2>  
项目页：<https://harness2.github.io>

## Citation
Please cite this work as:

> Claire. "Harness Self-Evolution: Harness2 Recursive Evolution". Claire-notes (Oct 2026). https://claire-notes.github.io/Harness-RSI-Harness2

Or use the BibTeX citation:

```bibtex
@article{Claire-HarnessSelfEvolution,
  title = {Harness Self-Evolution: Harness2 Recursive Evolution},
  author = {Claire (qingYe)},
  journal = {claire-notes.github.io},
  year = {2026},
  month = {October},
  url = "https://claire-notes.github.io/Harness-RSI-Harness2"
}
```
