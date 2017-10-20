---
layout: post
Title: Test of PostgreSQL's client failover
Draft: true
published: true
---
<!-- From french version -->

Today, I am going to talk about automatic failover.
<!-- Aujourd'hui, je vais vous parler de bascule automatique (automatic failover).-->

Not just failover on two different clusters, but on the client side.
<!-- Pas simplement de bascule d'instance (un primaire qui rencontre une panne et un standby qui prend le relai) 
mais de bascule côté client.-->

Because yes, PostgreSQL 10 that just came out allows client to reconnect automatically and it's a new feature.
After failure of the read-write cluster and switch a read-only cluster to new primary, the client can find the new read-write cluster.
It can also find either first read-only cluster (primary or secondary) or read-write cluster (primary only) if a desired connection requests it.
<!-- Car oui, PostgreSQL version 10 qui sort à la fin de l'année et dont la bêta est déjà disponible [ici](https://www.postgresql.org/about/news/1776/), comporte une nouvelle fonctionnalité. 
Celle-ci permet au client de se reconnecter automatiquement après une panne sur une instance acceptant les lectures-seules ou lectures-écritures (au choix).-->

This is a feature that I came across during PgDAY Paris in march 2017.
At the time, I hadn't fully realised the implications.
It is - at least to me - important enough to deascribe it to you in a detailled manner and with concret case.
<!-- Il y a quelque temps, je vous ai parlé à l'occasion du PgDAY Paris des nouvelles fonctionnalités attendues dans la prochaine version.
Je n'avais, à ce moment-là, pas réellement réalisé l'importance de cette fonctionnalité. 
Elle est suffisamment importante pour que je détaille de manière pratique son fonctionnement dans un cas concret.-->

## In the beginning...
<!--## Au commencement... -->

### Which HA solution ?
<!-- ### Quelle solution de HA ? -->

At the time, I was going through different automated failover solutions.
Indeed, I have been 
Je cherche actuellement une solution de bascule automatique.
En effet, les demandes pour de la haute disponibilité avec une bascule automatique en cas de panne sont plus en plus demandées chez mon client actuel.

Un test rapide me permit d'éliminer Stolon.
<!-- SAS&nbsp;: Test de quoi ? -->
De même, Patroni pris rapidement le chemin des disqualifiés.
Bien que les 2 solutions semblent fonctionner assez bien, elles n'étaient tout simplement pas ce que je recherchais&nbsp;: 
elles ne permettent pas d'être embarquées dans notre solution interne de déploiement chez le client.
C'est donc ce contexte spécifique qui me force ici à mettre de côté ces solutions.
<!-- SAS&nbsp;: Il faut être plus précis. On peut toujours penser que les solutions ne sont pas bonnes,
  alors que c'est peut-être le contexte le problème -->

Evidemment, Pacemaker/Corosync était en lice mais le failover sur un autre site était en cause&nbsp;: les options du cluster linux disponibles chez le client ne nous permettent pas de reprendre l'activité en basculant sur notre site de secours.
<!-- SAS&nbsp;: Pas compris -->
De plus la gestion serait alors dédiée à la partie adminsys, donc en dehors de notre périmètre.

Dernière option évidente&nbsp;: `REPMGR`.

Il me fallut un certains temps pour l'installer et arriver à la partie failover.
Finalement, j'avais ma configuration à 3 noeuds (+ 1 witness), même si les incidents réseaux étaient mal gérés.
Je sais que `REPMGR` n'est qu'une bascule de base de données, mais dans le choix d'une solution de haute disponibilité, c'est un aspect non négligeable.


Pour info voici un extrait de repmgr.conf.

~~~
cluster=test_repmgr
node=4
node_name=node4
conninfo='port=5432 host=server1 user=repmgr dbname=repmgr'
failover=automatic
promote_command='repmgr standby promote -f /etc/repmgr.conf --log-to-file'
follow_command='repmgr standby follow -f /etc/repmgr.conf --log-to-file'
                 # the server's hostname or another identifier unambiguously
                 # associated with the server to avoid confusion
logfile='/var/log/repmgr/repmgr-9.6.log'
pg_bindir=/usr/pgsql-9.6/bin/

master_response_timeout=5
reconnect_attempts=3
reconnect_interval=5
retry_promote_interval_secs=10

~~~

Ce qui est donc attendu est 5 + 3*5 = 20 secondes de downtime environ pour la base de données.



### Le client est roi


