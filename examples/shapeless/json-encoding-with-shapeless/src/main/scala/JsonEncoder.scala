import shapeless._

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
//
////  implicit def genericEncoder[A, R](implicit gen: Generic.Aux[A, R], jsonEncoder: JsonEncoder[R]): JsonEncoder[A] = instance { myCaseClass =>
////    jsonEncoder.encodeAsJson(gen.to(myCaseClass))
////  }
//
//  implicit def reprEncoder[H, T <: HList](implicit hEncoder: JsonEncoder[H], tEncoder: JsonEncoder[T]): JsonEncoder[H :: T] = {
//    instance[H :: T] {
//      case head :: tail => writeJson(head) ++ writeJson(tail)
//    }
//  }

  def writeJson[A](value: A)(implicit enc: JsonEncoder[A]): String = enc.encodeAsJson(value)
}