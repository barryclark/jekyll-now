// messages en ligne
export const getDeleteMessage = filename =>
  `Êtes-vous sûr de vouloir supprimer "${filename}" ?`;

export const getLeaveMessage = () =>
  'Il y a des modifications non sauvegardées sur cette page. Êtes-vous sûr de vouloir quitter ?';

export const getNotFoundMessage = type => `Pas de ${type} trouvés.`;

export const getOverrideMessage = filename =>
  `${filename} sera écrasé. Poursuivre quand même ?`;

// messages de notification
export const getParserErrorMessage = () => 'Erreur de parsing';

export const getSuccessMessage = () => 'Succès';

export const getErrorMessage = () => 'Erreur';

export const getUploadSuccessMessage = filename =>
  `${filename} a bien été téléversé.`;

export const getUploadErrorMessage = () =>
  `Erreur pendant le chargement du fichier.`;

export const getFetchErrorMessage = filename =>
  `Impossible de télécharger ${filename}`;

export const getUpdateErrorMessage = filename =>
  `Impossible de mettre à jour ${filename}`;

export const getDeleteErrorMessage = filename =>
  `Impossible d'effacer  ${filename}`;

// messages de validation
export const getTitleRequiredMessage = () => 'Titre requis';

export const getFilenameRequiredMessage = () => 'Nom de fichier requis.';

export const getContentRequiredMessage = () => 'Contenu requis.';

export const getFilenameNotValidMessage = () =>
  "Le nom de fichier n'est pas valide.";

// titres dans la barre latérale
export const sidebar = {
  pages: 'Pages',
  posts: 'Articles',
  datafiles: 'Fichiers de données',
  collections: 'Collections',
  staticfiles: 'Fichiers statiques',
  configuration: 'Configuration',
};

// libellés des boutons
export const labels = {
  save: {
    label: 'Enregistrer',
    triggeredLabel: 'Enregistré',
  },
  create: {
    label: 'Créer',
    triggeredLabel: 'Crée',
  },
  delete: {
    label: 'Supprimer',
  },
  view: {
    label: 'Voir',
  },
  upload: {
    label: 'Ajouter',
  },
  viewToggle: {
    label: 'Changer de vue de GUI Editor',
    triggeredLabel: 'Changer de vue de Raw Editor',
  },
};