A partir de là, je cherchais comment il m'aurait été possible de mesurer le temps d'indisponibilité tout en gardant une connexion à la base de données avec pgbench en tâche de fond.
C'est alors qu'un de mes collègues me rappela cette fonctionalité de la libpq qui nous avait été présenté au PgDAY.
En effet, sans solution de bascule des connexions, il n'est pas possible de se reconnecter à la nouvelle instance acceptant les écritures à moins d'une réécriture manuelle de la chaîne de connexion.
Il m'apparu donc que le failover côté client de PG10 pourrait alors m'aider à mesurer le temps d'indisponibilité et la quantité d'écritures impactées lors de la bascule.

<!-- SAS&nbsp;: Je suis perdu. On parle de la fonctionnalité PG10 en intro. Puis de REPMAGR qui est la
super solution, pour dire qu'un collègue propose la fonctionnalité. Mais laquelle ? Repmgr, la
bascule PG10 ? -->

#### Comment ?

Il suffit de préciser dans la chaîne de connexion si l'on souhaite se connecter à une instance en lecture-écriture (primaire) ou une instance sans distinction lecture seule ou lecture-écriture (standby ou primaire).
<!-- SAS&nbsp;: pas clair du tout. Que veut-on mesurer ? -->
En l'occurence, pour un failover des écritures, il me faut retrouver une connexion sur un primaire acceptant les écritures.
Je cherche par la même occasion, à mesurer le temps d'indisponibilité total et à quantifier en terme de temps les écritures perdues pendant l'opération de failover.
<!-- /SAS -->
Une petite lecture de ce post nous permet d'avoir une idée sur la façon de procéder [ici](http://paquier.xyz/postgresql-2/postgres-10-libpq-read-write/).

Voici un petit extrait du script que j'ai écrit en suivant ces indications qui vous aiguillera encore d'avantage sur la façon de procéder&nbsp;:

~~~

TIME_RES=10000 # time resolution in µs

MONITORING_DB=monitoring_replication


PORT_1=5432
PORT_2=$PORT_1
PORT_3=$PORT_1

HOST_1=server1
HOST_2=server2
HOST_3=server3

CONNINFO="postgresql://"$HOST_1":"$","$HOST_2":"$PORT_2","$HOST_3":"$PORT_3"/"$MONITORING_DB"?target_session_attrs=read-write"

~~~



### Quantifier la perte d'écriture en terme de temps : Pourquoi ?

J'ai utilisé usleep pour écrire dans une table de log toute les 10ms en utilisant la chaîne de connexion décrite plus haut. 
Il est possible d'augmenter la fréquence d'échantillonnage de notre mesure. 
Cependant, j'ai choisi cette mesure pour tenter de respecter un ordre de grandeur determiné par les échelles de mon système&nbsp;:

1. en dessous (largement) du temps total d'indisponibilité attendu (environ 20 secondes voir plus haut)
2. en dessous du temps nécessaire à la bascule une fois l'opération de basculement déclenchée (de l'ordre de 1s)
3. au dessus des temps machines&nbsp;: connexion à l'instance, logs système et PG, frequence cpu... dans le cas contraire ma mesure aurait pu influencer le résultat par un trop grand nombre d'INSERTs à réaliser *. 

