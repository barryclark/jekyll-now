---
layout: post
title: "Anthropic 建议如何设计电商 Agent"
date: 2026-11-03
series: agent-arch
excerpt: "把电商 Agent 从模型能力问题重新定义为工程系统问题：模型负责判断，企业系统负责事实，Harness 负责约束，Evals 负责放行。"
---

Anthropic: A guide to the anatomy of effective commerce agents

<div id="toc-slot"></div>

这篇指南的核心贡献不是「怎么做一个电商 Agent」，而是把电商 Agent 从模型能力问题重新定义为 Agent 架构设计问题：**模型只负责判断，企业系统负责事实，Harness 负责约束，Evals 负责放行。**

## 问题起点：电商 Agent 难在哪

电商场景（零售、旅行、电信、票务）的 Agent 有一个共同特征：**对话是跨多意图的、状态紧密耦合的；意图是会随时空漂移的。**

用户在一次会话里可能先问「帮我找两双不超过 $80 的跑鞋」，接着说「第二双换便宜点的」，再问「我上周那单退款到哪了」。购物车、偏好、订单、历史对话——所有这些状态交织在一起，缺一不可。

如果按业务域拆成多个子 Agent（购物一个、退货一个、客服一个），每次交接都会丢状态、多花数倍 token、叠加数秒延迟。而且业务域本身很难彻底分开——退货流程同时依赖历史订单、当前购物车和商品目录。

这就是电商 Agent 的根本矛盾：**用户侧要连续的对话和共享的状态，工程侧却天然按业务域拆分——团队边界、权限、发布节奏都是按域划的。**

## 架构设计：<span style="color:#2563eb">One-Agent</span> not Sub-Agents

建议方案是一个主 Agent 保持对话所有权，按需加载 Skills。

为什么不用 Subagent：电商对话跨多意图强耦合，**每次 handoff 都带来上下文损耗、额外 token 和延迟。**Anthropic 在多个企业部署中的对比结果是：**单 Agent + Skills 在质量上持续优于「一个 prompt 包办全部」和 Subagent 方案。**

两种值得拆的例外：

- 任务边界窄而完整，值得用独立上下文窗口（如深度研究：可以搜索、跑代码、遍历数据、经历失败路径，最后只交回精简答案）
- 业务域已有专属 Agent 和**独立合规边界**（药房、金融服务可以直接接管对话）

System Prompt vs Skill 的划分：按使用频率决定。预计覆盖三分之一以上流量的指令放系统提示词，长尾流程做成 Skill 按需加载。但安全要求和关键事实不能因为低频就被省掉。

<img src="/images/2026-11-03-Anthropic-Commerce-Guide/fig2-skills.webp" alt="单 Agent 与子 Agent 对比" width="988" height="516" loading="lazy" decoding="async">

*左边一份状态、一个循环；右边每次交接都在丢状态、多花 token、加延迟。*

## <span style="color:#2563eb">One-Agent</span>：四层边界

<img src="/images/2026-11-03-Anthropic-Commerce-Guide/fig1-four-layers.webp" alt="四层边界" width="968" height="543" loading="eager" decoding="async">

*四层各管一件事：模型判断、系统给事实、Harness 执行约束、Evals 决定放行。*

这篇文章给出的不是「一个模型加一堆工具」的简单方案，而是一个四层分工明确的系统：

| 层级 | 职责 | 关键原则 |
|---|---|---|
| **Model** | 判断与决策 | 理解目标、规划、解释取舍 |
| **System** | 事实与执行 | 业务系统给出可信数据 |
| **Harness** | 运行时约束 | 安全规则真正可执行 |
| **Evals** | 放行验证 | 测最终状态，不锁死路径 |

四层边界画清楚，系统才是可验证、可替换的。模型可以换，但 Tools、Skills、Harness 和 Evals 才是能持续积累的工程资产。

## 工具层：不重新实现业务系统

Tools 不是 API 外壳，而是业务系统的可信接口：

- 搜索、库存、定价继续由企业核心系统给出事实，模型只拿判断所需字段
- **UI 展示也是工具**——商品卡、座位图、行程单都定义成工具调用，模型出结构化参数，服务器验证后渲染
- 展示工具的参数与屏幕顺序一致，并留在系统消息历史里，才能支持「第二件」「第三个」这类指代

凭证保留在服务器，模型只看工具返回的结果。已有的 Shopify、Stripe、Snowflake 或内部 API 都放在 backend 接口后面。

