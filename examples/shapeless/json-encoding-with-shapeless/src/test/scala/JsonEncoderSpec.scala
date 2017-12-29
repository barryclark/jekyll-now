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
}