****
**NOTE**&nbsp;: * Ce qui aurait impacté les performances du serveur et de l'instance (imaginez une mesure toute les nanosecondes avec nanosleep&nbsp;: on atteindrait alors le milliard de tps !). 
Avec une mesure toute les 10ms, nous avons alors 100 tps seulement pour le traçage des écritures. 
Ce qui en soit correspond à un système avec une charge tout à fait honorable (environ 8 millions d'écritures par jour).
****

J'ai donc fait cet utilitaire&nbsp;: [monitoring_replication](https://github.com/emerichunter/monitoring_replication) pour mesurer le nombre d'écritures 
et le temps pendant lequel les écritures sont venues à manquer sur l'instance pendant la panne et le failover.
L'installation et le mode d'emploi sont expliqués en détails dans le README.


## Remplissons le WAL !


Tout d'abord, créons le bon scénario pour remplir notre FS de WAL. 
Nous regardons ensuite dans les traces laissées par repmgrd.log et dans la table de log créée et approvisionnée par notre utilitaire.

<!-- SAS&nbsp;: Ca sort d'où ? -->
Voici un extrait de la trace log de `repmgrd.log` correspondant au test de remplissage de FS.
La détection de la panne a lieu ligne 2. 
Les trois dernières lignes correspondent à la promotion du standby choisi en primaire.
Notez que le marqueur de temps comptabilise 21 secondes jusqu'à la promotion du standby en nouveau primaire.

~~~~

log node 2 (standby failover)
[2017-07-13 10:29:25] [ERROR] connection to database failed: could not connect to server: Connection refused
        Is the server running on host "server1" (172.134.11.45) and accepting
        TCP/IP connections on port 5432?

[2017-07-13 10:29:25] [ERROR] unable to connect to upstream node: could not connect to server: Connection refused
        Is the server running on host "server1" (172.134.11.45) and accepting
        TCP/IP connections on port 5432?

[2017-07-13 10:29:25] [ERROR] connection to database failed: could not connect to server: Connection refused
        Is the server running on host "server1" (172.134.11.45) and accepting
        TCP/IP connections on port 5432?

[2017-07-13 10:29:25] [WARNING] connection to master has been lost, trying to recover... 15 seconds before failover decision
[2017-07-13 10:29:30] [WARNING] connection to master has been lost, trying to recover... 10 seconds before failover decision
[2017-07-13 10:29:35] [WARNING] connection to master has been lost, trying to recover... 5 seconds before failover decision
[2017-07-13 10:29:40] [ERROR] unable to reconnect to master (timeout 5 seconds)...
[2017-07-13 10:29:45] [NOTICE] this node is the best candidate to be the new master, promoting...
[2017-07-13 10:29:46] [NOTICE] Redirecting logging output to '/var/log/repmgr/repmgr-9.6.log'
[2017-07-13 10:29:46] [ERROR] connection to database failed: could not connect to server: Connection refused
        Is the server running on host "server1" (172.134.11.45) and accepting
        TCP/IP connections on port 5432?

[2017-07-13 10:29:46] [ERROR] connection to database failed: could not connect to server: Connection refused
        Is the server running on host "PCYYYPFE" (172.134.11.99) and accepting
        TCP/IP connections on port 5432?

[2017-07-13 10:29:46] [NOTICE] promoting standby
[2017-07-13 10:29:46] [NOTICE] promoting server using '/usr/pgsql-9.6/bin/pg_ctl -D /appli/postgres/test_repmgr/9.6/data promote'
[2017-07-13 10:29:48] [NOTICE] STANDBY PROMOTE successful

~~~~

<!-- SAS&nbsp;: Comment sont-elles mesurées ? Et à quoi correspondent-elles ? -->
Regardons ensuite le résultat des insertions effectuées grâce à notre outil, comportant la chaine de connexion ainsi qu'une résolution temporelle de 10ms (1 INSERT toute les 10ms).
Voici les mesures de pertes d'écritures lors de notre bascule vers notre nouveau primaire. (extrait)
<!-- And then the time measurement of writes loss during client failover to the newly elected master. (extract) -->

|pk    | time                          |
|:----:|:-----------------------------:|
| 5876 | 2017-07-13 10:29:24.221169+02 |
| 5877 | 2017-07-13 10:29:24.277367+02 |
| 5878 | 2017-07-13 10:29:24.330156+02 |
| 5879 | 2017-07-13 10:29:24.388040+02 |
| 5880 | 2017-07-13 10:29:24.441046+02 |
| 5881 | 2017-07-13 10:29:24.493518+02 |
| 5882 | 2017-07-13 10:29:24.545547+02 |
| 5883 | 2017-07-13 10:29:24.597415+02 |
| 5884 | 2017-07-13 10:29:24.649334+02 |
| 5885 | 2017-07-13 10:29:24.701244+02 |
| 5886 | 2017-07-13 10:29:24.753549+02 |
| 5911 | 2017-07-13 10:29:46.685232+02 |
| 5912 | 2017-07-13 10:29:46.832526+02 |
| 5913 | 2017-07-13 10:29:46.886040+02 |
| 5914 | 2017-07-13 10:29:46.939793+02 |
| 5915 | 2017-07-13 10:29:46.997917+02 |
| 5916 | 2017-07-13 10:29:47.053968+02 |
| 5917 | 2017-07-13 10:29:47.108371+02 |

Les écritures ont repris au bout de 21 secondes. 
Le failover client fonctionne donc comme attendu. 


## Et ils vécurent heureux et eurent beaucoup de SELECT...

Nous avons de nouvelles écritures enregistrées au bout de 21 secondes, mais 25 INSERTS sont manquants (5886-5911).
Le client reçoit une erreur lorsque les fichiers n'ont pas pu être flushé sur disque. 
<!-- SAS&nbsp;: Comment voit-on les nouvelles écritures ? Que doit-on faire de ces inserts manquants ? Où
sont-ils ? Le client est-il prévenu ? -->

Que s'est il passé ? 

## Q & A

Nous allons par la suite procéder avec des questions/réponses. 


### Où sont les lignes manquantes ? 

<!-- SAS&nbsp;: Je ne suis pas sûr de comprendre la suite. -->
A ce stade, je préfère mentionner que le paramètre `synchronous_standby` est à ON.
Cependant, `synchronous_standby_names` est resté vide&nbsp;: le fonctionnement de bascule automatique de REPMGR n'est pas prévu pour cela et pourrait mal fonctionner.
Les écritures se comportent alors de manière asynchrones.
Le client obtient une réponse de confirmation lorsque les informations ont été flushées sur le disque du primaire.

Il reçoit une erreur lorsque l'espace disque vient à manquer sur le système de fichier. 
Le client ne fait pas de rollback, les écritures ne sont donc pas enregistrées durablement dans la base de données.
**Les lignes sont donc sur un fichier wal sur le primaire.**

### Pourrais-je éviter de perdre ces lignes à l'avenir ?
**Oui**, si j'active le synchronous_standby_names en identifiants les instances secondaires, les écritures se comporteront de façon synchrones et 
le client retrouve la main lorsqu'il a commité les informations sur les secondaires indiqués.
Je n'ai alors pas de perte d'écriture. 
Ce fonctionnement n'est pas compatible avec REPMGR (voir ci-dessus).


### Pourrais-je récupérer ces lignes ?
Si mon primaire peut-être rallumé et effectuer un redémarrage suivi d'une restauration de ses fichiers wal sans erreur (sans corruption), alors je pourrais remettre la main sur les écritures manquantes.
Dans le cas contraire, elles seront peut-être plus difficiles (impossible ?) à récuperer (**lien vers article corruption sur le blog**).
Il est à noter que les écritures restées dans le fichier wal n'ont pas reçu de confirmation en écriture.
Si la restauration ne trouve pas de point de cohérence lors la partie comportant les dernières écritures, elles seront rollbackées et n'apparaitront pas lors de l'interrogation de la base de données.
Si tout se passe pour le mieux, les écritures apparaitrons dans la base lorsque nous ferons une requêtes.
Je pourrai alors insérer ces lignes manquantes dans le primaire qui a pris le relai lors de la panne.

Ceci est une opération fastidieuse et difficile à automatiser, c'est pourquoi une bascule automatique doit être choisie en toute connaissance de cause surtout si la configuration nous impose (comme ici) de ne pas avoir de réplication synchrone.

<!-- SAS&nbsp;: Mais, alors, le client a une erreur. Les données ne sont pas marquées comme enregistrées
? -->


## Conclusion

<!-- SAS&nbsp;: PostgreSQL est génial. Mais je ne sais pas ce qui fonctionne, parce qu'on a perdu des
écritures. -->
La bascule **fonctionne** puisque nous retrouvons nos écritures qui continuent sur le nouveau primaire après la promotion.

Cependant, nous avons vu ensemble qu'une fois la bascule effectuée, il nous manquait des lignes dans notre table de log. 
Il est possible d'éviter de perdre ces lignes, et aussi de les récupérer si tout se passe correctement. 
En fonction de la configuration et de la solution de bascule automatique, je devrais, si nécessaire, restaurer mes données pour les réintégrer à ma nouvelle timeline. 

Mais encore une fois il est tout à fait possible d'éviter cet écueil en modifiant la configuration. 
Dans le cas d'une réplication synchrone cependant, il faut garder à l'esprit qu'une panne sur le réplica entraine le bloquage de la primaire qui ne peut commiter les information sur l'intégralité du cluster.
Choix cornélien, il faut bien l'avouer.

L'objet du présent post était principalement dédié à décrire la bascule automatique côté client et retrouver un accès en écriture sur un nouveau noeud. 
Nous avons pu constater que les écritures ont été mise en attente lorsque aucun noeud n'était disponible.
L'erreur remontée au client n'est pas documentée ici, cependant elle permet d'avoir un avertissement que nous pouvons confirmer lors de l'analyse des traces et de prendre les dispositions nécessaires.

Nous n'avons perdu "que" 25 écritures, soit 250 millisecondes (`10000µs*25`), malgré les 20 secondes d'indisponibilité.
C'est un moindre mal, mais si nous voulons garantir l'intégrité des données, il faut pouvoir mettre en oeuvre les moyens de conserver dans la mesure du possible cette intégrité.

<!-- Le temps pendant lequel aucune instance n'était disponible, les écritures ont été mises en attente par le client.-->

<!-- SAS&nbsp;: On les a perdu ou pas ? -->


