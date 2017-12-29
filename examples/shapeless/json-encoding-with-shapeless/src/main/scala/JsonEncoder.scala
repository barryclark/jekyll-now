import shapeless._
import shapeless.labelled.FieldType

trait JsonEncoder[A] {
  def encodeAsJson(value: A): String
}


object JsonEncoder {
  def apply[A](implicit enc: JsonEncoder[A]): JsonEncoder[A] = enc

  def instance[A](func: A => String): JsonEncoder[A] = new JsonEncoder[A] {
    override def encodeAsJson(value: A): String = func(value)
  }

  implicit val intEncoder: JsonEncoder[Int] = instance((value: Int) => value.toString)

  implicit val stringEncoder: JsonEncoder[String] = instance((value: String) => s""""$value\"""")

  implicit val booleanEncoder: JsonEncoder[Boolean] = instance((value: Boolean) => value.toString)

  implicit val hNilEncoder: JsonEncoder[HNil] = instance(_ => "")

  implicit def genericEncoder[A <: Product, L <: HList](implicit gen: LabelledGeneric.Aux[A, L],
                                                        jsonEncoder: JsonEncoder[L]): JsonEncoder[A] = instance {
    myCaseClass: A => s"{${jsonEncoder.encodeAsJson(gen.to(myCaseClass))}}"
  }

  implicit def reprEncoder[K <: Symbol, H, T <: HList](implicit witness: Witness.Aux[K],
                                                       hEncoder: JsonEncoder[H],
                                                       tEncoder: JsonEncoder[T]): JsonEncoder[FieldType[K, H] :: T] =
    instance {
      case ::(head: H, HNil) => s""""${witness.value.name}": ${writeJson(head)}"""
      case ::(head: H, tail) => s""""${witness.value.name}": ${writeJson(head)}, ${writeJson(tail)}"""
    }

  def writeJson[A](value: A)(implicit enc: JsonEncoder[A]): String = enc.encodeAsJson(value)
}