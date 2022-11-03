---
layout: post
title: Recursos para usar Stable Diffusion
categories:
  - aprendizaje
  - machine-learning
tags:
  - mejora continua
  - machine-learning
published: true
---

> “Una imagen vale más que mil palabras” ― Kurt Tucholsky

## 0. Consejos si vas a lo kamikaze
- Si vas a usar [Google Colab](https://colab.research.google.com/), créate una cuenta nueva de Google porque te va a crear muchos ficheros en tu Drive. Unos 4-5 GB más las imágenes que vayas generando, que se guardarán en tu Drive.

- Para tener imágenes en poco tiempo, genera imágenes con pocos pasos, yo uso 20 y cuando encuentres algo que te guste genéralas con la misma semilla pero con 40-50 pasos para tener mejores imágenes.

- Genera imágenes en resoluciones no más grandes de 768px. Luego puede usar modelos [ESRGAN](https://huggingface.co/spaces/akhaliq/Real-ESRGAN) para subir la resolución de esas imágnenes x4 e incluso x8. La mayoría de GUIs de Stable Diffusion lo traen integrado.

- Si quieres mejorar las caras pasa tu imagen generada pásala por un modelo [GFPGAN](https://huggingface.co/spaces/Xintao/GFPGAN). La mayoría de GUIs de Stable Diffusion lo traen integrado.

## TLTR
- ¿Quieres usar Stable Diffusion gratis? Puedes desde un notebook de Google Colab. Usa el de [TheLastBen](https://colab.research.google.com/github/TheLastBen/fast-stable-diffusion/blob/main/fast_stable_diffusion_AUTOMATIC1111.ipynb)

- No sabes que es Google Colab y solo quieres jugar un poco. Créate una cuenta en [Dream Studio](https://beta.dreamstudio.ai/dream). Es la aplicación oficial de [Stability.ai](https://stability.ai/) y tienes créditos gratis para generar muchas imágenes.

-  ¿Quieres entrenar Stable Diffusion con tus imágenes y gratis? Aquí tienes el [tutorial que usé yo](https://bytexd.com/how-to-use-dreambooth-to-fine-tune-stable-diffusion-colab/)

- ¿Quieres profundizar en el tema en castellano y de una forma snecilla? Mira los videos de [Carlos Santana - DotCSV](https://www.youtube.com/c/DotCSV)

- ¿Estas interesado en el debate sobre los derechos de autor de estos modelos? Lee este [artículo](https://akme.es/imagenes-inteligencia-artificial/) de [Marelisa Blanco](https://twitter.com/MarelisaBlanco) que compartió [zigiella](https://twitter.com/zigiella) en la [Barcelona Software Crafters 2022](https://twitter.com/search?q=%23scbcn22)


# Índice
1. [¿Qué son los modelos text to image?](#)
2. [¿Qué son los modelos de difusión?](#)
3. [Historia](#)
4. [La velocidad cambia con la liberación de Stable Diffusion](#)
5. [Aplicaciones con las que puedes usar Stable Diffusion](#)
6. [Documentación oficial](#)
7. [Tutoriales](#)
8. [Notebooks de Google Colab que puedes usar gratis](#)
9. [Ayudas para generar buenos prompts](#)
10. [¿Qué es Dreambooth?](#)
11. [Glosario](#)
12. [Métodos de sampling que he probado hasta ahora](#)

## 1. ¿Qué son los modelos text to image?

- Ejemplo: [https://imagen.research.google/](https://imagen.research.google/)


## 2. ¿Qué son los modelos de difusión?

- Resumen en el [video de la web de DALL-E 2](https://openai.com/dall-e-2/#:~:text=DALL%C2%B7E%202%20Explained%E2%80%822%3A47)


## 3. Historia
- La mayor parte está extraída de este video: [# ¡Y AHORA la IA también crea VÍDEOS y MODELOS 3D! (de DALL-E 2 a DreamFusion)](https://www.youtube.com/watch?v=i4MFvhHVOZc&list=RDCMUCy5znSnfMsDwaLlROnZ7Qbg&index=1)

- **2018** - GPT-1

- **2019** - GPT-2

- **2020** - [GPT-3](https://openai.com/api/)

- **Enero 2021** - DALL-E

- **Abril 2022** - [DALL-E 2](https://openai.com/dall-e-2/)

- **Mayo 2022** - [Imagen de Google](https://imagen.research.google/)

- **Agosto 2022** - Stable Diffusion revienta el mercado porque es el primer modelo de este tipo Open Source de verdad. 
  - En ML necesitas, el código, los datos y poder entrenar el modelo en una máquina que no te hipoteque para toda la vida... 
  - Hasta ahora, modelos similares solo liberaban el código y necesitabas conseguir datos y máquinas muy grandes para los entrenos.
  - En muchos casos solo se publica el paper sin código con las explicación de como lo han hecho.
  - Pero Stability.ai publica el modelo [Stable Diffusion]([https://stability.ai/blog/stable-diffusion-public-release](https://stability.ai/blog/stable-diffusion-public-release)), los datos y es entrenable en máquinas accesible para usaurios particulares.
  - Detras de Stable Diffusion está un multimillonario conocido como [Emad](https://twitter.com/EMostaque)

- **Agosto 2022** - Se publica DreamBooth de Google. Explica como reentrenar modelos de difusión con muy pocas imágenes. 
  - Solo se publica el paper sin código [https://dreambooth.github.io/(https://dreambooth.github.io/](https://dreambooth.github.io/(https://dreambooth.github.io/)
	 - En 2 semanas estaba implementado en Stable Diffusion por la comunidad: [https://github.com/XavierXiao/Dreambooth-Stable-Diffusion](https://github.com/XavierXiao/Dreambooth-Stable-Diffusion)


## 4. La velocidad cambia con la liberación de Stable Diffusion

- **Solo en los últimos 2 meses**:

	- DALL-E 2 ya no es beta privada y puedes subir fotos con caras reales y hacer in-painting y out-painting

	- Stable.ai saca Dream Studio y consigue hacer conversiones de [imagen a imagen](https://invoke-ai.github.io/InvokeAI/features/IMG2IMG)

	- La comunidad ha combinado el img2img para crear videos: https://youtu.be/rvHgcOa9gDk

	- Sale Make-A-Video: https://makeavideo.studio/

	- Sale Phenaki: https://phenaki.video/

	- Google saca Imagen-Video: https://imagen.research.google/video/

	- Esta semana han sacado Dream-Fusion: genera cualquier malla 3d que le pidas.....: https://dreamfusion3d.github.io/

	- Ya hay demos de Text To Audio

	- Ya hay demos de Text to Animation

	- Inyectan capital de 101 millones a StabilityAI para seguir haciendo su magia. [Stability AI, desarrolladora de Stable Diffusion, recauda 101 millones de dólares en una ronda de financiación](https://www.reasonwhy.es/actualidad/stability-ai-stable-diffusion-ronda-financiacion)

- Y cuando leas esto habrán pasado decenas de cosas más.....


## 5. Aplicaciones con las que puedes usar Stable Diffusion

- Dream Studio - Web oficial para usar el modelo. Es de pago pero inicialmente te dan créditos para probar: [https://beta.dreamstudio.ai/dream](https://beta.dreamstudio.ai/dream)

- Crea imágenes con tus fotos. Es de pago: [https://avatarai.me/](https://avatarai.me/)

- Si tienes PC con Windows y GPU Nvidia. Es gratis: [https://nmkd.itch.io/t2i-gui](https://nmkd.itch.io/t2i-gui)


## 6. Documentación oficial

- Reddit oficial: [https://www.reddit.com/r/StableDiffusion/](https://www.reddit.com/r/StableDiffusion/)

- Github oficial con el modelo: [https://github.com/CompVis/stable-diffusion](https://github.com/CompVis/stable-diffusion)

- Link modelo Satble Diffusion 1.4 para descargar o usar: [https://huggingface.co/CompVis/stable-diffusion-v1-4](https://huggingface.co/CompVis/stable-diffusion-v1-4)


## 7. Tutoriales

- Tutorial para entrenar Stable Diffusion con tus imágenes (usando DreamBooth): [https://bytexd.com/how-to-use-dreambooth-to-fine-tune-stable-diffusion-colab/](https://bytexd.com/how-to-use-dreambooth-to-fine-tune-stable-diffusion-colab/)

- Crear vídeos con Stable Diffusion: [https://colab.research.google.com/github/deforum/stable-diffusion/blob/main/Deforum_Stable_Diffusion.ipynb](https://colab.research.google.com/github/deforum/stable-diffusion/blob/main/Deforum_Stable_Diffusion.ipynb)

- Stable Diffusion Infinity para hacer outpainting: [https://github.com/lkwq007/stablediffusion-infinity](https://github.com/lkwq007/stablediffusion-infinity)

- Web para redimensionar tus imágenes de forma sencilla: [Birme]https://www.birme.net/?target_width=512&target_height=512()


## 8. Notebooks de Google Colab que puedes usar gratis

- Stable Diffsuion WebUI para generar imágenes: [TheLastBen](https://colab.research.google.com/github/TheLastBen/fast-stable-diffusion/blob/main/fast_stable_diffusion_AUTOMATIC1111.ipynb)

- Está semana(01/10/2022) han mejorado Dreambooth para entrenar más rápido y con menos recursos y con WebUI: [https://colab.research.google.com/github/TheLastBen/fast-stable-diffusion/blob/main/fast-DreamBooth.ipynb](https://colab.research.google.com/github/TheLastBen/fast-stable-diffusion/blob/main/fast-DreamBooth.ipynb)

- Google Colab oficial de Stable Difussion: [https://colab.research.google.com/github/huggingface/notebooks/blob/main/diffusers/stable_diffusion.ipynb](https://colab.research.google.com/github/huggingface/notebooks/blob/main/diffusers/stable_diffusion.ipynb)

- Google Colab con Otra WebUI parecida a Dream Studio: [https://colab.research.google.com/github/altryne/sd-webui-colab/blob/main/Stable_Diffusion_WebUi_Altryne.ipynb](https://colab.research.google.com/github/altryne/sd-webui-colab/blob/main/Stable_Diffusion_WebUi_Altryne.ipynb)


## 9. Ayudas para generar buenos prompts

- Inspiración de imágenes y prompts: [https://lexica.art/](https://lexica.art/)

- Inspiración de imágenes y prompts: [https://www.krea.ai/](https://www.krea.ai/)

- Generador automático de prompts a partir de una idea: [https://promptomania.com/stable-diffusion-prompt-builder/](https://promptomania.com/stable-diffusion-prompt-builder/)

- Ver estilos de artistas para Stable Diffusion: [https://www.urania.ai/top-sd-artists](https://www.urania.ai/top-sd-artists)

- Buscar como entiende las palabras/conceptos Stable Diffusion: [https://haveibeentrained.com](https://haveibeentrained.com)

- Dataset con el que se ha entrenado Stable Diffusion [https://laion.ai/blog/laion-5b/](https://laion.ai/blog/laion-5b/)

- Img2Prompts: Para generar prompts a partir de imágenes. [https://replicate.com/methexis-inc/img2prompt](https://replicate.com/methexis-inc/img2prompt)

- Crear prompts paso a paso: https://phraser.tech/landing

- Guía para crear buenos prompts: [https://docs.google.com/document/d/17VPu3U2qXthOpt2zWczFvf-AH6z37hxUbvEe1rJTsEc/edit](https://docs.google.com/document/d/17VPu3U2qXthOpt2zWczFvf-AH6z37hxUbvEe1rJTsEc/edit)


## 10. ¿Qué es Dreambooth?

- Técnica para poder reentrenar modelos de difusión con muy pocas imágenes.

- Paper: [https://dreambooth.github.io/](https://dreambooth.github.io/)

- Código creado por la comunidad: [https://github.com/XavierXiao/Dreambooth-Stable-Diffusion](https://github.com/XavierXiao/Dreambooth-Stable-Diffusion)


## 11. Glosario

- **Modelos de difusión:** [https://developer.nvidia.com/blog/improving-diffusion-models-as-an-alternative-to-gans-part-1/](https://developer.nvidia.com/blog/improving-diffusion-models-as-an-alternative-to-gans-part-1/)

- **Ejemplo de difusión:** [Video de DALL-2](https://openai.com/dall-e-2/#:~:text=DALL%C2%B7E%202%20Explained%E2%80%822%3A47)

- **Outpainting**: generar nuevas imágenes a partir de otras. Por ejemplo para expandir un cuadro.
  - Pulsar el botón Timelapse del [ejemplo de OpenAI](https://openai.com/blog/dall-e-introducing-outpainting)

- **Inpainting**: cambiar solo un trozo de una imagen. Por ejemplo poner un sombrero a una persona
  - Ejemplo: [https://twitter.com/_akhaliq/status/1473111230231498756?s=20&t=kz8ecfmWbMTr9ZIeSwWb6g](https://twitter.com/_akhaliq/status/1473111230231498756?s=20&t=kz8ecfmWbMTr9ZIeSwWb6g)


## 12. Métodos de sampling que he probado hasta ahora

- Euler a: más artisitico

- Euler: más realista

- LMS: Falla con cossa realistas

- Heun: colores mas estridentes

- DPM Fast: Muy loco