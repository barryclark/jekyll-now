// inline messages
export const getDeleteMessage = filename =>
  `Är du säker på att du bill ta bort "${filename}" ?`;

export const getLeaveMessage = () =>
  'Du har osparade ändringar på den här sidan. Är du säker på att du vill lämna?';

export const getNotFoundMessage = type => `Ingen ${type} hittad.`;

export const getOverrideMessage = filename =>
  `${filename} kommer skrivas över. Vill du fortsätta?`;

// notification messages
export const getParserErrorMessage = () => 'Tolkningsfel';

export const getSuccessMessage = () => 'Lyckades';

export const getErrorMessage = () => 'Fel';

export const getUploadSuccessMessage = filename =>
  `${filename} laddades upp korrekt`;

export const getUploadErrorMessage = () =>
  `Det skedde ett fel när du laddade upp filen.`;

export const getFetchErrorMessage = filename => `Kunde inte hämta ${filename}`;

export const getUpdateErrorMessage = filename =>
  `Kunde inte uppdatera ${filename}`;

export const getDeleteErrorMessage = filename =>
  `Kunde inte ta bort ${filename}`;

// validation messages
export const getTitleRequiredMessage = () => 'Titel måste anges.';

export const getFilenameRequiredMessage = () => 'Filenamn måste anges.';

export const getContentRequiredMessage = () => 'Innehåll måste anges.';

export const getFilenameNotValidMessage = () => 'Filnamn inte gilltigt.';

// sidebar titles
export const sidebar = {
  pages: 'Sidor',
  posts: 'Inlägg',
  datafiles: 'Data filer',
  collections: 'Samlingar',
  staticfiles: 'Statiska filer',
  configuration: 'Konfiguration',
};

// button labels
export const labels = {
  save: {
    label: 'Spara',
    triggeredLabel: 'Sparad',
  },
  create: {
    label: 'Skapa',
    triggeredLabel: 'Skapad',
  },
  delete: {
    label: 'Ta bort',
  },
  view: {
    label: 'Visa',
  },
  upload: {
    label: 'Ladda upp filer',
  },
  viewToggle: {
    label: 'Byt vy till GUI Editor',
    triggeredLabel: 'Byt vy till Raw Editor',
  },
};
