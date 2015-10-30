---
layout: post
title: Brillo - O Sistema Operacional da Google suporta ARM, Intel e MIPS
---

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@dgrej_">
<meta name="twitter:title" content="Brillo - O Sistema Operacional da Google suporta ARM, Intel e MIPS">
<meta name="twitter:description" content="Foi criado um  portal do desenvolvedor do Brillo, onde código, ferramentas de desenvolvimento e documentação do sistema operacional podem ser obtidos.">
<meta name="twitter:image" content="http://www.embarcados.com.br/wp-content/uploads/2015/10/google-Brillo.jpg">

<div class="news" style="clear:both; margin-top: 15px;">
                 <center><img width="480" height="320" src="http://www.embarcados.com.br/wp-content/uploads/2015/10/google-Brillo.jpg" class="attachment-large wp-post-image" alt="google-Brillo" /></center><br />
					<p style="text-align: justify;">No ano passado o Google <a href="http://gizmodo.uol.com.br/google-compra-nest/" target="_blank">comprou</a> a empresa <a href="https://nest.com/" target="_blank">Nest</a>, da área de automação residencial, por um valor alto, $3,2 bilhões de dólares. Com isso essa gigante da internet ganhou força na área de internet das coisas, pois os produtos da Nest tinham foco nessa área. Neste ano, durante o <a href="https://events.google.com/io2015/about" target="_blank">Google I/O</a> realizado nos Estados Unidos nos dias 28 e 29 de maio, eis que surgem duas novidades, o <a href="https://developers.google.com/brillo/" target="_blank">Project Brillo</a> e o <a href="https://developers.google.com/weave/" target="_blank">Weave</a>. Uma solução completa para conectar dispositivos.</p>