<img src="/images/2026-11-03-Anthropic-Commerce-Guide/fig3-tools.webp" alt="工具层" width="969" height="456" loading="lazy" decoding="async">

*模型出参数，工具层校验并渲染，事实来自后端业务系统；凭证不进入模型。*

## 延迟与成本优化

速度不只看「任务完成需要多久」，还要看「用户多久能看到第一个结果」：

- **减少 Agent Turns**：减少完成一次任务所需的模型轮次
- **并行工具调用**：互不依赖的查询同一轮发出
- **Eager Dispatch**：参数就绪即派发，不必等模型输出完
- **Prompt Caching**：复用稳定请求前缀，电商场景优秀部署可达 90–99% 命中率
- **流式输出**：先显示进度，再逐步显示通过校验的结果，减少感知等待
- <span style="color:#2563eb"><strong>隐式 Router</strong></span>：选哪个模型 + 多高 effort（重分析用 Opus，延迟敏感用 Sonnet，模型档位靠 eval 扫出来，让数字决定）

## 生产安全：模型建议，系统校验，人工确认

安全不能只靠 Prompt，必须有硬约束。

购物 Agent 侧：

- 加购有来源检查——只有本次会话中搜索或订单工具真正返回过的商品 ID 才能加入
- 有规格的商品必须先选清变体
- Checkout 不接管付款，只生成结账链接

商家 Agent 侧：

- 所有写操作统一先进入「变更草稿」流程（展示对象、前后数值和原因）
- 草稿时检查一次，应用时再检查一次
- **人工批准是强制闸门**——聊天里说「同意」不算授权，必须在商家门户批准界面点击

记忆：用户偏好（鞋码、过敏、常看的报表）存数据库，不是存模型里，带来源、权限、保留期和删除能力。

<img src="/images/2026-11-03-Anthropic-Commerce-Guide/fig4-safety.webp" alt="生产安全流程" width="968" height="456" loading="lazy" decoding="async">

*建议 → 草稿 → 两次校验 → 人工审查；不可逆操作永远卡在最后一关。*

## Evals：测状态不测路径

Agent 是非确定性系统，不能只测 happy path：

- 测最终状态与渲染结果，不锁死执行路径
- 长上下文、冲突信息、prompt injection、timeout、空结果都单独做 case
- 提示词改一点就可能翻车，所以要有自动化测试

## 配套开源：commerce-agents

两个可运行的参考 Agent，各带 5 条 Skills：

- **购物 Agent**：搜索与发现、购买研究、计划与目标、客户服务、记忆与个性化
- **商家 Agent**：经营洞察、商品列表、库存操作、定价促销、营销活动

覆盖零售、旅行、电信、票务四个行业 Demo。同一套角色定义可跑在三条路径上：Messages API（自控制循环）、Claude Agent SDK（工具调用和多轮执行）、Managed Agents（通过 MCP 连接后端）。

## 一句话总结

这篇文章的本质是一份生产级电商 Agent 的工程蓝图——它把「AI 能不能做电商」的问题，转化成了「确定性留给代码、不确定性交给模型、不可逆操作必须过人工审查」的分层工程体系。

所有 Agent 都依赖上下文，但电商 Agent 依赖得更重，出错容忍度更低：<span style="color:#2563eb"><strong>用户的需求会随时空状态漂移</strong></span>。同一句「点杯饮料」，早上是咖啡，晚上可能是热可可——query 没变，意图变了。Coding Agent 很少遇到这种漂移，而且代码写错了能 diff、能回滚、能跑测试；电商错了，是钱扣错、券发错、订单下错，很难挽回。

所以真正的解法不是「让模型记住更多」，而是分层：**对话由一个 Agent 统一持有，事实交给系统，约束交给 Harness，不可逆的操作过人工审查。**

原文：<https://claude.com/resources/articles/the-anatomy-of-effective-commerce-agents>  
开源：<https://github.com/anthropics/commerce-agents>

## Citation

Please cite this work as:

> Claire. "How Anthropic Designs Commerce Agents". Claire-notes (Nov 2026). https://claire-notes.github.io/Anthropic-Commerce-Agent

Or use the BibTeX citation:

```bibtex
@article{Claire-AnthropicCommerceAgent,
  title = {How Anthropic Designs Commerce Agents},
  author = {Claire (qingYe)},
  journal = {claire-notes.github.io},
  year = {2026},
  month = {November},
  url = "https://claire-notes.github.io/Anthropic-Commerce-Agent"
}
```
