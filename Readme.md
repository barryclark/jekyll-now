# CodeShare Blog

Esse é o blog da Plataforma **CodeShare**. Aqui você irá encontrar diversos materiais sobre tecnologia, principalmente sobre desenvolvimento de sistemas. Você terá acesso a artigos, vídeo-aulas, workshops e outros diversos tipos de materiais sobre as diversas tecnologias utilizadas no mercado.  

Dessa forma você poderá conhecer novas tecnologias e metodologias e aperfeiçoar as que você já conhece!

### Contribua para o Projeto

Para você que deseja contribuir nos ajudando com algum material, bast enviar um artigo em markdown para: **contact@codeshare.com.br** ou seguir os passos abaixo:

### Configurando o ambiente

- **[Instale o Ruby versão 2 ou mais recente](https://www.ruby-lang.org/en/downloads/)**

- Instale as seguintes gems:

```
gem install jekyll bundler

```

- **[Instale o NodeJS](https://nodejs.org/en/)**

- Dê um **Fork** nesse repositório

- Entre no repositório:

```
cd CodeShareEducation.github.io
```

- Execute os comandos:

```
npm i
gulp
```

- Acesse `http://localhost:3000` para ver o blog executando localmente

### Enviando posts

Depois de configurar o projeto e estar com ele executando corretamente no `localhost` basta você criar um arquivo **Markdown** no diretório `_drafts` seguindo o modelo do arquivo `_drafts/example.md` contendo seu post. Depois de terminar verifique que está tudo correto:

- Execute o comando:

```
jekyll serve --drafts
```

- Acesse `http://localhost:4000` para ver o blog executando localmente com os `drafts`, entre no seu post e verifique se está tudo correto

- Faça commit e envie um **Pull Request**

- O post será avaliado e você receberá o feedback através do **Pull Request**

O post não será colocado no **Blog** no mesmo dia em que for aprovado o `draft` dele, o dia e hora da postagem ficará a cargo dos admins da **CodeShare**.
