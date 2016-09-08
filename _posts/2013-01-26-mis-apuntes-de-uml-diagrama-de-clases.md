---
id: 470
title: Mis apuntes de UML (Diagrama de Clases)
date: 2013-01-26T03:23:00+00:00
author: ovalenzuela
layout: post
guid: https://ovalenzueladotcom.wordpress.com/2013/01/26/mis-apuntes-de-uml-diagrama-de-clases
permalink: /2013/01/mis-apuntes-de-uml-diagrama-de-clases.html
blogger_blog:
  - www.ovalenzuela.com
blogger_author:
  - Andrés Barrera
blogger_02f5be51301771664ae7c1c72bf29246_permalink:
  - 1676505433020406704
dsq_thread_id:
  - 3087551551
categories:
  - Desarrollo
  - Google
---
<div>
  <div>
    <a href="http://www.ovalenzuela.com/wp-content/uploads/2016/02/52ed5-220px-uml_logo.gif"><img src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/52ed5-220px-uml_logo.gif" alt="" border="0" /></a>
  </div>
  
  <p>
    En muchas ocasiones nos olvidamos de cosas que son muy importantes y básicas en nuestra profesión, y como a mi me pasa seguido, intento escribir las cosas no precisamente con la intención de divulgarlas, sino para construir una ayuda para mi memoria.
  </p>
</div>

<div>
  Es por esto que las siguientes publicaciones se ajustarán precisamente a esta idea, y empezare hoy con algunos apuntes sobre el diagramado de clases usando UML para su representación. Quizás la forma no sea la más ortodoxa o la que más se acerca al lado técnico  pero como dije, son mis apuntes y lo mejor es escribir ideas para recordar conceptos y no información por mera demostración de conocimientos.
</div>

### 

### Atributos y Métodos:

<div>
  <b>Atributos:</b>
</div>

<div>
  Los atributos o características de una Clase pueden ser de tres tipos de acuerdo a como definen su visibilidad y el grado de comunicación entre los diferentes componentes:
</div>

