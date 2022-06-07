# Submodule

## Add submodule:

```bash
git submodule add <git-url> <optional: path to store>
```

## Update submodule:

```bash
## sync the url info
git submodule sync
## update && populate files
git submodule update --init
## REALLY go inside the submodule and pull files
git submodule update --init --remote
```

## Remove submodule:

To remove a submodule you need to:

1. Delete the relevant line from the *.gitmodules* file.
2. Delete the relevant section from *.git/config*.
3. Run *git rm --cached path_to_submodule* (no trailing slash).
4. Commit the superproject.
5. Delete the now untracked submodule files.
6. rm -rf .git/modules/<path-to-submodule>