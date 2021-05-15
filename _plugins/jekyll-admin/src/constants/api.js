export const API =
  process.env.NODE_ENV === 'production'
    ? '/_api'
    : 'http://localhost:4000/_api';

export const getSiteMetaUrl = () => `${API}/site_meta`;

export const getConfigurationUrl = () => `${API}/configuration`;
export const putConfigurationUrl = () => `${API}/configuration`;

export const pagesAPIUrl = (directory = '') => `${API}/pages/${directory}`;
export const pageAPIUrl = (directory, filename) =>
  directory
    ? `${API}/pages/${directory}/${filename}`
    : `${API}/pages/${filename}`;

export const draftsAPIUrl = (directory = '') => `${API}/drafts/${directory}`;
export const draftAPIUrl = (directory, filename) =>
  directory
    ? `${API}/drafts/${directory}/${filename}`
    : `${API}/drafts/${filename}`;

export const collectionsAPIUrl = () => `${API}/collections`;
export const collectionAPIUrl = (collection_name, directory) =>
  directory
    ? `${API}/collections/${collection_name}/entries/${directory}`
    : `${API}/collections/${collection_name}/entries`;
export const documentAPIUrl = (collection_name, directory, filename) =>
  directory
    ? `${API}/collections/${collection_name}/${directory}/${filename}`
    : `${API}/collections/${collection_name}/${filename}`;

export const datafilesAPIUrl = (directory = '') => `${API}/data/${directory}`;
export const datafileAPIUrl = (directory, filename) =>
  directory
    ? `${API}/data/${directory}/${filename}`
    : `${API}/data/${filename}`;

export const staticfilesAPIUrl = (directory = '') =>
  `${API}/static_files/${directory}`;
export const staticfileAPIUrl = (directory, filename) =>
  directory
    ? `${API}/static_files/${directory}/${filename}`
    : `${API}/static_files/${filename}`;
