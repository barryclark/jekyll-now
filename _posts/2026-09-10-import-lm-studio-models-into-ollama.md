---
title: "How to Import LM Studio Models into Ollama (No Re-Download!) 🚀"
description: "Learn how to import LM Studio models into Ollama on Windows in 5 easy steps. Reuse your GGUF files with a simple Modelfile. No re-downloading needed!"
date: 2026-09-10
tags: [ollama, lm studio, gguf, modelfile, local llm, windows, qwen3]
---

![Import LM Studio models into Ollama without re-downloading](/images/import-lm-studio-models-into-ollama-header.png)

Downloaded a bunch of models in **LM Studio**? 📦

Now you want to try **Ollama**... and it wants you to download them **all over again**? 😩

Nope! In this guide, you'll learn how to **import LM Studio models into Ollama** using the `.gguf` files already on your computer. It takes about 5 minutes. ⏱️

> 🖥️ **Example:** Qwen3 8B on Windows. Works with any GGUF model.

---

## ⚡ Quick Answer

Create a one-line Modelfile that points to your LM Studio `.gguf` file:

```text
FROM C:/path/to/your-model.gguf
```

Then import and run it:

```bash
ollama create qwen3 -f .\Modelfile.txt
ollama run qwen3
```

Want the easy step-by-step version? Let's go! 👇

---

## Step 1: Find Your GGUF Model Path in LM Studio 📋

In LM Studio, go to **My Models** → click **⋯** next to your model → **Copy absolute path**.

![How to copy the GGUF model path in LM Studio](/images/01-lm-studio-copy-path.png)

It looks something like this:

```text
C:/Users/YOU/.cache/lm-studio/models/lmstudio-community/Qwen3-8B-GGUF/Qwen3-8B-Q4_K_M.gguf
```

---

## Step 2: Create an Ollama Modelfile 📝

1. Create a folder, like `C:\ollama-models`
2. Inside it, create a file called `Modelfile.txt`
3. Type `FROM`, a space, then paste **your** path:

```text
FROM C:/Users/YOU/.cache/lm-studio/models/lmstudio-community/Qwen3-8B-GGUF/Qwen3-8B-Q4_K_M.gguf
```

Save it. That's the whole file. Really! 😄

![Ollama Modelfile pointing to an LM Studio GGUF model](/images/02-modelfile.png)

---

## Step 3: Install Ollama on Windows ⬇️

Grab it from the [official Ollama download page](https://ollama.com/download/windows) and install.

![Ollama download](/images/ollama-download.png)

Then open **PowerShell** and type:

```bash
ollama list
```

![Ollama list command showing no models installed](/images/04-ollama-list-empty.png)

Empty? Perfect. Let's fill it up. 👇

---

## Step 4: Import the Model into Ollama ✨

```bash
cd C:\ollama-models
ollama create qwen3 -f .\Modelfile.txt
```

💡 `qwen3` is just a nickname. Call it anything you like!

![Ollama create command importing an LM Studio model](/images/05-ollama-create.png)

See **success**? You did it! 🎉

---

## Step 5: Run Your Model in Ollama 👋

```bash
ollama run qwen3
```
![run qwen](/images/run_qwen.png)

Type a message, hit **Enter**, and chat away. 💬

![Chatting with the imported Qwen3 model in Ollama terminal](/images/07-chat-in-terminal.png)

Not a terminal fan? Open the **Ollama app** and pick `qwen3` from the list. 🖱️

![Using the imported Qwen3 model in the Ollama app](/images/08-ollama-app.png)

![ollama_ls](/images/ollama_ls.png)
---

## How to Remove an Imported Model from Ollama 🗑️

```bash
ollama stop qwen3
ollama rm qwen3
```

Relax, your LM Studio copy stays safe. 😌

---

## Troubleshooting 🤔

- **File not found?** Make sure your path ends with `.gguf` and you ran `cd` to the right folder first.
- **`ollama` not recognized?** Close PowerShell and open it again.

---

## FAQ ❓

**Does importing save disk space?**
No. Ollama makes its own copy of the model. You save download time, not space.

**Does this work with any LM Studio model?**
Yes, as long as the model is a `.gguf` file.

**Can I delete the model from LM Studio after importing?**
Yes! Ollama keeps its own copy, so it will still work. Just test it first. 😉

---

That's it! Now you know how to **import LM Studio models into Ollama**. One model, two apps, zero re-downloads. Happy chatting! 🤖
