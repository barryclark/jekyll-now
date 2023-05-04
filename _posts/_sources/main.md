---
jupytext:
  text_representation:
    extension: .md
    format_name: myst
kernelspec:
  display_name: Python 3
  language: python
  name: python3
---

# Preamble
If your posts contain lots of math along with code (e.g. writing about a new machine learning or robotics research paper), you may find this post useful. On the other hand, if your posts are mostly about code (e.g. writing about how to use an existing package / library), this post may be overkill for you. Okay, let's get started.

The beautiful and powerful [Jupyter Book](https://jupyterbook.org/en/stable/start/overview.html) ecosystem is meant for writing online books with publication quality content. However, we will be using this ecosystem to write a short blog post, a.k.a. *an article* in Jupyter Book parlance. Jupyter book offers tremendous functionality and flexibility, but we will focus on getting up-and-running quickly by creating a post from a single markdown file.

# Setup
Following steps:

1. Each blog post (or article) must have its own directory, referred to as the project root directory. This root directory will eventually be turned into a github repository. If you intend to write multiple posts, it may be a good idea to create a parent directory to conain all your project root direrctories.

:::{code}
cd /parent/directory/

mkdir myblogpost
:::

2. Create a python virtual environment to install required dependencies for Jupyter Book to work properly.

```{code}

mkdir venv

virtualenv -p python3 ./venv

. ./venv/bin/activate
```

3. Insall `jupyter-book`

:::{code}
pip install -U jupyter-book
:::

4. Next we install the `sphinx-proof` package for supporting theorem/proof like constructs in our post.

:::{code}
pip install sphinx-proof
:::

5. Change directory to the project root directory
:::{code}
cd myblogpost
:::

6. Each project root directory must have at least three files:
	- `_config.yml` for configuring the content of the post
	- `_toc.yml` for configuring the structure of the post
	- `<main>.md` contains the content to be rendered as HTML / PDF.
	:::{note}
	`jupyter-book` can create a full HTML website from multiple content files of type `*.md` or `*.ipynb`. We will keep things simple here and use a single `.md` file.
	:::

7. Create the `_config.yml` file

```{code}
touch _config.yml
```

and add the following content to it

:::{code}
# In _config.yml
title: My First Blog Post
author: Your Name
# logo: logo.png
execute:
  execute_notebooks: force

# Add a bibtex file so that we can create citations
# bibtex_bibfiles:
  # - references.bib

parse:
  myst_enable_extensions:
    # don't forget to list any other extensions you want enabled,
    # including those that are enabled by default!
    - amsmath
    - dollarmath
    - linkify
    - colon_fence
    - html_image

sphinx:
  extra_extensions:
    - sphinx_proof
:::

8. Create the `_toc.yml` file

```{code}
touch _toc.yml
```

and add the following content to it

:::{code}
# In _toc.yml
format: jb-article
# format: jb-book
# root: main
# chapters:
# - file: mardown
# - file: notebooks
# - file: markdown-notebooks
:::

9. Create the main content file for the post
:::{code}
touch main.md
:::

and add the following meta data at the top

```
---
jupytext:
  text_representation:
    extension: .md
    format_name: myst
kernelspec:
  display_name: Python 3
  language: python
  name: python3
---
```
:::{note}
The `format_name: myst` refers to [MYST markdown](https://jupyterbook.org/en/stable/content/myst.html), a fancier flavor of markdown which supports more math-heavy content. 

:::

10. Now we are ready to build our bare-bones, content-less blog post. Run the below build command

:::{code}
jb build main.md
:::

Once the execution completes, you should see the following message on the command line

```
=======================================================

Page build finished.
    Your page folder is: _build/_page/main/html/
    Open your page at: _build/_page/main/html/main.html

=======================================================
```

11. View `_build/_page/main/html/main.html` in the browser of your choice. It should look something like this:

<img src="./images/bare_bones_post.png" width=500 length=500>

# Adding content
## Equations
Jupyter Book supports multiple ways to write equations. Most LaTex-like functionality is supported via Mathjax (read more [here](https://jupyterbook.org/en/stable/content/math.html#math-and-equations)). Most environments such as `equation`, `equation*`, `align`, etc. work as expected. 

:::{note}
The syntax for labeling equations differs from the standard LaTex syntax. The standard `\label` command is not recognized in the current version (details at the link above).
:::

Inline math `$ax = b$` will look like this $ax = b$. While

:::{code}
$$Ax = b$$
:::

will produce the following block:

$$Ax = b$$

Alternatively, you can directly use the `equation*` or `align*` environments in your markdown file. e.g.

:::{code}
\begin{equation*}
Ax = b
\end{equation*}
:::

will produce

\begin{equation*}
Ax = b
\end{equation*}


If you want the equation to be numbered, add a label like this ```$$Ax = b$$(eq1)```. This will result in:

$$Ax = b$$(eq1)

You can also use the `{math}` directive to declare a math block like this.

:::{code}
```{math}
:label: eq2
\begin{equation}
\begin{split}
   Ax = b\\
   Cx = d
\end{split}
\end{equation}
```
:::

The above block will produce:

```{math}
:label: eq2
\begin{equation}
\begin{split}
   Ax = b\\
   Cx = d
\end{split}
\end{equation}
```

::::{note}
Adding a label to the math block (like above) produces a numbered math block. If you want an un-numbered equation, use the `$$ $$` block or use the `equation*` environment directly in your markdown file (without the math block). e.g.

:::{code}
\begin{equation*}
	Ax = b
\end{equation*}
:::

will produce:

\begin{equation*}
	Ax = b
\end{equation*}
::::


You can also reference equations easily. Use ```{eq}`eq1` ``` to reference {eq}`eq1` and ```{eq}`eq2` ``` to reference {eq}`eq2`.

## Definitions, Theorems and Proofs



