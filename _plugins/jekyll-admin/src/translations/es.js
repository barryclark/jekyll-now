// mensajes en linea
export const getDeleteMessage = filename =>
  `¿Estás seguro que quieres borrar "${filename}" ?`;

export const getLeaveMessage = () =>
  '¿Hay cambios en esta página que no han sido guardados. ¿Seguro que quieres salir?';

export const getNotFoundMessage = type => `No se encontraron ${type}.`;

export const getOverrideMessage = filename =>
  `${filename} sera reemplazado. ¿Gustas continuar?`;

// mensajes de notificación
export const getParserErrorMessage = () => 'Error de parsing';

export const getSuccessMessage = () => '‘Éxito';

export const getErrorMessage = () => 'Error';

export const getUploadSuccessMessage = filename =>
  `${filename} ha sido subido.`;

export const getUploadErrorMessage = () =>
  'Ocurrió un error subiendo el archivo.';

export const getFetchErrorMessage = filename =>
  `No se pudo descargar ${filename}`;

export const getUpdateErrorMessage = filename =>
  `No se pudo actualizar ${filename}`;

export const getDeleteErrorMessage = filename =>
  `No se pudo borrar ${filename}`;

// mensajes de validación
export const getTitleRequiredMessage = () => 'Se requiere de un título.';

export const getFilenameRequiredMessage = () =>
  'Se requiere de un nombre de archivo.';

export const getContentRequiredMessage = () => 'Se requiere contenido.';

export const getFilenameNotValidMessage = () =>
  'El nombre del archivo no es válido.';

// títulos en la barra lateral
export const sidebar = {
  pages: 'Páginas',
  posts: 'Artículos',
  datafiles: 'Archivos de Datos',
  collections: 'Colecciones',
  staticfiles: 'Archivos Estáticos',
  configuration: 'Configuración',
};

// Etiquetas en los botones
export const labels = {
  save: {
    label: 'Guardar',
    triggeredLabel: 'Guardado',
  },
  create: {
    label: 'Crear',
    triggeredLabel: 'Creado',
  },
  delete: {
    label: 'Borrar',
  },
  view: {
    label: 'Ver',
  },
  upload: {
    label: 'Subir archivo',
  },
  viewToggle: {
    label: 'Cambiar interface al editor GUI',
    triggeredLabel: 'Cambiar interface al editor Raw',
  },
};
