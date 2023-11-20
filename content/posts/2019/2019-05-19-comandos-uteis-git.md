---
categories:
- git
- comandos
- util
date: "2019-05-19T00:00:00Z"
title: Comandos Úteis do Git
url: /2019/05/2019-05-19-comandos-uteis-git.html
tags: ["git", "terminal", "vcs"]
---

O [Git](https://git-scm.com/) é uma ferramenta de versionamento excelente criada para controlar o código do Kernel do Linux. Com o tempo se mostrou extremamente completa e competente para todos os tipos de projeto, apesar de ser um pouco mais complexa. Esse é um post diferente com intuito de apresentar alguns comandos úteis que podem ajudar no dia a dia, ele é resultado de pesquisas naqueles momentos de aperto.

> A arte é uma ferramenta; os espíritos são os operários.
>
> -- _Victor Hugo_

![Estados do Git]({{site.baseurl}}/images/2019/05/git-estados.png)

### Configuração

As configurações realizadas são armazenados no arquivo **.gitconfig** na pasta _home_ do usuário.

#### Nome do usuário

    git config --global user.name "Ivan Queiroz"

#### Email

    git config --global user.email ivanqueiroz@gmail.com

#### Editor de texto padrão

    git config --global core.editor vim

#### Ferramenta de merge

    git config --global merge.tool vimdiff

#### Arquivos ignorados nos repositórios globalmente

    git config --global core.excludesfile ~/.gitignore

#### Listar configurações

git config --list

---

### Manipulação de repositório

Comandos para manipular o repositório Git local.

#### Criar novo repositório

    git init

#### Verificar estado dos arquivos/diretórios

    git status

#### Adicionar um arquivo em específico

    git add <nome do arquivo>

#### Adicionar um diretório em específico

    git add <nome do diretório>

#### Adicionar todos os arquivos/diretórios

    git add .

#### Adicionar um arquivo que esta listado no .gitignore (geral ou do repositório)

    git add -f <nome do arquivo>

#### Comitar um arquivo

    git commit <nome do arquivo>

#### Comitar vários arquivos

    git commit <nome do arquivo> <nome do outro arquivo>

#### Comitar informando mensagem

    git commit <nome do arquivo> -m "<mensagem>"

#### Remover arquivo

    git rm <nome do arquivo>

#### Remover diretório

    git rm -r <diretório>
---

### Consultando histórico

Comandos para verificar o histórico do repositório.

#### Exibir histórico

    git log

#### Exibir histórico com diff das duas últimas alterações

    git log -p -2

#### Exibir resumo do histórico (hash completa, autor, data, comentário e qtde de alterações (+/-))

    git log --stat

#### Exibir informações resumidas em uma linha (hash completa e comentário)

    git log --pretty=oneline

#### Exibir histórico com formatação específica (hash abreviada, autor, data e comentário)

    git log --pretty=format:"%h - %an, %ar : %s"

* %h: Abreviação do hash;
* %an: Nome do autor;
* %ar: Data;
* %s: Comentário.

Mais opções de formatação no [Git Book](http://git-scm.com/book/en/Git-Basics-Viewing-the-Commit-History)

#### Exibir histório de um arquivo específico

    git log -- <caminho_do_arquivo>

#### Exibir histórico de um arquivo específico que contêm uma determinada palavra

    git log --summary -S<palavra> [<caminho_do_arquivo>]

#### Exibir histórico modificação de um arquivo

    git log --diff-filter=M -- <caminho_do_arquivo>

#### Exibir histórico de um determinado autor

    git log --author=usuario

#### Exibir revisão e autor da última modificação de uma bloco de linhas

    git blame -L 12,22 <nome do arquivo>
---

### Desfazendo modificações

Comandos para voltar estados do workspace.

#### Desfazendo alteração local (working directory)

Este comando deve ser utilizando enquanto o arquivo não foi adicionado na **staged area**.

    git checkout -- <nome do arquivo>

#### Desfazendo alteração local (staging area)

Este comando deve ser utilizando quando o arquivo já foi adicionado na **staged area**.

    git reset HEAD <nome do arquivo>

Se o resultado abaixo for exibido, o comando reset *não* alterou o diretório de trabalho.

    Unstaged changes after reset:
    M    <nome do arquivo>

A alteração do diretório pode ser realizada através do comando abaixo:

    git checkout <nome do arquivo>
---

### Trabalhando com remotos

Comandos para interagir com repositórios remotos.

#### Exibir os repositórios remotos

    git remote

    git remote -v

#### Vincular repositório local com um repositório remoto

    git remote add origin <endereço do repositório>

#### Exibir informações dos repositórios remotos

    git remote show origin

#### Renomear um repositório remoto

    git remote rename origin curso-git

#### Desvincular um repositório remoto

    git remote rm curso-git

### Enviar arquivos/diretórios para o repositório remoto

O primeiro **push** de um repositório define o comportamento _default_ para qual remoto enviar.

    git push -u origin master

Nos seguintes a informação pode ser omitida.

    git push
---

### Obtendo modificações remotas

Comandos para obter informações dos repositórios remotos.

#### Atualizar os arquivos no branch atual

    git pull

#### Buscar as alterações, mas não aplica-las no branch atual

    git fecth

#### Clonar um repositório remoto já existente

    git clone <endereço>
---

### Tags

Comandos para manipulação de tags.

#### Criando uma tag leve

    git tag <nome da tag>

#### Criando uma tag anotada

    git tag -a <nome da tag> -m "<mensagem>"

#### Criando uma tag assinada

Para criar uma tag assinada é necessário uma chave privada (GNU Privacy Guard - GPG).

    git tag -s <nome da tag> -m "<mensagem>"

#### Criando tag a partir de um commit (hash)

    git tag -a vs-1.2 9fceb02

#### Criando tags no repositório remoto

    git push origin vs-1.2

#### Criando todas as tags locais no repositório remoto

    git push origin --tags
---

### Branches

Comandos para manipulação de branches.

Site muito bom para entender [Learn Git Branching](https://learngitbranching.js.org/?demo)

#### Criando um novo branch

    git branch <nome do branch>

#### Trocando para um branch existente

    git checkout hotfix/form-erro

Neste caso, o ponteiro principal **HEAD** esta apontando para o branch chamado hotfix/form-erro.

#### Criar um novo branch e trocar 

    git checkout -b hotfix/form-erro

#### Voltar para o branch principal (master)

    git checkout master
---

#### Merge

    git merge hotfix/form-erro

Para realizar o *merge*, é necessário estar no branch que deverá receber as alterações. O *merge* pode automático ou manual. O merge automático será feito em arquivos textos que não sofreram alterações nas mesmas linhas, já o merge manual será feito em arquivos textos que sofreram alterações nas mesmas linhas.

A mensagem indicando um *merge* manual será:

    Automerging meu_arquivo.txt
    CONFLICT (content): Merge conflict in meu_arquivo.txt
    Automatic merge failed; fix conflicts and then commit the result.

#### Apagando um branch

    git branch -d hotfix/form-erro

#### Listar branches

    git branch

#### Listar branches com informações dos últimos commits

    git branch -v

#### Listar branches que já foram fundidos (merged) com o **master**

    git branch --merged

#### Listar branches que não foram fundidos (merged) com o **master**

    git branch --no-merged

#### Criando branches no repositório remoto

    git push origin hotfix/form-erro

#### Criando um branch remoto com nome diferente

    git push origin hotfix/form-erro:new-branch

#### Baixar um branch remoto para edição

    git checkout -b bug-123 origin/hotfix/form-erro

#### Apagar branch remoto

    git push origin:hotfix/form-erro

#### Rebasing

Fazendo o **rebase** entre um o branch experiment e o master.

    git checkout experiment

    git rebase master

Mais informações e explicações sobre o [Rebasing](http://git-scm.com/book/en/Git-Branching-Rebasing)

---

### Stash

Para alternar entre um branch e outro é necessário fazer o commit das alterações atuais para depois trocar para um outro branch. Se existir a necessidade de realizar a troca sem fazer o commit é possível criar um **stash**. O Stash como se fosse um branch temporário que contem apenas as alterações ainda não commitadas.

#### Criar um stash

    git stash

#### Listar stashes

    git stash list

#### Voltar para o último stash

    git stash apply

#### Voltar para um stash específico

    git stash apply stash@{2}

Onde **2** é o índice do stash desejado.

#### Criar um branch a partir de um stash

    git stash branch meu_branch
---

### Reescrevendo o histórico

Comandos para manipular os commits.

#### Alterando mensagens de commit

    git commit --amend -m "<mensagem>"

#### Alterar últimos commits (Rebase)

Alterando os três últimos commits

    git rebase -i HEAD~3

O editor de texto será aberto com as linhas representando os três últimos commits.

    pick f7f3f6d changed my name a bit
    pick 310154e updated README formatting and added blame
    pick a5f4a0d added catfile

Altere para edit os commits que deseja realizar alterações.

    edit f7f3f6d changed my name a bit
    pick 310154e updated README formatting and added blame
    pick a5f4a0d added catfile

Feche o editor de texto.

Digite o comando para alterar a mensagem do commit que foi marcado como *edit*.

    git commit –amend -m “Nova mensagem”

Aplique a alteração

    git rebase --continue

**Atenção:** É possível alterar a ordem dos commits ou remover um commit apenas
mudando as linhas ou removendo.

#### Juntando vários commits

Seguir os passos anteriores, porém marcar os commits que devem ser juntados com **squash*
  
    pick f7f3f6d changed my name a bit
    squash 310154e updated README formatting and added blame
    squash a5f4a0d added catfile

#### Remover todo histórico de um arquivo

    git filter-branch --tree-filter 'rm -f passwords.txt' HEAD

### Bisect

O bisect (pesquisa binária) é útil para encontrar um commit que esta gerando um bug ou uma inconsistência entre uma sequência de commits.

#### Iniciar pequinsa binária

    git bisect start

#### Marcar o commit atual como ruim

    git bisect bad

#### Marcar o commit de uma tag que esta sem o bug/inconsistência

    git bisect good vs-1.1

#### Marcar o commit como bom

O GIT irá navegar entre os commits para ajudar a indentificar o commit que esta com o problema. Se o commit atual não estiver quebrado, então é necessário marca-lo como **bom**.

    git bisect good

#### Marcar o commit como ruim

Se o commit estiver com o problema, então ele deverá ser marcado como **ruim**.

    git bisect bad

#### Finalizar a pesquisa binária

Depois de encontrar o commit com problema, para retornar para o *HEAD* utilize:

    git bisect reset

## Fontes

* Projeto Git de Leonardo Comelli - [Git](https://gist.github.com/leocomelli/2545add34e4fec21ec16)
* Zeroturnaround - [Git Cheat Sheet: Commands and Best Practices](https://jrebel.com/rebellabs/git-commands-and-best-practices-cheat-sheet/)
