/**
 * Site i18n — default: English, secondary: Spanish
 */
(function (window) {
  "use strict";

  var STORAGE_KEY = "site-lang";
  var DEFAULT_LANG = "en";

  var messages = {
    en: {
      "meta.description":
        "Enterprise architect and software developer",
      "role.enterprise": "Enterprise Architect",
      "role.entrepreneur": "Entrepreneur",
      "role.softwareArchitect": "Software Architect",
      "role.developer": "Software Developer",
      "nav.home": "Home",
      "nav.about": "About",
      "nav.resume": "Career",
      "nav.portfolio": "Portfolio",
      "nav.contact": "Contact",
      "cta.resume": "View career",
      "alt.qr": "Contact QR code",
      "about.title": "About <span>Roberto</span>",
      "about.p1":
        'Committed to my profession and the work I support, always giving <span>one hundred percent</span> to every project.',
      "about.p2":
        "Grateful for every lesson learned, and firmly focused on continuous improvement.",
      "about.residence": "Residence",
      "about.servicesTitle": "<span>Architecture</span> and software development",
      "about.architecture": "Architecture",
      "about.architectureDesc":
        "End-to-end project design: structure, tools, and go-live.",
      "about.dev": "Software development",
      "about.devDesc": "Mobile, desktop, and web applications, and APIs.",
      "about.business": "Business",
      "about.businessDesc":
        "Business analysis, decision-support reporting, and IT solutions.",
      "about.admin": "Administration",
      "about.adminDesc": "Administrative portals.",
      "about.statsTitle": "Work <span>stats</span>",
      "about.happyClients": "Happy clients",
      "about.years": "Years in the profession",
      "resume.title": "My career",
      "resume.education": "Education",
      "resume.experience": "Experience",
      "edu.horizontalApps": "Horizontal Applications",
      "edu.horizontalAppsDesc": "Business Intelligence applications.",
      "edu.bi": "Master's in Business Intelligence",
      "edu.biDesc": "Business Intelligence specialization.",
      "edu.informatics": "Computer Engineering",
      "edu.informaticsDesc": "Specialization in software development.",
      "exp.dev": "Software development",
      "exp.medical": "Medical system.",
      "exp.fixes": "Fixes / SQL - JavaScript",
      "exp.lead": "Project Lead",
      "exp.leadDesc":
        "Base applications for modules / components / scheduled tasks / utilities.",
      "exp.avionics":
        "UI development for aircraft construction simulation",
      "exp.architect": "Software Architect",
      "exp.architectDesc":
        "Project architecture design and deployment environment structure",
      "exp.publicModules": "Public modules development",
      "exp.microservices": "Microservices architecture",
      "exp.enterprise": "Enterprise architecture",
      "exp.softwareArch": "Software architecture",
      "skills.analysis": "Skills <span>Analysis</span>",
      "skills.front": "Skills <span>Front</span>",
      "skills.back": "Skills <span>Back</span>",
      "skills.cloud": "Skills <span>Cloud / DevOps</span>",
      "skills.data": "Skills <span>Data / Observability</span>",
      "skills.knowledges": "Knowledges",
      "skills.microservices": "Microservices",
      "skills.reactive": "Reactive paradigms",
      "portfolio.title": "Portfolio | Personal",
      "portfolio.all": "All",
      "portfolio.desktop": "Desktop",
      "portfolio.qwbfs.name": "QWBFS Manager | C++",
      "portfolio.qwbfs.category": "Desktop · Windows & Linux releases",
      "portfolio.littleSharkFlutter.name": "Little Shark | Flutter",
      "portfolio.littleSharkFlutter.category": "Mobile · Google Play",
      "contact.title": "Contact",
      "contact.available": "Available for freelance",
      "contact.formTitle": "How can I <span>help you?</span>",
      "contact.name": "Full name",
      "contact.email": "Email",
      "contact.subject": "Subject",
      "contact.message": "Message",
      "contact.answer": "Your answer",
      "contact.send": "Send message",
      "contact.sending": "Sending...",
      "contact.refreshCaptcha": "New question",
      "contact.mailSubject": "New message from the portfolio",
      "contact.errorName": "Name is required.",
      "contact.errorEmail": "A valid email is required.",
      "contact.errorSubject": "Subject is required.",
      "contact.errorMessage": "Please leave me a message.",
      "contact.errorCaptchaField": "Solve the anti-spam check.",
      "contact.errorCaptcha":
        "The anti-spam check is incorrect. Please try again.",
      "contact.success": "Message sent. I will get back to you soon.",
      "contact.errorSend":
        "Could not send the message. Try again or email me at maniac787@gmail.com.",
      "contact.captchaQuestion": "Anti-spam check: what is {a} + {b}?",
      "contact.whatsappText":
        "Hi, nice to meet you. I am Roberto. Can I help you with software development or architecture?"
    },
    es: {
      "meta.description":
        "Arquitecto empresarial y desarrollador de software",
      "role.enterprise": "Arquitecto empresarial",
      "role.entrepreneur": "Emprendedor",
      "role.softwareArchitect": "Arquitecto de software",
      "role.developer": "Desarrollador de software",
      "nav.home": "Inicio",
      "nav.about": "Yo",
      "nav.resume": "Trayectoria",
      "nav.portfolio": "Portafolio",
      "nav.contact": "Contacto",
      "cta.resume": "Ver trayectoria",
      "alt.qr": "Código QR de contacto",
      "about.title": "Acerca de <span>Roberto</span>",
      "about.p1":
        'Entregado a mi profesión y a las actividades a las cuales brindo apoyo, intentando siempre poner el <span>cien por cien de mí</span> en cada proyecto.',
      "about.p2":
        "Agradecido de cada lección aprendida, y con la firme intención de mejorar continuamente.",
      "about.residence": "Residencia",
      "about.servicesTitle":
        "<span>Arquitectura</span> y desarrollo de software",
      "about.architecture": "Arquitectura",
      "about.architectureDesc":
        "Diseño integral del proyecto; estructura, herramientas, puesta en marcha.",
      "about.dev": "Desarrollo de software",
      "about.devDesc": "Aplicaciones móviles, escritorio, web y APIs.",
      "about.business": "Negocios",
      "about.businessDesc":
        "Análisis del negocio, reportes para toma de decisiones y soluciones informáticas.",
      "about.admin": "Administración",
      "about.adminDesc": "Portales administrativos.",
      "about.statsTitle": "Estadísticas <span>laborales</span>",
      "about.happyClients": "Clientes felices",
      "about.years": "Años en mi profesión",
      "resume.title": "Mi trayectoria",
      "resume.education": "Educación",
      "resume.experience": "Experiencia",
      "edu.horizontalApps": "Aplicaciones Horizontales",
      "edu.horizontalAppsDesc": "Aplicaciones de Inteligencia de Negocios.",
      "edu.bi": "Máster en Inteligencia de Negocios",
      "edu.biDesc": "Especialización en Inteligencia de Negocios.",
      "edu.informatics": "Ingeniería en Informática",
      "edu.informaticsDesc": "Especialidad en Desarrollo de software.",
      "exp.dev": "Desarrollo de software",
      "exp.medical": "Sistema médico.",
      "exp.fixes": "Correcciones / SQL - JavaScript",
      "exp.lead": "Líder de Proyecto",
      "exp.leadDesc":
        "Aplicaciones base para módulos / Componentes / Tareas Programadas / Utilitarios.",
      "exp.avionics":
        "Desarrollo de interfaz para la simulación de construcción de aviones",
      "exp.architect": "Arquitecto de software",
      "exp.architectDesc":
        "Desarrollo de la arquitectura del proyecto y estructura del ambiente de despliegue",
      "exp.publicModules": "Desarrollo de módulos públicos",
      "exp.microservices": "Arquitectura de microservicios",
      "exp.enterprise": "Arquitectura empresarial",
      "exp.softwareArch": "Arquitectura de software",
      "skills.analysis": "Habilidades <span>Análisis</span>",
      "skills.front": "Habilidades <span>Front</span>",
      "skills.back": "Habilidades <span>Back</span>",
      "skills.cloud": "Habilidades <span>Cloud / DevOps</span>",
      "skills.data": "Habilidades <span>Datos / Observabilidad</span>",
      "skills.knowledges": "Conocimientos",
      "skills.microservices": "Microservicios",
      "skills.reactive": "Paradigmas reactivos",
      "portfolio.title": "Portafolio | Personal",
      "portfolio.all": "Todos",
      "portfolio.desktop": "Escritorio",
      "portfolio.qwbfs.name": "QWBFS Manager | C++",
      "portfolio.qwbfs.category": "Escritorio · Releases Windows y Linux",
      "portfolio.littleSharkFlutter.name": "Little Shark | Flutter",
      "portfolio.littleSharkFlutter.category": "Mobile · Google Play",
      "contact.title": "Contacto",
      "contact.available": "Freelance disponible",
      "contact.formTitle": "¿Cómo puedo <span>ayudarte?</span>",
      "contact.name": "Nombre completo",
      "contact.email": "Correo",
      "contact.subject": "Asunto",
      "contact.message": "Mensaje",
      "contact.answer": "Tu respuesta",
      "contact.send": "Enviar mensaje",
      "contact.sending": "Enviando...",
      "contact.refreshCaptcha": "Nueva pregunta",
      "contact.mailSubject": "Nuevo mensaje desde el portafolio",
      "contact.errorName": "El nombre es obligatorio.",
      "contact.errorEmail": "Se requiere un correo válido.",
      "contact.errorSubject": "El asunto es obligatorio.",
      "contact.errorMessage": "Por favor, déjame un mensaje.",
      "contact.errorCaptchaField": "Resuelve la verificación anti-spam.",
      "contact.errorCaptcha":
        "La verificación anti-spam es incorrecta. Inténtalo de nuevo.",
      "contact.success": "Mensaje enviado. Te responderé pronto.",
      "contact.errorSend":
        "No se pudo enviar el mensaje. Inténtalo de nuevo o escríbeme a maniac787@gmail.com.",
      "contact.captchaQuestion":
        "Verificación anti-spam: ¿cuánto es {a} + {b}?",
      "contact.whatsappText":
        "Hola, qué gusto, soy Roberto. ¿Te puedo ayudar con algún tema de desarrollo o arquitectura de software?"
    }
  };

  var currentLang = DEFAULT_LANG;

  function t(key, vars) {
    var table = messages[currentLang] || messages[DEFAULT_LANG];
    var text =
      (table && table[key]) ||
      (messages[DEFAULT_LANG] && messages[DEFAULT_LANG][key]) ||
      key;
    if (vars) {
      Object.keys(vars).forEach(function (name) {
        text = text.replace(new RegExp("\\{" + name + "\\}", "g"), vars[name]);
      });
    }
    return text;
  }

  function applyLanguage(lang) {
    if (!messages[lang]) {
      lang = DEFAULT_LANG;
    }
    currentLang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}

    document.documentElement.setAttribute("lang", lang);

    var desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute("content", t("meta.description"));
    }

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });

    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      el.innerHTML = t(el.getAttribute("data-i18n-html"));
    });

    document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      el.getAttribute("data-i18n-attr")
        .split(";")
        .forEach(function (pair) {
          var parts = pair.split(":");
          if (parts.length < 2) {
            return;
          }
          el.setAttribute(parts[0].trim(), t(parts[1].trim()));
        });
    });

    document.querySelectorAll("[data-i18n-value]").forEach(function (el) {
      el.value = t(el.getAttribute("data-i18n-value"));
    });

    var whatsapp = document.getElementById("whatsapp_link");
    if (whatsapp) {
      whatsapp.setAttribute(
        "href",
        "https://api.whatsapp.com/send?phone=12259106814&text=" +
          encodeURIComponent(t("contact.whatsappText"))
      );
    }

    document.querySelectorAll(".lang-switch [data-lang]").forEach(function (btn) {
      var active = btn.getAttribute("data-lang") === lang;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });

    document.dispatchEvent(
      new CustomEvent("site:langchange", { detail: { lang: lang } })
    );
  }

  function detectInitialLang() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved && messages[saved]) {
        return saved;
      }
    } catch (e) {}
    return DEFAULT_LANG;
  }

  function init() {
    document.querySelectorAll(".lang-switch [data-lang]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        applyLanguage(btn.getAttribute("data-lang"));
      });
    });
    applyLanguage(detectInitialLang());
  }

  window.SiteI18n = {
    t: t,
    setLang: applyLanguage,
    getLang: function () {
      return currentLang;
    },
    init: init
  };
})(window);
