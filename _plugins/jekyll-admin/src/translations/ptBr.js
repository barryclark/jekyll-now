// inline messages
export const getDeleteMessage = filename =>
  `Tem certeza de que deseja excluir "${filename}" ?`;

export const getLeaveMessage = () =>
  'Você possui alterações não-salvas nesta página. Você tem certeza de que quer sair?';

export const getNotFoundMessage = type => `Nenhum ${type} encontrado.`;

export const getOverrideMessage = filename =>
  `${filename} será substituído. Continuar de qualquer maneira?`;

// notification messages
export const getParserErrorMessage = () => 'Erro de análise';

export const getSuccessMessage = () => 'Sucesso';

export const getErrorMessage = () => 'Erro';

export const getUploadSuccessMessage = filename =>
  `${filename} carregado com sucesso`;

export const getUploadErrorMessage = () => `Ocorreu um erro ao carregar o arquivo.`;

export const getFetchErrorMessage = filename =>
  `Não foi possível buscar o ${filename}`;

export const getUpdateErrorMessage = filename =>
  `Não foi possível atualizar o ${filename}`;

export const getDeleteErrorMessage = filename =>
  `Não foi possível excluir o ${filename}`;

// validation messages
export const getTitleRequiredMessage = () => 'O título é obrigatório.';

export const getFilenameRequiredMessage = () => 'O nome do arquivo é necessário.';

export const getContentRequiredMessage = () => 'O conteúdo é obrigatório.';

export const getFilenameNotValidMessage = () => 'O nome do arquivo não é válido.';

// sidebar titles
export const sidebar = {
  pages: 'Páginas',
  posts: 'Postagens',
  drafts: 'Rascunhos',
  datafiles: 'Arquivos de dados',
  collections: 'Colecções',
  staticfiles: 'Arquivos estáticos',
  configuration: 'Configuração',
};

// button labels
export const labels = {
  save: {
    label: 'Salvar',
    triggeredLabel: 'Salvo',
  },
  create: {
    label: 'Criar',
    triggeredLabel: 'Criado',
  },
  delete: {
    label: 'Excluir',
  },
  view: {
    label: 'Ver',
  },
  upload: {
    label: 'Carregar arquivo',
  },
  viewToggle: {
    label: 'Alternar exibição para o GUI',
    triggeredLabel: 'Alterar visão para editor bruto',
  },
};
