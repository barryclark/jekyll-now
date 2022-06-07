# Env - anaconda/pip/poetry

---

---

## Pip

Init an env

```python
python3 -m venv ./.venv
```

Export to requirements.txt

```python
pip freeze > requirements.txt
```

Install from requirements.txt

```python
pip install -r requirements.txt
```

# Anaconda

Create env in current folder

```bash
conda create --prefix ./envs
## Or
conda create -p ./envs
```

Activate env

```bash
conda activate ./envs
```

Issue: Env name is too long

```bash
conda config --set env_prompt '({name}) '
```

Cancel “auto activate env”

```python
conda config --set auto_activate_base false
```

List env set

```bash
conda info --envs
```

Share Environment (output to environment.yml)

```bash
conda env export > environment.yml
```

### Install 3rd party package in Anaconda

[https://docs.conda.io/projects/conda/en/latest/user-guide/tasks/manage-pkgs.html#installing-non-conda-packages](https://docs.conda.io/projects/conda/en/latest/user-guide/tasks/manage-pkgs.html#installing-non-conda-packages)

1. Ensure there is pip installed INSIDE your current anaconda env by running `conda list | grep pip`
2. Run pip like usual to install the package you want

Below method is deprecated

1. ~Run conda create -n venv_name and conda activate venv_name, where venv_name is the name of your virtual environment.~
2. ~Run conda install pip. This will install pip to your venv directory.~
3. ~Find your anaconda directory, and find the actual venv folder. It should be somewhere like `/anaconda/envs/venv_name/`~
4. ~Install new packages by doing /anaconda/envs/venv_name/bin/pip install package_name.~

---

# Poetry

### Create new env

```python
poetry shell
# Or reactivate current venv by source xxxx
```

### Install defined dependencies

```python
poetry install
```