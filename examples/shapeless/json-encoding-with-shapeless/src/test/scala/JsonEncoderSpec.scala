import org.scalatest.{FlatSpec, Matchers}
import shapeless.Generic.Aux
import shapeless._
import shapeless.labelled.FieldType
import record._

class JsonEncoderSpec extends FlatSpec with Matchers {

  import JsonEncoder._

  "Json encoder" should "be able to encode Ints" in {
    writeJson(5) shouldBe "5"
  }

  it should "be able to encode Strings" in {
    writeJson("mystring") shouldBe "\"mystring\""
  }

  it should "be able to encode Booleans" in {
    writeJson(true) shouldBe "true"
  }

  it should "be able to encode a simple case class" in {
    case class SimpleCaseClass(myNumber: Int)
    val simpleCaseClass = SimpleCaseClass(5)
    writeJson(simpleCaseClass) shouldBe """{"myNumber": 5}"""
  }

  it should "be able to encode a multi-field case class" in {
    case class ComplexCaseClass(str: String, num: Int, good: Boolean)
    val classToEncode = ComplexCaseClass("myString", 5, true)
    println(writeJson(classToEncode))
    writeJson(classToEncode) shouldBe """{"str": "myString", "num": 5, "good": true}"""
  }

//  it should "be able to encode a nested case class" in pendingUntilFixed {
//    case class SimpleOne(simpleString: String, num2: Int)
//    case class NestedCaseClass(yetAnotherCC: SimpleOne)
//
//    val simpleOne = SimpleOne("simpleString", 5)
//    val complexOne = NestedCaseClass(simpleOne)
//
//    val complexEncoder = JsonEncoder[NestedCaseClass]
//  }

}
