// inline messages
export const getDeleteMessage = filename =>
  `Er du sikker på du ønsker at slette "${filename}" ?`;

export const getLeaveMessage = () =>
  'Du har ændringer på denne side du endnu ikke har gemt. Er du sikker på du ønsker at forlade siden?';

export const getNotFoundMessage = type => `Ingen ${type} fundet.`;

export const getOverrideMessage = filename =>
  `${filename} vil blive overskrevet. Ønsker du at fortsætte?`;

// notification messages
export const getParserErrorMessage = () => 'Fortolkningsfejl';

export const getSuccessMessage = () => 'Succes';

export const getErrorMessage = () => 'Fejl';

export const getUploadSuccessMessage = filename =>
  `${filename} blev uploadet korrekt`;

export const getUploadErrorMessage = () =>
  `Der skete en fejl under upload af filen.`;

export const getFetchErrorMessage = filename => `Kunne ikke hente ${filename}`;

export const getUpdateErrorMessage = filename =>
  `Kunne ikke opdatere ${filename}`;

export const getDeleteErrorMessage = filename =>
  `Kunne ikke slette ${filename}`;

// validation messages
export const getTitleRequiredMessage = () => 'Titel er påkrævet.';

export const getFilenameRequiredMessage = () => 'Filnavn er påkrævet.';

export const getContentRequiredMessage = () => 'Indhold er påkrævet.';

export const getFilenameNotValidMessage = () => 'Filnavnet er ikke gyldigt.';

// sidebar titles
export const sidebar = {
  pages: 'Sider',
  posts: 'Indlæg',
  datafiles: 'Data filer',
  collections: 'Samlinger',
  staticfiles: 'Statiske filer',
  configuration: 'Konfiguration',
};

// button labels
export const labels = {
  save: {
    label: 'Gem',
    triggeredLabel: 'Gemt',
  },
  create: {
    label: 'Opret',
    triggeredLabel: 'Oprettet',
  },
  delete: {
    label: 'Slet',
  },
  view: {
    label: 'Vis',
  },
  upload: {
    label: 'Upload filer',
  },
  viewToggle: {
    label: 'Skift visning til grafisk redigering',
    triggeredLabel: 'Skift visning til tekst redigering',
  },
};
