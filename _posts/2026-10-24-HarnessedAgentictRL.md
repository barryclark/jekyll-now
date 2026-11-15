---
layout: post
title: Harnessed Agentic RL (01)：范式总览
series: harnessed-rl
excerpt: "Agent = LLM + Harness。这篇拆解 Harness 的构成：它如何决定模型怎么思考规划、调用工具、管理上下文，以及为什么它正在成为 Agent 落地的关键变量。"
---
## Harnessed Agentic RL产生的背景 
**Agent = 大语言模型（LLM） + 运行框架（Harness）。Agent大规模落地与 Harness崛起。**
现在的Agent是运行在Harness框架内的(LLM/Agent)复合系统，不再是单体模型与环境直接交互。Harness负责决策模型如何思考规划、多轮调用工具和行动、感知和管理上下文、多智能体协同及结果存储和评估，是Agent的重要组件。

- **2023-2025**: 早期Agentic-RL，在训练引擎中直接实现AgentLoop交互循环(直接写入GPU Cluster)，模型与环境交互是原生Token-in/Token-out API结构，在执行过程中每个rollout保持着时间纬度上连续的Token序列流，天然不存在Decode-encode drift问题，保证了强化学习在完全On-policy状态下高效收敛。  

- **2025-至今**：Harnessed-Agentic-RL，由harness控制工具调用、上下文拼接、流程流转与多智能体协同，一次任务可能会被拆分为动态次的模型请求，harness与环境交互主要采用Message API/Response API，随之的Decode-encode drift导致RL训练容易陷入非真实环境off-policy。  
  
- **Harness演变为控制系统**：包含工具链、上下文管理、子agent调度、失败重试、沙箱隔离的一整套系统交互与控制系统。
 
## 为什么需要Harnessed Agentic RL范式
**Harness出现后，传统Agentic-RL训练方法失效**
- ​​**Harness写入训练引擎不可行**：在训练框架Megatron-LM 或 FSDP内重写的边际成本与维护代价极高。
- **Training-Deployment Consistency**​​：强行在训练框架内重写**简化的不同的Harness**交互训练，导致‘训练环境harness’上优化的模型，在‘部署环境harness’下失效。  
- **Decode-encode drift**：CompletionAPI带来decode-encode drift导致模型在学习一个非真实的输入，off-policy破坏RL收敛性。  

## 传统Agentic RL训练系统架构
- **训练框架直接持有LLM/Agent运行时状态**：Agent的执行过程rollout与环境交互逻辑写进GPU-Cluster，训练器基于模型每次生成的（tokenization、轨迹记录、loss mask） 构建数据 
- **训练和部署时本质是两套不同（分别实现）的‘harness’**
- 这类框架主要有**veRL、Molt、slime、aReal**

## Pattern1: 🔹 veRL（Seed, 2025）
<img src="/images/2026-10-25-HarnessedAgenticRL/veRL.webp" alt="这是图片" title="veRL Framework" width="1400" height="1034" loading="eager" decoding="async">

## Pattern2: 🔹 Molt （NVIDIA NeMo，2026.07）
<img src="/images/2026-10-25-HarnessedAgenticRL/molt.webp" alt="这是图片" title="Molt Framework" width="1400" height="1035" loading="lazy" decoding="async">

**传统Agent RL的3大问题**  
- **训练-部署不一致**​​：训练时看到的 prompt 和部署时模型实际看到的 prompt 可能不同
- **训练维护成本高**​​：更换harness或harness更新时，RL需适配API格式、处理KVcache、对齐token序列等  
- **训练数据复用低**：累积的训练数据无法直接复用，造成数据和训练资源浪费

**此外，Harnessed Agentic RL基于传统范式已经行不通：**
- Harness框架（Claud code，codex，Qwen Code，DSH等）复杂度继续增加。
- Harness Decode-encode drif造成的样本动态性会导致RL训练不稳定或失效。 

## Harnessed Agentic RL训练系统范式
**​​让部署Harness直接参与RL-training**
- **基于LLM-API-Proxy解耦架构**：训练引擎只通过Proxy记录每次LLM（请求-响应）轨迹，合并组装样本。使得训练和部署Harness同一，从根本上消除训练-部署偏差。
- **工业界Agentic RL正在转向**：RL训练从"训练引擎重现交互"转向"训练引擎只做观察"，。
- HAR框架目前主要有**Polar、AgentLightningV1.0、OpenForge**。
- AR框架也在适配转变：verl **Uni-Agent**、AReaL-2.0、slime-v0.3.0。

## Pattern1: 🔹 Polar （NVIDIA，2026.05）
<img src="/images/2026-10-25-HarnessedAgenticRL/polar.webp" alt="这是图片" title="Polar Framework" width="1400" height="797" loading="lazy" decoding="async">
**是Harnessed Agentic RL的开创工作。**
- ​​核心设计​​：LLM-endpoint Proxy，记录推理引擎的原始tokenIDs和nodeProb，不做decode-encode。两种方式做轨迹重建：per-request和 **prefix-merging （约5.4倍加速）**。  
- ​​Rollout架构​​：Rollout Server 负责异步调度，Gateway Node 负责实际执行和工具调用。  
- 效果​​：Qwen3.5-4B + Codex，SWE-bench从3.8%提升到26.4%；Qwen3.5-4B + ClaudeCode，SWE-bench从29.8%提升到34.6%。