<p style="text-align: justify;"> </p>
<p style="text-align: justify;">Desde maio o sistema operacional Brillo e a plataforma de comunicação Weave estavam abertos para parceiros. Recentemente, no dia 27 de outubro de 2015, essa abertura foi extendida para a comunidade de desenvolvedores, bem maior, como parte do programa de convite da Google.</p>
<p style="text-align: justify;"> </p>
<p style="text-align: justify;">Foi criado um  <a href="https://developers.google.com/brillo/" target="_blank">portal do desenvolvedor do Brillo</a>, onde código, ferramentas de desenvolvimento e documentação do sistema operacional podem ser obtidos. Mas por enquanto o acesso a esses dados precisosos é permitido somente por meio de um pequeno <a href="https://services.google.com/fb/forms/brilloweaveinviteform/" target="_blank">registro</a> e um eventual convite da Google para entrar nesse seleto grupo.</p>
<p style="text-align: justify;"> </p>
<p style="text-align: justify;"> </p>
<h2 style="text-align: justify;">O <em>Project Brillo</em></h2>
<p style="text-align: justify;"> </p>
<p style="text-align: justify;">A tendência é surgirem soluções para IoT das empresas de tecnologia, visto a plataforma <a href="http://www.embarcados.com.br/artik-plataforma-certificada-arduino-da-samsung/"  target="_blank">Artik</a> da Samsung, o sistema operacional <a href="http://www.embarcados.com.br/liteos-so-para-iot-da-huawei/"  target="_blank">LiteOS</a> da Huawei, o <a href="https://mbed.org/technology/os/" target="_blank" >mbed OS</a> da ARM, entre outras. O que o Google fez foi criar um sistema operacional baseado em Android, chamado <a href="http://www.androidauthority.com/project-brillo-google-io-612159/" target="_blank">Project Brillo</a>, voltado para dispositivos com restrições de memória e que necessitem de um controle de energia eficiente. Seria possível portar tal sistema operacional em equipamentos a partir de 32 MB de memória RAM e 128 MB de Flash.</p>
<p style="text-align: justify;"> </p>
<p><div id="attachment_28831" style="width: 650px" class="wp-caption aligncenter"><img class="wp-image-28831" src="http://www.embarcados.com.br/wp-content/uploads/2015/10/google_brillo_architecture.jpg" alt="Arquitetura do Brillo" width="640" height="318" /><p class="wp-caption-text">Figura 1: Arquitetura do Brillo.</p></div>
<p style="text-align: justify;"> </p>
<p style="text-align: justify;">O anúncio do portal do desenvolvedor do Brillo foi seguido da divulgação, por parte de parceiros, de hardwares compatíveis com o sistema oporacional da Google, chamados de “<em>made for Brillo</em>”, abrangendo as arquiteturas de CPU Intel, ARM e MIPS. Confira os primeiros “<em>made for Brillo</em>” kits para essas arquiteturas:</p>
<p>&nbsp;</p>
<ul>
<li><strong>Intel:</strong> A Intel <a href="https://software.intel.com/en-us/blogs/2015/10/27/intel-edison-board-and-brillo" target="_blank">anunciou</a> que vai oferecer uma solução compatível com o Brillo e baseada na placa Intel Edison.</li>
</ul>
<p style="text-align: justify;"> <img class="aligncenter wp-image-28835 size-full" src="http://www.embarcados.com.br/wp-content/uploads/2015/10/Google-Brillo-Intel-Edison-board.png" alt="Google Brillo Intel Edison board" width="375" height="287" /></p>
<p style="text-align: justify;"> </p>
<ul>
<li style="text-align: justify;"><strong>ARM:</strong> A Freescale se <a href="http://blogs.freescale.com/processors/2015/10/freescale-joins-google-in-enabling-brillo-access-to-the-developer-community/" target="_blank">pronunciou</a> oferecendo a placa <a href="http://www.technexion.com/solutions/brillo" target="_blank">Pico i.MX6UL COM e Dwarf baseboard</a>, de um de seus parceiros, a <a href="http://www.technexion.com/" target="_blank" >Technexion</a>. Esse kit é baseado no microprocessador <a href="http://www.freescale.com/products/arm-processors/i.mx-applications-processors-based-on-arm-cores/i.mx-6-processors/i.mx6qp/i.mx-6ultralite-processor-low-power-secure-arm-cortex-a7-core:i.MX6UL" target="_blank">i.MX 6UltraLite SoC</a>, que possui um core ARM Cortex-A7.</li>
</ul>
<p>&nbsp;</p>
<p style="text-align: justify;"><img class=" size-full wp-image-28839 alignnone" src="http://www.embarcados.com.br/wp-content/uploads/2015/10/brillo-pico-imx6ul1.png" alt="brillo-pico-imx6ul1" width="300" height="274" /><img class=" size-full wp-image-28840 alignright" src="http://www.embarcados.com.br/wp-content/uploads/2015/10/brillo-pico-dwarf1.png" alt="brillo-pico-dwarf1" width="300" height="295" /></p>
<p style="text-align: justify;"> </p>
<ul>
<li style="text-align: justify;"><b>MIPS:</b> A <em>Imagination Technologies</em> <a href="http://blog.imgtec.com/mips-processors/new-creator-to-run-brillo-openwrt-and-debian-on-mips" target="_blank" rel="nofollow">anunciou</a> que em breve será lançada a placa de desenvolvimento <a href="http://blog.imgtec.com/mips-processors/a-new-creator-is-coming-soon" target="_blank">Creator Ci40</a>, que será compatível com o Brillo. Além da placa não ter sido anunciada, o SoC que a controla também é desconhecido, por enquanto. Os rumores é de que seja conhecido no próximo mês. O que foi revelado até o momento é que esse chip é baseado num IP focado em IoT.</li>
</ul>
<p>&nbsp;</p>
<p><img class="aligncenter wp-image-28843" src="http://www.embarcados.com.br/wp-content/uploads/2015/10/brillo-MIPS-Creator-Ci40.jpg" alt="brillo MIPS Creator Ci40" width="500" height="388" /></p>
<p>&nbsp;</p>
<p style="text-align: justify;">Além disso, um outro objetivo do Google é fazer com que dispositivos que rodem o Brillo possam trocar dados entre si e com outros dispositivos que façam uso de SOs de IoT. A maneira adotada foi usar uma linguagem padrão, por meio de um protocolo, chamado <a href="https://developers.google.com/weave/" target="_blank">Weave</a>, o qual é multi-plataforma, facilitando a adoção do <strong>Project Brillo</strong>.</p>
<p style="text-align: justify;"> </p>
<p style="text-align: justify;">Mas não é necessário usar o Brillo para isso, basta usar um SO que faça uso do Weave e que garanta aderência ao padrão. Para que essa interoperabilidade ocorra, foi criado um programa de certificação dos fabricantes.</p>
<p style="text-align: justify;"> </p>
<p style="text-align: justify;">Vejam um vídeo introdutório do Brillo abaixo:</p>
<p style="text-align: justify;"> </p>
<p style="text-align: justify;"><iframe width="560" height="315" src="https://www.youtube.com/embed/2rPkbyyviGI" frameborder="0" allowfullscreen="allowfullscreen"></iframe></p>
<p style="text-align: justify;"> </p>
<p style="text-align: justify;">Quer conhecer um pouco mais sobre o Weave? Veja o vídeo seguinte:</p>
<p style="text-align: justify;"> </p>
<p style="text-align: justify;"><iframe width="560" height="315" src="https://www.youtube.com/embed/uIIZD4KuIJM" frameborder="0" allowfullscreen="allowfullscreen"></iframe></p>
<p style="text-align: justify;"> </p>
<p style="text-align: justify;"> </p>
<p style="text-align: justify;"><strong>Referências</strong></p>
<p style="text-align: justify;"> </p>
<ul>
<li style="text-align: justify;"><a href="https://developers.google.com/brillo/" target="_blank">https://developers.google.com/brillo/</a></li>
<li style="text-align: justify;"><a href="http://linuxgizmos.com/android-based-brillo-iot-os-arrives-with-hacker-sbc-support/" target="_blank" rel="nofollow">Android-based “Brillo” IoT OS arrives with hacker SBC support</a></li>
</ul>

via: http://www.embarcados.com.br/brillo-suporta-arm-intel-e-mips/
