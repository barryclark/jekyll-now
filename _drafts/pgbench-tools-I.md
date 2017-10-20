---
layout: post
Title: Pgbench-tools - Introduction
Draft: true
published: true
---

During PgDAY Paris in march of 2017, I was lucky to watch Fabien Coelho's conference on becnhmarking. 
You may find a summary in french [here](/post/proper-benchmarking/)
I was also lucky to attend a lecture from Kaarel Mopel from Cybertec who mentionned `pgbench-tools` which I had to give a go ! 

## What is it all about ?


`pgbench-tools` is a tool that automates benchmarking performance tests.
It works on the well known [pgbench](https://www.postgresql.org/docs/9.6/static/pgbench.html), a tool among the contributions installed with a full installation of PostgreSQL.
Two scripts are used to wrap and make series of tests with pgbench.

It is also possible to collect statistics both from the OS (CPU, RAM, etc.) and from Postgres (buffercache, and checkpoints among other things).

There are also scripts for basic configuration and memory usage monitoring.

If that is not the case, I strongly recommend to get familiar with pgbench documentation if you are at all interested in benchmarking. 

## What can pgbench-tools do ?
It makes automated tests based on the different variables that you input : scale, client, duration of test, rushhour rate or normal rates.
One should never bench with only tps in mind but also latency, and for this option -R (option **SETRATES**) will reflect the activity on your cluster. It is up to you to know which rate applies.

## Prerequisites

* _**git**_&nbsp;:  with `git clone`, you can clone the repository to your local machine. Of course, it is also possible to download the archive in zip format and decompress.

* _**GNUplot**_ is used for the creation of graphs. I am afraid there is no substitute. 


## Installation

First, create database for the bench and for storing the results&nbsp;:

~~~
createdb results
createdb pgbench
~~~

Then, initialise the database with a script&nbsp;:

	psql -f init/resultdb.sql -d results

You should think about using  the correct database in the command line, but also in the `config` file which is fortunately at the root of the folder and filled very handily with default values.

At last, create a initial set which is going to be used as a baseline.

	./newset 'Initial Config'

## Vocubulary words

A **set** is a series of tests.
For a given configuration of pgbench-tools and of the cluster, the tools lauches a benchmark.
That way, everything can be categorised.
Le mot **Scale** qui peut se traduire littéralement par échelle.
On y fait parfois référence avec le terme "scaling factor" (facteur d'échelle).
Il correspond à un coefficient multiplicateur sur la taille de la base de données `pgbench`.

Les transactions par seconde seront abrégées par **tps**.

La valeur appelée **client** est le nombre d'accès concurrents à l'instance créés par l'outil pour simuler le nombre de clients.

La **latence** est le temps que met le client à rendre la main après l'envoi de la transaction.

Le tripyptique **avg_latency**, **max_latency**, **90%<**&nbsp;: respectivement latence moyenne, latence maximale et la valeur de latence du 9e décile.
Ils décrivent la répartition de la latence.

## Démarrage rapide

Les scripts importants pour bien démarrer sont&nbsp;:

* **newset**&nbsp;:
	* `./newset` donne la liste des sets qui ont été créés&nbsp;;
	* `./newset 'nom_du_test'` ajoute un nouveau set à la liste.
* **runset**&nbsp;: `./runset` lance la série de tests&nbsp;;
* **config**&nbsp;: donne la configuration à utiliser pour les tests, il est éditable via votre outil préféré (vim, nano, emacs)&nbsp;:
   * contient notamment les paramètres de connexion à l'instance&nbsp;;
   * la base utilisée pour le banc de test (par défaut `pgbench`)&nbsp;;
   * la base utilisée pour entreposer les résultats (par défaut `results`)&nbsp;;
   * le type de test (script) à effectuer (voir plus bas pour le détail). Et le répertoire dans lequel il se trouve (standard&nbsp;: 8.4 à 9.5 ou hors standard&nbsp;: 8.3 ou 9.6)&nbsp;;
   * les échelles de données (par défaut&nbsp;: 1, 10, 100, 1000)&nbsp;;
   * le nombre de fois qu'il faut reproduire les tests (par défaut 3)&nbsp;;
   * ainsi que le disque à monitorer pour collecter les statistiques système (par défaut `sda`).
* **webreport**&nbsp;: `./webreport` génère un rapport `index.html` avec des graphiques GNUplot. Il se lance automatiquement à la fin de la série de tests.

## Le rapport

Il comporte une partie vue générale&nbsp;:

   * un graphique avec deux courbes indiquant les tps et la taille de la base en fonction de l'échelle (attention, c'est la **valeur moyenne de tous les tests** qui est utilisée)&nbsp;;
   * un graphique avec une seule courbe indiquant les tps en fonction des clients. (Attention, c'est la **valeur moyenne de tous les tests** qui est utilisée)&nbsp;;
   * un graphique en 3D avec également la moyenne des résultats permettant de représenter les tps par client et facteur d'échelle&nbsp;;
   * un graphique comparatif des tests avec une courbe par test sur un même graphique représentant l'évolution des tps en fonction du facteur d'échelle et les tps en fonction du nombre de clients.

Vous trouverez ci-dessous deux exemples de graphiques produits&nbsp;:
![Exemple de tps vs Taille BDD et Facteur d'échelle](/images/post/pgbench-tools-2017/graph1_exple.png)

![Exemple de graph en 3d](/images/post/pgbench-tools-2017/graph-3d-pgb-tools.png)

Ensuite pour chaque test, un résultat plus détaillé est produit comportant&nbsp;:

   * un premier graphique tps par taille de base et facteur d'échelle (sur les données réelles et non plus sur les moyennes) puis un second avec l'évolution des **tps** en fonction du nombre de clients&nbsp;;
   * deux tableaux "résumé" (summary) un par facteur d'échelle et un par nombre de clients (`set`, `scale`, `tps`, `avg_latency`, `90%\<`, `max_latency`)&nbsp;;
   * un tableau "résumé" (summary) par nombre de clients, échelle et taux limite (`set`, `scale`, `clients`, `rate_limit`, `tps`, `avg_latency`, `90%\<`, `max_latency`)&nbsp;;
   * un tableau détaillé avec les valeurs significatives pour chaque test (`set`, `test`, `scale`, `clients`, `rate_limit`, `tps`, `max_latency`, `chkpts`, `buf_check`, `buf_clean`, `buf_backend`, `buf_alloc`, `max_clean`, `backend_sync`, `max_dirty`, `wal_written`, `cleanup`).


![exemple tableau pour le set 9](/images/post/pgbench-tools-2017/tableau-moyennes-p-echelle.png)

## Mise en garde et précaution

Il est important de coller à la réalité pour obtenir un résultat pratique.
Premièrement, je recommande vivement d'activer l'écriture dans les WAL (`fsync`) ainsi que la sauvegarde et l'archivage des WAL.

Ceci est d'autant plus important que les écritures ont lieu dans les WAL, dans la base, dans les `clog` et dans les logs.
Ces écritures ont un impact sur les performances lors du bench, désactiver l'écriture et l'archivage des WAL nuirait à la pertinence du résultat.

Au regard de ses informations, une fois le bench lancé, des WAL vont être produits, beaucoup de WAL, j'ai bien dit **BEAUCOUP** de WAL.
Vous pouvez donc choisir de faire une purge manuelle ou de mettre un système de fichiers immense pour anticiper ce problème.

## L'outil original et ses forks

L'outil original tel qu'il est sur le `git` de son auteur c'est [ici](https://github.com/gregs1104/pgbench-tools).

Pour ma part, je suis tombé sur des problèmes de compatibilité avec PostgreSQL 9.6.
Il m'a donc été nécessaire de mettre à jour l'outil.
Voici le lien à jour de juin 2017 pour [cette version](https://github.com/emerichunter/pgbench-tools) avec les modifications ad hoc.

En effet, dans la version 9.6, la génération de nombres aléatoires utilisée par les scripts pgbench change de format (cf. [documentation](https://www.postgresql.org/docs/9.6/static/pgbench.html)).
J'ai également intégré des modifications/améliorations dont je vous parlerai plus en détail dans le prochain article.


## Dans quel cas l'utiliser ?

1. **C'est un choix parfait pour faire une comparaison exhaustive du changement d'un
   paramètre**&nbsp;:
Vous souhaitez améliorer des performances de façon générale dans le cadre d'une utilisation particulière de votre instance de base de données.
Seules quelques heures de test sont nécessaires.
Il n'est alors pas nécessaire d'entrer plusieurs échelles&nbsp;: seule la vôtre convient.

2. **Votre configuration matérielle change**&nbsp;: Vous gagnez au loto et vous investissez dans votre matériel, ou au contraire les choix stratégiques vous imposent de virtualiser ou de diminuer le nombre de noeuds de votre infrastructure.
Vous souhaitez donc connaître la façon dont sera impactée votre instance avec ce nouveau matériel.
Une série de comparaisons avec les 2 configurations permettra de se rendre facilement compte de l'évolution.

3. **Il s'inscrit parfaitement dans le cas de ce que l'on pourrait appeler le "bench continu"**. (Vous êtes riche comme Bruce Wayne&nbsp;: du temps, de l'argent et évidemment un Bat-Computer).
Un serveur identique à la production sur lequel on répète des tests de bench en changeant des variables PostgreSQL.
Dans ce scénario, difficile à proposer dans un contexte de restriction financière, on peut même imaginer un petit cluster avec un rejeu des transactions de production grâce à un proxy ou à un fichier de log.
Nous reviendrons sur cette solution (passionnante à mon sens) dans un prochain article.

## Conclusion

Comme on peut le constater à la lecture de cet article, `pgbench-tools` est un outil exhaustif qui permet d'industrialiser et fiabiliser ses tests de performance, tout en générant un rapport complet.
Beaucoup d'aspects comme la reproductibilité, la sérialisation et les statistiques sont d'ores et déjà un bond en avant en comparaison de `pgbench` seul.

La compatibilité avec la version 9.6 étant un énorme frein, la correction me paraissait d'autant plus urgente avec la version 10 de PostgreSQL qui arrive à la fin de l'année.
J'ai poussé cette modification, mais celle-ci reste en attente de validation par l'auteur Greg Smith.
Je ne doute pas de la nécessité de devoir apporter d'autres corrections pour la nouvelle version qui s'annonce.

Trouvant un grand intérêt à cet utilitaire, j'ai décidé de le forker et d'y amener d'autres améliorations et corrections.
Je remets ici le lien : [pgbench-tools](https://github.com/emerichunter/pgbench-tools) avec les modifications si vous l'avez manqué plus haut.

Nous avons vu les possibilités théoriques de l'outil, dans le prochain volet, je vous parlerai de certaines fonctionnalités avancées avec des exemples pour démarrer un bench.

A vos benchs !
