/*! Sheet Slider v2.2.0 | Copyright: 2018 zkreations | Licensed under MIT | github.com/zkreations/SheetSlider/blob/master/LICENSE */
var sheetSlider = function() {
    function e() {
        r = setInterval(t, l)
    }
    function t() {
        for (var e = 0; e < s.length; e++)
            if (s[e].checked) {
                e === s.length - 1 ? s[0].checked = !0 : s[e + 1].checked = !0
                break
            }
    }
    function n() {
        clearInterval(r)
    }
    function c() {
        v || e()
    }
    function o() {
        v = !v, n(), h.classList.add("is-active"), v || (t(), c(), h.classList.remove("is-active"))
    }
    var r,
        l = 4e3,
        i = !1,
        s = document.querySelectorAll(".sh-auto input"),
        a = document.querySelector(".sh-auto .sh__content"),
        u = document.querySelectorAll(".sh-auto .sh__btns label"),
        d = document.querySelectorAll(".sh-auto .sh__arrows label"),
        h = document.querySelector(".sh-control"),
        v = !1
    i && (a.addEventListener("mouseover", n), a.addEventListener("mouseout", c)), h && h.addEventListener("click", o)
    for (var f = 0; f < s.length; f++)
        u.length && u[f].addEventListener("click", function() {
            n(), c()
        }), d.length && d[f].addEventListener("click", function() {
            n(), c()
        })
    window.addEventListener("load", function() {
        e()
    })
}()

