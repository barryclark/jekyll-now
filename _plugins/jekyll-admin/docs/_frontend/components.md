---
title: Components
description: Presentational components.
---

## Editor

Component for simple YAML editor [React Ace editor](https://github.com/securingsincity/react-ace).

### PropTypes

```javascript
{
  config: Object, // Jekyll config
  onEditorChange: Function,
  editorChanged: Boolean
}
```

## MarkdownEditor

Component for markdown editor - [SimpleMDE](https://simplemde.com/).

### PropTypes
Can have [all options of SimpleMDE](https://github.com/NextStepWebs/simplemde-markdown-editor#configuration) as prop types.

## Breadcrumbs

Component for generating breadcrumbs.

### PropTypes

```javascript
{
  splat: String, // breadcrumbs links are generated from splat splitting by `/`
  type: String, // Content type prefix for links (pages, collections..)
}
```

## Errors

Component for listing the validation errors

### PropTypes

```javascript
{
  errors: Array // Array of error messages
}
```

## Button

Generic component for button element.

### PropTypes

```javascript
{
  type: String, // type of the button ('save', 'create', 'view', 'upload' etc.)
  active: Boolean, // state of the button
  onClick: Function, // callback function triggered when the button is clicked
  triggered: Boolean, // click state
  block: Boolean, // should the button fill the parent width
  thin: Boolean, // should the button be small
  icon: String, // displays icon if icon name is given
  to: String // links to the given URL. If set, onClick is disabled
}
```

## Dropzone

Component for uploading staticfiles.

### PropTypes

```javascript
{
  files: Array,
  onDrop: Function,
  onClickDelete: Function,
  onClickItem: Function,
}
```

## FilePreview

Component for previewing the uploaded file. It renders an image or a div according to
the given file.

### PropTypes

```javascript
{
  file: File, // https://developer.mozilla.org/en-US/docs/Web/API/File
  onClickDelete: Function
}
```

## Splitter

Horizontal line for splitting views

## Form

### Checkbox

Checkbox component

### PropTypes

```javascript
{
  text: String,
  checked: Boolean,
  onChange: Function
}
```

## InputPath

Editable path component for edit views

### PropTypes

```javascript
{
  path: String, // File path
  type: String, // Content type for input placeholders
  onChange: Function // triggered when the path changes
}
```

### InputSearch

Component for searching in list views

### PropTypes

```javascript
{
  search: Function, // callback function triggered when enter key is pressed
  searchBy: String // search term
}
```

### InputTitle

Editable title component for edit views

### PropTypes

```javascript
{
  title: String,
  onChange: Function
}
```

## Metadata

Set of components for handling documents' front matters (metafields).

### MetaField

Contains root attributes of the metadata.

### MetaSimple

Leaf component for metadata that contains a simple input, date picker or staticfile
picker depending on the field's key.
Special keys for additional functionalities are `date`, `file` and `image`.

### MetaArray

Contains sortable array items.

### MetaArrayItem

Convertible array item. Can be MetaArray, MetaObject or MetaSimple.

### MetaObject

Contains object items which allows entering key-value fields.

### MetaObjectItem

Convertible object item. Can be MetaArray, MetaObject or MetaSimple.

### MetaButtons

Contains `convert` and `delete` buttons and sort handle. Dynamically shows the possible
conversion types.
