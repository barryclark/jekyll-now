var KLStoryMap;
(() => {
    var t = {
            243: (t, e, i) => {
                var o, n;
                ! function (s, a, r) {
                    var h, l, c = s.L,
                        d = {};
                    d.version = "0.7.7", "object" == typeof t.exports ? t.exports = d : (n = "function" == typeof (o = d) ? o.call(e, i, e, t) : o) === r || (t.exports = n), d.noConflict = function () {
                            return s.L = c, this
                        }, s.L = d, d.Util = {
                            extend: function (t) {
                                var e, i, o, n, s = Array.prototype.slice.call(arguments, 1);
                                for (i = 0, o = s.length; i < o; i++)
                                    for (e in n = s[i] || {}) n.hasOwnProperty(e) && (t[e] = n[e]);
                                return t
                            },
                            bind: function (t, e) {
                                var i = arguments.length > 2 ? Array.prototype.slice.call(arguments, 2) : null;
                                return function () {
                                    return t.apply(e, i || arguments)
                                }
                            },
                            stamp: (h = 0, l = "_leaflet_id", function (t) {
                                return t[l] = t[l] || ++h, t[l]
                            }),
                            invokeEach: function (t, e, i) {
                                var o, n;
                                if ("object" == typeof t) {
                                    for (o in n = Array.prototype.slice.call(arguments, 3), t) e.apply(i, [o, t[o]].concat(n));
                                    return !0
                                }
                                return !1
                            },
                            limitExecByInterval: function (t, e, i) {
                                var o, n;
                                return function s() {
                                    var a = arguments;
                                    o ? n = !0 : (o = !0, setTimeout((function () {
                                        o = !1, n && (s.apply(i, a), n = !1)
                                    }), e), t.apply(i, a))
                                }
                            },
                            falseFn: function () {
                                return !1
                            },
                            formatNum: function (t, e) {
                                var i = Math.pow(10, e || 5);
                                return Math.round(t * i) / i
                            },
                            trim: function (t) {
                                return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")
                            },
                            splitWords: function (t) {
                                return d.Util.trim(t).split(/\s+/)
                            },
                            setOptions: function (t, e) {
                                return t.options = d.extend({}, t.options, e), t.options
                            },
                            getParamString: function (t, e, i) {
                                var o = [];
                                for (var n in t) o.push(encodeURIComponent(i ? n.toUpperCase() : n) + "=" + encodeURIComponent(t[n]));
                                return (e && -1 !== e.indexOf("?") ? "&" : "?") + o.join("&")
                            },
                            template: function (t, e) {
                                return t.replace(/\{ *([\w_]+) *\}/g, (function (t, i) {
                                    var o = e[i];
                                    if (o === r) throw new Error("No value provided for variable " + t);
                                    return "function" == typeof o && (o = o(e)), o
                                }))
                            },
                            isArray: Array.isArray || function (t) {
                                return "[object Array]" === Object.prototype.toString.call(t)
                            },
                            emptyImageUrl: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                        },
                        function () {
                            function t(t) {
                                var e, i, o = ["webkit", "moz", "o", "ms"];
                                for (e = 0; e < o.length && !i; e++) i = s[o[e] + t];
                                return i
                            }
                            var e = 0;

                            function i(t) {
                                var i = +new Date,
                                    o = Math.max(0, 16 - (i - e));
                                return e = i + o, s.setTimeout(t, o)
                            }
                            var o = s.requestAnimationFrame || t("RequestAnimationFrame") || i,
                                n = s.cancelAnimationFrame || t("CancelAnimationFrame") || t("CancelRequestAnimationFrame") || function (t) {
                                    s.clearTimeout(t)
                                };
                            d.Util.requestAnimFrame = function (t, e, n, a) {
                                if (t = d.bind(t, e), !n || o !== i) return o.call(s, t, a);
                                t()
                            }, d.Util.cancelAnimFrame = function (t) {
                                t && n.call(s, t)
                            }
                        }(), d.extend = d.Util.extend, d.bind = d.Util.bind, d.stamp = d.Util.stamp, d.setOptions = d.Util.setOptions, d.Class = function () {}, d.Class.extend = function (t) {
                            var e = function () {
                                    this.initialize && this.initialize.apply(this, arguments), this._initHooks && this.callInitHooks()
                                },
                                i = function () {};
                            i.prototype = this.prototype;
                            var o = new i;
                            for (var n in o.constructor = e, e.prototype = o, this) this.hasOwnProperty(n) && "prototype" !== n && (e[n] = this[n]);
                            t.statics && (d.extend(e, t.statics), delete t.statics), t.includes && (d.Util.extend.apply(null, [o].concat(t.includes)), delete t.includes), t.options && o.options && (t.options = d.extend({}, o.options, t.options)), d.extend(o, t), o._initHooks = [];
                            var s = this;
                            return e.__super__ = s.prototype, o.callInitHooks = function () {
                                if (!this._initHooksCalled) {
                                    s.prototype.callInitHooks && s.prototype.callInitHooks.call(this), this._initHooksCalled = !0;
                                    for (var t = 0, e = o._initHooks.length; t < e; t++) o._initHooks[t].call(this)
                                }
                            }, e
                        }, d.Class.include = function (t) {
                            d.extend(this.prototype, t)
                        }, d.Class.mergeOptions = function (t) {
                            d.extend(this.prototype.options, t)
                        }, d.Class.addInitHook = function (t) {
                            var e = Array.prototype.slice.call(arguments, 1),
                                i = "function" == typeof t ? t : function () {
                                    this[t].apply(this, e)
                                };
                            this.prototype._initHooks = this.prototype._initHooks || [], this.prototype._initHooks.push(i)
                        };
                    var p, _, u, m, g, f, v, y, w, b, L, x, M, k, P, T, D, S, C, E, O, z, B, A = "_leaflet_events";
                    d.Mixin = {}, d.Mixin.Events = {
                            addEventListener: function (t, e, i) {
                                if (d.Util.invokeEach(t, this.addEventListener, this, e, i)) return this;
                                var o, n, s, a, r, h, l, c = this[A] = this[A] || {},
                                    p = i && i !== this && d.stamp(i);
                                for (o = 0, n = (t = d.Util.splitWords(t)).length; o < n; o++) s = {
                                    action: e,
                                    context: i || this
                                }, a = t[o], p ? (h = (r = a + "_idx") + "_len", (l = c[r] = c[r] || {})[p] || (l[p] = [], c[h] = (c[h] || 0) + 1), l[p].push(s)) : (c[a] = c[a] || [], c[a].push(s));
                                return this
                            },
                            hasEventListeners: function (t) {
                                var e = this[A];
                                return !!e && (t in e && e[t].length > 0 || t + "_idx" in e && e[t + "_idx_len"] > 0)
                            },
                            removeEventListener: function (t, e, i) {
                                if (!this[A]) return this;
                                if (!t) return this.clearAllEventListeners();
                                if (d.Util.invokeEach(t, this.removeEventListener, this, e, i)) return this;
                                var o, n, s, a, r, h, l, c, p = this[A],
                                    _ = i && i !== this && d.stamp(i);
                                for (o = 0, n = (t = d.Util.splitWords(t)).length; o < n; o++)
                                    if (l = (h = (s = t[o]) + "_idx") + "_len", c = p[h], e) {
                                        if (a = _ && c ? c[_] : p[s]) {
                                            for (r = a.length - 1; r >= 0; r--) a[r].action !== e || i && a[r].context !== i || (a.splice(r, 1)[0].action = d.Util.falseFn);
                                            i && c && 0 === a.length && (delete c[_], p[l]--)
                                        }
                                    } else delete p[s], delete p[h], delete p[l];
                                return this
                            },
                            clearAllEventListeners: function () {
                                return delete this[A], this
                            },
                            fireEvent: function (t, e) {
                                if (!this.hasEventListeners(t)) return this;
                                var i, o, n, s, a, r = d.Util.extend({}, e, {
                                        type: t,
                                        target: this
                                    }),
                                    h = this[A];
                                if (h[t])
                                    for (o = 0, n = (i = h[t].slice()).length; o < n; o++) i[o].action.call(i[o].context, r);
                                for (a in s = h[t + "_idx"])
                                    if (i = s[a].slice())
                                        for (o = 0, n = i.length; o < n; o++) i[o].action.call(i[o].context, r);
                                return this
                            },
                            addOneTimeEventListener: function (t, e, i) {
                                if (d.Util.invokeEach(t, this.addOneTimeEventListener, this, e, i)) return this;
                                var o = d.bind((function () {
                                    this.removeEventListener(t, e, i).removeEventListener(t, o, i)
                                }), this);
                                return this.addEventListener(t, e, i).addEventListener(t, o, i)
                            }
                        }, d.Mixin.Events.on = d.Mixin.Events.addEventListener, d.Mixin.Events.off = d.Mixin.Events.removeEventListener, d.Mixin.Events.once = d.Mixin.Events.addOneTimeEventListener, d.Mixin.Events.fire = d.Mixin.Events.fireEvent, _ = (p = "ActiveXObject" in s) && !a.addEventListener, u = navigator.userAgent.toLowerCase(), m = -1 !== u.indexOf("webkit"), g = -1 !== u.indexOf("chrome"), f = -1 !== u.indexOf("phantom"), v = -1 !== u.indexOf("android"), y = -1 !== u.search("android [23]"), w = -1 !== u.indexOf("gecko"), b = "undefined" != typeof orientation, L = !s.PointerEvent && s.MSPointerEvent, x = s.PointerEvent && s.navigator.pointerEnabled || L, M = "devicePixelRatio" in s && s.devicePixelRatio > 1 || "matchMedia" in s && s.matchMedia("(min-resolution:144dpi)") && s.matchMedia("(min-resolution:144dpi)").matches, k = a.documentElement, P = p && "transition" in k.style, T = "WebKitCSSMatrix" in s && "m11" in new s.WebKitCSSMatrix && !y, D = "MozPerspective" in k.style, S = "OTransition" in k.style, C = !s.L_DISABLE_3D && (P || T || D || S) && !f, E = !s.L_NO_TOUCH && !f && (x || "ontouchstart" in s || s.DocumentTouch && a instanceof s.DocumentTouch), d.Browser = {
                            ie: p,
                            ielt9: _,
                            webkit: m,
                            gecko: w && !m && !s.opera && !p,
                            android: v,
                            android23: y,
                            chrome: g,
                            ie3d: P,
                            webkit3d: T,
                            gecko3d: D,
                            opera3d: S,
                            any3d: C,
                            mobile: b,
                            mobileWebkit: b && m,
                            mobileWebkit3d: b && T,
                            mobileOpera: b && s.opera,
                            touch: E,
                            msPointer: L,
                            pointer: x,
                            retina: M
                        }, d.Point = function (t, e, i) {
                            this.x = i ? Math.round(t) : t, this.y = i ? Math.round(e) : e
                        }, d.Point.prototype = {
                            clone: function () {
                                return new d.Point(this.x, this.y)
                            },
                            add: function (t) {
                                return this.clone()._add(d.point(t))
                            },
                            _add: function (t) {
                                return this.x += t.x, this.y += t.y, this
                            },
                            subtract: function (t) {
                                return this.clone()._subtract(d.point(t))
                            },
                            _subtract: function (t) {
                                return this.x -= t.x, this.y -= t.y, this
                            },
                            divideBy: function (t) {
                                return this.clone()._divideBy(t)
                            },
                            _divideBy: function (t) {
                                return this.x /= t, this.y /= t, this
                            },
                            multiplyBy: function (t) {
                                return this.clone()._multiplyBy(t)
                            },
                            _multiplyBy: function (t) {
                                return this.x *= t, this.y *= t, this
                            },
                            round: function () {
                                return this.clone()._round()
                            },
                            _round: function () {
                                return this.x = Math.round(this.x), this.y = Math.round(this.y), this
                            },
                            floor: function () {
                                return this.clone()._floor()
                            },
                            _floor: function () {
                                return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this
                            },
                            distanceTo: function (t) {
                                var e = (t = d.point(t)).x - this.x,
                                    i = t.y - this.y;
                                return Math.sqrt(e * e + i * i)
                            },
                            equals: function (t) {
                                return (t = d.point(t)).x === this.x && t.y === this.y
                            },
                            contains: function (t) {
                                return t = d.point(t), Math.abs(t.x) <= Math.abs(this.x) && Math.abs(t.y) <= Math.abs(this.y)
                            },
                            toString: function () {
                                return "Point(" + d.Util.formatNum(this.x) + ", " + d.Util.formatNum(this.y) + ")"
                            }
                        }, d.point = function (t, e, i) {
                            return t instanceof d.Point ? t : d.Util.isArray(t) ? new d.Point(t[0], t[1]) : t === r || null === t ? t : new d.Point(t, e, i)
                        }, d.Bounds = function (t, e) {
                            if (t)
                                for (var i = e ? [t, e] : t, o = 0, n = i.length; o < n; o++) this.extend(i[o])
                        }, d.Bounds.prototype = {
                            extend: function (t) {
                                return t = d.point(t), this.min || this.max ? (this.min.x = Math.min(t.x, this.min.x), this.max.x = Math.max(t.x, this.max.x), this.min.y = Math.min(t.y, this.min.y), this.max.y = Math.max(t.y, this.max.y)) : (this.min = t.clone(), this.max = t.clone()), this
                            },
                            getCenter: function (t) {
                                return new d.Point((this.min.x + this.max.x) / 2, (this.min.y + this.max.y) / 2, t)
                            },
                            getBottomLeft: function () {
                                return new d.Point(this.min.x, this.max.y)
                            },
                            getTopRight: function () {
                                return new d.Point(this.max.x, this.min.y)
                            },
                            getSize: function () {
                                return this.max.subtract(this.min)
                            },
                            contains: function (t) {
                                var e, i;
                                return (t = "number" == typeof t[0] || t instanceof d.Point ? d.point(t) : d.bounds(t)) instanceof d.Bounds ? (e = t.min, i = t.max) : e = i = t, e.x >= this.min.x && i.x <= this.max.x && e.y >= this.min.y && i.y <= this.max.y
                            },
                            intersects: function (t) {
                                t = d.bounds(t);
                                var e = this.min,
                                    i = this.max,
                                    o = t.min,
                                    n = t.max,
                                    s = n.x >= e.x && o.x <= i.x,
                                    a = n.y >= e.y && o.y <= i.y;
                                return s && a
                            },
                            isValid: function () {
                                return !(!this.min || !this.max)
                            }
                        }, d.bounds = function (t, e) {
                            return !t || t instanceof d.Bounds ? t : new d.Bounds(t, e)
                        }, d.Transformation = function (t, e, i, o) {
                            this._a = t, this._b = e, this._c = i, this._d = o
                        }, d.Transformation.prototype = {
                            transform: function (t, e) {
                                return this._transform(t.clone(), e)
                            },
                            _transform: function (t, e) {
                                return e = e || 1, t.x = e * (this._a * t.x + this._b), t.y = e * (this._c * t.y + this._d), t
                            },
                            untransform: function (t, e) {
                                return e = e || 1, new d.Point((t.x / e - this._b) / this._a, (t.y / e - this._d) / this._c)
                            }
                        }, d.DomUtil = {
                            get: function (t) {
                                return "string" == typeof t ? a.getElementById(t) : t
                            },
                            getStyle: function (t, e) {
                                var i = t.style[e];
                                if (!i && t.currentStyle && (i = t.currentStyle[e]), (!i || "auto" === i) && a.defaultView) {
                                    var o = a.defaultView.getComputedStyle(t, null);
                                    i = o ? o[e] : null
                                }
                                return "auto" === i ? null : i
                            },
                            getViewportOffset: function (t) {
                                var e, i = 0,
                                    o = 0,
                                    n = t,
                                    s = a.body,
                                    r = a.documentElement;
                                do {
                                    if (i += n.offsetTop || 0, o += n.offsetLeft || 0, i += parseInt(d.DomUtil.getStyle(n, "borderTopWidth"), 10) || 0, o += parseInt(d.DomUtil.getStyle(n, "borderLeftWidth"), 10) || 0, e = d.DomUtil.getStyle(n, "position"), n.offsetParent === s && "absolute" === e) break;
                                    if ("fixed" === e) {
                                        i += s.scrollTop || r.scrollTop || 0, o += s.scrollLeft || r.scrollLeft || 0;
                                        break
                                    }
                                    if ("relative" === e && !n.offsetLeft) {
                                        var h = d.DomUtil.getStyle(n, "width"),
                                            l = d.DomUtil.getStyle(n, "max-width"),
                                            c = n.getBoundingClientRect();
                                        "none" === h && "none" === l || (o += c.left + n.clientLeft), i += c.top + (s.scrollTop || r.scrollTop || 0);
                                        break
                                    }
                                    n = n.offsetParent
                                } while (n);
                                n = t;
                                do {
                                    if (n === s) break;
                                    i -= n.scrollTop || 0, o -= n.scrollLeft || 0, n = n.parentNode
                                } while (n);
                                return new d.Point(o, i)
                            },
                            documentIsLtr: function () {
                                return d.DomUtil._docIsLtrCached || (d.DomUtil._docIsLtrCached = !0, d.DomUtil._docIsLtr = "ltr" === d.DomUtil.getStyle(a.body, "direction")), d.DomUtil._docIsLtr
                            },
                            create: function (t, e, i) {
                                var o = a.createElement(t);
                                return o.className = e, i && i.appendChild(o), o
                            },
                            hasClass: function (t, e) {
                                if (t.classList !== r) return t.classList.contains(e);
                                var i = d.DomUtil._getClass(t);
                                return i.length > 0 && new RegExp("(^|\\s)" + e + "(\\s|$)").test(i)
                            },
                            addClass: function (t, e) {
                                if (t.classList !== r)
                                    for (var i = d.Util.splitWords(e), o = 0, n = i.length; o < n; o++) t.classList.add(i[o]);
                                else if (!d.DomUtil.hasClass(t, e)) {
                                    var s = d.DomUtil._getClass(t);
                                    d.DomUtil._setClass(t, (s ? s + " " : "") + e)
                                }
                            },
                            removeClass: function (t, e) {
                                t.classList !== r ? t.classList.remove(e) : d.DomUtil._setClass(t, d.Util.trim((" " + d.DomUtil._getClass(t) + " ").replace(" " + e + " ", " ")))
                            },
                            _setClass: function (t, e) {
                                t.className.baseVal === r ? t.className = e : t.className.baseVal = e
                            },
                            _getClass: function (t) {
                                return t.className.baseVal === r ? t.className : t.className.baseVal
                            },
                            setOpacity: function (t, e) {
                                if ("opacity" in t.style) t.style.opacity = e;
                                else if ("filter" in t.style) {
                                    var i = !1,
                                        o = "DXImageTransform.Microsoft.Alpha";
                                    try {
                                        i = t.filters.item(o)
                                    } catch (t) {
                                        if (1 === e) return
                                    }
                                    e = Math.round(100 * e), i ? (i.Enabled = 100 !== e, i.Opacity = e) : t.style.filter += " progid:" + o + "(opacity=" + e + ")"
                                }
                            },
                            testProp: function (t) {
                                for (var e = a.documentElement.style, i = 0; i < t.length; i++)
                                    if (t[i] in e) return t[i];
                                return !1
                            },
                            getTranslateString: function (t) {
                                var e = d.Browser.webkit3d,
                                    i = (e ? ",0" : "") + ")";
                                return "translate" + (e ? "3d" : "") + "(" + t.x + "px," + t.y + "px" + i
                            },
                            getScaleString: function (t, e) {
                                return d.DomUtil.getTranslateString(e.add(e.multiplyBy(-1 * t))) + (" scale(" + t + ") ")
                            },
                            setPosition: function (t, e, i) {
                                t._leaflet_pos = e, !i && d.Browser.any3d ? t.style[d.DomUtil.TRANSFORM] = d.DomUtil.getTranslateString(e) : (t.style.left = e.x + "px", t.style.top = e.y + "px")
                            },
                            getPosition: function (t) {
                                return t._leaflet_pos
                            }
                        }, d.DomUtil.TRANSFORM = d.DomUtil.testProp(["transform", "WebkitTransform", "OTransform", "MozTransform", "msTransform"]), d.DomUtil.TRANSITION = d.DomUtil.testProp(["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]), d.DomUtil.TRANSITION_END = "webkitTransition" === d.DomUtil.TRANSITION || "OTransition" === d.DomUtil.TRANSITION ? d.DomUtil.TRANSITION + "End" : "transitionend",
                        function () {
                            if ("onselectstart" in a) d.extend(d.DomUtil, {
                                disableTextSelection: function () {
                                    d.DomEvent.on(s, "selectstart", d.DomEvent.preventDefault)
                                },
                                enableTextSelection: function () {
                                    d.DomEvent.off(s, "selectstart", d.DomEvent.preventDefault)
                                }
                            });
                            else {
                                var t = d.DomUtil.testProp(["userSelect", "WebkitUserSelect", "OUserSelect", "MozUserSelect", "msUserSelect"]);
                                d.extend(d.DomUtil, {
                                    disableTextSelection: function () {
                                        if (t) {
                                            var e = a.documentElement.style;
                                            this._userSelect = e[t], e[t] = "none"
                                        }
                                    },
                                    enableTextSelection: function () {
                                        t && (a.documentElement.style[t] = this._userSelect, delete this._userSelect)
                                    }
                                })
                            }
                            d.extend(d.DomUtil, {
                                disableImageDrag: function () {
                                    d.DomEvent.on(s, "dragstart", d.DomEvent.preventDefault)
                                },
                                enableImageDrag: function () {
                                    d.DomEvent.off(s, "dragstart", d.DomEvent.preventDefault)
                                }
                            })
                        }(), d.LatLng = function (t, e, i) {
                            if (t = parseFloat(t), e = parseFloat(e), isNaN(t) || isNaN(e)) throw new Error("Invalid LatLng object: (" + t + ", " + e + ")");
                            this.lat = t, this.lng = e, i !== r && (this.alt = parseFloat(i))
                        }, d.extend(d.LatLng, {
                            DEG_TO_RAD: Math.PI / 180,
                            RAD_TO_DEG: 180 / Math.PI,
                            MAX_MARGIN: 1e-9
                        }), d.LatLng.prototype = {
                            equals: function (t) {
                                return !!t && (t = d.latLng(t), Math.max(Math.abs(this.lat - t.lat), Math.abs(this.lng - t.lng)) <= d.LatLng.MAX_MARGIN)
                            },
                            toString: function (t) {
                                return "LatLng(" + d.Util.formatNum(this.lat, t) + ", " + d.Util.formatNum(this.lng, t) + ")"
                            },
                            distanceTo: function (t) {
                                t = d.latLng(t);
                                var e = d.LatLng.DEG_TO_RAD,
                                    i = (t.lat - this.lat) * e,
                                    o = (t.lng - this.lng) * e,
                                    n = this.lat * e,
                                    s = t.lat * e,
                                    a = Math.sin(i / 2),
                                    r = Math.sin(o / 2),
                                    h = a * a + r * r * Math.cos(n) * Math.cos(s);
                                return 12756274 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h))
                            },
                            wrap: function (t, e) {
                                var i = this.lng;
                                return i = (i + (e = e || 180)) % (e - (t = t || -180)) + (i < t || i === e ? e : t), new d.LatLng(this.lat, i)
                            }
                        }, d.latLng = function (t, e) {
                            return t instanceof d.LatLng ? t : d.Util.isArray(t) ? "number" == typeof t[0] || "string" == typeof t[0] ? new d.LatLng(t[0], t[1], t[2]) : null : t === r || null === t ? t : "object" == typeof t && "lat" in t ? new d.LatLng(t.lat, "lng" in t ? t.lng : t.lon) : e === r ? null : new d.LatLng(t, e)
                        }, d.LatLngBounds = function (t, e) {
                            if (t)
                                for (var i = e ? [t, e] : t, o = 0, n = i.length; o < n; o++) this.extend(i[o])
                        }, d.LatLngBounds.prototype = {
                            extend: function (t) {
                                if (!t) return this;
                                var e = d.latLng(t);
                                return (t = null !== e ? e : d.latLngBounds(t)) instanceof d.LatLng ? this._southWest || this._northEast ? (this._southWest.lat = Math.min(t.lat, this._southWest.lat), this._southWest.lng = Math.min(t.lng, this._southWest.lng), this._northEast.lat = Math.max(t.lat, this._northEast.lat), this._northEast.lng = Math.max(t.lng, this._northEast.lng)) : (this._southWest = new d.LatLng(t.lat, t.lng), this._northEast = new d.LatLng(t.lat, t.lng)) : t instanceof d.LatLngBounds && (this.extend(t._southWest), this.extend(t._northEast)), this
                            },
                            pad: function (t) {
                                var e = this._southWest,
                                    i = this._northEast,
                                    o = Math.abs(e.lat - i.lat) * t,
                                    n = Math.abs(e.lng - i.lng) * t;
                                return new d.LatLngBounds(new d.LatLng(e.lat - o, e.lng - n), new d.LatLng(i.lat + o, i.lng + n))
                            },
                            getCenter: function () {
                                return new d.LatLng((this._southWest.lat + this._northEast.lat) / 2, (this._southWest.lng + this._northEast.lng) / 2)
                            },
                            getSouthWest: function () {
                                return this._southWest
                            },
                            getNorthEast: function () {
                                return this._northEast
                            },
                            getNorthWest: function () {
                                return new d.LatLng(this.getNorth(), this.getWest())
                            },
                            getSouthEast: function () {
                                return new d.LatLng(this.getSouth(), this.getEast())
                            },
                            getWest: function () {
                                return this._southWest.lng
                            },
                            getSouth: function () {
                                return this._southWest.lat
                            },
                            getEast: function () {
                                return this._northEast.lng
                            },
                            getNorth: function () {
                                return this._northEast.lat
                            },
                            contains: function (t) {
                                t = "number" == typeof t[0] || t instanceof d.LatLng ? d.latLng(t) : d.latLngBounds(t);
                                var e, i, o = this._southWest,
                                    n = this._northEast;
                                return t instanceof d.LatLngBounds ? (e = t.getSouthWest(), i = t.getNorthEast()) : e = i = t, e.lat >= o.lat && i.lat <= n.lat && e.lng >= o.lng && i.lng <= n.lng
                            },
                            intersects: function (t) {
                                t = d.latLngBounds(t);
                                var e = this._southWest,
                                    i = this._northEast,
                                    o = t.getSouthWest(),
                                    n = t.getNorthEast(),
                                    s = n.lat >= e.lat && o.lat <= i.lat,
                                    a = n.lng >= e.lng && o.lng <= i.lng;
                                return s && a
                            },
                            toBBoxString: function () {
                                return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(",")
                            },
                            equals: function (t) {
                                return !!t && (t = d.latLngBounds(t), this._southWest.equals(t.getSouthWest()) && this._northEast.equals(t.getNorthEast()))
                            },
                            isValid: function () {
                                return !(!this._southWest || !this._northEast)
                            }
                        }, d.latLngBounds = function (t, e) {
                            return !t || t instanceof d.LatLngBounds ? t : new d.LatLngBounds(t, e)
                        }, d.Projection = {}, d.Projection.SphericalMercator = {
                            MAX_LATITUDE: 85.0511287798,
                            project: function (t) {
                                var e = d.LatLng.DEG_TO_RAD,
                                    i = this.MAX_LATITUDE,
                                    o = Math.max(Math.min(i, t.lat), -i),
                                    n = t.lng * e,
                                    s = o * e;
                                return s = Math.log(Math.tan(Math.PI / 4 + s / 2)), new d.Point(n, s)
                            },
                            unproject: function (t) {
                                var e = d.LatLng.RAD_TO_DEG,
                                    i = t.x * e,
                                    o = (2 * Math.atan(Math.exp(t.y)) - Math.PI / 2) * e;
                                return new d.LatLng(o, i)
                            }
                        }, d.Projection.LonLat = {
                            project: function (t) {
                                return new d.Point(t.lng, t.lat)
                            },
                            unproject: function (t) {
                                return new d.LatLng(t.y, t.x)
                            }
                        }, d.CRS = {
                            latLngToPoint: function (t, e) {
                                var i = this.projection.project(t),
                                    o = this.scale(e);
                                return this.transformation._transform(i, o)
                            },
                            pointToLatLng: function (t, e) {
                                var i = this.scale(e),
                                    o = this.transformation.untransform(t, i);
                                return this.projection.unproject(o)
                            },
                            project: function (t) {
                                return this.projection.project(t)
                            },
                            scale: function (t) {
                                return 256 * Math.pow(2, t)
                            },
                            getSize: function (t) {
                                var e = this.scale(t);
                                return d.point(e, e)
                            }
                        }, d.CRS.Simple = d.extend({}, d.CRS, {
                            projection: d.Projection.LonLat,
                            transformation: new d.Transformation(1, 0, -1, 0),
                            scale: function (t) {
                                return Math.pow(2, t)
                            }
                        }), d.CRS.EPSG3857 = d.extend({}, d.CRS, {
                            code: "EPSG:3857",
                            projection: d.Projection.SphericalMercator,
                            transformation: new d.Transformation(.5 / Math.PI, .5, -.5 / Math.PI, .5),
                            project: function (t) {
                                return this.projection.project(t).multiplyBy(6378137)
                            }
                        }), d.CRS.EPSG900913 = d.extend({}, d.CRS.EPSG3857, {
                            code: "EPSG:900913"
                        }), d.CRS.EPSG4326 = d.extend({}, d.CRS, {
                            code: "EPSG:4326",
                            projection: d.Projection.LonLat,
                            transformation: new d.Transformation(1 / 360, .5, -1 / 360, .5)
                        }), d.Map = d.Class.extend({
                            includes: d.Mixin.Events,
                            options: {
                                crs: d.CRS.EPSG3857,
                                fadeAnimation: d.DomUtil.TRANSITION && !d.Browser.android23,
                                trackResize: !0,
                                markerZoomAnimation: d.DomUtil.TRANSITION && d.Browser.any3d
                            },
                            initialize: function (t, e) {
                                e = d.setOptions(this, e), this._initContainer(t), this._initLayout(), this._onResize = d.bind(this._onResize, this), this._initEvents(), e.maxBounds && this.setMaxBounds(e.maxBounds), e.center && e.zoom !== r && this.setView(d.latLng(e.center), e.zoom, {
                                    reset: !0
                                }), this._handlers = [], this._layers = {}, this._zoomBoundLayers = {}, this._tileLayersNum = 0, this.callInitHooks(), this._addLayers(e.layers)
                            },
                            setView: function (t, e) {
                                return e = e === r ? this.getZoom() : e, this._resetView(d.latLng(t), this._limitZoom(e)), this
                            },
                            setZoom: function (t, e) {
                                return this._loaded ? this.setView(this.getCenter(), t, {
                                    zoom: e
                                }) : (this._zoom = this._limitZoom(t), this)
                            },
                            zoomIn: function (t, e) {
                                return this.setZoom(this._zoom + (t || 1), e)
                            },
                            zoomOut: function (t, e) {
                                return this.setZoom(this._zoom - (t || 1), e)
                            },
                            setZoomAround: function (t, e, i) {
                                var o = this.getZoomScale(e),
                                    n = this.getSize().divideBy(2),
                                    s = (t instanceof d.Point ? t : this.latLngToContainerPoint(t)).subtract(n).multiplyBy(1 - 1 / o),
                                    a = this.containerPointToLatLng(n.add(s));
                                return this.setView(a, e, {
                                    zoom: i
                                })
                            },
                            fitBounds: function (t, e) {
                                e = e || {}, t = t.getBounds ? t.getBounds() : d.latLngBounds(t);
                                var i = d.point(e.paddingTopLeft || e.padding || [0, 0]),
                                    o = d.point(e.paddingBottomRight || e.padding || [0, 0]),
                                    n = this.getBoundsZoom(t, !1, i.add(o));
                                n = e.maxZoom ? Math.min(e.maxZoom, n) : n;
                                var s = o.subtract(i).divideBy(2),
                                    a = this.project(t.getSouthWest(), n),
                                    r = this.project(t.getNorthEast(), n),
                                    h = this.unproject(a.add(r).divideBy(2).add(s), n);
                                return this.setView(h, n, e)
                            },
                            fitWorld: function (t) {
                                return this.fitBounds([
                                    [-90, -180],
                                    [90, 180]
                                ], t)
                            },
                            panTo: function (t, e) {
                                return this.setView(t, this._zoom, {
                                    pan: e
                                })
                            },
                            panBy: function (t) {
                                return this.fire("movestart"), this._rawPanBy(d.point(t)), this.fire("move"), this.fire("moveend")
                            },
                            setMaxBounds: function (t) {
                                return t = d.latLngBounds(t), this.options.maxBounds = t, t ? (this._loaded && this._panInsideMaxBounds(), this.on("moveend", this._panInsideMaxBounds, this)) : this.off("moveend", this._panInsideMaxBounds, this)
                            },
                            panInsideBounds: function (t, e) {
                                var i = this.getCenter(),
                                    o = this._limitCenter(i, this._zoom, t);
                                return i.equals(o) ? this : this.panTo(o, e)
                            },
                            addLayer: function (t) {
                                var e = d.stamp(t);
                                return this._layers[e] || (this._layers[e] = t, !t.options || isNaN(t.options.maxZoom) && isNaN(t.options.minZoom) || (this._zoomBoundLayers[e] = t, this._updateZoomLevels()), this.options.zoomAnimation && d.TileLayer && t instanceof d.TileLayer && (this._tileLayersNum++, this._tileLayersToLoad++, t.on("load", this._onTileLayerLoad, this)), this._loaded && this._layerAdd(t)), this
                            },
                            removeLayer: function (t) {
                                var e = d.stamp(t);
                                return this._layers[e] ? (this._loaded && t.onRemove(this), delete this._layers[e], this._loaded && this.fire("layerremove", {
                                    layer: t
                                }), this._zoomBoundLayers[e] && (delete this._zoomBoundLayers[e], this._updateZoomLevels()), this.options.zoomAnimation && d.TileLayer && t instanceof d.TileLayer && (this._tileLayersNum--, this._tileLayersToLoad--, t.off("load", this._onTileLayerLoad, this)), this) : this
                            },
                            hasLayer: function (t) {
                                return !!t && d.stamp(t) in this._layers
                            },
                            eachLayer: function (t, e) {
                                for (var i in this._layers) t.call(e, this._layers[i]);
                                return this
                            },
                            invalidateSize: function (t) {
                                if (!this._loaded) return this;
                                t = d.extend({
                                    animate: !1,
                                    pan: !0
                                }, !0 === t ? {
                                    animate: !0
                                } : t);
                                var e = this.getSize();
                                this._sizeChanged = !0, this._initialCenter = null;
                                var i = this.getSize(),
                                    o = e.divideBy(2).round(),
                                    n = i.divideBy(2).round(),
                                    s = o.subtract(n);
                                return s.x || s.y ? (t.animate && t.pan ? this.panBy(s) : (t.pan && this._rawPanBy(s), this.fire("move"), t.debounceMoveend ? (clearTimeout(this._sizeTimer), this._sizeTimer = setTimeout(d.bind(this.fire, this, "moveend"), 200)) : this.fire("moveend")), this.fire("resize", {
                                    oldSize: e,
                                    newSize: i
                                })) : this
                            },
                            addHandler: function (t, e) {
                                if (!e) return this;
                                var i = this[t] = new e(this);
                                return this._handlers.push(i), this.options[t] && i.enable(), this
                            },
                            remove: function () {
                                this._loaded && this.fire("unload"), this._initEvents("off");
                                try {
                                    delete this._container._leaflet
                                } catch (t) {
                                    this._container._leaflet = r
                                }
                                return this._clearPanes(), this._clearControlPos && this._clearControlPos(), this._clearHandlers(), this
                            },
                            getCenter: function () {
                                return this._checkIfLoaded(), this._initialCenter && !this._moved() ? this._initialCenter : this.layerPointToLatLng(this._getCenterLayerPoint())
                            },
                            getZoom: function () {
                                return this._zoom
                            },
                            getBounds: function () {
                                var t = this.getPixelBounds(),
                                    e = this.unproject(t.getBottomLeft()),
                                    i = this.unproject(t.getTopRight());
                                return new d.LatLngBounds(e, i)
                            },
                            getMinZoom: function () {
                                return this.options.minZoom === r ? this._layersMinZoom === r ? 0 : this._layersMinZoom : this.options.minZoom
                            },
                            getMaxZoom: function () {
                                return this.options.maxZoom === r ? this._layersMaxZoom === r ? 1 / 0 : this._layersMaxZoom : this.options.maxZoom
                            },
                            getBoundsZoom: function (t, e, i) {
                                t = d.latLngBounds(t);
                                var o, n = this.getMinZoom() - (e ? 1 : 0),
                                    s = this.getMaxZoom(),
                                    a = this.getSize(),
                                    r = t.getNorthWest(),
                                    h = t.getSouthEast(),
                                    l = !0;
                                i = d.point(i || [0, 0]);
                                do {
                                    n++, o = this.project(h, n).subtract(this.project(r, n)).add(i), l = e ? o.x < a.x || o.y < a.y : a.contains(o)
                                } while (l && n <= s);
                                return l && e ? null : e ? n : n - 1
                            },
                            getSize: function () {
                                return this._size && !this._sizeChanged || (this._size = new d.Point(this._container.clientWidth, this._container.clientHeight), this._sizeChanged = !1), this._size.clone()
                            },
                            getPixelBounds: function () {
                                var t = this._getTopLeftPoint();
                                return new d.Bounds(t, t.add(this.getSize()))
                            },
                            getPixelOrigin: function () {
                                return this._checkIfLoaded(), this._initialTopLeftPoint
                            },
                            getPanes: function () {
                                return this._panes
                            },
                            getContainer: function () {
                                return this._container
                            },
                            getZoomScale: function (t) {
                                var e = this.options.crs;
                                return e.scale(t) / e.scale(this._zoom)
                            },
                            getScaleZoom: function (t) {
                                return this._zoom + Math.log(t) / Math.LN2
                            },
                            project: function (t, e) {
                                return e = e === r ? this._zoom : e, this.options.crs.latLngToPoint(d.latLng(t), e)
                            },
                            unproject: function (t, e) {
                                return e = e === r ? this._zoom : e, this.options.crs.pointToLatLng(d.point(t), e)
                            },
                            layerPointToLatLng: function (t) {
                                var e = d.point(t).add(this.getPixelOrigin());
                                return this.unproject(e)
                            },
                            latLngToLayerPoint: function (t) {
                                return this.project(d.latLng(t))._round()._subtract(this.getPixelOrigin())
                            },
                            containerPointToLayerPoint: function (t) {
                                return d.point(t).subtract(this._getMapPanePos())
                            },
                            layerPointToContainerPoint: function (t) {
                                return d.point(t).add(this._getMapPanePos())
                            },
                            containerPointToLatLng: function (t) {
                                var e = this.containerPointToLayerPoint(d.point(t));
                                return this.layerPointToLatLng(e)
                            },
                            latLngToContainerPoint: function (t) {
                                return this.layerPointToContainerPoint(this.latLngToLayerPoint(d.latLng(t)))
                            },
                            mouseEventToContainerPoint: function (t) {
                                return d.DomEvent.getMousePosition(t, this._container)
                            },
                            mouseEventToLayerPoint: function (t) {
                                return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(t))
                            },
                            mouseEventToLatLng: function (t) {
                                return this.layerPointToLatLng(this.mouseEventToLayerPoint(t))
                            },
                            _initContainer: function (t) {
                                var e = this._container = d.DomUtil.get(t);
                                if (!e) throw new Error("Map container not found.");
                                if (e._leaflet) throw new Error("Map container is already initialized.");
                                e._leaflet = !0
                            },
                            _initLayout: function () {
                                var t = this._container;
                                d.DomUtil.addClass(t, "leaflet-container" + (d.Browser.touch ? " leaflet-touch" : "") + (d.Browser.retina ? " leaflet-retina" : "") + (d.Browser.ielt9 ? " leaflet-oldie" : "") + (this.options.fadeAnimation ? " leaflet-fade-anim" : ""));
                                var e = d.DomUtil.getStyle(t, "position");
                                "absolute" !== e && "relative" !== e && "fixed" !== e && (t.style.position = "relative"), this._initPanes(), this._initControlPos && this._initControlPos()
                            },
                            _initPanes: function () {
                                var t = this._panes = {};
                                this._mapPane = t.mapPane = this._createPane("leaflet-map-pane", this._container), this._tilePane = t.tilePane = this._createPane("leaflet-tile-pane", this._mapPane), t.objectsPane = this._createPane("leaflet-objects-pane", this._mapPane), t.shadowPane = this._createPane("leaflet-shadow-pane"), t.overlayPane = this._createPane("leaflet-overlay-pane"), t.markerPane = this._createPane("leaflet-marker-pane"), t.popupPane = this._createPane("leaflet-popup-pane");
                                var e = " leaflet-zoom-hide";
                                this.options.markerZoomAnimation || (d.DomUtil.addClass(t.markerPane, e), d.DomUtil.addClass(t.shadowPane, e), d.DomUtil.addClass(t.popupPane, e))
                            },
                            _createPane: function (t, e) {
                                return d.DomUtil.create("div", t, e || this._panes.objectsPane)
                            },
                            _clearPanes: function () {
                                this._container.removeChild(this._mapPane)
                            },
                            _addLayers: function (t) {
                                for (var e = 0, i = (t = t ? d.Util.isArray(t) ? t : [t] : []).length; e < i; e++) this.addLayer(t[e])
                            },
                            _resetView: function (t, e, i, o) {
                                var n = this._zoom !== e;
                                o || (this.fire("movestart"), n && this.fire("zoomstart")), this._zoom = e, this._initialCenter = t, this._initialTopLeftPoint = this._getNewTopLeftPoint(t), i ? this._initialTopLeftPoint._add(this._getMapPanePos()) : d.DomUtil.setPosition(this._mapPane, new d.Point(0, 0)), this._tileLayersToLoad = this._tileLayersNum;
                                var s = !this._loaded;
                                this._loaded = !0, this.fire("viewreset", {
                                    hard: !i
                                }), s && (this.fire("load"), this.eachLayer(this._layerAdd, this)), this.fire("move"), (n || o) && this.fire("zoomend"), this.fire("moveend", {
                                    hard: !i
                                })
                            },
                            _rawPanBy: function (t) {
                                d.DomUtil.setPosition(this._mapPane, this._getMapPanePos().subtract(t))
                            },
                            _getZoomSpan: function () {
                                return this.getMaxZoom() - this.getMinZoom()
                            },
                            _updateZoomLevels: function () {
                                var t, e = 1 / 0,
                                    i = -1 / 0,
                                    o = this._getZoomSpan();
                                for (t in this._zoomBoundLayers) {
                                    var n = this._zoomBoundLayers[t];
                                    isNaN(n.options.minZoom) || (e = Math.min(e, n.options.minZoom)), isNaN(n.options.maxZoom) || (i = Math.max(i, n.options.maxZoom))
                                }
                                t === r ? this._layersMaxZoom = this._layersMinZoom = r : (this._layersMaxZoom = i, this._layersMinZoom = e), o !== this._getZoomSpan() && this.fire("zoomlevelschange")
                            },
                            _panInsideMaxBounds: function () {
                                this.panInsideBounds(this.options.maxBounds)
                            },
                            _checkIfLoaded: function () {
                                if (!this._loaded) throw new Error("Set map center and zoom first.")
                            },
                            _initEvents: function (t) {
                                if (d.DomEvent) {
                                    t = t || "on", d.DomEvent[t](this._container, "click", this._onMouseClick, this);
                                    var e, i, o = ["dblclick", "mousedown", "mouseup", "mouseenter", "mouseleave", "mousemove", "contextmenu"];
                                    for (e = 0, i = o.length; e < i; e++) d.DomEvent[t](this._container, o[e], this._fireMouseEvent, this);
                                    this.options.trackResize && d.DomEvent[t](s, "resize", this._onResize, this)
                                }
                            },
                            _onResize: function () {
                                d.Util.cancelAnimFrame(this._resizeRequest), this._resizeRequest = d.Util.requestAnimFrame((function () {
                                    this.invalidateSize({
                                        debounceMoveend: !0
                                    })
                                }), this, !1, this._container)
                            },
                            _onMouseClick: function (t) {
                                !this._loaded || !t._simulated && (this.dragging && this.dragging.moved() || this.boxZoom && this.boxZoom.moved()) || d.DomEvent._skipped(t) || (this.fire("preclick"), this._fireMouseEvent(t))
                            },
                            _fireMouseEvent: function (t) {
                                if (this._loaded && !d.DomEvent._skipped(t)) {
                                    var e = t.type;
                                    if (e = "mouseenter" === e ? "mouseover" : "mouseleave" === e ? "mouseout" : e, this.hasEventListeners(e)) {
                                        "contextmenu" === e && d.DomEvent.preventDefault(t);
                                        var i = this.mouseEventToContainerPoint(t),
                                            o = this.containerPointToLayerPoint(i),
                                            n = this.layerPointToLatLng(o);
                                        this.fire(e, {
                                            latlng: n,
                                            layerPoint: o,
                                            containerPoint: i,
                                            originalEvent: t
                                        })
                                    }
                                }
                            },
                            _onTileLayerLoad: function () {
                                this._tileLayersToLoad--, this._tileLayersNum && !this._tileLayersToLoad && this.fire("tilelayersload")
                            },
                            _clearHandlers: function () {
                                for (var t = 0, e = this._handlers.length; t < e; t++) this._handlers[t].disable()
                            },
                            whenReady: function (t, e) {
                                return this._loaded ? t.call(e || this, this) : this.on("load", t, e), this
                            },
                            _layerAdd: function (t) {
                                t.onAdd(this), this.fire("layeradd", {
                                    layer: t
                                })
                            },
                            _getMapPanePos: function () {
                                return d.DomUtil.getPosition(this._mapPane)
                            },
                            _moved: function () {
                                var t = this._getMapPanePos();
                                return t && !t.equals([0, 0])
                            },
                            _getTopLeftPoint: function () {
                                return this.getPixelOrigin().subtract(this._getMapPanePos())
                            },
                            _getNewTopLeftPoint: function (t, e) {
                                var i = this.getSize()._divideBy(2);
                                return this.project(t, e)._subtract(i)._round()
                            },
                            _latLngToNewLayerPoint: function (t, e, i) {
                                var o = this._getNewTopLeftPoint(i, e).add(this._getMapPanePos());
                                return this.project(t, e)._subtract(o)
                            },
                            _getCenterLayerPoint: function () {
                                return this.containerPointToLayerPoint(this.getSize()._divideBy(2))
                            },
                            _getCenterOffset: function (t) {
                                return this.latLngToLayerPoint(t).subtract(this._getCenterLayerPoint())
                            },
                            _limitCenter: function (t, e, i) {
                                if (!i) return t;
                                var o = this.project(t, e),
                                    n = this.getSize().divideBy(2),
                                    s = new d.Bounds(o.subtract(n), o.add(n)),
                                    a = this._getBoundsOffset(s, i, e);
                                return this.unproject(o.add(a), e)
                            },
                            _limitOffset: function (t, e) {
                                if (!e) return t;
                                var i = this.getPixelBounds(),
                                    o = new d.Bounds(i.min.add(t), i.max.add(t));
                                return t.add(this._getBoundsOffset(o, e))
                            },
                            _getBoundsOffset: function (t, e, i) {
                                var o = this.project(e.getNorthWest(), i).subtract(t.min),
                                    n = this.project(e.getSouthEast(), i).subtract(t.max),
                                    s = this._rebound(o.x, -n.x),
                                    a = this._rebound(o.y, -n.y);
                                return new d.Point(s, a)
                            },
                            _rebound: function (t, e) {
                                return t + e > 0 ? Math.round(t - e) / 2 : Math.max(0, Math.ceil(t)) - Math.max(0, Math.floor(e))
                            },
                            _limitZoom: function (t) {
                                var e = this.getMinZoom(),
                                    i = this.getMaxZoom();
                                return Math.max(e, Math.min(i, t))
                            }
                        }), d.map = function (t, e) {
                            return new d.Map(t, e)
                        }, d.Projection.Mercator = {
                            MAX_LATITUDE: 85.0840591556,
                            R_MINOR: 6356752.314245179,
                            R_MAJOR: 6378137,
                            project: function (t) {
                                var e = d.LatLng.DEG_TO_RAD,
                                    i = this.MAX_LATITUDE,
                                    o = Math.max(Math.min(i, t.lat), -i),
                                    n = this.R_MAJOR,
                                    s = this.R_MINOR,
                                    a = t.lng * e * n,
                                    r = o * e,
                                    h = s / n,
                                    l = Math.sqrt(1 - h * h),
                                    c = l * Math.sin(r);
                                c = Math.pow((1 - c) / (1 + c), .5 * l);
                                var p = Math.tan(.5 * (.5 * Math.PI - r)) / c;
                                return r = -n * Math.log(p), new d.Point(a, r)
                            },
                            unproject: function (t) {
                                for (var e, i = d.LatLng.RAD_TO_DEG, o = this.R_MAJOR, n = this.R_MINOR, s = t.x * i / o, a = n / o, r = Math.sqrt(1 - a * a), h = Math.exp(-t.y / o), l = Math.PI / 2 - 2 * Math.atan(h), c = 15, p = .1; Math.abs(p) > 1e-7 && --c > 0;) e = r * Math.sin(l), l += p = Math.PI / 2 - 2 * Math.atan(h * Math.pow((1 - e) / (1 + e), .5 * r)) - l;
                                return new d.LatLng(l * i, s)
                            }
                        }, d.CRS.EPSG3395 = d.extend({}, d.CRS, {
                            code: "EPSG:3395",
                            projection: d.Projection.Mercator,
                            transformation: (O = d.Projection.Mercator.R_MAJOR, z = .5 / (Math.PI * O), new d.Transformation(z, .5, -z, .5))
                        }), d.TileLayer = d.Class.extend({
                            includes: d.Mixin.Events,
                            options: {
                                minZoom: 0,
                                maxZoom: 18,
                                tileSize: 256,
                                subdomains: "abc",
                                errorTileUrl: "",
                                attribution: "",
                                zoomOffset: 0,
                                opacity: 1,
                                unloadInvisibleTiles: d.Browser.mobile,
                                updateWhenIdle: d.Browser.mobile
                            },
                            initialize: function (t, e) {
                                (e = d.setOptions(this, e)).detectRetina && d.Browser.retina && e.maxZoom > 0 && (e.tileSize = Math.floor(e.tileSize / 2), e.zoomOffset++, e.minZoom > 0 && e.minZoom--, this.options.maxZoom--), e.bounds && (e.bounds = d.latLngBounds(e.bounds)), this._url = t;
                                var i = this.options.subdomains;
                                "string" == typeof i && (this.options.subdomains = i.split(""))
                            },
                            onAdd: function (t) {
                                this._map = t, this._animated = t._zoomAnimated, this._initContainer(), t.on({
                                    viewreset: this._reset,
                                    moveend: this._update
                                }, this), this._animated && t.on({
                                    zoomanim: this._animateZoom,
                                    zoomend: this._endZoomAnim
                                }, this), this.options.updateWhenIdle || (this._limitedUpdate = d.Util.limitExecByInterval(this._update, 150, this), t.on("move", this._limitedUpdate, this)), this._reset(), this._update()
                            },
                            addTo: function (t) {
                                return t.addLayer(this), this
                            },
                            onRemove: function (t) {
                                this._container.parentNode.removeChild(this._container), t.off({
                                    viewreset: this._reset,
                                    moveend: this._update
                                }, this), this._animated && t.off({
                                    zoomanim: this._animateZoom,
                                    zoomend: this._endZoomAnim
                                }, this), this.options.updateWhenIdle || t.off("move", this._limitedUpdate, this), this._container = null, this._map = null
                            },
                            bringToFront: function () {
                                var t = this._map._panes.tilePane;
                                return this._container && (t.appendChild(this._container), this._setAutoZIndex(t, Math.max)), this
                            },
                            bringToBack: function () {
                                var t = this._map._panes.tilePane;
                                return this._container && (t.insertBefore(this._container, t.firstChild), this._setAutoZIndex(t, Math.min)), this
                            },
                            getAttribution: function () {
                                return this.options.attribution
                            },
                            getContainer: function () {
                                return this._container
                            },
                            setOpacity: function (t) {
                                return this.options.opacity = t, this._map && this._updateOpacity(), this
                            },
                            setZIndex: function (t) {
                                return this.options.zIndex = t, this._updateZIndex(), this
                            },
                            setUrl: function (t, e) {
                                return this._url = t, e || this.redraw(), this
                            },
                            redraw: function () {
                                return this._map && (this._reset({
                                    hard: !0
                                }), this._update()), this
                            },
                            _updateZIndex: function () {
                                this._container && this.options.zIndex !== r && (this._container.style.zIndex = this.options.zIndex)
                            },
                            _setAutoZIndex: function (t, e) {
                                var i, o, n, s = t.children,
                                    a = -e(1 / 0, -1 / 0);
                                for (o = 0, n = s.length; o < n; o++) s[o] !== this._container && (i = parseInt(s[o].style.zIndex, 10), isNaN(i) || (a = e(a, i)));
                                this.options.zIndex = this._container.style.zIndex = (isFinite(a) ? a : 0) + e(1, -1)
                            },
                            _updateOpacity: function () {
                                var t, e = this._tiles;
                                if (d.Browser.ielt9)
                                    for (t in e) d.DomUtil.setOpacity(e[t], this.options.opacity);
                                else d.DomUtil.setOpacity(this._container, this.options.opacity)
                            },
                            _initContainer: function () {
                                var t = this._map._panes.tilePane;
                                if (!this._container) {
                                    if (this._container = d.DomUtil.create("div", "leaflet-layer"), this._updateZIndex(), this._animated) {
                                        var e = "leaflet-tile-container";
                                        this._bgBuffer = d.DomUtil.create("div", e, this._container), this._tileContainer = d.DomUtil.create("div", e, this._container)
                                    } else this._tileContainer = this._container;
                                    t.appendChild(this._container), this.options.opacity < 1 && this._updateOpacity()
                                }
                            },
                            _reset: function (t) {
                                for (var e in this._tiles) this.fire("tileunload", {
                                    tile: this._tiles[e]
                                });
                                this._tiles = {}, this._tilesToLoad = 0, this.options.reuseTiles && (this._unusedTiles = []), this._tileContainer.innerHTML = "", this._animated && t && t.hard && this._clearBgBuffer(), this._initContainer()
                            },
                            _getTileSize: function () {
                                var t = this._map,
                                    e = t.getZoom() + this.options.zoomOffset,
                                    i = this.options.maxNativeZoom,
                                    o = this.options.tileSize;
                                return i && e > i && (o = Math.round(t.getZoomScale(e) / t.getZoomScale(i) * o)), o
                            },
                            _update: function () {
                                if (this._map) {
                                    var t = this._map,
                                        e = t.getPixelBounds(),
                                        i = t.getZoom(),
                                        o = this._getTileSize();
                                    if (!(i > this.options.maxZoom || i < this.options.minZoom)) {
                                        var n = d.bounds(e.min.divideBy(o)._floor(), e.max.divideBy(o)._floor());
                                        this._addTilesFromCenterOut(n), (this.options.unloadInvisibleTiles || this.options.reuseTiles) && this._removeOtherTiles(n)
                                    }
                                }
                            },
                            _addTilesFromCenterOut: function (t) {
                                var e, i, o, n = [],
                                    s = t.getCenter();
                                for (e = t.min.y; e <= t.max.y; e++)
                                    for (i = t.min.x; i <= t.max.x; i++) o = new d.Point(i, e), this._tileShouldBeLoaded(o) && n.push(o);
                                var r = n.length;
                                if (0 !== r) {
                                    n.sort((function (t, e) {
                                        return t.distanceTo(s) - e.distanceTo(s)
                                    }));
                                    var h = a.createDocumentFragment();
                                    for (this._tilesToLoad || this.fire("loading"), this._tilesToLoad += r, i = 0; i < r; i++) this._addTile(n[i], h);
                                    this._tileContainer.appendChild(h)
                                }
                            },
                            _tileShouldBeLoaded: function (t) {
                                if (t.x + ":" + t.y in this._tiles) return !1;
                                var e = this.options;
                                if (!e.continuousWorld) {
                                    var i = this._getWrapTileNum();
                                    if (e.noWrap && (t.x < 0 || t.x >= i.x) || t.y < 0 || t.y >= i.y) return !1
                                }
                                if (e.bounds) {
                                    var o = this._getTileSize(),
                                        n = t.multiplyBy(o),
                                        s = n.add([o, o]),
                                        a = this._map.unproject(n),
                                        r = this._map.unproject(s);
                                    if (e.continuousWorld || e.noWrap || (a = a.wrap(), r = r.wrap()), !e.bounds.intersects([a, r])) return !1
                                }
                                return !0
                            },
                            _removeOtherTiles: function (t) {
                                var e, i, o, n;
                                for (n in this._tiles) e = n.split(":"), i = parseInt(e[0], 10), o = parseInt(e[1], 10), (i < t.min.x || i > t.max.x || o < t.min.y || o > t.max.y) && this._removeTile(n)
                            },
                            _removeTile: function (t) {
                                var e = this._tiles[t];
                                this.fire("tileunload", {
                                    tile: e,
                                    url: e.src
                                }), this.options.reuseTiles ? (d.DomUtil.removeClass(e, "leaflet-tile-loaded"), this._unusedTiles.push(e)) : e.parentNode === this._tileContainer && this._tileContainer.removeChild(e), d.Browser.android || (e.onload = null, e.src = d.Util.emptyImageUrl), delete this._tiles[t]
                            },
                            _addTile: function (t, e) {
                                var i = this._getTilePos(t),
                                    o = this._getTile();
                                d.DomUtil.setPosition(o, i, d.Browser.chrome), this._tiles[t.x + ":" + t.y] = o, this._loadTile(o, t), o.parentNode !== this._tileContainer && e.appendChild(o)
                            },
                            _getZoomForUrl: function () {
                                var t = this.options,
                                    e = this._map.getZoom();
                                return t.zoomReverse && (e = t.maxZoom - e), e += t.zoomOffset, t.maxNativeZoom ? Math.min(e, t.maxNativeZoom) : e
                            },
                            _getTilePos: function (t) {
                                var e = this._map.getPixelOrigin(),
                                    i = this._getTileSize();
                                return t.multiplyBy(i).subtract(e)
                            },
                            getTileUrl: function (t) {
                                return d.Util.template(this._url, d.extend({
                                    s: this._getSubdomain(t),
                                    z: t.z,
                                    x: t.x,
                                    y: t.y
                                }, this.options))
                            },
                            _getWrapTileNum: function () {
                                return this._map.options.crs.getSize(this._map.getZoom()).divideBy(this._getTileSize())._floor()
                            },
                            _adjustTilePoint: function (t) {
                                var e = this._getWrapTileNum();
                                this.options.continuousWorld || this.options.noWrap || (t.x = (t.x % e.x + e.x) % e.x), this.options.tms && (t.y = e.y - t.y - 1), t.z = this._getZoomForUrl()
                            },
                            _getSubdomain: function (t) {
                                var e = Math.abs(t.x + t.y) % this.options.subdomains.length;
                                return this.options.subdomains[e]
                            },
                            _getTile: function () {
                                if (this.options.reuseTiles && this._unusedTiles.length > 0) {
                                    var t = this._unusedTiles.pop();
                                    return this._resetTile(t), t
                                }
                                return this._createTile()
                            },
                            _resetTile: function () {},
                            _createTile: function () {
                                var t = d.DomUtil.create("img", "leaflet-tile");
                                return t.style.width = t.style.height = this._getTileSize() + "px", t.galleryimg = "no", t.onselectstart = t.onmousemove = d.Util.falseFn, d.Browser.ielt9 && this.options.opacity !== r && d.DomUtil.setOpacity(t, this.options.opacity), d.Browser.mobileWebkit3d && (t.style.WebkitBackfaceVisibility = "hidden"), t
                            },
                            _loadTile: function (t, e) {
                                t._layer = this, t.onload = this._tileOnLoad, t.onerror = this._tileOnError, this._adjustTilePoint(e), t.src = this.getTileUrl(e), this.fire("tileloadstart", {
                                    tile: t,
                                    url: t.src
                                })
                            },
                            _tileLoaded: function () {
                                this._tilesToLoad--, this._animated && d.DomUtil.addClass(this._tileContainer, "leaflet-zoom-animated"), this._tilesToLoad || (this.fire("load"), this._animated && (clearTimeout(this._clearBgBufferTimer), this._clearBgBufferTimer = setTimeout(d.bind(this._clearBgBuffer, this), 500)))
                            },
                            _tileOnLoad: function () {
                                var t = this._layer;
                                this.src !== d.Util.emptyImageUrl && (d.DomUtil.addClass(this, "leaflet-tile-loaded"), t.fire("tileload", {
                                    tile: this,
                                    url: this.src
                                })), t._tileLoaded()
                            },
                            _tileOnError: function () {
                                var t = this._layer;
                                t.fire("tileerror", {
                                    tile: this,
                                    url: this.src
                                });
                                var e = t.options.errorTileUrl;
                                e && (this.src = e), t._tileLoaded()
                            }
                        }), d.tileLayer = function (t, e) {
                            return new d.TileLayer(t, e)
                        }, d.TileLayer.WMS = d.TileLayer.extend({
                            defaultWmsParams: {
                                service: "WMS",
                                request: "GetMap",
                                version: "1.1.1",
                                layers: "",
                                styles: "",
                                format: "image/jpeg",
                                transparent: !1
                            },
                            initialize: function (t, e) {
                                this._url = t;
                                var i = d.extend({}, this.defaultWmsParams),
                                    o = e.tileSize || this.options.tileSize;
                                for (var n in e.detectRetina && d.Browser.retina ? i.width = i.height = 2 * o : i.width = i.height = o, e) this.options.hasOwnProperty(n) || "crs" === n || (i[n] = e[n]);
                                this.wmsParams = i, d.setOptions(this, e)
                            },
                            onAdd: function (t) {
                                this._crs = this.options.crs || t.options.crs, this._wmsVersion = parseFloat(this.wmsParams.version);
                                var e = this._wmsVersion >= 1.3 ? "crs" : "srs";
                                this.wmsParams[e] = this._crs.code, d.TileLayer.prototype.onAdd.call(this, t)
                            },
                            getTileUrl: function (t) {
                                var e = this._map,
                                    i = this.options.tileSize,
                                    o = t.multiplyBy(i),
                                    n = o.add([i, i]),
                                    s = this._crs.project(e.unproject(o, t.z)),
                                    a = this._crs.project(e.unproject(n, t.z)),
                                    r = this._wmsVersion >= 1.3 && this._crs === d.CRS.EPSG4326 ? [a.y, s.x, s.y, a.x].join(",") : [s.x, a.y, a.x, s.y].join(","),
                                    h = d.Util.template(this._url, {
                                        s: this._getSubdomain(t)
                                    });
                                return h + d.Util.getParamString(this.wmsParams, h, !0) + "&BBOX=" + r
                            },
                            setParams: function (t, e) {
                                return d.extend(this.wmsParams, t), e || this.redraw(), this
                            }
                        }), d.tileLayer.wms = function (t, e) {
                            return new d.TileLayer.WMS(t, e)
                        }, d.TileLayer.Canvas = d.TileLayer.extend({
                            options: {
                                async: !1
                            },
                            initialize: function (t) {
                                d.setOptions(this, t)
                            },
                            redraw: function () {
                                for (var t in this._map && (this._reset({
                                        hard: !0
                                    }), this._update()), this._tiles) this._redrawTile(this._tiles[t]);
                                return this
                            },
                            _redrawTile: function (t) {
                                this.drawTile(t, t._tilePoint, this._map._zoom)
                            },
                            _createTile: function () {
                                var t = d.DomUtil.create("canvas", "leaflet-tile");
                                return t.width = t.height = this.options.tileSize, t.onselectstart = t.onmousemove = d.Util.falseFn, t
                            },
                            _loadTile: function (t, e) {
                                t._layer = this, t._tilePoint = e, this._redrawTile(t), this.options.async || this.tileDrawn(t)
                            },
                            drawTile: function () {},
                            tileDrawn: function (t) {
                                this._tileOnLoad.call(t)
                            }
                        }), d.tileLayer.canvas = function (t) {
                            return new d.TileLayer.Canvas(t)
                        }, d.ImageOverlay = d.Class.extend({
                            includes: d.Mixin.Events,
                            options: {
                                opacity: 1
                            },
                            initialize: function (t, e, i) {
                                this._url = t, this._bounds = d.latLngBounds(e), d.setOptions(this, i)
                            },
                            onAdd: function (t) {
                                this._map = t, this._image || this._initImage(), t._panes.overlayPane.appendChild(this._image), t.on("viewreset", this._reset, this), t.options.zoomAnimation && d.Browser.any3d && t.on("zoomanim", this._animateZoom, this), this._reset()
                            },
                            onRemove: function (t) {
                                t.getPanes().overlayPane.removeChild(this._image), t.off("viewreset", this._reset, this), t.options.zoomAnimation && t.off("zoomanim", this._animateZoom, this)
                            },
                            addTo: function (t) {
                                return t.addLayer(this), this
                            },
                            setOpacity: function (t) {
                                return this.options.opacity = t, this._updateOpacity(), this
                            },
                            bringToFront: function () {
                                return this._image && this._map._panes.overlayPane.appendChild(this._image), this
                            },
                            bringToBack: function () {
                                var t = this._map._panes.overlayPane;
                                return this._image && t.insertBefore(this._image, t.firstChild), this
                            },
                            setUrl: function (t) {
                                this._url = t, this._image.src = this._url
                            },
                            getAttribution: function () {
                                return this.options.attribution
                            },
                            _initImage: function () {
                                this._image = d.DomUtil.create("img", "leaflet-image-layer"), this._map.options.zoomAnimation && d.Browser.any3d ? d.DomUtil.addClass(this._image, "leaflet-zoom-animated") : d.DomUtil.addClass(this._image, "leaflet-zoom-hide"), this._updateOpacity(), d.extend(this._image, {
                                    galleryimg: "no",
                                    onselectstart: d.Util.falseFn,
                                    onmousemove: d.Util.falseFn,
                                    onload: d.bind(this._onImageLoad, this),
                                    src: this._url
                                })
                            },
                            _animateZoom: function (t) {
                                var e = this._map,
                                    i = this._image,
                                    o = e.getZoomScale(t.zoom),
                                    n = this._bounds.getNorthWest(),
                                    s = this._bounds.getSouthEast(),
                                    a = e._latLngToNewLayerPoint(n, t.zoom, t.center),
                                    r = e._latLngToNewLayerPoint(s, t.zoom, t.center)._subtract(a),
                                    h = a._add(r._multiplyBy(.5 * (1 - 1 / o)));
                                i.style[d.DomUtil.TRANSFORM] = d.DomUtil.getTranslateString(h) + " scale(" + o + ") "
                            },
                            _reset: function () {
                                var t = this._image,
                                    e = this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
                                    i = this._map.latLngToLayerPoint(this._bounds.getSouthEast())._subtract(e);
                                d.DomUtil.setPosition(t, e), t.style.width = i.x + "px", t.style.height = i.y + "px"
                            },
                            _onImageLoad: function () {
                                this.fire("load")
                            },
                            _updateOpacity: function () {
                                d.DomUtil.setOpacity(this._image, this.options.opacity)
                            }
                        }), d.imageOverlay = function (t, e, i) {
                            return new d.ImageOverlay(t, e, i)
                        }, d.Icon = d.Class.extend({
                            options: {
                                className: ""
                            },
                            initialize: function (t) {
                                d.setOptions(this, t)
                            },
                            createIcon: function (t) {
                                return this._createIcon("icon", t)
                            },
                            createShadow: function (t) {
                                return this._createIcon("shadow", t)
                            },
                            _createIcon: function (t, e) {
                                var i, o = this._getIconUrl(t);
                                if (!o) {
                                    if ("icon" === t) throw new Error("iconUrl not set in Icon options (see the docs).");
                                    return null
                                }
                                return i = e && "IMG" === e.tagName ? this._createImg(o, e) : this._createImg(o), this._setIconStyles(i, t), i
                            },
                            _setIconStyles: function (t, e) {
                                var i, o = this.options,
                                    n = d.point(o[e + "Size"]);
                                !(i = "shadow" === e ? d.point(o.shadowAnchor || o.iconAnchor) : d.point(o.iconAnchor)) && n && (i = n.divideBy(2, !0)), t.className = "leaflet-marker-" + e + " " + o.className, i && (t.style.marginLeft = -i.x + "px", t.style.marginTop = -i.y + "px"), n && (t.style.width = n.x + "px", t.style.height = n.y + "px")
                            },
                            _createImg: function (t, e) {
                                return (e = e || a.createElement("img")).src = t, e
                            },
                            _getIconUrl: function (t) {
                                return d.Browser.retina && this.options[t + "RetinaUrl"] ? this.options[t + "RetinaUrl"] : this.options[t + "Url"]
                            }
                        }), d.icon = function (t) {
                            return new d.Icon(t)
                        }, d.Icon.Default = d.Icon.extend({
                            options: {
                                iconSize: [25, 41],
                                iconAnchor: [12, 41],
                                popupAnchor: [1, -34],
                                shadowSize: [41, 41]
                            },
                            _getIconUrl: function (t) {
                                var e = t + "Url";
                                if (this.options[e]) return this.options[e];
                                d.Browser.retina && "icon" === t && (t += "-2x");
                                var i = d.Icon.Default.imagePath;
                                if (!i) throw new Error("Couldn't autodetect L.Icon.Default.imagePath, set it manually.");
                                return i + "/marker-" + t + ".png"
                            }
                        }), d.Icon.Default.imagePath = function () {
                            var t, e, i, o, n = a.getElementsByTagName("script"),
                                s = /[\/^]leaflet[\-\._]?([\w\-\._]*)\.js\??/;
                            for (t = 0, e = n.length; t < e; t++)
                                if ((i = n[t].src).match(s)) return ((o = i.split(s)[0]) ? o + "/" : "") + "images"
                        }(), d.Marker = d.Class.extend({
                            includes: d.Mixin.Events,
                            options: {
                                icon: new d.Icon.Default,
                                title: "",
                                alt: "",
                                clickable: !0,
                                draggable: !1,
                                keyboard: !0,
                                zIndexOffset: 0,
                                opacity: 1,
                                riseOnHover: !1,
                                riseOffset: 250
                            },
                            initialize: function (t, e) {
                                d.setOptions(this, e), this._latlng = d.latLng(t)
                            },
                            onAdd: function (t) {
                                this._map = t, t.on("viewreset", this.update, this), this._initIcon(), this.update(), this.fire("add"), t.options.zoomAnimation && t.options.markerZoomAnimation && t.on("zoomanim", this._animateZoom, this)
                            },
                            addTo: function (t) {
                                return t.addLayer(this), this
                            },
                            onRemove: function (t) {
                                this.dragging && this.dragging.disable(), this._removeIcon(), this._removeShadow(), this.fire("remove"), t.off({
                                    viewreset: this.update,
                                    zoomanim: this._animateZoom
                                }, this), this._map = null
                            },
                            getLatLng: function () {
                                return this._latlng
                            },
                            setLatLng: function (t) {
                                return this._latlng = d.latLng(t), this.update(), this.fire("move", {
                                    latlng: this._latlng
                                })
                            },
                            setZIndexOffset: function (t) {
                                return this.options.zIndexOffset = t, this.update(), this
                            },
                            setIcon: function (t) {
                                return this.options.icon = t, this._map && (this._initIcon(), this.update()), this._popup && this.bindPopup(this._popup), this
                            },
                            update: function () {
                                return this._icon && this._setPos(this._map.latLngToLayerPoint(this._latlng).round()), this
                            },
                            _initIcon: function () {
                                var t = this.options,
                                    e = this._map,
                                    i = e.options.zoomAnimation && e.options.markerZoomAnimation ? "leaflet-zoom-animated" : "leaflet-zoom-hide",
                                    o = t.icon.createIcon(this._icon),
                                    n = !1;
                                o !== this._icon && (this._icon && this._removeIcon(), n = !0, t.title && (o.title = t.title), t.alt && (o.alt = t.alt)), d.DomUtil.addClass(o, i), t.keyboard && (o.tabIndex = "0"), this._icon = o, this._initInteraction(), t.riseOnHover && d.DomEvent.on(o, "mouseover", this._bringToFront, this).on(o, "mouseout", this._resetZIndex, this);
                                var s = t.icon.createShadow(this._shadow),
                                    a = !1;
                                s !== this._shadow && (this._removeShadow(), a = !0), s && d.DomUtil.addClass(s, i), this._shadow = s, t.opacity < 1 && this._updateOpacity();
                                var r = this._map._panes;
                                n && r.markerPane.appendChild(this._icon), s && a && r.shadowPane.appendChild(this._shadow)
                            },
                            _removeIcon: function () {
                                this.options.riseOnHover && d.DomEvent.off(this._icon, "mouseover", this._bringToFront).off(this._icon, "mouseout", this._resetZIndex), this._map._panes.markerPane.removeChild(this._icon), this._icon = null
                            },
                            _removeShadow: function () {
                                this._shadow && this._map._panes.shadowPane.removeChild(this._shadow), this._shadow = null
                            },
                            _setPos: function (t) {
                                d.DomUtil.setPosition(this._icon, t), this._shadow && d.DomUtil.setPosition(this._shadow, t), this._zIndex = t.y + this.options.zIndexOffset, this._resetZIndex()
                            },
                            _updateZIndex: function (t) {
                                this._icon.style.zIndex = this._zIndex + t
                            },
                            _animateZoom: function (t) {
                                var e = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center).round();
                                this._setPos(e)
                            },
                            _initInteraction: function () {
                                if (this.options.clickable) {
                                    var t = this._icon,
                                        e = ["dblclick", "mousedown", "mouseover", "mouseout", "contextmenu"];
                                    d.DomUtil.addClass(t, "leaflet-clickable"), d.DomEvent.on(t, "click", this._onMouseClick, this), d.DomEvent.on(t, "keypress", this._onKeyPress, this);
                                    for (var i = 0; i < e.length; i++) d.DomEvent.on(t, e[i], this._fireMouseEvent, this);
                                    d.Handler.MarkerDrag && (this.dragging = new d.Handler.MarkerDrag(this), this.options.draggable && this.dragging.enable())
                                }
                            },
                            _onMouseClick: function (t) {
                                var e = this.dragging && this.dragging.moved();
                                (this.hasEventListeners(t.type) || e) && d.DomEvent.stopPropagation(t), e || (this.dragging && this.dragging._enabled || !this._map.dragging || !this._map.dragging.moved()) && this.fire(t.type, {
                                    originalEvent: t,
                                    latlng: this._latlng
                                })
                            },
                            _onKeyPress: function (t) {
                                13 === t.keyCode && this.fire("click", {
                                    originalEvent: t,
                                    latlng: this._latlng
                                })
                            },
                            _fireMouseEvent: function (t) {
                                this.fire(t.type, {
                                    originalEvent: t,
                                    latlng: this._latlng
                                }), "contextmenu" === t.type && this.hasEventListeners(t.type) && d.DomEvent.preventDefault(t), "mousedown" !== t.type ? d.DomEvent.stopPropagation(t) : d.DomEvent.preventDefault(t)
                            },
                            setOpacity: function (t) {
                                return this.options.opacity = t, this._map && this._updateOpacity(), this
                            },
                            _updateOpacity: function () {
                                d.DomUtil.setOpacity(this._icon, this.options.opacity), this._shadow && d.DomUtil.setOpacity(this._shadow, this.options.opacity)
                            },
                            _bringToFront: function () {
                                this._updateZIndex(this.options.riseOffset)
                            },
                            _resetZIndex: function () {
                                this._updateZIndex(0)
                            }
                        }), d.marker = function (t, e) {
                            return new d.Marker(t, e)
                        }, d.DivIcon = d.Icon.extend({
                            options: {
                                iconSize: [12, 12],
                                className: "leaflet-div-icon",
                                html: !1
                            },
                            createIcon: function (t) {
                                var e = t && "DIV" === t.tagName ? t : a.createElement("div"),
                                    i = this.options;
                                return !1 !== i.html ? e.innerHTML = i.html : e.innerHTML = "", i.bgPos && (e.style.backgroundPosition = -i.bgPos.x + "px " + -i.bgPos.y + "px"), this._setIconStyles(e, "icon"), e
                            },
                            createShadow: function () {
                                return null
                            }
                        }), d.divIcon = function (t) {
                            return new d.DivIcon(t)
                        }, d.Map.mergeOptions({
                            closePopupOnClick: !0
                        }), d.Popup = d.Class.extend({
                            includes: d.Mixin.Events,
                            options: {
                                minWidth: 50,
                                maxWidth: 300,
                                autoPan: !0,
                                closeButton: !0,
                                offset: [0, 7],
                                autoPanPadding: [5, 5],
                                keepInView: !1,
                                className: "",
                                zoomAnimation: !0
                            },
                            initialize: function (t, e) {
                                d.setOptions(this, t), this._source = e, this._animated = d.Browser.any3d && this.options.zoomAnimation, this._isOpen = !1
                            },
                            onAdd: function (t) {
                                this._map = t, this._container || this._initLayout();
                                var e = t.options.fadeAnimation;
                                e && d.DomUtil.setOpacity(this._container, 0), t._panes.popupPane.appendChild(this._container), t.on(this._getEvents(), this), this.update(), e && d.DomUtil.setOpacity(this._container, 1), this.fire("open"), t.fire("popupopen", {
                                    popup: this
                                }), this._source && this._source.fire("popupopen", {
                                    popup: this
                                })
                            },
                            addTo: function (t) {
                                return t.addLayer(this), this
                            },
                            openOn: function (t) {
                                return t.openPopup(this), this
                            },
                            onRemove: function (t) {
                                t._panes.popupPane.removeChild(this._container), d.Util.falseFn(this._container.offsetWidth), t.off(this._getEvents(), this), t.options.fadeAnimation && d.DomUtil.setOpacity(this._container, 0), this._map = null, this.fire("close"), t.fire("popupclose", {
                                    popup: this
                                }), this._source && this._source.fire("popupclose", {
                                    popup: this
                                })
                            },
                            getLatLng: function () {
                                return this._latlng
                            },
                            setLatLng: function (t) {
                                return this._latlng = d.latLng(t), this._map && (this._updatePosition(), this._adjustPan()), this
                            },
                            getContent: function () {
                                return this._content
                            },
                            setContent: function (t) {
                                return this._content = t, this.update(), this
                            },
                            update: function () {
                                this._map && (this._container.style.visibility = "hidden", this._updateContent(), this._updateLayout(), this._updatePosition(), this._container.style.visibility = "", this._adjustPan())
                            },
                            _getEvents: function () {
                                var t = {
                                    viewreset: this._updatePosition
                                };
                                return this._animated && (t.zoomanim = this._zoomAnimation), ("closeOnClick" in this.options ? this.options.closeOnClick : this._map.options.closePopupOnClick) && (t.preclick = this._close), this.options.keepInView && (t.moveend = this._adjustPan), t
                            },
                            _close: function () {
                                this._map && this._map.closePopup(this)
                            },
                            _initLayout: function () {
                                var t, e = "leaflet-popup",
                                    i = e + " " + this.options.className + " leaflet-zoom-" + (this._animated ? "animated" : "hide"),
                                    o = this._container = d.DomUtil.create("div", i);
                                this.options.closeButton && ((t = this._closeButton = d.DomUtil.create("a", e + "-close-button", o)).href = "#close", t.innerHTML = "&#215;", d.DomEvent.disableClickPropagation(t), d.DomEvent.on(t, "click", this._onCloseButtonClick, this));
                                var n = this._wrapper = d.DomUtil.create("div", e + "-content-wrapper", o);
                                d.DomEvent.disableClickPropagation(n), this._contentNode = d.DomUtil.create("div", e + "-content", n), d.DomEvent.disableScrollPropagation(this._contentNode), d.DomEvent.on(n, "contextmenu", d.DomEvent.stopPropagation), this._tipContainer = d.DomUtil.create("div", e + "-tip-container", o), this._tip = d.DomUtil.create("div", e + "-tip", this._tipContainer)
                            },
                            _updateContent: function () {
                                if (this._content) {
                                    if ("string" == typeof this._content) this._contentNode.innerHTML = this._content;
                                    else {
                                        for (; this._contentNode.hasChildNodes();) this._contentNode.removeChild(this._contentNode.firstChild);
                                        this._contentNode.appendChild(this._content)
                                    }
                                    this.fire("contentupdate")
                                }
                            },
                            _updateLayout: function () {
                                var t = this._contentNode,
                                    e = t.style;
                                e.width = "", e.whiteSpace = "nowrap";
                                var i = t.offsetWidth;
                                i = Math.min(i, this.options.maxWidth), i = Math.max(i, this.options.minWidth), e.width = i + 1 + "px", e.whiteSpace = "", e.height = "";
                                var o = t.offsetHeight,
                                    n = this.options.maxHeight,
                                    s = "leaflet-popup-scrolled";
                                n && o > n ? (e.height = n + "px", d.DomUtil.addClass(t, s)) : d.DomUtil.removeClass(t, s), this._containerWidth = this._container.offsetWidth
                            },
                            _updatePosition: function () {
                                if (this._map) {
                                    var t = this._map.latLngToLayerPoint(this._latlng),
                                        e = this._animated,
                                        i = d.point(this.options.offset);
                                    e && d.DomUtil.setPosition(this._container, t), this._containerBottom = -i.y - (e ? 0 : t.y), this._containerLeft = -Math.round(this._containerWidth / 2) + i.x + (e ? 0 : t.x), this._container.style.bottom = this._containerBottom + "px", this._container.style.left = this._containerLeft + "px"
                                }
                            },
                            _zoomAnimation: function (t) {
                                var e = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center);
                                d.DomUtil.setPosition(this._container, e)
                            },
                            _adjustPan: function () {
                                if (this.options.autoPan) {
                                    var t = this._map,
                                        e = this._container.offsetHeight,
                                        i = this._containerWidth,
                                        o = new d.Point(this._containerLeft, -e - this._containerBottom);
                                    this._animated && o._add(d.DomUtil.getPosition(this._container));
                                    var n = t.layerPointToContainerPoint(o),
                                        s = d.point(this.options.autoPanPadding),
                                        a = d.point(this.options.autoPanPaddingTopLeft || s),
                                        r = d.point(this.options.autoPanPaddingBottomRight || s),
                                        h = t.getSize(),
                                        l = 0,
                                        c = 0;
                                    n.x + i + r.x > h.x && (l = n.x + i - h.x + r.x), n.x - l - a.x < 0 && (l = n.x - a.x), n.y + e + r.y > h.y && (c = n.y + e - h.y + r.y), n.y - c - a.y < 0 && (c = n.y - a.y), (l || c) && t.fire("autopanstart").panBy([l, c])
                                }
                            },
                            _onCloseButtonClick: function (t) {
                                this._close(), d.DomEvent.stop(t)
                            }
                        }), d.popup = function (t, e) {
                            return new d.Popup(t, e)
                        }, d.Map.include({
                            openPopup: function (t, e, i) {
                                if (this.closePopup(), !(t instanceof d.Popup)) {
                                    var o = t;
                                    t = new d.Popup(i).setLatLng(e).setContent(o)
                                }
                                return t._isOpen = !0, this._popup = t, this.addLayer(t)
                            },
                            closePopup: function (t) {
                                return t && t !== this._popup || (t = this._popup, this._popup = null), t && (this.removeLayer(t), t._isOpen = !1), this
                            }
                        }), d.Marker.include({
                            openPopup: function () {
                                return this._popup && this._map && !this._map.hasLayer(this._popup) && (this._popup.setLatLng(this._latlng), this._map.openPopup(this._popup)), this
                            },
                            closePopup: function () {
                                return this._popup && this._popup._close(), this
                            },
                            togglePopup: function () {
                                return this._popup && (this._popup._isOpen ? this.closePopup() : this.openPopup()), this
                            },
                            bindPopup: function (t, e) {
                                var i = d.point(this.options.icon.options.popupAnchor || [0, 0]);
                                return i = i.add(d.Popup.prototype.options.offset), e && e.offset && (i = i.add(e.offset)), e = d.extend({
                                    offset: i
                                }, e), this._popupHandlersAdded || (this.on("click", this.togglePopup, this).on("remove", this.closePopup, this).on("move", this._movePopup, this), this._popupHandlersAdded = !0), t instanceof d.Popup ? (d.setOptions(t, e), this._popup = t, t._source = this) : this._popup = new d.Popup(e, this).setContent(t), this
                            },
                            setPopupContent: function (t) {
                                return this._popup && this._popup.setContent(t), this
                            },
                            unbindPopup: function () {
                                return this._popup && (this._popup = null, this.off("click", this.togglePopup, this).off("remove", this.closePopup, this).off("move", this._movePopup, this), this._popupHandlersAdded = !1), this
                            },
                            getPopup: function () {
                                return this._popup
                            },
                            _movePopup: function (t) {
                                this._popup.setLatLng(t.latlng)
                            }
                        }), d.LayerGroup = d.Class.extend({
                            initialize: function (t) {
                                var e, i;
                                if (this._layers = {}, t)
                                    for (e = 0, i = t.length; e < i; e++) this.addLayer(t[e])
                            },
                            addLayer: function (t) {
                                var e = this.getLayerId(t);
                                return this._layers[e] = t, this._map && this._map.addLayer(t), this
                            },
                            removeLayer: function (t) {
                                var e = t in this._layers ? t : this.getLayerId(t);
                                return this._map && this._layers[e] && this._map.removeLayer(this._layers[e]), delete this._layers[e], this
                            },
                            hasLayer: function (t) {
                                return !!t && (t in this._layers || this.getLayerId(t) in this._layers)
                            },
                            clearLayers: function () {
                                return this.eachLayer(this.removeLayer, this), this
                            },
                            invoke: function (t) {
                                var e, i, o = Array.prototype.slice.call(arguments, 1);
                                for (e in this._layers)(i = this._layers[e])[t] && i[t].apply(i, o);
                                return this
                            },
                            onAdd: function (t) {
                                this._map = t, this.eachLayer(t.addLayer, t)
                            },
                            onRemove: function (t) {
                                this.eachLayer(t.removeLayer, t), this._map = null
                            },
                            addTo: function (t) {
                                return t.addLayer(this), this
                            },
                            eachLayer: function (t, e) {
                                for (var i in this._layers) t.call(e, this._layers[i]);
                                return this
                            },
                            getLayer: function (t) {
                                return this._layers[t]
                            },
                            getLayers: function () {
                                var t = [];
                                for (var e in this._layers) t.push(this._layers[e]);
                                return t
                            },
                            setZIndex: function (t) {
                                return this.invoke("setZIndex", t)
                            },
                            getLayerId: function (t) {
                                return d.stamp(t)
                            }
                        }), d.layerGroup = function (t) {
                            return new d.LayerGroup(t)
                        }, d.FeatureGroup = d.LayerGroup.extend({
                            includes: d.Mixin.Events,
                            statics: {
                                EVENTS: "click dblclick mouseover mouseout mousemove contextmenu popupopen popupclose"
                            },
                            addLayer: function (t) {
                                return this.hasLayer(t) ? this : ("on" in t && t.on(d.FeatureGroup.EVENTS, this._propagateEvent, this), d.LayerGroup.prototype.addLayer.call(this, t), this._popupContent && t.bindPopup && t.bindPopup(this._popupContent, this._popupOptions), this.fire("layeradd", {
                                    layer: t
                                }))
                            },
                            removeLayer: function (t) {
                                return this.hasLayer(t) ? (t in this._layers && (t = this._layers[t]), "off" in t && t.off(d.FeatureGroup.EVENTS, this._propagateEvent, this), d.LayerGroup.prototype.removeLayer.call(this, t), this._popupContent && this.invoke("unbindPopup"), this.fire("layerremove", {
                                    layer: t
                                })) : this
                            },
                            bindPopup: function (t, e) {
                                return this._popupContent = t, this._popupOptions = e, this.invoke("bindPopup", t, e)
                            },
                            openPopup: function (t) {
                                for (var e in this._layers) {
                                    this._layers[e].openPopup(t);
                                    break
                                }
                                return this
                            },
                            setStyle: function (t) {
                                return this.invoke("setStyle", t)
                            },
                            bringToFront: function () {
                                return this.invoke("bringToFront")
                            },
                            bringToBack: function () {
                                return this.invoke("bringToBack")
                            },
                            getBounds: function () {
                                var t = new d.LatLngBounds;
                                return this.eachLayer((function (e) {
                                    t.extend(e instanceof d.Marker ? e.getLatLng() : e.getBounds())
                                })), t
                            },
                            _propagateEvent: function (t) {
                                t = d.extend({
                                    layer: t.target,
                                    target: this
                                }, t), this.fire(t.type, t)
                            }
                        }), d.featureGroup = function (t) {
                            return new d.FeatureGroup(t)
                        }, d.Path = d.Class.extend({
                            includes: [d.Mixin.Events],
                            statics: {
                                CLIP_PADDING: (B = ((d.Browser.mobile ? 1280 : 2e3) / Math.max(s.outerWidth, s.outerHeight) - 1) / 2, Math.max(0, Math.min(.5, B)))
                            },
                            options: {
                                stroke: !0,
                                color: "#0033ff",
                                dashArray: null,
                                lineCap: null,
                                lineJoin: null,
                                weight: 5,
                                opacity: .5,
                                fill: !1,
                                fillColor: null,
                                fillOpacity: .2,
                                clickable: !0
                            },
                            initialize: function (t) {
                                d.setOptions(this, t)
                            },
                            onAdd: function (t) {
                                this._map = t, this._container || (this._initElements(), this._initEvents()), this.projectLatlngs(), this._updatePath(), this._container && this._map._pathRoot.appendChild(this._container), this.fire("add"), t.on({
                                    viewreset: this.projectLatlngs,
                                    moveend: this._updatePath
                                }, this)
                            },
                            addTo: function (t) {
                                return t.addLayer(this), this
                            },
                            onRemove: function (t) {
                                t._pathRoot.removeChild(this._container), this.fire("remove"), this._map = null, d.Browser.vml && (this._container = null, this._stroke = null, this._fill = null), t.off({
                                    viewreset: this.projectLatlngs,
                                    moveend: this._updatePath
                                }, this)
                            },
                            projectLatlngs: function () {},
                            setStyle: function (t) {
                                return d.setOptions(this, t), this._container && this._updateStyle(), this
                            },
                            redraw: function () {
                                return this._map && (this.projectLatlngs(), this._updatePath()), this
                            }
                        }), d.Map.include({
                            _updatePathViewport: function () {
                                var t = d.Path.CLIP_PADDING,
                                    e = this.getSize(),
                                    i = d.DomUtil.getPosition(this._mapPane).multiplyBy(-1)._subtract(e.multiplyBy(t)._round()),
                                    o = i.add(e.multiplyBy(1 + 2 * t)._round());
                                this._pathViewport = new d.Bounds(i, o)
                            }
                        }), d.Path.SVG_NS = "http://www.w3.org/2000/svg", d.Browser.svg = !(!a.createElementNS || !a.createElementNS(d.Path.SVG_NS, "svg").createSVGRect), d.Path = d.Path.extend({
                            statics: {
                                SVG: d.Browser.svg
                            },
                            bringToFront: function () {
                                var t = this._map._pathRoot,
                                    e = this._container;
                                return e && t.lastChild !== e && t.appendChild(e), this
                            },
                            bringToBack: function () {
                                var t = this._map._pathRoot,
                                    e = this._container,
                                    i = t.firstChild;
                                return e && i !== e && t.insertBefore(e, i), this
                            },
                            getPathString: function () {},
                            _createElement: function (t) {
                                return a.createElementNS(d.Path.SVG_NS, t)
                            },
                            _initElements: function () {
                                this._map._initPathRoot(), this._initPath(), this._initStyle()
                            },
                            _initPath: function () {
                                this._container = this._createElement("g"), this._path = this._createElement("path"), this.options.className && d.DomUtil.addClass(this._path, this.options.className), this._container.appendChild(this._path)
                            },
                            _initStyle: function () {
                                this.options.stroke && (this._path.setAttribute("stroke-linejoin", "round"), this._path.setAttribute("stroke-linecap", "round")), this.options.fill && this._path.setAttribute("fill-rule", "evenodd"), this.options.pointerEvents && this._path.setAttribute("pointer-events", this.options.pointerEvents), this.options.clickable || this.options.pointerEvents || this._path.setAttribute("pointer-events", "none"), this._updateStyle()
                            },
                            _updateStyle: function () {
                                this.options.stroke ? (this._path.setAttribute("stroke", this.options.color), this._path.setAttribute("stroke-opacity", this.options.opacity), this._path.setAttribute("stroke-width", this.options.weight), this.options.dashArray ? this._path.setAttribute("stroke-dasharray", this.options.dashArray) : this._path.removeAttribute("stroke-dasharray"), this.options.lineCap && this._path.setAttribute("stroke-linecap", this.options.lineCap), this.options.lineJoin && this._path.setAttribute("stroke-linejoin", this.options.lineJoin)) : this._path.setAttribute("stroke", "none"), this.options.fill ? (this._path.setAttribute("fill", this.options.fillColor || this.options.color), this._path.setAttribute("fill-opacity", this.options.fillOpacity)) : this._path.setAttribute("fill", "none")
                            },
                            _updatePath: function () {
                                var t = this.getPathString();
                                t || (t = "M0 0"), this._path.setAttribute("d", t)
                            },
                            _initEvents: function () {
                                if (this.options.clickable) {
                                    !d.Browser.svg && d.Browser.vml || d.DomUtil.addClass(this._path, "leaflet-clickable"), d.DomEvent.on(this._container, "click", this._onMouseClick, this);
                                    for (var t = ["dblclick", "mousedown", "mouseover", "mouseout", "mousemove", "contextmenu"], e = 0; e < t.length; e++) d.DomEvent.on(this._container, t[e], this._fireMouseEvent, this)
                                }
                            },
                            _onMouseClick: function (t) {
                                this._map.dragging && this._map.dragging.moved() || this._fireMouseEvent(t)
                            },
                            _fireMouseEvent: function (t) {
                                if (this._map && this.hasEventListeners(t.type)) {
                                    var e = this._map,
                                        i = e.mouseEventToContainerPoint(t),
                                        o = e.containerPointToLayerPoint(i),
                                        n = e.layerPointToLatLng(o);
                                    this.fire(t.type, {
                                        latlng: n,
                                        layerPoint: o,
                                        containerPoint: i,
                                        originalEvent: t
                                    }), "contextmenu" === t.type && d.DomEvent.preventDefault(t), "mousemove" !== t.type && d.DomEvent.stopPropagation(t)
                                }
                            }
                        }), d.Map.include({
                            _initPathRoot: function () {
                                this._pathRoot || (this._pathRoot = d.Path.prototype._createElement("svg"), this._panes.overlayPane.appendChild(this._pathRoot), this.options.zoomAnimation && d.Browser.any3d ? (d.DomUtil.addClass(this._pathRoot, "leaflet-zoom-animated"), this.on({
                                    zoomanim: this._animatePathZoom,
                                    zoomend: this._endPathZoom
                                })) : d.DomUtil.addClass(this._pathRoot, "leaflet-zoom-hide"), this.on("moveend", this._updateSvgViewport), this._updateSvgViewport())
                            },
                            _animatePathZoom: function (t) {
                                var e = this.getZoomScale(t.zoom),
                                    i = this._getCenterOffset(t.center)._multiplyBy(-e)._add(this._pathViewport.min);
                                this._pathRoot.style[d.DomUtil.TRANSFORM] = d.DomUtil.getTranslateString(i) + " scale(" + e + ") ", this._pathZooming = !0
                            },
                            _endPathZoom: function () {
                                this._pathZooming = !1
                            },
                            _updateSvgViewport: function () {
                                if (!this._pathZooming) {
                                    this._updatePathViewport();
                                    var t = this._pathViewport,
                                        e = t.min,
                                        i = t.max,
                                        o = i.x - e.x,
                                        n = i.y - e.y,
                                        s = this._pathRoot,
                                        a = this._panes.overlayPane;
                                    d.Browser.mobileWebkit && a.removeChild(s), d.DomUtil.setPosition(s, e), s.setAttribute("width", o), s.setAttribute("height", n), s.setAttribute("viewBox", [e.x, e.y, o, n].join(" ")), d.Browser.mobileWebkit && a.appendChild(s)
                                }
                            }
                        }), d.Path.include({
                            bindPopup: function (t, e) {
                                return t instanceof d.Popup ? this._popup = t : (this._popup && !e || (this._popup = new d.Popup(e, this)), this._popup.setContent(t)), this._popupHandlersAdded || (this.on("click", this._openPopup, this).on("remove", this.closePopup, this), this._popupHandlersAdded = !0), this
                            },
                            unbindPopup: function () {
                                return this._popup && (this._popup = null, this.off("click", this._openPopup).off("remove", this.closePopup), this._popupHandlersAdded = !1), this
                            },
                            openPopup: function (t) {
                                return this._popup && (t = t || this._latlng || this._latlngs[Math.floor(this._latlngs.length / 2)], this._openPopup({
                                    latlng: t
                                })), this
                            },
                            closePopup: function () {
                                return this._popup && this._popup._close(), this
                            },
                            _openPopup: function (t) {
                                this._popup.setLatLng(t.latlng), this._map.openPopup(this._popup)
                            }
                        }), d.Browser.vml = !d.Browser.svg && function () {
                            try {
                                var t = a.createElement("div");
                                t.innerHTML = '<v:shape adj="1"/>';
                                var e = t.firstChild;
                                return e.style.behavior = "url(#default#VML)", e && "object" == typeof e.adj
                            } catch (t) {
                                return !1
                            }
                        }(), d.Path = d.Browser.svg || !d.Browser.vml ? d.Path : d.Path.extend({
                            statics: {
                                VML: !0,
                                CLIP_PADDING: .02
                            },
                            _createElement: function () {
                                try {
                                    return a.namespaces.add("lvml", "urn:schemas-microsoft-com:vml"),
                                        function (t) {
                                            return a.createElement("<lvml:" + t + ' class="lvml">')
                                        }
                                } catch (t) {
                                    return function (t) {
                                        return a.createElement("<" + t + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">')
                                    }
                                }
                            }(),
                            _initPath: function () {
                                var t = this._container = this._createElement("shape");
                                d.DomUtil.addClass(t, "leaflet-vml-shape" + (this.options.className ? " " + this.options.className : "")), this.options.clickable && d.DomUtil.addClass(t, "leaflet-clickable"), t.coordsize = "1 1", this._path = this._createElement("path"), t.appendChild(this._path), this._map._pathRoot.appendChild(t)
                            },
                            _initStyle: function () {
                                this._updateStyle()
                            },
                            _updateStyle: function () {
                                var t = this._stroke,
                                    e = this._fill,
                                    i = this.options,
                                    o = this._container;
                                o.stroked = i.stroke, o.filled = i.fill, i.stroke ? (t || ((t = this._stroke = this._createElement("stroke")).endcap = "round", o.appendChild(t)), t.weight = i.weight + "px", t.color = i.color, t.opacity = i.opacity, i.dashArray ? t.dashStyle = d.Util.isArray(i.dashArray) ? i.dashArray.join(" ") : i.dashArray.replace(/( *, *)/g, " ") : t.dashStyle = "", i.lineCap && (t.endcap = i.lineCap.replace("butt", "flat")), i.lineJoin && (t.joinstyle = i.lineJoin)) : t && (o.removeChild(t), this._stroke = null), i.fill ? (e || (e = this._fill = this._createElement("fill"), o.appendChild(e)), e.color = i.fillColor || i.color, e.opacity = i.fillOpacity) : e && (o.removeChild(e), this._fill = null)
                            },
                            _updatePath: function () {
                                var t = this._container.style;
                                t.display = "none", this._path.v = this.getPathString() + " ", t.display = ""
                            }
                        }), d.Map.include(d.Browser.svg || !d.Browser.vml ? {} : {
                            _initPathRoot: function () {
                                if (!this._pathRoot) {
                                    var t = this._pathRoot = a.createElement("div");
                                    t.className = "leaflet-vml-container", this._panes.overlayPane.appendChild(t), this.on("moveend", this._updatePathViewport), this._updatePathViewport()
                                }
                            }
                        }), d.Browser.canvas = !!a.createElement("canvas").getContext, d.Path = d.Path.SVG && !s.L_PREFER_CANVAS || !d.Browser.canvas ? d.Path : d.Path.extend({
                            statics: {
                                CANVAS: !0,
                                SVG: !1
                            },
                            redraw: function () {
                                return this._map && (this.projectLatlngs(), this._requestUpdate()), this
                            },
                            setStyle: function (t) {
                                return d.setOptions(this, t), this._map && (this._updateStyle(), this._requestUpdate()), this
                            },
                            onRemove: function (t) {
                                t.off("viewreset", this.projectLatlngs, this).off("moveend", this._updatePath, this), this.options.clickable && (this._map.off("click", this._onClick, this), this._map.off("mousemove", this._onMouseMove, this)), this._requestUpdate(), this.fire("remove"), this._map = null
                            },
                            _requestUpdate: function () {
                                this._map && !d.Path._updateRequest && (d.Path._updateRequest = d.Util.requestAnimFrame(this._fireMapMoveEnd, this._map))
                            },
                            _fireMapMoveEnd: function () {
                                d.Path._updateRequest = null, this.fire("moveend")
                            },
                            _initElements: function () {
                                this._map._initPathRoot(), this._ctx = this._map._canvasCtx
                            },
                            _updateStyle: function () {
                                var t = this.options;
                                t.stroke && (this._ctx.lineWidth = t.weight, this._ctx.strokeStyle = t.color), t.fill && (this._ctx.fillStyle = t.fillColor || t.color), t.lineCap && (this._ctx.lineCap = t.lineCap), t.lineJoin && (this._ctx.lineJoin = t.lineJoin)
                            },
                            _drawPath: function () {
                                var t, e, i, o, n, s;
                                for (this._ctx.beginPath(), t = 0, i = this._parts.length; t < i; t++) {
                                    for (e = 0, o = this._parts[t].length; e < o; e++) n = this._parts[t][e], s = (0 === e ? "move" : "line") + "To", this._ctx[s](n.x, n.y);
                                    this instanceof d.Polygon && this._ctx.closePath()
                                }
                            },
                            _checkIfEmpty: function () {
                                return !this._parts.length
                            },
                            _updatePath: function () {
                                if (!this._checkIfEmpty()) {
                                    var t = this._ctx,
                                        e = this.options;
                                    this._drawPath(), t.save(), this._updateStyle(), e.fill && (t.globalAlpha = e.fillOpacity, t.fill(e.fillRule || "evenodd")), e.stroke && (t.globalAlpha = e.opacity, t.stroke()), t.restore()
                                }
                            },
                            _initEvents: function () {
                                this.options.clickable && (this._map.on("mousemove", this._onMouseMove, this), this._map.on("click dblclick contextmenu", this._fireMouseEvent, this))
                            },
                            _fireMouseEvent: function (t) {
                                this._containsPoint(t.layerPoint) && this.fire(t.type, t)
                            },
                            _onMouseMove: function (t) {
                                this._map && !this._map._animatingZoom && (this._containsPoint(t.layerPoint) ? (this._ctx.canvas.style.cursor = "pointer", this._mouseInside = !0, this.fire("mouseover", t)) : this._mouseInside && (this._ctx.canvas.style.cursor = "", this._mouseInside = !1, this.fire("mouseout", t)))
                            }
                        }), d.Map.include(d.Path.SVG && !s.L_PREFER_CANVAS || !d.Browser.canvas ? {} : {
                            _initPathRoot: function () {
                                var t, e = this._pathRoot;
                                e || ((e = this._pathRoot = a.createElement("canvas")).style.position = "absolute", (t = this._canvasCtx = e.getContext("2d")).lineCap = "round", t.lineJoin = "round", this._panes.overlayPane.appendChild(e), this.options.zoomAnimation && (this._pathRoot.className = "leaflet-zoom-animated", this.on("zoomanim", this._animatePathZoom), this.on("zoomend", this._endPathZoom)), this.on("moveend", this._updateCanvasViewport), this._updateCanvasViewport())
                            },
                            _updateCanvasViewport: function () {
                                if (!this._pathZooming) {
                                    this._updatePathViewport();
                                    var t = this._pathViewport,
                                        e = t.min,
                                        i = t.max.subtract(e),
                                        o = this._pathRoot;
                                    d.DomUtil.setPosition(o, e), o.width = i.x, o.height = i.y, o.getContext("2d").translate(-e.x, -e.y)
                                }
                            }
                        }), d.LineUtil = {
                            simplify: function (t, e) {
                                if (!e || !t.length) return t.slice();
                                var i = e * e;
                                return t = this._reducePoints(t, i), t = this._simplifyDP(t, i)
                            },
                            pointToSegmentDistance: function (t, e, i) {
                                return Math.sqrt(this._sqClosestPointOnSegment(t, e, i, !0))
                            },
                            closestPointOnSegment: function (t, e, i) {
                                return this._sqClosestPointOnSegment(t, e, i)
                            },
                            _simplifyDP: function (t, e) {
                                var i = t.length,
                                    o = new("undefined" != typeof Uint8Array ? Uint8Array : Array)(i);
                                o[0] = o[i - 1] = 1, this._simplifyDPStep(t, o, e, 0, i - 1);
                                var n, s = [];
                                for (n = 0; n < i; n++) o[n] && s.push(t[n]);
                                return s
                            },
                            _simplifyDPStep: function (t, e, i, o, n) {
                                var s, a, r, h = 0;
                                for (a = o + 1; a <= n - 1; a++)(r = this._sqClosestPointOnSegment(t[a], t[o], t[n], !0)) > h && (s = a, h = r);
                                h > i && (e[s] = 1, this._simplifyDPStep(t, e, i, o, s), this._simplifyDPStep(t, e, i, s, n))
                            },
                            _reducePoints: function (t, e) {
                                for (var i = [t[0]], o = 1, n = 0, s = t.length; o < s; o++) this._sqDist(t[o], t[n]) > e && (i.push(t[o]), n = o);
                                return n < s - 1 && i.push(t[s - 1]), i
                            },
                            clipSegment: function (t, e, i, o) {
                                var n, s, a, r = o ? this._lastCode : this._getBitCode(t, i),
                                    h = this._getBitCode(e, i);
                                for (this._lastCode = h;;) {
                                    if (!(r | h)) return [t, e];
                                    if (r & h) return !1;
                                    n = r || h, s = this._getEdgeIntersection(t, e, n, i), a = this._getBitCode(s, i), n === r ? (t = s, r = a) : (e = s, h = a)
                                }
                            },
                            _getEdgeIntersection: function (t, e, i, o) {
                                var n = e.x - t.x,
                                    s = e.y - t.y,
                                    a = o.min,
                                    r = o.max;
                                return 8 & i ? new d.Point(t.x + n * (r.y - t.y) / s, r.y) : 4 & i ? new d.Point(t.x + n * (a.y - t.y) / s, a.y) : 2 & i ? new d.Point(r.x, t.y + s * (r.x - t.x) / n) : 1 & i ? new d.Point(a.x, t.y + s * (a.x - t.x) / n) : void 0
                            },
                            _getBitCode: function (t, e) {
                                var i = 0;
                                return t.x < e.min.x ? i |= 1 : t.x > e.max.x && (i |= 2), t.y < e.min.y ? i |= 4 : t.y > e.max.y && (i |= 8), i
                            },
                            _sqDist: function (t, e) {
                                var i = e.x - t.x,
                                    o = e.y - t.y;
                                return i * i + o * o
                            },
                            _sqClosestPointOnSegment: function (t, e, i, o) {
                                var n, s = e.x,
                                    a = e.y,
                                    r = i.x - s,
                                    h = i.y - a,
                                    l = r * r + h * h;
                                return l > 0 && ((n = ((t.x - s) * r + (t.y - a) * h) / l) > 1 ? (s = i.x, a = i.y) : n > 0 && (s += r * n, a += h * n)), r = t.x - s, h = t.y - a, o ? r * r + h * h : new d.Point(s, a)
                            }
                        }, d.Polyline = d.Path.extend({
                            initialize: function (t, e) {
                                d.Path.prototype.initialize.call(this, e), this._latlngs = this._convertLatLngs(t)
                            },
                            options: {
                                smoothFactor: 1,
                                noClip: !1
                            },
                            projectLatlngs: function () {
                                this._originalPoints = [];
                                for (var t = 0, e = this._latlngs.length; t < e; t++) this._originalPoints[t] = this._map.latLngToLayerPoint(this._latlngs[t])
                            },
                            getPathString: function () {
                                for (var t = 0, e = this._parts.length, i = ""; t < e; t++) i += this._getPathPartStr(this._parts[t]);
                                return i
                            },
                            getLatLngs: function () {
                                return this._latlngs
                            },
                            setLatLngs: function (t) {
                                return this._latlngs = this._convertLatLngs(t), this.redraw()
                            },
                            addLatLng: function (t) {
                                return this._latlngs.push(d.latLng(t)), this.redraw()
                            },
                            spliceLatLngs: function () {
                                var t = [].splice.apply(this._latlngs, arguments);
                                return this._convertLatLngs(this._latlngs, !0), this.redraw(), t
                            },
                            closestLayerPoint: function (t) {
                                for (var e, i, o = 1 / 0, n = this._parts, s = null, a = 0, r = n.length; a < r; a++)
                                    for (var h = n[a], l = 1, c = h.length; l < c; l++) {
                                        e = h[l - 1], i = h[l];
                                        var p = d.LineUtil._sqClosestPointOnSegment(t, e, i, !0);
                                        p < o && (o = p, s = d.LineUtil._sqClosestPointOnSegment(t, e, i))
                                    }
                                return s && (s.distance = Math.sqrt(o)), s
                            },
                            getBounds: function () {
                                return new d.LatLngBounds(this.getLatLngs())
                            },
                            _convertLatLngs: function (t, e) {
                                var i, o, n = e ? t : [];
                                for (i = 0, o = t.length; i < o; i++) {
                                    if (d.Util.isArray(t[i]) && "number" != typeof t[i][0]) return;
                                    n[i] = d.latLng(t[i])
                                }
                                return n
                            },
                            _initEvents: function () {
                                d.Path.prototype._initEvents.call(this)
                            },
                            _getPathPartStr: function (t) {
                                for (var e, i = d.Path.VML, o = 0, n = t.length, s = ""; o < n; o++) e = t[o], i && e._round(), s += (o ? "L" : "M") + e.x + " " + e.y;
                                return s
                            },
                            _clipPoints: function () {
                                var t, e, i, o = this._originalPoints,
                                    n = o.length;
                                if (this.options.noClip) this._parts = [o];
                                else {
                                    this._parts = [];
                                    var s = this._parts,
                                        a = this._map._pathViewport,
                                        r = d.LineUtil;
                                    for (t = 0, e = 0; t < n - 1; t++)(i = r.clipSegment(o[t], o[t + 1], a, t)) && (s[e] = s[e] || [], s[e].push(i[0]), i[1] === o[t + 1] && t !== n - 2 || (s[e].push(i[1]), e++))
                                }
                            },
                            _simplifyPoints: function () {
                                for (var t = this._parts, e = d.LineUtil, i = 0, o = t.length; i < o; i++) t[i] = e.simplify(t[i], this.options.smoothFactor)
                            },
                            _updatePath: function () {
                                this._map && (this._clipPoints(), this._simplifyPoints(), d.Path.prototype._updatePath.call(this))
                            }
                        }), d.polyline = function (t, e) {
                            return new d.Polyline(t, e)
                        }, d.PolyUtil = {}, d.PolyUtil.clipPolygon = function (t, e) {
                            var i, o, n, s, a, r, h, l, c, p = [1, 4, 2, 8],
                                _ = d.LineUtil;
                            for (o = 0, h = t.length; o < h; o++) t[o]._code = _._getBitCode(t[o], e);
                            for (s = 0; s < 4; s++) {
                                for (l = p[s], i = [], o = 0, n = (h = t.length) - 1; o < h; n = o++) a = t[o], r = t[n], a._code & l ? r._code & l || ((c = _._getEdgeIntersection(r, a, l, e))._code = _._getBitCode(c, e), i.push(c)) : (r._code & l && ((c = _._getEdgeIntersection(r, a, l, e))._code = _._getBitCode(c, e), i.push(c)), i.push(a));
                                t = i
                            }
                            return t
                        }, d.Polygon = d.Polyline.extend({
                            options: {
                                fill: !0
                            },
                            initialize: function (t, e) {
                                d.Polyline.prototype.initialize.call(this, t, e), this._initWithHoles(t)
                            },
                            _initWithHoles: function (t) {
                                var e, i, o;
                                if (t && d.Util.isArray(t[0]) && "number" != typeof t[0][0])
                                    for (this._latlngs = this._convertLatLngs(t[0]), this._holes = t.slice(1), e = 0, i = this._holes.length; e < i; e++)(o = this._holes[e] = this._convertLatLngs(this._holes[e]))[0].equals(o[o.length - 1]) && o.pop();
                                (t = this._latlngs).length >= 2 && t[0].equals(t[t.length - 1]) && t.pop()
                            },
                            projectLatlngs: function () {
                                var t, e, i, o;
                                if (d.Polyline.prototype.projectLatlngs.call(this), this._holePoints = [], this._holes)
                                    for (t = 0, i = this._holes.length; t < i; t++)
                                        for (this._holePoints[t] = [], e = 0, o = this._holes[t].length; e < o; e++) this._holePoints[t][e] = this._map.latLngToLayerPoint(this._holes[t][e])
                            },
                            setLatLngs: function (t) {
                                return t && d.Util.isArray(t[0]) && "number" != typeof t[0][0] ? (this._initWithHoles(t), this.redraw()) : d.Polyline.prototype.setLatLngs.call(this, t)
                            },
                            _clipPoints: function () {
                                var t = this._originalPoints,
                                    e = [];
                                if (this._parts = [t].concat(this._holePoints), !this.options.noClip) {
                                    for (var i = 0, o = this._parts.length; i < o; i++) {
                                        var n = d.PolyUtil.clipPolygon(this._parts[i], this._map._pathViewport);
                                        n.length && e.push(n)
                                    }
                                    this._parts = e
                                }
                            },
                            _getPathPartStr: function (t) {
                                return d.Polyline.prototype._getPathPartStr.call(this, t) + (d.Browser.svg ? "z" : "x")
                            }
                        }), d.polygon = function (t, e) {
                            return new d.Polygon(t, e)
                        },
                        function () {
                            function t(t) {
                                return d.FeatureGroup.extend({
                                    initialize: function (t, e) {
                                        this._layers = {}, this._options = e, this.setLatLngs(t)
                                    },
                                    setLatLngs: function (e) {
                                        var i = 0,
                                            o = e.length;
                                        for (this.eachLayer((function (t) {
                                                i < o ? t.setLatLngs(e[i++]) : this.removeLayer(t)
                                            }), this); i < o;) this.addLayer(new t(e[i++], this._options));
                                        return this
                                    },
                                    getLatLngs: function () {
                                        var t = [];
                                        return this.eachLayer((function (e) {
                                            t.push(e.getLatLngs())
                                        })), t
                                    }
                                })
                            }
                            d.MultiPolyline = t(d.Polyline), d.MultiPolygon = t(d.Polygon), d.multiPolyline = function (t, e) {
                                return new d.MultiPolyline(t, e)
                            }, d.multiPolygon = function (t, e) {
                                return new d.MultiPolygon(t, e)
                            }
                        }(), d.Rectangle = d.Polygon.extend({
                            initialize: function (t, e) {
                                d.Polygon.prototype.initialize.call(this, this._boundsToLatLngs(t), e)
                            },
                            setBounds: function (t) {
                                this.setLatLngs(this._boundsToLatLngs(t))
                            },
                            _boundsToLatLngs: function (t) {
                                return [(t = d.latLngBounds(t)).getSouthWest(), t.getNorthWest(), t.getNorthEast(), t.getSouthEast()]
                            }
                        }), d.rectangle = function (t, e) {
                            return new d.Rectangle(t, e)
                        }, d.Circle = d.Path.extend({
                            initialize: function (t, e, i) {
                                d.Path.prototype.initialize.call(this, i), this._latlng = d.latLng(t), this._mRadius = e
                            },
                            options: {
                                fill: !0
                            },
                            setLatLng: function (t) {
                                return this._latlng = d.latLng(t), this.redraw()
                            },
                            setRadius: function (t) {
                                return this._mRadius = t, this.redraw()
                            },
                            projectLatlngs: function () {
                                var t = this._getLngRadius(),
                                    e = this._latlng,
                                    i = this._map.latLngToLayerPoint([e.lat, e.lng - t]);
                                this._point = this._map.latLngToLayerPoint(e), this._radius = Math.max(this._point.x - i.x, 1)
                            },
                            getBounds: function () {
                                var t = this._getLngRadius(),
                                    e = this._mRadius / 40075017 * 360,
                                    i = this._latlng;
                                return new d.LatLngBounds([i.lat - e, i.lng - t], [i.lat + e, i.lng + t])
                            },
                            getLatLng: function () {
                                return this._latlng
                            },
                            getPathString: function () {
                                var t = this._point,
                                    e = this._radius;
                                return this._checkIfEmpty() ? "" : d.Browser.svg ? "M" + t.x + "," + (t.y - e) + "A" + e + "," + e + ",0,1,1," + (t.x - .1) + "," + (t.y - e) + " z" : (t._round(), e = Math.round(e), "AL " + t.x + "," + t.y + " " + e + "," + e + " 0,23592600")
                            },
                            getRadius: function () {
                                return this._mRadius
                            },
                            _getLatRadius: function () {
                                return this._mRadius / 40075017 * 360
                            },
                            _getLngRadius: function () {
                                return this._getLatRadius() / Math.cos(d.LatLng.DEG_TO_RAD * this._latlng.lat)
                            },
                            _checkIfEmpty: function () {
                                if (!this._map) return !1;
                                var t = this._map._pathViewport,
                                    e = this._radius,
                                    i = this._point;
                                return i.x - e > t.max.x || i.y - e > t.max.y || i.x + e < t.min.x || i.y + e < t.min.y
                            }
                        }), d.circle = function (t, e, i) {
                            return new d.Circle(t, e, i)
                        }, d.CircleMarker = d.Circle.extend({
                            options: {
                                radius: 10,
                                weight: 2
                            },
                            initialize: function (t, e) {
                                d.Circle.prototype.initialize.call(this, t, null, e), this._radius = this.options.radius
                            },
                            projectLatlngs: function () {
                                this._point = this._map.latLngToLayerPoint(this._latlng)
                            },
                            _updateStyle: function () {
                                d.Circle.prototype._updateStyle.call(this), this.setRadius(this.options.radius)
                            },
                            setLatLng: function (t) {
                                return d.Circle.prototype.setLatLng.call(this, t), this._popup && this._popup._isOpen && this._popup.setLatLng(t), this
                            },
                            setRadius: function (t) {
                                return this.options.radius = this._radius = t, this.redraw()
                            },
                            getRadius: function () {
                                return this._radius
                            }
                        }), d.circleMarker = function (t, e) {
                            return new d.CircleMarker(t, e)
                        }, d.Polyline.include(d.Path.CANVAS ? {
                            _containsPoint: function (t, e) {
                                var i, o, n, s, a, r, h = this.options.weight / 2;
                                for (d.Browser.touch && (h += 10), i = 0, s = this._parts.length; i < s; i++)
                                    for (o = 0, n = (a = (r = this._parts[i]).length) - 1; o < a; n = o++)
                                        if ((e || 0 !== o) && d.LineUtil.pointToSegmentDistance(t, r[n], r[o]) <= h) return !0;
                                return !1
                            }
                        } : {}), d.Polygon.include(d.Path.CANVAS ? {
                            _containsPoint: function (t) {
                                var e, i, o, n, s, a, r, h, l = !1;
                                if (d.Polyline.prototype._containsPoint.call(this, t, !0)) return !0;
                                for (n = 0, r = this._parts.length; n < r; n++)
                                    for (s = 0, a = (h = (e = this._parts[n]).length) - 1; s < h; a = s++) i = e[s], o = e[a], i.y > t.y != o.y > t.y && t.x < (o.x - i.x) * (t.y - i.y) / (o.y - i.y) + i.x && (l = !l);
                                return l
                            }
                        } : {}), d.Circle.include(d.Path.CANVAS ? {
                            _drawPath: function () {
                                var t = this._point;
                                this._ctx.beginPath(), this._ctx.arc(t.x, t.y, this._radius, 0, 2 * Math.PI, !1)
                            },
                            _containsPoint: function (t) {
                                var e = this._point,
                                    i = this.options.stroke ? this.options.weight / 2 : 0;
                                return t.distanceTo(e) <= this._radius + i
                            }
                        } : {}), d.CircleMarker.include(d.Path.CANVAS ? {
                            _updateStyle: function () {
                                d.Path.prototype._updateStyle.call(this)
                            }
                        } : {}), d.GeoJSON = d.FeatureGroup.extend({
                            initialize: function (t, e) {
                                d.setOptions(this, e), this._layers = {}, t && this.addData(t)
                            },
                            addData: function (t) {
                                var e, i, o, n = d.Util.isArray(t) ? t : t.features;
                                if (n) {
                                    for (e = 0, i = n.length; e < i; e++)((o = n[e]).geometries || o.geometry || o.features || o.coordinates) && this.addData(n[e]);
                                    return this
                                }
                                var s = this.options;
                                if (!s.filter || s.filter(t)) {
                                    var a = d.GeoJSON.geometryToLayer(t, s.pointToLayer, s.coordsToLatLng, s);
                                    return a.feature = d.GeoJSON.asFeature(t), a.defaultOptions = a.options, this.resetStyle(a), s.onEachFeature && s.onEachFeature(t, a), this.addLayer(a)
                                }
                            },
                            resetStyle: function (t) {
                                var e = this.options.style;
                                e && (d.Util.extend(t.options, t.defaultOptions), this._setLayerStyle(t, e))
                            },
                            setStyle: function (t) {
                                this.eachLayer((function (e) {
                                    this._setLayerStyle(e, t)
                                }), this)
                            },
                            _setLayerStyle: function (t, e) {
                                "function" == typeof e && (e = e(t.feature)), t.setStyle && t.setStyle(e)
                            }
                        }), d.extend(d.GeoJSON, {
                            geometryToLayer: function (t, e, i, o) {
                                var n, s, a, r, h = "Feature" === t.type ? t.geometry : t,
                                    l = h.coordinates,
                                    c = [];
                                switch (i = i || this.coordsToLatLng, h.type) {
                                    case "Point":
                                        return n = i(l), e ? e(t, n) : new d.Marker(n);
                                    case "MultiPoint":
                                        for (a = 0, r = l.length; a < r; a++) n = i(l[a]), c.push(e ? e(t, n) : new d.Marker(n));
                                        return new d.FeatureGroup(c);
                                    case "LineString":
                                        return s = this.coordsToLatLngs(l, 0, i), new d.Polyline(s, o);
                                    case "Polygon":
                                        if (2 === l.length && !l[1].length) throw new Error("Invalid GeoJSON object.");
                                        return s = this.coordsToLatLngs(l, 1, i), new d.Polygon(s, o);
                                    case "MultiLineString":
                                        return s = this.coordsToLatLngs(l, 1, i), new d.MultiPolyline(s, o);
                                    case "MultiPolygon":
                                        return s = this.coordsToLatLngs(l, 2, i), new d.MultiPolygon(s, o);
                                    case "GeometryCollection":
                                        for (a = 0, r = h.geometries.length; a < r; a++) c.push(this.geometryToLayer({
                                            geometry: h.geometries[a],
                                            type: "Feature",
                                            properties: t.properties
                                        }, e, i, o));
                                        return new d.FeatureGroup(c);
                                    default:
                                        throw new Error("Invalid GeoJSON object.")
                                }
                            },
                            coordsToLatLng: function (t) {
                                return new d.LatLng(t[1], t[0], t[2])
                            },
                            coordsToLatLngs: function (t, e, i) {
                                var o, n, s, a = [];
                                for (n = 0, s = t.length; n < s; n++) o = e ? this.coordsToLatLngs(t[n], e - 1, i) : (i || this.coordsToLatLng)(t[n]), a.push(o);
                                return a
                            },
                            latLngToCoords: function (t) {
                                var e = [t.lng, t.lat];
                                return t.alt !== r && e.push(t.alt), e
                            },
                            latLngsToCoords: function (t) {
                                for (var e = [], i = 0, o = t.length; i < o; i++) e.push(d.GeoJSON.latLngToCoords(t[i]));
                                return e
                            },
                            getFeature: function (t, e) {
                                return t.feature ? d.extend({}, t.feature, {
                                    geometry: e
                                }) : d.GeoJSON.asFeature(e)
                            },
                            asFeature: function (t) {
                                return "Feature" === t.type ? t : {
                                    type: "Feature",
                                    properties: {},
                                    geometry: t
                                }
                            }
                        });
                    var I = {
                        toGeoJSON: function () {
                            return d.GeoJSON.getFeature(this, {
                                type: "Point",
                                coordinates: d.GeoJSON.latLngToCoords(this.getLatLng())
                            })
                        }
                    };
                    d.Marker.include(I), d.Circle.include(I), d.CircleMarker.include(I), d.Polyline.include({
                            toGeoJSON: function () {
                                return d.GeoJSON.getFeature(this, {
                                    type: "LineString",
                                    coordinates: d.GeoJSON.latLngsToCoords(this.getLatLngs())
                                })
                            }
                        }), d.Polygon.include({
                            toGeoJSON: function () {
                                var t, e, i, o = [d.GeoJSON.latLngsToCoords(this.getLatLngs())];
                                if (o[0].push(o[0][0]), this._holes)
                                    for (t = 0, e = this._holes.length; t < e; t++)(i = d.GeoJSON.latLngsToCoords(this._holes[t])).push(i[0]), o.push(i);
                                return d.GeoJSON.getFeature(this, {
                                    type: "Polygon",
                                    coordinates: o
                                })
                            }
                        }),
                        function () {
                            function t(t) {
                                return function () {
                                    var e = [];
                                    return this.eachLayer((function (t) {
                                        e.push(t.toGeoJSON().geometry.coordinates)
                                    })), d.GeoJSON.getFeature(this, {
                                        type: t,
                                        coordinates: e
                                    })
                                }
                            }
                            d.MultiPolyline.include({
                                toGeoJSON: t("MultiLineString")
                            }), d.MultiPolygon.include({
                                toGeoJSON: t("MultiPolygon")
                            }), d.LayerGroup.include({
                                toGeoJSON: function () {
                                    var e, i = this.feature && this.feature.geometry,
                                        o = [];
                                    if (i && "MultiPoint" === i.type) return t("MultiPoint").call(this);
                                    var n = i && "GeometryCollection" === i.type;
                                    return this.eachLayer((function (t) {
                                        t.toGeoJSON && (e = t.toGeoJSON(), o.push(n ? e.geometry : d.GeoJSON.asFeature(e)))
                                    })), n ? d.GeoJSON.getFeature(this, {
                                        geometries: o,
                                        type: "GeometryCollection"
                                    }) : {
                                        type: "FeatureCollection",
                                        features: o
                                    }
                                }
                            })
                        }(), d.geoJson = function (t, e) {
                            return new d.GeoJSON(t, e)
                        }, d.DomEvent = {
                            addListener: function (t, e, i, o) {
                                var n, s, a, r = d.stamp(i),
                                    h = "_leaflet_" + e + r;
                                return t[h] ? this : (n = function (e) {
                                    return i.call(o || t, e || d.DomEvent._getEvent())
                                }, d.Browser.pointer && 0 === e.indexOf("touch") ? this.addPointerListener(t, e, n, r) : (d.Browser.touch && "dblclick" === e && this.addDoubleTapListener && this.addDoubleTapListener(t, n, r), "addEventListener" in t ? "mousewheel" === e ? (t.addEventListener("DOMMouseScroll", n, !1), t.addEventListener(e, n, !1)) : "mouseenter" === e || "mouseleave" === e ? (s = n, a = "mouseenter" === e ? "mouseover" : "mouseout", n = function (e) {
                                    if (d.DomEvent._checkMouse(t, e)) return s(e)
                                }, t.addEventListener(a, n, !1)) : "click" === e && d.Browser.android ? (s = n, n = function (t) {
                                    return d.DomEvent._filterClick(t, s)
                                }, t.addEventListener(e, n, !1)) : t.addEventListener(e, n, !1) : "attachEvent" in t && t.attachEvent("on" + e, n), t[h] = n, this))
                            },
                            removeListener: function (t, e, i) {
                                var o = d.stamp(i),
                                    n = "_leaflet_" + e + o,
                                    s = t[n];
                                return s ? (d.Browser.pointer && 0 === e.indexOf("touch") ? this.removePointerListener(t, e, o) : d.Browser.touch && "dblclick" === e && this.removeDoubleTapListener ? this.removeDoubleTapListener(t, o) : "removeEventListener" in t ? "mousewheel" === e ? (t.removeEventListener("DOMMouseScroll", s, !1), t.removeEventListener(e, s, !1)) : "mouseenter" === e || "mouseleave" === e ? t.removeEventListener("mouseenter" === e ? "mouseover" : "mouseout", s, !1) : t.removeEventListener(e, s, !1) : "detachEvent" in t && t.detachEvent("on" + e, s), t[n] = null, this) : this
                            },
                            stopPropagation: function (t) {
                                return t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0, d.DomEvent._skipped(t), this
                            },
                            disableScrollPropagation: function (t) {
                                var e = d.DomEvent.stopPropagation;
                                return d.DomEvent.on(t, "mousewheel", e).on(t, "MozMousePixelScroll", e)
                            },
                            disableClickPropagation: function (t) {
                                for (var e = d.DomEvent.stopPropagation, i = d.Draggable.START.length - 1; i >= 0; i--) d.DomEvent.on(t, d.Draggable.START[i], e);
                                return d.DomEvent.on(t, "click", d.DomEvent._fakeStop).on(t, "dblclick", e)
                            },
                            preventDefault: function (t) {
                                return t.preventDefault ? t.preventDefault() : t.returnValue = !1, this
                            },
                            stop: function (t) {
                                return d.DomEvent.preventDefault(t).stopPropagation(t)
                            },
                            getMousePosition: function (t, e) {
                                if (!e) return new d.Point(t.clientX, t.clientY);
                                var i = e.getBoundingClientRect();
                                return new d.Point(t.clientX - i.left - e.clientLeft, t.clientY - i.top - e.clientTop)
                            },
                            getWheelDelta: function (t) {
                                var e = 0;
                                return t.wheelDelta && (e = t.wheelDelta / 120), t.detail && (e = -t.detail / 3), e
                            },
                            _skipEvents: {},
                            _fakeStop: function (t) {
                                d.DomEvent._skipEvents[t.type] = !0
                            },
                            _skipped: function (t) {
                                var e = this._skipEvents[t.type];
                                return this._skipEvents[t.type] = !1, e
                            },
                            _checkMouse: function (t, e) {
                                var i = e.relatedTarget;
                                if (!i) return !0;
                                try {
                                    for (; i && i !== t;) i = i.parentNode
                                } catch (t) {
                                    return !1
                                }
                                return i !== t
                            },
                            _getEvent: function () {
                                var t = s.event;
                                if (!t)
                                    for (var e = arguments.callee.caller; e && (!(t = e.arguments[0]) || s.Event !== t.constructor);) e = e.caller;
                                return t
                            },
                            _filterClick: function (t, e) {
                                var i = t.timeStamp || t.originalEvent.timeStamp,
                                    o = d.DomEvent._lastClick && i - d.DomEvent._lastClick;
                                if (!(o && o > 100 && o < 500 || t.target._simulatedClick && !t._simulated)) return d.DomEvent._lastClick = i, e(t);
                                d.DomEvent.stop(t)
                            }
                        }, d.DomEvent.on = d.DomEvent.addListener, d.DomEvent.off = d.DomEvent.removeListener, d.Draggable = d.Class.extend({
                            includes: d.Mixin.Events,
                            statics: {
                                START: d.Browser.touch ? ["touchstart", "mousedown"] : ["mousedown"],
                                END: {
                                    mousedown: "mouseup",
                                    touchstart: "touchend",
                                    pointerdown: "touchend",
                                    MSPointerDown: "touchend"
                                },
                                MOVE: {
                                    mousedown: "mousemove",
                                    touchstart: "touchmove",
                                    pointerdown: "touchmove",
                                    MSPointerDown: "touchmove"
                                }
                            },
                            initialize: function (t, e) {
                                this._element = t, this._dragStartTarget = e || t
                            },
                            enable: function () {
                                if (!this._enabled) {
                                    for (var t = d.Draggable.START.length - 1; t >= 0; t--) d.DomEvent.on(this._dragStartTarget, d.Draggable.START[t], this._onDown, this);
                                    this._enabled = !0
                                }
                            },
                            disable: function () {
                                if (this._enabled) {
                                    for (var t = d.Draggable.START.length - 1; t >= 0; t--) d.DomEvent.off(this._dragStartTarget, d.Draggable.START[t], this._onDown, this);
                                    this._enabled = !1, this._moved = !1
                                }
                            },
                            _onDown: function (t) {
                                if (this._moved = !1, !t.shiftKey && (1 === t.which || 1 === t.button || t.touches) && (d.DomEvent.stopPropagation(t), !d.Draggable._disabled && (d.DomUtil.disableImageDrag(), d.DomUtil.disableTextSelection(), !this._moving))) {
                                    var e = t.touches ? t.touches[0] : t;
                                    this._startPoint = new d.Point(e.clientX, e.clientY), this._startPos = this._newPos = d.DomUtil.getPosition(this._element), d.DomEvent.on(a, d.Draggable.MOVE[t.type], this._onMove, this).on(a, d.Draggable.END[t.type], this._onUp, this)
                                }
                            },
                            _onMove: function (t) {
                                if (t.touches && t.touches.length > 1) this._moved = !0;
                                else {
                                    var e = t.touches && 1 === t.touches.length ? t.touches[0] : t,
                                        i = new d.Point(e.clientX, e.clientY).subtract(this._startPoint);
                                    (i.x || i.y) && (d.Browser.touch && Math.abs(i.x) + Math.abs(i.y) < 3 || (d.DomEvent.preventDefault(t), this._moved || (this.fire("dragstart"), this._moved = !0, this._startPos = d.DomUtil.getPosition(this._element).subtract(i), d.DomUtil.addClass(a.body, "leaflet-dragging"), this._lastTarget = t.target || t.srcElement, d.DomUtil.addClass(this._lastTarget, "leaflet-drag-target")), this._newPos = this._startPos.add(i), this._moving = !0, d.Util.cancelAnimFrame(this._animRequest), this._animRequest = d.Util.requestAnimFrame(this._updatePosition, this, !0, this._dragStartTarget)))
                                }
                            },
                            _updatePosition: function () {
                                this.fire("predrag"), d.DomUtil.setPosition(this._element, this._newPos), this.fire("drag")
                            },
                            _onUp: function () {
                                for (var t in d.DomUtil.removeClass(a.body, "leaflet-dragging"), this._lastTarget && (d.DomUtil.removeClass(this._lastTarget, "leaflet-drag-target"), this._lastTarget = null), d.Draggable.MOVE) d.DomEvent.off(a, d.Draggable.MOVE[t], this._onMove).off(a, d.Draggable.END[t], this._onUp);
                                d.DomUtil.enableImageDrag(), d.DomUtil.enableTextSelection(), this._moved && this._moving && (d.Util.cancelAnimFrame(this._animRequest), this.fire("dragend", {
                                    distance: this._newPos.distanceTo(this._startPos)
                                })), this._moving = !1
                            }
                        }), d.Handler = d.Class.extend({
                            initialize: function (t) {
                                this._map = t
                            },
                            enable: function () {
                                this._enabled || (this._enabled = !0, this.addHooks())
                            },
                            disable: function () {
                                this._enabled && (this._enabled = !1, this.removeHooks())
                            },
                            enabled: function () {
                                return !!this._enabled
                            }
                        }), d.Map.mergeOptions({
                            dragging: !0,
                            inertia: !d.Browser.android23,
                            inertiaDeceleration: 3400,
                            inertiaMaxSpeed: 1 / 0,
                            inertiaThreshold: d.Browser.touch ? 32 : 18,
                            easeLinearity: .25,
                            worldCopyJump: !1
                        }), d.Map.Drag = d.Handler.extend({
                            addHooks: function () {
                                if (!this._draggable) {
                                    var t = this._map;
                                    this._draggable = new d.Draggable(t._mapPane, t._container), this._draggable.on({
                                        dragstart: this._onDragStart,
                                        drag: this._onDrag,
                                        dragend: this._onDragEnd
                                    }, this), t.options.worldCopyJump && (this._draggable.on("predrag", this._onPreDrag, this), t.on("viewreset", this._onViewReset, this), t.whenReady(this._onViewReset, this))
                                }
                                this._draggable.enable()
                            },
                            removeHooks: function () {
                                this._draggable.disable()
                            },
                            moved: function () {
                                return this._draggable && this._draggable._moved
                            },
                            _onDragStart: function () {
                                var t = this._map;
                                t._panAnim && t._panAnim.stop(), t.fire("movestart").fire("dragstart"), t.options.inertia && (this._positions = [], this._times = [])
                            },
                            _onDrag: function () {
                                if (this._map.options.inertia) {
                                    var t = this._lastTime = +new Date,
                                        e = this._lastPos = this._draggable._newPos;
                                    this._positions.push(e), this._times.push(t), t - this._times[0] > 200 && (this._positions.shift(), this._times.shift())
                                }
                                this._map.fire("move").fire("drag")
                            },
                            _onViewReset: function () {
                                var t = this._map.getSize()._divideBy(2),
                                    e = this._map.latLngToLayerPoint([0, 0]);
                                this._initialWorldOffset = e.subtract(t).x, this._worldWidth = this._map.project([0, 180]).x
                            },
                            _onPreDrag: function () {
                                var t = this._worldWidth,
                                    e = Math.round(t / 2),
                                    i = this._initialWorldOffset,
                                    o = this._draggable._newPos.x,
                                    n = (o - e + i) % t + e - i,
                                    s = (o + e + i) % t - e - i,
                                    a = Math.abs(n + i) < Math.abs(s + i) ? n : s;
                                this._draggable._newPos.x = a
                            },
                            _onDragEnd: function (t) {
                                var e = this._map,
                                    i = e.options,
                                    o = +new Date - this._lastTime,
                                    n = !i.inertia || o > i.inertiaThreshold || !this._positions[0];
                                if (e.fire("dragend", t), n) e.fire("moveend");
                                else {
                                    var s = this._lastPos.subtract(this._positions[0]),
                                        a = (this._lastTime + o - this._times[0]) / 1e3,
                                        r = i.easeLinearity,
                                        h = s.multiplyBy(r / a),
                                        l = h.distanceTo([0, 0]),
                                        c = Math.min(i.inertiaMaxSpeed, l),
                                        p = h.multiplyBy(c / l),
                                        _ = c / (i.inertiaDeceleration * r),
                                        u = p.multiplyBy(-_ / 2).round();
                                    u.x && u.y ? (u = e._limitOffset(u, e.options.maxBounds), d.Util.requestAnimFrame((function () {
                                        e.panBy(u, {
                                            duration: _,
                                            easeLinearity: r,
                                            noMoveStart: !0
                                        })
                                    }))) : e.fire("moveend")
                                }
                            }
                        }), d.Map.addInitHook("addHandler", "dragging", d.Map.Drag), d.Map.mergeOptions({
                            doubleClickZoom: !0
                        }), d.Map.DoubleClickZoom = d.Handler.extend({
                            addHooks: function () {
                                this._map.on("dblclick", this._onDoubleClick, this)
                            },
                            removeHooks: function () {
                                this._map.off("dblclick", this._onDoubleClick, this)
                            },
                            _onDoubleClick: function (t) {
                                var e = this._map,
                                    i = e.getZoom() + (t.originalEvent.shiftKey ? -1 : 1);
                                "center" === e.options.doubleClickZoom ? e.setZoom(i) : e.setZoomAround(t.containerPoint, i)
                            }
                        }), d.Map.addInitHook("addHandler", "doubleClickZoom", d.Map.DoubleClickZoom), d.Map.mergeOptions({
                            scrollWheelZoom: !0
                        }), d.Map.ScrollWheelZoom = d.Handler.extend({
                            addHooks: function () {
                                d.DomEvent.on(this._map._container, "mousewheel", this._onWheelScroll, this), d.DomEvent.on(this._map._container, "MozMousePixelScroll", d.DomEvent.preventDefault), this._delta = 0
                            },
                            removeHooks: function () {
                                d.DomEvent.off(this._map._container, "mousewheel", this._onWheelScroll), d.DomEvent.off(this._map._container, "MozMousePixelScroll", d.DomEvent.preventDefault)
                            },
                            _onWheelScroll: function (t) {
                                var e = d.DomEvent.getWheelDelta(t);
                                this._delta += e, this._lastMousePos = this._map.mouseEventToContainerPoint(t), this._startTime || (this._startTime = +new Date);
                                var i = Math.max(40 - (+new Date - this._startTime), 0);
                                clearTimeout(this._timer), this._timer = setTimeout(d.bind(this._performZoom, this), i), d.DomEvent.preventDefault(t), d.DomEvent.stopPropagation(t)
                            },
                            _performZoom: function () {
                                var t = this._map,
                                    e = this._delta,
                                    i = t.getZoom();
                                e = e > 0 ? Math.ceil(e) : Math.floor(e), e = Math.max(Math.min(e, 4), -4), e = t._limitZoom(i + e) - i, this._delta = 0, this._startTime = null, e && ("center" === t.options.scrollWheelZoom ? t.setZoom(i + e) : t.setZoomAround(this._lastMousePos, i + e))
                            }
                        }), d.Map.addInitHook("addHandler", "scrollWheelZoom", d.Map.ScrollWheelZoom), d.extend(d.DomEvent, {
                            _touchstart: d.Browser.msPointer ? "MSPointerDown" : d.Browser.pointer ? "pointerdown" : "touchstart",
                            _touchend: d.Browser.msPointer ? "MSPointerUp" : d.Browser.pointer ? "pointerup" : "touchend",
                            addDoubleTapListener: function (t, e, i) {
                                var o, n, s = !1,
                                    r = "_leaflet_",
                                    h = this._touchstart,
                                    l = this._touchend,
                                    c = [];

                                function p(t) {
                                    var e;
                                    if (d.Browser.pointer ? (c.push(t.pointerId), e = c.length) : e = t.touches.length, !(e > 1)) {
                                        var i = Date.now(),
                                            a = i - (o || i);
                                        n = t.touches ? t.touches[0] : t, s = a > 0 && a <= 250, o = i
                                    }
                                }

                                function _(t) {
                                    if (d.Browser.pointer) {
                                        var i = c.indexOf(t.pointerId);
                                        if (-1 === i) return;
                                        c.splice(i, 1)
                                    }
                                    if (s) {
                                        if (d.Browser.pointer) {
                                            var a, r = {};
                                            for (var h in n) a = n[h], r[h] = "function" == typeof a ? a.bind(n) : a;
                                            n = r
                                        }
                                        n.type = "dblclick", e(n), o = null
                                    }
                                }
                                t[r + h + i] = p, t[r + l + i] = _;
                                var u = d.Browser.pointer ? a.documentElement : t;
                                return t.addEventListener(h, p, !1), u.addEventListener(l, _, !1), d.Browser.pointer && u.addEventListener(d.DomEvent.POINTER_CANCEL, _, !1), this
                            },
                            removeDoubleTapListener: function (t, e) {
                                var i = "_leaflet_";
                                return t.removeEventListener(this._touchstart, t[i + this._touchstart + e], !1), (d.Browser.pointer ? a.documentElement : t).removeEventListener(this._touchend, t[i + this._touchend + e], !1), d.Browser.pointer && a.documentElement.removeEventListener(d.DomEvent.POINTER_CANCEL, t[i + this._touchend + e], !1), this
                            }
                        }), d.extend(d.DomEvent, {
                            POINTER_DOWN: d.Browser.msPointer ? "MSPointerDown" : "pointerdown",
                            POINTER_MOVE: d.Browser.msPointer ? "MSPointerMove" : "pointermove",
                            POINTER_UP: d.Browser.msPointer ? "MSPointerUp" : "pointerup",
                            POINTER_CANCEL: d.Browser.msPointer ? "MSPointerCancel" : "pointercancel",
                            _pointers: [],
                            _pointerDocumentListener: !1,
                            addPointerListener: function (t, e, i, o) {
                                switch (e) {
                                    case "touchstart":
                                        return this.addPointerListenerStart(t, e, i, o);
                                    case "touchend":
                                        return this.addPointerListenerEnd(t, e, i, o);
                                    case "touchmove":
                                        return this.addPointerListenerMove(t, e, i, o);
                                    default:
                                        throw "Unknown touch event type"
                                }
                            },
                            addPointerListenerStart: function (t, e, i, o) {
                                var n = this._pointers,
                                    s = function (t) {
                                        "mouse" !== t.pointerType && t.pointerType !== t.MSPOINTER_TYPE_MOUSE && d.DomEvent.preventDefault(t);
                                        for (var e = !1, o = 0; o < n.length; o++)
                                            if (n[o].pointerId === t.pointerId) {
                                                e = !0;
                                                break
                                            } e || n.push(t), t.touches = n.slice(), t.changedTouches = [t], i(t)
                                    };
                                if (t["_leaflet_touchstart" + o] = s, t.addEventListener(this.POINTER_DOWN, s, !1), !this._pointerDocumentListener) {
                                    var r = function (t) {
                                        for (var e = 0; e < n.length; e++)
                                            if (n[e].pointerId === t.pointerId) {
                                                n.splice(e, 1);
                                                break
                                            }
                                    };
                                    a.documentElement.addEventListener(this.POINTER_UP, r, !1), a.documentElement.addEventListener(this.POINTER_CANCEL, r, !1), this._pointerDocumentListener = !0
                                }
                                return this
                            },
                            addPointerListenerMove: function (t, e, i, o) {
                                var n = this._pointers;

                                function s(t) {
                                    if (t.pointerType !== t.MSPOINTER_TYPE_MOUSE && "mouse" !== t.pointerType || 0 !== t.buttons) {
                                        for (var e = 0; e < n.length; e++)
                                            if (n[e].pointerId === t.pointerId) {
                                                n[e] = t;
                                                break
                                            } t.touches = n.slice(), t.changedTouches = [t], i(t)
                                    }
                                }
                                return t["_leaflet_touchmove" + o] = s, t.addEventListener(this.POINTER_MOVE, s, !1), this
                            },
                            addPointerListenerEnd: function (t, e, i, o) {
                                var n = this._pointers,
                                    s = function (t) {
                                        for (var e = 0; e < n.length; e++)
                                            if (n[e].pointerId === t.pointerId) {
                                                n.splice(e, 1);
                                                break
                                            } t.touches = n.slice(), t.changedTouches = [t], i(t)
                                    };
                                return t["_leaflet_touchend" + o] = s, t.addEventListener(this.POINTER_UP, s, !1), t.addEventListener(this.POINTER_CANCEL, s, !1), this
                            },
                            removePointerListener: function (t, e, i) {
                                var o = t["_leaflet_" + e + i];
                                switch (e) {
                                    case "touchstart":
                                        t.removeEventListener(this.POINTER_DOWN, o, !1);
                                        break;
                                    case "touchmove":
                                        t.removeEventListener(this.POINTER_MOVE, o, !1);
                                        break;
                                    case "touchend":
                                        t.removeEventListener(this.POINTER_UP, o, !1), t.removeEventListener(this.POINTER_CANCEL, o, !1)
                                }
                                return this
                            }
                        }), d.Map.mergeOptions({
                            touchZoom: d.Browser.touch && !d.Browser.android23,
                            bounceAtZoomLimits: !0
                        }), d.Map.TouchZoom = d.Handler.extend({
                            addHooks: function () {
                                d.DomEvent.on(this._map._container, "touchstart", this._onTouchStart, this)
                            },
                            removeHooks: function () {
                                d.DomEvent.off(this._map._container, "touchstart", this._onTouchStart, this)
                            },
                            _onTouchStart: function (t) {
                                var e = this._map;
                                if (t.touches && 2 === t.touches.length && !e._animatingZoom && !this._zooming) {
                                    var i = e.mouseEventToLayerPoint(t.touches[0]),
                                        o = e.mouseEventToLayerPoint(t.touches[1]),
                                        n = e._getCenterLayerPoint();
                                    this._startCenter = i.add(o)._divideBy(2), this._startDist = i.distanceTo(o), this._moved = !1, this._zooming = !0, this._centerOffset = n.subtract(this._startCenter), e._panAnim && e._panAnim.stop(), d.DomEvent.on(a, "touchmove", this._onTouchMove, this).on(a, "touchend", this._onTouchEnd, this), d.DomEvent.preventDefault(t)
                                }
                            },
                            _onTouchMove: function (t) {
                                var e = this._map;
                                if (t.touches && 2 === t.touches.length && this._zooming) {
                                    var i = e.mouseEventToLayerPoint(t.touches[0]),
                                        o = e.mouseEventToLayerPoint(t.touches[1]);
                                    this._scale = i.distanceTo(o) / this._startDist, this._delta = i._add(o)._divideBy(2)._subtract(this._startCenter), 1 !== this._scale && (!e.options.bounceAtZoomLimits && (e.getZoom() === e.getMinZoom() && this._scale < 1 || e.getZoom() === e.getMaxZoom() && this._scale > 1) || (this._moved || (d.DomUtil.addClass(e._mapPane, "leaflet-touching"), e.fire("movestart").fire("zoomstart"), this._moved = !0), d.Util.cancelAnimFrame(this._animRequest), this._animRequest = d.Util.requestAnimFrame(this._updateOnMove, this, !0, this._map._container), d.DomEvent.preventDefault(t)))
                                }
                            },
                            _updateOnMove: function () {
                                var t = this._map,
                                    e = this._getScaleOrigin(),
                                    i = t.layerPointToLatLng(e),
                                    o = t.getScaleZoom(this._scale);
                                t._animateZoom(i, o, this._startCenter, this._scale, this._delta, !1, !0)
                            },
                            _onTouchEnd: function () {
                                if (this._moved && this._zooming) {
                                    var t = this._map;
                                    this._zooming = !1, d.DomUtil.removeClass(t._mapPane, "leaflet-touching"), d.Util.cancelAnimFrame(this._animRequest), d.DomEvent.off(a, "touchmove", this._onTouchMove).off(a, "touchend", this._onTouchEnd);
                                    var e = this._getScaleOrigin(),
                                        i = t.layerPointToLatLng(e),
                                        o = t.getZoom(),
                                        n = t.getScaleZoom(this._scale) - o,
                                        s = n > 0 ? Math.ceil(n) : Math.floor(n),
                                        r = t._limitZoom(o + s),
                                        h = t.getZoomScale(r) / this._scale;
                                    t._animateZoom(i, r, e, h)
                                } else this._zooming = !1
                            },
                            _getScaleOrigin: function () {
                                var t = this._centerOffset.subtract(this._delta).divideBy(this._scale);
                                return this._startCenter.add(t)
                            }
                        }), d.Map.addInitHook("addHandler", "touchZoom", d.Map.TouchZoom), d.Map.mergeOptions({
                            tap: !0,
                            tapTolerance: 15
                        }), d.Map.Tap = d.Handler.extend({
                            addHooks: function () {
                                d.DomEvent.on(this._map._container, "touchstart", this._onDown, this)
                            },
                            removeHooks: function () {
                                d.DomEvent.off(this._map._container, "touchstart", this._onDown, this)
                            },
                            _onDown: function (t) {
                                if (t.touches) {
                                    if (d.DomEvent.preventDefault(t), this._fireClick = !0, t.touches.length > 1) return this._fireClick = !1, void clearTimeout(this._holdTimeout);
                                    var e = t.touches[0],
                                        i = e.target;
                                    this._startPos = this._newPos = new d.Point(e.clientX, e.clientY), i.tagName && "a" === i.tagName.toLowerCase() && d.DomUtil.addClass(i, "leaflet-active"), this._holdTimeout = setTimeout(d.bind((function () {
                                        this._isTapValid() && (this._fireClick = !1, this._onUp(), this._simulateEvent("contextmenu", e))
                                    }), this), 1e3), d.DomEvent.on(a, "touchmove", this._onMove, this).on(a, "touchend", this._onUp, this)
                                }
                            },
                            _onUp: function (t) {
                                if (clearTimeout(this._holdTimeout), d.DomEvent.off(a, "touchmove", this._onMove, this).off(a, "touchend", this._onUp, this), this._fireClick && t && t.changedTouches) {
                                    var e = t.changedTouches[0],
                                        i = e.target;
                                    i && i.tagName && "a" === i.tagName.toLowerCase() && d.DomUtil.removeClass(i, "leaflet-active"), this._isTapValid() && this._simulateEvent("click", e)
                                }
                            },
                            _isTapValid: function () {
                                return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance
                            },
                            _onMove: function (t) {
                                var e = t.touches[0];
                                this._newPos = new d.Point(e.clientX, e.clientY)
                            },
                            _simulateEvent: function (t, e) {
                                var i = a.createEvent("MouseEvents");
                                i._simulated = !0, e.target._simulatedClick = !0, i.initMouseEvent(t, !0, !0, s, 1, e.screenX, e.screenY, e.clientX, e.clientY, !1, !1, !1, !1, 0, null), e.target.dispatchEvent(i)
                            }
                        }), d.Browser.touch && !d.Browser.pointer && d.Map.addInitHook("addHandler", "tap", d.Map.Tap), d.Map.mergeOptions({
                            boxZoom: !0
                        }), d.Map.BoxZoom = d.Handler.extend({
                            initialize: function (t) {
                                this._map = t, this._container = t._container, this._pane = t._panes.overlayPane, this._moved = !1
                            },
                            addHooks: function () {
                                d.DomEvent.on(this._container, "mousedown", this._onMouseDown, this)
                            },
                            removeHooks: function () {
                                d.DomEvent.off(this._container, "mousedown", this._onMouseDown), this._moved = !1
                            },
                            moved: function () {
                                return this._moved
                            },
                            _onMouseDown: function (t) {
                                if (this._moved = !1, !t.shiftKey || 1 !== t.which && 1 !== t.button) return !1;
                                d.DomUtil.disableTextSelection(), d.DomUtil.disableImageDrag(), this._startLayerPoint = this._map.mouseEventToLayerPoint(t), d.DomEvent.on(a, "mousemove", this._onMouseMove, this).on(a, "mouseup", this._onMouseUp, this).on(a, "keydown", this._onKeyDown, this)
                            },
                            _onMouseMove: function (t) {
                                this._moved || (this._box = d.DomUtil.create("div", "leaflet-zoom-box", this._pane), d.DomUtil.setPosition(this._box, this._startLayerPoint), this._container.style.cursor = "crosshair", this._map.fire("boxzoomstart"));
                                var e = this._startLayerPoint,
                                    i = this._box,
                                    o = this._map.mouseEventToLayerPoint(t),
                                    n = o.subtract(e),
                                    s = new d.Point(Math.min(o.x, e.x), Math.min(o.y, e.y));
                                d.DomUtil.setPosition(i, s), this._moved = !0, i.style.width = Math.max(0, Math.abs(n.x) - 4) + "px", i.style.height = Math.max(0, Math.abs(n.y) - 4) + "px"
                            },
                            _finish: function () {
                                this._moved && (this._pane.removeChild(this._box), this._container.style.cursor = ""), d.DomUtil.enableTextSelection(), d.DomUtil.enableImageDrag(), d.DomEvent.off(a, "mousemove", this._onMouseMove).off(a, "mouseup", this._onMouseUp).off(a, "keydown", this._onKeyDown)
                            },
                            _onMouseUp: function (t) {
                                this._finish();
                                var e = this._map,
                                    i = e.mouseEventToLayerPoint(t);
                                if (!this._startLayerPoint.equals(i)) {
                                    var o = new d.LatLngBounds(e.layerPointToLatLng(this._startLayerPoint), e.layerPointToLatLng(i));
                                    e.fitBounds(o), e.fire("boxzoomend", {
                                        boxZoomBounds: o
                                    })
                                }
                            },
                            _onKeyDown: function (t) {
                                27 === t.keyCode && this._finish()
                            }
                        }), d.Map.addInitHook("addHandler", "boxZoom", d.Map.BoxZoom), d.Map.mergeOptions({
                            keyboard: !0,
                            keyboardPanOffset: 80,
                            keyboardZoomOffset: 1
                        }), d.Map.Keyboard = d.Handler.extend({
                            keyCodes: {
                                left: [37],
                                right: [39],
                                down: [40],
                                up: [38],
                                zoomIn: [187, 107, 61, 171],
                                zoomOut: [189, 109, 173]
                            },
                            initialize: function (t) {
                                this._map = t, this._setPanOffset(t.options.keyboardPanOffset), this._setZoomOffset(t.options.keyboardZoomOffset)
                            },
                            addHooks: function () {
                                var t = this._map._container; - 1 === t.tabIndex && (t.tabIndex = "0"), d.DomEvent.on(t, "focus", this._onFocus, this).on(t, "blur", this._onBlur, this).on(t, "mousedown", this._onMouseDown, this), this._map.on("focus", this._addHooks, this).on("blur", this._removeHooks, this)
                            },
                            removeHooks: function () {
                                this._removeHooks();
                                var t = this._map._container;
                                d.DomEvent.off(t, "focus", this._onFocus, this).off(t, "blur", this._onBlur, this).off(t, "mousedown", this._onMouseDown, this), this._map.off("focus", this._addHooks, this).off("blur", this._removeHooks, this)
                            },
                            _onMouseDown: function () {
                                if (!this._focused) {
                                    var t = a.body,
                                        e = a.documentElement,
                                        i = t.scrollTop || e.scrollTop,
                                        o = t.scrollLeft || e.scrollLeft;
                                    this._map._container.focus(), s.scrollTo(o, i)
                                }
                            },
                            _onFocus: function () {
                                this._focused = !0, this._map.fire("focus")
                            },
                            _onBlur: function () {
                                this._focused = !1, this._map.fire("blur")
                            },
                            _setPanOffset: function (t) {
                                var e, i, o = this._panKeys = {},
                                    n = this.keyCodes;
                                for (e = 0, i = n.left.length; e < i; e++) o[n.left[e]] = [-1 * t, 0];
                                for (e = 0, i = n.right.length; e < i; e++) o[n.right[e]] = [t, 0];
                                for (e = 0, i = n.down.length; e < i; e++) o[n.down[e]] = [0, t];
                                for (e = 0, i = n.up.length; e < i; e++) o[n.up[e]] = [0, -1 * t]
                            },
                            _setZoomOffset: function (t) {
                                var e, i, o = this._zoomKeys = {},
                                    n = this.keyCodes;
                                for (e = 0, i = n.zoomIn.length; e < i; e++) o[n.zoomIn[e]] = t;
                                for (e = 0, i = n.zoomOut.length; e < i; e++) o[n.zoomOut[e]] = -t
                            },
                            _addHooks: function () {
                                d.DomEvent.on(a, "keydown", this._onKeyDown, this)
                            },
                            _removeHooks: function () {
                                d.DomEvent.off(a, "keydown", this._onKeyDown, this)
                            },
                            _onKeyDown: function (t) {
                                var e = t.keyCode,
                                    i = this._map;
                                if (e in this._panKeys) {
                                    if (i._panAnim && i._panAnim._inProgress) return;
                                    i.panBy(this._panKeys[e]), i.options.maxBounds && i.panInsideBounds(i.options.maxBounds)
                                } else {
                                    if (!(e in this._zoomKeys)) return;
                                    i.setZoom(i.getZoom() + this._zoomKeys[e])
                                }
                                d.DomEvent.stop(t)
                            }
                        }), d.Map.addInitHook("addHandler", "keyboard", d.Map.Keyboard), d.Handler.MarkerDrag = d.Handler.extend({
                            initialize: function (t) {
                                this._marker = t
                            },
                            addHooks: function () {
                                var t = this._marker._icon;
                                this._draggable || (this._draggable = new d.Draggable(t, t)), this._draggable.on("dragstart", this._onDragStart, this).on("drag", this._onDrag, this).on("dragend", this._onDragEnd, this), this._draggable.enable(), d.DomUtil.addClass(this._marker._icon, "leaflet-marker-draggable")
                            },
                            removeHooks: function () {
                                this._draggable.off("dragstart", this._onDragStart, this).off("drag", this._onDrag, this).off("dragend", this._onDragEnd, this), this._draggable.disable(), d.DomUtil.removeClass(this._marker._icon, "leaflet-marker-draggable")
                            },
                            moved: function () {
                                return this._draggable && this._draggable._moved
                            },
                            _onDragStart: function () {
                                this._marker.closePopup().fire("movestart").fire("dragstart")
                            },
                            _onDrag: function () {
                                var t = this._marker,
                                    e = t._shadow,
                                    i = d.DomUtil.getPosition(t._icon),
                                    o = t._map.layerPointToLatLng(i);
                                e && d.DomUtil.setPosition(e, i), t._latlng = o, t.fire("move", {
                                    latlng: o
                                }).fire("drag")
                            },
                            _onDragEnd: function (t) {
                                this._marker.fire("moveend").fire("dragend", t)
                            }
                        }), d.Control = d.Class.extend({
                            options: {
                                position: "topright"
                            },
                            initialize: function (t) {
                                d.setOptions(this, t)
                            },
                            getPosition: function () {
                                return this.options.position
                            },
                            setPosition: function (t) {
                                var e = this._map;
                                return e && e.removeControl(this), this.options.position = t, e && e.addControl(this), this
                            },
                            getContainer: function () {
                                return this._container
                            },
                            addTo: function (t) {
                                this._map = t;
                                var e = this._container = this.onAdd(t),
                                    i = this.getPosition(),
                                    o = t._controlCorners[i];
                                return d.DomUtil.addClass(e, "leaflet-control"), -1 !== i.indexOf("bottom") ? o.insertBefore(e, o.firstChild) : o.appendChild(e), this
                            },
                            removeFrom: function (t) {
                                var e = this.getPosition();
                                return t._controlCorners[e].removeChild(this._container), this._map = null, this.onRemove && this.onRemove(t), this
                            },
                            _refocusOnMap: function () {
                                this._map && this._map.getContainer().focus()
                            }
                        }), d.control = function (t) {
                            return new d.Control(t)
                        }, d.Map.include({
                            addControl: function (t) {
                                return t.addTo(this), this
                            },
                            removeControl: function (t) {
                                return t.removeFrom(this), this
                            },
                            _initControlPos: function () {
                                var t = this._controlCorners = {},
                                    e = "leaflet-",
                                    i = this._controlContainer = d.DomUtil.create("div", e + "control-container", this._container);

                                function o(o, n) {
                                    var s = e + o + " " + e + n;
                                    t[o + n] = d.DomUtil.create("div", s, i)
                                }
                                o("top", "left"), o("top", "right"), o("bottom", "left"), o("bottom", "right")
                            },
                            _clearControlPos: function () {
                                this._container.removeChild(this._controlContainer)
                            }
                        }), d.Control.Zoom = d.Control.extend({
                            options: {
                                position: "topleft",
                                zoomInText: "+",
                                zoomInTitle: "Zoom in",
                                zoomOutText: "-",
                                zoomOutTitle: "Zoom out"
                            },
                            onAdd: function (t) {
                                var e = "leaflet-control-zoom",
                                    i = d.DomUtil.create("div", e + " leaflet-bar");
                                return this._map = t, this._zoomInButton = this._createButton(this.options.zoomInText, this.options.zoomInTitle, e + "-in", i, this._zoomIn, this), this._zoomOutButton = this._createButton(this.options.zoomOutText, this.options.zoomOutTitle, e + "-out", i, this._zoomOut, this), this._updateDisabled(), t.on("zoomend zoomlevelschange", this._updateDisabled, this), i
                            },
                            onRemove: function (t) {
                                t.off("zoomend zoomlevelschange", this._updateDisabled, this)
                            },
                            _zoomIn: function (t) {
                                this._map.zoomIn(t.shiftKey ? 3 : 1)
                            },
                            _zoomOut: function (t) {
                                this._map.zoomOut(t.shiftKey ? 3 : 1)
                            },
                            _createButton: function (t, e, i, o, n, s) {
                                var a = d.DomUtil.create("a", i, o);
                                a.innerHTML = t, a.href = "#", a.title = e;
                                var r = d.DomEvent.stopPropagation;
                                return d.DomEvent.on(a, "click", r).on(a, "mousedown", r).on(a, "dblclick", r).on(a, "click", d.DomEvent.preventDefault).on(a, "click", n, s).on(a, "click", this._refocusOnMap, s), a
                            },
                            _updateDisabled: function () {
                                var t = this._map,
                                    e = "leaflet-disabled";
                                d.DomUtil.removeClass(this._zoomInButton, e), d.DomUtil.removeClass(this._zoomOutButton, e), t._zoom === t.getMinZoom() && d.DomUtil.addClass(this._zoomOutButton, e), t._zoom === t.getMaxZoom() && d.DomUtil.addClass(this._zoomInButton, e)
                            }
                        }), d.Map.mergeOptions({
                            zoomControl: !0
                        }), d.Map.addInitHook((function () {
                            this.options.zoomControl && (this.zoomControl = new d.Control.Zoom, this.addControl(this.zoomControl))
                        })), d.control.zoom = function (t) {
                            return new d.Control.Zoom(t)
                        }, d.Control.Attribution = d.Control.extend({
                            options: {
                                position: "bottomright",
                                prefix: '<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>'
                            },
                            initialize: function (t) {
                                d.setOptions(this, t), this._attributions = {}
                            },
                            onAdd: function (t) {
                                for (var e in this._container = d.DomUtil.create("div", "leaflet-control-attribution"), d.DomEvent.disableClickPropagation(this._container), t._layers) t._layers[e].getAttribution && this.addAttribution(t._layers[e].getAttribution());
                                return t.on("layeradd", this._onLayerAdd, this).on("layerremove", this._onLayerRemove, this), this._update(), this._container
                            },
                            onRemove: function (t) {
                                t.off("layeradd", this._onLayerAdd).off("layerremove", this._onLayerRemove)
                            },
                            setPrefix: function (t) {
                                return this.options.prefix = t, this._update(), this
                            },
                            addAttribution: function (t) {
                                if (t) return this._attributions[t] || (this._attributions[t] = 0), this._attributions[t]++, this._update(), this
                            },
                            removeAttribution: function (t) {
                                if (t) return this._attributions[t] && (this._attributions[t]--, this._update()), this
                            },
                            _update: function () {
                                if (this._map) {
                                    var t = [];
                                    for (var e in this._attributions) this._attributions[e] && t.push(e);
                                    var i = [];
                                    this.options.prefix && i.push(this.options.prefix), t.length && i.push(t.join(", ")), this._container.innerHTML = i.join(" | ")
                                }
                            },
                            _onLayerAdd: function (t) {
                                t.layer.getAttribution && this.addAttribution(t.layer.getAttribution())
                            },
                            _onLayerRemove: function (t) {
                                t.layer.getAttribution && this.removeAttribution(t.layer.getAttribution())
                            }
                        }), d.Map.mergeOptions({
                            attributionControl: !0
                        }), d.Map.addInitHook((function () {
                            this.options.attributionControl && (this.attributionControl = (new d.Control.Attribution).addTo(this))
                        })), d.control.attribution = function (t) {
                            return new d.Control.Attribution(t)
                        }, d.Control.Scale = d.Control.extend({
                            options: {
                                position: "bottomleft",
                                maxWidth: 100,
                                metric: !0,
                                imperial: !0,
                                updateWhenIdle: !1
                            },
                            onAdd: function (t) {
                                this._map = t;
                                var e = "leaflet-control-scale",
                                    i = d.DomUtil.create("div", e),
                                    o = this.options;
                                return this._addScales(o, e, i), t.on(o.updateWhenIdle ? "moveend" : "move", this._update, this), t.whenReady(this._update, this), i
                            },
                            onRemove: function (t) {
                                t.off(this.options.updateWhenIdle ? "moveend" : "move", this._update, this)
                            },
                            _addScales: function (t, e, i) {
                                t.metric && (this._mScale = d.DomUtil.create("div", e + "-line", i)), t.imperial && (this._iScale = d.DomUtil.create("div", e + "-line", i))
                            },
                            _update: function () {
                                var t = this._map.getBounds(),
                                    e = t.getCenter().lat,
                                    i = 6378137 * Math.PI * Math.cos(e * Math.PI / 180) * (t.getNorthEast().lng - t.getSouthWest().lng) / 180,
                                    o = this._map.getSize(),
                                    n = this.options,
                                    s = 0;
                                o.x > 0 && (s = i * (n.maxWidth / o.x)), this._updateScales(n, s)
                            },
                            _updateScales: function (t, e) {
                                t.metric && e && this._updateMetric(e), t.imperial && e && this._updateImperial(e)
                            },
                            _updateMetric: function (t) {
                                var e = this._getRoundNum(t);
                                this._mScale.style.width = this._getScaleWidth(e / t) + "px", this._mScale.innerHTML = e < 1e3 ? e + " m" : e / 1e3 + " km"
                            },
                            _updateImperial: function (t) {
                                var e, i, o, n = 3.2808399 * t,
                                    s = this._iScale;
                                n > 5280 ? (e = n / 5280, i = this._getRoundNum(e), s.style.width = this._getScaleWidth(i / e) + "px", s.innerHTML = i + " mi") : (o = this._getRoundNum(n), s.style.width = this._getScaleWidth(o / n) + "px", s.innerHTML = o + " ft")
                            },
                            _getScaleWidth: function (t) {
                                return Math.round(this.options.maxWidth * t) - 10
                            },
                            _getRoundNum: function (t) {
                                var e = Math.pow(10, (Math.floor(t) + "").length - 1),
                                    i = t / e;
                                return e * (i = i >= 10 ? 10 : i >= 5 ? 5 : i >= 3 ? 3 : i >= 2 ? 2 : 1)
                            }
                        }), d.control.scale = function (t) {
                            return new d.Control.Scale(t)
                        }, d.Control.Layers = d.Control.extend({
                            options: {
                                collapsed: !0,
                                position: "topright",
                                autoZIndex: !0
                            },
                            initialize: function (t, e, i) {
                                for (var o in d.setOptions(this, i), this._layers = {}, this._lastZIndex = 0, this._handlingClick = !1, t) this._addLayer(t[o], o);
                                for (o in e) this._addLayer(e[o], o, !0)
                            },
                            onAdd: function (t) {
                                return this._initLayout(), this._update(), t.on("layeradd", this._onLayerChange, this).on("layerremove", this._onLayerChange, this), this._container
                            },
                            onRemove: function (t) {
                                t.off("layeradd", this._onLayerChange, this).off("layerremove", this._onLayerChange, this)
                            },
                            addBaseLayer: function (t, e) {
                                return this._addLayer(t, e), this._update(), this
                            },
                            addOverlay: function (t, e) {
                                return this._addLayer(t, e, !0), this._update(), this
                            },
                            removeLayer: function (t) {
                                var e = d.stamp(t);
                                return delete this._layers[e], this._update(), this
                            },
                            _initLayout: function () {
                                var t = "leaflet-control-layers",
                                    e = this._container = d.DomUtil.create("div", t);
                                e.setAttribute("aria-haspopup", !0), d.Browser.touch ? d.DomEvent.on(e, "click", d.DomEvent.stopPropagation) : d.DomEvent.disableClickPropagation(e).disableScrollPropagation(e);
                                var i = this._form = d.DomUtil.create("form", t + "-list");
                                if (this.options.collapsed) {
                                    d.Browser.android || d.DomEvent.on(e, "mouseover", this._expand, this).on(e, "mouseout", this._collapse, this);
                                    var o = this._layersLink = d.DomUtil.create("a", t + "-toggle", e);
                                    o.href = "#", o.title = "Layers", d.Browser.touch ? d.DomEvent.on(o, "click", d.DomEvent.stop).on(o, "click", this._expand, this) : d.DomEvent.on(o, "focus", this._expand, this), d.DomEvent.on(i, "click", (function () {
                                        setTimeout(d.bind(this._onInputClick, this), 0)
                                    }), this), this._map.on("click", this._collapse, this)
                                } else this._expand();
                                this._baseLayersList = d.DomUtil.create("div", t + "-base", i), this._separator = d.DomUtil.create("div", t + "-separator", i), this._overlaysList = d.DomUtil.create("div", t + "-overlays", i), e.appendChild(i)
                            },
                            _addLayer: function (t, e, i) {
                                var o = d.stamp(t);
                                this._layers[o] = {
                                    layer: t,
                                    name: e,
                                    overlay: i
                                }, this.options.autoZIndex && t.setZIndex && (this._lastZIndex++, t.setZIndex(this._lastZIndex))
                            },
                            _update: function () {
                                if (this._container) {
                                    this._baseLayersList.innerHTML = "", this._overlaysList.innerHTML = "";
                                    var t, e, i = !1,
                                        o = !1;
                                    for (t in this._layers) e = this._layers[t], this._addItem(e), o = o || e.overlay, i = i || !e.overlay;
                                    this._separator.style.display = o && i ? "" : "none"
                                }
                            },
                            _onLayerChange: function (t) {
                                var e = this._layers[d.stamp(t.layer)];
                                if (e) {
                                    this._handlingClick || this._update();
                                    var i = e.overlay ? "layeradd" === t.type ? "overlayadd" : "overlayremove" : "layeradd" === t.type ? "baselayerchange" : null;
                                    i && this._map.fire(i, e)
                                }
                            },
                            _createRadioElement: function (t, e) {
                                var i = '<input type="radio" class="leaflet-control-layers-selector" name="' + t + '"';
                                e && (i += ' checked="checked"'), i += "/>";
                                var o = a.createElement("div");
                                return o.innerHTML = i, o.firstChild
                            },
                            _addItem: function (t) {
                                var e, i = a.createElement("label"),
                                    o = this._map.hasLayer(t.layer);
                                t.overlay ? ((e = a.createElement("input")).type = "checkbox", e.className = "leaflet-control-layers-selector", e.defaultChecked = o) : e = this._createRadioElement("leaflet-base-layers", o), e.layerId = d.stamp(t.layer), d.DomEvent.on(e, "click", this._onInputClick, this);
                                var n = a.createElement("span");
                                return n.innerHTML = " " + t.name, i.appendChild(e), i.appendChild(n), (t.overlay ? this._overlaysList : this._baseLayersList).appendChild(i), i
                            },
                            _onInputClick: function () {
                                var t, e, i, o = this._form.getElementsByTagName("input"),
                                    n = o.length;
                                for (this._handlingClick = !0, t = 0; t < n; t++) e = o[t], i = this._layers[e.layerId], e.checked && !this._map.hasLayer(i.layer) ? this._map.addLayer(i.layer) : !e.checked && this._map.hasLayer(i.layer) && this._map.removeLayer(i.layer);
                                this._handlingClick = !1, this._refocusOnMap()
                            },
                            _expand: function () {
                                d.DomUtil.addClass(this._container, "leaflet-control-layers-expanded")
                            },
                            _collapse: function () {
                                this._container.className = this._container.className.replace(" leaflet-control-layers-expanded", "")
                            }
                        }), d.control.layers = function (t, e, i) {
                            return new d.Control.Layers(t, e, i)
                        }, d.PosAnimation = d.Class.extend({
                            includes: d.Mixin.Events,
                            run: function (t, e, i, o) {
                                this.stop(), this._el = t, this._inProgress = !0, this._newPos = e, this.fire("start"), t.style[d.DomUtil.TRANSITION] = "all " + (i || .25) + "s cubic-bezier(0,0," + (o || .5) + ",1)", d.DomEvent.on(t, d.DomUtil.TRANSITION_END, this._onTransitionEnd, this), d.DomUtil.setPosition(t, e), d.Util.falseFn(t.offsetWidth), this._stepTimer = setInterval(d.bind(this._onStep, this), 50)
                            },
                            stop: function () {
                                this._inProgress && (d.DomUtil.setPosition(this._el, this._getPos()), this._onTransitionEnd(), d.Util.falseFn(this._el.offsetWidth))
                            },
                            _onStep: function () {
                                var t = this._getPos();
                                t ? (this._el._leaflet_pos = t, this.fire("step")) : this._onTransitionEnd()
                            },
                            _transformRe: /([-+]?(?:\d*\.)?\d+)\D*, ([-+]?(?:\d*\.)?\d+)\D*\)/,
                            _getPos: function () {
                                var t, e, i, o = this._el,
                                    n = s.getComputedStyle(o);
                                if (d.Browser.any3d) {
                                    if (!(i = n[d.DomUtil.TRANSFORM].match(this._transformRe))) return;
                                    t = parseFloat(i[1]), e = parseFloat(i[2])
                                } else t = parseFloat(n.left), e = parseFloat(n.top);
                                return new d.Point(t, e, !0)
                            },
                            _onTransitionEnd: function () {
                                d.DomEvent.off(this._el, d.DomUtil.TRANSITION_END, this._onTransitionEnd, this), this._inProgress && (this._inProgress = !1, this._el.style[d.DomUtil.TRANSITION] = "", this._el._leaflet_pos = this._newPos, clearInterval(this._stepTimer), this.fire("step").fire("end"))
                            }
                        }), d.Map.include({
                            setView: function (t, e, i) {
                                if ((e = e === r ? this._zoom : this._limitZoom(e), t = this._limitCenter(d.latLng(t), e, this.options.maxBounds), i = i || {}, this._panAnim && this._panAnim.stop(), this._loaded && !i.reset && !0 !== i) && (i.animate !== r && (i.zoom = d.extend({
                                        animate: i.animate
                                    }, i.zoom), i.pan = d.extend({
                                        animate: i.animate
                                    }, i.pan)), this._zoom !== e ? this._tryAnimatedZoom && this._tryAnimatedZoom(t, e, i.zoom) : this._tryAnimatedPan(t, i.pan))) return clearTimeout(this._sizeTimer), this;
                                return this._resetView(t, e), this
                            },
                            panBy: function (t, e) {
                                if (e = e || {}, !(t = d.point(t).round()).x && !t.y) return this;
                                if (this._panAnim || (this._panAnim = new d.PosAnimation, this._panAnim.on({
                                        step: this._onPanTransitionStep,
                                        end: this._onPanTransitionEnd
                                    }, this)), e.noMoveStart || this.fire("movestart"), !1 !== e.animate) {
                                    d.DomUtil.addClass(this._mapPane, "leaflet-pan-anim");
                                    var i = this._getMapPanePos().subtract(t);
                                    this._panAnim.run(this._mapPane, i, e.duration || .25, e.easeLinearity)
                                } else this._rawPanBy(t), this.fire("move").fire("moveend");
                                return this
                            },
                            _onPanTransitionStep: function () {
                                this.fire("move")
                            },
                            _onPanTransitionEnd: function () {
                                d.DomUtil.removeClass(this._mapPane, "leaflet-pan-anim"), this.fire("moveend")
                            },
                            _tryAnimatedPan: function (t, e) {
                                var i = this._getCenterOffset(t)._floor();
                                return !(!0 !== (e && e.animate) && !this.getSize().contains(i)) && (this.panBy(i, e), !0)
                            }
                        }), d.PosAnimation = d.DomUtil.TRANSITION ? d.PosAnimation : d.PosAnimation.extend({
                            run: function (t, e, i, o) {
                                this.stop(), this._el = t, this._inProgress = !0, this._duration = i || .25, this._easeOutPower = 1 / Math.max(o || .5, .2), this._startPos = d.DomUtil.getPosition(t), this._offset = e.subtract(this._startPos), this._startTime = +new Date, this.fire("start"), this._animate()
                            },
                            stop: function () {
                                this._inProgress && (this._step(), this._complete())
                            },
                            _animate: function () {
                                this._animId = d.Util.requestAnimFrame(this._animate, this), this._step()
                            },
                            _step: function () {
                                var t = +new Date - this._startTime,
                                    e = 1e3 * this._duration;
                                t < e ? this._runFrame(this._easeOut(t / e)) : (this._runFrame(1), this._complete())
                            },
                            _runFrame: function (t) {
                                var e = this._startPos.add(this._offset.multiplyBy(t));
                                d.DomUtil.setPosition(this._el, e), this.fire("step")
                            },
                            _complete: function () {
                                d.Util.cancelAnimFrame(this._animId), this._inProgress = !1, this.fire("end")
                            },
                            _easeOut: function (t) {
                                return 1 - Math.pow(1 - t, this._easeOutPower)
                            }
                        }), d.Map.mergeOptions({
                            zoomAnimation: !0,
                            zoomAnimationThreshold: 4
                        }), d.DomUtil.TRANSITION && d.Map.addInitHook((function () {
                            this._zoomAnimated = this.options.zoomAnimation && d.DomUtil.TRANSITION && d.Browser.any3d && !d.Browser.android23 && !d.Browser.mobileOpera, this._zoomAnimated && d.DomEvent.on(this._mapPane, d.DomUtil.TRANSITION_END, this._catchTransitionEnd, this)
                        })), d.Map.include(d.DomUtil.TRANSITION ? {
                            _catchTransitionEnd: function (t) {
                                this._animatingZoom && t.propertyName.indexOf("transform") >= 0 && this._onZoomTransitionEnd()
                            },
                            _nothingToAnimate: function () {
                                return !this._container.getElementsByClassName("leaflet-zoom-animated").length
                            },
                            _tryAnimatedZoom: function (t, e, i) {
                                if (this._animatingZoom) return !0;
                                if (i = i || {}, !this._zoomAnimated || !1 === i.animate || this._nothingToAnimate() || Math.abs(e - this._zoom) > this.options.zoomAnimationThreshold) return !1;
                                var o = this.getZoomScale(e),
                                    n = this._getCenterOffset(t)._divideBy(1 - 1 / o),
                                    s = this._getCenterLayerPoint()._add(n);
                                return !(!0 !== i.animate && !this.getSize().contains(n)) && (this.fire("movestart").fire("zoomstart"), this._animateZoom(t, e, s, o, null, !0), !0)
                            },
                            _animateZoom: function (t, e, i, o, n, s, a) {
                                a || (this._animatingZoom = !0), d.DomUtil.addClass(this._mapPane, "leaflet-zoom-anim"), this._animateToCenter = t, this._animateToZoom = e, d.Draggable && (d.Draggable._disabled = !0), d.Util.requestAnimFrame((function () {
                                    this.fire("zoomanim", {
                                        center: t,
                                        zoom: e,
                                        origin: i,
                                        scale: o,
                                        delta: n,
                                        backwards: s
                                    }), setTimeout(d.bind(this._onZoomTransitionEnd, this), 250)
                                }), this)
                            },
                            _onZoomTransitionEnd: function () {
                                this._animatingZoom && (this._animatingZoom = !1, d.DomUtil.removeClass(this._mapPane, "leaflet-zoom-anim"), d.Util.requestAnimFrame((function () {
                                    this._resetView(this._animateToCenter, this._animateToZoom, !0, !0), d.Draggable && (d.Draggable._disabled = !1)
                                }), this))
                            }
                        } : {}), d.TileLayer.include({
                            _animateZoom: function (t) {
                                this._animating || (this._animating = !0, this._prepareBgBuffer());
                                var e = this._bgBuffer,
                                    i = d.DomUtil.TRANSFORM,
                                    o = t.delta ? d.DomUtil.getTranslateString(t.delta) : e.style[i],
                                    n = d.DomUtil.getScaleString(t.scale, t.origin);
                                e.style[i] = t.backwards ? n + " " + o : o + " " + n
                            },
                            _endZoomAnim: function () {
                                var t = this._tileContainer,
                                    e = this._bgBuffer;
                                t.style.visibility = "", t.parentNode.appendChild(t), d.Util.falseFn(e.offsetWidth);
                                var i = this._map.getZoom();
                                (i > this.options.maxZoom || i < this.options.minZoom) && this._clearBgBuffer(), this._animating = !1
                            },
                            _clearBgBuffer: function () {
                                var t = this._map;
                                !t || t._animatingZoom || t.touchZoom._zooming || (this._bgBuffer.innerHTML = "", this._bgBuffer.style[d.DomUtil.TRANSFORM] = "")
                            },
                            _prepareBgBuffer: function () {
                                var t = this._tileContainer,
                                    e = this._bgBuffer,
                                    i = this._getLoadedTilesPercentage(e),
                                    o = this._getLoadedTilesPercentage(t);
                                if (e && i > .5 && o < .5) return t.style.visibility = "hidden", void this._stopLoadingImages(t);
                                e.style.visibility = "hidden", e.style[d.DomUtil.TRANSFORM] = "", this._tileContainer = e, e = this._bgBuffer = t, this._stopLoadingImages(e), clearTimeout(this._clearBgBufferTimer)
                            },
                            _getLoadedTilesPercentage: function (t) {
                                var e, i, o = t.getElementsByTagName("img"),
                                    n = 0;
                                for (e = 0, i = o.length; e < i; e++) o[e].complete && n++;
                                return n / i
                            },
                            _stopLoadingImages: function (t) {
                                var e, i, o, n = Array.prototype.slice.call(t.getElementsByTagName("img"));
                                for (e = 0, i = n.length; e < i; e++)(o = n[e]).complete || (o.onload = d.Util.falseFn, o.onerror = d.Util.falseFn, o.src = d.Util.emptyImageUrl, o.parentNode.removeChild(o))
                            }
                        }), d.Map.include({
                            _defaultLocateOptions: {
                                watch: !1,
                                setView: !1,
                                maxZoom: 1 / 0,
                                timeout: 1e4,
                                maximumAge: 0,
                                enableHighAccuracy: !1
                            },
                            locate: function (t) {
                                if (t = this._locateOptions = d.extend(this._defaultLocateOptions, t), !navigator.geolocation) return this._handleGeolocationError({
                                    code: 0,
                                    message: "Geolocation not supported."
                                }), this;
                                var e = d.bind(this._handleGeolocationResponse, this),
                                    i = d.bind(this._handleGeolocationError, this);
                                return t.watch ? this._locationWatchId = navigator.geolocation.watchPosition(e, i, t) : navigator.geolocation.getCurrentPosition(e, i, t), this
                            },
                            stopLocate: function () {
                                return navigator.geolocation && navigator.geolocation.clearWatch(this._locationWatchId), this._locateOptions && (this._locateOptions.setView = !1), this
                            },
                            _handleGeolocationError: function (t) {
                                var e = t.code,
                                    i = t.message || (1 === e ? "permission denied" : 2 === e ? "position unavailable" : "timeout");
                                this._locateOptions.setView && !this._loaded && this.fitWorld(), this.fire("locationerror", {
                                    code: e,
                                    message: "Geolocation error: " + i + "."
                                })
                            },
                            _handleGeolocationResponse: function (t) {
                                var e = t.coords.latitude,
                                    i = t.coords.longitude,
                                    o = new d.LatLng(e, i),
                                    n = 180 * t.coords.accuracy / 40075017,
                                    s = n / Math.cos(d.LatLng.DEG_TO_RAD * e),
                                    a = d.latLngBounds([e - n, i - s], [e + n, i + s]),
                                    r = this._locateOptions;
                                if (r.setView) {
                                    var h = Math.min(this.getBoundsZoom(a), r.maxZoom);
                                    this.setView(o, h)
                                }
                                var l = {
                                    latlng: o,
                                    bounds: a,
                                    timestamp: t.timestamp
                                };
                                for (var c in t.coords) "number" == typeof t.coords[c] && (l[c] = t.coords[c]);
                                this.fire("locationfound", l)
                            }
                        })
                }(window, document)
            },
            16: (t, e, i) => {
                "use strict";
                i.r(e)
            },
            965: t => {
                "use strict";
                t.exports = JSON.parse('{"name":"Ð‘ÐµÐ»Ð°Ñ€ÑƒÑÐºÐ°Ñ","lang":"be","messages":{"loading":"Ð—Ð°Ð³Ñ€ÑƒÐ·ÐºÐ°","wikipedia":"Ð’Ñ–ÐºÑ–Ð¿ÐµÐ´Ñ‹Ñ","start":"Start Exploring"},"buttons":{"map_overview":"ÐŸÑ€Ð°Ð³Ð»ÑÐ´ Ð¼Ð°Ð¿Ñ‹","overview":"ÐŸÑ€Ð°Ð³Ð»ÑÐ´","backtostart":"Ð’ÑÑ€Ð½ÑƒÑ†Ñ†Ð° Ñž Ð¿Ð°Ñ‡Ð°Ñ‚Ð°Ðº","collapse_toggle":"Ð¡Ñ…Ð°Ð²Ð°Ñ†ÑŒ Ð¼Ð°Ð¿Ñƒ","uncollapse_toggle":"ÐŸÐ°ÐºÐ°Ð·Ð°Ñ†ÑŒ Ð¼Ð°Ð¿Ñƒ","swipe_to_navigate":"Swipe to Navigate<br><span class=\'vco-button\'>OK</span>"}}')
            },
            371: t => {
                "use strict";
                t.exports = JSON.parse('{"name":"Ð‘ÑŠÐ»Ð³Ð°Ñ€ÑÐºÐ¸","lang":"bg","messages":{"loading":"Ð—Ð°Ñ€ÐµÐ¶Ð´Ð°Ð½Ðµ","wikipedia":"ÐžÑ‚ Ð£Ð¸ÐºÐ¸Ð¿ÐµÐ´Ð¸Ñ, ÑÐ²Ð¾Ð±Ð¾Ð´Ð½Ð°Ñ‚Ð° ÐµÐ½Ñ†Ð¸ÐºÐ»Ð¾Ð¿ÐµÐ´Ð¸Ñ","start":"Ð—Ð°Ð¿Ð¾Ñ‡Ð½ÐµÑ‚Ðµ Ð´Ð° Ñ€Ð°Ð·Ð³Ð»ÐµÐ¶Ð´Ð°Ñ‚Ðµ"},"buttons":{"map_overview":"ÐŸÑ€ÐµÐ³Ð»ÐµÐ´ Ð½Ð° ÐºÐ°Ñ€Ñ‚Ð°Ñ‚Ð°","overview":"ÐŸÑ€ÐµÐ³Ð»ÐµÐ´","backtostart":"ÐšÑŠÐ¼ Ð½Ð°Ñ‡Ð°Ð»Ð¾Ñ‚Ð¾","collapse_toggle":"Ð¡ÐºÑ€Ð¸Ð²Ð°Ð½Ðµ Ð½Ð° ÐºÐ°Ñ€Ñ‚Ð°Ñ‚Ð°","uncollapse_toggle":"ÐŸÐ¾ÐºÐ°Ð·Ð²Ð°Ð½Ðµ Ð½Ð° ÐºÐ°Ñ€Ñ‚Ð°Ñ‚Ð°","swipe_to_navigate":"Swipe to Navigate<br><span class=\'vco-button\'>OK</span>"}}')
            },
            473: t => {
                "use strict";
                t.exports = JSON.parse('{"name":"ÄŒeÅ¡tina","lang":"cs","messages":{"loading":"NahrÃ¡vÃ¡nÃ­","wikipedia":"Z Wikipedie, svobodnÃ© encyklopedie","start":"Prozkoumat"},"buttons":{"map_overview":"PÅ™ehledovÃ¡ mapa","overview":"PÅ™ehled","backtostart":"ZpÄ›t na zaÄÃ¡tek","collapse_toggle":"SkrÃ½t mapu","uncollapse_toggle":"Zobrazit mapu","swipe_to_navigate":"Swipe to Navigate<br><span class=\'vco-button\'>OK</span>"}}')
            },
            997: t => {
                "use strict";
                t.exports = JSON.parse('{"name":"Deutsch","lang":"de","messages":{"loading":"Daten werden geladen","wikipedia":"von Wikipedia, der freien EnzyklopÃ¤die","start":"Explore"},"buttons":{"map_overview":"KartenÃ¼bersicht","overview":"KartenÃ¼bersicht","backtostart":"ZurÃ¼ck zum Anfang","collapse_toggle":"Karte ausblenden","uncollapse_toggle":"Karte anzeigen","swipe_to_navigate":"Swipe to Navigate<br><span class=\'vco-button\'>OK</span>"}}')
            },
            879: t => {
                "use strict";
                t.exports = JSON.parse('{"name":"Î•Î»Î»Î·Î½Î¹ÎºÎ¬","lang":"el","messages":{"loading":"Î¦ÏŒÏÏ„Ï‰ÏƒÎ·","wikipedia":"Î‘Ï€ÏŒ Ï„Î·Î½ Wikipedia, Ï„Î·Î½ ÎµÎ»ÎµÏÎ¸ÎµÏÎ· ÎµÎ³ÎºÏ…ÎºÎ»Î¿Ï€Î±Î¯Î´ÎµÎ¹Î±","start":"ÎˆÎ½Î±ÏÎ¾Î· Ï€ÎµÏÎ¹Î®Î³Î·ÏƒÎ·Ï‚"},"buttons":{"map_overview":"Î•Ï€Î¹ÏƒÎºÏŒÏ€Î·ÏƒÎ· Ï‡Î¬ÏÏ„Î·","overview":"Î•Ï€Î¹ÏƒÎºÏŒÏ€Î·ÏƒÎ·","backtostart":"Î•Ï€Î¹ÏƒÏ„ÏÎ¿Ï†Î® ÏƒÏ„Î·Î½ Î±ÏÏ‡Î®","collapse_toggle":"Î‘Ï€ÏŒÎºÏÏ…ÏˆÎ· Ï‡Î¬ÏÏ„Î·","uncollapse_toggle":"Î•Î¼Ï†Î¬Î½Î¹ÏƒÎ· Ï‡Î¬ÏÏ„Î·","swipe_to_navigate":"ÎšÏ„Ï…Ï€Î®ÏƒÏ„Îµ ÎµÎ»Î±Ï†ÏÎ¬ Î³Î¹Î± Ï€ÎµÏÎ¹Î®Î³Î·ÏƒÎ·<br><span class=\'vco-button\'>OK</span>"}}')
            },
            194: t => {
                "use strict";
                t.exports = JSON.parse('{"name":"English","lang":"en","messages":{"loading":"Loading","wikipedia":"From Wikipedia, the free encyclopedia","start":"Start Exploring"},"buttons":{"map_overview":"Map Overview","overview":"Overview","backtostart":"Back To Beginning","collapse_toggle":"Hide Map","uncollapse_toggle":"Show Map","swipe_to_navigate":"Swipe to Navigate<br><span class=\'vco-button\'>OK</span>"}}')
            },
            299: t => {
                "use strict";
                t.exports = JSON.parse('{"name":"EspaÃ±ol","lang":"es","messages":{"loading":"cargando","wikipedia":"de Wikipedia, la enciclopedia libre","start":"Explore"},"buttons":{"map_overview":"vista general del mapa","overview":"vista general","backtostart":"volver al comienzo","collapse_toggle":"ocultar mapa","uncollapse_toggle":"mostrar mapa","swipe_to_navigate":"Deslizar para navegar<br><span class=\'vco-button\'>Entendido</span>"}}')
            },
            475: t => {
                "use strict";
                t.exports = JSON.parse('{"name":"eesti","lang":"et","messages":{"loading":"Laadib","wikipedia":"Vikipeedia, vaba entsÃ¼klopeedia","start":"Uuri"},"buttons":{"map_overview":"Kaardi Ã¼levaade","overview":"Ãœlevaade","backtostart":"Tagasi algusesse","collapse_toggle":"Peida kaart","uncollapse_toggle":"NÃ¤ita kaarti","swipe_to_navigate":"Swipe to Navigate<br><span class=\'vco-button\'>OK</span>"}}')
            },
            376: t => {
                "use strict";
                t.exports = JSON.parse('{"name":"FranÃ§ais","lang":"fr","messages":{"loading":"Chargement","wikipedia":"Extrait de WikipÃ©dia, l\'encyclopÃ©die libre","start":"Explore"},"buttons":{"map_overview":"Vue d\'ensemble de la carte","overview":"Vue d\'ensemble","backtostart":"Retourner au point de dÃ©part","collapse_toggle":"Masquer la carte","uncollapse_toggle":"Afficher la carte","swipe_to_navigate":"Faites glisser pour naviguer<br><span class=\'vco-button\'>OK</span>"}}')
            },
            155: t => {
                "use strict";
                t.exports = JSON.parse('{"name":"×¢×‘×¨×™×ª","lang":"he","direction":"rtl","messages":{"loading":"×˜×•×¢×Ÿ","wikipedia":"×ž×ª×•×š ×•×™×§×™×¤×“×™×”, ×”×× ×¦×™×§×œ×•×¤×“×™×” ×”×—×•×¤×©×™×ª","start":"×”×ª×—×œ ×‘×ž×¡×¢"},"buttons":{"map_overview":"×”×ž×¤×” ×‘×ž×œ×•××”","overview":"×ª×¦×•×’×” ×ž×§×“×™×ž×”","backtostart":"×—×–×•×¨ ×œ×”×ª×—×œ×”","collapse_toggle":"×”×¡×ª×¨ ×ž×¤×”","uncollapse_toggle":"×”×¦×’ ×ž×¤×”","swipe_to_navigate":"Swipe to Navigate<br><span class=\'vco-button\'>OK</span>"}}')
            },
            68: t => {
                "use strict";
                t.exports = JSON.parse('{"name":"Magyar","lang":"hu","messages":{"loading":"tÃ¶ltÃ©s","wikipedia":"Wikipedia","start":"IndÃ­tsd"},"buttons":{"map_overview":"teljes tÃ©rkÃ©p","overview":"teljes sztori","backtostart":"vissza az elejÃ©re","collapse_toggle":"Ã¶sszecsuk","uncollapse_toggle":"kinyit","swipe_to_navigate":"HÃºzd el a navigÃ¡ciÃ³hoz<br><span class=\'vco-button\'>OK</span>"}}')
            },
            374: t => {
                "use strict";
                t.exports = JSON.parse('{"name":"Icelandic","lang":"is","messages":{"loading":"HleÃ°sla","wikipedia":"FrÃ¡ Wikipedia","start":"Hefja"},"buttons":{"map_overview":"Kortayfirlit","overview":"Yfirlit","backtostart":"Hefja aftur","collapse_toggle":"Fela kortiÃ°","uncollapse_toggle":"SÃ½na kortiÃ°","swipe_to_navigate":"StrjÃºktu fyrir valmynd<br><span class=\'vco-button\'>Allt Ã­ lagi</span>"}}')
            },
            130: t => {
                "use strict";
                t.exports = JSON.parse('{"name":"Italiano","lang":"it","messages":{"loading":"caricare","wikipedia":"da Wikipedia, la enciclopedia libera","start":"Explore"},"buttons":{"map_overview":"vista generale della mappa","overview":"vista generale","backtostart":"tornare all\' inizio","collapse_toggle":"nascondere mappa","uncollapse_toggle":"mostrare mappa","swipe_to_navigate":"Swipe to Navigate<br><span class=\'vco-button\'>OK</span>"}}')
            },
            733: t => {
                "use strict";
                t.exports = JSON.parse('{"name":"æ—¥æœ¬èªž","lang":"jp","messages":{"loading":"ãƒ­ãƒ¼ãƒ‡ã‚£ãƒ³ã‚°","wikipedia":"ãƒ•ãƒªãƒ¼ç™¾ç§‘äº‹å…¸ã‚¦ã‚£ã‚­ãƒšãƒ‡ã‚£ã‚¢ï¼ˆWikipediaï¼‰ã‹ã‚‰","start":"Explore"},"buttons":{"map_overview":"æ¦‚è¦³åœ°å›³","overview":"æ¦‚è¦³","backtostart":"åˆã‚ã«æˆ»ã‚‹","collapse_toggle":"åœ°å›³ã‚’éš ã™","uncollapse_toggle":"åœ°å›³ã‚’è¡¨ç¤º","swipe_to_navigate":"Swipe to Navigate<br><span class=\'vco-button\'>OK</span>"}}')
            },
            873: t => {
                "use strict";
                t.exports = JSON.parse('{"name":"í•œêµ­ì–´","lang":"ko","messages":{"loading":"ë¶ˆëŸ¬ì˜¤ëŠ”ì¤‘","wikipedia":"ìœ„í‚¤í”¼ë””ì•„","start":"ì‹œìž‘í•˜ê¸°"},"buttons":{"map_overview":"ì§€ë„ ì „ì²´ë³´ê¸°","overview":"ì „ì²´ë³´ê¸°","backtostart":"ë˜ëŒì•„ê°€ê¸°","collapse_toggle":"ìˆ¨ê¸°ê¸°","uncollapse_toggle":"ë³´ì´ê¸°","swipe_to_navigate":"Swipe to Navigate<br><span class=\'vco-button\'>OK</span>"}}')
            },
            351: t => {
                "use strict";
                t.exports = JSON.parse('{"name":"Nederlands","lang":"nl","messages":{"loading":"Laden","wikipedia":"Van Wikipedia, de gratis encyclopedie","start":"Start Exploring"},"buttons":{"map_overview":"Kaart overzicht","overview":"Overzicht","backtostart":"Terug naar begin","collapse_toggle":"Verberg kaart","uncollapse_toggle":"Toon kaart","swipe_to_navigate":"Swipe to Navigate<br><span class=\'vco-button\'>OK</span>"}}')
            },
            697: t => {
                "use strict";
                t.exports = JSON.parse('{"name":"Norsk nynorsk","lang":"nn","messages":{"loading":"Lastar inn","wikipedia":"FrÃ¥ Wikipedia, det frie oppslagsverket","start":"Utforsk"},"buttons":{"map_overview":"SjÃ¥ oversiktskart","overview":"Oversikt","backtostart":"Til starten","collapse_toggle":"GÃ¸ym kartet","uncollapse_toggle":"Vis kartet","swipe_to_navigate":"Swipe to Navigate<br><span class=\'vco-button\'>OK</span>"}}')
            },
            161: t => {
                "use strict";
                t.exports = JSON.parse('{"name":"Norsk","lang":"no","messages":{"loading":"Laster inn","wikipedia":"fra Wikipedia, den frie encyklopedi","start":"Explore"},"buttons":{"map_overview":"Se oversiktskart","overview":"Se oversiktskart","backtostart":"Til begynnelsen","collapse_toggle":"Skjul kartet","uncollapse_toggle":"Vis kartet","swipe_to_navigate":"Swipe to Navigate<br><span class=\'vco-button\'>OK</span>"}}')
            },
            314: t => {
                "use strict";
                t.exports = JSON.parse('{"name":"Polski","lang":"pl","messages":{"loading":"WczytujÄ™","wikipedia":"z Wikipedii, wolnej encyklopedii","start":"Explore"},"buttons":{"map_overview":"PrzeglÄ…daj mapÄ™","overview":"PrzeglÄ…daj","backtostart":"PowrÃ³t","collapse_toggle":"Ukryj mapÄ™","uncollapse_toggle":"PokaÅ¼ mapÄ™","swipe_to_navigate":"Swipe to Navigate<br><span class=\'vco-button\'>OK</span>"}}')
            },
            508: t => {
                "use strict";
                t.exports = JSON.parse('{"name":"PortuguÃªs","lang":"pt","messages":{"loading":"carregando","wikipedia":"de Wikipedia, a enciclopÃ©dia livre","start":"inÃ­cio"},"buttons":{"map_overview":"vista geral do mapa","overview":"vista geral","backtostart":"voltar ao inÃ­cio","collapse_toggle":"ocultar mapa","uncollapse_toggle":"mostrar mapa","swipe_to_navigate":"Deslize para navegar<br><span class=\'vco-button\'>OK</span>"}}')
            },
            849: t => {
                "use strict";
                t.exports = JSON.parse('{"name":"Ð ÑƒÑÑÐºÐ¸Ð¹","lang":"ru","messages":{"loading":"Ð—Ð°Ð³Ñ€ÑƒÐ·ÐºÐ°","wikipedia":"Ð˜Ð· Ð’Ð¸ÐºÐ¸Ð¿ÐµÐ´Ð¸Ð¸, ÑÐ²Ð¾Ð±Ð¾Ð´Ð½Ð¾Ð¹ ÑÐ½Ñ†Ð¸ÐºÐ»Ð¾Ð¿ÐµÐ´Ð¸Ð¸","start":"ÐÐ°Ñ‡Ð°Ñ‚ÑŒ Ð¿Ñ€Ð¾ÑÐ¼Ð¾Ñ‚Ñ€"},"buttons":{"map_overview":"ÐŸÑ€Ð¾ÑÐ¼Ð¾Ñ‚Ñ€ ÐºÐ°Ñ€Ñ‚Ñ‹","overview":"ÐžÐ±Ð·Ð¾Ñ€","backtostart":"Ðš Ð½Ð°Ñ‡Ð°Ð»Ñƒ","collapse_toggle":"Ð¡ÐºÑ€Ñ‹Ñ‚ÑŒ ÐºÐ°Ñ€Ñ‚Ñƒ","uncollapse_toggle":"ÐŸÐ¾ÐºÐ°Ð·Ð°Ñ‚ÑŒ ÐºÐ°Ñ€Ñ‚Ñƒ","swipe_to_navigate":"Swipe to Navigate<br><span class=\'vco-button\'>OK</span>"}}')
            },
            952: t => {
                "use strict";
                t.exports = JSON.parse('{"name":"SlovenÄina","lang":"sk","messages":{"loading":"NahrÃ¡vanie","wikipedia":"Z WikipÃ©die, slobodnej encyklopÃ©die","start":"PreskÃºmaÅ¥"},"buttons":{"map_overview":"PrehÄ¾adovÃ¡ mapa","overview":"PrehÄ¾ad","backtostart":"SpÃ¤Å¥ na zaÄiatok","collapse_toggle":"SkryÅ¥ mapu","uncollapse_toggle":"ZobraziÅ¥ mapu","swipe_to_navigate":"Navigujte potiahnutÃ­m prsta<br><span class=\'vco-button\'>OK</span>"}}')
            },
            865: t => {
                "use strict";
                t.exports = JSON.parse('{"name":"Srpski","lang":"sr","messages":{"loading":"UÄitavanje","wikipedia":"Wikipedia","start":"Explore"},"buttons":{"map_overview":"Pregled mapÄ™","backtostart":"Nazad na poÄetak","collapse_toggle":"Sakrij mapu","uncollapse_toggle":"PrikaÅ¾i mapu","swipe_to_navigate":"Swipe to Navigate<br><span class=\'vco-button\'>OK</span>"}}')
            },
            273: t => {
                "use strict";
                t.exports = JSON.parse('{"name":"Svenska","lang":"sv","messages":{"loading":"Laddar","wikipedia":"FrÃ¥n Wikipedia, den fria encyklopedin","start":"Explore"},"buttons":{"map_overview":"Ã–versiktskarta","overview":"Ã–versikt","backtostart":"Tillbaka till bÃ¶rjan","collapse_toggle":"GÃ¶m kartan","uncollapse_toggle":"Visa kartan","swipe_to_navigate":"Swipe to Navigate<br><span class=\'vco-button\'>OK</span>"}}')
            },
            830: t => {
                "use strict";
                t.exports = JSON.parse('{"name":"TÃ¼rkÃ§e","lang":"tr","messages":{"loading":"YÃ¼kleniyor","wikipedia":"Vikipedi, Ã–zgÃ¼r Ansiklopedi","start":"KeÅŸfet"},"buttons":{"map_overview":"Genel harita","overview":"Genel harita","backtostart":"BaÅŸlangÄ±Ã§ menÃ¼sÃ¼ne dÃ¶n","collapse_toggle":"MenÃ¼yÃ¼ gizle","uncollapse_toggle":"MenÃ¼yÃ¼ gÃ¶ster","swipe_to_navigate":"Dokun ve kaydÄ±r<br><span class=\'vco-button\'>OK</span>"}}')
            },
            362: t => {
                "use strict";
                t.exports = JSON.parse('{"name":"Ð£ÐºÑ€Ð°Ñ—Ð½ÑÑŒÐºÐ°","lang":"uk","messages":{"loading":"Ð—Ð°Ð²Ð°Ð½Ñ‚Ð°Ð¶ÐµÐ½Ð½Ñ","wikipedia":"Ð— Ð’Ñ–ÐºÑ–Ð¿ÐµÐ´Ñ–Ñ—, Ð²Ñ–Ð»ÑŒÐ½Ð¾Ñ— ÐµÐ½Ñ†Ð¸ÐºÐ»Ð¾Ð¿ÐµÐ´Ñ–Ñ—","start":"ÐŸÐ¾Ñ‡Ð°Ñ‚Ð¸ Ð¿ÐµÑ€ÐµÐ³Ð»ÑÐ´"},"buttons":{"map_overview":"ÐŸÐµÑ€ÐµÐ³Ð»ÑÐ´ ÐºÐ°Ñ€Ñ‚Ð¸","overview":"ÐžÐ³Ð»ÑÐ´","backtostart":"ÐŸÐ¾Ð²ÐµÑ€Ð½ÑƒÑ‚Ð¸ÑÑ Ð´Ð¾ Ð¿Ð¾Ñ‡Ð°Ñ‚ÐºÑƒ","collapse_toggle":"ÐŸÑ€Ð¸Ñ…Ð¾Ð²Ð°Ñ‚Ð¸ ÐºÐ°Ñ€Ñ‚Ñƒ","uncollapse_toggle":"ÐŸÐ¾ÐºÐ°Ð·Ð°Ñ‚Ð¸ ÐºÐ°Ñ€Ñ‚Ñƒ","swipe_to_navigate":"Swipe to Navigate<br><span class=\'vco-button\'>OK</span>"}}')
            },
            125: t => {
                "use strict";
                t.exports = JSON.parse('{"name":"Urdu","lang":"ur","direction":"rtl","messages":{"loading":"Ù„ÙˆÚˆ ÛÙˆ Ø±ÛØ§ ÛÛ’","wikipedia":"ÙˆÛŒÚ©ÛŒÙ¾ÛŒÚˆÛŒØ§, Ù…ÙØª Ø¯Ø³ØªÛŒØ§Ø¨ Ø§Ù†Ø³Ø§Ø¦ÛŒÚ©Ù„ÙˆÙ¾ÛŒÚˆÛŒØ§ Ø³Û’ ","start":"Ø¯Ø±ÛŒØ§ÙØª Ø´Ø±ÙˆØ¹ Ú©ÛŒ Ø¬Ø§ÛŒÛ’ "},"buttons":{"map_overview":"Ù†Ù‚Ø´Û’ Ú©Ø§ Ø¬Ø§Ø¦Ø²Û","overview":"Ø¬Ø§Ø¦Ø²Û","backtostart":"ÙˆØ§Ù¾Ø³ Ø´Ø±ÙˆØ¹ Ø³Û’","collapse_toggle":"Ù†Ù‚Ø´Û ØºØ§Ø¦Ø¨","uncollapse_toggle":"Ù†Ù‚Ø´Û Ø­Ø§Ø¶Ø±","swipe_to_navigate":"Swipe to Navigate<br><span class=\'vco-button\'>OK</span>"}}')
            },
            814: t => {
                "use strict";
                t.exports = JSON.parse('{"name":"ä¸­æ–‡","lang":"zh-cn","messages":{"loading":"åŠ è½½ä¸­","wikipedia":"æ¥è‡ªç»´åŸºç™¾ç§‘ï¼Œè‡ªç”±çš„ç™¾ç§‘å…¨ä¹¦","start":"Explore"},"buttons":{"map_overview":"åœ°å›¾æ€»è§ˆ","overview":"æ€»è§ˆ","backtostart":"å›žåˆ°é¦–é¡µ","collapse_toggle":"éšè—åœ°å›¾","uncollapse_toggle":"æ˜¾ç¤ºåœ°å›¾","swipe_to_navigate":"Swipe to Navigate<br><span class=\'vco-button\'>OK</span>"}}')
            },
            220: t => {
                "use strict";
                t.exports = JSON.parse('{"name":"æ­£é«”ä¸­æ–‡","lang":"zh-tw","messages":{"loading":"è¼‰å…¥ä¸­","wikipedia":"ä¾†è‡ªç¶­åŸºç™¾ç§‘ï¼Œè‡ªç”±çš„ç™¾ç§‘å…¨æ›¸","start":"æŽ¢ç´¢"},"buttons":{"map_overview":"åœ°åœ–ç¸½è¦½","overview":"ç¸½è¦½","backtostart":"å›žåˆ°é¦–é ","collapse_toggle":"éš±è—åœ°åœ–","uncollapse_toggle":"é¡¯ç¤ºåœ°åœ–","swipe_to_navigate":"å·¦å³æ»‘å‹•ä»¥ç€è¦½<br><span class=\'vco-button\'>æˆ‘çŸ¥é“äº†</span>"}}')
            },
            329: (t, e, i) => {
                var o = {
                    "./be.json": 965,
                    "./bg.json": 371,
                    "./cs.json": 473,
                    "./de.json": 997,
                    "./el.json": 879,
                    "./en.json": 194,
                    "./es.json": 299,
                    "./et.json": 475,
                    "./fr.json": 376,
                    "./he.json": 155,
                    "./hu.json": 68,
                    "./is.json": 374,
                    "./it.json": 130,
                    "./jp.json": 733,
                    "./ko.json": 873,
                    "./nl.json": 351,
                    "./nn.json": 697,
                    "./no.json": 161,
                    "./pl.json": 314,
                    "./pt.json": 508,
                    "./ru.json": 849,
                    "./sk.json": 952,
                    "./sr.json": 865,
                    "./sv.json": 273,
                    "./tr.json": 830,
                    "./uk.json": 362,
                    "./ur.json": 125,
                    "./zh-cn.json": 814,
                    "./zh-tw.json": 220
                };

                function n(t) {
                    var e = s(t);
                    return i(e)
                }

                function s(t) {
                    if (!i.o(o, t)) {
                        var e = new Error("Cannot find module '" + t + "'");
                        throw e.code = "MODULE_NOT_FOUND", e
                    }
                    return o[t]
                }
                n.keys = function () {
                    return Object.keys(o)
                }, n.resolve = s, t.exports = n, n.id = 329
            }
        },
        e = {};

    function i(o) {
        var n = e[o];
        if (void 0 !== n) return n.exports;
        var s = e[o] = {
            exports: {}
        };
        return t[o](s, s.exports, i), s.exports
    }
    i.d = (t, e) => {
        for (var o in e) i.o(e, o) && !i.o(t, o) && Object.defineProperty(t, o, {
            enumerable: !0,
            get: e[o]
        })
    }, i.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e), i.r = t => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        })
    };
    var o = {};
    (() => {
        "use strict";
        i.r(o), i.d(o, {
            MediaType: () => Pt,
            StamenTileLayer: () => it,
            StoryMap: () => Et,
            ZoomifyTileLayer: () => G,
            loadCSS: () => B,
            setLanguage: () => j
        });
        const t = navigator.userAgent.toLowerCase(),
            e = document.documentElement,
            s = -1 !== t.indexOf("webkit"),
            a = "ActiveXObject" in window,
            r = -1 !== t.indexOf("phantom"),
            h = -1 !== t.search("android [23]"),
            l = "undefined" != typeof orientation,
            c = navigator.msPointerEnabled && navigator.msMaxTouchPoints && !window.PointerEvent,
            d = window.PointerEvent && navigator.pointerEnabled && navigator.maxTouchPoints || c,
            p = a && "transition" in e.style,
            _ = "WebKitCSSMatrix" in window && "m11" in new window.WebKitCSSMatrix && !h,
            u = "MozPerspective" in e.style,
            m = "OTransition" in e.style,
            g = (window.opera, !window.L_NO_TOUCH && !r && (d || "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch));
        let f = "devicePixelRatio" in window && window.devicePixelRatio > 1;
        if (!f && "matchMedia" in window) {
            var v = window.matchMedia("(min-resolution:144dpi)");
            f = v && v.matches
        }
        a && document.addEventListener;
        const y = -1 !== t.indexOf("chrome"),
            w = -1 !== t.indexOf("gecko") && !s && !window.opera && !a,
            b = (t.indexOf("android"), window.L_DISABLE_3D, l),
            x = (l && window.opera, !!g),
            M = function () {
                var t = "portrait";
                return window.innerWidth > window.innerHeight && (t = "landscape"), Math.abs(window.orientation), trace(t), t
            };

        function k(t) {
            for (var e, i = Array.prototype.slice.call(arguments, 1), o = 0, n = i.length; o < n; o++)
                for (var s in e = i[o] || {}) e.hasOwnProperty(s) && (t[s] = e[s]);
            return t
        }

        function P(t, ...e) {
            for (let o of e)
                for (var i of Object.getOwnPropertyNames(o.prototype)) t.prototype[i] = o.prototype[i]
        }

        function T(t, e) {
            var i;
            for (i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
            return t
        }

        function D() {
            var t = 0,
                e = "_vco_id";
            return function (i) {
                return i[e] = i[e] || ++t, i[e]
            }
        }

        function S(t, e) {
            var i = function () {
                    var t;
                    return "abcdefghijklmnopqurstuvwxyz".substr((t = 32, Math.floor(Math.random() * t)), 1)
                },
                o = function (t) {
                    for (var e = "", o = 0; o < t; o++) e += i();
                    return e
                };
            return e ? e + "-" + o(t) : "vco-" + o(t)
        }

        function C(t) {
            return y && (t = function (t) {
                var e = {
                        "ðŸ˜„": 0,
                        "ðŸ˜ƒ": 1,
                        "ðŸ˜€": 2,
                        "ðŸ˜Š": 3,
                        "â˜ºï¸": 4,
                        "ðŸ˜‰": 5,
                        "ðŸ˜": 6,
                        "ðŸ˜˜": 7,
                        "ðŸ˜š": 8,
                        "ðŸ˜—": 9,
                        "ðŸ˜™": 10,
                        "ðŸ˜œ": 11,
                        "ðŸ˜": 12,
                        "ðŸ˜›": 13,
                        "ðŸ˜³": 14,
                        "ðŸ˜": 15,
                        "ðŸ˜”": 16,
                        "ðŸ˜Œ": 17,
                        "ðŸ˜’": 18,
                        "ðŸ˜ž": 19,
                        "ðŸ˜£": 20,
                        "ðŸ˜¢": 21,
                        "ðŸ˜‚": 22,
                        "ðŸ˜­": 23,
                        "ðŸ˜ª": 24,
                        "ðŸ˜¥": 25,
                        "ðŸ˜°": 26,
                        "ðŸ˜…": 27,
                        "ðŸ˜“": 28,
                        "ðŸ˜©": 29,
                        "ðŸ˜«": 30,
                        "ðŸ˜¨": 31,
                        "ðŸ˜±": 32,
                        "ðŸ˜ ": 33,
                        "ðŸ˜¡": 34,
                        "ðŸ˜¤": 35,
                        "ðŸ˜–": 36,
                        "ðŸ˜†": 37,
                        "ðŸ˜‹": 38,
                        "ðŸ˜·": 39,
                        "ðŸ˜Ž": 40,
                        "ðŸ˜´": 41,
                        "ðŸ˜µ": 42,
                        "ðŸ˜²": 43,
                        "ðŸ˜Ÿ": 44,
                        "ðŸ˜¦": 45,
                        "ðŸ˜§": 46,
                        "ðŸ˜ˆ": 47,
                        "ðŸ‘¿": 48,
                        "ðŸ˜®": 49,
                        "ðŸ˜¬": 50,
                        "ðŸ˜": 51,
                        "ðŸ˜•": 52,
                        "ðŸ˜¯": 53,
                        "ðŸ˜¶": 54,
                        "ðŸ˜‡": 55,
                        "ðŸ˜": 56,
                        "ðŸ˜‘": 57,
                        "ðŸ‘²": 58,
                        "ðŸ‘³": 59,
                        "ðŸ‘®": 60,
                        "ðŸ‘·": 61,
                        "ðŸ’‚": 62,
                        "ðŸ‘¶": 63,
                        "ðŸ‘¦": 64,
                        "ðŸ‘§": 65,
                        "ðŸ‘¨": 66,
                        "ðŸ‘©": 67,
                        "ðŸ‘´": 68,
                        "ðŸ‘µ": 69,
                        "ðŸ‘±": 70,
                        "ðŸ‘¼": 71,
                        "ðŸ‘¸": 72,
                        "ðŸ˜º": 73,
                        "ðŸ˜¸": 74,
                        "ðŸ˜»": 75,
                        "ðŸ˜½": 76,
                        "ðŸ˜¼": 77,
                        "ðŸ™€": 78,
                        "ðŸ˜¿": 79,
                        "ðŸ˜¹": 80,
                        "ðŸ˜¾": 81,
                        "ðŸ‘¹": 82,
                        "ðŸ‘º": 83,
                        "ðŸ™ˆ": 84,
                        "ðŸ™‰": 85,
                        "ðŸ™Š": 86,
                        "ðŸ’€": 87,
                        "ðŸ‘½": 88,
                        "ðŸ’©": 89,
                        "ðŸ”¥": 90,
                        "âœ¨": 91,
                        "ðŸŒŸ": 92,
                        "ðŸ’«": 93,
                        "ðŸ’¥": 94,
                        "ðŸ’¢": 95,
                        "ðŸ’¦": 96,
                        "ðŸ’§": 97,
                        "ðŸ’¤": 98,
                        "ðŸ’¨": 99,
                        "ðŸ‘‚": 100,
                        "ðŸ‘€": 101,
                        "ðŸ‘ƒ": 102,
                        "ðŸ‘…": 103,
                        "ðŸ‘„": 104,
                        "ðŸ‘": 105,
                        "ðŸ‘Ž": 106,
                        "ðŸ‘Œ": 107,
                        "ðŸ‘Š": 108,
                        "âœŠ": 109,
                        "âœŒï¸": 110,
                        "ðŸ‘‹": 111,
                        "âœ‹": 112,
                        "ðŸ‘": 113,
                        "ðŸ‘†": 114,
                        "ðŸ‘‡": 115,
                        "ðŸ‘‰": 116,
                        "ðŸ‘ˆ": 117,
                        "ðŸ™Œ": 118,
                        "ðŸ™": 119,
                        "â˜ï¸": 120,
                        "ðŸ‘": 121,
                        "ðŸ’ª": 122,
                        "ðŸš¶": 123,
                        "ðŸƒ": 124,
                        "ðŸ’ƒ": 125,
                        "ðŸ‘«": 126,
                        "ðŸ‘ª": 127,
                        "ðŸ‘¬": 128,
                        "ðŸ‘­": 129,
                        "ðŸ’": 130,
                        "ðŸ’‘": 131,
                        "ðŸ‘¯": 132,
                        "ðŸ™†": 133,
                        "ðŸ™…": 134,
                        "ðŸ’": 135,
                        "ðŸ™‹": 136,
                        "ðŸ’†": 137,
                        "ðŸ’‡": 138,
                        "ðŸ’…": 139,
                        "ðŸ‘°": 140,
                        "ðŸ™Ž": 141,
                        "ðŸ™": 142,
                        "ðŸ™‡": 143,
                        "ðŸŽ©": 144,
                        "ðŸ‘‘": 145,
                        "ðŸ‘’": 146,
                        "ðŸ‘Ÿ": 147,
                        "ðŸ‘ž": 148,
                        "ðŸ‘¡": 149,
                        "ðŸ‘ ": 150,
                        "ðŸ‘¢": 151,
                        "ðŸ‘•": 152,
                        "ðŸ‘”": 153,
                        "ðŸ‘š": 154,
                        "ðŸ‘—": 155,
                        "ðŸŽ½": 156,
                        "ðŸ‘–": 157,
                        "ðŸ‘˜": 158,
                        "ðŸ‘™": 159,
                        "ðŸ’¼": 160,
                        "ðŸ‘œ": 161,
                        "ðŸ‘": 162,
                        "ðŸ‘›": 163,
                        "ðŸ‘“": 164,
                        "ðŸŽ€": 165,
                        "ðŸŒ‚": 166,
                        "ðŸ’„": 167,
                        "ðŸ’›": 168,
                        "ðŸ’™": 169,
                        "ðŸ’œ": 170,
                        "ðŸ’š": 171,
                        "â¤ï¸": 172,
                        "ðŸ’”": 173,
                        "ðŸ’—": 174,
                        "ðŸ’“": 175,
                        "ðŸ’•": 176,
                        "ðŸ’–": 177,
                        "ðŸ’ž": 178,
                        "ðŸ’˜": 179,
                        "ðŸ’Œ": 180,
                        "ðŸ’‹": 181,
                        "ðŸ’": 182,
                        "ðŸ’Ž": 183,
                        "ðŸ‘¤": 184,
                        "ðŸ‘¥": 185,
                        "ðŸ’¬": 186,
                        "ðŸ‘£": 187,
                        "ðŸ’­": 188,
                        "ðŸ¶": 189,
                        "ðŸº": 190,
                        "ðŸ±": 191,
                        "ðŸ­": 192,
                        "ðŸ¹": 193,
                        "ðŸ°": 194,
                        "ðŸ¸": 195,
                        "ðŸ¯": 196,
                        "ðŸ¨": 197,
                        "ðŸ»": 198,
                        "ðŸ·": 199,
                        "ðŸ½": 200,
                        "ðŸ®": 201,
                        "ðŸ—": 202,
                        "ðŸµ": 203,
                        "ðŸ’": 204,
                        "ðŸ´": 205,
                        "ðŸ‘": 206,
                        "ðŸ˜": 207,
                        "ðŸ¼": 208,
                        "ðŸ§": 209,
                        "ðŸ¦": 210,
                        "ðŸ¤": 211,
                        "ðŸ¥": 212,
                        "ðŸ£": 213,
                        "ðŸ”": 214,
                        "ðŸ": 215,
                        "ðŸ¢": 216,
                        "ðŸ›": 217,
                        "ðŸ": 218,
                        "ðŸœ": 219,
                        "ðŸž": 220,
                        "ðŸŒ": 221,
                        "ðŸ™": 222,
                        "ðŸš": 223,
                        "ðŸ ": 224,
                        "ðŸŸ": 225,
                        "ðŸ¬": 226,
                        "ðŸ³": 227,
                        "ðŸ‹": 228,
                        "ðŸ„": 229,
                        "ðŸ": 230,
                        "ðŸ€": 231,
                        "ðŸƒ": 232,
                        "ðŸ…": 233,
                        "ðŸ‡": 234,
                        "ðŸ‰": 235,
                        "ðŸŽ": 236,
                        "ðŸ": 237,
                        "ðŸ“": 238,
                        "ðŸ•": 239,
                        "ðŸ–": 240,
                        "ðŸ": 241,
                        "ðŸ‚": 242,
                        "ðŸ²": 243,
                        "ðŸ¡": 244,
                        "ðŸŠ": 245,
                        "ðŸ«": 246,
                        "ðŸª": 247,
                        "ðŸ†": 248,
                        "ðŸˆ": 249,
                        "ðŸ©": 250,
                        "ðŸ¾": 251,
                        "ðŸ’": 252,
                        "ðŸŒ¸": 253,
                        "ðŸŒ·": 254,
                        "ðŸ€": 255,
                        "ðŸŒ¹": 256,
                        "ðŸŒ»": 257,
                        "ðŸŒº": 258,
                        "ðŸ": 259,
                        "ðŸƒ": 260,
                        "ðŸ‚": 261,
                        "ðŸŒ¿": 262,
                        "ðŸŒ¾": 263,
                        "ðŸ„": 264,
                        "ðŸŒµ": 265,
                        "ðŸŒ´": 266,
                        "ðŸŒ²": 267,
                        "ðŸŒ³": 268,
                        "ðŸŒ°": 269,
                        "ðŸŒ±": 270,
                        "ðŸŒ¼": 271,
                        "ðŸŒ": 272,
                        "ðŸŒž": 273,
                        "ðŸŒ": 274,
                        "ðŸŒš": 275,
                        "ðŸŒ‘": 276,
                        "ðŸŒ’": 277,
                        "ðŸŒ“": 278,
                        "ðŸŒ”": 279,
                        "ðŸŒ•": 280,
                        "ðŸŒ–": 281,
                        "ðŸŒ—": 282,
                        "ðŸŒ˜": 283,
                        "ðŸŒœ": 284,
                        "ðŸŒ›": 285,
                        "ðŸŒ™": 286,
                        "ðŸŒ": 287,
                        "ðŸŒŽ": 288,
                        "ðŸŒ": 289,
                        "ðŸŒ‹": 290,
                        "ðŸŒŒ": 291,
                        "ðŸŒ ": 292,
                        "â­ï¸": 293,
                        "â˜€ï¸": 294,
                        "â›…ï¸": 295,
                        "â˜ï¸": 296,
                        "âš¡ï¸": 297,
                        "â˜”ï¸": 298,
                        "â„ï¸": 299,
                        "â›„ï¸": 300,
                        "ðŸŒ€": 301,
                        "ðŸŒ": 302,
                        "ðŸŒˆ": 303,
                        "ðŸŒŠ": 304,
                        "ðŸŽ": 305,
                        "ðŸ’": 306,
                        "ðŸŽŽ": 307,
                        "ðŸŽ’": 308,
                        "ðŸŽ“": 309,
                        "ðŸŽ": 310,
                        "ðŸŽ†": 311,
                        "ðŸŽ‡": 312,
                        "ðŸŽ": 313,
                        "ðŸŽ‘": 314,
                        "ðŸŽƒ": 315,
                        "ðŸ‘»": 316,
                        "ðŸŽ…": 317,
                        "ðŸŽ„": 318,
                        "ðŸŽ": 319,
                        "ðŸŽ‹": 320,
                        "ðŸŽ‰": 321,
                        "ðŸŽŠ": 322,
                        "ðŸŽˆ": 323,
                        "ðŸŽŒ": 324,
                        "ðŸ”®": 325,
                        "ðŸŽ¥": 326,
                        "ðŸ“·": 327,
                        "ðŸ“¹": 328,
                        "ðŸ“¼": 329,
                        "ðŸ’¿": 330,
                        "ðŸ“€": 331,
                        "ðŸ’½": 332,
                        "ðŸ’¾": 333,
                        "ðŸ’»": 334,
                        "ðŸ“±": 335,
                        "â˜Žï¸": 336,
                        "ðŸ“ž": 337,
                        "ðŸ“Ÿ": 338,
                        "ðŸ“ ": 339,
                        "ðŸ“¡": 340,
                        "ðŸ“º": 341,
                        "ðŸ“»": 342,
                        "ðŸ”Š": 343,
                        "ðŸ”‰": 344,
                        "ðŸ”ˆ": 345,
                        "ðŸ”‡": 346,
                        "ðŸ””": 347,
                        "ðŸ”•": 348,
                        "ðŸ“¢": 349,
                        "ðŸ“£": 350,
                        "â³": 351,
                        "âŒ›ï¸": 352,
                        "â°": 353,
                        "âŒšï¸": 354,
                        "ðŸ”“": 355,
                        "ðŸ”’": 356,
                        "ðŸ”": 357,
                        "ðŸ”": 358,
                        "ðŸ”‘": 359,
                        "ðŸ”Ž": 360,
                        "ðŸ’¡": 361,
                        "ðŸ”¦": 362,
                        "ðŸ”†": 363,
                        "ðŸ”…": 364,
                        "ðŸ”Œ": 365,
                        "ðŸ”‹": 366,
                        "ðŸ”": 367,
                        "ðŸ›": 368,
                        "ðŸ›€": 369,
                        "ðŸš¿": 370,
                        "ðŸš½": 371,
                        "ðŸ”§": 372,
                        "ðŸ”©": 373,
                        "ðŸ”¨": 374,
                        "ðŸšª": 375,
                        "ðŸš¬": 376,
                        "ðŸ’£": 377,
                        "ðŸ”«": 378,
                        "ðŸ”ª": 379,
                        "ðŸ’Š": 380,
                        "ðŸ’‰": 381,
                        "ðŸ’°": 382,
                        "ðŸ’´": 383,
                        "ðŸ’µ": 384,
                        "ðŸ’·": 385,
                        "ðŸ’¶": 386,
                        "ðŸ’³": 387,
                        "ðŸ’¸": 388,
                        "ðŸ“²": 389,
                        "ðŸ“§": 390,
                        "ðŸ“¥": 391,
                        "ðŸ“¤": 392,
                        "âœ‰ï¸": 393,
                        "ðŸ“©": 394,
                        "ðŸ“¨": 395,
                        "ðŸ“¯": 396,
                        "ðŸ“«": 397,
                        "ðŸ“ª": 398,
                        "ðŸ“¬": 399,
                        "ðŸ“­": 400,
                        "ðŸ“®": 401,
                        "ðŸ“¦": 402,
                        "ðŸ“": 403,
                        "ðŸ“„": 404,
                        "ðŸ“ƒ": 405,
                        "ðŸ“‘": 406,
                        "ðŸ“Š": 407,
                        "ðŸ“ˆ": 408,
                        "ðŸ“‰": 409,
                        "ðŸ“œ": 410,
                        "ðŸ“‹": 411,
                        "ðŸ“…": 412,
                        "ðŸ“†": 413,
                        "ðŸ“‡": 414,
                        "ðŸ“": 415,
                        "ðŸ“‚": 416,
                        "âœ‚ï¸": 417,
                        "ðŸ“Œ": 418,
                        "ðŸ“Ž": 419,
                        "âœ’ï¸": 420,
                        "âœï¸": 421,
                        "ðŸ“": 422,
                        "ðŸ“": 423,
                        "ðŸ“•": 424,
                        "ðŸ“—": 425,
                        "ðŸ“˜": 426,
                        "ðŸ“™": 427,
                        "ðŸ““": 428,
                        "ðŸ“”": 429,
                        "ðŸ“’": 430,
                        "ðŸ“š": 431,
                        "ðŸ“–": 432,
                        "ðŸ”–": 433,
                        "ðŸ“›": 434,
                        "ðŸ”¬": 435,
                        "ðŸ”­": 436,
                        "ðŸ“°": 437,
                        "ðŸŽ¨": 438,
                        "ðŸŽ¬": 439,
                        "ðŸŽ¤": 440,
                        "ðŸŽ§": 441,
                        "ðŸŽ¼": 442,
                        "ðŸŽµ": 443,
                        "ðŸŽ¶": 444,
                        "ðŸŽ¹": 445,
                        "ðŸŽ»": 446,
                        "ðŸŽº": 447,
                        "ðŸŽ·": 448,
                        "ðŸŽ¸": 449,
                        "ðŸ‘¾": 450,
                        "ðŸŽ®": 451,
                        "ðŸƒ": 452,
                        "ðŸŽ´": 453,
                        "ðŸ€„ï¸": 454,
                        "ðŸŽ²": 455,
                        "ðŸŽ¯": 456,
                        "ðŸˆ": 457,
                        "ðŸ€": 458,
                        "âš½ï¸": 459,
                        "âš¾ï¸": 460,
                        "ðŸŽ¾": 461,
                        "ðŸŽ±": 462,
                        "ðŸ‰": 463,
                        "ðŸŽ³": 464,
                        "â›³ï¸": 465,
                        "ðŸšµ": 466,
                        "ðŸš´": 467,
                        "ðŸ": 468,
                        "ðŸ‡": 469,
                        "ðŸ†": 470,
                        "ðŸŽ¿": 471,
                        "ðŸ‚": 472,
                        "ðŸŠ": 473,
                        "ðŸ„": 474,
                        "ðŸŽ£": 475,
                        "â˜•ï¸": 476,
                        "ðŸµ": 477,
                        "ðŸ¶": 478,
                        "ðŸ¼": 479,
                        "ðŸº": 480,
                        "ðŸ»": 481,
                        "ðŸ¸": 482,
                        "ðŸ¹": 483,
                        "ðŸ·": 484,
                        "ðŸ´": 485,
                        "ðŸ•": 486,
                        "ðŸ”": 487,
                        "ðŸŸ": 488,
                        "ðŸ—": 489,
                        "ðŸ–": 490,
                        "ðŸ": 491,
                        "ðŸ›": 492,
                        "ðŸ¤": 493,
                        "ðŸ±": 494,
                        "ðŸ£": 495,
                        "ðŸ¥": 496,
                        "ðŸ™": 497,
                        "ðŸ˜": 498,
                        "ðŸš": 499,
                        "ðŸœ": 500,
                        "ðŸ²": 501,
                        "ðŸ¢": 502,
                        "ðŸ¡": 503,
                        "ðŸ³": 504,
                        "ðŸž": 505,
                        "ðŸ©": 506,
                        "ðŸ®": 507,
                        "ðŸ¦": 508,
                        "ðŸ¨": 509,
                        "ðŸ§": 510,
                        "ðŸŽ‚": 511,
                        "ðŸ°": 512,
                        "ðŸª": 513,
                        "ðŸ«": 514,
                        "ðŸ¬": 515,
                        "ðŸ­": 516,
                        "ðŸ¯": 517,
                        "ðŸŽ": 518,
                        "ðŸ": 519,
                        "ðŸŠ": 520,
                        "ðŸ‹": 521,
                        "ðŸ’": 522,
                        "ðŸ‡": 523,
                        "ðŸ‰": 524,
                        "ðŸ“": 525,
                        "ðŸ‘": 526,
                        "ðŸˆ": 527,
                        "ðŸŒ": 528,
                        "ðŸ": 529,
                        "ðŸ": 530,
                        "ðŸ ": 531,
                        "ðŸ†": 532,
                        "ðŸ…": 533,
                        "ðŸŒ½": 534,
                        "ðŸ ": 535,
                        "ðŸ¡": 536,
                        "ðŸ«": 537,
                        "ðŸ¢": 538,
                        "ðŸ£": 539,
                        "ðŸ¥": 540,
                        "ðŸ¦": 541,
                        "ðŸª": 542,
                        "ðŸ©": 543,
                        "ðŸ¨": 544,
                        "ðŸ’’": 545,
                        "â›ªï¸": 546,
                        "ðŸ¬": 547,
                        "ðŸ¤": 548,
                        "ðŸŒ‡": 549,
                        "ðŸŒ†": 550,
                        "ðŸ¯": 551,
                        "ðŸ°": 552,
                        "â›ºï¸": 553,
                        "ðŸ­": 554,
                        "ðŸ—¼": 555,
                        "ðŸ—¾": 556,
                        "ðŸ—»": 557,
                        "ðŸŒ„": 558,
                        "ðŸŒ…": 559,
                        "ðŸŒƒ": 560,
                        "ðŸ—½": 561,
                        "ðŸŒ‰": 562,
                        "ðŸŽ ": 563,
                        "ðŸŽ¡": 564,
                        "â›²ï¸": 565,
                        "ðŸŽ¢": 566,
                        "ðŸš¢": 567,
                        "â›µï¸": 568,
                        "ðŸš¤": 569,
                        "ðŸš£": 570,
                        "âš“ï¸": 571,
                        "ðŸš€": 572,
                        "âœˆï¸": 573,
                        "ðŸ’º": 574,
                        "ðŸš": 575,
                        "ðŸš‚": 576,
                        "ðŸšŠ": 577,
                        "ðŸš‰": 578,
                        "ðŸšž": 579,
                        "ðŸš†": 580,
                        "ðŸš„": 581,
                        "ðŸš…": 582,
                        "ðŸšˆ": 583,
                        "ðŸš‡": 584,
                        "ðŸš": 585,
                        "ðŸš‹": 586,
                        "ðŸšƒ": 587,
                        "ðŸšŽ": 588,
                        "ðŸšŒ": 589,
                        "ðŸš": 590,
                        "ðŸš™": 591,
                        "ðŸš˜": 592,
                        "ðŸš—": 593,
                        "ðŸš•": 594,
                        "ðŸš–": 595,
                        "ðŸš›": 596,
                        "ðŸšš": 597,
                        "ðŸš¨": 598,
                        "ðŸš“": 599,
                        "ðŸš”": 600,
                        "ðŸš’": 601,
                        "ðŸš‘": 602,
                        "ðŸš": 603,
                        "ðŸš²": 604,
                        "ðŸš¡": 605,
                        "ðŸšŸ": 606,
                        "ðŸš ": 607,
                        "ðŸšœ": 608,
                        "ðŸ’ˆ": 609,
                        "ðŸš": 610,
                        "ðŸŽ«": 611,
                        "ðŸš¦": 612,
                        "ðŸš¥": 613,
                        "âš ï¸": 614,
                        "ðŸš§": 615,
                        "ðŸ”°": 616,
                        "â›½ï¸": 617,
                        "ðŸ®": 618,
                        "ðŸŽ°": 619,
                        "â™¨ï¸": 620,
                        "ðŸ—¿": 621,
                        "ðŸŽª": 622,
                        "ðŸŽ­": 623,
                        "ðŸ“": 624,
                        "ðŸš©": 625,
                        "ðŸ‡¯ðŸ‡µ": 626,
                        "ðŸ‡°ðŸ‡·": 627,
                        "ðŸ‡©ðŸ‡ª": 628,
                        "ðŸ‡¨ðŸ‡³": 629,
                        "ðŸ‡ºðŸ‡¸": 630,
                        "ðŸ‡«ðŸ‡·": 631,
                        "ðŸ‡ªðŸ‡¸": 632,
                        "ðŸ‡®ðŸ‡¹": 633,
                        "ðŸ‡·ðŸ‡º": 634,
                        "ðŸ‡¬ðŸ‡§": 635,
                        "1âƒ£": 636,
                        "2âƒ£": 637,
                        "3âƒ£": 638,
                        "4âƒ£": 639,
                        "5âƒ£": 640,
                        "6âƒ£": 641,
                        "7âƒ£": 642,
                        "8âƒ£": 643,
                        "9âƒ£": 644,
                        "0âƒ£": 645,
                        "ðŸ”Ÿ": 646,
                        "ðŸ”¢": 647,
                        "#âƒ£": 648,
                        "ðŸ”£": 649,
                        "â¬†ï¸": 650,
                        "â¬‡ï¸": 651,
                        "â¬…ï¸": 652,
                        "âž¡ï¸": 653,
                        "ðŸ” ": 654,
                        "ðŸ”¡": 655,
                        "ðŸ”¤": 656,
                        "â†—ï¸": 657,
                        "â†–ï¸": 658,
                        "â†˜ï¸": 659,
                        "â†™ï¸": 660,
                        "â†”ï¸": 661,
                        "â†•ï¸": 662,
                        "ðŸ”„": 663,
                        "â—€ï¸": 664,
                        "â–¶ï¸": 665,
                        "ðŸ”¼": 666,
                        "ðŸ”½": 667,
                        "â†©ï¸": 668,
                        "â†ªï¸": 669,
                        â„¹ ï¸: 670,
                        "âª": 671,
                        "â©": 672,
                        "â«": 673,
                        "â¬": 674,
                        "â¤µï¸": 675,
                        "â¤´ï¸": 676,
                        "ðŸ†—": 677,
                        "ðŸ”€": 678,
                        "ðŸ”": 679,
                        "ðŸ”‚": 680,
                        "ðŸ†•": 681,
                        "ðŸ†™": 682,
                        "ðŸ†’": 683,
                        "ðŸ†“": 684,
                        "ðŸ†–": 685,
                        "ðŸ“¶": 686,
                        "ðŸŽ¦": 687,
                        "ðŸˆ": 688,
                        "ðŸˆ¯ï¸": 689,
                        "ðŸˆ³": 690,
                        "ðŸˆµ": 691,
                        "ðŸˆ´": 692,
                        "ðŸˆ²": 693,
                        "ðŸ‰": 694,
                        "ðŸˆ¹": 695,
                        "ðŸˆº": 696,
                        "ðŸˆ¶": 697,
                        "ðŸˆšï¸": 698,
                        "ðŸš»": 699,
                        "ðŸš¹": 700,
                        "ðŸšº": 701,
                        "ðŸš¼": 702,
                        "ðŸš¾": 703,
                        "ðŸš°": 704,
                        "ðŸš®": 705,
                        "ðŸ…¿ï¸": 706,
                        "â™¿ï¸": 707,
                        "ðŸš­": 708,
                        "ðŸˆ·": 709,
                        "ðŸˆ¸": 710,
                        "ðŸˆ‚": 711,
                        "â“‚ï¸": 712,
                        "ðŸ›‚": 713,
                        "ðŸ›„": 714,
                        "ðŸ›…": 715,
                        "ðŸ›ƒ": 716,
                        "ðŸ‰‘": 717,
                        "ãŠ™ï¸": 718,
                        "ãŠ—ï¸": 719,
                        "ðŸ†‘": 720,
                        "ðŸ†˜": 721,
                        "ðŸ†”": 722,
                        "ðŸš«": 723,
                        "ðŸ”ž": 724,
                        "ðŸ“µ": 725,
                        "ðŸš¯": 726,
                        "ðŸš±": 727,
                        "ðŸš³": 728,
                        "ðŸš·": 729,
                        "ðŸš¸": 730,
                        "â›”ï¸": 731,
                        "âœ³ï¸": 732,
                        "â‡ï¸": 733,
                        "âŽ": 734,
                        "âœ…": 735,
                        "âœ´ï¸": 736,
                        "ðŸ’Ÿ": 737,
                        "ðŸ†š": 738,
                        "ðŸ“³": 739,
                        "ðŸ“´": 740,
                        "ðŸ…°": 741,
                        "ðŸ…±": 742,
                        "ðŸ†Ž": 743,
                        "ðŸ…¾": 744,
                        "ðŸ’ ": 745,
                        "âž¿": 746,
                        "â™»ï¸": 747,
                        "â™ˆï¸": 748,
                        "â™‰ï¸": 749,
                        "â™Šï¸": 750,
                        "â™‹ï¸": 751,
                        "â™Œï¸": 752,
                        "â™ï¸": 753,
                        "â™Žï¸": 754,
                        "â™ï¸": 755,
                        "â™ï¸": 756,
                        "â™‘ï¸": 757,
                        "â™’ï¸": 758,
                        "â™“ï¸": 759,
                        "â›Ž": 760,
                        "ðŸ”¯": 761,
                        "ðŸ§": 762,
                        "ðŸ’¹": 763,
                        "ðŸ’²": 764,
                        "ðŸ’±": 765,
                        "Â©": 766,
                        "Â®": 767,
                        "â„¢": 768,
                        "âŒ": 769,
                        "â€¼ï¸": 770,
                        "â‰ï¸": 771,
                        "â—ï¸": 772,
                        "â“": 773,
                        "â•": 774,
                        "â”": 775,
                        "â­•ï¸": 776,
                        "ðŸ”": 777,
                        "ðŸ”š": 778,
                        "ðŸ”™": 779,
                        "ðŸ”›": 780,
                        "ðŸ”œ": 781,
                        "ðŸ”ƒ": 782,
                        "ðŸ•›": 783,
                        "ðŸ•§": 784,
                        "ðŸ•": 785,
                        "ðŸ•œ": 786,
                        "ðŸ•‘": 787,
                        "ðŸ•": 788,
                        "ðŸ•’": 789,
                        "ðŸ•ž": 790,
                        "ðŸ•“": 791,
                        "ðŸ•Ÿ": 792,
                        "ðŸ•”": 793,
                        "ðŸ• ": 794,
                        "ðŸ••": 795,
                        "ðŸ•–": 796,
                        "ðŸ•—": 797,
                        "ðŸ•˜": 798,
                        "ðŸ•™": 799,
                        "ðŸ•š": 800,
                        "ðŸ•¡": 801,
                        "ðŸ•¢": 802,
                        "ðŸ•£": 803,
                        "ðŸ•¤": 804,
                        "ðŸ•¥": 805,
                        "ðŸ•¦": 806,
                        "âœ–ï¸": 807,
                        "âž•": 808,
                        "âž–": 809,
                        "âž—": 810,
                        "â™ ï¸": 811,
                        "â™¥ï¸": 812,
                        "â™£ï¸": 813,
                        "â™¦ï¸": 814,
                        "ðŸ’®": 815,
                        "ðŸ’¯": 816,
                        "âœ”ï¸": 817,
                        "â˜‘ï¸": 818,
                        "ðŸ”˜": 819,
                        "ðŸ”—": 820,
                        "âž°": 821,
                        "ã€°": 822,
                        "ã€½ï¸": 823,
                        "ðŸ”±": 824,
                        "â—¼ï¸": 825,
                        "â—»ï¸": 826,
                        "â—¾ï¸": 827,
                        "â—½ï¸": 828,
                        "â–ªï¸": 829,
                        "â–«ï¸": 830,
                        "ðŸ”º": 831,
                        "ðŸ”²": 832,
                        "ðŸ”³": 833,
                        "âš«ï¸": 834,
                        "âšªï¸": 835,
                        "ðŸ”´": 836,
                        "ðŸ”µ": 837,
                        "ðŸ”»": 838,
                        "â¬œï¸": 839,
                        "â¬›ï¸": 840,
                        "ðŸ”¶": 841,
                        "ðŸ”·": 842,
                        "ðŸ”¸": 843,
                        "ðŸ”¹": 844,
                        "â˜º": 4,
                        "âœŒ": 110,
                        "â˜": 120,
                        "â¤": 172,
                        "â­": 293,
                        "â˜€": 294,
                        "â›…": 295,
                        "â˜": 296,
                        "âš¡": 297,
                        "â˜”": 298,
                        "â„": 299,
                        "â›„": 300,
                        "â˜Ž": 336,
                        "âŒ›": 352,
                        "âŒš": 354,
                        "âœ‰": 393,
                        "âœ‚": 417,
                        "âœ’": 420,
                        "âœ": 421,
                        "ðŸ€„": 454,
                        "âš½": 459,
                        "âš¾": 460,
                        "â›³": 465,
                        "â˜•": 476,
                        "â›ª": 546,
                        "â›º": 553,
                        "â›²": 565,
                        "â›µ": 568,
                        "âš“": 571,
                        "âœˆ": 573,
                        "âš ": 614,
                        "â›½": 617,
                        "â™¨": 620,
                        "â¬†": 650,
                        "â¬‡": 651,
                        "â¬…": 652,
                        "âž¡": 653,
                        "â†—": 657,
                        "â†–": 658,
                        "â†˜": 659,
                        "â†™": 660,
                        "â†”": 661,
                        "â†•": 662,
                        "â—€": 664,
                        "â–¶": 665,
                        "â†©": 668,
                        "â†ª": 669,
                        â„¹: 670,
                        "â¤µ": 675,
                        "â¤´": 676,
                        "ðŸˆ¯": 689,
                        "ðŸˆš": 698,
                        "ðŸ…¿": 706,
                        "â™¿": 707,
                        "â“‚": 712,
                        "ãŠ™": 718,
                        "ãŠ—": 719,
                        "â›”": 731,
                        "âœ³": 732,
                        "â‡": 733,
                        "âœ´": 736,
                        "â™»": 747,
                        "â™ˆ": 748,
                        "â™‰": 749,
                        "â™Š": 750,
                        "â™‹": 751,
                        "â™Œ": 752,
                        "â™": 753,
                        "â™Ž": 754,
                        "â™": 755,
                        "â™": 756,
                        "â™‘": 757,
                        "â™’": 758,
                        "â™“": 759,
                        "â€¼": 770,
                        "â‰": 771,
                        "â—": 772,
                        "â­•": 776,
                        "âœ–": 807,
                        "â™ ": 811,
                        "â™¥": 812,
                        "â™£": 813,
                        "â™¦": 814,
                        "âœ”": 817,
                        "â˜‘": 818,
                        "ã€½": 823,
                        "â—¼": 825,
                        "â—»": 826,
                        "â—¾": 827,
                        "â—½": 828,
                        "â–ª": 829,
                        "â–«": 830,
                        "âš«": 834,
                        "âšª": 835,
                        "â¬œ": 839,
                        "â¬›": 840
                    },
                    i = [];
                for (var o in e) i.push(o);
                var n = new RegExp("(" + i.join("|") + ")", "g");
                return i = null, t.replace(n, (function (t, i) {
                    return '<span class="vco-emoji emj' + e[i] + '"></span>'
                }))
            }(t)), t.match(/<p>[\s\S]*?<\/p>/) ? t : "<p>" + t + "</p>"
        }
        const E = function (t) {
                var e = {
                    w: 0,
                    h: 0
                };
                return t.w > t.h && t.h > 0 ? (e.h = t.h, e.w = t.h) : (e.w = t.w, e.h = t.w), e
            },
            O = function (t) {
                return null !== t.w && "" !== t.w ? Math.round(t.w / 16 * 9) : null !== t.h && "" !== t.h ? Math.round(t.h / 9 * 16) : 0
            };

        function z(t, e, i, o) {
            A.js(t, e, i, o)
        }

        function B(t, e, i, o) {
            A.css(t, e, i, o)
        }
        let A = new class {
            constructor(t) {
                this.doc = t, this.pending = {}, this.queue = {
                    css: [],
                    js: []
                }, this.styleSheets = t.styleSheets, this.env = this.getEnv(), this.head = this.doc.head || this.doc.getElementsByTagName("head")[0], this.pollCount = 0
            }
            createNode(t, e) {
                var i, o = this.doc.createElement(t);
                for (i in e) e.hasOwnProperty(i) && o.setAttribute(i, e[i]);
                return o
            }
            finish(t) {
                var e, i, o = this.pending[t];
                o && (e = o.callback, (i = o.urls).shift(), this.pollCount = 0, i.length || (e && e.call(o.context, o.obj), this.pending[t] = null, this.queue[t].length && this.load(t)))
            }
            getEnv() {
                var t = navigator.userAgent,
                    e = {
                        async: !0 === this.doc.createElement("script").async
                    };
                return (e.webkit = /AppleWebKit\//.test(t)) || (e.ie = /MSIE/.test(t)) || (e.opera = /Opera/.test(t)) || (e.gecko = /Gecko\//.test(t)) || (e.unknown = !0), e
            }
            load(t, e, i, o, n) {
                var s, a, r, h, l, c, d = function () {
                        this.finish(t)
                    }.bind(this),
                    p = "css" === t,
                    _ = [];
                if (e)
                    if (e = "string" == typeof e ? [e] : e.concat(), p || this.env.async || this.env.gecko || this.env.opera) this.queue[t].push({
                        urls: e,
                        callback: i,
                        obj: o,
                        context: n
                    });
                    else
                        for (s = 0, a = e.length; s < a; ++s) this.queue[t].push({
                            urls: [e[s]],
                            callback: s === a - 1 ? i : null,
                            obj: o,
                            context: n
                        });
                if (!this.pending[t] && (h = this.pending[t] = this.queue[t].shift())) {
                    for (s = 0, a = (l = h.urls).length; s < a; ++s) c = l[s], p ? r = this.env.gecko ? this.createNode("style") : this.createNode("link", {
                        href: c,
                        rel: "stylesheet"
                    }) : (r = this.createNode("script", {
                        src: c
                    })).async = !1, r.className = "lazyload", r.setAttribute("charset", "utf-8"), this.env.ie && !p ? r.onreadystatechange = function () {
                        /loaded|complete/.test(r.readyState) && (r.onreadystatechange = null, d())
                    } : p && (this.env.gecko || this.env.webkit) ? this.env.webkit ? (h.urls[s] = r.href, this.pollWebKit()) : (r.innerHTML = '@import "' + c + '";', this.pollGecko(r)) : r.onload = r.onerror = d, _.push(r);
                    for (s = 0, a = _.length; s < a; ++s) this.head.appendChild(_[s])
                }
            }
            pollGecko(t) {
                var e;
                try {
                    e = !!t.sheet.cssRules
                } catch (o) {
                    if (this.pollCount += 1, this.pollCount < 200) {
                        var i = this;
                        setTimeout((function () {
                            i.pollGecko(t)
                        }), 50)
                    } else e && this.finish("css");
                    return
                }
                this.finish("css")
            }
            pollWebKit() {
                var t, e = this.pending.css;
                if (e) {
                    for (t = this.styleSheets.length; --t >= 0;)
                        if (this.styleSheets[t].href === e.urls[0]) {
                            this.finish("css");
                            break
                        } this.pollCount += 1, e && (this.pollCount < 200 ? setTimeout(this.pollWebKit.bind(this), 50) : this.finish("css"))
                }
            }
            css(t, e, i, o) {
                this.load("css", t, e, i, o)
            }
            js(t, e, i, o) {
                this.load("js", t, e, i, o)
            }
        }(document);
        class I {
            static get(t) {
                return "string" == typeof t ? document.getElementById(t) : t
            }
            static getByClass(t) {
                if (t) return document.getElementsByClassName(t)
            }
            static create(t, e, i) {
                var o = document.createElement(t);
                return o.className = e, i && i.appendChild(o), o
            }
            static createText(t, e) {
                var i = document.createTextNode(t);
                return e && e.appendChild(i), i
            }
            static getTranslateString(t) {
                return I.TRANSLATE_OPEN + t.x + "px," + t.y + "px" + I.TRANSLATE_CLOSE
            }
            static setPosition(t, e) {
                t._vco_pos = e, Browser.webkit3d ? (t.style[I.TRANSFORM] = I.getTranslateString(e), Browser.android && (t.style["-webkit-perspective"] = "1000", t.style["-webkit-backface-visibility"] = "hidden")) : (t.style.left = e.x + "px", t.style.top = e.y + "px")
            }
            static getPosition(t) {
                for (var e = {
                        x: 0,
                        y: 0
                    }; t && !isNaN(t.offsetLeft) && !isNaN(t.offsetTop);) e.x += t.offsetLeft, e.y += t.offsetTop, t = t.offsetParent;
                return e
            }
            static testProp(t) {
                for (var e = document.documentElement.style, i = 0; i < t.length; i++)
                    if (t[i] in e) return t[i];
                return !1
            }
        }
        let N = [.42, 0, 1, 1];
        class U {
            KeySpline(t) {
                function e(t, e) {
                    return 1 - 3 * e + 3 * t
                }

                function i(t, e) {
                    return 3 * e - 6 * t
                }

                function o(t) {
                    return 3 * t
                }

                function n(t, n, s) {
                    return ((e(n, s) * t + i(n, s)) * t + o(n)) * t
                }

                function s(t, n, s) {
                    return 3 * e(n, s) * t * t + 2 * i(n, s) * t + o(n)
                }
                this.get = function (e) {
                    return t[0] == t[1] && t[2] == t[3] ? e : n(function (e) {
                        for (var i = e, o = 0; o < 4; ++o) {
                            var a = s(i, t[0], t[2]);
                            if (0 == a) return i;
                            i -= (n(i, t[0], t[2]) - e) / a
                        }
                        return i
                    }(e), t[1], t[3])
                }
            }
            easeInSpline(t) {
                return new U.KeySpline(N).get(t)
            }
            easeInOutExpo(t) {
                return new U.KeySpline(N).get(t)
            }
            easeOut(t) {
                return Math.sin(t * Math.PI / 2)
            }
            easeOutStrong(t) {
                return 1 == t ? 1 : 1 - Math.pow(2, -10 * t)
            }
            easeIn(t) {
                return t * t
            }
            easeInStrong(t) {
                return 0 == t ? 0 : Math.pow(2, 10 * (t - 1))
            }
            easeOutBounce(t) {
                return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
            }
            easeInBack(t) {
                var e = 1.70158;
                return t * t * ((e + 1) * t - e)
            }
            easeOutBack(t) {
                var e = 1.70158;
                return (t -= 1) * t * ((e + 1) * t + e) + 1
            }
            bounce(t) {
                return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
            }
            bouncePast(t) {
                return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 2 - (7.5625 * (t -= 1.5 / 2.75) * t + .75) : t < 2.5 / 2.75 ? 2 - (7.5625 * (t -= 2.25 / 2.75) * t + .9375) : 2 - (7.5625 * (t -= 2.625 / 2.75) * t + .984375)
            }
            swingTo(t) {
                var e = 1.70158;
                return (t -= 1) * t * ((e + 1) * t + e) + 1
            }
            swingFrom(t) {
                var e = 1.70158;
                return t * t * ((e + 1) * t - e)
            }
            elastic(t) {
                return -1 * Math.pow(4, -8 * t) * Math.sin((6 * t - 1) * (2 * Math.PI) / 2) + 1
            }
            spring(t) {
                return 1 - Math.cos(4.5 * t * Math.PI) * Math.exp(6 * -t)
            }
            blink(t, e) {
                return Math.round(t * (e || 5)) % 2
            }
            pulse(t, e) {
                return -Math.cos(t * ((e || 5) - .5) * 2 * Math.PI) / 2 + .5
            }
            wobble(t) {
                return -Math.cos(t * Math.PI * (9 * t)) / 2 + .5
            }
            sinusoidal(t) {
                return -Math.cos(t * Math.PI) / 2 + .5
            }
            flicker(t) {
                t += (Math.random() - .5) / 5;
                return easings.sinusoidal(t < 0 ? 0 : t > 1 ? 1 : t)
            }
            mirror(t) {
                return t < .5 ? easings.sinusoidal(2 * t) : easings.sinusoidal(1 - 2 * (t - .5))
            }
            easeInQuad(t) {
                return t * t
            }
            easeOutQuad(t) {
                return t * (2 - t)
            }
            easeInOutQuad(t) {
                return t < .5 ? 2 * t * t : (4 - 2 * t) * t - 1
            }
            easeInCubic(t) {
                return t * t * t
            }
            easeOutCubic(t) {
                return --t * t * t + 1
            }
            easeInOutCubic(t) {
                return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
            }
            easeInQuart(t) {
                return t * t * t * t
            }
            easeOutQuart(t) {
                return 1 - --t * t * t * t
            }
            easeInOutQuart(t) {
                return t < .5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t
            }
            easeInQuint(t) {
                return t * t * t * t * t
            }
            easeOutQuint(t) {
                return 1 + --t * t * t * t * t
            }
            easeInOutQuint(t) {
                return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t
            }
        }
        let Z = i(194);
        var R = {};

        function j(t) {
            return R = function (t) {
                var e = i(329)(`./${t}.json`);
                for (let t in Z) e[t] ? "object" == typeof Z[t] && (e[t] = Object.assign(Z[t], e[t])) : e[t] = Z[t];
                return e
            }(t)
        }
        class W {
            on(t, e, i) {
                var o = this._vco_events = this._vco_events || {};
                return o[t] = o[t] || [], o[t].push({
                    action: e,
                    context: i || this
                }), this
            }
            hasEventListeners(t) {
                var e = "_vco_events";
                return e in this && t in this[e] && this[e][t].length > 0
            }
            off(t, e, i) {
                if (!this.hasEventListeners(t)) return this;
                for (var o = 0, n = this._vco_events, s = n[t].length; o < s; o++)
                    if (n[t][o].action === e && (!i || n[t][o].context === i)) return n[t].splice(o, 1), this;
                return this
            }
            fire(t, e) {
                if (!this.hasEventListeners(t)) return this;
                for (var i = k({
                        type: t,
                        target: this
                    }, e), o = this._vco_events[t].slice(), n = 0, s = o.length; n < s; n++) o[n].action.call(o[n].context || this, i);
                return this
            }
        }
        i(243);
        class F {
            show(t) {
                t || (this._el.container.style.display = "block")
            }
            hide(t) {
                this._el.container.style.display = "none"
            }
            addTo(t) {
                t.appendChild(this._el.container), this.onAdd()
            }
            removeFrom(t) {
                t.removeChild(this._el.container), this.onRemove()
            }
            animatePosition(t, e, i) {
                var o = {
                    duration: this.options.duration,
                    easing: this.options.ease
                };
                for (var n in t) t.hasOwnProperty(n) && (o[n] = i ? t[n] + "%" : t[n] + "px");
                this.animator && this.animator.stop(), this.animator = VCO.Animate(e, o)
            }
            onLoaded() {
                this.fire("loaded", this.data)
            }
            onAdd() {
                this.fire("added", this.data)
            }
            onRemove() {
                this.fire("removed", this.data)
            }
            setPosition(t, e) {
                for (var i in t) t.hasOwnProperty(i) && (e ? e.style[i] = t[i] + "px" : this._el.container.style[i] = t[i] + "px")
            }
            getPosition() {
                return VCO.Dom.getPosition(this._el.container)
            }
        }
        class H {
            constructor(t, e, i) {
                this._el = {
                    container: {},
                    map: {},
                    map_mask: {}
                }, this._el.container = "object" == typeof t ? t : I.get(t), this._loaded = {
                    data: !1,
                    map: !1
                }, this._map = null, this._mini_map = null, this._markers = [], this.zoom_min_max = {
                    min: null,
                    max: null
                }, this._line = null, this._line_active = null, this.current_marker = 0, this.bounds_array = null, this._tile_layer = null, this._tile_layer_mini = null, this._image_layer = null, this.data = {
                    uniqueid: "",
                    slides: [{
                        test: "yes"
                    }, {
                        test: "yes"
                    }, {
                        test: "yes"
                    }]
                }, this.options = {
                    map_type: "stamen:toner-lite",
                    map_as_image: !1,
                    map_mini: !1,
                    map_background_color: "#d9d9d9",
                    map_subdomains: "",
                    map_access_token: "",
                    zoomify: {
                        path: "",
                        width: "",
                        height: "",
                        tolerance: .8,
                        attribution: ""
                    },
                    skinny_size: 650,
                    less_bounce: !0,
                    path_gfx: "gfx",
                    start_at_slide: 0,
                    map_popup: !1,
                    zoom_distance: 100,
                    calculate_zoom: !0,
                    line_follows_path: !0,
                    line_color: "#333",
                    line_color_inactive: "#000",
                    line_weight: 5,
                    line_opacity: .2,
                    line_dash: "5,5",
                    line_join: "miter",
                    show_lines: !0,
                    show_history_line: !0,
                    map_center_offset: null
                }, this.animator = null, this.timer = null, this.touch_scale = 1, this.scroll = {
                    start_time: null
                }, T(this.options, i), T(this.data, e), this._initLayout(), this._initEvents(), this._createMap(), this._initData()
            }
            updateDisplay(t, e, i, o, n) {
                this._updateDisplay(t, e, i, o, n)
            }
            goTo(t, e) {
                if (t < this._markers.length && t >= 0) {
                    var i = 0,
                        o = this.current_marker;
                    this.current_marker = t;
                    var n = this._markers[this.current_marker];
                    if (this.animator && this.animator.stop(), this._resetMarkersActive(), n.data.type && "overview" == n.data.type) this._markerOverview(), e || this._onMarkerChange();
                    else if (n.active(!0), e) n.data.location && this._viewTo(n.data.location);
                    else {
                        if (n.data.location && n.data.location.lat)
                            if (i = this._calculateZoomChange(this._getMapCenter(!0), n.location()), this._viewTo(n.data.location, {
                                    calculate_zoom: this.options.calculate_zoom,
                                    zoom: i
                                }), this.options.line_follows_path) {
                                if (this.options.show_history_line && n.data.real_marker && this._markers[o].data.real_marker) {
                                    var s, a = [],
                                        r = o;
                                    if (r < this.current_marker)
                                        for (; r < this.current_marker;) this._markers[r].data.location && this._markers[r].data.location.lat && (s = {
                                            lat: this._markers[r].data.location.lat,
                                            lon: this._markers[r].data.location.lon
                                        }, a.push(s)), r++;
                                    else if (r > this.current_marker)
                                        for (; r > this.current_marker;) this._markers[r].data.location && this._markers[r].data.location.lat && (s = {
                                            lat: this._markers[r].data.location.lat,
                                            lon: this._markers[r].data.location.lon
                                        }, a.push(s)), r--;
                                    a.push({
                                        lat: n.data.location.lat,
                                        lon: n.data.location.lon
                                    }), this._replaceLines(this._line_active, a)
                                }
                            } else this.options.show_history_line && n.data.real_marker && this._markers[o].data.real_marker && this._replaceLines(this._line_active, [{
                                lat: n.data.location.lat,
                                lon: n.data.location.lon
                            }, {
                                lat: this._markers[o].data.location.lat,
                                lon: this._markers[o].data.location.lon
                            }]);
                        else this._markerOverview(), e || this._onMarkerChange();
                        this._onMarkerChange()
                    }
                }
            }
            panTo(t, e) {
                this._panTo(t, e)
            }
            zoomTo(t, e) {
                this._zoomTo(t, e)
            }
            viewTo(t, e) {
                this._viewTo(t, e)
            }
            getBoundsZoom(t, e, i, o) {
                this.__getBoundsZoom(t, e, i, o)
            }
            markerOverview() {
                this._markerOverview()
            }
            calculateMarkerZooms() {
                this._calculateMarkerZooms()
            }
            createMiniMap() {
                this._createMiniMap()
            }
            setMapOffset(t, e) {
                this.options.map_center_offset.left = t, this.options.map_center_offset.top = e
            }
            calculateMinMaxZoom() {
                for (var t = 0; t < this._markers.length; t++) this._markers[t].data.location && this._markers[t].data.location.zoom && this.updateMinMaxZoom(this._markers[t].data.location.zoom)
            }
            updateMinMaxZoom(t) {
                this.zoom_min_max.max || (this.zoom_min_max.max = t), this.zoom_min_max.min || (this.zoom_min_max.min = t), this.zoom_min_max.max < t && (this.zoom_min_max.max = t), this.zoom_min_max.min > t && (this.zoom_min_max.min = t)
            }
            initialMapLocation() {
                this._loaded.data && this._loaded.map && (this.goTo(this.options.start_at_slide, !0), this._initialMapLocation())
            }
            show() {}
            hide() {}
            addTo(t) {
                t.appendChild(this._el.container), this.onAdd()
            }
            removeFrom(t) {
                t.removeChild(this._el.container), this.onRemove()
            }
            createMarkers(t) {
                this._createMarkers(t)
            }
            createMarker(t) {
                this._createMarker(t)
            }
            _destroyMarker(t) {
                this._removeMarker(t);
                for (var e = 0; e < this._markers.length; e++) this._markers[e] == t && this._markers.splice(e, 1);
                this.fire("markerRemoved", t)
            }
            _createMarkers(t) {
                for (var e = 0; e < t.length; e++) this._createMarker(t[e]), t[e].location && t[e].location.lat && this.options.show_lines && this._addToLine(this._line, t[e])
            }
            _createLines(t) {}
            _createMap() {}
            _createMiniMap() {}
            _createMarker(t) {
                var e = {};
                e.on("markerclick", this._onMarkerClick), this._addMarker(e), this._markers.push(e), e.marker_number = this._markers.length - 1, this.fire("markerAdded", e)
            }
            _addMarker(t) {}
            _removeMarker(t) {}
            _resetMarkersActive() {
                for (var t = 0; t < this._markers.length; t++) this._markers[t].active(!1)
            }
            _calculateMarkerZooms() {}
            _createLine(t) {
                return {
                    data: t
                }
            }
            _addToLine(t, e) {}
            _replaceLines(t, e) {}
            _addLineToMap(t) {}
            _panTo(t, e) {}
            _zoomTo(t, e) {}
            _viewTo(t, e) {}
            _updateMapDisplay(t, e) {}
            _refreshMap() {}
            _getMapLocation(t) {
                return {
                    x: 0,
                    y: 0
                }
            }
            _getMapZoom() {
                return 1
            }
            _getMapCenter() {
                return {
                    lat: 0,
                    lng: 0
                }
            }
            _getBoundsZoom(t, e, i, o) {}
            _markerOverview() {}
            _initialMapLocation() {}
            _onMarkerChange(t) {
                this.fire("change", {
                    current_marker: this.current_marker
                })
            }
            _onMarkerClick(t) {
                this.current_marker != t.marker_number && this.goTo(t.marker_number)
            }
            _onMapLoaded(t) {
                this._loaded.map = !0, this.options.calculate_zoom && this.calculateMarkerZooms(), this.calculateMinMaxZoom(), this.options.map_mini && !x && this.createMiniMap(), this.initialMapLocation(), this.fire("loaded", this.data)
            }
            _onWheel(t) {
                var e = this;
                if (t.ctrlKey) {
                    var i = Math.exp(-t.deltaY / 100);
                    this.touch_scale *= i, t.preventDefault(), t.stopPropagation(t)
                }
                this.scroll.start_time || (this.scroll.start_time = +new Date);
                var o = Math.max(40 - (+new Date - this.scroll.start_time), 0);
                clearTimeout(this.scroll.timer), this.scroll.timer = setTimeout((function () {
                    e._scollZoom()
                }), o)
            }
            _scollZoom(t) {
                var e = this,
                    i = this._getMapZoom();
                this.scroll.start_time = null, clearTimeout(this.scroll.timer), clearTimeout(this.scroll.timer_done), this.scroll.timer_done = setTimeout((function () {
                    e._scollZoomDone()
                }), 1e3), this.zoomTo(Math.round(i * this.touch_scale))
            }
            _scollZoomDone(t) {
                this.touch_scale = 1
            }
            _calculateZoomChange(t, e, i) {
                return this._getBoundsZoom(t, e, i)
            }
            _updateDisplay(t, e, i, o) {
                this._updateMapDisplay(i, o)
            }
            _initLayout() {
                this._el.map_mask = I.create("div", "vco-map-mask", this._el.container), this.options.map_as_image ? this._el.map = I.create("div", "vco-map-display vco-mapimage-display", this._el.map_mask) : this._el.map = I.create("div", "vco-map-display", this._el.map_mask)
            }
            _initData() {
                this.data.slides && (this._createMarkers(this.data.slides), this._resetMarkersActive(), this._markers[this.current_marker].active(!0), this._loaded.data = !0, this._initialMapLocation())
            }
            _initEvents() {
                var t = this;
                this._el.map.addEventListener("wheel", (function (e) {
                    t._onWheel(e)
                }))
            }
        }
        P(H, W, F);
        let V = {
            continuousWorld: !0,
            tolerance: .8
        };
        class G extends L.TileLayer {
            constructor(t, e = V) {
                super(t, e), e = L.setOptions(this, e), this._url = t, e.width || (e.width = 600), e.height || (e.width = 600);
                var i = L.point(e.width, e.height),
                    o = e.tileSize;
                for (this._imageSize = [i], this._gridSize = [this._getGridSize(i)]; i.x > o || i.y > o;) i = i.divideBy(2).floor(), this._imageSize.push(i), this._gridSize.push(this._getGridSize(i));
                this._imageSize.reverse(), this._gridSize.reverse(), this.options.maxZoom = this._gridSize.length - 1
            }
            onAdd(t) {
                L.TileLayer.prototype.onAdd.call(this, t);
                var e = t.getSize(),
                    i = this._getBestFitZoom(e),
                    o = this._imageSize[i],
                    n = o.x ? o.x : 0,
                    s = o.y ? o.y : 0;
                t.options.crs.pointToLatLng(L.point(n / 2, s / 2), i)
            }
            getZoomifyBounds(t) {
                var e = this._imageSize[0],
                    i = t.options.crs.pointToLatLng(L.point(0, 0), 0),
                    o = t.options.crs.pointToLatLng(L.point(e.x, e.y), 0);
                return L.latLngBounds(i, o)
            }
            getCenterZoom(t) {
                var e = t.getSize(),
                    i = this._getBestFitZoom(e),
                    o = this._imageSize[i],
                    n = o.x ? o.x : 0,
                    s = o.y ? o.y : 0,
                    a = t.options.crs.pointToLatLng(L.point(n / 2, s / 2), i);
                return {
                    center: a,
                    lat: a.lat,
                    lon: a.lng,
                    zoom: i
                }
            }
            _getGridSize(t) {
                var e = this.options.tileSize,
                    i = t.x ? t.x : 0,
                    o = t.y ? t.y : 0;
                return L.point(Math.ceil(i / e), Math.ceil(o / e))
            }
            _getBestFitZoom(t) {
                for (var e, i = this.options.tolerance, o = this._imageSize.length - 1; o;) {
                    if ((e = this._imageSize[o]).x * i < t.x && e.y * i < t.y) return o;
                    o--
                }
                return o
            }
            _tileShouldBeLoaded(t) {
                var e = this._gridSize[this._map.getZoom()];
                return e ? t.x >= 0 && t.x < e.x && t.y >= 0 && t.y < e.y : (console.log("_tileShouldBeLoaded: No gridSize for " + this._map.getZoom()), !1)
            }
            _addTile(t, e) {
                var i = this._getTilePos(t),
                    o = this._getTile(),
                    n = this._map.getZoom(),
                    s = this._imageSize[n],
                    a = this._gridSize[n],
                    r = this.options.tileSize;
                t.x === a.x - 1 && (o.style.width = s.x - r * (a.x - 1) + "px"), t.y === a.y - 1 && (o.style.height = s.y - r * (a.y - 1) + "px"), L.DomUtil.setPosition(o, i, L.Browser.chrome || L.Browser.android23), this._tiles[t.x + ":" + t.y] = o, this._loadTile(o, t), o.parentNode !== this._tileContainer && e.appendChild(o)
            }
            getTileUrl(t) {
                return this._url + "TileGroup" + this._getTileGroup(t) + "/" + this._map.getZoom() + "-" + t.x + "-" + t.y + ".jpg"
            }
            _getTileGroup(t) {
                var e, i = this._map.getZoom(),
                    o = 0;
                for (let t = 0; t < i; t++) o += (e = this._gridSize[t]).x * e.y;
                return o += t.y * this._gridSize[i].x + t.x, Math.floor(o / 256)
            }
        }
        const q = {
            position: "bottomright",
            toggleDisplay: !1,
            zoomLevelOffset: -5,
            zoomLevelFixed: !1,
            zoomAnimation: !1,
            autoToggleDisplay: !1,
            show_view: !0,
            width: 150,
            height: 150,
            aimingRectOptions: {
                color: "#c34528",
                weight: 1,
                clickable: !1,
                stroke: !0
            },
            shadowRectOptions: {
                color: "#000000",
                weight: 1,
                clickable: !1,
                opacity: 0,
                fillOpacity: 0
            }
        };
        class J extends L.Control {
            constructor(t, e) {
                let i = Object.assign({}, q, e);
                super(t, i), L.Util.setOptions(this, i), this.hideText = "Hide MiniMap", this.showText = "Show MiniMap", this.options.aimingRectOptions.clickable = !1, this.options.shadowRectOptions.clickable = !1, this._layer = t
            }
            onAdd(t) {
                return this._mainMap = t, this._container = L.DomUtil.create("div", "leaflet-control-minimap"), this._container.style.width = this.options.width + "px", this._container.style.height = this.options.height + "px", L.DomEvent.disableClickPropagation(this._container), L.DomEvent.on(this._container, "mousewheel", L.DomEvent.stopPropagation), this._miniMap = new L.Map(this._container, {
                    attributionControl: !1,
                    zoomControl: !1,
                    zoomAnimation: this.options.zoomAnimation,
                    autoToggleDisplay: this.options.autoToggleDisplay,
                    touchZoom: !1,
                    scrollWheelZoom: !1,
                    doubleClickZoom: !1,
                    boxZoom: !1,
                    dragging: !1,
                    crs: t.options.crs
                }), this._miniMap.addLayer(this._layer), this._mainMapMoving = !1, this._miniMapMoving = !1, this._userToggledDisplay = !1, this._minimized = !1, this.options.toggleDisplay && this._addToggleButton(), this._miniMap.whenReady(L.Util.bind((function () {
                    this._aimingRect = L.rectangle(this._mainMap.getBounds(), this.options.aimingRectOptions).addTo(this._miniMap), this._shadowRect = L.rectangle(this._mainMap.getBounds(), this.options.shadowRectOptions).addTo(this._miniMap), this._locationCircle = L.circleMarker(this._mainMap.getCenter(), {
                        fillColor: "#c34528",
                        color: "#FFFFFF",
                        weight: 2,
                        radius: 10,
                        fill: !0,
                        fillOpacity: 1,
                        stroke: !0,
                        clickable: !1
                    }).addTo(this._miniMap), this._locationCircle.setRadius(5), this._mainMap.on("moveend", this._onMainMapMoved, this), this._mainMap.on("move", this._onMainMapMoving, this), this.options.bounds_array && this._miniMap.fitBounds(this.options.bounds_array, {
                        padding: [15, 15]
                    })
                }), this)), this._container
            }
            minimize(t) {
                this._minimized || this._minimize()
            }
            restore() {
                this._minimized && (this._restore(), this._miniMap.fitBounds(this.options.bounds_array, {
                    padding: [15, 15]
                }))
            }
            addTo(t) {
                return L.Control.prototype.addTo.call(this, t), this._miniMap.setView(this._mainMap.getCenter(), this._decideZoom(!0)), this._setDisplay(this._decideMinimized()), this
            }
            onRemove(t) {
                this._mainMap.off("moveend", this._onMainMapMoved, this), this._mainMap.off("move", this._onMainMapMoving, this), this._miniMap.off("moveend", this._onMiniMapMoved, this), this._miniMap.removeLayer(this._layer)
            }
            _addToggleButton() {
                this._toggleDisplayButton = this.options.toggleDisplay ? this._createButton("", this.hideText, "leaflet-control-minimap-toggle-display", this._container, this._toggleDisplayButtonClicked, this) : void 0
            }
            _createButton(t, e, i, o, n, s) {
                var a = L.DomUtil.create("a", i, o);
                a.innerHTML = t, a.href = "#", a.title = e;
                var r = L.DomEvent.stopPropagation;
                return L.DomEvent.on(a, "click", r).on(a, "mousedown", r).on(a, "dblclick", r).on(a, "click", L.DomEvent.preventDefault).on(a, "click", n, s), a
            }
            _toggleDisplayButtonClicked() {
                this._userToggledDisplay = !0, this._minimized ? (this._restore(), this._toggleDisplayButton.title = this.hideText) : (this._minimize(), this._toggleDisplayButton.title = this.showText)
            }
            _setDisplay(t) {
                t != this._minimized && (this._minimized ? this._restore() : this._minimize())
            }
            _minimize() {
                this._container.style.width = "0px", this._container.style.height = "0px", this._container.style.border = "0", this._minimized = !0
            }
            _restore() {
                this._container.style.width = this.options.width + "px", this._container.style.height = this.options.height + "px", this._container.style.border = "2px solid #b3b3b3", this._minimized = !1
            }
            _onMainMapMoved(t) {
                if (this._miniMapMoving) this._miniMapMoving = !1;
                else {
                    this._decideZoom(!0);
                    this._mainMapMoving = !0, this._setDisplay(this._decideMinimized())
                }
                this.options.show_view && this._aimingRect.setBounds(this._mainMap.getBounds()), this._locationCircle.setLatLng(this._mainMap.getCenter())
            }
            _onMainMapMoving(t) {
                this.options.show_view && this._aimingRect.setBounds(this._mainMap.getBounds()), this._locationCircle.setLatLng(this._mainMap.getCenter())
            }
            _onMiniMapMoveStarted(t) {
                var e = this._aimingRect.getBounds(),
                    i = this._miniMap.latLngToContainerPoint(e.getSouthWest()),
                    o = this._miniMap.latLngToContainerPoint(e.getNorthEast());
                this._lastAimingRectPosition = {
                    sw: i,
                    ne: o
                }
            }
            _onMiniMapMoving(t) {
                !this._mainMapMoving && this._lastAimingRectPosition && (this._shadowRect.setBounds(new L.LatLngBounds(this._miniMap.containerPointToLatLng(this._lastAimingRectPosition.sw), this._miniMap.containerPointToLatLng(this._lastAimingRectPosition.ne))), this._shadowRect.setStyle({
                    opacity: 1,
                    fillOpacity: .3
                }))
            }
            _onMiniMapMoved(t) {
                this._mainMapMoving ? this._mainMapMoving = !1 : (this._miniMapMoving = !0, this._mainMap.setView(this._miniMap.getCenter(), this._decideZoom(!1)), this._shadowRect.setStyle({
                    opacity: 0,
                    fillOpacity: 0
                }))
            }
            _decideZoom(t) {
                if (this.options.zoomLevelFixed || 0 == this.options.zoomLevelFixed) return t ? this.options.zoomLevelFixed : this._mainMap.getZoom();
                if (t) return this._mainMap.getZoom() + this.options.zoomLevelOffset;
                var e, i = this._miniMap.getZoom() - this._mainMap.getZoom(),
                    o = this._miniMap.getZoom() - this.options.zoomLevelOffset;
                return i > this.options.zoomLevelOffset && this._mainMap.getZoom() < this._miniMap.getMinZoom() - this.options.zoomLevelOffset ? this._miniMap.getZoom() > this._lastMiniMapZoom ? (e = this._mainMap.getZoom() + 1, this._miniMap.setZoom(this._miniMap.getZoom() - 1)) : e = this._mainMap.getZoom() : e = o, this._lastMiniMapZoom = this._miniMap.getZoom(), e
            }
            _decideMinimized() {
                return this._userToggledDisplay ? this._minimized : this.options.autoToggleDisplay ? !!this._mainMap.getBounds().contains(this._miniMap.getBounds()) : this._minimized
            }
        }
        L.Map.mergeOptions({
            miniMapControl: !1
        }), L.Map.addInitHook((function () {
            this.options.miniMapControl && (this.miniMapControl = (new L.Control.MiniMap).addTo(this))
        })), L.control.minimap = function (t) {
            return new L.Control.MiniMap(t)
        };
        class K {
            constructor(t, e) {
                this._el = {
                    container: {},
                    content_container: {},
                    content: {}
                }, this._marker = {}, this._icon = {}, this._custom_icon = !1, this._custom_icon_url = "", this._custom_image_icon = !1, this.marker_number = 0, this.media_icon_class = "", this.timer = {}, this.data = {}, this.options = {
                    duration: 1e3,
                    ease: U.easeInSpline,
                    width: 600,
                    height: 600,
                    map_popup: !1
                }, this.animator = null, T(this.options, e), T(this.data, t), this._initLayout()
            }
            show() {}
            hide() {}
            addTo(t) {
                this._addTo(t)
            }
            removeFrom(t) {
                this._removeFrom(t)
            }
            updateDisplay(t, e, i) {
                this._updateDisplay(t, e, i)
            }
            createMarker(t, e) {
                this._createMarker(t, e)
            }
            createPopup(t, e) {
                this._createPopup(t, e)
            }
            active(t) {
                this._active(t)
            }
            location() {
                return this._location()
            }
            _createMarker(t, e) {}
            _addTo(t) {}
            _removeFrom(t) {}
            _createPopup(t, e) {}
            _active(t) {}
            _location() {
                return {
                    lat: 0,
                    lng: 0
                }
            }
            _onMarkerClick(t) {
                this.fire("markerclick", {
                    marker_number: this.marker_number
                })
            }
            _initLayout() {
                this._createMarker(this.data, this.options)
            }
            _updateDisplay(t, e, i) {}
        }
        P(K, W);
        class Y extends K {
            _createMarker(t, e) {
                if (t.location && "number" == typeof t.location.lat && "number" == typeof t.location.lon) {
                    this.data.real_marker = !0;
                    var i = e.use_custom_markers || t.location.use_custom_marker;
                    i && t.location.icon ? (this._custom_icon = {
                        url: t.location.icon,
                        size: t.location.iconSize || [48, 48],
                        anchor: this._customIconAnchor(t.location.iconSize)
                    }, this._icon = this._createIcon()) : i && t.location.image ? (this._custom_image_icon = t.location.image, this._icon = this._createImage()) : this._icon = this._createDefaultIcon(!1), this._marker = new L.marker([t.location.lat, t.location.lon], {
                        title: t.text.headline,
                        icon: this._icon
                    }), this._marker.on("click", this._onMarkerClick, this), e.map_popup && this._createPopup(t, e)
                }
            }
            _addTo(t) {
                this.data.real_marker && this._marker.addTo(t)
            }
            _createPopup(t, e) {}
            _active(t) {
                this.data.media && this.data.media.mediatype ? this.media_icon_class = "vco-mapmarker-icon vco-icon-" + this.data.media.mediatype.type : this.media_icon_class = "vco-mapmarker-icon vco-icon-plaintext", this.data.real_marker && (t ? this._marker.setZIndexOffset(100) : (clearTimeout(this.timer), this._marker.setZIndexOffset(0)), this._custom_icon ? this._icon = this._createIcon() : this._custom_image_icon ? this._icon = this._createImage(t) : this._icon = this._createDefaultIcon(t), this._setIcon())
            }
            _createIcon() {
                return new L.icon({
                    iconUrl: this._custom_icon.url,
                    iconSize: this._custom_icon.size,
                    iconAnchor: this._custom_icon.anchor
                })
            }
            _createImage(t) {
                var e = t ? "vco-mapmarker-image-icon-active" : "vco-mapmarker-image-icon";
                return new L.icon({
                    iconUrl: url,
                    iconSize: [48],
                    iconAnchor: [24, 48],
                    shadowSize: [68, 95],
                    shadowAnchor: [22, 94],
                    className: e
                })
            }
            _createDefaultIcon(t) {
                var e = t ? "vco-mapmarker-active" : "vco-mapmarker";
                return L.divIcon({
                    className: e + " " + this.media_icon_class,
                    iconAnchor: [10, 10]
                })
            }
            _customIconAnchor(t) {
                return t ? [.5 * t[0], t[1]] : [24, 48]
            }
            _openPopup() {
                this._marker.openPopup()
            }
            _setIcon() {
                this._marker.setIcon(this._icon)
            }
            _location() {
                return this.data.real_marker ? this._marker.getLatLng() : {}
            }
        }
        let X = "a b c d".split(" ");

        function $(t, e, i, o) {
            return {
                url: ["//stamen-tiles-{S}.a.ssl.fastly.net/", t, "/{Z}/{X}/{Y}.", e].join(""),
                type: e,
                subdomains: X.slice(),
                minZoom: i,
                maxZoom: o,
                attribution: ["<a href='http://leafletjs.com' title='A JS library for interactive maps'>Leaflet</a> | ", 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, ', 'under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. ', 'Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, ', 'under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'].join("")
            }
        }
        let Q = {
            toner: $("toner", "png", 0, 20),
            terrain: $("terrain", "jpg", 4, 18),
            watercolor: $("watercolor", "jpg", 0, 16),
            "trees-cabs-crime": {
                url: "http://{S}.tiles.mapbox.com/v3/stamen.trees-cabs-crime/{Z}/{X}/{Y}.png",
                type: "png",
                subdomains: "a b c d".split(" "),
                minZoom: 11,
                maxZoom: 18,
                extent: [{
                    lat: 37.853,
                    lon: -122.577
                }, {
                    lat: 37.684,
                    lon: -122.313
                }],
                attribution: ['Design by Shawn Allen at <a href="http://stamen.com">Stamen</a>.', 'Data courtesy of <a href="http://fuf.net">FuF</a>,', '<a href="http://www.yellowcabsf.com">Yellow Cab</a>', '&amp; <a href="http://sf-police.org">SFPD</a>.'].join(" ")
            }
        };

        function tt(t, e, i) {
            for (var o = et(t), n = 0; n < e.length; n++) {
                var s = [t, e[n]].join("-");
                Q[s] = $(s, i || o.type, o.minZoom, o.maxZoom)
            }
        }

        function et(t) {
            if (t in Q) return Q[t];
            throw "No such provider (" + t + ")"
        }
        tt("toner", ["hybrid", "labels", "lines", "background", "lite"]), tt("toner", ["2010"]), tt("toner", ["2011", "2011-lines", "2011-labels", "2011-lite"]), tt("terrain", ["background"]), tt("terrain", ["labels", "lines"], "png");
        class it extends L.TileLayer {
            constructor(t, e) {
                super(t, e);
                var i = et(t),
                    o = i.url.replace(/({[A-Z]})/g, (function (t) {
                        return t.toLowerCase()
                    })),
                    n = {
                        minZoom: i.minZoom,
                        maxZoom: i.maxZoom,
                        subdomains: i.subdomains,
                        scheme: "xyz",
                        attribution: i.attribution
                    };
                e && T(n, e), L.TileLayer.prototype.initialize.call(this, o, n)
            }
        }
        class ot extends H {
            _createMap() {
                this._map = new L.map(this._el.map, {
                    scrollWheelZoom: !1,
                    zoomControl: !this.options.map_mini
                }), this._map.on("load", this._onMapLoaded, this), this._map.on("moveend", this._onMapMoveEnd, this), this._map.attributionControl.setPrefix("<a href='http://storymap.knightlab.com/' target='_blank' class='vco-knightlab-brand'><span>&#x25a0;</span> StoryMapJS</a>");
                this.options.map_type.split(":");
                this._tile_layer = this._createTileLayer(this.options.map_type), this._tile_layer.on("load", this._onTilesLoaded, this), this._map.addLayer(this._tile_layer), this._image_layer && this._map.addLayer(this._image_layer), this._line = this._createLine(this._line), this._line.setStyle({
                    color: this.options.line_color_inactive
                }), this._addLineToMap(this._line), this._line_active = this._createLine(this._line_active), this._line_active.setStyle({
                    opacity: 1
                }), this._addLineToMap(this._line_active), this.options.map_as_image && (this._line_active.setStyle({
                    opacity: 0
                }), this._line.setStyle({
                    opacity: 0
                }))
            }
            _createMiniMap() {
                this.options.map_as_image && (this.zoom_min_max.min = 0), this.bounds_array || (this.bounds_array = this._getAllMarkersBounds(this._markers)), this._tile_layer_mini = this._createTileLayer(this.options.map_type), this._mini_map = new J(this._tile_layer_mini, {
                    width: 150,
                    height: 100,
                    position: "topleft",
                    bounds_array: this.bounds_array,
                    zoomLevelFixed: this.zoom_min_max.min,
                    zoomAnimation: !0,
                    aimingRectOptions: {
                        fillColor: "#FFFFFF",
                        color: "#FFFFFF",
                        opacity: .4,
                        weight: 1,
                        stroke: !0
                    }
                }).addTo(this._map), this._mini_map.getContainer().style.backgroundColor = this.options.map_background_color
            }
            _createBackgroundMap(t) {
                if (this._image_layer ? this._image_layer.clearLayers() : (this._image_layer = new L.layerGroup, this._map.addLayer(this._image_layer)), t)
                    for (let s in t) {
                        var e, i = t[s],
                            o = {
                                x: 0,
                                y: 0,
                                url: i.src,
                                height: parseInt(i.style.height.split("px")[0]),
                                width: parseInt(i.style.width.split("px")[0]),
                                pos: {
                                    start: 0,
                                    end: 0
                                }
                            };
                        if (i.style.left || i.style.top) i.style.left && (o.x = parseInt(i.style.left.split("px")[0])), i.style.top && (o.y = parseInt(i.style.top.split("px")[0]));
                        else if (i.style["-webkit-transform"] || i.style.transform || i.style["-ms-transform"]) {
                            var n;
                            i.style["-webkit-transform"] ? n = i.style["-webkit-transform"].split("3d(")[1].split(", 0)")[0].split(", ") : i.style.transform ? n = i.style.transform.split("3d(")[1].split(", 0)")[0].split(", ") : i.style["-ms-transform"] && (n = i.style["-ms-transform"].split("3d(")[1].split(", 0)")[0].split(", ")), o.x = parseInt(n[0].split("px")[0]), o.y = parseInt(n[1].split("px")[0])
                        }
                        o.url.match("toner") && (o.url = o.url.replace("/toner-hybrid/", "/toner-lines/"), o.url = o.url.replace("/toner/", "/toner-background/")), o.pos.start = this._map.containerPointToLatLng([o.x, o.y]), o.pos.end = this._map.containerPointToLatLng([o.x + o.width, o.y + o.height]), e = new L.imageOverlay(o.url, [o.pos.start, o.pos.end]), this._image_layer.addLayer(e)
                    }
            }
            _createTileLayer(t, e) {
                var i = null,
                    o = t.split(":"),
                    n = {},
                    s = "<a href='http://leafletjs.com' title='A JS library for interactive maps'>Leaflet</a> | ";
                switch (e && (n = e), o[0]) {
                    case "mapbox":
                        var a;
                        if (n.attribution = s + "<div class='mapbox-maplogo'></div><a href='https://www.mapbox.com/about/maps/' target='_blank'>Â© Mapbox Â© OpenStreetMap</a>", o.length > 2) a = "https://api.mapbox.com/styles/v1/" + o[2].substr("//styles/".length) + "/tiles/256/{z}/{x}/{y}@2x?access_token=" + this.options.map_access_token;
                        else a = "https://api.tiles.mapbox.com/v4/" + o[1] + "/{z}/{x}/{y}.png?access_token=" + this.options.map_access_token;
                        i = new L.TileLayer(a, n);
                        break;
                    case "stamen":
                        i = new it(o[1] || "toner-lite", n), this._map.getContainer().style.backgroundColor = "#FFFFFF";
                        break;
                    case "zoomify":
                        n.width = this.options.zoomify.width, n.height = this.options.zoomify.height, n.tolerance = this.options.zoomify.tolerance || .9, n.attribution = s + this.options.zoomify.attribution, i = new G(this.options.zoomify.path, n);
                        break;
                    case "osm":
                        n.subdomains = "ab", n.attribution = s + "Â© <a target='_blank' href='http://www.openstreetmap.org'>OpenStreetMap</a> and contributors, under an <a target='_blank' href='http://www.openstreetmap.org/copyright'>open license</a>", i = new L.TileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", n);
                        break;
                    case "http":
                    case "https":
                        n.subdomains = this.options.map_subdomains, n.attribution = s + this.options.attribution, i = new L.TileLayer(this.options.map_type, n);
                        break;
                    default:
                        i = new it("toner", n)
                }
                return i
            }
            _onMapMoveEnd(t) {}
            _onTilesLoaded(t) {
                this._createBackgroundMap(t.target._tiles), this._tile_layer.off("load", this._onTilesLoaded, this)
            }
            _onMapZoomed(t) {
                this._map.off("zoomend", this._onMapZoomed, this)
            }
            _onMapZoom(t) {}
            _createMarker(t) {
                var e = new Y(t, this.options);
                e.on("markerclick", this._onMarkerClick, this), this._addMarker(e), this._markers.push(e), e.marker_number = this._markers.length - 1, this.fire("markerAdded", e)
            }
            _addMarker(t) {
                t.addTo(this._map)
            }
            _removeMarker(t) {}
            _markerOverview() {
                var t, e;
                if (this._line_active.setStyle({
                        opacity: 0
                    }), "zoomify" == this.options.map_type && this.options.map_as_image) {
                    var i = this._tile_layer.getCenterZoom(this._map);
                    t = i.center, (this.options.map_center_offset && 0 != this.options.map_center_offset.left || 0 != this.options.map_center_offset.top) && (i.zoom = i.zoom - 1, t = this._getMapCenterOffset(t, i.zoom)), this._map.setView(t, i.zoom, {
                        pan: {
                            animate: !0,
                            duration: this.options.duration / 1e3,
                            easeLinearity: .1
                        },
                        zoom: {
                            animate: !0,
                            duration: this.options.duration / 1e3,
                            easeLinearity: .1
                        }
                    })
                } else if (this.bounds_array = this._getAllMarkersBounds(this._markers), this.options.map_center_offset && 0 != this.options.map_center_offset.left || 0 != this.options.map_center_offset.top) {
                    var o = new L.latLngBounds(this.bounds_array);
                    t = o.getCenter(), e = this._map.getBoundsZoom(o), t = this._getMapCenterOffset(t, e - 1), this._map.setView(t, e - 1, {
                        pan: {
                            animate: !0,
                            duration: this.options.duration / 1e3,
                            easeLinearity: .1
                        },
                        zoom: {
                            animate: !0,
                            duration: this.options.duration / 1e3,
                            easeLinearity: .1
                        }
                    })
                } else this._map.fitBounds(this.bounds_array, {
                    padding: [15, 15]
                });
                this._mini_map && this._mini_map.minimize()
            }
            _getAllMarkersBounds(t) {
                for (var e = [], i = 0; i < t.length; i++) t[i].data.real_marker && e.push([t[i].data.location.lat, t[i].data.location.lon]);
                return e
            }
            _calculateMarkerZooms() {
                for (var t = 0; t < this._markers.length; t++)
                    if (this._markers[t].data.location) {
                        var e, i, o, n, s, a, r = this._markers[t];
                        o = r.data.type && "overview" == r.data.type ? this._getMapCenter(!0) : r.location(), e = t > 0 ? this._markers[t - 1].location() : this._getMapCenter(!0), n = this._calculateZoomChange(e, o), i = t < this._markers.length - 1 ? this._markers[t + 1].location() : this._getMapCenter(!0), s = this._calculateZoomChange(i, o), a = n && n < s ? n : s || n, (this.options.map_center_offset && 0 != this.options.map_center_offset.left || 0 != this.options.map_center_offset.top) && (a -= 1), r.data.location.zoom = a
                    }
            }
            _createLine(t) {
                return new L.Polyline([], {
                    clickable: !1,
                    color: this.options.line_color,
                    weight: this.options.line_weight,
                    opacity: this.options.line_opacity,
                    dashArray: this.options.line_dash,
                    lineJoin: this.options.line_join,
                    className: "vco-map-line"
                })
            }
            _addLineToMap(t) {
                this._map.addLayer(t)
            }
            _addToLine(t, e) {
                t.addLatLng({
                    lon: e.location.lon,
                    lat: e.location.lat
                })
            }
            _replaceLines(t, e) {
                t.setLatLngs(e)
            }
            _panTo(t, e) {
                this._map.panTo({
                    lat: t.lat,
                    lon: t.lon
                }, {
                    animate: !0,
                    duration: this.options.duration / 1e3,
                    easeLinearity: .1
                })
            }
            _zoomTo(t, e) {
                this._map.setZoom(t)
            }
            _viewTo(t, e) {
                var i = !0,
                    o = this.options.duration / 1e3,
                    n = this._getMapZoom(),
                    s = {
                        lat: t.lat,
                        lon: t.lon
                    };
                this.options.map_as_image || this._line_active.setStyle({
                    opacity: 1
                }), t.zoom && (n = t.zoom), e && (e.duration && (0 == e.duration ? i = !1 : o = duration), e.zoom && this.options.calculate_zoom && (n = e.zoom)), this.options.map_center_offset && (s = this._getMapCenterOffset(s, n)), this._map.setView(s, n, {
                    pan: {
                        animate: i,
                        duration: o,
                        easeLinearity: .1
                    },
                    zoom: {
                        animate: i,
                        duration: o,
                        easeLinearity: .1
                    }
                }), this._mini_map && this.options.width > this.options.skinny_size && (n - 1 <= this.zoom_min_max.min ? this._mini_map.minimize() : this._mini_map.restore())
            }
            _getMapLocation(t) {
                return this._map.latLngToContainerPoint(t)
            }
            _getMapZoom() {
                return this._map.getZoom()
            }
            _getMapCenter(t) {
                return this._map.getCenter()
            }
            _getMapCenterOffset(t, e) {
                var i;
                return i = this._map.project(t, e).subtract([this.options.map_center_offset.left, this.options.map_center_offset.top]), this._map.unproject(i, e)
            }
            _getBoundsZoom(t, e, i) {
                var o = t,
                    n = [3 * Math.abs(this.options.map_center_offset.left), 3 * Math.abs(this.options.map_center_offset.top)];
                if (i) {
                    var s = o.lat + (o.lat - e.lat) / 2,
                        a = o.lng + (o.lng - e.lng) / 2;
                    o = new L.LatLng(s, a)
                }
                var r = new L.LatLngBounds([o, e]);
                return this.options.less_bounce ? this._map.getBoundsZoom(r, !1, n) : this._map.getBoundsZoom(r, !0, n)
            }
            _getZoomifyZoom() {}
            _initialMapLocation() {
                this._map.on("zoomend", this._onMapZoomed, this)
            }
            _updateMapDisplay(t, e) {
                if (t) {
                    var i = this.options.duration,
                        o = this;
                    e && (i = e), this.timer && clearTimeout(this.timer), this.timer = setTimeout((function () {
                        o._refreshMap()
                    }), i)
                } else this.timer || this._refreshMap();
                this._mini_map && this._el.container.offsetWidth < this.options.skinny_size ? this._mini_map.true_hide = !0 : this._mini_map && (this._mini_map.true_hide = !1)
            }
            _refreshMap() {
                this._map && (this.timer && (clearTimeout(this.timer), this.timer = null), this._map.invalidateSize(), this._markers[this.current_marker].data.type && "overview" == this._markers[this.current_marker].data.type ? this._markerOverview() : this._viewTo(this._markers[this.current_marker].data.location, {
                    zoom: this._getMapZoom()
                }))
            }
        }
        P(ot, W), L.Map.include({
            _tryAnimatedPan: function (t, e) {
                var i = this._getCenterOffset(t)._floor();
                return this.panBy(i, e), !0
            },
            _tryAnimatedZoom: function (t, e, i) {
                if (void 0 === this._animateZoom) return !1;
                if (this._animatingZoom) return !0;
                i = i || {};
                var o = this.getZoomScale(e),
                    n = this._getCenterOffset(t)._divideBy(1 - 1 / o),
                    s = this._getCenterLayerPoint()._add(n);
                return this.fire("movestart").fire("zoomstart"), this._animateZoom(t, e, s, o, null, !0), !0
            },
            getBoundsZoom: function (t, e, i) {
                t = L.latLngBounds(t);
                var o, n = this.getMinZoom() - (e ? 1 : 0),
                    s = (this.getMinZoom(), this.getMaxZoom()),
                    a = this.getSize(),
                    r = t.getNorthWest(),
                    h = t.getSouthEast(),
                    l = [],
                    c = {
                        x: 0,
                        y: 0
                    },
                    d = {};
                i = L.point(i || [0, 0]), a = this.getSize();
                for (var p = 0; p < s; p++) n++, o = this.project(h, n).subtract(this.project(r, n)).add(i), l.push({
                    x: Math.abs(a.x - o.x),
                    y: Math.abs(a.y - o.y)
                });
                d = l[0];
                for (var _ = 0; _ < l.length; _++) l[_].y <= d.y && (d.y = l[_].y, c.y = _), l[_].x <= d.x && (d.x = l[_].x, c.x = _);
                return Math.round((c.y + c.x) / 2)
            }
        }), L.TileLayer.include({
            getTiles: function () {
                return this._tiles
            }
        });
        class nt {
            constructor(t, e, i) {
                this._el = {
                    drag: t,
                    move: t
                }, i && (this._el.move = i), this.options = {
                    enable: {
                        x: !0,
                        y: !0
                    },
                    constraint: {
                        top: !1,
                        bottom: !1,
                        left: !1,
                        right: !1
                    },
                    momentum_multiplier: 2e3,
                    duration: 1e3,
                    ease: VCO.Ease.easeInOutQuint
                }, this.animator = null, this.dragevent = this.mousedrag, VCO.Browser.touch && (this.dragevent = this.touchdrag), this.data = {
                    sliding: !1,
                    direction: "none",
                    pagex: {
                        start: 0,
                        end: 0
                    },
                    pagey: {
                        start: 0,
                        end: 0
                    },
                    pos: {
                        start: {
                            x: 0,
                            y: 0
                        },
                        end: {
                            x: 0,
                            y: 0
                        }
                    },
                    new_pos: {
                        x: 0,
                        y: 0
                    },
                    new_pos_parent: {
                        x: 0,
                        y: 0
                    },
                    time: {
                        start: 0,
                        end: 0
                    },
                    touch: !1
                }, T(this.options, e)
            }
            enable(t) {
                this.data.pos.start = 0, this._el.move.style.left = this.data.pos.start.x + "px", this._el.move.style.top = this.data.pos.start.y + "px", this._el.move.style.position = "absolute"
            }
            disable() {
                VCO.DomEvent.removeListener(this._el.drag, this.dragevent.down, this._onDragStart, this), VCO.DomEvent.removeListener(this._el.drag, this.dragevent.up, this._onDragEnd, this)
            }
            stopMomentum() {
                this.animator && this.animator.stop()
            }
            updateConstraint(t) {
                this.options.constraint = t
            }
            _onDragStart(t) {
                VCO.Browser.touch ? t.originalEvent ? (this.data.pagex.start = t.originalEvent.touches[0].screenX, this.data.pagey.start = t.originalEvent.touches[0].screenY) : (this.data.pagex.start = t.targetTouches[0].screenX, this.data.pagey.start = t.targetTouches[0].screenY) : (this.data.pagex.start = t.pageX, this.data.pagey.start = t.pageY), this.options.enable.x && (this._el.move.style.left = this.data.pagex.start - this._el.move.offsetWidth / 2 + "px"), this.options.enable.y && (this._el.move.style.top = this.data.pagey.start - this._el.move.offsetHeight / 2 + "px"), this.data.pos.start = VCO.Dom.getPosition(this._el.drag), this.data.time.start = (new Date).getTime(), this.fire("dragstart", this.data), VCO.DomEvent.addListener(this._el.drag, this.dragevent.move, this._onDragMove, this), VCO.DomEvent.addListener(this._el.drag, this.dragevent.leave, this._onDragEnd, this)
            }
            _onDragEnd(t) {
                this.data.sliding = !1, VCO.DomEvent.removeListener(this._el.drag, this.dragevent.move, this._onDragMove, this), VCO.DomEvent.removeListener(this._el.drag, this.dragevent.leave, this._onDragEnd, this), this.fire("dragend", this.data), this._momentum()
            }
            _onDragMove(t) {
                t.preventDefault(), this.data.sliding = !0, VCO.Browser.touch ? t.originalEvent ? (this.data.pagex.end = t.originalEvent.touches[0].screenX, this.data.pagey.end = t.originalEvent.touches[0].screenY) : (this.data.pagex.end = t.targetTouches[0].screenX, this.data.pagey.end = t.targetTouches[0].screenY) : (this.data.pagex.end = t.pageX, this.data.pagey.end = t.pageY), this.data.pos.end = VCO.Dom.getPosition(this._el.drag), this.data.new_pos.x = -(this.data.pagex.start - this.data.pagex.end - this.data.pos.start.x), this.data.new_pos.y = -(this.data.pagey.start - this.data.pagey.end - this.data.pos.start.y), this.options.enable.x && (this._el.move.style.left = this.data.new_pos.x + "px"), this.options.enable.y && (this._el.move.style.top = this.data.new_pos.y + "px"), this.fire("dragmove", this.data)
            }
            _momentum() {
                var t = {
                        x: 0,
                        y: 0,
                        time: 0
                    },
                    e = {
                        x: 0,
                        y: 0,
                        time: 0
                    },
                    i = !1;
                VCO.Browser.touch, t.time = 10 * ((new Date).getTime() - this.data.time.start), e.time = 10 * ((new Date).getTime() - this.data.time.start), e.x = this.options.momentum_multiplier * (Math.abs(this.data.pagex.end) - Math.abs(this.data.pagex.start)), e.y = this.options.momentum_multiplier * (Math.abs(this.data.pagey.end) - Math.abs(this.data.pagey.start)), t.x = Math.round(e.x / e.time), t.y = Math.round(e.y / e.time), this.data.new_pos.x = Math.min(this.data.pos.end.x + t.x), this.data.new_pos.y = Math.min(this.data.pos.end.y + t.y), this.options.enable.x ? this.data.new_pos.x < 0 && (this.data.new_pos.x = 0) : this.data.new_pos.x = this.data.pos.start.x, this.options.enable.y ? this.data.new_pos.y < 0 && (this.data.new_pos.y = 0) : this.data.new_pos.y = this.data.pos.start.y, e.time < 3e3 && (i = !0), Math.abs(e.x) > 1e4 && (this.data.direction = "left", e.x > 0 && (this.data.direction = "right")), Math.abs(e.y) > 1e4 && (this.data.direction = "up", e.y > 0 && (this.data.direction = "down")), this._animateMomentum(), i && this.fire("swipe_" + this.data.direction, this.data)
            }
            _animateMomentum() {
                var t = {
                        x: this.data.new_pos.x,
                        y: this.data.new_pos.y
                    },
                    e = {
                        duration: this.options.duration,
                        easing: VCO.Ease.easeOutStrong
                    };
                this.options.enable.y && ((this.options.constraint.top || this.options.constraint.bottom) && (t.y > this.options.constraint.bottom ? t.y = this.options.constraint.bottom : t.y < this.options.constraint.top && (t.y = this.options.constraint.top)), e.top = Math.floor(t.y) + "px"), this.options.enable.x && ((this.options.constraint.left || this.options.constraint.right) && (t.x > this.options.constraint.left ? t.x = this.options.constraint.left : t.x < this.options.constraint.right && (t.x = this.options.constraint.right)), e.left = Math.floor(t.x) + "px"), this.animator = VCO.Animate(this._el.move, e), this.fire("momentum", this.data)
            }
        }
        P(W);
        var st = {
            addListener: function (t, e, i, o) {
                var n = D(),
                    s = "_vco_" + e + n;
                if (!t[s]) {
                    var a = function (e) {
                        return i.call(o || t, e || st._getEvent())
                    };
                    if (x && "dblclick" === e && this.addDoubleTapListener) this.addDoubleTapListener(t, a, n);
                    else if ("addEventListener" in t)
                        if ("mousewheel" === e) t.addEventListener("DOMMouseScroll", a, !1), t.addEventListener(e, a, !1);
                        else if ("mouseenter" === e || "mouseleave" === e) {
                        var r = a,
                            h = "mouseenter" === e ? "mouseover" : "mouseout";
                        a = function (e) {
                            if (st._checkMouse(t, e)) return r(e)
                        }, t.addEventListener(h, a, !1)
                    } else t.addEventListener(e, a, !1);
                    else "attachEvent" in t && t.attachEvent("on" + e, a);
                    t[s] = a
                }
            },
            removeListener: function (t, e, i) {
                var o = D(),
                    n = "_vco_" + e + o,
                    s = t[n];
                s && (x && "dblclick" === e && this.removeDoubleTapListener ? this.removeDoubleTapListener(t, o) : "removeEventListener" in t ? "mousewheel" === e ? (t.removeEventListener("DOMMouseScroll", s, !1), t.removeEventListener(e, s, !1)) : "mouseenter" === e || "mouseleave" === e ? t.removeEventListener("mouseenter" === e ? "mouseover" : "mouseout", s, !1) : t.removeEventListener(e, s, !1) : "detachEvent" in t && t.detachEvent("on" + e, s), t[n] = null)
            },
            _checkMouse: function (t, e) {
                var i = e.relatedTarget;
                if (!i) return !0;
                try {
                    for (; i && i !== t;) i = i.parentNode
                } catch (t) {
                    return !1
                }
                return i !== t
            },
            _getEvent: function () {
                var t = window.event;
                if (!t)
                    for (var e = arguments.callee.caller; e && (!(t = e.arguments[0]) || window.Event !== t.constructor);) e = e.caller;
                return t
            },
            stopPropagation: function (t) {
                t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0
            },
            disableClickPropagation: function (t) {
                st.addListener(t, nt.START, st.stopPropagation), st.addListener(t, "click", st.stopPropagation), st.addListener(t, "dblclick", st.stopPropagation)
            },
            preventDefault: function (t) {
                t.preventDefault ? t.preventDefault() : t.returnValue = !1
            },
            stop: function (t) {
                st.preventDefault(t), st.stopPropagation(t)
            },
            getWheelDelta: function (t) {
                var e = 0;
                return t.wheelDelta && (e = t.wheelDelta / 120), t.detail && (e = -t.detail / 3), e
            }
        };
        class at {
            constructor(t, e, i) {
                this._el = {
                    parent: {},
                    container: {},
                    button_overview: {},
                    button_backtostart: {},
                    button_collapse_toggle: {},
                    arrow: {},
                    line: {},
                    coverbar: {},
                    grip: {}
                }, this.collapsed = !1, this._el.container = "object" == typeof t ? t : I.get(t), e && (this._el.parent = e), this.options = {
                    width: 600,
                    height: 600,
                    duration: 1e3,
                    ease: U.easeInOutQuint,
                    menubar_default_y: 0
                }, this.animator = {}, T(this.options, i), this._initLayout(), this._initEvents()
            }
            show(t) {
                this.options.duration
            }
            hide(t) {}
            setSticky(t) {
                this.options.menubar_default_y = t
            }
            setColor(t) {
                this._el.container.className = t ? "vco-menubar vco-menubar-inverted" : "vco-menubar"
            }
            updateDisplay(t, e, i, o) {
                this._updateDisplay(t, e, i, o)
            }
            _onButtonOverview(t) {
                this.fire("overview", t)
            }
            _onButtonBackToStart(t) {
                this.fire("back_to_start", t)
            }
            _onButtonCollapseMap(t) {
                this.collapsed ? (this.collapsed = !1, this.show(), this._el.button_overview.style.display = "inline", this.fire("collapse", {
                    y: this.options.menubar_default_y
                }), this._el.button_collapse_toggle.innerHTML = b ? "<span class='vco-icon-arrow-up'></span>" : R.buttons.collapse_toggle + "<span class='vco-icon-arrow-up'></span>") : (this.collapsed = !0, this.hide(25), this._el.button_overview.style.display = "none", this.fire("collapse", {
                    y: 1
                }), this._el.button_collapse_toggle.innerHTML = b ? "<span class='vco-icon-arrow-down'></span>" : R.buttons.uncollapse_toggle + "<span class='vco-icon-arrow-down'></span>")
            }
            _initLayout() {
                this._el.button_overview = I.create("span", "vco-menubar-button", this._el.container), st.addListener(this._el.button_overview, "click", this._onButtonOverview, this), this._el.button_backtostart = I.create("span", "vco-menubar-button", this._el.container), st.addListener(this._el.button_backtostart, "click", this._onButtonBackToStart, this), this._el.button_collapse_toggle = I.create("span", "vco-menubar-button", this._el.container), st.addListener(this._el.button_collapse_toggle, "click", this._onButtonCollapseMap, this), this.options.map_as_image ? this._el.button_overview.innerHTML = R.buttons.overview : this._el.button_overview.innerHTML = R.buttons.map_overview, b ? (this._el.button_backtostart.innerHTML = "<span class='vco-icon-goback'></span>", this._el.button_collapse_toggle.innerHTML = "<span class='vco-icon-arrow-up'></span>", this._el.container.setAttribute("ontouchstart", " ")) : (this._el.button_backtostart.innerHTML = R.buttons.backtostart + " <span class='vco-icon-goback'></span>", this._el.button_collapse_toggle.innerHTML = R.buttons.collapse_toggle + "<span class='vco-icon-arrow-up'></span>"), "landscape" == this.options.layout && (this._el.button_collapse_toggle.style.display = "none")
            }
            _initEvents() {}
            _updateDisplay(t, e, i) {
                t && (this.options.width = t), e && (this.options.height = e)
            }
        }

        function rt(t, e) {
            return ht(t, e)
        }
        P(at, W, F);
        const ht = function () {
            var t = document,
                e = window,
                i = e.performance,
                o = i && (i.now || i.webkitNow || i.msNow || i.mozNow),
                n = o ? function () {
                    return o.call(i)
                } : function () {
                    return +new Date
                },
                s = t.documentElement,
                a = !1,
                r = 1e3,
                h = /^rgb\(|#/,
                l = /^([+\-])=([\d\.]+)/,
                c = /^(?:[\+\-]=?)?\d+(?:\.\d+)?(%|in|cm|mm|em|ex|pt|pc|px)$/,
                d = /rotate\(((?:[+\-]=)?([\-\d\.]+))deg\)/,
                p = /scale\(((?:[+\-]=)?([\d\.]+))\)/,
                _ = /skew\(((?:[+\-]=)?([\-\d\.]+))deg, ?((?:[+\-]=)?([\-\d\.]+))deg\)/,
                u = /translate\(((?:[+\-]=)?([\-\d\.]+))px, ?((?:[+\-]=)?([\-\d\.]+))px\)/,
                m = {
                    lineHeight: 1,
                    zoom: 1,
                    zIndex: 1,
                    opacity: 1,
                    transform: 1
                },
                g = function () {
                    var e, i = t.createElement("a").style,
                        o = ["webkitTransform", "MozTransform", "OTransform", "msTransform", "Transform"];
                    for (e = 0; e < o.length; e++)
                        if (o[e] in i) return o[e]
                }(),
                f = void 0 !== t.createElement("a").style.opacity,
                v = t.defaultView && t.defaultView.getComputedStyle ? function (e, i) {
                    i = P(i = "transform" == i ? g : i);
                    var o = null,
                        n = t.defaultView.getComputedStyle(e, "");
                    return n && (o = n[i]), e.style[i] || o
                } : s.currentStyle ? function (t, e) {
                    if ("opacity" == (e = P(e))) {
                        var i = 100;
                        try {
                            i = t.filters["DXImageTransform.Microsoft.Alpha"].opacity
                        } catch (e) {
                            try {
                                i = t.filters("alpha").opacity
                            } catch (t) {}
                        }
                        return i / 100
                    }
                    var o = t.currentStyle ? t.currentStyle[e] : null;
                    return t.style[e] || o
                } : function (t, e) {
                    return t.style[P(e)]
                },
                y = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.msRequestAnimationFrame || e.oRequestAnimationFrame || function (t) {
                    e.setTimeout((function () {
                        t(+new Date)
                    }), 17)
                },
                w = [];

            function b(t) {
                var e, i = w.length;
                for (o && t > 1e12 && (t = n()), a && (t = n()), e = i; e--;) w[e](t);
                w.length && y(b)
            }

            function L(t) {
                var e, i = function (t, e, i) {
                    if (Array.prototype.indexOf) return t.indexOf(e);
                    for (i = 0; i < t.length; ++i)
                        if (t[i] === e) return i
                }(w, t);
                i >= 0 && (e = w.slice(i + 1), w.length = i, w = w.concat(e))
            }

            function x(t, e) {
                var i, o = {};
                return (i = t.match(d)) && (o.rotate = O(i[1], e ? e.rotate : null)), (i = t.match(p)) && (o.scale = O(i[1], e ? e.scale : null)), (i = t.match(_)) && (o.skewx = O(i[1], e ? e.skewx : null), o.skewy = O(i[3], e ? e.skewy : null)), (i = t.match(u)) && (o.translatex = O(i[1], e ? e.translatex : null), o.translatey = O(i[3], e ? e.translatey : null)), o
            }

            function M(t) {
                var e = "";
                return "rotate" in t && (e += "rotate(" + t.rotate + "deg) "), "scale" in t && (e += "scale(" + t.scale + ") "), "translatex" in t && (e += "translate(" + t.translatex + "px," + t.translatey + "px) "), "skewx" in t && (e += "skew(" + t.skewx + "deg," + t.skewy + "deg)"), e
            }

            function k(t) {
                var e, i, o, n = t.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
                return (n ? (e = n[1], i = n[2], o = n[3], "#" + (1 << 24 | e << 16 | i << 8 | o).toString(16).slice(1)) : t).replace(/#(\w)(\w)(\w)$/, "#$1$1$2$2$3$3")
            }

            function P(t) {
                return t.replace(/-(.)/g, (function (t, e) {
                    return e.toUpperCase()
                }))
            }

            function T(t) {
                return "function" == typeof t
            }

            function D(t) {
                return Math.sin(t * Math.PI / 2)
            }

            function S(t, e, i, o, s, a) {
                o = T(o) ? o : z.easings[o] || D;
                var h, l = t || r,
                    c = this,
                    d = a - s,
                    p = n(),
                    _ = 0,
                    u = 0;
                return h = function t(n) {
                    var r = n - p;
                    if (r > l || _) return a = isFinite(a) ? a : 1, _ ? u && e(a) : e(a), L(t), i && i.apply(c);
                    isFinite(a) ? e(d * o(r / l) + s) : e(o(r / l))
                }, 1 === w.push(h) && y(b), {
                    stop: function (t) {
                        _ = 1, u = t, t || (i = null)
                    }
                }
            }

            function C(t, e) {
                var i, o, n = t.length,
                    s = [];
                for (i = 0; i < n; ++i) s[i] = [t[i][0], t[i][1]];
                for (o = 1; o < n; ++o)
                    for (i = 0; i < n - o; ++i) s[i][0] = (1 - e) * s[i][0] + e * s[parseInt(i + 1, 10)][0], s[i][1] = (1 - e) * s[i][1] + e * s[parseInt(i + 1, 10)][1];
                return [s[0][0], s[0][1]]
            }

            function E(t, e, i, o, n, s, a) {
                if ("transform" == n) {
                    for (var h in a = {}, i[s][n]) a[h] = h in o[s][n] ? Math.round(((o[s][n][h] - i[s][n][h]) * t + i[s][n][h]) * r) / r : i[s][n][h];
                    return a
                }
                return "string" == typeof i[s][n] ? function (t, e, i) {
                    var o, n, s, a, r = [];
                    for (o = 0; o < 6; o++) s = Math.min(15, parseInt(e.charAt(o), 16)), a = Math.min(15, parseInt(i.charAt(o), 16)), n = (n = Math.floor((a - s) * t + s)) > 15 ? 15 : n < 0 ? 0 : n, r[o] = n.toString(16);
                    return "#" + r.join("")
                }(t, i[s][n], o[s][n]) : (a = Math.round(((o[s][n] - i[s][n]) * t + i[s][n]) * r) / r, n in m || (a += e[s][n] || "px"), a)
            }

            function O(t, e, i, o, n) {
                return (i = l.exec(t)) ? (n = parseFloat(i[2])) && e + ("+" == i[1] ? 1 : -1) * n : parseFloat(t)
            }

            function z(t, e) {
                var i, o, n, s = t ? s = isFinite(t.length) ? t : [t] : [],
                    a = e.complete,
                    r = e.duration,
                    l = e.easing,
                    d = e.bezier,
                    p = [],
                    _ = [],
                    u = [],
                    m = [];
                for (d && (o = e.left, n = e.top, delete e.right, delete e.bottom, delete e.left, delete e.top), i = s.length; i--;) {
                    if (p[i] = {}, _[i] = {}, u[i] = {}, d) {
                        var y = v(s[i], "left"),
                            w = v(s[i], "top"),
                            b = [O(T(o) ? o(s[i]) : o || 0, parseFloat(y)), O(T(n) ? n(s[i]) : n || 0, parseFloat(w))];
                        m[i] = T(d) ? d(s[i], b) : d, m[i].push(b), m[i].unshift([parseInt(y, 10), parseInt(w, 10)])
                    }
                    for (var L in e) {
                        switch (L) {
                            case "complete":
                            case "duration":
                            case "easing":
                            case "bezier":
                                continue
                        }
                        var D, z = v(s[i], L),
                            B = T(e[L]) ? e[L](s[i]) : e[L];
                        "string" != typeof B || !h.test(B) || h.test(z) ? (p[i][L] = "transform" == L ? x(z) : "string" == typeof B && h.test(B) ? k(z).slice(1) : parseFloat(z), _[i][L] = "transform" == L ? x(B, p[i][L]) : "string" == typeof B && "#" == B.charAt(0) ? k(B).slice(1) : O(B, parseFloat(z)), "string" == typeof B && (D = B.match(c)) && (u[i][L] = D[1])) : delete e[L]
                    }
                }
                return S.apply(s, [r, function (t, o, n) {
                    for (i = s.length; i--;)
                        for (var a in d && (n = C(m[i], t), s[i].style.left = n[0] + "px", s[i].style.top = n[1] + "px"), e) o = E(t, u, p, _, a, i), "transform" == a ? s[i].style[g] = M(o) : "opacity" != a || f ? s[i].style[P(a)] = o : s[i].style.filter = "alpha(opacity=" + 100 * o + ")"
                }, a, l])
            }
            return y((function (t) {
                a = t > 1e12 != n() > 1e12
            })), z.tween = S, z.getStyle = v, z.bezier = C, z.transform = g, z.parseTransform = x, z.formatTransform = M, z.easings = {}, z
        }();
        class lt {
            constructor(t, e, i) {
                this._el = {
                    container: {},
                    content_container: {},
                    icon: {},
                    title: {},
                    description: {}
                }, this.mediatype = {}, this.data = {
                    title: "Navigation",
                    description: "Description"
                }, this.options = {
                    direction: "previous"
                }, this.animator = null, this.animator_position = null, T(this.options, e), T(this.data, t), this._el.container = I.create("div", "vco-slidenav-" + this.options.direction), b && this._el.container.setAttribute("ontouchstart", " "), this._initLayout(), this._initEvents(), i && i.appendChild(this._el.container)
            }
            update(t) {
                this._update(t)
            }
            setColor(t) {
                this._el.content_container.className = t ? "vco-slidenav-content-container vco-slidenav-inverted" : "vco-slidenav-content-container"
            }
            updatePosition(t, e, i, o, n, s) {
                var a, r = this,
                    h = {
                        duration: i,
                        easing: o,
                        complete: function () {
                            r._onUpdatePositionComplete(s)
                        }
                    },
                    l = n;
                for (var c in t) t.hasOwnProperty(c) && (h[c] = e ? t[c] + "%" : t[c] + "px");
                this.animator_position && this.animator_position.stop(), a = h.right ? "right" : "left", this._el.container.style[a] = e ? l + "%" : l + "px", this.animator_position = rt(this._el.container, h)
            }
            _onUpdatePositionComplete(t) {
                t && (this._el.container.style.left = "", this._el.container.style.right = "")
            }
            _onMouseClick() {
                this.fire("clicked", this.options)
            }
            _update(t) {
                this.data = T(this.data, t), "" != this.data.title && (this._el.title.innerHTML = this.data.title), "" != this.data.date && (this._el.description.innerHTML = this.data.description)
            }
            _initLayout() {
                this._el.content_container = I.create("div", "vco-slidenav-content-container", this._el.container), this._el.icon = I.create("div", "vco-slidenav-icon", this._el.content_container), this._el.title = I.create("div", "vco-slidenav-title", this._el.content_container), this._el.description = I.create("div", "vco-slidenav-description", this._el.content_container), this._el.icon.innerHTML = "&nbsp;", this._update()
            }
            _initEvents() {
                st.addListener(this._el.container, "click", this._onMouseClick, this)
            }
        }
        P(lt, W, F);
        class ct {
            constructor(t, e, i) {
                this._el = {
                    parent: {},
                    container: {},
                    message_container: {},
                    loading_icon: {},
                    message: {}
                }, this.options = {
                    width: 600,
                    height: 600,
                    message_class: "vco-message",
                    message_icon_class: "vco-loading-icon"
                }, T(this.data, t), T(this.options, e), this._el.container = I.create("div", this.options.message_class), i && (i.appendChild(this._el.container), this._el.parent = i), this.animator = {}, this._initLayout(), this._initEvents()
            }
            updateMessage(t) {
                this._updateMessage(t)
            }
            updateDisplay(t, e) {
                this._updateDisplay(t, e)
            }
            _updateMessage(t) {
                this._el.message.innerHTML = t || (R ? R.messages.loading : "Loading")
            }
            _onMouseClick() {
                this.fire("clicked", this.options)
            }
            _initLayout() {
                this._el.message_container = I.create("div", "vco-message-container", this._el.container), this._el.loading_icon = I.create("div", this.options.message_icon_class, this._el.message_container), this._el.message = I.create("div", "vco-message-content", this._el.message_container), this._updateMessage()
            }
            _initEvents() {
                st.addListener(this._el.container, "click", this._onMouseClick, this)
            }
            _updateDisplay(t, e, i) {}
        }
        P(ct, W, F);
        class dt {
            constructor(t, e, i) {
                this._el = {
                    container: {},
                    content_container: {},
                    content: {},
                    content_item: {},
                    content_link: {},
                    caption: null,
                    credit: null,
                    parent: {},
                    link: null
                }, this.player = null, this.timer = null, this.load_timer = null, this.message = null, this.media_id = null, this._state = {
                    loaded: !1,
                    show_meta: !1,
                    media_loaded: !1
                }, this.data = {
                    uniqueid: null,
                    url: null,
                    credit: null,
                    caption: null,
                    link: null,
                    link_target: null
                }, this.options = {
                    api_key_flickr: "8f2d5becf7b6ba46570741620054b507",
                    credit_height: 0,
                    caption_height: 0
                }, this.animator = {}, T(this.options, e), T(this.data, t), this._el.container = I.create("div", "vco-media"), this.data.uniqueid && (this._el.container.id = this.data.uniqueid), this._initLayout(), i && (i.appendChild(this._el.container), this._el.parent = i)
            }
            loadMedia() {
                var t = this;
                if (!this._state.loaded) try {
                    this.load_timer = setTimeout((function () {
                        t._loadMedia(), t._state.loaded = !0, t._updateDisplay()
                    }), 1200)
                } catch (t) {
                    console.log("Error loading media for ", this._media), console.log(t)
                }
            }
            loadingMessage() {
                this.message.updateMessage(this._("loading") + " " + this.options.media_name)
            }
            updateMediaDisplay(t) {
                this._state.loaded && (this._updateMediaDisplay(t), b || "portrait" == t || (this._el.content_item.style.maxHeight = this.options.height / 2 + "px"), this._state.media_loaded && (this._el.credit && (this._el.credit.style.width = "auto"), this._el.caption && (this._el.caption.style.width = "auto")), w && (this._el.content_item.offsetWidth > this._el.content_item.offsetHeight && (this._el.content_item.style.width = "100%", this._el.content_item.style.maxWidth = "100%"), "portrait" == t && (this._el.content_item.style.maxHeight = "none")), this._state.media_loaded && (this._el.credit && (this._el.credit.style.width = this._el.content_item.offsetWidth + "px"), this._el.caption && (this._el.caption.style.width = this._el.content_item.offsetWidth + "px")))
            }
            _loadMedia() {}
            _updateMediaDisplay(t) {}
            show() {}
            hide() {}
            addTo(t) {
                t.appendChild(this._el.container), this.onAdd()
            }
            removeFrom(t) {
                t.removeChild(this._el.container), this.onRemove()
            }
            updateDisplay(t, e, i) {
                this._updateDisplay(t, e, i)
            }
            stopMedia() {
                this._stopMedia()
            }
            loadErrorDisplay(t) {
                this._el.content.removeChild(this._el.content_item), this._el.content_item = I.create("div", "vco-media-item vco-media-loaderror", this._el.content), this._el.content_item.innerHTML = "<div class='vco-icon-" + this.options.media_type + "'></div><p>" + t + "</p>", this.onLoaded(!0)
            }
            onLoaded(t) {
                this._state.loaded = !0, this.fire("loaded", this.data), this.message && this.message.hide(), t || this.showMeta(), this.updateDisplay()
            }
            onMediaLoaded(t) {
                this._state.media_loaded = !0, this.fire("media_loaded", this.data), this._el.credit && (this._el.credit.style.width = this._el.content_item.offsetWidth + "px"), this._el.caption && (this._el.caption.style.width = this._el.content_item.offsetWidth + "px")
            }
            showMeta(t, e) {
                this._state.show_meta = !0, this.data.credit && "" != this.data.credit && !this._el.credit && (this._el.credit = I.create("div", "vco-credit", this._el.content_container), this._el.credit.innerHTML = this.data.credit, this.options.credit_height = this._el.credit.offsetHeight), this.data.caption && "" != this.data.caption && !this._el.caption && (this._el.caption = I.create("div", "vco-caption", this._el.content_container), this._el.caption.innerHTML = this.data.caption, this.options.caption_height = this._el.caption.offsetHeight)
            }
            onAdd() {
                this.fire("added", this.data)
            }
            onRemove() {
                this.fire("removed", this.data)
            }
            _initLayout() {
                this.message = new ct({}, this.options), this.message.addTo(this._el.container), this._el.content_container = I.create("div", "vco-media-content-container", this._el.container), this.data.link && "" != this.data.link ? (this._el.link = I.create("a", "vco-media-link", this._el.content_container), this._el.link.href = this.data.link, this.data.link_target && "" != this.data.link_target ? this._el.link.target = this.data.link_target : this._el.link.target = "_blank", this._el.content = I.create("div", "vco-media-content", this._el.link)) : this._el.content = I.create("div", "vco-media-content", this._el.content_container)
            }
            _updateDisplay(t, e, i) {
                t && (this.options.width = t), e && (this.options.height = e), i && (this.options.layout = i), this._el.credit && (this.options.credit_height = this._el.credit.offsetHeight), this._el.caption && (this.options.caption_height = this._el.caption.offsetHeight + 5), this.updateMediaDisplay(this.options.layout)
            }
            _stopMedia() {}
        }
        P(dt, W);
        class pt extends dt {
            _loadMedia() {
                var t = this;
                this.message.updateMessage(R.messages.loading + " " + this.options.media_name), this.data.link ? (this._el.content_link = I.create("a", "", this._el.content), this._el.content_link.href = this.data.link, this._el.content_link.target = "_blank", this._el.content_item = I.create("img", "vco-media-item vco-media-image vco-media-shadow", this._el.content_link)) : this._el.content_item = I.create("img", "vco-media-item vco-media-image vco-media-shadow", this._el.content), this._el.content_item.addEventListener("load", (function (e) {
                    t.onMediaLoaded()
                })), this._el.content_item.src = this.data.url, this.onLoaded()
            }
            _updateMediaDisplay(t) {
                w && (this._el.content_item.style.width = "auto")
            }
        }
        class _t extends dt {
            _loadMedia() {
                var t, e = this;
                this.message.updateMessage(R.messages.loading + " " + this.options.media_name), this.youtube_loaded = !1, this._el.content_item = I.create("div", "vco-media-item vco-media-youtube vco-media-shadow", this._el.content), this._el.content_item.id = S(7), t = function (t) {
                    var e, i, o, n = [];
                    (e = t.toString()).match("&#038;") ? e = e.replace("&#038;", "&") : e.match("&#38;") ? e = e.replace("&#38;", "&") : e.match("&amp;") && (e = e.replace("&amp;", "&")), o = e.slice(e.indexOf("?") + 1).split("&");
                    for (var s = 0; s < o.length; s++) i = o[s].split("="), n.push(i[0]), n[i[0]] = i[1];
                    return n
                }(this.data.url), this.media_id = {}, this.data.url.match("v=") ? this.media_id.id = t.v : this.data.url.match("/embed/") ? this.media_id.id = this.data.url.split("embed/")[1].split(/[?&]/)[0] : this.data.url.match(/v\/|v=|youtu\.be\//) ? this.media_id.id = this.data.url.split(/v\/|v=|youtu\.be\//)[1].split(/[?&]/)[0] : console.log("YouTube in URL but not a valid video"), this.media_id.start = t.t, this.media_id.hd = t.hd, z("https://www.youtube.com/iframe_api", (function () {
                    e.createMedia()
                }))
            }
            _updateMediaDisplay() {
                this._el.content_item.style.height = O({
                    w: this._el.content_item.offsetWidth
                }) + "px"
            }
            _stopMedia() {
                if (this.youtube_loaded) try {
                    this.player.getPlayerState() == YT.PlayerState.PLAYING && this.player.pauseVideo()
                } catch (t) {
                    console.log(t)
                }
            }
            createMedia() {
                if (void 0 !== this.media_id.start) {
                    var t = this.media_id.start.toString(),
                        e = 0,
                        i = 0;
                    t.match("m") ? (e = parseInt(t.split("m")[0], 10), i = parseInt(t.split("m")[1].split("s")[0], 10), this.media_id.start = 60 * e + i) : this.media_id.start = 0
                } else this.media_id.start = 0;
                void 0 !== this.media_id.hd ? this.media_id.hd = !0 : this.media_id.hd = !1, this.createPlayer()
            }
            createPlayer() {
                var t = this;
                clearTimeout(this.timer), "undefined" != typeof YT && void 0 !== YT.Player ? this.player = new YT.Player(this._el.content_item.id, {
                    playerVars: {
                        enablejsapi: 1,
                        color: "white",
                        autohide: 1,
                        showinfo: 0,
                        theme: "light",
                        start: this.media_id.start,
                        fs: 0,
                        rel: 0
                    },
                    videoId: this.media_id.id,
                    events: {
                        onReady: function () {
                            t.onPlayerReady()
                        },
                        onStateChange: t.onStateChange
                    }
                }) : this.timer = setTimeout((function () {
                    t.createPlayer()
                }), 1e3), this.onLoaded()
            }
            onPlayerReady(t) {
                this.youtube_loaded = !0, this._el.content_item = document.getElementById(this._el.content_item.id), this.onMediaLoaded(), this.onLoaded()
            }
            onStateChange(t) {
                t.data == YT.PlayerState.ENDED && (t.target.seekTo(0), t.target.pauseVideo())
            }
        }
        class ut extends dt {
            _loadMedia() {
                this.message.updateMessage(R.messages.loading + " " + this.options.media_name), this._el.content_item = I.create("div", "vco-media-item vco-media-blockquote", this._el.content), this.media_id = this.data.url, this._el.content_item.innerHTML = this.media_id, this.onLoaded()
            }
            updateMediaDisplay() {}
            _updateMediaDisplay() {}
        }
        class mt extends dt {
            _loadMedia() {
                var t, e, i = this;
                this.message.updateMessage(R.messages.loading + " " + this.options.media_name), this._el.content_item = I.create("div", "vco-media-item vco-media-wikipedia", this._el.content), this.media_id = this.data.url.split("wiki/")[1].split("#")[0].replace("_", " "), this.media_id = this.media_id.replace(" ", "%20"), e = this.data.url.split("//")[1].split(".wikipedia")[0];
                let o = "wikipediaCallback_",
                    n = 512 - o.length,
                    s = o + this.media_id.replace(/[^0-9a-z]/gi, "").slice(0, n);
                t = `https://${e}.wikipedia.org/w/api.php?action=query&prop=extracts&redirects=&titles=${this.media_id}&exintro=1&format=json&callback=${s}`;
                let a = document.createElement("script");
                window[s] = function (t) {
                    i.createMedia(t)
                }, a.src = t, document.body.appendChild(a)
            }
            createMedia(t) {
                var e = "";
                if (t.query) {
                    var i;
                    (e = {
                        entry: {},
                        title: "",
                        text: "",
                        extract: "",
                        paragraphs: 1,
                        text_array: []
                    }).entry = function (t, e) {
                        if (void 0 !== t) {
                            var i = 0;
                            for (var o in t) {
                                if (e === i) return t[o];
                                i++
                            }
                            return ""
                        }
                        return ""
                    }(t.query.pages, 0), e.extract = e.entry.extract, e.title = e.entry.title, e.extract.match("<p>") ? e.text_array = e.extract.split("<p>") : e.text_array.push(e.extract);
                    for (var o = 0; o < e.text_array.length; o++) o + 1 <= e.paragraphs && o + 1 < e.text_array.length && (e.text += "<p>" + e.text_array[o + 1]);
                    i = "<h4><a href='" + this.data.url + "' target='_blank'>" + e.title + "</a></h4>", i += "<span class='wiki-source'>" + R.messages.wikipedia + "</span>", i += e.text, e.extract.match("REDIRECT") || (this._el.content_item.innerHTML = i, this.onLoaded())
                }
            }
            updateMediaDisplay() {}
            _updateMediaDisplay() {}
        }
        class gt extends dt {
            _loadMedia() {
                var t, e = this;
                this.message.updateMessage(R.messages.loading + " " + this.options.media_name), this._el.content_item = I.create("div", "vco-media-item vco-media-iframe vco-media-soundcloud vco-media-shadow", this._el.content), this.media_id = this.data.url, t = "https://soundcloud.com/oembed?url=" + this.media_id + "&format=json", fetch(t).then((t => t.json().then((t => {
                    z("https://w.soundcloud.com/player/api.js", (function () {
                        e.createMedia(t)
                    }))
                }))))
            }
            createMedia(t) {
                this._el.content_item.innerHTML = t.html, this.soundCloudCreated = !0, self.widget = SC.Widget(this._el.content_item.querySelector("iframe")), this.onLoaded()
            }
            _stopMedia() {
                this.soundCloudCreated && self.widget.pause()
            }
        }
        class ft extends dt {
            _loadMedia() {
                var t;
                this.message.updateMessage(R.messages.loading + " " + this.options.media_name), this._el.content_item = I.create("div", "vco-media-item vco-media-iframe vco-media-vimeo vco-media-shadow", this._el.content), this.media_id = this.data.url.split(/video\/|\/\/vimeo\.com\//)[1].split(/[?&]/)[0], t = "https://player.vimeo.com/video/" + this.media_id + "?api=1&title=0&amp;byline=0&amp;portrait=0&amp;color=ffffff", this.player = I.create("iframe", "", this._el.content_item), this.player.width = "100%", this.player.height = "100%", this.player.frameBorder = "0", this.player.src = t, this.onLoaded()
            }
            _updateMediaDisplay() {
                this._el.content_item.style.height = O({
                    w: this._el.content_item.offsetWidth
                }) + "px"
            }
            _stopMedia() {
                try {
                    this.player.contentWindow.postMessage(JSON.stringify({
                        method: "pause"
                    }), "https://player.vimeo.com")
                } catch (t) {
                    console.log(t)
                }
            }
        }
        class vt extends dt {
            _loadMedia() {
                var t;
                this.message.updateMessage(R.messages.loading + " " + this.options.media_name), this._el.content_item = I.create("div", "vco-media-item vco-media-iframe vco-media-dailymotion", this._el.content), this.data.url.match("video") ? this.media_id = this.data.url.split("video/")[1].split(/[?&]/)[0] : this.media_id = this.data.url.split("embed/")[1].split(/[?&]/)[0], t = "https://www.dailymotion.com/embed/video/" + this.media_id + "?api=postMessage", this._el.content_item.innerHTML = "<iframe autostart='false' frameborder='0' width='100%' height='100%' src='" + t + "'></iframe>", this.onLoaded()
            }
            _updateMediaDisplay() {
                this._el.content_item.style.height = O({
                    w: this._el.content_item.offsetWidth
                }) + "px"
            }
            _stopMedia() {
                this._el.content_item.querySelector("iframe").contentWindow.postMessage('{"command":"pause","parameters":[]}', "*")
            }
        }
        class yt extends dt {
            _loadMedia() {
                var t;
                this.message.updateMessage(R.messages.loading + " " + this.options.media_name), this._el.content_item = I.create("div", "vco-media-item vco-media-iframe vco-media-vine vco-media-shadow", this._el.content), this.media_id = this.data.url.split("vine.co/v/")[1], t = "https://vine.co/v/" + this.media_id + "/embed/simple", this._el.content_item.innerHTML = "<iframe frameborder='0' width='100%' height='100%' src='" + t + "'></iframe><script async src='https://platform.vine.co/static/scripts/embed.js' charset='utf-8'><\/script>", this.onLoaded()
            }
            _updateMediaDisplay() {
                var t = E({
                    w: this._el.content_item.offsetWidth,
                    h: this.options.height
                });
                this._el.content_item.style.height = t.h + "px"
            }
            _stopMedia() {
                this._el.content_item.querySelector("iframe").contentWindow.postMessage("pause", "*")
            }
        }
        class wt extends dt {
            _loadMedia() {
                var t, e = this;
                this.message.updateMessage(R.messages.loading + " " + this.options.media_name), this._el.content_item = I.create("div", "vco-media-twitter", this._el.content);
                let i = /twitter.com\/(.+?)\/status\/(\d+)/.exec(this.data.url);
                i && (this.user_id = i[1], this.media_id = i[2]);
                let o = `twitterCallback_${this.media_id}`;
                t = `https://api.twitter.com/1/statuses/oembed.json?id=${this.media_id}&include_entities=true&callback=${o}`;
                let n = document.createElement("script");
                window[o] = function (t) {
                    e.createMedia(t)
                }, n.src = t, document.body.appendChild(n)
            }
            createMedia(t) {
                var e, i, o, n = "",
                    s = "",
                    a = "";
                s = t.html.split("</p>&mdash;")[0] + "</p></blockquote>", e = t.author_url.split("twitter.com/")[1], i = (a = t.html.split("</p>&mdash;")[1].split('<a href="')[1]).split('">')[0], o = a.split('">')[1].split("</a>")[0], n += s = s.replace(/<a href/gi, '<a target="_blank" href'), n += "<div class='vcard'>", n += "<a href='" + i + "' class='twitter-date' target='_blank'>" + o + "</a>", n += "<div class='author'>", n += "<a class='screen-name url' href='" + t.author_url + "' target='_blank'>", n += "<span class='avatar'></span>", n += "<span class='fn'>" + t.author_name + " <span class='vco-icon-twitter'></span></span>", n += "<span class='nickname'>@" + e + "<span class='thumbnail-inline'></span></span>", n += "</a>", n += "</div>", n += "</div>", this._el.content_item.innerHTML = n, this.onLoaded()
            }
            updateMediaDisplay() {}
            _updateMediaDisplay() {}
        }
        class bt extends dt {
            _loadMedia() {
                var t, e = this;
                this.message.updateMessage(R.messages.loading + " " + this.options.media_name), this._el.content_item = I.create("img", "vco-media-item vco-media-image vco-media-flickr vco-media-shadow", this._el.content), this._el.content_item.addEventListener("load", (function (t) {
                    e.onMediaLoaded()
                })), this.establishMediaID(), t = "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=" + this.options.api_key_flickr + "&photo_id=" + this.media_id + "&format=json&nojsoncallback=1", fetch(t).then((t => t.json().then((t => {
                    "ok" == t.stat ? e.createMedia(t) : e.loadErrorDisplay("Photo not found or private.")
                }))))
            }
            establishMediaID() {
                var t = "flickr.com/photos/",
                    e = this.data.url.indexOf(t);
                if (-1 == e) throw "Invalid Flickr URL";
                var i = e + t.length;
                this.media_id = this.data.url.substr(i).split("/")[1]
            }
            createMedia(t) {
                for (var e = this.sizes(this.options.height), i = t.sizes.size[t.sizes.size.length - 2].source, o = 0; o < t.sizes.size.length; o++) t.sizes.size[o].label == e && (i = t.sizes.size[o].source);
                this._el.content_item.src = i, this.onLoaded()
            }
            sizes(t) {
                return t <= 75 ? t <= 0 ? "Large" : "Thumbnail" : t <= 180 ? "Small" : t <= 240 ? "Small 320" : t <= 375 ? "Medium" : t <= 480 ? "Medium 640" : "Large"
            }
        }
        class Lt extends dt {
            _loadMedia() {
                this.message.updateMessage(R.messages.loading + " " + this.options.media_name), this._el.content_item = I.create("div", "vco-media-item vco-media-iframe", this._el.content), this.media_id = this.data.url, this.media_id, this.media_id.match(/docs.google.com/i) ? this._el.content_item.innerHTML = "<iframe class='doc' frameborder='0' width='100%' height='100%' src='" + this.media_id + "&amp;embedded=true'></iframe>" : this._el.content_item.innerHTML = "<iframe class='doc' frameborder='0' width='100%' height='100%' src='http://docs.google.com/viewer?url=" + this.media_id + "&amp;embedded=true'></iframe>", this.onLoaded()
            }
            _updateMediaDisplay() {
                this._el.content_item.style.height = this.options.height + "px"
            }
        }
        class xt extends dt {
            _loadMedia() {
                this._el.content_item = I.create("img", "vco-media-item vco-media-image", this._el.content), this._el.content_item.src = this.data.url, this.onLoaded()
            }
        }
        class Mt extends dt {
            _loadMedia() {
                self = this, this.message.updateMessage(R.messages.loading + " " + this.options.media_name), this._el.content_item = I.create("div", "vco-media-item vco-media-iframe", this._el.content), this.media_id = this.data.url;
                let t = this.media_id;
                this._el.content_item.innerHTML = t, this.onLoaded()
            }
            _updateMediaDisplay() {
                this._el.content_item.style.height = this.options.height + "px"
            }
        }
        class kt extends dt {
            _loadMedia() {
                this.message.updateMessage(R.messages.loading + " " + this.options.media_name), this._el.content_item = I.create("div", "vco-media-item vco-media-iframe", this._el.content), this.media_id = this.data.url;
                let t = `<iframe src="${this.media_id}" />`;
                this._el.content_item.innerHTML = t, this.onLoaded()
            }
            _updateMediaDisplay() {
                this._el.content_item.style.height = this.options.height + "px"
            }
        }

        function Pt(t) {
            for (var e = {}, i = [{
                    type: "youtube",
                    name: "YouTube",
                    match_str: "(www.)?youtube|youtu.be",
                    cls: _t
                }, {
                    type: "vimeo",
                    name: "Vimeo",
                    match_str: "(player.)?vimeo.com",
                    cls: ft
                }, {
                    type: "dailymotion",
                    name: "DailyMotion",
                    match_str: "(www.)?dailymotion.com",
                    cls: vt
                }, {
                    type: "vine",
                    name: "Vine",
                    match_str: "(www.)?vine.co",
                    cls: yt
                }, {
                    type: "soundcloud",
                    name: "SoundCloud",
                    match_str: "(player.)?soundcloud.com",
                    cls: gt
                }, {
                    type: "twitter",
                    name: "Twitter",
                    match_str: "(www.)?twitter.com",
                    cls: wt
                }, {
                    type: "flickr",
                    name: "Flickr",
                    match_str: "flickr.com/photos",
                    cls: bt
                }, {
                    type: "image",
                    name: "Image",
                    match_str: /jpg|jpeg|png|gif/i,
                    cls: pt
                }, {
                    type: "googledocs",
                    name: "Google Doc",
                    match_str: "^(https?:)?/*[^.]*.google.com/[^/]*/d/[^/]*/[^/]*?usp=sharing|^(https?:)?/*drive.google.com/open?id=[^&]*&authuser=0|^(https?:)?//*drive.google.com/open\\?id=[^&]*|^(https?:)?/*[^.]*.googledrive.com/host/[^/]*/",
                    cls: Lt
                }, {
                    type: "wikipedia",
                    name: "Wikipedia",
                    match_str: "(www.)?wikipedia.org",
                    cls: mt
                }, {
                    type: "iframe",
                    name: "iFrame",
                    match_str: "iframe",
                    cls: Mt
                }, {
                    type: "blockquote",
                    name: "Quote",
                    match_str: "blockquote",
                    cls: ut
                }, {
                    type: "website",
                    name: "Website",
                    match_str: "https?://",
                    cls: kt
                }, {
                    type: "",
                    name: "",
                    match_str: "",
                    cls: dt
                }], o = 0; o < i.length; o++) {
                if (t instanceof Array) return {
                    type: "slider",
                    cls: xt
                };
                if (t.url.match(i[o].match_str)) return (e = i[o]).url = t.url, e
            }
            return !1
        }
        class Tt {
            constructor(t, e, i) {
                this._el = {
                        container: {},
                        content_container: {},
                        content: {},
                        headline: {},
                        date: {},
                        start_btn: {}
                    }, this.data = {
                        uniqueid: "",
                        headline: "headline",
                        text: "text"
                    }, this.options = {
                        title: !1
                    },
                    function (t, e) {
                        t.data = k({}, t.data, e), "" === t.data.uniqueid && (t.data.uniqueid = S(6))
                    }(this, t), T(this.options, e), this._el.container = I.create("div", "vco-text"), this._el.container.id = this.data.uniqueid, this._initLayout(), i && i.appendChild(this._el.container)
            }
            show() {}
            hide() {}
            addTo(t) {
                t.appendChild(this._el.container)
            }
            removeFrom(t) {
                t.removeChild(this._el.container)
            }
            headlineHeight() {
                return this._el.headline.offsetHeight + 40
            }
            addDateText(t) {
                this._el.date.innerHTML = t
            }
            onLoaded() {
                this.fire("loaded", this.data)
            }
            onAdd() {
                this.fire("added", this.data)
            }
            onRemove() {
                this.fire("removed", this.data)
            }
            _initLayout() {
                if (this._el.content_container = I.create("div", "vco-text-content-container", this._el.container), this._el.date = I.create("h3", "vco-headline-date", this._el.content_container), "" != this.data.headline) {
                    var t = "vco-headline";
                    this.options.title && (t = "vco-headline vco-headline-title"), this._el.headline = I.create("h2", t, this._el.content_container), this._el.headline.innerHTML = this.data.headline
                }
                if ("" != this.data.text) {
                    var e = "";
                    e += C(this.data.text), this.data.date && this.data.date.created_time && "" != this.data.date.created_time && this.data.date.created_time.length > 10 && ("undefined" != typeof moment ? e += "<div class='vco-text-date'>" + moment(this.data.date.created_time, "YYYY-MM-DD h:mm:ss").fromNow() + "</div>" : e += "<div class='vco-text-date'>" + function (t) {
                        var e = /^(\d{4})-(\d{2})-(\d{2})[T\s](\d{2}):(\d{2}):(\d{2})/;
                        if (t.match(e)) var i = t.match(e).slice(1);
                        for (var o = [], n = 0; n < i.length; n++) {
                            var s = parseInt(i[n]);
                            1 == n && (s -= 1), o.push(s)
                        }
                        return date = new Date(o[0], o[1], o[2], o[3], o[4], o[5]), months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], year = date.getFullYear(), month = months[date.getMonth()], day = date.getDate(), time = month + ", " + day + " " + year, time
                    }(this.data.date.created_time) + "</div>"), this._el.content = I.create("div", "vco-text-content", this._el.content_container), this._el.content.innerHTML = e
                }
                this.onLoaded()
            }
        }
        P(Tt, W);
        class Dt {
            constructor(t, e, i) {
                this._el = {
                    container: {},
                    scroll_container: {},
                    background: {},
                    content_container: {},
                    content: {},
                    call_to_action: null
                }, this._media = null, this._mediaclass = {}, this._text = {}, this._state = {
                    loaded: !1
                }, this.has = {
                    headline: !1,
                    text: !1,
                    media: !1,
                    title: !1,
                    background: {
                        image: !1,
                        color: !1,
                        color_value: ""
                    }
                }, this.has.title = i, this.title = "", this.data = {
                    uniqueid: null,
                    background: null,
                    date: null,
                    location: null,
                    text: null,
                    media: null
                }, this.options = {
                    duration: 1e3,
                    slide_padding_lr: 40,
                    ease: U.easeInSpline,
                    width: 600,
                    height: 600,
                    skinny_size: 650,
                    media_name: ""
                }, this.active = !1, this.animator = {}, T(this.options, e), T(this.data, t), this._initLayout(), this._initEvents()
            }
            show() {
                this.animator = rt(this._el.slider_container, {
                    left: -this._el.container.offsetWidth * n + "px",
                    duration: this.options.duration,
                    easing: this.options.ease
                })
            }
            hide() {}
            setActive(t) {
                this.active = t, this.active ? (this.data.background && this.fire("background_change", this.has.background), this.loadMedia()) : this.stopMedia()
            }
            addTo(t) {
                t.appendChild(this._el.container)
            }
            removeFrom(t) {
                t.removeChild(this._el.container)
            }
            updateDisplay(t, e, i) {
                this._updateDisplay(t, e, i)
            }
            loadMedia() {
                this._media && !this._state.loaded && (this._media.loadMedia(), this._state.loaded = !0)
            }
            stopMedia() {
                if (this._media && this._state.loaded) try {
                    this._media.stopMedia()
                } catch (t) {
                    if ("this._el.content_item.querySelector is not a function" != t.message) throw t;
                    console.log("Ignoring error in editor context: " + t.message)
                }
            }
            getBackground() {
                return this.has.background
            }
            scrollToTop() {
                this._el.container.scrollTop = 0
            }
            addCallToAction(t) {
                this._el.call_to_action = I.create("div", "vco-slide-calltoaction", this._el.content_container), this._el.call_to_action.innerHTML = "<span class='vco-slide-calltoaction-button-text'>" + t + "</span>", st.addListener(this._el.call_to_action, "click", this._onCallToAction, this)
            }
            _onCallToAction(t) {
                this.fire("call_to_action", t)
            }
            _initLayout() {
                this._el.container = I.create("div", "vco-slide"), this.data.uniqueid && (this._el.container.id = this.data.uniqueid), this._el.scroll_container = I.create("div", "vco-slide-scrollable-container", this._el.container), this._el.content_container = I.create("div", "vco-slide-content-container", this._el.scroll_container), this._el.content = I.create("div", "vco-slide-content", this._el.content_container), this._el.background = I.create("div", "vco-slide-background", this._el.container), this.data.background && (this.data.background.url && (this.has.background.image = !0, this._el.container.className += " vco-full-image-background", this.has.background.color_value = "#000", this._el.background.style.backgroundImage = "url('" + this.data.background.url + "')", this._el.background.style.display = "block"), this.data.background.color && (this.has.background.color = !0, this._el.container.className += " vco-full-color-background", this.has.background.color_value = this.data.background.color), this.data.background.text_background && (this._el.container.className += " vco-text-background")), this.data.media && this.data.media.url && "" != this.data.media.url && (this.has.media = !0), this.data.text && this.data.text.text && (this.has.text = !0), this.data.text && this.data.text.headline && (this.has.headline = !0, this.title = this.data.text.headline), this.has.media && (this.data.media.mediatype = Pt(this.data.media), this.options.media_name = this.data.media.mediatype.name, this.options.media_type = this.data.media.mediatype.type, this._media = new this.data.media.mediatype.cls(this.data.media, this.options)), (this.has.text || this.has.headline) && (this._text = new Tt(this.data.text, {
                    title: this.has.title
                })), this.has.text || this.has.headline || !this.has.media ? this.has.headline && this.has.media && !this.has.text ? (this._el.container.className += " vco-slide-media-only", this._text.addTo(this._el.content), this._media.addTo(this._el.content)) : this.has.text && this.has.media ? (this._media.addTo(this._el.content), this._text.addTo(this._el.content)) : (this.has.text || this.has.headline) && (this._el.container.className += " vco-slide-text-only", this._text.addTo(this._el.content)) : (this._el.container.className += " vco-slide-media-only", this._media.addTo(this._el.content)), this.onLoaded()
            }
            _initEvents() {}
            _updateDisplay(t, e, i) {
                var o, n, s;
                this.options.width = t || this._el.container.offsetWidth, b && this.options.width <= this.options.skinny_size ? (o = "0px", n = "0px", s = this.options.width - 0 + "px") : "landscape" == i ? (o = "40px", n = "75px", s = this.options.width - 115 + "px") : (this.options.width, this.options.skinny_size, o = this.options.slide_padding_lr + "px", n = this.options.slide_padding_lr + "px", s = this.options.width - 2 * this.options.slide_padding_lr + "px"), this._el.content.style.paddingLeft = o, this._el.content.style.paddingRight = n, this._el.content.style.width = s, this._el.call_to_action && (this._el.call_to_action.style.paddingLeft = o, this._el.call_to_action.style.paddingRight = n, this._el.call_to_action.style.width = s), this.options.height = e || this._el.container.offsetHeight, this._media && (!this.has.text && this.has.headline ? this._media.updateDisplay(this.options.width, this.options.height - this._text.headlineHeight(), i) : this._media.updateDisplay(this.options.width, this.options.height, i))
            }
        }
        P(Dt, W, F);
        class St {
            constructor(t, e, i) {
                this.mousedrag = {
                    down: "mousedown",
                    up: "mouseup",
                    leave: "mouseleave",
                    move: "mousemove"
                }, this.touchdrag = {
                    down: "touchstart",
                    up: "touchend",
                    leave: "mouseleave",
                    move: "touchmove"
                }, this._el = {
                    drag: t,
                    move: t
                }, e && (this._el.move = e), this.options = {
                    snap: !1,
                    enable: {
                        x: !0,
                        y: !0
                    },
                    constraint: {
                        top: !1,
                        bottom: !1,
                        left: 0,
                        right: !1
                    },
                    momentum_multiplier: 2e3,
                    duration: 1e3,
                    ease: U.easeInOutQuint
                }, this.animator = null, this.dragevent = this.mousedrag, x && (this.dragevent = this.touchdrag), this.data = {
                    sliding: !1,
                    direction: "none",
                    pagex: {
                        start: 0,
                        end: 0
                    },
                    pagey: {
                        start: 0,
                        end: 0
                    },
                    pos: {
                        start: {
                            x: 0,
                            y: 0
                        },
                        end: {
                            x: 0,
                            y: 0
                        }
                    },
                    new_pos: {
                        x: 0,
                        y: 0
                    },
                    new_pos_parent: {
                        x: 0,
                        y: 0
                    },
                    time: {
                        start: 0,
                        end: 0
                    },
                    touch: !1
                }, T(this.options, i)
            }
            enable(t) {
                st.addListener(this._el.drag, this.dragevent.down, this._onDragStart, this), st.addListener(this._el.drag, this.dragevent.up, this._onDragEnd, this), this.data.pos.start = 0, this._el.move.style.left = this.data.pos.start.x + "px", this._el.move.style.top = this.data.pos.start.y + "px", this._el.move.style.position = "absolute"
            }
            disable() {
                st.removeListener(this._el.drag, this.dragevent.down, this._onDragStart, this), st.removeListener(this._el.drag, this.dragevent.up, this._onDragEnd, this)
            }
            stopMomentum() {
                this.animator && this.animator.stop()
            }
            updateConstraint(t) {
                this.options.constraint = t
            }
            _onDragStart(t) {
                this.animator && this.animator.stop(), x ? t.originalEvent ? (this.data.pagex.start = t.originalEvent.touches[0].screenX, this.data.pagey.start = t.originalEvent.touches[0].screenY) : (this.data.pagex.start = t.targetTouches[0].screenX, this.data.pagey.start = t.targetTouches[0].screenY) : (this.data.pagex.start = t.pageX, this.data.pagey.start = t.pageY), this.options.enable.x, this.options.enable.y, this.data.pos.start = {
                    x: this._el.move.offsetLeft,
                    y: this._el.move.offsetTop
                }, this.data.time.start = (new Date).getTime(), this.fire("dragstart", this.data), st.addListener(this._el.drag, this.dragevent.move, this._onDragMove, this), st.addListener(this._el.drag, this.dragevent.leave, this._onDragEnd, this)
            }
            _onDragEnd(t) {
                this.data.sliding = !1, st.removeListener(this._el.drag, this.dragevent.move, this._onDragMove, this), st.removeListener(this._el.drag, this.dragevent.leave, this._onDragEnd, this), this.fire("dragend", this.data), this._momentum()
            }
            _onDragMove(t) {
                var e = {
                    x: 0,
                    y: 0
                };
                this.data.sliding = !0, x ? t.originalEvent ? (this.data.pagex.end = t.originalEvent.touches[0].screenX, this.data.pagey.end = t.originalEvent.touches[0].screenY) : (this.data.pagex.end = t.targetTouches[0].screenX, this.data.pagey.end = t.targetTouches[0].screenY) : (this.data.pagex.end = t.pageX, this.data.pagey.end = t.pageY), e.x = this.data.pagex.start - this.data.pagex.end, e.y = this.data.pagey.start - this.data.pagey.end, this.data.pos.end = {
                    x: this._el.drag.offsetLeft,
                    y: this._el.drag.offsetTop
                }, this.data.new_pos.x = -(e.x - this.data.pos.start.x), this.data.new_pos.y = -(e.y - this.data.pos.start.y), this.options.enable.x && Math.abs(e.x) > Math.abs(e.y) && (t.preventDefault(), this._el.move.style.left = this.data.new_pos.x + "px"), this.options.enable.y && Math.abs(e.y) > Math.abs(e.y) && (t.preventDefault(), this._el.move.style.top = this.data.new_pos.y + "px"), this.fire("dragmove", this.data)
            }
            _momentum() {
                var t = {
                        x: 0,
                        y: 0,
                        time: 0
                    },
                    e = {
                        x: 0,
                        y: 0,
                        time: 0
                    },
                    i = {
                        x: !1,
                        y: !1
                    },
                    o = !1;
                this.data.direction = null, t.time = 10 * ((new Date).getTime() - this.data.time.start), e.time = 10 * ((new Date).getTime() - this.data.time.start), e.x = this.options.momentum_multiplier * (Math.abs(this.data.pagex.end) - Math.abs(this.data.pagex.start)), e.y = this.options.momentum_multiplier * (Math.abs(this.data.pagey.end) - Math.abs(this.data.pagey.start)), t.x = Math.round(e.x / e.time), t.y = Math.round(e.y / e.time), this.data.new_pos.x = Math.min(this.data.pos.end.x + t.x), this.data.new_pos.y = Math.min(this.data.pos.end.y + t.y), this.options.enable.x ? this.data.new_pos.x > 0 && (this.data.new_pos.x = 0) : this.data.new_pos.x = this.data.pos.start.x, this.options.enable.y ? this.data.new_pos.y < 0 && (this.data.new_pos.y = 0) : this.data.new_pos.y = this.data.pos.start.y, e.time < 2e3 && (o = !0), this.options.enable.x && this.options.enable.y ? Math.abs(e.x) > Math.abs(e.y) ? i.x = !0 : i.y = !0 : this.options.enable.x ? Math.abs(e.x) > Math.abs(e.y) && (i.x = !0) : Math.abs(e.y) > Math.abs(e.x) && (i.y = !0), i.x && (Math.abs(e.x) > this._el.drag.offsetWidth / 2 && (o = !0), Math.abs(e.x) > 1e4 && (this.data.direction = "left", e.x > 0 && (this.data.direction = "right"))), i.y && (Math.abs(e.y) > this._el.drag.offsetHeight / 2 && (o = !0), Math.abs(e.y) > 1e4 && (this.data.direction = "up", e.y > 0 && (this.data.direction = "down"))), this._animateMomentum(), o && this.data.direction ? this.fire("swipe_" + this.data.direction, this.data) : this.data.direction ? this.fire("swipe_nodirection", this.data) : this.options.snap && (this.animator.stop(), this.animator = rt(this._el.move, {
                    top: this.data.pos.start.y,
                    left: this.data.pos.start.x,
                    duration: this.options.duration,
                    easing: U.easeOutStrong
                }))
            }
            _animateMomentum() {
                var t = {
                        x: this.data.new_pos.x,
                        y: this.data.new_pos.y
                    },
                    e = {
                        duration: this.options.duration,
                        easing: U.easeOutStrong
                    };
                this.options.enable.y && ((this.options.constraint.top || this.options.constraint.bottom) && (t.y > this.options.constraint.bottom ? t.y = this.options.constraint.bottom : t.y < this.options.constraint.top && (t.y = this.options.constraint.top)), e.top = Math.floor(t.y) + "px"), this.options.enable.x && ((this.options.constraint.left || this.options.constraint.right) && (t.x >= this.options.constraint.left ? t.x = this.options.constraint.left : t.x < this.options.constraint.right && (t.x = this.options.constraint.right)), e.left = Math.floor(t.x) + "px"), this.animator = rt(this._el.move, e), this.fire("momentum", this.data)
            }
        }
        P(St, W);
        class Ct {
            constructor(t, e, i, o) {
                this._el = {
                    container: {},
                    background: {},
                    slider_container_mask: {},
                    slider_container: {},
                    slider_item_container: {}
                }, this._nav = {}, this._nav.previous = {}, this._nav.next = {}, this.slide_spacing = 0, this._slides = [], this._swipable = 0, this.preloadTimer, this._message, this.current_slide = 0, this.current_bg_color = null, this.data = {}, this.options = {
                    id: "",
                    layout: "portrait",
                    width: 600,
                    height: 600,
                    default_bg_color: {
                        r: 256,
                        g: 256,
                        b: 256
                    },
                    slide_padding_lr: 40,
                    start_at_slide: 1,
                    slide_default_fade: "0%",
                    duration: 1e3,
                    ease: U.easeInOutQuint,
                    dragging: !0,
                    trackResize: !0
                }, "object" == typeof t ? (this._el.container = t, this.options.id = S(6, "vco")) : (this.options.id = t, this._el.container = I.get(t)), this._el.container.id || (this._el.container.id = this.options.id), this.animator = null, this.animator_background = null, T(this.options, i), T(this.data, e), o && this.init()
            }
            init() {
                this._initLayout(), this._initEvents(), this._initData(), this._updateDisplay(), this.goTo(this.options.start_at_slide), this._onLoaded(), this._introInterface()
            }
            updateDisplay(t, e, i, o) {
                this._updateDisplay(t, e, i, o)
            }
            createSlide(t) {
                this._createSlide(t)
            }
            createSlides(t) {
                this._createSlides(t)
            }
            _createSlides(t) {
                for (var e = 0; e < t.length; e++) "" == t[e].uniqueid && (t[e].uniqueid = S(6, "vco-slide")), 0 == e ? this._createSlide(t[e], !0) : this._createSlide(t[e], !1)
            }
            _createSlide(t, e) {
                var i = new Dt(t, this.options, e);
                this._addSlide(i), this._slides.push(i)
            }
            _destroySlide(t) {
                this._removeSlide(t);
                for (var e = 0; e < this._slides.length; e++) this._slides[e] == t && this._slides.splice(e, 1)
            }
            _addSlide(t) {
                t.addTo(this._el.slider_item_container), t.on("added", this._onSlideAdded, this), t.on("background_change", this._onBackgroundChange, this)
            }
            _removeSlide(t) {
                t.removeFrom(this._el.slider_item_container), t.off("added", this._onSlideAdded, this), t.off("background_change", this._onBackgroundChange)
            }
            goToId(t, e, i) {
                _n = "string" == typeof t || t instanceof String ? function (t, e, i) {
                    for (var o = 0, n = 0; n < e.length; n++) e[n].data[i] == t && (o = n);
                    return o
                }(t, this._slides, "uniqueid") : t, this.goTo(_n, e, i)
            }
            goTo(t, e, i) {
                var o = this;
                this.changeBackground({
                    color_value: "",
                    image: !1
                }), this.preloadTimer && clearTimeout(this.preloadTimer);
                for (var n = 0; n < this._slides.length; n++) this._slides[n].setActive(!1);
                t < this._slides.length && t >= 0 && (this.current_slide = t, this.animator && this.animator.stop(), this._swipable && this._swipable.stopMomentum(), e ? (this._el.slider_container.style.left = -this.slide_spacing * t + "px", this._onSlideChange(i)) : this.animator = rt(this._el.slider_container, {
                    left: -this.slide_spacing * t + "px",
                    duration: this.options.duration,
                    easing: this.options.ease,
                    complete: this._onSlideChange(i)
                }), this._slides[this.current_slide].setActive(!0), this._slides[this.current_slide + 1] ? (this.showNav(this._nav.next, !0), this._nav.next.update(this.getNavInfo(this._slides[this.current_slide + 1]))) : this.showNav(this._nav.next, !1), this._slides[this.current_slide - 1] ? (this.showNav(this._nav.previous, !0), this._nav.previous.update(this.getNavInfo(this._slides[this.current_slide - 1]))) : this.showNav(this._nav.previous, !1), this.preloadTimer = setTimeout((function () {
                    o.preloadSlides()
                }), this.options.duration))
            }
            preloadSlides() {
                this._slides[this.current_slide + 1] && (this._slides[this.current_slide + 1].loadMedia(), this._slides[this.current_slide + 1].scrollToTop()), this._slides[this.current_slide + 2] && (this._slides[this.current_slide + 2].loadMedia(), this._slides[this.current_slide + 2].scrollToTop()), this._slides[this.current_slide - 1] && (this._slides[this.current_slide - 1].loadMedia(), this._slides[this.current_slide - 1].scrollToTop()), this._slides[this.current_slide - 2] && (this._slides[this.current_slide - 2].loadMedia(), this._slides[this.current_slide - 2].scrollToTop())
            }
            getNavInfo(t) {
                var e = {
                    title: "",
                    description: ""
                };
                return t.data.text && t.data.text.headline && (e.title = t.data.text.headline), e
            }
            next() {
                this.current_slide + 1 < this._slides.length ? this.goTo(this.current_slide + 1) : this.goTo(this.current_slide)
            }
            previous() {
                this.current_slide - 1 >= 0 ? this.goTo(this.current_slide - 1) : this.goTo(this.current_slide)
            }
            showNav(t, e) {
                this.options.width <= 500 && b || (e ? t.show() : t.hide())
            }
            changeBackground(t) {
                var e, i = this,
                    o = !1,
                    n = {
                        r: 256,
                        g: 256,
                        b: 256
                    },
                    s = this.options.slide_default_fade,
                    a = "";
                this._el.background.getAttribute("style");
                n = t.color_value ? function (t) {
                    t = t.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (function (t, e, i, o) {
                        return e + e + i + i + o + o
                    }));
                    var e = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);
                    return e ? {
                        r: parseInt(e[1], 16),
                        g: parseInt(e[2], 16),
                        b: parseInt(e[3], 16)
                    } : null
                }(t.color_value) : this.options.default_bg_color, this.animator_background && this.animator_background.stop(), e = n.r + "," + n.g + "," + n.b, this.current_bg_color && this.current_bg_color == e || (this.current_bg_color = e, o = !0), o && ("landscape" == this.options.layout ? (this._nav.next.setColor(!1), this._nav.previous.setColor(!1), n.r < 255 && n.g < 255 && n.b < 255 && (s = "15%"), t.image && (s = "0%"), a += "opacity:0;", a += "background-image: -webkit-linear-gradient(left, color-stop(rgba(" + e + ",0.0001 ) " + s + "), color-stop(rgba(" + e + "," + "0.87) 15%));", a += "background-image: linear-gradient(to right, rgba(" + e + ",0.0001 ) " + s + ", rgba(" + e + "," + "0.87) 15%);", a += "background-repeat: repeat-x;", a += "filter: e(%('progid:DXImageTransform.Microsoft.gradient(startColorstr='%d', endColorstr='%d', GradientType=1)',argb(" + e + ", 0.0001),argb(" + e + ",0.80)));") : (t.color_value ? a += "background-color:" + t.color_value + ";" : a += "background-color:#FFF;", n.r < 255 && n.g < 255 && n.b < 255 || t.image ? (this._nav.next.setColor(!0), this._nav.previous.setColor(!0)) : (this._nav.next.setColor(!1), this._nav.previous.setColor(!1))), this.animator_background = rt(this._el.background, {
                    opacity: 0,
                    duration: this.options.duration / 2,
                    easing: this.options.ease,
                    complete: function () {
                        i.fadeInBackground(a)
                    }
                }))
            }
            fadeInBackground(t) {
                this.animator_background && this.animator_background.stop(), t && this._el.background.setAttribute("style", t), this.animator_background = rt(this._el.background, {
                    opacity: 1,
                    duration: this.options.duration / 2,
                    easing: this.options.ease
                })
            }
            _updateDisplay(t, e, i, o) {
                var n, s;
                s = void 0 === o ? this.options.layout : o, this.options.layout = s, this.slide_spacing = 2 * this.options.width, this.options.width = t || this._el.container.offsetWidth, this.options.height = e || this._el.container.offsetHeight, n = this.options.height / 2, this._nav.next.setPosition({
                    top: n
                }), this._nav.previous.setPosition({
                    top: n
                });
                for (var a = 0; a < this._slides.length; a++) this._slides[a].updateDisplay(this.options.width, this.options.height, s), this._slides[a].setPosition({
                    left: this.slide_spacing * a,
                    top: 0
                });
                this.goTo(this.current_slide, !0, !0)
            }
            _introInterface() {
                if (this.options.call_to_action) {
                    var t = R.messages.start;
                    "" != this.options.call_to_action_text && (t = this.options.call_to_action_text), this._slides[0].addCallToAction(t), this._slides[0].on("call_to_action", this.next, this)
                }
                this.options.width <= this.options.skinny_size || (this._nav.next.updatePosition({
                    right: "130"
                }, !1, 3 * this.options.duration, this.options.ease, -100, !0), this._nav.previous.updatePosition({
                    left: "-100"
                }, !0, 3 * this.options.duration, this.options.ease, -200, !0))
            }
            _initLayout() {
                this._el.container.className += " vco-storyslider", this._el.slider_container_mask = I.create("div", "vco-slider-container-mask", this._el.container), this._el.background = I.create("div", "vco-slider-background", this._el.container), this._el.slider_container = I.create("div", "vco-slider-container vcoanimate", this._el.slider_container_mask), this._el.slider_item_container = I.create("div", "vco-slider-item-container", this._el.slider_container), this.options.width = this._el.container.offsetWidth, this.options.height = this._el.container.offsetHeight, this._nav.previous = new lt({
                    title: "Previous",
                    description: "description"
                }, {
                    direction: "previous"
                }), this._nav.next = new lt({
                    title: "Next",
                    description: "description"
                }, {
                    direction: "next"
                }), this._nav.next.addTo(this._el.container), this._nav.previous.addTo(this._el.container), this._el.slider_container.style.left = "0px", x && (this._swipable = new St(this._el.slider_container_mask, this._el.slider_container, {
                    enable: {
                        x: !0,
                        y: !1
                    },
                    snap: !0
                }), this._swipable.enable(), this._message = new ct({}, {
                    message_class: "vco-message-full",
                    message_icon_class: "vco-icon-swipe-left"
                }), this._message.updateMessage(R.buttons.swipe_to_navigate), this._message.addTo(this._el.container))
            }
            _initEvents() {
                this._nav.next.on("clicked", this._onNavigation, this), this._nav.previous.on("clicked", this._onNavigation, this), this._message && this._message.on("clicked", this._onMessageClick, this), this._swipable && (this._swipable.on("swipe_left", this._onNavigation, this), this._swipable.on("swipe_right", this._onNavigation, this), this._swipable.on("swipe_nodirection", this._onSwipeNoDirection, this))
            }
            _initData() {
                this._createSlides(this.data.slides)
            }
            _onBackgroundChange(t) {
                var e = this._slides[this.current_slide].getBackground();
                this.changeBackground(t), this.fire("colorchange", e)
            }
            _onMessageClick(t) {
                this._message.hide()
            }
            _onSwipeNoDirection(t) {
                this.goTo(this.current_slide)
            }
            _onNavigation(t) {
                "next" == t.direction || "left" == t.direction ? this.next() : "previous" != t.direction && "right" != t.direction || this.previous(), this.fire("nav_" + t.direction, this.data)
            }
            _onSlideAdded(t) {
                this.fire("slideAdded", this.data)
            }
            _onSlideRemoved(t) {
                this.fire("slideAdded", this.data)
            }
            _onSlideChange(t) {
                t || this.fire("change", {
                    current_slide: this.current_slide,
                    uniqueid: this._slides[this.current_slide].data.uniqueid
                })
            }
            _onMouseClick(t) {}
            _fireMouseEvent(t) {
                if (this._loaded) {
                    var e = t.type;
                    e = "mouseenter" === e ? "mouseover" : "mouseleave" === e ? "mouseout" : e, this.hasEventListeners(e) && ("contextmenu" === e && st.preventDefault(t), this.fire(e, {
                        latlng: "something",
                        layerPoint: "something else"
                    }))
                }
            }
            _onLoaded() {
                this.fire("loaded", this.data), this.fire("title", {
                    title: this._slides[0].title
                })
            }
        }
        P(Ct, W);
        class Et {
            constructor(t, e, i, o) {
                for (let t in o) {
                    var n = o[t];
                    if ("function" == typeof n) this.on(t, n);
                    else
                        for (var s in n) "function" == typeof n[s] ? this.on(t, n[s]) : console.log("WARNING: Ignoring invalid callback '" + n[s] + "' defined for listener '" + t + "' in StoryMap constructor")
                }
                return this.version = "0.1.16", this.ready = !1, this._el = {
                    container: {},
                    storyslider: {},
                    map: {},
                    menubar: {}
                }, this._el.container = "object" == typeof t ? t : I.get(t), this._storyslider = {}, this._map = {}, this.map = {}, this._menubar = {}, this._loaded = {
                    storyslider: !1,
                    map: !1
                }, this.data = {}, this.options = {
                    script_path: Et.SCRIPT_PATH,
                    height: this._el.container.offsetHeight,
                    width: this._el.container.offsetWidth,
                    layout: "landscape",
                    base_class: "",
                    default_bg_color: {
                        r: 256,
                        g: 256,
                        b: 256
                    },
                    map_size_sticky: 2.5,
                    map_center_offset: null,
                    less_bounce: !1,
                    start_at_slide: 0,
                    call_to_action: !1,
                    call_to_action_text: "",
                    menubar_height: 0,
                    skinny_size: 650,
                    relative_date: !1,
                    duration: 1e3,
                    ease: U.easeInOutQuint,
                    dragging: !0,
                    trackResize: !0,
                    map_type: "stamen:toner-lite",
                    attribution: "",
                    map_mini: !0,
                    map_subdomains: "",
                    map_as_image: !1,
                    map_access_token: "pk.eyJ1IjoibnVrbmlnaHRsYWIiLCJhIjoiczFmd0hPZyJ9.Y_afrZdAjo3u8sz_r8m2Yw",
                    map_background_color: "#d9d9d9",
                    zoomify: {
                        path: "",
                        width: "",
                        height: "",
                        tolerance: .8,
                        attribution: ""
                    },
                    map_height: 300,
                    storyslider_height: 600,
                    slide_padding_lr: 45,
                    slide_default_fade: "0%",
                    menubar_default_y: 0,
                    path_gfx: "gfx",
                    map_popup: !1,
                    zoom_distance: 100,
                    calculate_zoom: !0,
                    line_follows_path: !0,
                    line_color: "#c34528",
                    line_color_inactive: "#CCC",
                    line_join: "miter",
                    line_weight: 3,
                    line_opacity: .8,
                    line_dash: "5,5",
                    show_lines: !0,
                    show_history_line: !0,
                    api_key_flickr: "8f2d5becf7b6ba46570741620054b507",
                    language: "en"
                }, this.current_slide = this.options.start_at_slide, this.animator_map = null, this.animator_storyslider = null, T(this.options, i), this._initData(e), this
            }
            _initData(t) {
                var e = this;
                "string" == typeof t ? fetch(t).then((t => t.json())).then((t => {
                    console.log(t), e.data = t.storymap, e._initOptions()
                })) : "object" == typeof t ? (t.storymap ? e.data = t.storymap : console.log("data must have a storymap property"), e._initOptions()) : (console.log("data has unknown type"), e._initOptions())
            }
            _initOptions() {
                var t = this;
                ! function (t, e) {
                    var i;
                    for (i in t) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
                }(this.options, this.data), "landscape" == this.options.layout && (this.options.map_center_offset = {
                    left: -200,
                    top: 0
                }), "zoomify" == this.options.map_type && this.options.map_as_image && (this.options.map_size_sticky = 2), this.options.map_as_image && (this.options.calculate_zoom = !1), this.options.relative_date ? "undefined" != typeof moment ? t._loadLanguage() : z(this.options.script_path + "/library/moment.js", (function () {
                    t._loadLanguage()
                })) : t._loadLanguage(), y && B(function (t, e) {
                    t.length && "/" == t[t.length - 1] && (t = t.substring(0, t.length - 1)), e.length && "/" == e[0] && (e = e.substring(1));
                    for (var i = t.split("/"), o = e.split("/"), n = [], s = 0, a = i.length; s < a; s++)
                        if (".." == i[s]) n.pop();
                        else {
                            if ("." == i[s]) continue;
                            n.push(i[s])
                        } for (s = 0, a = o.length; s < a; s++)
                        if (".." == o[s]) n.pop();
                        else {
                            if ("." == o[s]) continue;
                            n.push(o[s])
                        } return n.join("/")
                }(this.options.script_path, "../css/fonts/font.emoji.css"), (function () {}))
            }
            _loadLanguage() {
                j(this.options.language), this._onDataLoaded()
            }
            goTo(t) {
                t != this.current_slide && (this.current_slide = t, this._storyslider.goTo(this.current_slide), this._map.goTo(this.current_slide))
            }
            updateDisplay() {
                this.ready && this._updateDisplay()
            }
            _initLayout() {
                this._el.container.className += " vco-storymap", this.options.base_class = this._el.container.className, this._el.menubar = I.create("div", "vco-menubar", this._el.container), this._el.map = I.create("div", "vco-map", this._el.container), this._el.storyslider = I.create("div", "vco-storyslider", this._el.container), this.options.width = this._el.container.offsetWidth, this.options.height = this._el.container.offsetHeight, this._el.map.style.height = "1px", this._el.storyslider.style.top = "1px", this._map = new ot(this._el.map, this.data, this.options), this.map = this._map._map, this._map.on("loaded", this._onMapLoaded, this), this._el.map.style.backgroundColor = this.options.map_background_color, this._menubar = new at(this._el.menubar, this._el.container, this.options), this._storyslider = new Ct(this._el.storyslider, this.data, this.options), this._storyslider.on("loaded", this._onStorySliderLoaded, this), this._storyslider.on("title", this._onTitle, this), this._storyslider.init(), "portrait" == this.options.layout ? (this.options.map_height = this.options.height / this.options.map_size_sticky, this.options.storyslider_height = this.options.height - this._el.menubar.offsetHeight - this.options.map_height - 1, this._menubar.setSticky(0)) : (this.options.menubar_height = this._el.menubar.offsetHeight, this.options.map_height = this.options.height, this.options.storyslider_height = this.options.height - this._el.menubar.offsetHeight - 1, this._menubar.setSticky(this.options.menubar_height)), this._updateDisplay(this.options.map_height, !0, 2e3), this._menubar.show(2e3)
            }
            _initEvents() {
                this._menubar.on("collapse", this._onMenuBarCollapse, this), this._menubar.on("back_to_start", this._onBackToStart, this), this._menubar.on("overview", this._onOverview, this), this._storyslider.on("change", this._onSlideChange, this), this._storyslider.on("colorchange", this._onColorChange, this), this._map.on("change", this._onMapChange, this)
            }
            _updateDisplay(t, e, i) {
                var o = this.options.duration,
                    n = this.options.base_class,
                    s = this;
                i && (o = i), this.options.width = this._el.container.offsetWidth, this.options.height = this._el.container.offsetHeight, this.options.width <= this.options.skinny_size ? this.options.layout = "portrait" : this.options.layout = "landscape", t && (this.options.map_height = t), x && (this.options.layout = M(), n += " vco-mobile"), "portrait" == this.options.layout ? (n += " vco-skinny", this._map.setMapOffset(0, 0), this.options.map_height = this.options.height / this.options.map_size_sticky, this.options.storyslider_height = this.options.height - this.options.map_height - 1, this._menubar.setSticky(0), n += " vco-layout-portrait", e ? (this.animator_map && this.animator_map.stop(), this.animator_map = rt(this._el.map, {
                    height: this.options.map_height + "px",
                    duration: o,
                    easing: U.easeOutStrong,
                    complete: function () {
                        s._map.updateDisplay(s.options.width, s.options.map_height, e, i, s.options.menubar_height)
                    }
                }), this.animator_storyslider && this.animator_storyslider.stop(), this.animator_storyslider = rt(this._el.storyslider, {
                    height: this.options.storyslider_height + "px",
                    duration: o,
                    easing: U.easeOutStrong
                })) : (this._el.map.style.height = Math.ceil(this.options.map_height) + "px", this._el.storyslider.style.height = this.options.storyslider_height + "px"), this._menubar.updateDisplay(this.options.width, this.options.height, e), this._map.updateDisplay(this.options.width, this.options.height, !1), this._storyslider.updateDisplay(this.options.width, this.options.storyslider_height, e, this.options.layout)) : (n += " vco-layout-landscape", this.options.menubar_height = this._el.menubar.offsetHeight, this.options.map_height = this.options.height, this.options.storyslider_height = this.options.height, this._menubar.setSticky(this.options.menubar_height), this._menubar.setSticky(this.options.menubar_height), this._el.map.style.height = this.options.height + "px", this._map.setMapOffset(-this.options.width / 4, 0), this._el.storyslider.style.top = 0, this._el.storyslider.style.height = this.options.storyslider_height + "px", this._menubar.updateDisplay(this.options.width, this.options.height, e), this._map.updateDisplay(this.options.width, this.options.height, e, i), this._storyslider.updateDisplay(this.options.width / 2, this.options.storyslider_height, e, this.options.layout)), ("rtl" == this.options.language.direction || "rtl" == this.options.language.direction) && (n += " vco-rtl"), this._el.container.className = n
            }
            _onDataLoaded(t) {
                this.fire("dataloaded"), this._initLayout(), this._initEvents(), this.ready = !0
            }
            _onTitle(t) {
                this.fire("title", t)
            }
            _onColorChange(t) {
                t.color || t.image ? this._menubar.setColor(!0) : this._menubar.setColor(!1)
            }
            _onSlideChange(t) {
                this.current_slide != t.current_slide && (this.current_slide = t.current_slide, this._map.goTo(this.current_slide), this.fire("change", {
                    current_slide: this.current_slide
                }, this))
            }
            _onMapChange(t) {
                this.current_slide != t.current_marker && (this.current_slide = t.current_marker, this._storyslider.goTo(this.current_slide), this.fire("change", {
                    current_slide: this.current_slide
                }, this))
            }
            _onOverview(t) {
                this._map.markerOverview()
            }
            _onBackToStart(t) {
                this.current_slide = 0, this._map.goTo(this.current_slide), this._storyslider.goTo(this.current_slide), this.fire("change", {
                    current_slide: this.current_slide
                }, this)
            }
            _onMenuBarCollapse(t) {
                this._updateDisplay(t.y, !0)
            }
            _onMouseClick(t) {}
            _fireMouseEvent(t) {
                if (this._loaded) {
                    var e = t.type;
                    e = "mouseenter" === e ? "mouseover" : "mouseleave" === e ? "mouseout" : e, this.hasEventListeners(e) && ("contextmenu" === e && DomEvent.preventDefault(t), this.fire(e, {
                        latlng: "something",
                        layerPoint: "something else"
                    }))
                }
            }
            _onMapLoaded() {
                this._loaded.map = !0, this._onLoaded()
            }
            _onStorySliderLoaded() {
                this._loaded.storyslider = !0, this._onLoaded()
            }
            _onLoaded() {
                this._loaded.storyslider && this._loaded.map && this.fire("loaded", this.data)
            }
        }
        P(Et, W), i(16), window.trace = function (t) {
            console.log(t)
        };
        const Ot = {
            Load: {
                css: B
            },
            getJSON: function (t, e) {
                let i = new XMLHttpRequest;
                i.onreadystatechange = function () {
                    if (i.readyState === XMLHttpRequest.DONE)
                        if (200 === i.status) {
                            let t = JSON.parse(i.responseText);
                            e(t)
                        } else alert("There was a problem with the request.")
                }, i.open("GET", t), i.send()
            },
            StoryMap: Et
        };
        window.VCO = Ot
    })(), KLStoryMap = o
})();
