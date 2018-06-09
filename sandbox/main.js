/* Spec:

Style page with input defaults first.
Load those into Storage
Changing them updates the DOM and Local Storage, which is loaded next time

Options:
    - Background colour
    - Page title
    - Font style
*/

// Reference to inputs
const titleInput = document.getElementById('js-title');
const colorInput = document.getElementById('js-color');
const fontInput = document.getElementById('js-font');
const colorTip = document.getElementById('js-color-tip');

// Check for support 
if( storageAvailable('localStorage') ) {
    console.log('its here');
    
    // New visitors by testing for a key in Storage
    if(!localStorage['color']){
        populateStorage();
        console.log('not avail');
    } else {
        setStyles();
    } 
}

function populateStorage(){
    localStorage.setItem('color', colorInput.value )
    localStorage.setItem('title', titleInput.value )
    localStorage.setItem('font', fontInput.value )
    setStyles();
}

// Already customised. Load 'em up.
function setStyles() {
    const currtitle = localStorage.getItem('title');
    const currFont = localStorage.getItem('font');
    const currColor = localStorage.getItem('color');

    // Set styles on DOM
    document.title = currtitle;
    document.getElementById('js-intro').style.fontFamily = currFont;
    document.body.style.backgroundColor = currColor;

    // Set input presets
    titleInput.value = currtitle;
    fontInput.value = currFont;
    colorInput.value = currColor;
    colorTip.innerHTML = currColor;
}


 // event listeners on inputs 
fontInput.onchange = populateStorage;
titleInput.onchange = populateStorage;
colorInput.onchange = populateStorage;


// Check for support function from MDN
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API

function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
    }
}