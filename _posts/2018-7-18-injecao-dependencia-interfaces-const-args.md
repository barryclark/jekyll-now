---
layout: post
title: Delphi - Injeção de dependências pelo construtor
---

Venho a um tempo já querendo reservar algum horário para escrever um pouco sobre delphi e compartilhar meu conhecimento adquirido nesse período com desenvolvimento de software.

E para iniciar, decidi falar sobre injeção de dependências pelo construtor da classe, mais específicamente, injeção de dependências do tipo **interface** para quando o parâmetro for uma constante, ou seja, tiver o argumento **const** definido ante a declaração do parâmetro.

Antes de partirmos ao ponto, é importante compreender para que serve o argumento **const** e porque devemos utiliza-lo.

Ao se passar um objeto para outro objeto por parâmetro, é realizado o incremento da contagem da referência, e isto tem um certo custo de processamento, mesmo que mínimo. Porém podemos evitar esse incremento utilizando o argumento **const** ao declarar um parâmetro, assim passamos a dizer ao compilador que aquele objeto passado por parâmetro não será alterado pela rotina chamada.

Ok, mas e qual a relação entre parâmetros do tipo **interface** definidos com argumentos **const**?

Simples, se posso definir qualquer objeto a ser passado por parâmetro com **const**, porque objetos do tipo **interface** não? De ínicio não existe nenhum "mal/problema" nisso, exceto se a sua necessidade (ou para você seja cômodo) for a de injetar a dependência por parâmetro e faça isso inline, aí sim podemos causar um vazamento de memória.

Suponha que temos uma **interface** chamada `IDAOPessoa` e a classe `TDAOPessoa` que implementa o método *salvar*: 

``` pascal
IDAOPessoa = interface
  procedure Salvar(const APessoa: TPessoaEntity);
end;
```
``` pascal
TDAOPessoa = class(TInterfacedObject, IDAOPessoa)
public
    constructor Create(const AConexao: TConnection); reintroduce;
    destructor Destroy; override;

    procedure Salvar(const APessoa: TPessoaEntity);

implementation

...

end.
```

Também suponha que temos uma regra chamada TPessoa que na sua criação recebe como parâmetro `IDAOPessoa`, que será responsável por salvar a entidade 'Pessoa' na base de dados.

``` pascal
TPessoa = class
public
    constructor Create(const AIDAOPessoa: IDAOPessoa); reintroduce;

    procedure Salvar(const APessoa: TPessoaEntity);

implementation

...

end.
```

E no nosso controlador criamos a regra TPessoa da seguinte maneira.

``` pascal
procedure TControlador.CriarObjetos(const AConexao: TConnection);
var
  fPessoa: TPessoa;
begin
  fPessoa := TPessoa.Create(TDAOPessoa.Create(AConexao));

  try
    //seu código aqui
  finally
    FreeAndNil(fPessoa);
  end;
end;
```

Aparentemente tudo ok não? Após criar o objeto/regra TPessoa, posso utiliza-la, salvar a pessoa e logo em seguida destruir o objeto, assim hipotéticamente, a regra seria destruída como também, correto? Errado, pois ao criar um objeto inline, ou seja, diretamente sem atribuí-lo a uma variável, o compilador não incrementa o seu contador, isso somente quando o argumento do parâmetro for um const, logo, se a contagem da interface que referência do DAO permanecer em 0, para o compilador ela nunca foi criada, logo, nunca precisará destruí-la e aí está o nosso leak de memória.

Agora, como contornamos esse problema? Temos várias maneiras, a mais simples seria criar uma variável do tipo `IDAOPessoa`, atribuir a criação do DAO para essa variável e após passa-la por parâmetro. 

Exemplo:

``` pascal
procedure TControlador.CriarObjetos(const AConexao: TConnection);
var
  fPessoa: TPessoa;
  fIDAOPessoa: IDAOPessoa;
begin
  fIDAOPessoa := TDAOPessoa.Create(AConexao);
  fPessoa := TPessoa.Create(fIDAOPessoa);

  try
    //...
  finally
    FreeAndNil(fPessoa);
  end;
end;
```

Aaah mas eu quero continuar criando meus objetos inline, sem precisar atribuí-los a uma variável.

Existem algumas possibilidades, você pode passar o parâmetro sem definir um argumento (`const` ou `var`), ou defini-lo como `var`, note que em ambos os casos, isso vai fazer com que o contador que referência o objeto seja incrementado a cada passagem de parâmetro do obejto. Ou você mantém o argumento do parâmetro como `const`e implementa uma `class function` no DAO para retornar o próprio já criado.

Exemplo:

``` pascal
TDAOPessoa = class(TInterfacedObject, IDAOPessoa)
strict private
    constructor Create(const AConexao: TConnection); reintroduce;
public    
    class function Criar(const AConexao: TConnection): IDAOPessoa;
    destructor Destroy; override;

    procedure Salvar(const APessoa: TPessoaEntity);

implementation

class function TDAOPessoa.Criar(const AConexao: TConnection): IDAOPessoa;
begin
  Result := Create(AConexao);
end;

...

end.
```

E no controlador, criar o objeto inline da seguinte maneira

``` pascal
procedure TControlador.CriarObjetos(const AConexao: TConnection);
var
  fPessoa: TPessoa;
begin
  fPessoa := TPessoa.Create(TDAOPessoa.Criar(AConexao));

  try
    //...
  finally
    FreeAndNil(fPessoa);
  end;
end;
```

Notem que movi o construtor `Create` do DAO para o escopo `strict private` e criei uma `class function` .Criar, assim obrigamos que outro desenvolvedor crie o objeto a partir do .Criar e não do Create diretamente.

Ao criar os objetos utilizando uma class function, e tendo como retorno a interface do mesmo, garantimos que a referência do mesmo seja incrementada pelo menos uma vez, ao `Result` no caso, assim sendo, quando destruirmos a regra/objeto TPessoa, o compilador irá decrementar a referência ao DAO chegando a mesma a zero e entenderá que o mesmo também deve ser destruído.

Por mais simples que pareça ser, vejo muitos desenvolvedores, como eu a um tempo atrás que costumava injetar as dependências por parâmetro, criando os objetos inline, acreditando estar fazendo o correto e espero que para alguém isto sirva de ajuda.