<div>
  <ul>
    <li>
      public (+): Indica que el atributo será visible tanto dentro como fuera de la clase, es decir, es visible desde todos lados.
    </li>
    <p>
      <li>
        private (-): Indica que el atributo sólo será accesible desde dentro de la clase (sólo sus métodos lo pueden acceder).
      </li>
      <p>
        <li>
          protected (#): Indica que el atributo no será visible desde fuera de la clase, pero si podrá ser usado por otros métodos de la clase y de las subclases que se deriven.
        </li>
        <p>
          </ul> 
          
          <p>
            </div> 
            
            <p>
              <div>
                <b>Métodos:</b>
              </div>
              
              <p>
                <div>
                  Los métodos u operaciones de una clase son la forma en como ésta interactúa con su entorno, éstos pueden tener las características:
                </div>
                
                <p>
                  <div>
                    <ul>
                      <li>
                        public (+): Indica que el método será visible tanto dentro como fuera de la clase, es decir, es visible desde todos lados.
                      </li>
                      <p>
                        <li>
                          private (-): Indica que el método sólo será accesible desde dentro de la clase (sólo otros métodos de la misma clase lo pueden usar).
                        </li>
                        <p>
                          <li>
                            protected (#): Indica que el método no será visible desde fuera de la clase, pero si podrá ser usado por otros métodos de la clase y de las subclases que se deriven.
                          </li>
                          <p>
                            </ul> 
                            
                            <p>
                              </div> 
                              
                              <p>
                                <div>
                                  <h3>
                                  </h3>
                                  
                                  <p>
                                    <h3>
                                      Relaciones:
                                    </h3>
                                    
                                    <p>
                                      </div> 
                                      
                                      <p>
                                        <div>
                                          <div>
                                            <a href="http://www.ovalenzuela.com/wp-content/uploads/2016/02/0d674-herencia.png"><img src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/0d674-herencia.png?w=209" alt="" width="139" height="200" border="0" /></a>
                                          </div>
                                          
                                          <p>
                                            <b>Herencia</b>
                                          </p>
                                        </div>
                                        
                                        <p>
                                          <div>
                                            Indica que una subclase hereda los métodos y atributos especificados por una Super Clase, por ende la Subclase además de poseer sus propios métodos y atributos, poseerá las características y atributos visibles de la Super Clase que sean declarados como public y protected.
                                          </div>
                                          
                                          <p>
                                            <div>
                                              <ul>
                                                <li>
                                                  Camioneta es un vehículo, y por tanto hereda sus atributos y métodos.
                                                </li>
                                                <p>
                                                  </ul> 
                                                  
                                                  <p>
                                                    <div>
                                                    </div>
                                                    
                                                    <p>
                                                      </div> 
                                                      
                                                      <p>
                                                        <div>
                                                          <b>Composición</b>
                                                        </div>
                                                        
                                                        <p>
                                                          <div>
                                                            <div>
                                                              <a href="http://www.ovalenzuela.com/wp-content/uploads/2016/02/cd943-composicion.png"><img src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/cd943-composicion.png?w=176" alt="" width="146" height="200" border="0" /></a>
                                                            </div>
                                                            
                                                            <p>
                                                              La composición es un tipo de relación dependiente en dónde un objeto más complejo es conformado por objetos más pequeños. En esta situación, podemos usar la frase &#8220;Tiene un&#8221;, para análisis:
                                                            </p>
                                                          </div>
                                                          
                                                          <p>
                                                            <div>
                                                              <ul>
                                                                <li>
                                                                  El auto tiene llantas.
                                                                </li>
                                                                <p>
                                                                  <li>
                                                                    La portátil tiene un teclado.
                                                                  </li>
                                                                  <p>
                                                                    <li>
                                                                      Una factura y su detalle.
                                                                    </li>
                                                                    <p>
                                                                      </ul> 
                                                                      
                                                                      <p>
                                                                        </div> 
                                                                        
                                                                        <p>
                                                                          <div>
                                                                            Ejemplo:
                                                                          </div>
                                                                          
                                                                          <p>
                                                                            <div>
                                                                            </div>
                                                                            
                                                                            <p>
                                                                              <div>
                                                                                Archivo FacturaDetalle.php:
                                                                              </div>
                                                                              
                                                                              <p>
                                                                                <div>
                                                                                </div>
                                                                                
                                                                                <p>
                                                                                  <div>
                                                                                    Archivo index.php:
                                                                                  </div>
                                                                                  
                                                                                  <p>
                                                                                    <div>
                                                                                    </div>
                                                                                    
                                                                                    <p>
                                                                                      <div>
                                                                                        <b>Asociación</b>
                                                                                      </div>
                                                                                      
                                                                                      <p>
                                                                                        <div>
                                                                                          <div>
                                                                                            <a href="http://www.ovalenzuela.com/wp-content/uploads/2016/02/fa750-asociacion.png"><img src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/fa750-asociacion.png?w=176" alt="" width="147" height="200" border="0" /></a>
                                                                                          </div>
                                                                                          
                                                                                          <p>
                                                                                            La asociación se podría definir como el momento en que dos objetos se unen para trabajar juntos y así, alcanzar una meta.  Un punto a tomar muy en cuenta es que ambos objetos son independientes entre sí, veremos un poco más adelante qué implicación tiene esto. Para validar la asociación, la frase &#8220;Usa un&#8221;, debe tener sentido:
                                                                                          </p>
                                                                                        </div>
                                                                                        
                                                                                        <p>
                                                                                          <div>
                                                                                            <ul>
                                                                                              <li>
                                                                                                El ingeniero usa una computadora
                                                                                              </li>
                                                                                              <p>
                                                                                                <li>
                                                                                                  El cliente usa tarjeta de crédito.
                                                                                                </li>
                                                                                                <p>
                                                                                                  </ul> 
                                                                                                  
                                                                                                  <p>
                                                                                                    </div> 
                                                                                                    
                                                                                                    <p>
                                                                                                      <div>
                                                                                                      </div>
                                                                                                      
                                                                                                      <p>
                                                                                                        <div>
                                                                                                          <b><br /></b><b>Agregación</b>
                                                                                                        </div>
                                                                                                        
                                                                                                        <p>
                                                                                                          <div>
                                                                                                            <div>
                                                                                                              <a href="http://www.ovalenzuela.com/wp-content/uploads/2016/02/cf04b-agregacion.png"><img src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/cf04b-agregacion.png?w=180" alt="" width="150" height="200" border="0" /></a>
                                                                                                            </div>
                                                                                                            
                                                                                                            <p>
                                                                                                              Es muy similar a la relación de Asociación solo varía en la multiplicidad ya que en lugar de ser una relación &#8220;uno a uno&#8221; es de &#8220;uno a muchos&#8221;.
                                                                                                            </p>
                                                                                                          </div>
                                                                                                          
                                                                                                          <p>
                                                                                                            <div>
                                                                                                              <ul>
                                                                                                                <li>
                                                                                                                  Una agenda agrupa varios contactos.
                                                                                                                </li>
                                                                                                                <p>
                                                                                                                  <li>
                                                                                                                    Un centro de costo o departamento agrupa varios empleados.
                                                                                                                  </li>
                                                                                                                  <p>
                                                                                                                    </ul> 
                                                                                                                    
                                                                                                                    <p>
                                                                                                                      </div> 
                                                                                                                      
                                                                                                                      <p>
                                                                                                                        <div>
                                                                                                                          <b><br /></b><b>Dependencia (uso): </b>
                                                                                                                        </div>
                                                                                                                        
                                                                                                                        <p>
                                                                                                                          <div>
                                                                                                                            <div>
                                                                                                                              <a href="http://www.ovalenzuela.com/wp-content/uploads/2016/02/84888-dependencia.png"><img src="http://www.ovalenzuela.com/wp-content/uploads/2016/02/84888-dependencia.png?w=180" alt="" width="137" height="200" border="0" /></a>
                                                                                                                            </div>
                                                                                                                            
                                                                                                                            <p>
                                                                                                                              Representa un tipo de relación en la que una clase es instanciada. El uso más particular de este tipo de relación es para denotar la dependencia que tiene una clase de otra, como por ejemplo una aplicación gráfica que instancia una ventana (la creación del Objeto Ventana esta condicionado a la instanciación proveniente desde el objeto Aplicación).
                                                                                                                            </p>
                                                                                                                          </div>
                                                                                                                          
                                                                                                                          <p>
                                                                                                                            <div>
                                                                                                                            </div>
                                                                                                                            
                                                                                                                            <p>
                                                                                                                              <h3>
                                                                                                                              </h3>
                                                                                                                              
                                                                                                                              <p>
                                                                                                                                <h3>
                                                                                                                                  Fuente y apuntes
                                                                                                                                </h3>
                                                                                                                                
                                                                                                                                <p>
                                                                                                                                  <div>
                                                                                                                                    <a href="http://users.dcc.uchile.cl/~psalinas/uml/introduccion.html">http://users.dcc.uchile.cl/~psalinas/uml/introduccion.html</a>
                                                                                                                                  </div>
                                                                                                                                  
                                                                                                                                  <p>
                                                                                                                                    <div>
                                                                                                                                      <a href="http://www.didierperez.com/2012/02/diagrama-de-clases-uml-dependencia/">http://www.didierperez.com/2012/02/diagrama-de-clases-uml-dependencia/</a>
                                                                                                                                    </div>
                                                                                                                                    
                                                                                                                                    <p>
                                                                                                                                      <div>
                                                                                                                                        <a href="http://www.didierperez.com/2012/02/diagrama-de-clases-uml-agregacion-y-composicion/">http://www.didierperez.com/2012/02/diagrama-de-clases-uml-agregacion-y-composicion/</a>
                                                                                                                                      </div>
                                                                                                                                      
                                                                                                                                      <p>
                                                                                                                                        <div>
                                                                                                                                          <a href="http://www.didierperez.com/2012/02/diagrama-de-clases-uml-asociacion/">http://www.didierperez.com/2012/02/diagrama-de-clases-uml-asociacion/</a>
                                                                                                                                        </div>
                                                                                                                                        
                                                                                                                                        <p>
                                                                                                                                          <div>
                                                                                                                                            Publicado originalmente por Oscar Valenzuela en http://ovalenzuela.xpertians.com &#8211; Puede ser compartido y copiado libremente, mientras mantenga esta nota.
                                                                                                                                          </div>