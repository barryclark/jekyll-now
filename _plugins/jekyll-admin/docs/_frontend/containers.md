---
title: Containers
description: Container components which connect the presentational components to Redux.
---

## Sidebar

Container for listing all of routes' links. The links can be hidden from `Sidebar` by adding
an option to `_config.yml` like the following;

```yaml
jekyll_admin:
  hidden_links:
    - posts
    - pages
```

### PropTypes

```javascript
{
  collections: Array,
  fetchCollections: Function
}
```

## Header

Container for displaying header which includes title and homepage link.

### PropTypes

```javascript
{
  config: Object,
  fetchConfig: Function,
  updated: Boolean \\ optional
}
```

## MetaFields

Main container for metafields. Generates list, object or plain inputs for front
matters other than `title`, `body`, `path` and `draft`. Doubles as a GUI to edit
data files. The GUI will parse the input and write valid YAML to file,
consequently removing any comments previously present, and also converting
boolean to string literals i.e. `true` & `false` will be written as `'true'`
and `'false'`.

### PropTypes

```javascript
{
  content: Object,
  metadata: Object,
  key_prefix: String,
  storeContentFields: Function,
  addField: Function,
  removeField: Function,
  updateFieldKey: Function,
  updateFieldValue: Function,
  moveArrayItem: Function,
  convertField: Function,
  dataview: Boolean
}
```

## Notifications

Container for showing notifications at the right bottom of the screen

### PropTypes

```javascript
{
  notification: Object
}
```


# Views

Contains all of the views linked with the routes.

## Configuration

Container for Configuration view. Consists of a raw-text-editor, a YAML GUI-editor, a toggle button to switch between the two editors, and a save button.

The save button is activated when either of the editors change.

While the raw-text-editor will output raw-content as entered into the editor, the GUI-editor will output YAML data parsed from
the input values which will result in removal of any existing comments and any extra spaces around the colon following the config key.

### PropTypes

```javascript
{
  config: Object,
  onEditorChange: Function,
  putConfig: Function,
  error: String,
  updated: Boolean,
  editorChanged: Boolean,
  fieldChanged: Boolean,
  errors: Array,
  clearErrors: Function,
  router: Object,
  route: Object
}
```

## Pages

Container for Pages view. Lists available pages and directories.

### PropTypes

```javascript
{
  pages: Array,
  fetchPages: Function,
  deletePage: Function,
  isFetching: Boolean,
  searchByTitle: Function
}
```

## PageEdit

Container for editing a page.

### PropTypes

```javascript
{
  page: Object,
  fetchPage: Function,
  deletePage: Function,Boolean,
  putPage: Function,
  updateTitle: Function,
  updateBody: Function,
  updatePath: Function,
  clearErrors: Function,
  isFetching: Boolean,
  errors: Array,
  fieldChanged: Boolean,
  updated: Boolean,
  params: Object
}
```

## PageNew

Container for creating a new page.

### PropTypes

```javascript
{
  putPage: Function,
  updateTitle: Function,
  updateBody: Function,
  updatePath: Function,
  clearErrors: Function,
  errors: Array,
  fieldChanged: Boolean
}
```

## Documents

Container for Documents view. Lists documents and directories of a collection.

### PropTypes

```javascript
{
  currentDocuments: Array,
  fetchCollection: Function,
  deleteDocument: Function,
  search: Function,
  isFetching: Boolean,  
  params: Object
}
```

## DocumentEdit

Container for editing a document.

### PropTypes

```javascript
{
  currentDocument: Object,
  fetchDocument: Function,
  deleteDocument: Function,Boolean,
  putDocument: Function,
  updateTitle: Function,
  updateBody: Function,
  updatePath: Function,
  clearErrors: Function,
  isFetching: Boolean,
  errors: Array,
  fieldChanged: Boolean,
  updated: Boolean,
  params: Object
}
```

## DocumentNew

Container for creating a new document.

### PropTypes

```javascript
{
  putDocument: Function,
  updateTitle: Function,
  updateBody: Function,
  updatePath: Function,
  clearErrors: Function,
  errors: Array,
  fieldChanged: Boolean
}
```

## Drafts

Container for Drafts view. Lists all drafts and sub-directories at given path.

### PropTypes

```javascript
{
  drafts: Array,
  fetchDrafts: Function,
  deleteDraft: Function,
  search: Function,
  isFetching: Boolean,
  params: Object
}
```

## DraftNew

Container for creating a new draft.

```javascript
{
  putDraft: Function,
  updateTitle: Function,
  updateBody: Function,
  updatePath: Function,
  clearErrors: Function,
  errors: Array,
  fieldChanged: Boolean,
  updated: Boolean,
  router: Object,
  route: Object,
  params: Object,
  config: Object
}
```

## DraftEdit

Container for editing a draft.

```javascript
{
  draft: Object,
  fetchDraft: Function,
  deleteDraft: Function,
  putDraft: Function,
  updateTitle: Function,
  updateBody: Function,
  updatePath: Function,
  clearErrors: Function,
  isFetching: Boolean,
  fieldChanged: Boolean,
  updated: Boolean,
  errors: Array,
  params: Object,
  router: Object,
  route: Object
}
```

## DataFiles

Container for DataFiles view. Lists data files.

### PropTypes

```javascript
{
  files: Array,
  fetchDataFiles: Function,
  deleteDataFile: Function,
  search: Function,
  isFetching: Boolean,
  search: Function,
  params: Object
}
```

## DataFileEdit

Container for editing a data file. Supports editing via a raw text editor or a YAML editor GUI.

### PropTypes

```javascript
{
  datafile: Object,
  isFetching: Boolean,
  updated: Boolean,
  datafileChanged: Boolean,
  fieldChanged: Boolean,
  fetchDataFile: Function,
  putDataFile: Function,
  deleteDataFile: Function,
  clearErrors: Function,
  onDataFileChanged: Function,
  errors: Array,
  params: Object,
  router: Object,
  route: Object
}
```

## DataFileNew

Container for creating a new data file.

Includes a *GUI Editor* for easily creating YAML or JSON data files.
Simply input the file's basename, the filetype (`YAML` or `JSON`) and data. The GUI will create the corresponding file with suitable extensions. CSV files cannot be created via the GUI Editor.

### PropTypes

```javascript
{
  datafile: Object,
  putDataFile: Function,
  onDataFileChanged: Function,
  clearErrors: Function,
  errors: Array,
  updated: Boolean,
  datafileChanged: Boolean,
  params: Object,
  router: Object,
  route: Object
  fieldChanged: Boolean // optional
}
```

## StaticFiles

Container for rendering static files per directory. In addition to rendering links to the static contents of the directory,
there's also provision to let users upload/delete static files. It uses `react-dropzone` for drag & drop file uploading.
Uploaded files are previewed via `FilePreview` component.

### PropTypes

```javascript
{
  files: Array,
  fetchStaticFiles: Function,
  uploadStaticFiles: Function,
  deleteStaticFile: Function,
  search: Function,
  isFetching: Boolean,
  params: Object,
  onClickStaticFile: Function // optional
}
```

## StaticIndex

Container for listing *all* static files in the current site. It does not have provisions for adding new files or deleting existing ones.
The view is simply a grid of previews of the files with links to view the raw content of the files.

### PropTypes

```javascript
{
  files: Array,
  isFetching: Boolean,
  fetchStaticFiles: Function,
  search: Function,
  onClickStaticFile: Function,
  modalView: Boolean // optional
}
```

## NotFound

Component for 404 page. react-router renders this component for all non-existing routes.
