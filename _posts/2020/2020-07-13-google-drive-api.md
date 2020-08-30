---
title: "Utilizando a API do Google Drive"
permalink: "/2020/07/2020-07-13-google-drive-api.html"
categories: [api, dados, ferramentas]
---

Nesse artigo irei mostrar como construir um pequeno programa para baixar e excluir arquivos no Google Drive. Esse programa veio de uma necessidade pessoal que pode servir para outras pessoas.

> Um passo à frente , e você não está mais no mesmo lugar!
> 
> -- *Chico Science*

Sempre utilizei os serviços do Google, dentre eles o [Drive](https://drive.google.com) e o [Fotos](https://photos.google.com) são os que mais me servem. O Fotos sempre serviu como um backup automático de meus vídeos e imagens dos meus dispositivos, mas recentemente houve uma alteração no funcionamento dos serviços (que pra mim foi para melhor) em que os mesmos não partilham mais do espaço de armazenamento do Drive. O backup automático para o fotos com isso não funciona mais, mas trouxe a possibilidade de remover todos os videos e imagens do Drive e mover de vez para o fotos, liberando o espaço do meu Drive.

Eu utilizava 16 Gb dos 19 Gb que possuía e boa parte era utilizada pelos arquivos de vídeos e imagens que precisava excluir, mas queria ter certeza de não perder nada importante nesse processo, por isso minha ideia foi realizar o download de todos os arquivos e depois excluí-los do Drive liberando o espaço. Então decidi criar uma pequena aplicação para me ajudar com isso.

# API Google Drive v3

O meu primeiro passo para entender como interagir com o Drive foi ir na documentação da API em https://developers.google.com/drive/api/v3/about-sdk que  é muito boa e me ajudou bastante, logo de cara o [quickstart](https://developers.google.com/drive/api/v3/quickstart/java) para Java serviu para direcionar os passos que eu teria que seguir:

1. gerar o arquivo de credenciais;

2. criar código para autenticar via OAuth2;

3. criar código de manipulação dos arquivos.

## Gerar o arquivo de credenciais

Para ter acesso a API é necessário ter uma conta na Google e criar um projeto no gerenciador de APIs (em [Google Cloud Platform](https://code.google.com/apis/console/?api=drive)):

<img src="https://raw.githubusercontent.com/ivanqueiroz/ivanqueiroz.github.io/master/2020/07/14-10-21-28-01-console-google.png" title="Console Google" alt="Console Google" data-align="center">

Após criar o projeto deve-se gerar as credenciais para acesso ao OAuth2:

![Criar credenciais](https://raw.githubusercontent.com/ivanqueiroz/ivanqueiroz.github.io/master/2020/07/14-11-44-41-02-console-google.png)

As credenciais são salvas em um arquivo no formato de json e é necessário para o próximo passo.

## Código para autenticar via OAuth2 na API do Drive

No exemplo do [quickstart](https://developers.google.com/drive/api/v3/quickstart/java) o arquivo de credenciais é colocado no *claspath* da aplicação e carregado pelo método *getResourceAsStream*, mas preferi tornar mais flexível e definir uma pasta para colocar o arquivo:

```java
java.io.File credenciais = new java.io.File(ARQUIVO_CREDENCIAIS);
InputStream in = FileUtils.openInputStream(credenciais);
GoogleClientSecrets clientSecrets = GoogleClientSecrets.load(JSON_FACTORY, new InputStreamReader(in));
```

A constante `ARQUIVO_CREDENCIAIS` possui o caminho relativo para o arquivo (carregado de um arquivo de configuração) a partir dele é gerado o `InputStream` para a configuração do objeto do tipo `GoogleClientSecrets`, permitindo criar um objeto que representa o *flow* de autenticação:

```java
GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow.Builder(
    httpTransport, JSON_FACTORY, clientSecrets, SCOPES)
    .setDataStoreFactory(new FileDataStoreFactory(new java.io.File(TOKENS_DIRECTORY_PATH)))
    .setAccessType("offline")
    .build();
```

Criei mais uma constante a `TOKENS_DIRECTORY_PATH` para armazenamento do *token* gerado ao permitir o acesso OAuth2. Nesse ponto chamo a atenção para a variável `scopes` passado como argumento, a mesma é uma lista de *String* que foi criada com apenas o um argumento:

```java
private static final List<String> SCOPES = Collections.singletonList(DriveScopes.DRIVE);
```

O `DriveScopes.DRIVE` define acesso completo ao Drive. Para outros tipos sugiro ver o *enum*. Com o *flow* configurado é necessário instanciar um servidor local para receber as credenciais do OAuth2, caso não tenha um *token* salvo, nesse momento da execução, é aberta uma janela do browser solicitando a permissão de utilizar o Drive:

<img src="https://raw.githubusercontent.com/ivanqueiroz/ivanqueiroz.github.io/master/2020/07/14-12-52-48-03-autenticao.png" title="" alt="Primeira tela de autenticação" data-align="center">

<img src="https://raw.githubusercontent.com/ivanqueiroz/ivanqueiroz.github.io/master/2020/07/14-12-53-21-04-autenticacao.png" title="" alt="Segunda tela de autenticação" data-align="center">

No código eu criei um método `autenticacao` que realiza todo o processo e retorna um `Credential` já pronto:

```java
LocalServerReceiver receiver = new LocalServerReceiver.Builder().setPort(8888).build();
return new AuthorizationCodeInstalledApp(flow, receiver).authorize("user");
```

O `AuthorizationCodeInstalledApp` é um subtipo de `Credential` e é utilizado para aplicações que não são web. Nesse ponto já é possível utilizar os serviços do Drive, para isso é necessário configurar a forma de comunicação e instanciar o objeto que representará o serviço, para isso criei o método getGDriveService para conter essa parte:

```java
public static Drive getGDriveService(){
    if(service == null) {
        NetHttpTransport netHttpTransport;
            try {
                netHttpTransport = GoogleNetHttpTransport.newTrustedTransport();
                service = new Drive.Builder(netHttpTransport, JSON_FACTORY, autenticacao(netHttpTransport)).setApplicationName(NOME_APLICACAO).build();
            } catch (GeneralSecurityException | IOException e) {
                logger.error("Erro ao configurar serviço.", e);
            }
        }
    return service;
}
```

Com o objeto do tipo `Drive` já é possível interagir com a API e manipular os arquivos.

## Código de manipulação dos arquivos

Basicamente o programa vai buscar os arquivos e depois realizar o download dos mesmos, por esse motivo criei um método para cada operação:

```java
private static FileList searchFiles(Drive service, String extensao, String pageToken) throws IOException {
    return service.files().list()
        .setQ("name contains '" + extensao + "'")
        .setSpaces("drive")
        .setFields("nextPageToken, files(id, name)")
        .setPageToken(pageToken)
        .execute();
}
```

Em `searchFiles` a busca é configurada e executada. A configuração da *query* é através do método `setQ`, no código em questão a busca é por arquivos com um nome que contivesse uma extensão específica, mas a mesma pode ser ainda mais completa pois há bastante possibilidades de consulta, conforme a documentação em https://developers.google.com/drive/api/v3/ref-search-terms.

Cada registro retornado é processado pelo método `processarArquivoDrive` que realiza o download dos arquivos, ou exclui eles do Drive caso já tenha sido baixado:

```java
private static void processarArquivoDrive(Drive service, String extensao, File file) throws IOException {
    logger.info("{} {}", file.getName(), file.getId());
    java.io.File parentDir = new java.io.File(config.downloadDir());
    if (!parentDir.exists() && !parentDir.mkdirs()) {
        logger.error("Não foi possível criar o diretório");
            throw new IOException("Não foi possível criar o diretório");
    }
    final java.io.File arquivo = new java.io.File(parentDir, file.getName());
    if (!arquivo.exists()) {
        if (extensao.replace(".", "").equals(FilenameUtils.getExtension((file.getName())))) {
            downloadArquivo(service, file, arquivo);
        } else {
            logger.info("Arquivo não é o esperado: {}", file.getName());
            logger.info("Extensão: {}", FilenameUtils.getExtension(file.getName()));
        }
    } else {
        logger.info("Excluíndo arquivo: {}", file.getName());
        service.files().delete(file.getId()).execute();
    }
}
```

O código de exclusão poderia ter sido feito separadamente, mas devo fazer isso em uma versão futura, para os meus propósitos atuais funcionou perfeitamente. Após realizar o download dos arquivos que queria, rodei o programa mais uma vez para excluir os arquivos e liberar 3 gigas de espaço.

Todo o código está disponível em [GitHub - ivanqueiroz/iqdrive](https://github.com/ivanqueiroz/iqdrive) e deixo livre para contribuições.

# Fontes

[Developer's Guide - API Client Library for Java](https://developers.google.com/api-client-library/java/google-api-java-client/dev-guide)
