def task_spellcheck():
    return dict(
        actions=['cspell -c .cspell/cspell.json _posts/*.md 404.md about.md'],
        verbosity=2,
    )
