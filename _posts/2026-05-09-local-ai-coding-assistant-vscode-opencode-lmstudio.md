---
title: "How to Run a Free AI Coding Assistant Locally with VS Code, opencode, and LM Studio"
description: "Set up a free AI coding assistant that runs entirely on your own PC. Step-by-step guide using VS Code, opencode, and LM Studio with a local Qwen3 8B model."
date: 2026-09-05
tags: [local-llm, ai-coding-assistant, lmstudio, opencode, vscode, qwen3, offline-ai]
categories: [tutorials]
---

Every AI coding assistant wants your credit card. And your code.

There's a third option, and it costs nothing: run the whole thing on your own computer. No subscription. No internet. Your code never leaves your machine.

I set this up on a fairly ordinary PC, and it works. Here's exactly how.

## What you're building

Three pieces working together:

- **LM Studio** — runs the AI model on your PC. This is the engine.
- **opencode** — the coding assistant that reads and edits your files.
- **VS Code** — where you actually write code.

LM Studio does the thinking. opencode does the work. VS Code is where you sit.

**My setup:** Windows, RTX 3070 Ti with 8GB VRAM, 16GB RAM. That's a mid-range gaming PC, not a workstation. If yours is similar, you're fine.

## Step 1: Install LM Studio

Download it from [lmstudio.ai](https://lmstudio.ai/download/) and install it like any normal app.

LM Studio lets you download and run open-source AI models directly on your computer. It's the easiest way into local AI — no command line required.

![LM Studio app home screen](/images/lmstudio-home.png)

## Step 2: Download the model

Open the search inside LM Studio and look for **qwen3 8b**.

You'll see a lot of versions. Check these three things before you download:

- **Format:** GGUF
- **Quantization:** Q4_K_M
- **Capabilities:** "tool use" must be listed

Why those matter, in plain English:

**Quantization is compression.** Q4_K_M shrinks the model so it fits on a smaller graphics card. You lose a little quality, but you gain the ability to actually run it.

**Tool use is non-negotiable.** A coding assistant needs to open your files and edit them. A model without tool use can only chat about your code — it can't touch it. Skip this check and nothing will work later.

![Searching for the Qwen3 8B model in LM Studio](/images/lmstudio-model-search.png)

Got different hardware? Pick a model that fits it. Bigger models are smarter but hungrier. An 8B model is a comfortable fit for 8GB of VRAM.

Once the download finishes, your model shows up under **My Models**.

![Downloaded models list in LM Studio](/images/lmstudio-my-models.png)

## Step 3: Load the model

Go to the **Developer** tab and select your model.

Turn on **"Manually choose model load parameters"**, then click the small arrow next to the model name to open the settings.

![LM Studio developer tab with model load settings](/images/lmstudio-developer-tab.png)

Now find **context size** and set it to **16000**.

Context size is how much text the model can hold in its head at once — your question plus its answer plus whatever code it's looking at. Bigger context means it understands more of your project. It also eats more VRAM.

16000 is a good number for 8GB. If you have less, go lower. If the model refuses to load, lower it again and try once more.

![Setting context size to 16000 in LM Studio](/images/lmstudio-context-size.png)

## Step 4: Turn on the server

Flip the server status to **Running**.

![LM Studio local server running](/images/lmstudio-server-running.png)

Your model is now live at `http://127.0.0.1:1234`.

That address is your own machine talking to itself. Nothing is going out to the internet — which is the entire point.

## Step 5: Install VS Code and opencode

Install VS Code if you don't have it.

Then install opencode. On Windows in command prompt, the simplest route is npm:

```bash
npm install -g opencode-ai
```

Open a terminal inside VS Code (**Terminal → New Terminal**) and type:

```bash
opencode
```

opencode starts up right there in the terminal panel.

![opencode running in the VS Code terminal](/images/opencode-terminal.png)

## Step 6: Point opencode at your local model

Here's the part that trips people up. opencode has no idea your model exists yet. You have to tell it, using a config file.

Create the config file — [here's mine](https://gist.github.com/Aravinda89/4e62deab8078d6879282a7b930bf3360) 

{% gist Aravinda89/4e62deab8078d6879282a7b930bf3360 %}

save it to:
```
C:\Users\YOUR_USERNAME\.config\opencode
```

Swap `YOUR_USERNAME` for your actual Windows username. If that folder doesn't exist, create it.

## Step 7: Pick your model and test it

Restart VS Code, then start opencode again.

Type `/models` and select **qwen/qwen3-8b** from the list.

![Selecting the local model in opencode](/images/opencode-model-list.png)

Now ask it to do something real. Give it a file to fix.

![opencode answering a coding question](/images/opencode-answer.png)

Want proof it's actually running locally? Switch over to LM Studio and check the logs. You'll see tokens streaming as the assistant types.

![LM Studio logs showing token generation](/images/lmstudio-logs.png)

That's your own GPU doing the work.

## What to expect

Let's be straight about this: a local 8B model is not going to match Claude or GPT on a hard architectural problem. It's smaller, and smaller means less capable.

But for the everyday stuff — writing boilerplate, explaining unfamiliar code, catching bugs, renaming things across files — it holds its own. And it's fast, because there's no network round trip.

The best part is what it costs: nothing, forever. No token limits. No monthly bill. Works on a plane.

If you have more VRAM than I do, try a larger model. Same steps, better results.
