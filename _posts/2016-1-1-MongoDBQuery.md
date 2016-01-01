---
layout: post
title: You're up and running!
---

Next you can update your site name, avatar and other options using the _config.yml file in the root of your repository (shown below).

![_config.yml]({{ site.baseurl }}/images/config.png)

The easiest way to make your first post is to edit this one. Go into /_posts/ and update the Hello World markdown file. For more instructions head over to the [Jekyll Now repository](https://github.com/barryclark/jekyll-now) on GitHub.


# MongoDB et Compagnie #

  ![](http://edumaven.com/mongodb/img/logo-mongodb-tagline.png)
           

            Summary:
            1.  CTRL + L: Hyperlink
            2.  CTRL + G: Image
            3.  Premiere cmd mongod dans bin: Lancement du serveur local
            4.  Deuxième cmd mongo dans le bin: Interrogation de la DB
            5.  Importer BD: Deuxième fenetre quit: mongoImport
            6.  Commande mongoimport: mongoimport --db test2 --collection city --type csv --file citie.csv --headerline
            7.  F5: Live Preview
            8.  F11: Distraction free mode


           To Understand quickly

           1. Comprendre diffrence find et distinct
           2. Comprendre interet Map Reduce
           3. Comprendre ineret tableau dans le code
           4. Comprendre intéret reduce input
          

           To Do more quickly
           1. Wordcloud fonction Mongo et action demandées                 
           
           
          
## Plan ##
#### Installation de MongoDB ####
#### Mise en route de MongoDb ####
#### Importer une Base de donnée sur MongoDB ####
#### Application MongoDB ####




#### Projet MongoDB Appiclation ####




* Ouvrir mongoDB
* Fichier Line C Sharp
* RoboMongo à telecharger
* Robomongo Tutoriel
* Importer fichier Base de donnée MongoImport

         mongoimport --host 127.0.0.1 --port 27017 --username username --password password --db test --collection maCollection --type csv --file maCollection.json

* Appliquer à cities 1500.csv

          mongoimport --db users --collection Villes --type csv --headerline --file C:/Users/Yacine/Desktop/cities15000.csv
          

Struture: nom+"espace"+"--"
Exemple: mongoimport --d test2 --c city --type csv --file citie.csv --headerline

**Ligne de commande qui fonctionne** 

** Utiliser pour la base de donnée cs training! **

          mongoimport --db test2 --collection city --type csv --file citie.csv --headerline

#### Struture à retenir ####
1. db test2
2. c city2
3. type csv
3. file C:/Users/Yacine/Desktop/cities15000.csv
4. headerline

#### Tutoriel MongoDB ####


* Demarrer Mongod
* Demmarrer mongoexe
* Demarrer robomongo
* Crée Collection 
          db.createCollection('publis');
* Importer dans la collection le fichier csv
         mongoimport --db test2 --collection city --type csv --file citie.csv --headerline 
* Collection publis (ou collection choisis)

          db.getCollection('publis').find({}).count() 
          pour determiner le nombre d'objet dans la collection 
* Prendre un objet de la collection
* Definir une classe qui a les meme propriété que l'objet
* Ou paste json as classes
* Convertir object en objectId BSon
* Interrogation BD
1. Crée un client Mongo

        var client = new MongoDB.Driver.MongoClient();
        var client = new MongoClient();
2. On veut égélement un Database(Attetion sensible à la casse)
        var db = client.GetDatabase("dblp");
3. Dans la DB on veut la collection:

         var coll = db.GetCollection<publis>("publis");

4. Commencons maintenant à lui poser des questions (Trover un publlisher dans la bd)

         var publisherId =  new ObjectId("");
         var books = coll
         .Find(b => b.Publisher ==publisherId)
         .Limit(5)
         .ToListAsync()
         . Result;

         Console.WriteLine("Books:");
         foreach(var book in books)
         {
          Console.WriteLine(" * "+ book.Title) ;
          }


#### Requete MongoDB ####

3.3 Interrogation simple

Pour des recherches simples, il faut créer des “documents requêtes”.

Exemple : db.publis.find({“type”:“Book”});
Créer des requêtes simples pour les phrases suivantes :

1. Liste de tous les livres (’Book’)


        db.publis.find({"type" : "Book"});

2. Liste des publications depuis 2011 

        db.publis.find({year : {$gte : 2011}});
3. Liste des livres depuis 2014 ;

        db.publis.find({"type" : "Book", year : {$gte : 2014}});
4. Liste des publications de “Toru Ishida” ;

        db.publis.find({authors : "Toru Ishida"});
5. Liste de tous les publieur (“publisher”), distinctes ;

        db.publis.distinct("publisher");
6. Liste de tous les auteurs distincts ;

         db.publis.distinct("authors");
*---------------------------------------------------------------------------------------------------------------------------------------------
7. Trier les publications de “Toru Ishida” par titre de livre et par pages de début 

        db.publis.aggregate([{$match:{authors : "Toru Ishida"}},
        { $sort : { booktitle : 1, "pages.start" : 1 } }]);


8. Projeter le résultat sur le titre de la publication, et les pages ;

        db.publis.aggregate([{$match:{authors : "Toru Ishida"}},
        {$sort : { booktitle : 1, "pages.start" : 1 }},
        {$project : {title : 1, pages : 1}}]);
9. Compter le nombre de ses publications ;

       db.publis.aggregate([{$match:{authors : "Toru Ishida"}},
        {$group:{_id:null, total : { $sum : 1}}}]);

10. Compter le nombre de publications depuis 2011 et par type ;

        db.publis.aggregate([{$match:{year : {$gte : 2011}}},
        {$group:{_id:"$type", total : { $sum : 1}}}]);

11. Compter le nombre de publications par auteur. Trier le résultat par ordre croissant ;

        db.publis.aggregate([
        { $unwind : "$authors" },
        { $group : { _id : "$authors", number : { $sum : 1 } }},
        {$sort : {number : -1}}
         ] );

-----------------------------------------------------------------------------------------------------------------------------------------------

**3.5 Map/Reduce**

Pour chaque document de type livre, émettre le document avec pour clé “title”

       var mapFunction = function () {if(this.type == "Book") emit(this.title, this);};

       var reduceFunction = function (key, values) {return {articles : values};};

       var queryParam = {query:{}, out:"result_set"};


ou

       var mapFunction = function () {emit(this.title, this);};

       var reduceFunction = function (key, values) {return {articles : values};};

       var queryParam = {query:{type : "Book"}, out:"result_set"};

//Peut être plus efficace si un index est présent sur le type

2. Pour chacun de ses livres, donner le nombre de ses auteurs


        var mapFunction = function () {

         if(this.type == "Book")
            emit(this.title, this.authors.length);};

        var reduceFunction = function (key, values) {return {articles : values};};

        var queryParam = {query:{}, out:"result_set"};

3. Pour chaque document ayant “booktitle” (chapitre) publié par Springer, donner le nombre deses chapitres en a plus d’un.
Attention, la fonction reduce n’est évaluée que lorsqu’il y a au moins 2 documents pour une même clé. Il est donc nécessaire d’appliquer un filtre après génération du résultat.

        var mapFunction = function () {
          if(this.publisher=="Springer" && this.booktitle)
          emit(this.booktitle, 1);};

        var reduceFunction = function (key, values) {return Array.sum(values);};

        var queryParam = {query:{}, out:"result_set"};

        db.publis.mapReduce(mapFunction, reduceFunction, queryParam);

        db.result_set.find({value:{$gte:2}});

4. Pour chaque publieur “Springer”, donner le nombre de publication par année

        var mapFunction = function () {
        if(this.publisher == "Springer")emit(this.year, 1);};

        var reduceFunction = function (key, values) {
        return Array.sum(values);};

5. Pour chaque clé “publisher & année” (pour ceux qui ont un publisher), donner le nombre de publications
Attention, la clé du emit doit être un document

        var mapFunction = function () {
        if(this.publisher)
        emit({
        publisher:this.publisher, year:this.year}, 1);};

        var reduceFunction = function (key, values) {
        return Array.sum(values);};

6. Pour l’auteur “Toru Ishida”, donner le nombre de publication par année

        var mapFunction = function () {
        if(Array.contains(this.authors, "Toru Ishida"))
        emit(this.year, 1);};

        var reduceFunction = function (key, values) {return Array.sum(values);};

        var queryParam = {query:{}, out:"result_set"};

ou


        var mapFunction = function () {emit(this.year, 1);};

        var reduceFunction = function (key, values) {return Array.sum(values);};

        var queryParam = {query:{authors:"Toru Ishida"}, out:"result_set"};

 

7. Pour l’auteur “Toru Ishida”, donner le nombre moyen de pages pour ses articles (type Article)

        var mapFunction = function () {
        emit(null, this.pages.end - this.pages.start);};

        var reduceFunction = function (key, values) {return Array.avg(values);};

        var queryParam = {query:{authors:"Toru Ishida"}, out:"result_set"};


8. Pour chaque auteur, donner le titre de ses publications


Attention, la sortie de map et du reduce doivent être des documents (pas des tableaux)

        var mapFunction = function () {

        for(var i=0;i<this.authors.length;i++)
        emit(this.authors[i], this.title);};

        var reduceFunction = function (key, values) {
        return {titles : values};};

9. Pour chaque auteur, donner le nombre de publications associé à chaque année

         var mapFunction = function () {

         for(var i=0;i<this.authors.length;i++)
         emit({author : this.authors[i], year : this.year}, 1);};

         var reduceFunction = function (key, values) { 
         return Array.sum(values);};


10. Pour le publieur “Springer”, donner le nombre d’auteurs différents par année

          var mapFunction = function () {

          for(var i=0;i<this.authors.length;i++)
          emit(this.year, this.authors[i]);};

          var reduceFunction = function (key, values) {var distinct = 0;var authors = new Array();

          for(var i=0;i<values.length;i++)

          if(!Array.contains(authors, values[i]))
          {distinct++;authors[authors.length]  = values[i];}
           return distinct;};

11. Compter les publications de plus de 3 auteurs ;

        var mapFunction = function () {if(this.authors.length >3)emit(null, 1);};

        var reduceFunction = function (key, values) {return Array.sum(values);};

12. Donner pour chaque publieur, donner le nombre moyen de pages par publication 


        var mapFunction = function () {

        if(this.pages && this.pages.end)
         emit(this.publisher, this.pages.end - this.pages.start);};

        var reduceFunction = function (key,    values) {return Array.avg(values);};

        var queryParam = {query:{}, out:"result_set"};

13. Pour chaque auteur, donner le minimum et le maximum des années, ainsi que le nombre de
publication totale ;

        var mapFunction = function () {

        for(var i=0;i<this.authors.length;i++)
        emit(this.authors[i], {min : this.year, max : this.year, number : 1});};

        var reduceFunction = function (key, values) {
        var v_min = 1000000;var v_max = 0;var v_number = 0;

        for(var i=0;i<values.length;i++){

        if(values[i].min < v_min)v_min = values[i].min;

        if(values[i].max > v_max)v_max = values[i].max;

        v_number++;
        }
        return {min:v_min, max:v_min, number:v_number};};














####  Indexation 2Dsphere ####

0.  Creation index 2DSphere 

          db.cities.createIndex({"location":"2dsphere"});


1. Récupérer les coordonnées de la ville de Paris, Lyon et Bordeaux: OK

           db.cities.find({"name": {$in:["Paris","Lyon","Bordeaux"]}},{name:1, "location.coordinates":1, _id :0}); 
     


2. Trouver les villes autour de Paris dans un rayon de 100km (Opérateur $near):


         db.cities.find({location:{$near:{$geometry : {type : "Point", coordinates : [2.3488, 48.85341]}, $maxDistance : 100000}}}).count();


3.  Calculer la somme des populations de cette zone.



         db.cities.aggregate([{"$geoNear: {"near": {"type": "Point", "coordinates": [2.3488, 48.85341]}, "maxDistance": 100000, "distanceField": "outputDistance", "spherical": true}}, {"$group": {"_id": null, "total": {"$sum" : "$population"}}}]);


4. Trouver les villes comprises dans le triangle Paris-Lyon-Bordeaux (Opérateur $geoWithin)
        db.cities.find({location : {geowithin : {$geometry :{ type : "Polygon", coordinates : [[[ 2.3488, 48.85341], [4.84671, 45.74846], [ -.5805, 44.84044], [2.3488, 48.85341]]], limit : 1000000}}}}, {name : 1, _id : 0 }).explain();
