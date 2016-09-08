---
layout: post
title: Run IPython Remotely Using Jupyter Notebook
---

If you want to run a Python script on remote server, you can [run it through Screen or Byobu](https://yangcha.github.io/Byobu/). The only problem is that it is very slow to display the figures if the network connection is slow. The solution is to run the script in IPython remotely using Jupyter Notebook. 

IPython is an interactive commmand shell for Python. Jupyter Notebook(originally called IPython Notebook) is a web-based interactive computational environment for Python and other languages.

# Install Jupyter

A easy way to install Jupyter is to install Anaconda. Download Anaconda from [here](https://www.continuum.io/downloads). Install it on server and update it:

```bash
conda update conda
conda update anaconda
```

To run Jupyter Notebook:

```bash
jupyter notebook
```
Open `http://localhost:8888` in a web browser to connect to local Jupyter Notebook.


# Connect to Jupyter Notebook on a Remote Server

If you want to connect to Jupyter Notebook on a remote server in order to run Python scripts remotely, you can use SSH tunneling. Run the following command on a client machine:

```bash
ssh -L 8080:localhost:8888 username@server_address
```

If the client machine OS is Windows, you may install [mobaxterm](http://mobaxterm.mobatek.net/) first, then run the above command in mobaxterm.

Once SSH tunneling is estavblished, you can connect to the remote Jupyter Notebook by openning `http://localhost:8080` in a web browser on your client machine.