1. LLM-API-Gateway
提供兼容 OpenAI 的 LLM 代理接口。Harness 的每次模型调用都会自动关联到对应的rollout，记录 prompt token IDs、response token IDs 和 nodeprob。不参与梯度计算，只做观测和记录。
2. Rollout Controller
负责启动和管理 Agent 执行。支持两种运行方式：​​本地进程​​ 和 ​​Kubernetes 任务​​。原生支持 K8s 意味着不需要依赖 Modal、E2B 等商业沙盒服务，可以直接用自建集群做大规模 rollout。
3. Customized Trainer
负责收集日志、根据前述规则构建训练样本、计算优势值和 loss、执行策略更新。更新时会暂停 API 请求，降低策略陈旧问题。
Polar 解决了"怎么观察"的问题，但没有处理后续的训练挑战——样本合并、优势计算、损失归一化、后端调度。

## Pattern2: 🔹 Agent LightningV1.0（微软，2026.08）  
<img src="/images/2026-10-25-HarnessedAgenticRL/agentlightning.webp" alt="这是图片" title="Polar Framework" width="1400" height="493" loading="lazy" decoding="async">

**和Polar架构路线一致，框架更轻量级，训练系统优化更详细。**
- ​​核心设计​​：API Gateway 中的 LLM Proxy 拦截记录请求，但和 Polar 不同，Agent Lightning 在 Gateway 层主要做了统一Chat-template。
- ​​Rollout Controller：支持本地进程和 K8s Job，不依赖商业沙盒。
- Customized Trainer：轨迹合并、rollout-level advantage、损失归一化。
- ​​效果​​：Qwen3.5-9B，6K 样本，SWE-bench Verified 从 41.8% 提升到 56.4%。

## Pattern3: 🔹 OpenForgeRL（微软 / 哥伦比亚，2026.07）
<img src="/images/2026-10-25-HarnessedAgenticRL/OpenForge.webp" alt="这是图片" title="OpenForge Framework" width="1400" height="790" loading="lazy" decoding="async">
**Trainer、Rollout、Agent结构分离，理论上可以训练任何agent。**
- 核心设计：API Gateway拦截Harness的LLM调用，路由到RL推理引擎并记录轨迹。
- Rollout Orchestrator：启动远程沙箱Harness与环境进行交互并调用LLM，ProxyServer拦截LLM调用、路由至推理引擎、记录轨迹。
- ​​定位​​：和 Polar、Agent Lightning 类似，强调"不实现harness就能训"。

## Harnessed Agentic RL 2026趋势
- 2026年下半年技术框架开始走向Harnessed Agentic RL，由部署时的Harness统一主导交互，实现训练引擎0重写和训推一致。
- 长程Personal/Work-Agent会更依赖Harnessed Agentic RL方法（长程交互轨迹数据更重要）。
- LLM-Endpoint-Proxy架构基本成型：目前是“观察记录”，后续训练中：Token信号还原、样本动态性缓解、长程轨迹合并、优势计算等挑战，现有方案还不完善。

## Case Study & 一些实验
<img src="/images/2026-10-25-HarnessedAgenticRL/exp.webp" alt="这是图片" title="Exp Result" width="1400" height="807" loading="lazy" decoding="async">

## Future Challenges
- **Retokenization**：训练引擎拿到的请求-响应对，需拼成连续的训练轨迹。但 harness 和训练引擎的 tokenizer、chat template 可能不一致，导致 token级前缀对不上，导致模型学到的是历史未发生的轨迹。retokenization shift 的三个来源：tokenizer、chat template、inference engine后处理。除chat tempalte可解决，其他问题目前还没有彻底的解决方案。
- **Sample Merging**：一个 rollout 可能产生多个请求-响应对，这些对能否合并成一个训练样本，取决于后一个请求的 prompt 是否和前一个请求+响应的 token 级前缀精确一致。实际中约 36% 的 rollout 可以合并成，单次rollout平均产生 2.41个训练样本。
- **Advantage Calculation**：如果按单个请求计算优势值，多请求的 rollout 会获得更大的总权重。但由于请求数量是 harness 内部行为的结果，不代表任务更难或更重要，因此优势应该按 ​​完整 rollout 成组计算​​，先在 rollout 内做 token 平均，再对 rollout 平均。
- **Loss Normalization**：类似地，如果直接按样本数量平均 loss，产生更多样本的 rollout 会获得更大的优化权重。损失归一化也需要避免被样本数量扭曲，同样以 rollout 为统计单位。
- **Training Backend Scheduling**：每个 rollout 产生多少样本、每个样本多长，只有 harness 执行完才能确定，但 GPU 数量和并行配置是固定的。后端需要动态地把可变长度、可变数量的样本映射到固定的训练资源上。
- **Reward Hacking**：重试去重、外网隔离和奖励投机的防护还需要完善。
- **Trajectory还原**：训练引擎只能看到离散的 LLM 调用，harness 内部状态和工具副作用可能难以完整还原。
- **跨Harness迁移与超长程Agent验证**：训练数据复用、模型效果验证。

## Citation
Please cite this work as:

> Claire. "Harnessed Agentic RL: An Overview". Claire-notes (Oct 2026). https://claire-notes.github.io/HarnessedAgentictRL

Or use the BibTeX citation:

```bibtex
@article{Claire-HarnessAgenticRL,
  title = {Harnessed Agentic RL: An Overview},
  author = {Claire (qingYe)},
  journal = {claire-notes.github.io},
  year = {2026},
  month = {October},
  url = "https://claire-notes.github.io/HarnessedAgentictRL"
}
```
