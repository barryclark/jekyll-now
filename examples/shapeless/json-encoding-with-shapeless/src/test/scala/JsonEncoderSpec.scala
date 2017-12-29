import org.scalatest.{FlatSpec, Matchers}
import shapeless.Generic.Aux
import shapeless._
import shapeless.labelled.FieldType
import record._

class JsonEncoderSpec extends FlatSpec with Matchers {

  import JsonEncoder._
  //  "Json encoder" should "be able to encode Ints" in {
  //    writeJson(5) shouldBe "5"
  //  }
  //
  //  it should "be able to encode Strings" in {
  //    writeJson("mystring") shouldBe "\"mystring\""
  //  }
  //
  //  it should "be able to encode Booleans" in {
  //    writeJson(true) shouldBe "true"
  //  }
  //
  //  it should "be able to encode an HList" in {
  //    writeJson(5 :: "moo" :: true :: HNil) shouldBe """5"moo"true"""
  //  }

  it should "be able to encode a simple case class" in {
    implicit val chearReprEncoder: JsonEncoder[::[Int, HNil]] = instance[Int :: HNil] {
      repr => "not what I want right now"
    }

    implicit def genericEncoder[A <: Product, L <: HList](implicit gen: LabelledGeneric.Aux[A, L],
                                                          jsonEncoder: JsonEncoder[L]): JsonEncoder[A] = {
      val moo = instance { myCaseClass: A =>
        println("genericEncoder got called")
        //      jsonEncoder.encodeAsJson(gen.to(myCaseClass))
        //        println(gen.to(myCaseClass).keys)
        s"{${jsonEncoder.encodeAsJson(gen.to(myCaseClass))}}"
      }
      moo
    }


    implicit def reprEncoder3[K <: Symbol, H, T <: HList](implicit witness: Witness.Aux[K],
                                                          hEncoder: JsonEncoder[H],
                                                          tEncoder: JsonEncoder[T]): JsonEncoder[FieldType[K, H] :: T] = {
      println(s"FieldName is ${witness.value.name}")
      instance { moo =>
        moo match {
          case ::(head: H, HNil) => s""""${witness.value.name}": ${writeJson(head)}"""
          case ::(head: H, tail) => s""""${witness.value.name}": ${writeJson(head)}, ${writeJson(tail)}"""
        }
      }
    }

    //      implicit def reprEncoder2[H, T <: HList](implicit hEncoder: JsonEncoder[H], tEncoder: JsonEncoder[T]): JsonEncoder[H :: T] = {
    //        instance[H :: T] {
    //          case head :: tail => writeJson(head) ++ writeJson(tail)
    //        }
    //      }

    //      implicit def reprEncoder[H <: Product, T <: HList](implicit hEncoder: JsonEncoder[H], tEncoder: JsonEncoder[T]): JsonEncoder[H :: T] = {
    //        instance[H :: T] {
    //          case head :: tail => writeJson(head) ++ writeJson(tail)
    //        }
    //      }

    //    implicit val simpleCaseClassEncoder = {
    //      instance {
    //        simpleCaseClass: SimpleCaseClass => "xxxxxxxx"
    //      }
    //    }

    case class SimpleCaseClass(myNumber: Int)
    val simpleCaseClass = SimpleCaseClass(5)
    val lablGen = LabelledGeneric[SimpleCaseClass]
    //    val test: ::[FieldType[Int with labelled.KeyTag[Symbol with tag.Tagged[ {
    //      type myNumber
    //    }], Int], Int], HNil] = lablGen.to(simpleCaseClass)

    val test: HList = lablGen.to(simpleCaseClass)
    //    println(s"XXXXXXXXXXXXXXXXXXXXXXXXX\n${test.keys}\nXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx")


//    writeJson(simpleCaseClass) shouldBe "5"
        writeJson(simpleCaseClass) shouldBe """{"myNumber": 5}"""
  }

}
