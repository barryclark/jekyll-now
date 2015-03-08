/**
 * All auto suggestion boxes are fucked up or badly written.
 * This is an attempt to create something that doesn't suck...
 *
 * Requires: jQuery
 *
 * Author: Nicolas Bize
 * Date: Feb. 8th 2013
 * Version: 1.3.1
 * Licence: MagicSuggest is licenced under MIT licence (http://www.opensource.org/licenses/mit-license.php)
 */
(function($)
{
    "use strict";
    var MagicSuggest = function(element, options)
    {
        var ms = this;

        /**
         * Initializes the MagicSuggest component
         * @param defaults - see config below
         */
        var defaults = {
            /**********  CONFIGURATION PROPERTIES ************/
            /**
             * @cfg {Boolean} allowFreeEntries
             * <p>Restricts or allows the user to validate typed entries.</p>
             * Defaults to <code>true</code>.
             */
            allowFreeEntries: true,

            /**
             * @cfg {String} cls
             * <p>A custom CSS class to apply to the field's underlying element.</p>
             * Defaults to <code>''</code>.
             */
            cls: '',

            /**
             * @cfg {Array / String / Function} data
             * JSON Data source used to populate the combo box. 3 options are available here:<br/>
             * <p><u>No Data Source (default)</u><br/>
             *    When left null, the combo box will not suggest anything. It can still enable the user to enter
             *    multiple entries if allowFreeEntries is * set to true (default).</p>
             * <p><u>Static Source</u><br/>
             *    You can pass an array of JSON objects, an array of strings or even a single CSV string as the
             *    data source.<br/>For ex. data: [* {id:0,name:"Paris"}, {id: 1, name: "New York"}]<br/>
             *    You can also pass any json object with the results property containing the json array.</p>
             * <p><u>Url</u><br/>
             *     You can pass the url from which the component will fetch its JSON data.<br/>Data will be fetched
             *     using a POST ajax request that will * include the entered text as 'query' parameter. The results
             *     fetched from the server can be: <br/>
             *     - an array of JSON objects (ex: [{id:...,name:...},{...}])<br/>
             *     - a string containing an array of JSON objects ready to be parsed (ex: "[{id:...,name:...},{...}]")<br/>
             *     - a JSON object whose data will be contained in the results property
             *      (ex: {results: [{id:...,name:...},{...}]</p>
             * <p><u>Function</u><br/>
             *     You can pass a function which returns an array of JSON objects  (ex: [{id:...,name:...},{...}])<br/>
             *     The function can return the JSON data or it can use the first argument as function to handle the data.<br/>
             *     Only one (callback function or return value) is needed for the function to succeed.<br/>
             *     See the following example:<br/>
             *     function (response) { var myjson = [{name: 'test', id: 1}]; response(myjson); return myjson; }</p>
             * Defaults to <b>null</b>
             */
            data: null,

            /**
             * @cfg {Object} dataParams
             * <p>Additional parameters to the ajax call</p>
             * Defaults to <code>{}</code>
             */
            dataUrlParams: {},

            /**
             * @cfg {Boolean} disabled
             * <p>Start the component in a disabled state.</p>
             * Defaults to <code>false</code>.
             */
            disabled: false,

            /**
             * @cfg {String} displayField
             * <p>name of JSON object property displayed in the combo list</p>
             * Defaults to <code>name</code>.
             */
            displayField: 'name',

            /**
             * @cfg {Boolean} editable
             * <p>Set to false if you only want mouse interaction. In that case the combo will
             * automatically expand on focus.</p>
             * Defaults to <code>true</code>.
             */
            editable: true,

            /**
             * @cfg {String} emptyText
             * <p>The default placeholder text when nothing has been entered</p>
             * Defaults to <code>'Type or click here'</code> or just <code>'Click here'</code> if not editable.
             */
            emptyText: function() {
                return cfg.editable ? 'Type or click here' : 'Click here';
            },

            /**
             * @cfg {String} emptyTextCls
             * <p>A custom CSS class to style the empty text</p>
             * Defaults to <code>'ms-empty-text'</code>.
             */
            emptyTextCls: 'ms-empty-text',

            /**
             * @cfg {Boolean} expanded
             * <p>Set starting state for combo.</p>
             * Defaults to <code>false</code>.
             */
            expanded: false,

            /**
             * @cfg {Boolean} expandOnFocus
             * <p>Automatically expands combo on focus.</p>
             * Defaults to <code>false</code>.
             */
            expandOnFocus: function() {
                return cfg.editable ? false : true;
            },

            /**
             * @cfg {String} groupBy
             * <p>JSON property by which the list should be grouped</p>
             * Defaults to null
             */
            groupBy: null,

            /**
             * @cfg {Boolean} hideTrigger
             * <p>Set to true to hide the trigger on the right</p>
             * Defaults to <code>false</code>.
             */
            hideTrigger: false,

            /**
             * @cfg {Boolean} highlight
             * <p>Set to true to highlight search input within displayed suggestions</p>
             * Defaults to <code>true</code>.
             */
            highlight: true,

            /**
             * @cfg {String} id
             * <p>A custom ID for this component</p>
             * Defaults to 'ms-ctn-{n}' with n positive integer
             */
            id: function() {
                return 'ms-ctn-' + $('div[id^="ms-ctn"]').length;
            },

            /**
             * @cfg {String} infoMsgCls
             * <p>A class that is added to the info message appearing on the top-right part of the component</p>
             * Defaults to ''
             */
            infoMsgCls: '',

            /**
             * @cfg {Object} inputCfg
             * <p>Additional parameters passed out to the INPUT tag. Enables usage of AngularJS's custom tags for ex.</p>
             * Defaults to <code>{}</code>
             */
            inputCfg: {},

            /**
             * @cfg {String} invalidCls
             * <p>The class that is applied to show that the field is invalid</p>
             * Defaults to ms-ctn-invalid
             */
            invalidCls: 'ms-ctn-invalid',

            /**
             * @cfg {Boolean} matchCase
             * <p>Set to true to filter data results according to case. Useless if the data is fetched remotely</p>
             * Defaults to <code>false</code>.
             */
            matchCase: false,

            /**
             * @cfg {Integer} maxDropHeight (in px)
             * <p>Once expanded, the combo's height will take as much room as the # of available results.
             *    In case there are too many results displayed, this will fix the drop down height.</p>
             * Defaults to 290 px.
             */
            maxDropHeight: 290,

            /**
             * @cfg {Integer} maxEntryLength
             * <p>Defines how long the user free entry can be. Set to null for no limit.</p>
             * Defaults to null.
             */
            maxEntryLength: null,

            /**
             * @cfg {String} maxEntryRenderer
             * <p>A function that defines the helper text when the max entry length has been surpassed.</p>
             * Defaults to <code>function(v){return 'Please reduce your entry by ' + v + ' character' + (v > 1 ? 's':'');}</code>
             */
            maxEntryRenderer: function(v) {
                return 'Please reduce your entry by ' + v + ' character' + (v > 1 ? 's':'');
            },

            /**
             * @cfg {Integer} maxSuggestions
             * <p>The maximum number of results displayed in the combo drop down at once.</p>
             * Defaults to null.
             */
            maxSuggestions: null,

            /**
             * @cfg {Integer} maxSelection
             * <p>The maximum number of items the user can select if multiple selection is allowed.
             *    Set to null to remove the limit.</p>
             * Defaults to 10.
             */
            maxSelection: 10,

            /**
             * @cfg {Function} maxSelectionRenderer
             * <p>A function that defines the helper text when the max selection amount has been reached. The function has a single
             *    parameter which is the number of selected elements.</p>
             * Defaults to <code>function(v){return 'You cannot choose more than ' + v + ' item' + (v > 1 ? 's':'');}</code>
             */
            maxSelectionRenderer: function(v) {
                return 'You cannot choose more than ' + v + ' item' + (v > 1 ? 's':'');
            },

            /**
             * @cfg {String} method
             * <p>The method used by the ajax request.</p>
             * Defaults to 'POST'
             */
            method: 'POST',

            /**
             * @cfg {Integer} minChars
             * <p>The minimum number of characters the user must type before the combo expands and offers suggestions.
             * Defaults to <code>0</code>.
             */
            minChars: 0,

            /**
             * @cfg {Function} minCharsRenderer
             * <p>A function that defines the helper text when not enough letters are set. The function has a single
             *    parameter which is the difference between the required amount of letters and the current one.</p>
             * Defaults to <code>function(v){return 'Please type ' + v + ' more character' + (v > 1 ? 's':'');}</code>
             */
            minCharsRenderer: function(v) {
                return 'Please type ' + v + ' more character' + (v > 1 ? 's':'');
            },

            /**
             * @cfg {String} name
             * <p>The name used as a form element.</p>
             * Defaults to 'null'
             */
            name: null,

            /**
             * @cfg {String} noSuggestionText
             * <p>The text displayed when there are no suggestions.</p>
             * Defaults to 'No suggestions"
             */
            noSuggestionText: 'No suggestions',

            /**
             * @cfg {Boolean} preselectSingleSuggestion
             * <p>If a single suggestion comes out, it is preselected.</p>
             * Defaults to <code>true</code>.
             */
            preselectSingleSuggestion: true,

            /**
             * @cfg (function) renderer
             * <p>A function used to define how the items will be presented in the combo</p>
             * Defaults to <code>null</code>.
             */
            renderer: null,

            /**
             * @cfg {Boolean} required
             * <p>Whether or not this field should be required</p>
             * Defaults to false
             */
            required: false,

            /**
             * @cfg {Boolean} resultAsString
             * <p>Set to true to render selection as comma separated string</p>
             * Defaults to <code>false</code>.
             */
            resultAsString: false,

            /**
             * @cfg {String} resultsField
             * <p>Name of JSON object property that represents the list of suggested objets</p>
             * Defaults to <code>results</code>
             */
            resultsField: 'results',

            /**
             * @cfg {String} selectionCls
             * <p>A custom CSS class to add to a selected item</p>
             * Defaults to <code>''</code>.
             */
            selectionCls: '',

            /**
             * @cfg {String} selectionPosition
             * <p>Where the selected items will be displayed. Only 'right', 'bottom' and 'inner' are valid values</p>
             * Defaults to <code>'inner'</code>, meaning the selected items will appear within the input box itself.
             */
            selectionPosition: 'inner',

            /**
             * @cfg (function) selectionRenderer
             * <p>A function used to define how the items will be presented in the tag list</p>
             * Defaults to <code>null</code>.
             */
            selectionRenderer: null,

            /**
             * @cfg {Boolean} selectionStacked
             * <p>Set to true to stack the selectioned items when positioned on the bottom
             *    Requires the selectionPosition to be set to 'bottom'</p>
             * Defaults to <code>false</code>.
             */
            selectionStacked: false,

            /**
             * @cfg {String} sortDir
             * <p>Direction used for sorting. Only 'asc' and 'desc' are valid values</p>
             * Defaults to <code>'asc'</code>.
             */
            sortDir: 'asc',

            /**
             * @cfg {String} sortOrder
             * <p>name of JSON object property for local result sorting.
             *    Leave null if you do not wish the results to be ordered or if they are already ordered remotely.</p>
             *
             * Defaults to <code>null</code>.
             */
            sortOrder: null,

            /**
             * @cfg {Boolean} strictSuggest
             * <p>If set to true, suggestions will have to start by user input (and not simply contain it as a substring)</p>
             * Defaults to <code>false</code>.
             */
            strictSuggest: false,

            /**
             * @cfg {String} style
             * <p>Custom style added to the component container.</p>
             *
             * Defaults to <code>''</code>.
             */
            style: '',

            /**
             * @cfg {Boolean} toggleOnClick
             * <p>If set to true, the combo will expand / collapse when clicked upon</p>
             * Defaults to <code>false</code>.
             */
            toggleOnClick: false,


            /**
             * @cfg {Integer} typeDelay
             * <p>Amount (in ms) between keyboard registers.</p>
             *
             * Defaults to <code>400</code>
             */
            typeDelay: 400,

            /**
             * @cfg {Boolean} useTabKey
             * <p>If set to true, tab won't blur the component but will be registered as the ENTER key</p>
             * Defaults to <code>false</code>.
             */
            useTabKey: false,

            /**
             * @cfg {Boolean} useCommaKey
             * <p>If set to true, using comma will validate the user's choice</p>
             * Defaults to <code>true</code>.
             */
            useCommaKey: true,


            /**
             * @cfg {Boolean} useZebraStyle
             * <p>Determines whether or not the results will be displayed with a zebra table style</p>
             * Defaults to <code>true</code>.
             */
            useZebraStyle: true,

            /**
             * @cfg {String/Object/Array} value
             * <p>initial value for the field</p>
             * Defaults to <code>null</code>.
             */
            value: null,

            /**
             * @cfg {String} valueField
             * <p>name of JSON object property that represents its underlying value</p>
             * Defaults to <code>id</code>.
             */
            valueField: 'id',

            /**
             * @cfg {Integer} width (in px)
             * <p>Width of the component</p>
             * Defaults to underlying element width.
             */
            width: function() {
                return $(this).width();
            }
        };

        var conf = $.extend({},options);
        var cfg = $.extend(true, {}, defaults, conf);

        // some init stuff
        if ($.isFunction(cfg.emptyText)) {
            cfg.emptyText = cfg.emptyText.call(this);
        }
        if ($.isFunction(cfg.expandOnFocus)) {
            cfg.expandOnFocus = cfg.expandOnFocus.call(this);
        }
        if ($.isFunction(cfg.id)) {
            cfg.id = cfg.id.call(this);
        }

        /**********  PUBLIC METHODS ************/
        /**
         * Add one or multiple json items to the current selection
         * @param items - json object or array of json objects
         * @param isSilent - (optional) set to true to suppress 'selectionchange' event from being triggered
         */
        this.addToSelection = function(items, isSilent)
        {
            if (!cfg.maxSelection || _selection.length < cfg.maxSelection) {
                if (!$.isArray(items)) {
                    items = [items];
                }
                var valuechanged = false;
                $.each(items, function(index, json) {
                    if ($.inArray(json[cfg.valueField], ms.getValue()) === -1) {
                        _selection.push(json);
                        valuechanged = true;
                    }
                });
                if(valuechanged === true) {
                    self._renderSelection();
                    this.empty();
                    if (isSilent !== true) {
                        $(this).trigger('selectionchange', [this, this.getSelectedItems()]);
                    }
                }
            }
        };

        /**
         * Clears the current selection
         * @param isSilent - (optional) set to true to suppress 'selectionchange' event from being triggered
         */
        this.clear = function(isSilent)
        {
            this.removeFromSelection(_selection.slice(0), isSilent); // clone array to avoid concurrency issues
        };

        /**
         * Collapse the drop down part of the combo
         */
        this.collapse = function()
        {
            if (cfg.expanded === true) {
                this.combobox.detach();
                cfg.expanded = false;
                $(this).trigger('collapse', [this]);
            }
        };

        /**
         * Set the component in a disabled state.
         */
        this.disable = function()
        {
            this.container.addClass('ms-ctn-disabled');
            cfg.disabled = true;
            ms.input.attr('disabled', true);
        };

        /**
         * Empties out the combo user text
         */
        this.empty = function(){
            this.input.removeClass(cfg.emptyTextCls);
            this.input.val('');
        };

        /**
         * Set the component in a enable state.
         */
        this.enable = function()
        {
            this.container.removeClass('ms-ctn-disabled');
            cfg.disabled = false;
            ms.input.attr('disabled', false);
        };

        /**
         * Expand the drop drown part of the combo.
         */
        this.expand = function()
        {
            if (!cfg.expanded && (this.input.val().length >= cfg.minChars || this.combobox.children().size() > 0)) {
                this.combobox.appendTo(this.container);
                self._processSuggestions();
                cfg.expanded = true;
                $(this).trigger('expand', [this]);
            }
        };

        /**
         * Retrieve component enabled status
         */
        this.isDisabled = function()
        {
            return cfg.disabled;
        };

        /**
         * Checks whether the field is valid or not
         * @return {boolean}
         */
        this.isValid = function()
        {
            return cfg.required === false || _selection.length > 0;
        };

        /**
         * Gets the data params for current ajax request
         */
        this.getDataUrlParams = function()
        {
            return cfg.dataUrlParams;
        };

        /**
         * Gets the name given to the form input
         */
        this.getName = function()
        {
            return cfg.name;
        };

        /**
         * Retrieve an array of selected json objects
         * @return {Array}
         */
        this.getSelectedItems = function()
        {
            return _selection;
        };

        /**
         * Retrieve the current text entered by the user
         */
        this.getRawValue = function(){
            return ms.input.val() !== cfg.emptyText ? ms.input.val() : '';
        };

        /**
         * Retrieve an array of selected values
         */
        this.getValue = function()
        {
            return $.map(_selection, function(o) {
                return o[cfg.valueField];
            });
        };

        /**
         * Remove one or multiples json items from the current selection
         * @param items - json object or array of json objects
         * @param isSilent - (optional) set to true to suppress 'selectionchange' event from being triggered
         */
        this.removeFromSelection = function(items, isSilent)
        {
            if (!$.isArray(items)) {
                items = [items];
            }
            var valuechanged = false;
            $.each(items, function(index, json) {
                var i = $.inArray(json[cfg.valueField], ms.getValue());
                if (i > -1) {
                    _selection.splice(i, 1);
                    valuechanged = true;
                }
            });
            if (valuechanged === true) {
                self._renderSelection();
                if(isSilent !== true){
                    $(this).trigger('selectionchange', [this, this.getSelectedItems()]);
                }
                if(cfg.expandOnFocus){
                    ms.expand();
                }
                if(cfg.expanded) {
                    self._processSuggestions();
                }
            }
        };

        /**
         * Set up some combo data after it has been rendered
         * @param data
         */
        this.setData = function(data){
            cfg.data = data;
            self._processSuggestions();
        };

        /**
         * Sets the name for the input field so it can be fetched in the form
         * @param name
         */
        this.setName = function(name){
            cfg.name = name;
            if(ms._valueContainer){
                ms._valueContainer.name = name;
            }
        };

        /**
         * Sets a value for the combo box. Value must be a value or an array of value with data type matching valueField one.
         * @param data
         */
        this.setValue = function(data)
        {
            var values = data, items = [];
            if(!$.isArray(data)){
                if(typeof(data) === 'string'){
                    if(data.indexOf('[') > -1){
                        values = eval(data);
                    } else if(data.indexOf(',') > -1){
                        values = data.split(',');
                    }
                } else {
                    values = [data];
                }
            }

            $.each(_cbData, function(index, obj) {
                if($.inArray(obj[cfg.valueField], values) > -1) {
                    items.push(obj);
                }
            });
            if(items.length > 0) {
                this.addToSelection(items);
            }
        };

        /**
         * Sets data params for subsequent ajax requests
         * @param params
         */
        this.setDataUrlParams = function(params)
        {
            cfg.dataUrlParams = $.extend({},params);
        };

        /**********  PRIVATE ************/
        var _selection = [],      // selected objects
            _comboItemHeight = 0, // height for each combo item.
            _timer,
            _hasFocus = false,
            _groups = null,
            _cbData = [],
            _ctrlDown = false;

        var self = {

            /**
             * Empties the result container and refills it with the array of json results in input
             * @private
             */
            _displaySuggestions: function(data) {
                ms.combobox.empty();

                var resHeight = 0, // total height taken by displayed results.
                    nbGroups = 0;

                if(_groups === null) {
                    self._renderComboItems(data);
                    resHeight = _comboItemHeight * data.length;
                }
                else {
                    for(var grpName in _groups) {
                        nbGroups += 1;
                        $('<div/>', {
                            'class': 'ms-res-group',
                            html: grpName
                        }).appendTo(ms.combobox);
                        self._renderComboItems(_groups[grpName].items, true);
                    }
                    resHeight = _comboItemHeight * (data.length + nbGroups);
                }

                if(resHeight < ms.combobox.height() || resHeight <= cfg.maxDropHeight) {
                    ms.combobox.height(resHeight);
                }
                else if(resHeight >= ms.combobox.height() && resHeight > cfg.maxDropHeight) {
                    ms.combobox.height(cfg.maxDropHeight);
                }

                if(data.length === 1 && cfg.preselectSingleSuggestion === true) {
                    ms.combobox.children().filter(':last').addClass('ms-res-item-active');
                }

                if(data.length === 0 && ms.getRawValue() !== "") {
                    self._updateHelper(cfg.noSuggestionText);
                    ms.collapse();
                }
            },

            /**
             * Returns an array of json objects from an array of strings.
             * @private
             */
            _getEntriesFromStringArray: function(data) {
                var json = [];
                $.each(data, function(index, s) {
                    var entry = {};
                    entry[cfg.displayField] = entry[cfg.valueField] = $.trim(s);
                    json.push(entry);
                });
                return json;
            },

            /**
             * Replaces html with highlighted html according to case
             * @param html
             * @private
             */
            _highlightSuggestion: function(html) {
                var q = ms.input.val() !== cfg.emptyText ? ms.input.val() : '';
                if(q.length === 0) {
                    return html; // nothing entered as input
                }

                if(cfg.matchCase === true) {
                    html = html.replace(new RegExp('(' + q + ')(?!([^<]+)?>)','g'), '<em>$1</em>');
                }
                else {
                    html = html.replace(new RegExp('(' + q + ')(?!([^<]+)?>)','gi'), '<em>$1</em>');
                }
                return html;
            },

            /**
             * Moves the selected cursor amongst the list item
             * @param dir - 'up' or 'down'
             * @private
             */
            _moveSelectedRow: function(dir) {
                if(!cfg.expanded) {
                    ms.expand();
                }
                var list, start, active, scrollPos;
                list = ms.combobox.find(".ms-res-item");
                if(dir === 'down') {
                    start = list.eq(0);
                }
                else {
                    start = list.filter(':last');
                }
                active = ms.combobox.find('.ms-res-item-active:first');
                if(active.length > 0) {
                    if(dir === 'down') {
                        start = active.nextAll('.ms-res-item').first();
                        if(start.length === 0) {
                            start = list.eq(0);
                        }
                        scrollPos = ms.combobox.scrollTop();
                        ms.combobox.scrollTop(0);
                        if(start[0].offsetTop + start.outerHeight() > ms.combobox.height()) {
                            ms.combobox.scrollTop(scrollPos + _comboItemHeight);
                        }
                    }
                    else {
                        start = active.prevAll('.ms-res-item').first();
                        if(start.length === 0) {
                            start = list.filter(':last');
                            ms.combobox.scrollTop(_comboItemHeight * list.length);
                        }
                        if(start[0].offsetTop < ms.combobox.scrollTop()) {
                            ms.combobox.scrollTop(ms.combobox.scrollTop() - _comboItemHeight);
                        }
                    }
                }
                list.removeClass("ms-res-item-active");
                start.addClass("ms-res-item-active");
            },

            /**
             * According to given data and query, sort and add suggestions in their container
             * @private
             */
            _processSuggestions: function(source) {
                var json = null, data = source || cfg.data;
                if(data !== null) {
                    if(typeof(data) === 'function'){
                        data = data.call(ms);
                    }
                    if(typeof(data) === 'string' && data.indexOf(',') < 0) { // get results from ajax
                        $(ms).trigger('beforeload', [ms]);
                        var params = $.extend({query: ms.input.val()}, cfg.dataUrlParams);
                        $.ajax({
                            type: cfg.method,
                            url: data,
                            data: params,
                            success: function(asyncData){
                                json = typeof(asyncData) === 'string' ? JSON.parse(asyncData) : asyncData;
                                self._processSuggestions(json);
                                $(ms).trigger('load', [ms, json]);
                            },
                            error: function(){
                                throw("Could not reach server");
                            }
                        });
                        return;
                    } else if(typeof(data) === 'string' && data.indexOf(',') > -1) { // results from csv string
                        _cbData = self._getEntriesFromStringArray(data.split(','));
                    } else { // results from local array
                        if(data.length > 0 && typeof(data[0]) === 'string') { // results from array of strings
                            _cbData = self._getEntriesFromStringArray(data);
                        } else { // regular json array or json object with results property
                            _cbData = data[cfg.resultsField] || data;
                        }
                    }
                    self._displaySuggestions(self._sortAndTrim(_cbData));

                }
            },

            /**
             * Render the component to the given input DOM element
             * @private
             */
            _render: function(el) {
                $(ms).trigger('beforerender', [ms]);
                var w = $.isFunction(cfg.width) ? cfg.width.call(el) : cfg.width;
                // holds the main div, will relay the focus events to the contained input element.
                ms.container = $('<div/>', {
                    id: cfg.id,
                    'class': 'ms-ctn ' + cfg.cls +
                        (cfg.disabled === true ? ' ms-ctn-disabled' : '') +
                        (cfg.editable === true ? '' : ' ms-ctn-readonly'),
                    style: cfg.style
                }).width(w);
                ms.container.focus($.proxy(handlers._onFocus, this));
                ms.container.blur($.proxy(handlers._onBlur, this));
                ms.container.keydown($.proxy(handlers._onKeyDown, this));
                ms.container.keyup($.proxy(handlers._onKeyUp, this));

                // holds the input field
                ms.input = $('<input/>', $.extend({
                    id: 'ms-input-' + $('input[id^="ms-input"]').length,
                    type: 'text',
                    'class': cfg.emptyTextCls + (cfg.editable === true ? '' : ' ms-input-readonly'),
                    value: cfg.emptyText,
                    readonly: !cfg.editable,
                    disabled: cfg.disabled
                }, cfg.inputCfg)).width(w - (cfg.hideTrigger ? 16 : 42));

                ms.input.focus($.proxy(handlers._onInputFocus, this));
                ms.input.click($.proxy(handlers._onInputClick, this));

                // holds the trigger on the right side
                if(cfg.hideTrigger === false) {
                    ms.trigger = $('<div/>', {
                        id: 'ms-trigger-' + $('div[id^="ms-trigger"]').length,
                        'class': 'ms-trigger',
                        html: '<div class="ms-trigger-ico"></div>'
                    });
                    ms.trigger.click($.proxy(handlers._onTriggerClick, this));
                    ms.container.append(ms.trigger);
                }

                // holds the suggestions. will always be placed on focus
                ms.combobox = $('<div/>', {
                    id: 'ms-res-ctn-' + $('div[id^="ms-res-ctn"]').length,
                    'class': 'ms-res-ctn '
                }).width(w).height(cfg.maxDropHeight);

                // bind the onclick and mouseover using delegated events (needs jQuery >= 1.7)
                ms.combobox.on('click', 'div.ms-res-item', $.proxy(handlers._onComboItemSelected, this));
                ms.combobox.on('mouseover', 'div.ms-res-item', $.proxy(handlers._onComboItemMouseOver, this));

                ms.selectionContainer = $('<div/>', {
                    id: 'ms-sel-ctn-' +  $('div[id^="ms-sel-ctn"]').length,
                    'class': 'ms-sel-ctn'
                });
                ms.selectionContainer.click($.proxy(handlers._onFocus, this));

                if(cfg.selectionPosition === 'inner') {
                    ms.selectionContainer.append(ms.input);
                }
                else {
                    ms.container.append(ms.input);
                }

                ms.helper = $('<div/>', {
                    'class': 'ms-helper ' + cfg.infoMsgCls
                });
                self._updateHelper();
                ms.container.append(ms.helper);


                // Render the whole thing
                $(el).replaceWith(ms.container);

                switch(cfg.selectionPosition) {
                    case 'bottom':
                        ms.selectionContainer.insertAfter(ms.container);
                        if(cfg.selectionStacked === true) {
                            ms.selectionContainer.width(ms.container.width());
                            ms.selectionContainer.addClass('ms-stacked');
                        }
                        break;
                    case 'right':
                        ms.selectionContainer.insertAfter(ms.container);
                        ms.container.css('float', 'left');
                        break;
                    default:
                        ms.container.append(ms.selectionContainer);
                        break;
                }

                self._processSuggestions();
                if(cfg.value !== null) {
                    ms.setValue(cfg.value);
                    self._renderSelection();
                }

                $(ms).trigger('afterrender', [ms]);
                $("body").click(function(e) {
                    if(ms.container.hasClass('ms-ctn-bootstrap-focus') &&
                        ms.container.has(e.target).length === 0 &&
                        e.target.className.indexOf('ms-res-item') < 0 &&
                        e.target.className.indexOf('ms-close-btn') < 0 &&
                        ms.container[0] !== e.target) {
                        handlers._onBlur();
                    }
                });

                if(cfg.expanded === true) {
                    cfg.expanded = false;
                    ms.expand();
                }
            },

            _renderComboItems: function(items, isGrouped) {
                var ref = this, html = '';
                $.each(items, function(index, value) {
                    var displayed = cfg.renderer !== null ? cfg.renderer.call(ref, value) : value[cfg.displayField];
                    var resultItemEl = $('<div/>', {
                        'class': 'ms-res-item ' + (isGrouped ? 'ms-res-item-grouped ':'') +
                            (index % 2 === 1 && cfg.useZebraStyle === true ? 'ms-res-odd' : ''),
                        html: cfg.highlight === true ? self._highlightSuggestion(displayed) : displayed,
                        'data-json': JSON.stringify(value)
                    });
                    resultItemEl.click($.proxy(handlers._onComboItemSelected, ref));
                    resultItemEl.mouseover($.proxy(handlers._onComboItemMouseOver, ref));
                    html += $('<div/>').append(resultItemEl).html();
                });
                ms.combobox.append(html);
                _comboItemHeight = ms.combobox.find('.ms-res-item:first').outerHeight();
            },

            /**
             * Renders the selected items into their container.
             * @private
             */
            _renderSelection: function() {
                var ref = this, w = 0, inputOffset = 0, items = [],
                    asText = cfg.resultAsString === true && !_hasFocus;

                ms.selectionContainer.find('.ms-sel-item').remove();
                if(ms._valueContainer !== undefined) {
                    ms._valueContainer.remove();
                }

                $.each(_selection, function(index, value){

                    var selectedItemEl, delItemEl,
                        selectedItemHtml = cfg.selectionRenderer !== null ? cfg.selectionRenderer.call(ref, value) : value[cfg.displayField];
                    // tag representing selected value
                    if(asText === true) {
                        selectedItemEl = $('<div/>', {
                            'class': 'ms-sel-item ms-sel-text ' + cfg.selectionCls,
                            html: selectedItemHtml + (index === (_selection.length - 1) ? '' : ',')
                        }).data('json', value);
                    }
                    else {
                        selectedItemEl = $('<div/>', {
                            'class': 'ms-sel-item ' + cfg.selectionCls,
                            html: selectedItemHtml
                        }).data('json', value);

                        if(cfg.disabled === false){
                            // small cross img
                            delItemEl = $('<span/>', {
                                'class': 'ms-close-btn'
                            }).data('json', value).appendTo(selectedItemEl);

                            delItemEl.click($.proxy(handlers._onTagTriggerClick, ref));
                        }
                    }

                    items.push(selectedItemEl);
                });

                ms.selectionContainer.prepend(items);
                ms._valueContainer = $('<input/>', {
                    type: 'hidden',
                    name: cfg.name,
                    value: JSON.stringify(ms.getValue())
                });
                ms._valueContainer.appendTo(ms.selectionContainer);

                if(cfg.selectionPosition === 'inner') {
                    ms.input.width(0);
                    inputOffset = ms.input.offset().left - ms.selectionContainer.offset().left;
                    w = ms.container.width() - inputOffset - 42;
                    ms.input.width(w);
                    ms.container.height(ms.selectionContainer.height());
                }

                if(_selection.length === cfg.maxSelection){
                    self._updateHelper(cfg.maxSelectionRenderer.call(this, _selection.length));
                } else {
                    ms.helper.hide();
                }
            },

            /**
             * Select an item either through keyboard or mouse
             * @param item
             * @private
             */
            _selectItem: function(item) {
                if(cfg.maxSelection === 1){
                    _selection = [];
                }
                ms.addToSelection(item.data('json'));
                item.removeClass('ms-res-item-active');
                if(cfg.expandOnFocus === false || _selection.length === cfg.maxSelection){
                    ms.collapse();
                }
                if(!_hasFocus){
                    ms.input.focus();
                } else if(_hasFocus && (cfg.expandOnFocus || _ctrlDown)){
                    self._processSuggestions();
                    if(_ctrlDown){
                        ms.expand();
                    }
                }
            },

            /**
             * Sorts the results and cut them down to max # of displayed results at once
             * @private
             */
            _sortAndTrim: function(data) {
                var q = ms.getRawValue(),
                    filtered = [],
                    newSuggestions = [],
                    selectedValues = ms.getValue();
                // filter the data according to given input
                if(q.length > 0) {
                    $.each(data, function(index, obj) {
                        var name = obj[cfg.displayField];
                        if((cfg.matchCase === true && name.indexOf(q) > -1) ||
                            (cfg.matchCase === false && name.toLowerCase().indexOf(q.toLowerCase()) > -1)) {
                            if(cfg.strictSuggest === false || name.toLowerCase().indexOf(q.toLowerCase()) === 0) {
                                filtered.push(obj);
                            }
                        }
                    });
                }
                else {
                    filtered = data;
                }
                // take out the ones that have already been selected
                $.each(filtered, function(index, obj) {
                    if($.inArray(obj[cfg.valueField], selectedValues) === -1) {
                        newSuggestions.push(obj);
                    }
                });
                // sort the data
                if(cfg.sortOrder !== null) {
                    newSuggestions.sort(function(a,b) {
                        if(a[cfg.sortOrder] < b[cfg.sortOrder]) {
                            return cfg.sortDir === 'asc' ? -1 : 1;
                        }
                        if(a[cfg.sortOrder] > b[cfg.sortOrder]) {
                            return cfg.sortDir === 'asc' ? 1 : -1;
                        }
                        return 0;
                    });
                }
                // trim it down
                if(cfg.maxSuggestions && cfg.maxSuggestions > 0) {
                    newSuggestions = newSuggestions.slice(0, cfg.maxSuggestions);
                }
                // build groups
                if(cfg.groupBy !== null) {
                    _groups = {};
                    $.each(newSuggestions, function(index, value) {
                        if(_groups[value[cfg.groupBy]] === undefined) {
                            _groups[value[cfg.groupBy]] = {title: value[cfg.groupBy], items: [value]};
                        }
                        else {
                            _groups[value[cfg.groupBy]].items.push(value);
                        }
                    });
                }
                return newSuggestions;
            },

            /**
             * Update the helper text
             * @private
             */
            _updateHelper: function(html) {
                ms.helper.html(html);
                if(!ms.helper.is(":visible")) {
                    ms.helper.fadeIn();
                }
            }
        };

        var handlers = {
            /**
             * Triggered when blurring out of the component
             * @private
             */
            _onBlur: function() {
                ms.container.removeClass('ms-ctn-bootstrap-focus');
                ms.collapse();
                _hasFocus = false;
                if(ms.getRawValue() !== '' && cfg.allowFreeEntries === true){
                    var obj = {};
                    obj[cfg.displayField] = obj[cfg.valueField] = ms.getRawValue();
                    ms.addToSelection(obj);
                }
                self._renderSelection();

                if(ms.isValid() === false) {
                    ms.container.addClass('ms-ctn-invalid');
                }

                if(ms.input.val() === '' && _selection.length === 0) {
                    ms.input.addClass(cfg.emptyTextCls);
                    ms.input.val(cfg.emptyText);
                }
                else if(ms.input.val() !== '' && cfg.allowFreeEntries === false) {
                    ms.empty();
                    self._updateHelper('');
                }

                if(ms.input.is(":focus")) {
                    $(ms).trigger('blur', [ms]);
                }
            },

            /**
             * Triggered when hovering an element in the combo
             * @param e
             * @private
             */
            _onComboItemMouseOver: function(e) {
                ms.combobox.children().removeClass('ms-res-item-active');
                $(e.currentTarget).addClass('ms-res-item-active');
            },

            /**
             * Triggered when an item is chosen from the list
             * @param e
             * @private
             */
            _onComboItemSelected: function(e) {
                self._selectItem($(e.currentTarget));
            },

            /**
             * Triggered when focusing on the container div. Will focus on the input field instead.
             * @private
             */
            _onFocus: function() {
                ms.input.focus();
            },

            /**
             * Triggered when clicking on the input text field
             * @private
             */
            _onInputClick: function(){
                if (ms.isDisabled() === false && _hasFocus) {
                    if (cfg.toggleOnClick === true) {
                        if (cfg.expanded){
                            ms.collapse();
                        } else {
                            ms.expand();
                        }
                    }
                }
            },

            /**
             * Triggered when focusing on the input text field.
             * @private
             */
            _onInputFocus: function() {
                if(ms.isDisabled() === false && !_hasFocus) {
                    _hasFocus = true;
                    ms.container.addClass('ms-ctn-bootstrap-focus');
                    ms.container.removeClass(cfg.invalidCls);

                    if(ms.input.val() === cfg.emptyText) {
                        ms.empty();
                    }

                    var curLength = ms.getRawValue().length;
                    if(cfg.expandOnFocus === true){
                        ms.expand();
                    }

                    if(_selection.length === cfg.maxSelection) {
                        self._updateHelper(cfg.maxSelectionRenderer.call(this, _selection.length));
                    } else if(curLength < cfg.minChars) {
                        self._updateHelper(cfg.minCharsRenderer.call(this, cfg.minChars - curLength));
                    }

                    self._renderSelection();
                    $(ms).trigger('focus', [ms]);
                }
            },

            /**
             * Triggered when the user presses a key while the component has focus
             * This is where we want to handle all keys that don't require the user input field
             * since it hasn't registered the key hit yet
             * @param e keyEvent
             * @private
             */
            _onKeyDown: function(e) {
                // check how tab should be handled
                var active = ms.combobox.find('.ms-res-item-active:first'),
                    freeInput = ms.input.val() !== cfg.emptyText ? ms.input.val() : '';
                $(ms).trigger('keydown', [ms, e]);

                if(e.keyCode === 9 && (cfg.useTabKey === false ||
                    (cfg.useTabKey === true && active.length === 0 && ms.input.val().length === 0))) {
                    handlers._onBlur();
                    return;
                }
                switch(e.keyCode) {
                    case 8: //backspace
                        if(freeInput.length === 0 && ms.getSelectedItems().length > 0 && cfg.selectionPosition === 'inner') {
                            _selection.pop();
                            self._renderSelection();
                            $(ms).trigger('selectionchange', [ms, ms.getSelectedItems()]);
                            ms.input.focus();
                            e.preventDefault();
                        }
                        break;
                    case 9: // tab
                    case 188: // esc
                    case 13: // enter
                        e.preventDefault();
                        break;
                    case 17: // ctrl
                        _ctrlDown = true;
                        break;
                    case 40: // down
                        e.preventDefault();
                        self._moveSelectedRow("down");
                        break;
                    case 38: // up
                        e.preventDefault();
                        self._moveSelectedRow("up");
                        break;
                    default:
                        if(_selection.length === cfg.maxSelection) {
                            e.preventDefault();
                        }
                        break;
                }
            },

            /**
             * Triggered when a key is released while the component has focus
             * @param e
             * @private
             */
            _onKeyUp: function(e) {
                var freeInput = ms.getRawValue(),
                    inputValid = $.trim(ms.input.val()).length > 0 && ms.input.val() !== cfg.emptyText &&
                        (!cfg.maxEntryLength || $.trim(ms.input.val()).length <= cfg.maxEntryLength),
                    selected,
                    obj = {};

                $(ms).trigger('keyup', [ms, e]);

                clearTimeout(_timer);

                // collapse if escape, but keep focus.
                if(e.keyCode === 27 && cfg.expanded) {
                    ms.combobox.height(0);
                }
                // ignore a bunch of keys
                if((e.keyCode === 9 && cfg.useTabKey === false) || (e.keyCode > 13 && e.keyCode < 32)) {
                    if(e.keyCode === 17){
                        _ctrlDown = false;
                    }
                    return;
                }
                switch(e.keyCode) {
                    case 40:case 38: // up, down
                    e.preventDefault();
                    break;
                    case 13:case 9:case 188:// enter, tab, comma
                    if(e.keyCode !== 188 || cfg.useCommaKey === true) {
                        e.preventDefault();
                        if(cfg.expanded === true){ // if a selection is performed, select it and reset field
                            selected = ms.combobox.find('.ms-res-item-active:first');
                            if(selected.length > 0) {
                                self._selectItem(selected);
                                return;
                            }
                        }
                        // if no selection or if freetext entered and free entries allowed, add new obj to selection
                        if(inputValid === true && cfg.allowFreeEntries === true) {
                            obj[cfg.displayField] = obj[cfg.valueField] = freeInput;
                            ms.addToSelection(obj);
                            ms.collapse(); // reset combo suggestions
                            ms.input.focus();
                        }
                        break;
                    }
                    default:
                        if(_selection.length === cfg.maxSelection){
                            self._updateHelper(cfg.maxSelectionRenderer.call(this, _selection.length));
                        }
                        else {
                            if(freeInput.length < cfg.minChars) {
                                self._updateHelper(cfg.minCharsRenderer.call(this, cfg.minChars - freeInput.length));
                                if(cfg.expanded === true) {
                                    ms.collapse();
                                }
                            }
                            else if(cfg.maxEntryLength && freeInput.length > cfg.maxEntryLength) {
                                self._updateHelper(cfg.maxEntryRenderer.call(this, freeInput.length - cfg.maxEntryLength));
                                if(cfg.expanded === true) {
                                    ms.collapse();
                                }
                            }
                            else {
                                ms.helper.hide();
                                if(cfg.minChars <= freeInput.length){
                                    _timer = setTimeout(function() {
                                        if(cfg.expanded === true) {
                                            self._processSuggestions();
                                        } else {
                                            ms.expand();
                                        }
                                    }, cfg.typeDelay);
                                }
                            }
                        }
                        break;
                }
            },

            /**
             * Triggered when clicking upon cross for deletion
             * @param e
             * @private
             */
            _onTagTriggerClick: function(e) {
                ms.removeFromSelection($(e.currentTarget).data('json'));
            },

            /**
             * Triggered when clicking on the small trigger in the right
             * @private
             */
            _onTriggerClick: function() {
                if(ms.isDisabled() === false && !(cfg.expandOnFocus === true && _selection.length === cfg.maxSelection)) {
                    $(ms).trigger('triggerclick', [ms]);
                    if(cfg.expanded === true) {
                        ms.collapse();
                    } else {
                        var curLength = ms.getRawValue().length;
                        if(curLength >= cfg.minChars){
                            ms.input.focus();
                            ms.expand();
                        } else {
                            self._updateHelper(cfg.minCharsRenderer.call(this, cfg.minChars - curLength));
                        }
                    }
                }
            }
        };

        // startup point
        if(element !== null) {
            self._render(element);
        }
    };

    $.fn.magicSuggest = function(options) {
        var obj = $(this);

        if(obj.size() === 1 && obj.data('magicSuggest')) {
            return obj.data('magicSuggest');
        }

        obj.each(function(i) {
            // assume $(this) is an element
            var cntr = $(this);

            // Return early if this element already has a plugin instance
            if(cntr.data('magicSuggest')){
                return;
            }

            if(this.nodeName.toLowerCase() === 'select'){ // rendering from select
                options.data = [];
                options.value = [];
                $.each(this.children, function(index, child){
                    if(child.nodeName && child.nodeName.toLowerCase() === 'option'){
                        options.data.push({id: child.value, name: child.text});
                        if(child.selected){
                            options.value.push(child.value);
                        }
                    }
                });

            }

            var def = {};
            // set values from DOM container element
            $.each(this.attributes, function(i, att){
                def[att.name] = att.value;
            });
            var field = new MagicSuggest(this, $.extend(options, def));
            cntr.data('magicSuggest', field);
            field.container.data('magicSuggest', field);
        });

        if(obj.size() === 1) {
            return obj.data('magicSuggest');
        }
        return obj;
    };

//    $.fn.magicSuggest.defaults = {};
})(jQuery);