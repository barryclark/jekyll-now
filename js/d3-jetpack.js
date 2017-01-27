(function(root, factory) {
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory(require('d3'));
    } else if (typeof define === 'function' && define.amd) {
        define(['d3'], factory);
    } else {
        root.d3 = factory(root.d3);
    }
}(this, function(d3) {
        
    d3.selection.prototype.translate = function(xy) {
        return this.attr('transform', function(d,i) {
            return 'translate('+[typeof xy == 'function' ? xy.call(this, d,i) : xy]+')';
        });
    };

    d3.transition.prototype.translate = function(xy) {
        return this.attr('transform', function(d,i) {
            return 'translate('+[typeof xy == 'function' ? xy.call(this, d,i) : xy]+')';
        });
    };

    d3.selection.prototype.tspans = function(lines, lh) {
        return this.selectAll('tspan')
            .data(lines)
            .enter()
            .append('tspan')
            .text(function(d) { return d; })
            .attr('x', 0)
            .attr('dy', function(d,i) { return i ? lh || 15 : 0; });
    };

    d3.selection.prototype.append = function(name) {
        var n = d3_parse_attributes(name), s;
        name = n.attr ? n.tag : name;
        name = d3_selection_creator(name);
        s = this.select(function() {
            return this.appendChild(name.apply(this, arguments));
        });
        //attrs not provided by default in v4
        for (var name in n.attr) { s.attr(name, n.attr[name]) }
        return s;
    };

    d3.selection.prototype.insert = function(name, before) {
        var n = d3_parse_attributes(name), s;
        name = n.attr ? n.tag : name;
        name = d3_selection_creator(name);
        before = d3_selection_selector(before);
        s = this.select(function() {
            return this.insertBefore(name.apply(this, arguments), before.apply(this, arguments) || null);
        });
        //attrs not provided by default in v4
        for (var name in n.attr) { s.attr(name, n.attr[name]) }
        return s;
    };

    //no selection.enter in v4
    if (d3.selection.enter){
        d3.selection.enter.prototype.append = d3.selection.prototype.append
        d3.selection.enter.prototype.insert = d3.selection.prototype.insert
    }

    var d3_parse_attributes_regex = /([\.#])/g;

    function d3_parse_attributes(name) {
        if (typeof name === "string") {
            var attr = {},
                parts = name.split(d3_parse_attributes_regex), p;
                name = parts.shift();
            while ((p = parts.shift())) {
                if (p == '.') attr['class'] = attr['class'] ? attr['class'] + ' ' + parts.shift() : parts.shift();
                else if (p == '#') attr.id = parts.shift();
            }
            return attr.id || attr['class'] ? { tag: name, attr: attr } : name;
        }
        return name;
    }

    function d3_selection_creator(name) {
        var qualify = d3.namespace || d3.ns.qualify //v4 API change
        return typeof name === "function" ? name : (name = qualify(name)).local ? function() {
            return this.ownerDocument.createElementNS(name.space, name.local);
        } : function() {
            return this.ownerDocument.createElementNS(this.namespaceURI, name);
        };
    }

    function d3_selection_selector(selector) {
        return typeof selector === "function" ? selector : function() {
            return this.querySelector(selector);
        };
    }

    d3.wordwrap = function(line, maxCharactersPerLine) {
        var w = line.split(' '),
            lines = [],
            words = [],
            maxChars = maxCharactersPerLine || 40,
            l = 0;
        w.forEach(function(d) {
            if (l+d.length > maxChars) {
                lines.push(words.join(' '));
                words.length = 0;
                l = 0;
            }
            l += d.length;
            words.push(d);
        });
        if (words.length) {
            lines.push(words.join(' '));
        }
        return lines;
    };
    
    d3.ascendingKey = function(key) {
        return typeof key == 'function' ? function (a, b) {
              return key(a) < key(b) ? -1 : key(a) > key(b) ? 1 : key(a) >= key(b) ? 0 : NaN;
        } : function (a, b) {
              return a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : a[key] >= b[key] ? 0 : NaN;
        };
    };

    d3.descendingKey = function(key) {
        return typeof key == 'function' ? function (a, b) {
            return key(b) < key(a) ? -1 : key(b) > key(a) ? 1 : key(b) >= key(a) ? 0 : NaN;
        } : function (a, b) {
            return b[key] < a[key] ? -1 : b[key] > a[key] ? 1 : b[key] >= a[key] ? 0 : NaN;
        };
    };
    
    d3.f = function(){
        var functions = arguments;
        //convert all string arguments into field accessors
        var i = 0, l = functions.length;
        while (i < l) {
            if (functions[i] in d3.f._) {
                functions[i] = (function(f){ return function(d){ return f(d); }; })(d3.f._[functions[i]]);
            } else if (typeof(functions[i]) === 'string' || typeof(functions[i]) === 'number'){
                functions[i] = (function(str){ return function(d){ return d[str]; }; })(functions[i]);
            } else if (typeof(functions[i]) === 'object'){
                functions[i] = (function(map){ return function(d){ return map[d]; }; })(functions[i]);
            }
            i++;
        }
         //return composition of functions
        return function(d) {
            var i=0, l = functions.length;
            while (i++ < l) d = functions[i-1].call(this, d);
            return d;
        };
    };

    // special operator functions
    d3.f._ = {
        'ƒ.call': function(d) { return d(); },
        'ƒ.not': function(d) { return !d; }
    };
    
    // store d3.f as convenient unicode character function (alt-f on macs)
    if (typeof window !== 'undefined' && !window.hasOwnProperty('ƒ')) window.ƒ = d3.f;
    
    // this tweak allows setting a listener for multiple events, jquery style
    var d3_selection_on = d3.selection.prototype.on;
    d3.selection.prototype.on = function(type, listener, capture) {
        if (typeof type == 'string' && type.indexOf(' ') > -1) {
            type = type.split(' ');
            for (var i = 0; i<type.length; i++) {
                d3_selection_on.apply(this, [type[i], listener, capture]);
            }
        } else {
            d3_selection_on.apply(this, [type, listener, capture]);
        }
        return this;
    };
    
    // for everyone's sake, let's add prop as alias for property
    d3.selection.prototype.prop = d3.selection.prototype.property;

    // combines data().enter().append()
    d3.selection.prototype.appendMany = function(data, name){
        return this.selectAll(name).data(data).enter().append(name);
    };
    
    d3.round = d3.round || function(n, p) {
        return p ? Math.round(n * (p = Math.pow(10, p))) / p : Math.round(n);
    };

    return d3;

}));
