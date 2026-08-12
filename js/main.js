/*
 * Portfolio — Roberto Chasipanta
 * Basado en BreezyCV (LMPixels)
 */

(function ($) {
    "use strict";

    function portfolioInit() {
        var $grid = $(".portfolio-grid");
        var $filters = $(".portfolio-filters");

        if (!$grid.length) {
            return;
        }

        $grid.shuffle({
            speed: 450,
            itemSelector: "figure"
        });

        $filters.on("click", ".filter", function (e) {
            e.preventDefault();
            $grid.shuffle("update");
            $filters.find(".filter").parent().removeClass("active");
            $(this).parent().addClass("active");
            $grid.shuffle("shuffle", $(this).attr("data-group"));
        });
    }

    function mobileMenuHide() {
        var windowWidth = $(window).width();
        var $siteHeader = $("#site_header");

        if (windowWidth < 1025) {
            $siteHeader.addClass("mobile-menu-hide");
            $(".menu-toggle").removeClass("open");
            setTimeout(function () {
                $siteHeader.addClass("animate");
            }, 500);
        } else {
            $siteHeader.removeClass("animate");
        }
    }

    function customScroll() {
        var windowWidth = $(window).width();
        var $sections = $(".animated-section, .single-page-content");

        $sections.each(function () {
            if (windowWidth > 1024) {
                $(this).perfectScrollbar();
            } else {
                $(this).perfectScrollbar("destroy");
            }
        });
    }

    function initContactForm() {
        var $form = $("#contact_form");
        if (!$form.length) {
            return;
        }

        var captchaExpected = null;
        var minFillMs = 3000;

        function refreshCaptcha() {
            var a = Math.floor(Math.random() * 8) + 2;
            var b = Math.floor(Math.random() * 8) + 1;
            captchaExpected = a + b;
            $("#form_captcha_question").text("Verificación anti-spam: ¿cuánto es " + a + " + " + b + "?");
            $("#form_captcha").val("").parent(".form-group").removeClass("form-group-focus has-error");
            $("#form_captcha").siblings(".help-block").empty();
        }

        function showFormError(message) {
            $form.find(".messages").html(
                '<div class="alert alert-danger alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
                    message +
                    "</div>"
            );
        }

        function isSpamAttempt() {
            // Honeypot visible para bots
            if ($.trim($("#form_website").val() || "") !== "") {
                return true;
            }
            // Envío demasiado rápido = bot
            var startedAt = parseInt($("#form_started_at").val(), 10);
            if (!startedAt || Date.now() - startedAt < minFillMs) {
                return true;
            }
            return false;
        }

        $("#form_started_at").val(String(Date.now()));
        refreshCaptcha();
        $("#captcha_refresh").on("click", function (e) {
            e.preventDefault();
            refreshCaptcha();
        });

        $form.validator();

        $form.on("submit", function (e) {
            if (e.isDefaultPrevented()) {
                return;
            }

            e.preventDefault();

            var answer = parseInt($.trim($("#form_captcha").val()), 10);
            if (isNaN(answer) || answer !== captchaExpected) {
                showFormError("La verificación anti-spam es incorrecta. Inténtalo de nuevo.");
                refreshCaptcha();
                return;
            }

            if (isSpamAttempt()) {
                // Respuesta falsa de éxito para no ayudar a los bots
                $form.find(".messages").html(
                    '<div class="alert alert-success alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Mensaje enviado. Te responderé pronto.</div>'
                );
                $form[0].reset();
                $("#form_started_at").val(String(Date.now()));
                refreshCaptcha();
                return;
            }

            var $submit = $form.find(".btn-send");
            var originalValue = $submit.val();
            $submit.prop("disabled", true).val("Enviando...");

            // No enviar campos de control al correo
            var payload = $form.serializeArray().filter(function (field) {
                return field.name !== "website" &&
                    field.name !== "captcha_answer" &&
                    field.name !== "form_started_at";
            });

            $.ajax({
                type: "POST",
                url: $form.attr("action"),
                data: $.param(payload),
                dataType: "json",
                headers: {
                    Accept: "application/json"
                },
                success: function () {
                    $form.find(".messages").html(
                        '<div class="alert alert-success alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Mensaje enviado. Te responderé pronto.</div>'
                    );
                    $form[0].reset();
                    $form.find(".form-group-focus").removeClass("form-group-focus");
                    $("#form_started_at").val(String(Date.now()));
                    refreshCaptcha();
                },
                error: function () {
                    showFormError("No se pudo enviar el mensaje. Inténtalo de nuevo o escríbeme a maniac787@gmail.com.");
                    refreshCaptcha();
                },
                complete: function () {
                    $submit.prop("disabled", false).val(originalValue);
                }
            });
        });
    }

    $(window)
        .on("load", function () {
            $(".preloader").fadeOut(800, "linear");

            if ($(".animated-sections")[0]) {
                PageTransitions.init({
                    menu: "ul.main-menu"
                });
            }
        })
        .on("resize", function () {
            mobileMenuHide();
            $(".animated-section").each(function () {
                $(this).perfectScrollbar("update");
            });
            customScroll();
        });

    $(document).ready(function () {
        var years = new Date().getFullYear() - 2011;
        $("#mi-fecha").text(years);

        var movementStrength = 23;
        var height = movementStrength / $(document).height();
        var width = movementStrength / $(document).width();

        $("body").on("mousemove", function (e) {
            var pageX = e.pageX - $(document).width() / 2;
            var pageY = e.pageY - $(document).height() / 2;
            var newvalueX = width * pageX * -1;
            var newvalueY = height * pageY * -1;
            var $bg = $(".lm-animated-bg");

            $bg.addClass("transition").css({
                "background-position":
                    "calc(50% + " + newvalueX + "px) calc(50% + " + newvalueY + "px)"
            });

            setTimeout(function () {
                $bg.removeClass("transition");
            }, 300);
        });

        $(".menu-toggle").on("click", function () {
            $("#site_header").addClass("animate");
            $("#site_header").toggleClass("mobile-menu-hide");
            $(".menu-toggle").toggleClass("open");
        });

        $(".main-menu").on("click", "a", function () {
            mobileMenuHide();
        });

        $(".portfolio-grid").imagesLoaded(function () {
            portfolioInit();
        });

        customScroll();
        initContactForm();

        $(".text-rotation").owlCarousel({
            loop: true,
            dots: false,
            nav: false,
            margin: 0,
            items: 1,
            autoplay: true,
            autoplayHoverPause: false,
            autoplayTimeout: 3800,
            animateOut: "animated-section-scaleDown",
            animateIn: "animated-section-scaleUp"
        });

        $(".form-control")
            .val("")
            .on("focusin", function () {
                $(this).parent(".form-group").addClass("form-group-focus");
            })
            .on("focusout", function () {
                if ($(this).val().length === 0) {
                    $(this).parent(".form-group").removeClass("form-group-focus");
                }
            });
    });
})(jQuery);
