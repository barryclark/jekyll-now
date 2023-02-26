def task_spellcheck():
    return dict(
        actions=['cspell -c .cspell/cspell.json _posts/*.md'],
        verbosity=2,
    )
