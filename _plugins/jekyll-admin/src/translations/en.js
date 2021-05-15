// inline messages
export const getDeleteMessage = filename =>
  `Are you sure that you want to delete "${filename}" ?`;

export const getLeaveMessage = () =>
  'You have unsaved changes on this page. Are you sure you want to leave?';

export const getNotFoundMessage = type => `No ${type} found.`;

export const getOverrideMessage = filename =>
  `${filename} will be overwritten. Continue anyway?`;

// notification messages
export const getParserErrorMessage = () => 'Parse Error';

export const getSuccessMessage = () => 'Success';

export const getErrorMessage = () => 'Error';

export const getUploadSuccessMessage = filename =>
  `${filename} uploaded successfully`;

export const getUploadErrorMessage = () => `Error occurred uploading the file.`;

export const getFetchErrorMessage = filename =>
  `Could not fetch the ${filename}`;

export const getUpdateErrorMessage = filename =>
  `Could not update the ${filename}`;

export const getDeleteErrorMessage = filename =>
  `Could not delete the ${filename}`;

export const getPublishDraftMessage = (draftPath, postPath) =>
  `'${draftPath}' will be converted to '${postPath}'`;

// validation messages
export const getTitleRequiredMessage = () => 'The title is required.';

export const getFilenameRequiredMessage = () => 'The filename is required.';

export const getContentRequiredMessage = () => 'The content is required.';

export const getFilenameNotValidMessage = () => 'The filename is not valid.';

// sidebar titles
export const sidebar = {
  pages: 'Pages',
  posts: 'Posts',
  drafts: 'Drafts',
  datafiles: 'Data Files',
  collections: 'Collections',
  staticfiles: 'Static Files',
  configuration: 'Configuration',
};

// button labels
export const labels = {
  save: {
    label: 'Save',
    triggeredLabel: 'Saved',
  },
  create: {
    label: 'Create',
    triggeredLabel: 'Created',
  },
  delete: {
    label: 'Delete',
  },
  publish: {
    label: 'Publish',
  },
  view: {
    label: 'View',
  },
  upload: {
    label: 'Upload files',
  },
  viewToggle: {
    label: 'Switch View to GUI Editor',
    triggeredLabel: 'Switch View to Raw Editor',
  },
};
