// Mock `window.confirm()` to always return `true`
window.confirm = jest.fn(() => true);

// Return an empty string or other mock path to emulate the url that
// webpack provides via the file-loader
module.exports = '';
