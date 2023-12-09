---
layout: post
title: Talk to your code
---
<h3><I>Hands-on guide to leveraging Conversational Retrieval Chains & LLM for Effective Questions and answering with codebase.</I></h3>

-----------------------------------------------------------------------------------------------------------------

<img title="The Potato Eaters, 1885 by Van Gogh" src="../images/posts/post_6/title.jpg" alt="AI is writing poems, drawing paintings, and creating music while humans work on minimum wage - Twitter.">

-----------------------------------------------------------------------------------------------------------------

The Potato Eaters, 1885 by Van Gogh (Source)"AI is writing poems, drawing paintings, and creating music while humans work on minimum wage" - Twitter.
Well AI might not be ready to ready to solve all our problems and send us on vacation, but it can help us speed up our work and make life easier for us. We can use the latest open-ai models to help build knowledge repositories and use them to help us create content faster.
Note: Before we get started, full code can be found in my repository here. If you just wanna get started with code directly.
Problem Statement
As engineers, we often work we a vast number of external frameworks, and the tech landscape evolves at a breathtaking pace, this is especially true in the Data Science and Machine Learning space. With new algorithms, methodologies, and tools constantly emerging, staying up-to-date can be a formidable challenge. This is where AI-driven tools like conversational retrieval chains come into play. By efficiently organizing and indexing information, these tools enable us to swiftly access relevant insights, best practices, and solutions to common challenges, empowering us to navigate the ever-changing tech landscape with confidence.
In large organizations, there are often internal tools and framework which are widely used and crucial to work inside the firm but lacks quality documentation and examples. We can use such an application to allow users to better use these codebases and tools.
Fine Tuning vs Prompt Engineering
Before we can ask questions to these models we would need to train it on our own custom codebase or a repo. But, fine-tuning is expensive and too complex for our small use case.
Thankfully these models can remember the previous conversations and use that information to build a knowledge store, we can use that to feed the model with our code and use the chain to ask questions from it.
Approach
We will use the following approach to build our application and allow users to interact with the conversational chain.
Clones a repository from the specified URL into a given root directory.
Loads API keys from creds.json OpenAI and ActiveLoop.
Loads documents from the cloned repository.
Splits documents into text chunks and builds a vector store.
Builds a Q&A chain using the provided model name.
Initiates a Q&A loop, interacting with the user through the console.

Clone the repository
Let us start by cloning the repository which we wish to build a knowledge store for, you can easily modify the code to clone and store a whole list of repositories and allow the model to answer questions from them.

```python
def run_command(cmd: str) -> None:
    """
    Execute console commands.

    Args:
        cmd (str): The command to be executed.
    """
    print("=" * 10)
    print(f"Executing: {cmd}")
    subprocess.run(cmd, check=True)
    print("=" * 10)
```

```python
def clone_repo(url: str, repo_root_dir: Optional[str] = None) -> str:
    """
    Clone a repository from a given URL.

    Args:
        URL (str): The URL of the repository to clone.
        repo_root_dir (str, optional): The directory where the repository will be cloned. If not provided,
                                  a temporary directory will be created.

    Returns:
        str: The path to the cloned repository.
    """
    if not repo_root_dir:
        repo_root_dir = TemporaryDirectory(prefix="qa_with_code").name

    run_command(f"git clone {url} {repo_root_dir}")

    return repo_root_dir
```
Load API keys
Before we can use the APIs from OpenAI or ActiveLoop, we would need to generate keys to access them. Currently, ActiveLoop provides free API to build vector stores but OpenAI's APIs are chargeable and would require a credit card, but currently, prices are really low for any model below GPT-4, you can check out the full price chart here.
To create OpenAI keys, log into your account and go to Manage Account, and select API Keys. Create new secrets and save the key into a JSON file or as an environment variable named OPENAI_API_KEY
Follow similar steps for Activeloop API and save it either into a JSON file or as an environment variable named ACTIVELOOP_TOKEN once saved we can use these tokens to access the APIs.

```python
def load_creds() -> None:
    """
    Load API keys from 'creds.json' file and set environment variables.
    """
    with open("creds.json", "r+") as file:
        keys = json.loads(file.read())
    os.environ["OPENAI_API_KEY"] = keys["OPENAI_API_KEY"]
    os.environ["ACTIVELOOP_TOKEN"] = keys["ACTIVELOOP_TOKEN"]
```

Load and Split Documents
As we cannot send the entire code base to the model in one single prompt we would need to load and split the docs into small chunks in specific chunks before we can start our conversational chain.
First, we would need to load all the files in our code base as text to build a list of documents we want to send to our model.
```python
def load_docs(root_dir: str) -> List[Any]:
    """
    Load documents from the specified directory.

    Args:
        root_dir (str): The directory containing the documents.

    Returns:
        List[Any]: A list of loaded documents.
    """
    docs = []
    for dirpath, _, filenames in os.walk(root_dir):
        for file in filenames:
            try:
                loader = TextLoader(os.path.join(dirpath, file), encoding="utf-8")
                docs.extend(loader.load_and_split())
            except Exception as e:
                print(str(e))
    return docs
```

Now we can chunk these documents into equal sizes to be able to feed into the model as prompts.

```python
def text_splitter(docs: List[Any], chunk_size: int = 1000) -> List[str]:
    """
    Split the input documents into text chunks.

    Args:
        docs (List[Any]): List of documents to be split.
        chunk_size (int): Size of each text chunk.

    Returns:
        List[str]: List of text chunks.
    """
    splits = CharacterTextSplitter(chunk_size=chunk_size, chunk_overlap=0)
    texts = splits.split_documents(docs)
    return texts
```    
Build Q&A Chain
Now we can feed these documents as prompts to model through API and build a conversational chain to be able to ask questions.

