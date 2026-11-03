---
layout: post
title: "Harness 自进化 (03)：ModularRSI 的模块化拆分"
series: harness-rsi
excerpt: "Harness 自改进的难点不是「要不要改」，而是「改哪个模块」。ModularRSI 把 harness 拆成五块，用成功与失败的轨迹对比定位缺陷，再过三道门才允许合并。"
---

ModularRSI：Modular and Generalizable Recursive Harness Self-Improvement

<div id="toc-slot"></div>

## 问题：改 Harness 不难，难的是改对地方

Harness 自进化已经被证明有效，但现有方法普遍踩三个坑：

1. **拿考试题当练习题**——直接在评测基准上优化，难以区分可复用改进和任务特化适配，换一套任务立刻原形毕露。
2. **看单次成败乱改代码**——单轨迹优化把系统性缺陷和具体实例细节纠缠在一起，迁移性差。
3. **整个系统揉在一起改**——全局修改难以定位缺陷组件，容易互相打架，改这头坏那头。

Siwei Wu 等人的 ModularRSI 要回答的问题很明确：**失败究竟说明框架哪里该改？** 不是「要不要改」，而是「改哪个模块」。

论文的假设也很清晰：模块化比整体优化更可控。整篇工作就是围绕这个假设做拆解与验证。

## 方法：对比、解耦、门控
### 第一步：把 Harness 拆成五个模块
以 Terminus-2 为起点，把可编辑部分拆成五块，每块有明确职责：

- **Agent Loop**——执行循环的结构
- **Tool Use**——工具调用逻辑
- **Observation Management**——观察信息的处理
- **Context Management**——上下文管理策略
- **Task Completion Detection**——完成检测机制

这不是随便切的，而是按「失败时最容易定位到哪个函数」来划分。

<img src="/images/2026-10-31-ModularRSI/fig1-modules.webp" alt="五模块的 harness 架构" title="五模块拆分" width="952" height="495" loading="eager" decoding="async">

*Agent Loop 是外层运行时，其余四块各自负责一类可观测行为；边界清晰，失败才能归因。*

### 第二步：用成功/失败对比生成修改信号
同一道题跑多次，把成功和失败的轨迹放在一起比较，差异点就是修改信号：

- **有成功有失败**：直接对比两条轨迹，找出行为差异对应的代码位置
- **全失败**：先找历史成功记录；找不到就诊断明显问题
- **全成功**：检查是否有多余操作可以精简
- **跨任务汇总**：优先改多个任务共同支持的函数，而不是替某道题写答案

核心思想是：**单看一条失败轨迹，你分不清是框架缺陷还是任务特例；对比成功与失败，信号才干净。**

### 第三步：三重门控防止过拟合
改完不直接放行，要过三道检查：

1. **程序检查**——代码能不能跑、接口对不对
2. **Diff 审查**——是否写入了题目专用规则（直接过拟合的红灯）
3. **执行验证**——抽取当前批次的两道题实际跑一遍

通过后冻结函数库，再到**未参与进化**的测试任务上评估。

<img src="/images/2026-10-31-ModularRSI/fig2-contrast.webp" alt="对比式信号与三重门控" title="对比与门控" width="960" height="476" loading="lazy" decoding="async">

*上图：同题的成功与失败轨迹做对比，差异落到具体组件；下图：程序检查、Diff 审查、执行验证三道门。*

## 效果：涨分，也能迁移
用 DeepSeek-V4-Flash-Preview 在 TerminalBench 2.0 上：

| 策略 | 成功率 |
|---|---|
| 基线（不进化） | 47.57% |
| 联合全模块进化 | 44.19% |
| 非模块化进化 | 46.44% |
| **ModularRSI** | **52.43%** |

模块化比整体优化高约 6 个百分点；反过来看更值得注意——**联合全模块进化比基线还低 3.4 分**。可编辑空间更大并不等于更好，这正好证明了「拆开改」的价值。

代价是平均交互步数从 34.70 涨到 35.57：成功率的提升不是免费的，harness 变得更「谨慎」也更复杂。

<img src="/images/2026-10-31-ModularRSI/fig3-results.webp" alt="TerminalBench 2.0 上的对比" title="主结果" width="931" height="462" loading="lazy" decoding="async">

*同一进化预算下，两种整体进化的策略都没跑过基线，只有模块化版本拿到 +4.9 分。*

迁移能力有两组证据：

- **跨域**：在终端任务上演化出的 harness，转到 SWE-Bench Verified 上从 73.40% 提升到 75.80%
- **跨模型**：在 DeepSeek 上演化出的 harness，换到 GLM、MiniMax 上照样有效

后者说明改进落在 harness 层面的通用机制上，而不是某个模型的特定行为模式。

## 代价和局限
**步数增加，收益有限。** 成功率的提升伴随更长的交互；而且论文没有单独对「轨迹对比」做消融，所以不能断言收益全来自对比机制——模块化拆分本身可能也贡献了一部分。

**归因仍不完美。** 附录里有个例子：把 Scala 流水线迁到 PySpark，要求删除类别为 NULL 的行，但旧代码没删。成功过程遵守要求，失败过程照搬旧代码。系统据此加入「持续展示任务要求的检查清单」。听起来合理，但后续过程在出现预期行为的同时还有其他更新，不能把改善全算给这一处改动。

**不能证明无限递归。** 论文验证了一轮进化的有效性，但没有回答「能连续进化多少轮」。每轮改进都可能引入新缺陷，多轮之后是累积收益还是累积噪声，仍然开放。

## 本质：模块化是演化可追踪性的前提
这篇论文最大的贡献不是涨了多少分，而是**把「哪里失败」和「该改哪个函数」连接起来了**。

对比一下同系列的其他工作：RRSI 是在演化过程中加约束（退火预算、噪声门槛、结构剪枝），ModularRSI 换了个角度——从结构上解决。它说：与其给演化过程加一堆正则项，不如先把系统拆清楚，让每个模块在限定范围内独立进化，最后再处理冲突。

这和写代码是一个道理：模块边界清楚，才知道问题出在哪；所有模块一起改，有时反而会变差。

一句话总结：**模块化不是架构美学，而是演化可追踪性的前提。**

论文：<https://arxiv.org/abs/2609.14857>

## Citation
Please cite this work as:

> Claire. "Harness Self-Evolution: ModularRSI and the Case for Module Boundaries". Claire-notes (Oct 2026). https://claire-notes.github.io/ModularRSI

Or use the BibTeX citation:

```bibtex
@article{Claire-ModularRSI,
  title = {Harness Self-Evolution: ModularRSI and the Case for Module Boundaries},
  author = {Claire (qingYe)},
  journal = {claire-notes.github.io},
  year = {2026},
  month = {October},
  url = "https://claire-notes.github.io/ModularRSI"
}
```
