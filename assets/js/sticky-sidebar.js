/**
 * Sticky Sidebar JavaScript Plugin.
 * @version 3.3.4
 * @author Ahmed Bouhuolia <a.bouhuolia@gmail.com>
 * @license The MIT License (MIT)
 */
const StickySidebar = (() => {
  
    // ---------------------------------
    // # Define Constants
    // ---------------------------------
    //
    const EVENT_KEY = '.stickySidebar';
    const VERSION   = '3.3.4';
  
    const DEFAULTS = {
      /**
       * Additional top spacing of the element when it becomes sticky.
       * @type {Numeric|Function}
       */
      topSpacing: 0,
  
      /**
       * Additional bottom spacing of the element when it becomes sticky.
       * @type {Numeric|Function}
       */
      bottomSpacing: 0,
  
      /**
       * Container sidebar selector to know what the beginning and end of sticky element.
       * @type {String|False}
       */
      containerSelector: false,
  
      /**
       * Inner wrapper selector.
       * @type {String}
       */
      innerWrapperSelector: '.inner-wrapper-sticky',
  
      /**
       * The name of CSS class to apply to elements when they have become stuck.
       * @type {String|False}
       */
      stickyClass: 'is-affixed',
  
      /**
       * Detect when sidebar and its container change height so re-calculate their dimensions.
       * @type {Boolean}
       */
      resizeSensor: true,
  
      /**
       * The sidebar returns to its normal position if its width below this value.
       * @type {Numeric}
       */
      minWidth: false
    };
  
    // ---------------------------------
    // # Class Definition
    // ---------------------------------
    //
    /**
     * Sticky Sidebar Class.
     * @public
     */
    class StickySidebar{
  
      /**
       * Sticky Sidebar Constructor.
       * @constructor
       * @param {HTMLElement|String} sidebar - The sidebar element or sidebar selector.
       * @param {Object} options - The options of sticky sidebar.
       */
      constructor(sidebar, options = {}){
        this.options = StickySidebar.extend(DEFAULTS, options);
  
        // Sidebar element query if there's no one, throw error.
        this.sidebar = ('string' === typeof sidebar ) ? document.querySelector(sidebar) : sidebar;
        if( 'undefined' === typeof this.sidebar )
          throw new Error("There is no specific sidebar element.");
  
        this.sidebarInner = false;
        this.container = this.sidebar.parentElement;
  
        // Current Affix Type of sidebar element.
        this.affixedType = 'STATIC';
        this.direction = 'down';
        this.support = { 
          transform:   false,
          transform3d: false
        };
  
        this._initialized = false;
        this._reStyle = false;
        this._breakpoint = false;
        
        // Dimensions of sidebar, container and screen viewport.
        this.dimensions = {
          translateY: 0,
          maxTranslateY: 0,
          topSpacing: 0,
          lastTopSpacing: 0,
          bottomSpacing: 0,
          lastBottomSpacing: 0,
          sidebarHeight: 0,
          sidebarWidth: 0,
          containerTop: 0,
          containerHeight: 0,
          viewportHeight: 0,
          viewportTop: 0, 
          lastViewportTop: 0,
        };
  
        // Bind event handlers for referencability.
        ['handleEvent'].forEach( (method) => {
          this[method] = this[method].bind(this);
        });
  
        // Initialize sticky sidebar for first time.
        this.initialize();
      }
  
      /**
       * Initializes the sticky sidebar by adding inner wrapper, define its container, 
       * min-width breakpoint, calculating dimensions, adding helper classes and inline style.
       * @private
       */
      initialize(){
        this._setSupportFeatures();
        
        // Get sticky sidebar inner wrapper, if not found, will create one.
        if( this.options.innerWrapperSelector ){
          this.sidebarInner = this.sidebar.querySelector(this.options.innerWrapperSelector);
  
          if( null === this.sidebarInner )
            this.sidebarInner = false;
        }
        
        if( ! this.sidebarInner ){
          let wrapper = document.createElement('div');
          wrapper.setAttribute('class', 'inner-wrapper-sticky');
          this.sidebar.appendChild(wrapper);
  
          while( this.sidebar.firstChild != wrapper )
            wrapper.appendChild(this.sidebar.firstChild);
  
          this.sidebarInner = this.sidebar.querySelector('.inner-wrapper-sticky');
        }
  
        // Container wrapper of the sidebar.
        if( this.options.containerSelector ){
          let containers = document.querySelectorAll(this.options.containerSelector);
          containers = Array.prototype.slice.call(containers);
  
          containers.forEach((container, item) => {
            if( ! container.contains(this.sidebar) ) return;
            this.container = container;
          });
  
          if( ! containers.length )
            throw new Error("The container does not contains on the sidebar.");
        }
        
        // If top/bottom spacing is not function parse value to integer.
        if( 'function' !== typeof this.options.topSpacing )
          this.options.topSpacing = parseInt(this.options.topSpacing) || 0;
  
        if( 'function' !== typeof this.options.bottomSpacing )
          this.options.bottomSpacing = parseInt(this.options.bottomSpacing) || 0;
            
        // Breakdown sticky sidebar if screen width below `options.minWidth`.
        this._widthBreakpoint();
  
        // Calculate dimensions of sidebar, container and viewport.
        this.calcDimensions();
  
        // Affix sidebar in proper position.
        this.stickyPosition();
  
        // Bind all events.
        this.bindEvents();
        
        // Inform other properties the sticky sidebar is initialized.
        this._initialized = true;
      }
  
      /**
       * Bind all events of sticky sidebar plugin.
       * @protected
       */
      bindEvents(){
        window.addEventListener('resize', this, {passive: true, capture: false});
        window.addEventListener('scroll', this, {passive: true, capture: false});
  
        this.sidebar.addEventListener('update' + EVENT_KEY, this);
  
        if( this.options.resizeSensor && 'undefined' !== typeof ResizeSensor ){
          new ResizeSensor(this.sidebarInner, this.handleEvent);
          new ResizeSensor(this.container, this.handleEvent);
        }
      }
  
      /**
       * Handles all events of the plugin.
       * @param {Object} event - Event object passed from listener.
       */
      handleEvent(event){
        this.updateSticky(event);
      }
  
      /**
       * Calculates dimensions of sidebar, container and screen viewpoint
       * @public
       */
      calcDimensions(){
        if( this._breakpoint ) return;
        var dims = this.dimensions;
  
        // Container of sticky sidebar dimensions.
        dims.containerTop    = StickySidebar.offsetRelative(this.container).top;
        dims.containerHeight = this.container.clientHeight;
        dims.containerBottom = dims.containerTop + dims.containerHeight;
  
        // Sidebar dimensions.
        dims.sidebarHeight = this.sidebarInner.offsetHeight;
        dims.sidebarWidth  = this.sidebarInner.offsetWidth;
        
        // Screen viewport dimensions.
        dims.viewportHeight = window.innerHeight;

        // Maximum sidebar translate Y.
        dims.maxTranslateY = dims.containerHeight - dims.sidebarHeight;

        this._calcDimensionsWithScroll();
      }
  
      /**
       * Some dimensions values need to be up-to-date when scrolling the page.
       * @private
       */
      _calcDimensionsWithScroll(){
        var dims = this.dimensions;
  
        dims.sidebarLeft = StickySidebar.offsetRelative(this.sidebar).left;
  
        dims.viewportTop    = document.documentElement.scrollTop || document.body.scrollTop;
        dims.viewportBottom = dims.viewportTop + dims.viewportHeight;
        dims.viewportLeft   = document.documentElement.scrollLeft || document.body.scrollLeft;
  
        dims.topSpacing    = this.options.topSpacing;
        dims.bottomSpacing = this.options.bottomSpacing;
  
        if( 'function' === typeof dims.topSpacing )
            dims.topSpacing = parseInt(dims.topSpacing(this.sidebar)) || 0;
  
        if( 'function' === typeof dims.bottomSpacing )
            dims.bottomSpacing = parseInt(dims.bottomSpacing(this.sidebar)) || 0;
        
        if( 'VIEWPORT-TOP' === this.affixedType ){
          // Adjust translate Y in the case decrease top spacing value.
          if( dims.topSpacing < dims.lastTopSpacing ){
            dims.translateY += dims.lastTopSpacing - dims.topSpacing;
            this._reStyle = true; 
          }
        } else if( 'VIEWPORT-BOTTOM' === this.affixedType ){
          // Adjust translate Y in the case decrease bottom spacing value.
          if( dims.bottomSpacing < dims.lastBottomSpacing ){
            dims.translateY += dims.lastBottomSpacing - dims.bottomSpacing;
            this._reStyle = true;
          }
        }
        
        dims.lastTopSpacing    = dims.topSpacing;
        dims.lastBottomSpacing = dims.bottomSpacing;
      }
      
      /**
       * Determine whether the sidebar is bigger than viewport.
       * @public
       * @return {Boolean}
       */
      isSidebarFitsViewport(){
        let dims = this.dimensions;
        let offset = this.scrollDirection === 'down' ? dims.lastBottomSpacing : dims.lastTopSpacing;
        return this.dimensions.sidebarHeight + offset < this.dimensions.viewportHeight;
      }
  
      /**
       * Observe browser scrolling direction top and down.
       */
      observeScrollDir(){
        var dims = this.dimensions;
        if( dims.lastViewportTop === dims.viewportTop ) return;
  
        var furthest = 'down' === this.direction ? Math.min : Math.max;
        
        // If the browser is scrolling not in the same direction.
        if( dims.viewportTop === furthest(dims.viewportTop, dims.lastViewportTop) )
          this.direction = 'down' === this.direction ?  'up' : 'down';
      }
  
      /**
       * Gets affix type of sidebar according to current scroll top and scrolling direction.
       * @public
       * @return {String|False} - Proper affix type.
       */
      getAffixType(){
        this._calcDimensionsWithScroll();
        var dims = this.dimensions;
        var colliderTop = dims.viewportTop + dims.topSpacing;
        var affixType = this.affixedType;

       if( colliderTop <= dims.containerTop || dims.containerHeight <= dims.sidebarHeight ){
          dims.translateY = 0;
          affixType = 'STATIC';
        } else {
          affixType = ( 'up' === this.direction ) ? 
            this._getAffixTypeScrollingUp() : this._getAffixTypeScrollingDown();
        }

        // Make sure the translate Y is not bigger than container height.
        dims.translateY = Math.max(0, dims.translateY);
        dims.translateY = Math.min(dims.containerHeight, dims.translateY);
        dims.translateY = Math.round(dims.translateY);
  
        dims.lastViewportTop = dims.viewportTop;
        return affixType;
      }

      /**
       * Get affix type while scrolling down.
       * @private
       * @return {String} - Proper affix type of scrolling down direction.
       */
      _getAffixTypeScrollingDown(){
        var dims = this.dimensions;
        var sidebarBottom = dims.sidebarHeight + dims.containerTop;
        var colliderTop = dims.viewportTop + dims.topSpacing;
        var colliderBottom = dims.viewportBottom - dims.bottomSpacing;
        var affixType = this.affixedType;
        
        if( this.isSidebarFitsViewport() ){
          if( dims.sidebarHeight + colliderTop >= dims.containerBottom ){
            dims.translateY = dims.containerBottom - sidebarBottom;
            affixType = 'CONTAINER-BOTTOM'; 

          } else if( colliderTop >= dims.containerTop ){
            dims.translateY = colliderTop - dims.containerTop;
            affixType = 'VIEWPORT-TOP';
          }
        } else {
          if( dims.containerBottom <= colliderBottom ){
            dims.translateY = dims.containerBottom - sidebarBottom; 
            affixType = 'CONTAINER-BOTTOM';    

          } else if( sidebarBottom + dims.translateY <= colliderBottom ){
            dims.translateY = colliderBottom - sidebarBottom;
            affixType = 'VIEWPORT-BOTTOM';
          
          } else if( dims.containerTop + dims.translateY <= colliderTop &&
            (0 !== dims.translateY && dims.maxTranslateY !== dims.translateY) ){
            affixType = 'VIEWPORT-UNBOTTOM';
          }
        }

        return affixType;
      }
      
      /**
       * Get affix type while scrolling up.
       * @private
       * @return {String} - Proper affix type of scrolling up direction.
       */
      _getAffixTypeScrollingUp(){
        var dims = this.dimensions;
        var sidebarBottom = dims.sidebarHeight + dims.containerTop;
        var colliderTop = dims.viewportTop + dims.topSpacing;
        var colliderBottom = dims.viewportBottom - dims.bottomSpacing;
        var affixType = this.affixedType;

        if( colliderTop <= dims.translateY + dims.containerTop ){
          dims.translateY = colliderTop - dims.containerTop;
          affixType = 'VIEWPORT-TOP';
        
        } else if( dims.containerBottom <= colliderBottom ){
          dims.translateY = dims.containerBottom - sidebarBottom;
          affixType = 'CONTAINER-BOTTOM';

        } else if( ! this.isSidebarFitsViewport() ){

          if( dims.containerTop <= colliderTop && 
              (0 !== dims.translateY && dims.maxTranslateY !== dims.translateY) ){
            affixType = 'VIEWPORT-UNBOTTOM';
          } 
        }

        return affixType;
      }

      /**
       * Gets inline style of sticky sidebar wrapper and inner wrapper according 
       * to its affix type.
       * @private
       * @param {String} affixType - Affix type of sticky sidebar.
       * @return {Object}
       */
      _getStyle(affixType){
        if( 'undefined' === typeof affixType ) return;
  
        var style = {inner: {}, outer: {}};
        var dims = this.dimensions;
  
        switch( affixType ){
          case 'VIEWPORT-TOP':
            style.inner = {position: 'fixed', top: dims.topSpacing,
                  left: dims.sidebarLeft - dims.viewportLeft, width: dims.sidebarWidth};
            break;
          case 'VIEWPORT-BOTTOM':
            style.inner = {position: 'fixed', top: 'auto', left: dims.sidebarLeft,
                  bottom: dims.bottomSpacing, width: dims.sidebarWidth};
            break;
          case 'CONTAINER-BOTTOM':
          case 'VIEWPORT-UNBOTTOM':
            let translate = this._getTranslate(0, dims.translateY + 'px');
            
            if( translate )
              style.inner = {transform: translate};
            else 
              style.inner = {position: 'absolute', top: dims.translateY, width: dims.sidebarWidth};
            break;
        }
        
        switch( affixType ){
          case 'VIEWPORT-TOP':
          case 'VIEWPORT-BOTTOM':
          case 'VIEWPORT-UNBOTTOM':
          case 'CONTAINER-BOTTOM':
            style.outer = {height: dims.sidebarHeight, position: 'relative'};
            break;
        }
  
        style.outer = StickySidebar.extend({height: '', position: ''}, style.outer);
        style.inner = StickySidebar.extend({position: 'relative', top: '', left: '',
            bottom: '', width: '',  transform: ''}, style.inner);
  
        return style;
      }
     
      /**
       * Cause the sidebar to be sticky according to affix type by adding inline
       * style, adding helper class and trigger events.
       * @function
       * @protected
       * @param {string} force - Update sticky sidebar position by force.
       */
      stickyPosition(force){
        if( this._breakpoint ) return;
  
        force = this._reStyle || force || false;
        
        var offsetTop = this.options.topSpacing;
        var offsetBottom = this.options.bottomSpacing;
  
        var affixType = this.getAffixType();
        var style = this._getStyle(affixType);
        
        if( (this.affixedType != affixType || force) && affixType ){
          let affixEvent = 'affix.' + affixType.toLowerCase().replace('viewport-', '') + EVENT_KEY;
          StickySidebar.eventTrigger(this.sidebar, affixEvent);
  
          if( 'STATIC' === affixType )
            StickySidebar.removeClass(this.sidebar, this.options.stickyClass);
          else
            StickySidebar.addClass(this.sidebar, this.options.stickyClass);
          
          for( let key in style.outer ){
            let unit = ('number' === typeof style.outer[key]) ? 'px' : '';
            this.sidebar.style[key] = style.outer[key] + unit;
          }
  
          for( let key in style.inner ){
            let unit = ('number' === typeof style.inner[key]) ? 'px' : '';
            this.sidebarInner.style[key] = style.inner[key] + unit;
          }
          
          let affixedEvent = 'affixed.'+ affixType.toLowerCase().replace('viewport-', '') + EVENT_KEY;
          StickySidebar.eventTrigger(this.sidebar, affixedEvent);
        } else {
          if( this._initialized ) this.sidebarInner.style.left = style.inner.left;
        }
  
        this.affixedType = affixType;
      }
  
      /**
       * Breakdown sticky sidebar when window width is below `options.minWidth` value.
       * @protected
       */
      _widthBreakpoint(){
  
        if( window.innerWidth <= this.options.minWidth ){
          this._breakpoint = true;
          this.affixedType = 'STATIC';
  
          this.sidebar.removeAttribute('style');
          StickySidebar.removeClass(this.sidebar, this.options.stickyClass);
          this.sidebarInner.removeAttribute('style');
        } else {
          this._breakpoint = false;
        }
      }
  
      /**
       * Switches between functions stack for each event type, if there's no 
       * event, it will re-initialize sticky sidebar.
       * @public
       */
      updateSticky(event = {}){
        if( this._running ) return;
        this._running = true;
  
        ((eventType) => {
          requestAnimationFrame(() => {
            switch( eventType ){
              // When browser is scrolling and re-calculate just dimensions
              // within scroll. 
              case 'scroll':
                this._calcDimensionsWithScroll();
                this.observeScrollDir();
                this.stickyPosition();
                break;
  
              // When browser is resizing or there's no event, observe width
              // breakpoint and re-calculate dimensions.
              case 'resize':
              default: 
                this._widthBreakpoint();
                this.calcDimensions();
                this.stickyPosition(true);
                break;
            }
            this._running = false;
          });
        })(event.type);
      }
  
      /**
       * Set browser support features to the public property.
       * @private
       */
      _setSupportFeatures(){
        var support = this.support;
  
        support.transform = StickySidebar.supportTransform();
        support.transform3d = StickySidebar.supportTransform(true);
      }
  
      /**
       * Get translate value, if the browser supports transfrom3d, it will adopt it.
       * and the same with translate. if browser doesn't support both return false.
       * @param {Number} y - Value of Y-axis.
       * @param {Number} x - Value of X-axis.
       * @param {Number} z - Value of Z-axis.
       * @return {String|False}
       */
      _getTranslate(y = 0, x = 0, z = 0){
        if( this.support.transform3d ) return 'translate3d(' + y +', '+ x +', '+ z +')';
        else if( this.support.translate ) return 'translate('+ y +', '+ x +')';
        else return false;
      }
  
      /**
       * Destroy sticky sidebar plugin.
       * @public
       */
      destroy(){
        window.removeEventListener('resize', this, {capture: false});
        window.removeEventListener('scroll', this, {capture: false});
  
        this.sidebar.classList.remove(this.options.stickyClass);
        this.sidebar.style.minHeight = '';
  
        this.sidebar.removeEventListener('update' + EVENT_KEY, this);
  
        var styleReset = {inner: {}, outer: {}};
  
        styleReset.inner = {position: '', top: '', left: '', bottom: '', width: '',  transform: ''};
        styleReset.outer = {height: '', position: ''};
  
        for( let key in styleReset.outer )
          this.sidebar.style[key] = styleReset.outer[key];
  
        for( let key in styleReset.inner )
          this.sidebarInner.style[key] = styleReset.inner[key];
  
        if( this.options.resizeSensor && 'undefined' !== typeof ResizeSensor ){
          ResizeSensor.detach(this.sidebarInner, this.handleEvent);
          ResizeSensor.detach(this.container, this.handleEvent);
        }
      }
  
      /**
       * Determine if the browser supports CSS transform feature.
       * @function
       * @static
       * @param {Boolean} transform3d - Detect transform with translate3d.
       * @return {String}
       */
      static supportTransform(transform3d){
        var result = false,
            property = (transform3d) ? 'perspective' : 'transform',
            upper = property.charAt(0).toUpperCase() + property.slice(1),
            prefixes = ['Webkit', 'Moz', 'O', 'ms'],
            support = document.createElement('support'),
            style = support.style;
  
        (property + ' ' + prefixes.join(upper + ' ') + upper).split(' ').forEach(function(property, i) {
          if (style[property] !== undefined) {
            result = property;
            return false;
          }
        });
        return result;
      }
  
      /**
       * Trigger custom event.
       * @static
       * @param {DOMObject} element - Target element on the DOM.
       * @param {String} eventName - Event name.
       * @param {Object} data - 
       */
      static eventTrigger(element, eventName, data){
        try{
          var event = new CustomEvent(eventName, {detail: data});
        } catch(e){
          var event = document.createEvent('CustomEvent');
          event.initCustomEvent(eventName, true, true, data);
        }
        element.dispatchEvent(event);
      }
  
      /**
       * Extend options object with defaults.
       * @function
       * @static
       */
      static extend(defaults, options){
        var results = {};
        for( let key in defaults ){
          if( 'undefined' !== typeof options[key] ) results[key] = options[key];
          else results[key] = defaults[key];
        }
        return results;
      }
  
      /**
       * Get current coordinates left and top of specific element.
       * @static
       */
      static offsetRelative(element){
        var result = {left: 0, top: 0};

        do{
          let offsetTop = element.offsetTop;
          let offsetLeft = element.offsetLeft;
  
          if( ! isNaN(offsetTop) )
            result.top += offsetTop;
  
          if( ! isNaN(offsetLeft) )
            result.left += offsetLeft;

          element = ( 'BODY' === element.tagName ) ?
                      element.parentElement : element.offsetParent;
        } while(element)
        return result;
      }
  
      /**
       * Add specific class name to specific element.
       * @static 
       * @param {ObjectDOM} element 
       * @param {String} className 
       */
      static addClass(element, className){
        if( ! StickySidebar.hasClass(element, className) ){
          if (element.classList)
            element.classList.add(className);
          else
            element.className += ' ' + className;
        }
      }
      
      /**
       * Remove specific class name to specific element
       * @static
       * @param {ObjectDOM} element 
       * @param {String} className 
       */
      static removeClass(element, className){
        if( StickySidebar.hasClass(element, className) ){
          if (element.classList)
            element.classList.remove(className);
          else
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
      }

      /**
       * Determine weather the element has specific class name.
       * @static
       * @param {ObjectDOM} element 
       * @param {String} className 
       */
      static hasClass(element, className){
        if (element.classList)
          return element.classList.contains(className);
        else
          return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
      }

      /**
       * Gets default values of configuration options.
       * @static
       * @return {Object} 
       */
      static get defaults(){
        return DEFAULTS;
      }
    }
  
    return StickySidebar;
  })();
  
  export default StickySidebar;
  
  // Global
  // -------------------------
  window.StickySidebar = StickySidebar;