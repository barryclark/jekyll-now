import org.scalatest.{FlatSpec, Matchers}
import shapeless.Generic.Aux
import shapeless._
import shapeless.labelled.FieldType

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

    implicit def genericEncoder[A, R](implicit gen: LabelledGeneric.Aux[A, R], jsonEncoder: JsonEncoder[R]): JsonEncoder[A] = {
      val moo = instance { myCaseClass: A =>
        println("genericEncoder got called")
        //      jsonEncoder.encodeAsJson(gen.to(myCaseClass))
        jsonEncoder.encodeAsJson(gen.to(myCaseClass))
      }
      moo
    }


    implicit def reprEncoder3[H, T <:HList]: JsonEncoder[H :: T] = {
      instance{
        case head :: tail => head.toString
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
    val test: HList = lablGen.to(simpleCaseClass)



    writeJson(simpleCaseClass) shouldBe "5"
//    writeJson(simpleCaseClass) shouldBe """{"myNumber": 5}"""
  }

}
