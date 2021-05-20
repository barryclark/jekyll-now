import yaml from 'js-yaml';
import _ from 'underscore';

/**
 * Converts the object into YAML string.
 * @param {Object} object
 * @return {String} yaml
 */
export const toYAML = obj =>
  !_.isEmpty(obj) ? yaml.safeDump(obj, { indent: 2 }) : '';

/**
 * Converts the YAML string into JS object.
 * @param {String} string
 * @return {Object} obj
 */
export const toJSON = yamlString => (yamlString ? yaml.load(yamlString) : {});

/**
 * Capitalize the given string.
 * @param {String} string
 * @return {String} string
 */
export const capitalize = string => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
};

/**
 * Convert the given string into title case format.
 * @param {String} string
 * @return {String} string
 */
export const toTitleCase = string => {
  if (!string) return '';
  return string.replace(/\w\S*/g, txt => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

/**
 * Slugify the given string
 * @param {String} string
 * @return {String} string
 */
export const slugify = string => {
  if (!string) return '';
  const a = 'àáäâèéëêìíïîıòóöôùúüûñçşßÿœæŕśńṕẃǵğǹḿǘẍźḧ·/_,:;';
  const b = 'aaaaeeeeiiiiioooouuuuncssyoarsnpwggnmuxzh------';
  const p = new RegExp(a.split('').join('|'), 'g');

  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special chars
    .replace(/&/g, '-') // Replace & with 'and'
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
};

/**
 * Returns filename from the given path
 * @param {String} path
 * @return {String} filename
 */
export const getFilenameFromPath = path => {
  if (!path) return '';
  return path.substring(path.lastIndexOf('/') + 1);
};

/**
 * Returns extension from the given path or filename
 * @param {String} path or filename
 * @return {String} extension or nil
 */
export const getExtensionFromPath = path => {
  if (!path) return '';
  const filename = getFilenameFromPath(path);
  const index = filename.lastIndexOf('.');

  if (index > 0) {
    return filename.substring(index + 1);
  } else {
    return '';
  }
};

/**
 * returns the uploaded static files that are being overwritten
 * @param {Array} uploadedFiles
 * @param {Array} currentFiles
 * @return {Array} filenames
 */
export const existingUploadedFilenames = (uploadedFiles, currentFiles) => {
  if (
    (uploadedFiles && !uploadedFiles.length) ||
    (currentFiles && !currentFiles.length)
  ) {
    return [];
  }
  const currentFilenames = _.map(currentFiles, cf =>
    getFilenameFromPath(cf.path)
  );
  return _.chain(uploadedFiles)
    .filter(file => currentFilenames.includes(file.name))
    .map(file => file.name)
    .value();
};

/**
 * Given an Event object, prevents the default event
 * from bubbling, if possible.
 * @param {Event} event
 */
export const preventDefault = event => {
  if (event && event.preventDefault) {
    event.preventDefault();
  }
};

/**
 * Given an object, trims every keys and values recursively.
 * @param {Object} object
 * @return {Object} trimmedObject
 */
export const trimObject = object => {
  if (!_.isObject(object)) return object;
  return _.keys(object).reduce((acc, key) => {
    if (typeof object[key] === 'string') {
      try {
        acc[key.trim()] = JSON.parse(object[key].trim());
      } catch (e) {
        acc[key.trim()] = object[key].trim();
      }
    } else {
      acc[key.trim()] = trimObject(object[key]);
    }
    return acc;
  }, Array.isArray(object) ? [] : {});
};

/**
 * Given a resource type and splat, returns a formatted title string.
 * Falsy values are discarded.
 * @param {String} type - Resource type.
 * @param {String} splat - Directory splat for current resource.
 * @param {String} [prefix=''] - Optional string text to be placed in front.
 * @return {String} Empty string or formatted title.
 */
export const getDocumentTitle = (type, splat, prefix = '') => {
  if (!type) return '';
  const label = toTitleCase(type.toString());
  return [prefix, splat, label].filter(Boolean).join(' | ');
};

/**
 * @param {String} directory - Directory splat for current resource.
 * @param {String} filename - Basename of current resource.
 * @return {String} Filename or directory splat joined to the filename.
 */
export const computeRelativePath = (directory, filename) => {
  return directory ? `${directory}/${filename}` : `${filename}`;
};

// omit raw_content, path and empty-value keys in metadata state from front_matter
export const sanitizeFrontMatter = metadata => {
  return _.omit(metadata, (value, key, object) => {
    return key === 'raw_content' || key === 'path' || value === '';
  });
};

export const preparePayload = obj => JSON.stringify(trimObject(obj));
export const getFilenameFromTitle = title => `${slugify(title)}.md`;
