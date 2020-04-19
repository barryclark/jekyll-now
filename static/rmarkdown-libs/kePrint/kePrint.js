$(document).ready(function(){
    if (typeof $('[data-toggle="tooltip"]').tooltip === 'function') {
        $('[data-toggle="tooltip"]').tooltip();
    }
    if ($('[data-toggle="popover"]').popover === 'function') {
        $('[data-toggle="popover"]').popover();
    }
});
