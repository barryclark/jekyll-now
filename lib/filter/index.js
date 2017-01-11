// Dependencies
var $ = require('jquery');

// Expose `Filter`.
module.exports = Filter;

// Case-insensitive contains()
$.expr[':'].Contains = function(a,i,m){
    return (a.textContent || a.innerText || '').toUpperCase().indexOf(m[3].toUpperCase())>=0;
};

/**
 * Initialize a filterable list.
 */
function Filter(list) {
    this.el = list;
    
    // Filter input
    var form = $('<form>').attr({ 'action':'#' });
    var input = $('<input>').attr({ 'type':'text', 'placeholder':'Filter by keyword' });
    $(form).append(input).prependTo(this.el);
    
    // Filter function
    var self = this;
    $(input).change(function () {
        var filter = $(this).val();
        if(filter) {
            $(self.el).find('a:not(:Contains(' + filter + '))').parent().hide();
            $(self.el).find('a:Contains(' + filter + ')').parent().show();
        } else {
            $(self.el).find('li').show();
        }
        
        // Hide titles when group is empty
        $(self.el).find('ul').each(function () {
            if (!$(this).find('li:visible').length) {
                $(this).prev('h2').hide();
            } else {
                $(this).prev('h2').show();
            }
        });

        return false;
    })
    .keyup( function () { $(this).change(); });
    
    return this;
}