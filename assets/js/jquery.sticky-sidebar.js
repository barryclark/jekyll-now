import StickySidebar from './sticky-sidebar';

(() => {
	if( 'undefined' === typeof window ) return;

	const plugin = window.$ || window.jQuery || window.Zepto;
	const DATA_NAMESPACE = 'stickySidebar';

	// Make sure the site has jquery or zepto plugin.
  if( plugin ){
    /**
     * Sticky Sidebar Plugin Defintion.
     * @param {Object|String} - config
     */
    function _jQueryPlugin(config){
      return this.each(function(){
        var $this = plugin(this),
          data = plugin(this).data(DATA_NAMESPACE);

          if( ! data ){
            data = new StickySidebar(this, typeof config == 'object' && config);
            $this.data(DATA_NAMESPACE, data);
          }

          if( 'string' === typeof config){
            if (data[config] === undefined && ['destroy', 'updateSticky'].indexOf(config) === -1)
              throw new Error('No method named "'+ config +'"');

            data[config]();
          }
      });
    }

    plugin.fn.stickySidebar = _jQueryPlugin;
    plugin.fn.stickySidebar.Constructor = StickySidebar;

    const old = plugin.fn.stickySidebar;

    /**
     * Sticky Sidebar No Conflict.
     */
    plugin.fn.stickySidebar.noConflict = function(){
      plugin.fn.stickySidebar = old;
      return this;
    };
  }
})();