```python
def build_qa_chain(db: Any, model_name: str) -> Any:
    """
    Build a conversational retrieval chain for Question & Answer.

    Args:
        db (Any): The vector store containing the documents.
        model_name (str): The name of the model to be used for Q&A.

    Returns:
        ConversationalRetrievalChain: The constructed Q&A chain.
    """

    retriever = db.as_retriever()
    model = ChatOpenAI(model_name=model_name)  # switch to 'gpt-4'
    qa = ConversationalRetrievalChain.from_llm(model, retriever=retriever)

    return qa
```
Q&A Loop
```python
def qa_loop(qa: Any):
    """
    Start a Question & Answer loop using the provided Q&A chain.

    Args:
        qa (ConversationalRetrievalChain): The Q&A chain for performing Q&A interactions.

    Returns:
        dict: A dictionary containing Q&A interactions and corresponding answers.
    """

    chat_history = []
    qa_log = {}
    print("Starting Q&A Prompt:")
    print(">> type `quit()` to exit")
    while True:
        question = input("Question:\n")
        if question == "quit()":
            print("Ending conversational chain, thank you!!")
            break
        result = qa({"question": question, "chat_history": chat_history})
        chat_history.append((question, result["answer"]))
        print("Answer:\n")
        print(result["answer"])
        print("=" * 10)
        qa_log[question] = result
    return qa_log
```

We can now use this chain to ask questions about our code base and even ask it to create certain examples for us.
Bring it all Together.
Before we begin let us bring all the modules together and make sure we accept the repo URL and other parameters from the user in the command line.

```python
def main(repo_url: str, user_name: str, root_dir: str, model_name: str):
    """
    Main function for executing the Q&A process.

    Args:
        repo_url (str): The URL of the repository to clone.
        root_dir (str): The directory where the repository will be cloned.
        model_name (str): The name of the model to be used for Q&A.

    Returns:
        None
    """
    # Clone the repository
    root_dir = clone_repo(repo_url, root_dir)

    # Load API keys
    load_creds()

    # Load documents from the repository
    docs = load_docs(root_dir)

    # Split documents into text chunks
    texts = text_splitter(docs)

    # Build a vector store and upload texts
    db = build_db(texts, user_name, f"test-open-ai-{int(time()) % 1000}")

    # Build the Q&A chain
    qa = build_qa_chain(db, model_name)

    # Start the Q&A loop
    qa_loop(qa)
```
Lets Talk
Let us use the Kedro library to see how all of this works, use the below command to run the script.

```bash
>> python main.py --url <repository_url> --uname <user_name> --root_dir <desired_root_dir> --model_name <desired_model_name>

# Make sure to replace <repository_url>, <user_name> <desired_root_dir>,
# and <desired_model_name> with actual values when using the script.
# <desired_root_dir> and <desired_model_name> are optional, 
# by default temporary directories and `gpt-3.5-turbo` model would be used.
Result
Starting Q&A Prompt:
>> type `quit()` to exit
Question:
What are Hooks ?
Answer:

Hooks are a mechanism in Kedro that allow you to add extra behavior to Kedro's main execution.
They provide a way to inject additional code at specific points in the execution of your Kedro pipeline.
This can be useful for tasks such as logging, data validation, or tracking metrics.
Hooks consist of a specification and an implementation, and can be registered in your project's settings file.

==========

Question:
List all the hooks that developers can use to customize their pipelines.
Answer:

Developers can use the following hooks to customize their pipelines:

- `before_node_run`: This hook is executed before each node in the pipeline is run.
- `after_node_run`: This hook is executed after each node in the pipeline is run.
- `before_pipeline_run`: This hook is executed before the pipeline is run.
- `after_pipeline_run`: This hook is executed after the pipeline is run.
- `before_dataset_loaded`: This hook is executed before a dataset is loaded.
- `after_dataset_loaded`: This hook is executed after a dataset is loaded.
- `before_dataset_saved`: This hook is executed before a dataset is saved.
- `after_dataset_saved`: This hook is executed after a dataset is saved.
- `after_context_created`: This hook is executed after the Kedro context is created.

By using these hooks, developers can add custom behavior or modify the execution flow of their pipelines.

==========

Question:
create a custom hook to measure amount of time each node takes to execute and print the result.
Answer:

Developers can create a custom hook to measure the amount of time each node takes to execute and print the result by following these steps:        

1. Define a class for your custom hook and import the necessary modules:

import time
from kedro.framework.hooks import hook_impl
from kedro.pipeline.node import Node


2. Implement the `before_node_run` method in your hook class. This method will be called before each node is executed:

@hook_impl
def before_node_run(self, node: Node) -> None:
    self._start_time = time.time()

3. Implement the `after_node_run` method in your hook class. This method will be called after each node is executed:

@hook_impl
def after_node_run(self, node: Node, inputs: Dict[str, Any]) -> None:
    execution_time = time.time() - self._start_time
    print(f"Node {node.name} took {execution_time} seconds to execute.")


4. Register your custom hook in your project's `hooks.py` file:

from my_package.my_hooks import CustomTimingHook

hooks = [CustomTimingHook()]


Now, when you run your Kedro pipeline, each node's execution time will be printed in the console.

==========

Question:
quit()
```
Ending conversational chain, thanks you!!
Conclusion
Through this exercise, I wanted to showcase the powerful LangChain framework and how we can very easily harness the power of new LLMs to build a new generation of simple and useful applications.
This code is rather simple as it was supposed to showcase different components used in building such an application. Feel free to contribute to the repo to further expand and improve the application.
Leave a comment to let me know what you think.
Connect with me over GitHub, Linkedin, or Medium.
Share the article with your network.