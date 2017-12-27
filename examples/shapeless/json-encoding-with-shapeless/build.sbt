lazy val root = (project in file("."))
  .settings(
    name := "Hello",
    organization := "org.timmeh.woot",
    version := "1.0",
    scalaVersion := "2.12.3",
    libraryDependencies += "com.chuusai" %% "shapeless" % "2.3.2",
    libraryDependencies += "org.scalactic" %% "scalactic" % "3.0.4",
    libraryDependencies += "org.scalatest" %% "scalatest" % "3.0.4" % "test"
  )
