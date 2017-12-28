import shapeless._
import shapeless.ops.record._
import syntax.singleton._
import record._

case class Cow(noise: String, legs: Int)

val labl = LabelledGeneric[Cow]
val cow = Cow("moo", 4)
val cowRec = labl.to(cow)
println(cowRec)

def test[A <: Product, L <: HList](cow2: A)(implicit lgen: LabelledGeneric.Aux[A, L]) = {
  val a = lgen.to(cow2).keys
  val b = labl.to(cow).keys

  a

}


val meep = test(cow)
println(meep)

//
//import record._
//import ops.record._
//import syntax.singleton._
//
//case class Book(author: String, title: String, id: Int, price: Double)
//val bookGen = LabelledGeneric[Book]
//val tapl = Book("Benjamin Pierce", "Types and Programming Languages", 262162091, 44.11)
//val rec = bookGen.to(tapl)
//rec.keys