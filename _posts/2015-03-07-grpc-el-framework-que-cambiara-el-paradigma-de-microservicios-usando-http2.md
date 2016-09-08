---
id: 57
title: gRPC, el framework que cambiará el paradigma de microservicios usando HTTP/2
date: 2015-03-07T20:33:00+00:00
author: ovalenzuela
layout: post
guid: https://ovalenzueladotcom.wordpress.com/2015/03/07/grpc-el-framework-que-cambiara-el-paradigma-de-microservicios-usando-http2
permalink: /2015/03/grpc-el-framework-que-cambiara-el-paradigma-de-microservicios-usando-http2.html
blogger_blog:
  - www.ovalenzuela.com
blogger_author:
  - Oscar Valenzuela
blogger_02f5be51301771664ae7c1c72bf29246_permalink:
  - 9165864372426784346
dsq_thread_id:
  - 5125777157
categories:
  - Feedly
---
<div>
  <p>
    <img src='http://ift.tt/1x4nDWt' alt='Grpc' />
  </p>
  
  <p>
    <p>
      <a href='http://www.grpc.io/'>gRPC</a>, ha sido <strong>el framework usado internamente por Google</strong> para conectar <strong>microservicios</strong>. Mejorado obviamente durante el tiempo ha llegado a una potente evolución que ha unido a este framework <strong>RPC (Remote Procedure Call)</strong> con el reciente y casi casi estandarizado <strong>HTTP/2</strong>. Google ha decidido lanzarlo públicamente a la comunidad Open Source.
    </p>
    
    <p>
      <h2>
        ¿Por qué es tan interesante gRPC?
      </h2>
      
      <p>
        <p>
          El <strong>foco principal es el rendimiento</strong>, hablamos en términos observables de CPU y de ancho de banda, mejora de latencia al propagar datos de forma masiva a distintos datacenters, mayor eficiencia en comunicaciones con dispositivos móviles (batería, disponibilidad, …), tiempo real, desarrollo de APIs más responsives y escalables.
        </p>
        
        <p>
          <p>
            Construido sobre <a href='http://ift.tt/1tGsyfw'>HTTP/2</a> aporta capacidades nativas de bidirecionalidad, control de flujo de datos, compresión de cabeceras, multiple de peticiones sobre una única conexión TCP. No es una reescritura del actual HTTP/1.1 sino que los status code o la semantica se mantiene.
          </p>
          
          <p>
            <h2>
              Librerías de implementación y serialización
            </h2>
            
            <p>
              <p>
                <a href='https://github.com/grpc'>gRPC</a> viene con <strong>librerías para distintos lenguajes para empezar a construir implementaciones</strong>: <a href='http://ift.tt/1Acrelk'>C</a>, <a href='http://ift.tt/1MVKX2E'>C++</a>, <a href='http://ift.tt/1MVKXjc'>C#</a>, <a href='http://ift.tt/1MVKZYp'>Go</a>, <a href='http://ift.tt/1MVKZYn'>Java</a>, <a href='http://ift.tt/1MVKZYt'>Node.js</a>, <a href='http://ift.tt/1AcreSd'>Objective-C</a>, <a href='http://ift.tt/1MVKX2R'>PHP</a>, <a href='http://ift.tt/1MVKX2K'>Python</a>, <a href='http://ift.tt/1AcrctM'>Ruby</a>. Entre todas ellas Java es la que se encuentra más madura actualmente, el resto se encuentran en fase alpha o pre-alpha.
              </p>
              
              <p>
                <p>
                  Otro aporte interesante es la evolución de la serialización de objetos con Proto3, la nueva versión de <a href='http://ift.tt/1qpktvS'>Protocol Buf</a> que simplifica la sintaxis y con soporte para más lenguajes y JSON encodings. gRPC puede ser extendido para soportar más formatos.
                </p>
                
                <p>
                  <p>
                    Todo el código está <a href='https://github.com/grpc'>disponible en GitHub</a>, tanto los primeros ejemplo y la documentación de gRPC.
                  </p>
                  
                  <p>
                    <p>
                      Vía | <a href='http://ift.tt/1wOc8YM'>Google Developers Blog</a>
                    </p>
                    
                    <p>
                      <p>
                        &#8211;
                      </p>
                      
                      <p>
                        La noticia <a href='http://ift.tt/1x4nBhn'><em>gRPC, el framework que cambiará el paradigma de microservicios usando HTTP/2</em> </a> fue publicada originalmente en <a href='http://ift.tt/1EXuh7z'><strong>Genbeta Dev</strong> </a> por <a href='http://ift.tt/1x4nDWz'>Txema Rodríguez</a> .
                      </p>
                      
                      <p>
                        <img border='0' src='http://ift.tt/1EXuh7A' width='1' height='1' />
                      </p>
                      
                      <p>
                        <a href='http://ift.tt/1x4nBht' rel='nofollow'><img border='0' src='http://ift.tt/1EXuh7C' /> </a>
                      </p>
                      
                      <p>
                        <a href='http://ift.tt/1x4nDWA' rel='nofollow'><img border='0' src='http://ift.tt/1x4nBxJ' /> </a>
                      </p>
                      
                      <p>
                        <a href='http://ift.tt/1EXuh7F' rel='nofollow'><img border='0' src='http://ift.tt/1x4nBxN' /> </a>
                      </p>
                      
                      <p>
                        <a href='http://ift.tt/1EXuh7I'><img border='0' src='http://ift.tt/1EXuh7M' /> </a><img border='0' src='http://ift.tt/1EXuisj' width='1' height='1' /> 
                        
                        <div>
                          <a href='http://ift.tt/1x4nEcS'><img border='0' src='http://ift.tt/prG9wp' /> </a> <a href='http://ift.tt/1x4nEcU'><img border='0' src='http://ift.tt/qOOyED' /> </a>
                        </div>
                        
                        <p>
                          <img src='http://ift.tt/1EXuisl' width='1' alt='' height='1' />
                        </p>
                        
                        <p>
                          via Genbeta Dev http://ift.tt/1x4nEcW
                        </p></div>