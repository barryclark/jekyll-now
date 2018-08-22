---
layout: post
title: Wrestling with Scala database libraries
---

I've really enjoyed coding in Scala during my time as a back-end intern at [Truecaller](https://www.truecaller.com). It allows you to write really elegant and type-safe solutions while avoiding all the boilerplate you have to write in Java and other traditional static languages, and it also encourages you to write functional code.

One thing that seems to be lacking, however, is proper documentation for a lot of external libraries. I've run into several weird issues while working on a Scala project that requires a lot of database interactions, and while I've managed to solve the issues the journey towards solving them has been pretty messy. So, I figured it could be a good idea to document them here.

Slick magic causes bizarre errors with twitter4s
-----------------------------------------------
One part of my project follows a list of Twitter users which are stored in a Postgres table. The [twitter4s](https://github.com/DanielaSfregola/twitter4s) library then has a `StreamingClient` which accepts a `Seq[Long]`, which should be straightforward to get. So one naturally tries to fetch them this way using [Slick](http://slick.lightbend.com/):

```scala
dao.run(tweeters.map(_.id).result)
```

However, the return value will not work. I found this incredibly odd. The type returned is `Future[Seq[Long]]` so mapping this should work, right? But it doesn't.

```scala
val action = TweeterDao.tweeters.map(_.twitterId).result
val tweeters = Seq(28634867l, 31547704l, 1113942241l, 18941777l, 1344261205l, 122022318l, 104943486l, 328995303l, 14948611l, 19864223l, 89929673l, 528848733l, 496050817l, 267740219l, 845643132l, 22291443l, 318993474l, 25053123l, 20921291l, 21129331l, 68945032l, 140488453l, 197825824l, 24021197l, 2722177548l, 339107634l, 476764652l, 21486473l, 24265642l, 108906498l, 1269314047l, 2829792282l, 23308888l, 2466809932l, 199373792l, 108927409l, 19566644l, 1201747669l, 206582058l, 614299477l, 139127908l, 104778698l, 182520290l, 1378966748l, 278036073l, 393890670l, 25803598l, 19448284l, 877699123l, 327359409l, 552630315l, 878300089l, 422692987l, 46725883l, 39958883l, 30981659l, 108046242l, 111991054l, 20068313l, 78048238l, 580613218l, 19185125l, 124239708l, 37419686l, 3190906342l, 594930372l, 24874309l, 96089009l, 636302550l, 362444109l, 2890850363l, 51746591l, 2163521143l, 128176155l, 570028452l, 720518367l, 2404433921l, 426071524l, 141917431l, 606968732l, 104229816l, 2435618995l, 89427793l, 2253169846l, 196213234l, 301518835l, 1735498316l, 2436452542l, 377946745l, 19455187l, 20596565l, 613419622l, 402690401l, 1261508922l, 342607637l, 422877171l, 1196582724l, 23444635l, 98212710l, 1166961122l, 2410963622l, 321362887l, 302612407l, 1876698872l, 392684445l, 15402649l, 34907977l, 217031152l, 18781492l, 143457836l, 2151183954l, 2561165431l, 27500871l, 374186312l, 906096158l, 882653474l, 1724794465l, 1725739801l, 19161627l, 1469432677l, 362339392l, 19445100l, 21858579l, 27021309l, 18898111l, 2371881938l, 26754159l, 18778823l, 628665187l, 19284493l, 551838506l, 154050557l, 19853634l, 613309515l, 346795026l, 19085332l, 2903465373l, 782077896l, 871668595l, 73100393l, 963945493l, 1357201854l, 30199609l, 47329763l, 899371272l, 2386885596l, 806917014l, 74749621l, 989684827l, 148386719l, 18900142l, 20202859l, 628660217l, 321522177l, 23245616l, 272022187l, 1341924050l, 3034284701l, 2231927771l, 156635362l, 2369244312l, 18839942l, 2157225635l, 952437572l, 29401817l, 2149053198l, 118722303l, 1715348046l, 2490524403l, 771153540l, 157497762l, 1148390670l, 338026921l, 95972673l, 391707601l, 234807573l, 332901740l, 19314018l, 2629539781l, 400001248l, 706669183l, 146235861l, 725896819l, 62018785l, 2187103782l, 18694252l, 18720634l, 18778803l, 608202622l, 25266533l, 1564311799l, 1701494353l, 18447095l, 718855606l, 161963297l, 37868481l, 563652166l, 434733395l, 980415995629187072l, 19235477l, 19650143l, 2882613629l, 526517939l, 20841592l, 20582098l, 282740590l, 921655142l, 508586205l, 2297877809l, 565268225l, 122078343l, 135489572l, 237648982l, 43288429l, 2545009211l, 27856210l, 591865811l, 27914274l, 334672453l, 47407209l, 23512612l, 800281172l, 34743468l, 155324976l, 282532238l, 84310420l, 156348820l, 240631769l, 614512530l, 423559923l, 395542723l, 1408413445l, 368777408l, 542170497l, 36040217l, 299559374l, 186533780l, 104783793l, 3629980455l, 783065636l, 154116697l, 2481987373l, 102276010l, 61481011l, 142282561l, 18818550l, 2294337954l, 3457675883l, 31080756l, 435854067l, 32016073l, 306370816l, 2660021067l, 292331091)
  .sorted

val res = db.run(action).map { dbData =>
  println(s"Equal? ${tweeters == dbData.sorted}")
  streamingClient.filterStatuses(follow = dbData.sorted.toSeq) {
    case tweet: Tweet => println(tweet.text)
  }
}
```

The code above will print `Equal? true` and then fail because the IDs cannot in fact be processed even though they have been checked to be identical to the hardcoded IDs. Using the hardcoded ones will work fine. I figured that this must be some sort of weird effect from Slick doing a lot of advanced stuff behind the scenes, but I could not manage to figure out why the returned `Long`s where considered identical to the hardcoded ones but where impossible for twitter4s to use when constructing the streaming request.

After a prolonged and inconclusive search for a fix, I decided to just rewrite the code using [Quill](http://getquill.io/).

Quill - less boilerplate but no error messages
----------------------------------------------

Using Quill magically solved the ID issue, and now I could use the information stored in the database to start streaming. Nice! Another side-effect was that I could remove a lot of the boilerplate code Slick needs for specifying the tables and just let Quill figure it out on its own. This, however, would lead to some issues later.

Soon all the logic had been sketched and was ready for a test run. I ran `sbt run`, the various debug messages popped up and the first tweet was printed and was ready to be processed. And then nothing happened. I was able to verify that the issue centered around the code for inserting the tweet into the database. For some reason, the code was just blocking when it reached the insert, and was not returning anything. It turns out that failed SQL queries just block indefinately without providing any error. At least that's the case with the Postgres driver that I was using.

The only way I was able to deduce this was by giving up on the blocking driver and using the async one instead. This fealt like it would be a good move either way since blocking in DB I/O feels a bit wrong to begin with. The unintended side-effect was that now when queries failed they would do so in `Future`s which would result in actual error messages being displayed. This lead me to find the first error mentioned in the first paragraph about having to be careful regarding Quill's table inference. I had renamed a field in the case class I was using without updating the corresponding table column.

But that just resulted in another error surfacing. For some unknown reason two fields, the tweet ID and the creation date, being inserted into the database where being set to null. It wasn't a problem with the types of those fields, as there were other `Long`s for example. I still don't know what fixed it. The last thing I changed was the name of the `id` field to `tweetId` and after that everything worked. Just as I was writing this I tried changing it back. Still worked.

¯\_(ツ)_/¯
----------

I guess the most important thing is that I managed to solve the issues, even if I wasn't able to fully figure out what was wrong. It might be that I'm missing some obvious issue and that I'm just not comfortable enough with whatever Slick or Quill does to translate the chains of higher-order function invocations into (hopefully) working SQL. But what I was trying to do wasn't that complicated. I was just fetching IDs from a database, streaming tweets and inserting some of their data as case classes into a database. DB I/O is such a common thing to do that it's a bit weird that it doesn't "just work" for such simple use cases.

The take-away for me is that as a Scala developer you need to be able to dive into the codebases and ticket systems of the libraries you're using to a much larger degree than what is usually required as say a Python developer, and that if I ever write a library I'll make sure to document it properly.
