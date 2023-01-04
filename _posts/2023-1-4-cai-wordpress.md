<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en-US">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"><![endif]-->
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<script src="/cdn-cgi/apps/head/5Sc1MYwFsk6T8hF66eE8IwIgllE.js"></script><link rel="profile" href="https://gmpg.org/xfn/11" />
<link rel="pingback" href="https://www.linuxbabe.com/xmlrpc.php" />
<meta name='robots' content='index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' />

<title>Install WordPress on Ubuntu 20.04 with Nginx, MariaDB, PHP7.4 (LEMP)</title>
<meta name="description" content="this tutorial is going to show you how to install WordPress on a Ubuntu 20.04 VPS. How to setup a WordPress website and how to setup a WordPress blog." />
<link rel="canonical" href="https://www.linuxbabe.com/ubuntu/install-wordpress-ubuntu-20-04-nginx-mariadb-php7-4-lemp" />
<meta property="og:locale" content="en_US" />
<meta property="og:type" content="article" />
<meta property="og:title" content="Install WordPress on Ubuntu 20.04 with Nginx, MariaDB, PHP7.4 (LEMP)" />
<meta property="og:description" content="this tutorial is going to show you how to install WordPress on a Ubuntu 20.04 VPS. How to setup a WordPress website and how to setup a WordPress blog." />
<meta property="og:url" content="https://www.linuxbabe.com/ubuntu/install-wordpress-ubuntu-20-04-nginx-mariadb-php7-4-lemp" />
<meta property="og:site_name" content="LinuxBabe" />
<meta property="article:publisher" content="https://www.facebook.com/linuxbabe" />
<meta property="article:published_time" content="2016-08-27T16:48:18+00:00" />
<meta property="article:modified_time" content="2022-06-14T14:46:14+00:00" />
<meta property="og:image" content="https://www.linuxbabe.com/wp-content/uploads/2016/08/install-wordpress-4.6-on-ubuntu-16.04.png" />
<meta property="og:image:width" content="600" />
<meta property="og:image:height" content="300" />
<meta property="og:image:type" content="image/png" />
<meta name="author" content="Xiao Guoan (Admin)" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:creator" content="@linuxbabe" />
<meta name="twitter:site" content="@linuxbabe" />
<meta name="twitter:label1" content="Written by" />
<meta name="twitter:data1" content="Xiao Guoan (Admin)" />
<meta name="twitter:label2" content="Est. reading time" />
<meta name="twitter:data2" content="11 minutes" />
<script type="application/ld+json" class="yoast-schema-graph">{"@context":"https://schema.org","@graph":[{"@type":"WebPage","@id":"https://www.linuxbabe.com/ubuntu/install-wordpress-ubuntu-20-04-nginx-mariadb-php7-4-lemp","url":"https://www.linuxbabe.com/ubuntu/install-wordpress-ubuntu-20-04-nginx-mariadb-php7-4-lemp","name":"Install WordPress on Ubuntu 20.04 with Nginx, MariaDB, PHP7.4 (LEMP)","isPartOf":{"@id":"https://www.linuxbabe.com/#website"},"primaryImageOfPage":{"@id":"https://www.linuxbabe.com/ubuntu/install-wordpress-ubuntu-20-04-nginx-mariadb-php7-4-lemp#primaryimage"},"image":{"@id":"https://www.linuxbabe.com/ubuntu/install-wordpress-ubuntu-20-04-nginx-mariadb-php7-4-lemp#primaryimage"},"thumbnailUrl":"https://www.linuxbabe.com/wp-content/uploads/2016/08/install-wordpress-4.6-on-ubuntu-16.04.png","datePublished":"2016-08-27T16:48:18+00:00","dateModified":"2022-06-14T14:46:14+00:00","author":{"@id":"https://www.linuxbabe.com/#/schema/person/c9aa2c2f31b0e41654b74b6ed7fb0ba9"},"description":"this tutorial is going to show you how to install WordPress on a Ubuntu 20.04 VPS. How to setup a WordPress website and how to setup a WordPress blog.","breadcrumb":{"@id":"https://www.linuxbabe.com/ubuntu/install-wordpress-ubuntu-20-04-nginx-mariadb-php7-4-lemp#breadcrumb"},"inLanguage":"en-US","potentialAction":[{"@type":"ReadAction","target":["https://www.linuxbabe.com/ubuntu/install-wordpress-ubuntu-20-04-nginx-mariadb-php7-4-lemp"]}]},{"@type":"ImageObject","inLanguage":"en-US","@id":"https://www.linuxbabe.com/ubuntu/install-wordpress-ubuntu-20-04-nginx-mariadb-php7-4-lemp#primaryimage","url":"https://www.linuxbabe.com/wp-content/uploads/2016/08/install-wordpress-4.6-on-ubuntu-16.04.png","contentUrl":"https://www.linuxbabe.com/wp-content/uploads/2016/08/install-wordpress-4.6-on-ubuntu-16.04.png","width":600,"height":300},{"@type":"BreadcrumbList","@id":"https://www.linuxbabe.com/ubuntu/install-wordpress-ubuntu-20-04-nginx-mariadb-php7-4-lemp#breadcrumb","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.linuxbabe.com/"},{"@type":"ListItem","position":2,"name":"Install WordPress on Ubuntu 20.04 with Nginx, MariaDB, PHP7.4 (LEMP)"}]},{"@type":"WebSite","@id":"https://www.linuxbabe.com/#website","url":"https://www.linuxbabe.com/","name":"LinuxBabe","description":"Read The Friendly Manual | Linux Sysadmin, Server &amp; Desktop","potentialAction":[{"@type":"SearchAction","target":{"@type":"EntryPoint","urlTemplate":"https://www.linuxbabe.com/?s={search_term_string}"},"query-input":"required name=search_term_string"}],"inLanguage":"en-US"},{"@type":"Person","@id":"https://www.linuxbabe.com/#/schema/person/c9aa2c2f31b0e41654b74b6ed7fb0ba9","name":"Xiao Guoan (Admin)","image":{"@type":"ImageObject","inLanguage":"en-US","@id":"https://www.linuxbabe.com/#/schema/person/image/","url":"https://secure.gravatar.com/avatar/42e9cbb39d606a2cf089d69b84846f6c?s=96&d=https%3A%2F%2Fwww.linuxbabe.com%2Fwp-content%2Fuploads%2F2018%2F06%2Flinuxbabe-comment-avatar-120x120.png&r=g","contentUrl":"https://secure.gravatar.com/avatar/42e9cbb39d606a2cf089d69b84846f6c?s=96&d=https%3A%2F%2Fwww.linuxbabe.com%2Fwp-content%2Fuploads%2F2018%2F06%2Flinuxbabe-comment-avatar-120x120.png&r=g","caption":"Xiao Guoan (Admin)"},"description":"If my answer helped you, please consider supporting this site.","sameAs":["https://twitter.com/linuxbabe"],"url":"https://www.linuxbabe.com/author/xiao-guoan"}]}</script>

<link rel='dns-prefetch' href='//fonts.googleapis.com' />
<link rel='dns-prefetch' href='//m9m6e2w5.stackpathcdn.com' />
<link rel='dns-prefetch' href='//cdn.shareaholic.net' />
<link rel='dns-prefetch' href='//www.shareaholic.net' />
<link rel='dns-prefetch' href='//analytics.shareaholic.com' />
<link rel='dns-prefetch' href='//recs.shareaholic.com' />
<link rel='dns-prefetch' href='//partner.shareaholic.com' />
<link rel="alternate" type="application/rss+xml" title="LinuxBabe &raquo; Feed" href="https://www.linuxbabe.com/feed" />
<link rel="alternate" type="application/rss+xml" title="LinuxBabe &raquo; Comments Feed" href="https://www.linuxbabe.com/comments/feed" />
<link rel="alternate" type="application/rss+xml" title="LinuxBabe &raquo; Install WordPress on Ubuntu 20.04 with Nginx, MariaDB, PHP7.4 (LEMP) Comments Feed" href="https://www.linuxbabe.com/ubuntu/install-wordpress-ubuntu-20-04-nginx-mariadb-php7-4-lemp/feed" />

<link rel='preload' href='//cdn.shareaholic.net/assets/pub/shareaholic.js' as='script' />
<script data-no-minify='1' data-cfasync='false'>
_SHR_SETTINGS = {"endpoints":{"local_recs_url":"https:\/\/www.linuxbabe.com\/wp-admin\/admin-ajax.php?action=shareaholic_permalink_related","ajax_url":"https:\/\/www.linuxbabe.com\/wp-admin\/admin-ajax.php","share_counts_url":"https:\/\/www.linuxbabe.com\/wp-admin\/admin-ajax.php?action=shareaholic_share_counts_api"},"site_id":"3308531406f1e9a7f36ab21ef174a1d6","url_components":{"year":"2016","monthnum":"08","day":"27","hour":"09","minute":"48","second":"18","post_id":"5102","postname":"install-wordpress-ubuntu-20-04-nginx-mariadb-php7-4-lemp","category":"ubuntu"}};
</script>
<script data-no-minify='1' data-cfasync='false' src='//cdn.shareaholic.net/assets/pub/shareaholic.js' data-shr-siteid='3308531406f1e9a7f36ab21ef174a1d6' async></script>

<meta name='shareaholic:site_name' content='LinuxBabe' />
<meta name='shareaholic:language' content='en-US' />
<meta name='shareaholic:url' content='https://www.linuxbabe.com/ubuntu/install-wordpress-ubuntu-20-04-nginx-mariadb-php7-4-lemp' />
<meta name='shareaholic:keywords' content='tag:wordpress, tag:install wordpress, cat:ubuntu, type:post' />
<meta name='shareaholic:article_published_time' content='2016-08-27T09:48:18+08:00' />
<meta name='shareaholic:article_modified_time' content='2022-06-14T22:46:14+08:00' />
<meta name='shareaholic:shareable_page' content='true' />
<meta name='shareaholic:article_author_name' content='Xiao Guoan (Admin)' />
<meta name='shareaholic:site_id' content='3308531406f1e9a7f36ab21ef174a1d6' />
<meta name='shareaholic:wp_version' content='9.7.6' />
<meta name='shareaholic:image' content='https://www.linuxbabe.com/wp-content/uploads/2016/08/install-wordpress-4.6-on-ubuntu-16.04-300x150.png' />

<link rel='stylesheet' id='wp-block-library-css' href='https://www.linuxbabe.com/wp-includes/css/dist/block-library/style.min.css?ver=6.1.1' type='text/css' media='all' />
<style id='wp-block-library-inline-css' type='text/css'>
.has-text-align-justify{text-align:justify;}
</style>
<link rel='stylesheet' id='wpzoom-social-icons-block-style-css' href='https://www.linuxbabe.com/wp-content/plugins/social-icons-widget-by-wpzoom/block/dist/style-wpzoom-social-icons.css?ver=4.2.9' type='text/css' media='all' />
<link rel='stylesheet' id='mediaelement-css' href='https://www.linuxbabe.com/wp-includes/js/mediaelement/mediaelementplayer-legacy.min.css?ver=4.2.17' type='text/css' media='all' />
<link rel='stylesheet' id='wp-mediaelement-css' href='https://www.linuxbabe.com/wp-includes/js/mediaelement/wp-mediaelement.min.css?ver=6.1.1' type='text/css' media='all' />
<link rel='stylesheet' id='classic-theme-styles-css' href='https://www.linuxbabe.com/wp-includes/css/classic-themes.min.css?ver=1' type='text/css' media='all' />
<style id='global-styles-inline-css' type='text/css'>
body{--wp--preset--color--black: #000000;--wp--preset--color--cyan-bluish-gray: #abb8c3;--wp--preset--color--white: #ffffff;--wp--preset--color--pale-pink: #f78da7;--wp--preset--color--vivid-red: #cf2e2e;--wp--preset--color--luminous-vivid-orange: #ff6900;--wp--preset--color--luminous-vivid-amber: #fcb900;--wp--preset--color--light-green-cyan: #7bdcb5;--wp--preset--color--vivid-green-cyan: #00d084;--wp--preset--color--pale-cyan-blue: #8ed1fc;--wp--preset--color--vivid-cyan-blue: #0693e3;--wp--preset--color--vivid-purple: #9b51e0;--wp--preset--gradient--vivid-cyan-blue-to-vivid-purple: linear-gradient(135deg,rgba(6,147,227,1) 0%,rgb(155,81,224) 100%);--wp--preset--gradient--light-green-cyan-to-vivid-green-cyan: linear-gradient(135deg,rgb(122,220,180) 0%,rgb(0,208,130) 100%);--wp--preset--gradient--luminous-vivid-amber-to-luminous-vivid-orange: linear-gradient(135deg,rgba(252,185,0,1) 0%,rgba(255,105,0,1) 100%);--wp--preset--gradient--luminous-vivid-orange-to-vivid-red: linear-gradient(135deg,rgba(255,105,0,1) 0%,rgb(207,46,46) 100%);--wp--preset--gradient--very-light-gray-to-cyan-bluish-gray: linear-gradient(135deg,rgb(238,238,238) 0%,rgb(169,184,195) 100%);--wp--preset--gradient--cool-to-warm-spectrum: linear-gradient(135deg,rgb(74,234,220) 0%,rgb(151,120,209) 20%,rgb(207,42,186) 40%,rgb(238,44,130) 60%,rgb(251,105,98) 80%,rgb(254,248,76) 100%);--wp--preset--gradient--blush-light-purple: linear-gradient(135deg,rgb(255,206,236) 0%,rgb(152,150,240) 100%);--wp--preset--gradient--blush-bordeaux: linear-gradient(135deg,rgb(254,205,165) 0%,rgb(254,45,45) 50%,rgb(107,0,62) 100%);--wp--preset--gradient--luminous-dusk: linear-gradient(135deg,rgb(255,203,112) 0%,rgb(199,81,192) 50%,rgb(65,88,208) 100%);--wp--preset--gradient--pale-ocean: linear-gradient(135deg,rgb(255,245,203) 0%,rgb(182,227,212) 50%,rgb(51,167,181) 100%);--wp--preset--gradient--electric-grass: linear-gradient(135deg,rgb(202,248,128) 0%,rgb(113,206,126) 100%);--wp--preset--gradient--midnight: linear-gradient(135deg,rgb(2,3,129) 0%,rgb(40,116,252) 100%);--wp--preset--duotone--dark-grayscale: url('#wp-duotone-dark-grayscale');--wp--preset--duotone--grayscale: url('#wp-duotone-grayscale');--wp--preset--duotone--purple-yellow: url('#wp-duotone-purple-yellow');--wp--preset--duotone--blue-red: url('#wp-duotone-blue-red');--wp--preset--duotone--midnight: url('#wp-duotone-midnight');--wp--preset--duotone--magenta-yellow: url('#wp-duotone-magenta-yellow');--wp--preset--duotone--purple-green: url('#wp-duotone-purple-green');--wp--preset--duotone--blue-orange: url('#wp-duotone-blue-orange');--wp--preset--font-size--small: 13px;--wp--preset--font-size--medium: 20px;--wp--preset--font-size--large: 36px;--wp--preset--font-size--x-large: 42px;--wp--preset--spacing--20: 0.44rem;--wp--preset--spacing--30: 0.67rem;--wp--preset--spacing--40: 1rem;--wp--preset--spacing--50: 1.5rem;--wp--preset--spacing--60: 2.25rem;--wp--preset--spacing--70: 3.38rem;--wp--preset--spacing--80: 5.06rem;}:where(.is-layout-flex){gap: 0.5em;}body .is-layout-flow > .alignleft{float: left;margin-inline-start: 0;margin-inline-end: 2em;}body .is-layout-flow > .alignright{float: right;margin-inline-start: 2em;margin-inline-end: 0;}body .is-layout-flow > .aligncenter{margin-left: auto !important;margin-right: auto !important;}body .is-layout-constrained > .alignleft{float: left;margin-inline-start: 0;margin-inline-end: 2em;}body .is-layout-constrained > .alignright{float: right;margin-inline-start: 2em;margin-inline-end: 0;}body .is-layout-constrained > .aligncenter{margin-left: auto !important;margin-right: auto !important;}body .is-layout-constrained > :where(:not(.alignleft):not(.alignright):not(.alignfull)){max-width: var(--wp--style--global--content-size);margin-left: auto !important;margin-right: auto !important;}body .is-layout-constrained > .alignwide{max-width: var(--wp--style--global--wide-size);}body .is-layout-flex{display: flex;}body .is-layout-flex{flex-wrap: wrap;align-items: center;}body .is-layout-flex > *{margin: 0;}:where(.wp-block-columns.is-layout-flex){gap: 2em;}.has-black-color{color: var(--wp--preset--color--black) !important;}.has-cyan-bluish-gray-color{color: var(--wp--preset--color--cyan-bluish-gray) !important;}.has-white-color{color: var(--wp--preset--color--white) !important;}.has-pale-pink-color{color: var(--wp--preset--color--pale-pink) !important;}.has-vivid-red-color{color: var(--wp--preset--color--vivid-red) !important;}.has-luminous-vivid-orange-color{color: var(--wp--preset--color--luminous-vivid-orange) !important;}.has-luminous-vivid-amber-color{color: var(--wp--preset--color--luminous-vivid-amber) !important;}.has-light-green-cyan-color{color: var(--wp--preset--color--light-green-cyan) !important;}.has-vivid-green-cyan-color{color: var(--wp--preset--color--vivid-green-cyan) !important;}.has-pale-cyan-blue-color{color: var(--wp--preset--color--pale-cyan-blue) !important;}.has-vivid-cyan-blue-color{color: var(--wp--preset--color--vivid-cyan-blue) !important;}.has-vivid-purple-color{color: var(--wp--preset--color--vivid-purple) !important;}.has-black-background-color{background-color: var(--wp--preset--color--black) !important;}.has-cyan-bluish-gray-background-color{background-color: var(--wp--preset--color--cyan-bluish-gray) !important;}.has-white-background-color{background-color: var(--wp--preset--color--white) !important;}.has-pale-pink-background-color{background-color: var(--wp--preset--color--pale-pink) !important;}.has-vivid-red-background-color{background-color: var(--wp--preset--color--vivid-red) !important;}.has-luminous-vivid-orange-background-color{background-color: var(--wp--preset--color--luminous-vivid-orange) !important;}.has-luminous-vivid-amber-background-color{background-color: var(--wp--preset--color--luminous-vivid-amber) !important;}.has-light-green-cyan-background-color{background-color: var(--wp--preset--color--light-green-cyan) !important;}.has-vivid-green-cyan-background-color{background-color: var(--wp--preset--color--vivid-green-cyan) !important;}.has-pale-cyan-blue-background-color{background-color: var(--wp--preset--color--pale-cyan-blue) !important;}.has-vivid-cyan-blue-background-color{background-color: var(--wp--preset--color--vivid-cyan-blue) !important;}.has-vivid-purple-background-color{background-color: var(--wp--preset--color--vivid-purple) !important;}.has-black-border-color{border-color: var(--wp--preset--color--black) !important;}.has-cyan-bluish-gray-border-color{border-color: var(--wp--preset--color--cyan-bluish-gray) !important;}.has-white-border-color{border-color: var(--wp--preset--color--white) !important;}.has-pale-pink-border-color{border-color: var(--wp--preset--color--pale-pink) !important;}.has-vivid-red-border-color{border-color: var(--wp--preset--color--vivid-red) !important;}.has-luminous-vivid-orange-border-color{border-color: var(--wp--preset--color--luminous-vivid-orange) !important;}.has-luminous-vivid-amber-border-color{border-color: var(--wp--preset--color--luminous-vivid-amber) !important;}.has-light-green-cyan-border-color{border-color: var(--wp--preset--color--light-green-cyan) !important;}.has-vivid-green-cyan-border-color{border-color: var(--wp--preset--color--vivid-green-cyan) !important;}.has-pale-cyan-blue-border-color{border-color: var(--wp--preset--color--pale-cyan-blue) !important;}.has-vivid-cyan-blue-border-color{border-color: var(--wp--preset--color--vivid-cyan-blue) !important;}.has-vivid-purple-border-color{border-color: var(--wp--preset--color--vivid-purple) !important;}.has-vivid-cyan-blue-to-vivid-purple-gradient-background{background: var(--wp--preset--gradient--vivid-cyan-blue-to-vivid-purple) !important;}.has-light-green-cyan-to-vivid-green-cyan-gradient-background{background: var(--wp--preset--gradient--light-green-cyan-to-vivid-green-cyan) !important;}.has-luminous-vivid-amber-to-luminous-vivid-orange-gradient-background{background: var(--wp--preset--gradient--luminous-vivid-amber-to-luminous-vivid-orange) !important;}.has-luminous-vivid-orange-to-vivid-red-gradient-background{background: var(--wp--preset--gradient--luminous-vivid-orange-to-vivid-red) !important;}.has-very-light-gray-to-cyan-bluish-gray-gradient-background{background: var(--wp--preset--gradient--very-light-gray-to-cyan-bluish-gray) !important;}.has-cool-to-warm-spectrum-gradient-background{background: var(--wp--preset--gradient--cool-to-warm-spectrum) !important;}.has-blush-light-purple-gradient-background{background: var(--wp--preset--gradient--blush-light-purple) !important;}.has-blush-bordeaux-gradient-background{background: var(--wp--preset--gradient--blush-bordeaux) !important;}.has-luminous-dusk-gradient-background{background: var(--wp--preset--gradient--luminous-dusk) !important;}.has-pale-ocean-gradient-background{background: var(--wp--preset--gradient--pale-ocean) !important;}.has-electric-grass-gradient-background{background: var(--wp--preset--gradient--electric-grass) !important;}.has-midnight-gradient-background{background: var(--wp--preset--gradient--midnight) !important;}.has-small-font-size{font-size: var(--wp--preset--font-size--small) !important;}.has-medium-font-size{font-size: var(--wp--preset--font-size--medium) !important;}.has-large-font-size{font-size: var(--wp--preset--font-size--large) !important;}.has-x-large-font-size{font-size: var(--wp--preset--font-size--x-large) !important;}
.wp-block-navigation a:where(:not(.wp-element-button)){color: inherit;}
:where(.wp-block-columns.is-layout-flex){gap: 2em;}
.wp-block-pullquote{font-size: 1.5em;line-height: 1.6;}
</style>
<link rel='stylesheet' id='stcr-style-css' href='https://www.linuxbabe.com/wp-content/plugins/subscribe-to-comments-reloaded/includes/css/stcr-style.css?ver=6.1.1' type='text/css' media='all' />
<link rel='stylesheet' id='wordpress-popular-posts-css-css' href='https://www.linuxbabe.com/wp-content/plugins/wordpress-popular-posts/assets/css/wpp.css?ver=6.1.1' type='text/css' media='all' />
<link rel='stylesheet' id='parent-style-css' href='https://www.linuxbabe.com/wp-content/themes/optimizer/style.css?ver=6.1.1' type='text/css' media='all' />
<link rel='stylesheet' id='child-style-css' href='https://www.linuxbabe.com/wp-content/themes/optimizer-child/style.css?ver=6.1.1' type='text/css' media='all' />
<link rel='stylesheet' id='optimizer-style-css' href='https://www.linuxbabe.com/wp-content/themes/optimizer-child/style.css?ver=6.1.1' type='text/css' media='all' />
<link rel='stylesheet' id='optimizer-style-core-css' href='https://www.linuxbabe.com/wp-content/themes/optimizer/style_core.css?ver=6.1.1' type='text/css' media='all' />
<link rel='stylesheet' id='optimizer-icons-css' href='https://www.linuxbabe.com/wp-content/themes/optimizer/assets/fonts/font-awesome.css?ver=6.1.1' type='text/css' media='all' />
<style id="optimizer_google_fonts-css" media="screen">/* cyrillic-ext */
@font-face {
  font-family: 'Fira Sans';
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: url(/fonts.gstatic.com/s/firasans/v16/va9C4kDNxMZdWfMOD5VvkrjEYTLHdQ.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Fira Sans';
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: url(/fonts.gstatic.com/s/firasans/v16/va9C4kDNxMZdWfMOD5VvkrjNYTLHdQ.woff2) format('woff2');
  unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek-ext */
@font-face {
  font-family: 'Fira Sans';
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: url(/fonts.gstatic.com/s/firasans/v16/va9C4kDNxMZdWfMOD5VvkrjFYTLHdQ.woff2) format('woff2');
  unicode-range: U+1F00-1FFF;
}
/* greek */
@font-face {
  font-family: 'Fira Sans';
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: url(/fonts.gstatic.com/s/firasans/v16/va9C4kDNxMZdWfMOD5VvkrjKYTLHdQ.woff2) format('woff2');
  unicode-range: U+0370-03FF;
}
/* vietnamese */
@font-face {
  font-family: 'Fira Sans';
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: url(/fonts.gstatic.com/s/firasans/v16/va9C4kDNxMZdWfMOD5VvkrjGYTLHdQ.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Fira Sans';
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: url(/fonts.gstatic.com/s/firasans/v16/va9C4kDNxMZdWfMOD5VvkrjHYTLHdQ.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Fira Sans';
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: url(/fonts.gstatic.com/s/firasans/v16/va9C4kDNxMZdWfMOD5VvkrjJYTI.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Fira Sans';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(/fonts.gstatic.com/s/firasans/v16/va9E4kDNxMZdWfMOD5VvmojLeTY.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Fira Sans';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(/fonts.gstatic.com/s/firasans/v16/va9E4kDNxMZdWfMOD5Vvk4jLeTY.woff2) format('woff2');
  unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek-ext */
@font-face {
  font-family: 'Fira Sans';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(/fonts.gstatic.com/s/firasans/v16/va9E4kDNxMZdWfMOD5Vvm4jLeTY.woff2) format('woff2');
  unicode-range: U+1F00-1FFF;
}
/* greek */
@font-face {
  font-family: 'Fira Sans';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(/fonts.gstatic.com/s/firasans/v16/va9E4kDNxMZdWfMOD5VvlIjLeTY.woff2) format('woff2');
  unicode-range: U+0370-03FF;
}
/* vietnamese */
@font-face {
  font-family: 'Fira Sans';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(/fonts.gstatic.com/s/firasans/v16/va9E4kDNxMZdWfMOD5VvmIjLeTY.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Fira Sans';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(/fonts.gstatic.com/s/firasans/v16/va9E4kDNxMZdWfMOD5VvmYjLeTY.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Fira Sans';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(/fonts.gstatic.com/s/firasans/v16/va9E4kDNxMZdWfMOD5Vvl4jL.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Fira Sans';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(/fonts.gstatic.com/s/firasans/v16/va9B4kDNxMZdWfMOD5VnLK3eSxf6TF0.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Fira Sans';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(/fonts.gstatic.com/s/firasans/v16/va9B4kDNxMZdWfMOD5VnLK3eQhf6TF0.woff2) format('woff2');
  unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek-ext */
@font-face {
  font-family: 'Fira Sans';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(/fonts.gstatic.com/s/firasans/v16/va9B4kDNxMZdWfMOD5VnLK3eShf6TF0.woff2) format('woff2');
  unicode-range: U+1F00-1FFF;
}
/* greek */
@font-face {
  font-family: 'Fira Sans';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(/fonts.gstatic.com/s/firasans/v16/va9B4kDNxMZdWfMOD5VnLK3eRRf6TF0.woff2) format('woff2');
  unicode-range: U+0370-03FF;
}
/* vietnamese */
@font-face {
  font-family: 'Fira Sans';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(/fonts.gstatic.com/s/firasans/v16/va9B4kDNxMZdWfMOD5VnLK3eSRf6TF0.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Fira Sans';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(/fonts.gstatic.com/s/firasans/v16/va9B4kDNxMZdWfMOD5VnLK3eSBf6TF0.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Fira Sans';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(/fonts.gstatic.com/s/firasans/v16/va9B4kDNxMZdWfMOD5VnLK3eRhf6.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
</style>
<link rel='stylesheet' id='wpzoom-social-icons-socicon-css' href='https://www.linuxbabe.com/wp-content/plugins/social-icons-widget-by-wpzoom/assets/css/wpzoom-socicon.css?ver=1667914810' type='text/css' media='all' />
<link rel='stylesheet' id='wpzoom-social-icons-genericons-css' href='https://www.linuxbabe.com/wp-content/plugins/social-icons-widget-by-wpzoom/assets/css/genericons.css?ver=1667914810' type='text/css' media='all' />
<link rel='stylesheet' id='wpzoom-social-icons-academicons-css' href='https://www.linuxbabe.com/wp-content/plugins/social-icons-widget-by-wpzoom/assets/css/academicons.min.css?ver=1667914810' type='text/css' media='all' />
<link rel='stylesheet' id='wpzoom-social-icons-font-awesome-3-css' href='https://www.linuxbabe.com/wp-content/plugins/social-icons-widget-by-wpzoom/assets/css/font-awesome-3.min.css?ver=1667914810' type='text/css' media='all' />
<link rel='stylesheet' id='dashicons-css' href='https://www.linuxbabe.com/wp-includes/css/dashicons.min.css?ver=6.1.1' type='text/css' media='all' />
<link rel='stylesheet' id='wpzoom-social-icons-styles-css' href='https://www.linuxbabe.com/wp-content/plugins/social-icons-widget-by-wpzoom/assets/css/wpzoom-social-icons-styles.css?ver=1667914810' type='text/css' media='all' />
<link rel='stylesheet' id='dco-comment-attachment-css' href='https://www.linuxbabe.com/wp-content/plugins/dco-comment-attachment/assets/dco-comment-attachment.css?ver=2.4.0' type='text/css' media='all' />
<link rel='preload' as='font' id='wpzoom-social-icons-font-academicons-ttf-css' href='https://www.linuxbabe.com/wp-content/plugins/social-icons-widget-by-wpzoom/assets/font/academicons.ttf?v=1.9.2' type='font/ttf' crossorigin />
<link rel='preload' as='font' id='wpzoom-social-icons-font-academicons-woff-css' href='https://www.linuxbabe.com/wp-content/plugins/social-icons-widget-by-wpzoom/assets/font/academicons.woff?v=1.9.2' type='font/woff' crossorigin />
<link rel='preload' as='font' id='wpzoom-social-icons-font-fontawesome-3-ttf-css' href='https://www.linuxbabe.com/wp-content/plugins/social-icons-widget-by-wpzoom/assets/font/fontawesome-webfont.ttf?v=4.7.0' type='font/ttf' crossorigin />
<link rel='preload' as='font' id='wpzoom-social-icons-font-fontawesome-3-woff-css' href='https://www.linuxbabe.com/wp-content/plugins/social-icons-widget-by-wpzoom/assets/font/fontawesome-webfont.woff?v=4.7.0' type='font/woff' crossorigin />
<link rel='preload' as='font' id='wpzoom-social-icons-font-fontawesome-3-woff2-css' href='https://www.linuxbabe.com/wp-content/plugins/social-icons-widget-by-wpzoom/assets/font/fontawesome-webfont.woff2?v=4.7.0' type='font/woff2' crossorigin />
<link rel='preload' as='font' id='wpzoom-social-icons-font-genericons-ttf-css' href='https://www.linuxbabe.com/wp-content/plugins/social-icons-widget-by-wpzoom/assets/font/Genericons.ttf' type='font/ttf' crossorigin />
<link rel='preload' as='font' id='wpzoom-social-icons-font-genericons-woff-css' href='https://www.linuxbabe.com/wp-content/plugins/social-icons-widget-by-wpzoom/assets/font/Genericons.woff' type='font/woff' crossorigin />
<link rel='preload' as='font' id='wpzoom-social-icons-font-socicon-ttf-css' href='https://www.linuxbabe.com/wp-content/plugins/social-icons-widget-by-wpzoom/assets/font/socicon.ttf?v=4.2.9' type='font/ttf' crossorigin />
<link rel='preload' as='font' id='wpzoom-social-icons-font-socicon-woff-css' href='https://www.linuxbabe.com/wp-content/plugins/social-icons-widget-by-wpzoom/assets/font/socicon.woff?v=4.2.9' type='font/woff' crossorigin />
<link rel='stylesheet' id='jetpack_css-css' href='https://www.linuxbabe.com/wp-content/plugins/jetpack/css/jetpack.css?ver=11.6' type='text/css' media='all' />
<script type='application/json' id='wpp-json'>
{"sampling_active":0,"sampling_rate":100,"ajax_url":"https:\/\/www.linuxbabe.com\/wp-json\/wordpress-popular-posts\/v1\/popular-posts","api_url":"https:\/\/www.linuxbabe.com\/wp-json\/wordpress-popular-posts","ID":5102,"token":"698088fe7d","lang":0,"debug":0}
</script>
<script type='text/javascript' src='https://www.linuxbabe.com/wp-content/plugins/wordpress-popular-posts/assets/js/wpp.min.js?ver=6.1.1' id='wpp-js-js'></script>
<script type='text/javascript' src='https://www.linuxbabe.com/wp-includes/js/jquery/jquery.min.js?ver=3.6.1' id='jquery-core-js'></script>
<script type='text/javascript' src='https://www.linuxbabe.com/wp-includes/js/jquery/jquery-migrate.min.js?ver=3.3.2' id='jquery-migrate-js'></script>
<script type='text/javascript' id='jquery-migrate-js-after'>
jQuery(document).ready(function(){   jQuery(".so-panel.widget").each(function (){   jQuery(this).attr("id", jQuery(this).find(".so_widget_id").attr("data-panel-id"))  });  });
</script>
<script type='text/javascript' src='https://www.linuxbabe.com/wp-content/themes/optimizer/assets/js/optimizer.js?ver=1' id='optimizer_js-js'></script>
<script type='text/javascript' src='https://www.linuxbabe.com/wp-content/themes/optimizer-child/assets/js/other.js?ver=1' id='optimizer_child_otherjs-js'></script>
<link rel="https://api.w.org/" href="https://www.linuxbabe.com/wp-json/" /><link rel="alternate" type="application/json" href="https://www.linuxbabe.com/wp-json/wp/v2/posts/5102" /><link rel="EditURI" type="application/rsd+xml" title="RSD" href="https://www.linuxbabe.com/xmlrpc.php?rsd" />
<link rel="wlwmanifest" type="application/wlwmanifest+xml" href="https://www.linuxbabe.com/wp-includes/wlwmanifest.xml" />
<meta name="generator" content="WordPress 6.1.1" />
<link rel='shortlink' href='https://www.linuxbabe.com/?p=5102' />
<link rel="alternate" type="application/json+oembed" href="https://www.linuxbabe.com/wp-json/oembed/1.0/embed?url=https%3A%2F%2Fwww.linuxbabe.com%2Fubuntu%2Finstall-wordpress-ubuntu-20-04-nginx-mariadb-php7-4-lemp" />
<link rel="alternate" type="text/xml+oembed" href="https://www.linuxbabe.com/wp-json/oembed/1.0/embed?url=https%3A%2F%2Fwww.linuxbabe.com%2Fubuntu%2Finstall-wordpress-ubuntu-20-04-nginx-mariadb-php7-4-lemp&#038;format=xml" />
<script>document.createElement( "picture" );if(!window.HTMLPictureElement && document.addEventListener) {window.addEventListener("DOMContentLoaded", function() {var s = document.createElement("script");s.src = "https://www.linuxbabe.com/wp-content/plugins/webp-express/js/picturefill.min.js";document.body.appendChild(s);});}</script> <style>img#wpstats{display:none}</style>
<style id="wpp-loading-animation-styles">@-webkit-keyframes bgslide{from{background-position-x:0}to{background-position-x:-200%}}@keyframes bgslide{from{background-position-x:0}to{background-position-x:-200%}}.wpp-widget-placeholder,.wpp-widget-block-placeholder{margin:0 auto;width:60px;height:3px;background:#dd3737;background:linear-gradient(90deg,#dd3737 0%,#571313 10%,#dd3737 100%);background-size:200% auto;border-radius:3px;-webkit-animation:bgslide 1s infinite linear;animation:bgslide 1s infinite linear}</style>
<style type="text/css">

/*Fixed Background*/

	/*BOXED LAYOUT*/
	.site_boxed .layer_wrapper, body.home.site_boxed #slidera {width: 85%;float: left;margin: 0 7.5%;
	background: #ffffff;}
	.site_boxed .stat_bg, .site_boxed .stat_bg_overlay{width: 85%;}
	.site_boxed .social_buttons{background: #ffffff;}
	.site_boxed .center {width: 95%;margin: 0 auto;}
	.site_boxed .head_top .center{ width:95%!important;}



/*Site Content Text Style*/
body, input, textarea{ 
	font-family:Fira Sans; 	font-size:16px; }

.single_metainfo, .single_post .single_metainfo a, a:link, a:visited, .single_post_content .tabs li a{ color:#000000;}

.page_head, .author_div{ background:#EEEFF5; color:#555555;}
.page_head .postitle{color:#555555;}	
.page_head .layerbread a{color:#555555;}	

/*LINK COLOR*/
.org_comment a, .thn_post_wrap a:link, .thn_post_wrap a:visited, .lts_lightbox_content a:link, .lts_lightbox_content a:visited, .athor_desc a:link, .athor_desc a:visited{color:#1e73be;}
.org_comment a:hover, .thn_post_wrap a:link:hover, .lts_lightbox_content a:link:hover, .lts_lightbox_content a:visited:hover, .athor_desc a:link:hover, .athor_desc a:visited:hover{color:#21abce;}

/*-----------------------------Static Slider Content box width------------------------------------*/
.stat_content_inner .center{width:85%;}
.stat_content_inner{bottom:33%; color:#ffffff;}


/*STATIC SLIDE CTA BUTTONS COLORS*/
.static_cta1.cta_hollow, .static_cta1.cta_hollow_big{ background:transparent!important; color:#ffffff;}
.static_cta1.cta_flat, .static_cta1.cta_flat_big, .static_cta1.cta_rounded, .static_cta1.cta_rounded_big, .static_cta1.cta_hollow:hover, .static_cta1.cta_hollow_big:hover{ background:#36abfc!important; color:#ffffff; border-color:#36abfc!important;}

.static_cta2.cta_hollow, .static_cta2.cta_hollow_big{ background:transparent; color:#ffffff;}
.static_cta2.cta_flat, .static_cta2.cta_flat_big, .static_cta2.cta_rounded, .static_cta2.cta_rounded_big, .static_cta2.cta_hollow:hover, .static_cta2.cta_hollow_big:hover{ background:#36abfc!important; color:#ffffff;border-color:#36abfc!important;}


/*-----------------------------COLORS------------------------------------*/
		/*Header Color*/
		.header{ position:relative!important; background:#5e2750;}
				
				
				.home.has_trans_header .header_wrap {float: left; position:relative;width: 100%;}
		.home.has_trans_header .header{position: absolute!important;z-index: 999;}


		/*Boxed Header should have boxed width*/
		body.home.site_boxed .header_wrap.layer_wrapper{width: 85%;float: left;margin: 0 7.5%;}
		
		.home.has_trans_header .header, .home.has_trans_header.page.page-template-page-frontpage_template .header{ background:transparent!important; background-image:none;}
				.home.has_trans_header.page .header{background:#5e2750!important;}
		@media screen and (max-width: 480px){
		.home.has_trans_header .header{ background:#5e2750!important;}
		}
		


		/*LOGO*/
				.logo h2, .logo h1, .logo h2 a, .logo h1 a{ 
			font-family:'Fira Sans'; 			font-size:27px;			color:#dddddd;
		}
		body.has_trans_header.home .header .logo h2, body.has_trans_header.home .header .logo h1, body.has_trans_header.home .header .logo h2 a, body.has_trans_header.home .header .logo h1 a, body.has_trans_header.home span.desc{ color:#fff;}
		#simple-menu{color:#dddddd;}
		body.home.has_trans_header #simple-menu{color:#fff;}
		span.desc{color:#dddddd;}

		/*MENU Text Color*/
		#topmenu ul li a{color:#dddddd;}
		body.has_trans_header.home #topmenu ul li a, body.has_trans_header.home .head_soc .social_bookmarks.bookmark_simple a{ color:#fff;}
		#topmenu ul li.menu_hover a{border-color:#ffffff;}
		#topmenu ul li.menu_hover>a, body.has_trans_header.home #topmenu ul li.menu_hover>a{color:#ffffff;}
		#topmenu ul li.current-menu-item>a{color:#228b22;}
		#topmenu ul li ul{border-color:#ffffff transparent transparent transparent;}
		#topmenu ul.menu>li:hover:after{background-color:#ffffff;}
		
		#topmenu ul li ul li a:hover{ background:#36abfc; color:#FFFFFF;}
		.head_soc .social_bookmarks a{color:#dddddd;}
		.head_soc .social_bookmarks.bookmark_hexagon a:before {border-bottom-color: rgba(221,221,221, 0.3)!important;}
		.head_soc .social_bookmarks.bookmark_hexagon a i {background:rgba(221,221,221, 0.3)!important;}
		.head_soc .social_bookmarks.bookmark_hexagon a:after { border-top-color:rgba(221,221,221, 0.3)!important;}
		

		/*BASE Color*/
		.widget_border, .heading_border, #wp-calendar #today, .thn_post_wrap .more-link:hover, .moretag:hover, .search_term #searchsubmit, .error_msg #searchsubmit, #searchsubmit, .optimizer_pagenav a:hover, .nav-box a:hover .left_arro, .nav-box a:hover .right_arro, .pace .pace-progress, .homeposts_title .menu_border, .pad_menutitle, span.widget_border, .ast_login_widget #loginform #wp-submit, .prog_wrap, .lts_layout1 a.image, .lts_layout2 a.image, .lts_layout3 a.image, .rel_tab:hover .related_img, .wpcf7-submit, .woo-slider #post_slider li.sale .woo_sale, .nivoinner .slide_button_wrap .lts_button, #accordion .slide_button_wrap .lts_button, .img_hover, p.form-submit #submit, .optimposts .type-product a.button.add_to_cart_button{background:#36abfc;} 
		
		.share_active, .comm_auth a, .logged-in-as a, .citeping a, .lay3 h2 a:hover, .lay4 h2 a:hover, .lay5 .postitle a:hover, .nivo-caption p a, .acord_text p a, .org_comment a, .org_ping a, .contact_submit input:hover, .widget_calendar td a, .ast_biotxt a, .ast_bio .ast_biotxt h3, .lts_layout2 .listing-item h2 a:hover, .lts_layout3 .listing-item h2 a:hover, .lts_layout4 .listing-item h2 a:hover, .lts_layout5 .listing-item h2 a:hover, .rel_tab:hover .rel_hover, .post-password-form input[type~=submit], .bio_head h3, .blog_mo a:hover, .ast_navigation a:hover, .lts_layout4 .blog_mo a:hover{color:#36abfc;}
		#home_widgets .widget .thn_wgt_tt, #sidebar .widget .thn_wgt_tt, #footer .widget .thn_wgt_tt, .astwt_iframe a, .ast_bio .ast_biotxt h3, .ast_bio .ast_biotxt a, .nav-box a span, .lay2 h2.postitle:hover a{color:#36abfc;}
		.pace .pace-activity{border-top-color: #36abfc!important;border-left-color: #36abfc!important;}
		.pace .pace-progress-inner{box-shadow: 0 0 10px #36abfc, 0 0 5px #36abfc;
		  -webkit-box-shadow: 0 0 10px #36abfc, 0 0 5px #36abfc;
		  -moz-box-shadow: 0 0 10px #36abfc, 0 0 5px #36abfc;}
		
		.fotorama__thumb-border, .ast_navigation a:hover{ border-color:#36abfc!important;}
		
		
		/*Text Color on BASE COLOR Element*/
		.icon_round a, #wp-calendar #today, .moretag:hover, .search_term #searchsubmit, .error_msg #searchsubmit, .optimizer_pagenav a:hover, .ast_login_widget #loginform #wp-submit, #searchsubmit, .prog_wrap, .rel_tab .related_img i, .lay1 h2.postitle a, .nivoinner .slide_button_wrap .lts_button, #accordion .slide_button_wrap .lts_button, .lts_layout1 .icon_wrap a, .lts_layout2 .icon_wrap a, .lts_layout3 .icon_wrap a, .lts_layout1 .icon_wrap a:hover{color:#FFFFFF;}
		.thn_post_wrap .listing-item .moretag:hover, body .lts_layout1 .listing-item .title, .lts_layout2 .img_wrap .optimizer_plus, .img_hover .icon_wrap a, body .thn_post_wrap .lts_layout1 .icon_wrap a, .wpcf7-submit, .woo-slider #post_slider li.sale .woo_sale, p.form-submit #submit, .optimposts .type-product a.button.add_to_cart_button{color:#FFFFFF;}




/*Sidebar Widget Background Color */
#sidebar .widget{ background:#f7f7f7;}
/*Widget Title Color */
#sidebar .widget .widgettitle, #sidebar .widget .widgettitle a{color:#666666;}
#sidebar .widget li a, #sidebar .widget, #sidebar .widget .widget_wrap{ color:#333333;}
#sidebar .widget .widgettitle, #sidebar .widget .widgettitle a{font-size:20px;}



#footer .widgets .widgettitle, #copyright a{color:#eeeeee;}

/*FOOTER WIDGET COLORS*/
#footer{background: #001829;}
#footer .widgets .widget a, #footer .widgets{color:#999999;}
/*COPYRIGHT COLORS*/
#copyright{background: #001829;}
#copyright a, #copyright{color: #999999;}
.foot_soc .social_bookmarks a{color:#999999;}
.foot_soc .social_bookmarks.bookmark_hexagon a:before {border-bottom-color: rgba(153,153,153, 0.3);}
.foot_soc .social_bookmarks.bookmark_hexagon a i {background:rgba(153,153,153, 0.3);}
.foot_soc .social_bookmarks.bookmark_hexagon a:after { border-top-color:rgba(153,153,153, 0.3);}



/*-------------------------------------TYPOGRAPHY--------------------------------------*/

/*Post Titles, headings and Menu Font*/
h1, h2, h3, h4, h5, h6, #topmenu ul li a, .postitle, .product_title{ font-family:Fira Sans;  }


#topmenu ul li a{font-size:15px;}
#topmenu ul li {line-height: 15px;}

/*Body Text Color*/
body, .home_cat a, .contact_submit input, .comment-form-comment textarea{ color:#000000;}
.single_post_content .tabs li a{ color:#000000;}
.thn_post_wrap .listing-item .moretag{ color:#000000;}
	
	

/*Post Title */
.postitle, .postitle a, .nav-box a, h3#comments, h3#comments_ping, .comment-reply-title, .related_h3, .nocomments, .lts_layout2 .listing-item h2 a, .lts_layout3 .listing-item h2 a, .lts_layout4 .listing-item h2 a, .author_inner h5, .product_title, .woocommerce-tabs h2, .related.products h2, .optimposts .type-product h2.postitle a, .woocommerce ul.products li.product h3{ text-decoration:none; color:#333333;}

/*Woocommerce*/
.optimposts .type-product a.button.add_to_cart_button:hover{background-color:#FFFFFF;color:#36abfc;} 
.optimposts .lay2_wrap .type-product span.price, .optimposts .lay3_wrap .type-product span.price, .optimposts .lay4_wrap  .type-product span.price, .optimposts .lay4_wrap  .type-product a.button.add_to_cart_button{color:#333333;}
.optimposts .lay2_wrap .type-product a.button.add_to_cart_button:before, .optimposts .lay3_wrap .type-product a.button.add_to_cart_button:before{color:#333333;}
.optimposts .lay2_wrap .type-product a.button.add_to_cart_button:hover:before, .optimposts .lay3_wrap .type-product a.button.add_to_cart_button:hover:before, .optimposts .lay4_wrap  .type-product h2.postitle a{color:#36abfc;}



@media screen and (max-width: 480px){
body.home.has_trans_header .header .logo h1 a{ color:#dddddd!important;}
body.home.has_trans_header .header #simple-menu{color:#dddddd!important;}
}

/*USER'S CUSTOM CSS---------------------------------------------------------*/
/* background color for whole site */

#sidebar .widget li a, #sidebar .widget, #sidebar .widget .widget_wrap {
    background-color: #f9f9f9;
}
.wpp-thumbnail {
    margin:0 12px 0 0;
}

body {
    background-color: #f9f9f9
}

.editor-note {
    border: black 1px ;
    padding: 5px 18px;
    background-color: bisque;
   display:inline-block;
   margin:0;
}

#sidebar .widget {
    margin-bottom:0;
}

.widget .form {
  padding-left: 0 !important;
}

pre {
    font-size: 16px;
   font-family: 'Roboto Mono', monospace;
word-break:break-all;
overflow:auto;
white-space:pre-wrap}

.thn_post_wrap code, .org_comment code {
       background-color:#dedede;
       font-size:15px;
     font-family: 'Roboto Mono', monospace;
       padding:1px;
}

.single_wrap{width:68%}
#sidebar{float:left}
#.single_wrap{float:right}
.centerrec {text-align:center}

#sidebar .widget .widgettitle {
        color:#a4286a;
}

/* mailchimp email */
#optin {

padding: 8px 15px;
text-align: center;
width:98%;
}
#optin input {
background: #fff;
border: 1px solid #ccc;
font-size: 15px;
margin-bottom: 10px;
padding: 8px 10px;
border-radius: 3px;
-moz-border-radius: 3px;
-webkit-border-radius: 3px;
box-shadow: 0 2px 2px #ddd;
-moz-box-shadow: 0 2px 2px #ddd;
-webkit-box-shadow: 0 2px 2px #ddd
}
#optin input.name { background: #fff url(images/name.png) no-repeat 10px center; padding-left: 35px }
#optin input.email { background: #fff  no-repeat 10px center; padding-left: 8px;padding-right:0 }
#optin input[type="submit"] {
background: #217b30  repeat-x top;
border: 1px solid #137725;
color: #fff;
cursor: pointer;
font-size: 18px;
font-weight: bold;
padding: 8px 0;
text-shadow: -1px -1px #1c5d28;
width: 100%
}
#optin input[type="submit"]:hover { color: #c6ffd1 }
.required{background-color:#eee}
.page_head{min-height:50px}
.page_head .pagetitle_wrap{margin:20px auto}
iframe{max-width:100%}

.post_foot {
   padding:5px 0;
}
/* Comment Section */
.comments_template {
  margin-top:0;
}
.comm_auth {
     color: #a4286a;
    font-size: 15px;
}
.comm_auth a {
   color:#a4286a;
}
.comment-body {
       padding:0;
       border-top: none;
}
.comm_reply {
    opacity:1;
}
.fa-reply {
    font-size: 11px;
}

.ast_pagenav, .comments_template .navigation {
   margin-top:20px;
}
.comment-form-comment {
   margin-top:0;
   margin-bottom:10px;
}
#reply-title {
    margin:10px 0;
}
.comment-form-comment textarea {
   width:96%;
   padding:2%;
  min-height:100px;
  background-color:#fffffe;
}
.logged-in .comment-form-comment textarea {
   width:96%;
}
.org_comment {
   font-size: 15px;
}
.org_comment  p {
    margin: 8px 0;
}

.org_comment pre {
    font-size: 15px;
    padding: 8px 10px;
}
.org_comment a {
    color:#1e73be;
    border-bottom: solid 1px #1e73be;
}
select#subscribe-reloaded {
    padding: 5px;
}
#commentform a {
    color: #a4286a;
}
p.form-submit #submit {
   background-color: #001829;
   padding: 15px 4%;
}

.comm_wrap {
   margin-bottom:10px;
}
#reply-title small a {
   font-size:14px;
}

p.comment-form-cookies-consent {
    width: 100%;
}

input#wp-comment-cookies-consent {
    width: 1%;
}

p.comment-form-subscriptions {
    width: 100%;
}

input#subscribe-reloaded {
    width: 1%;
}

p.form-submit {
    width: 15%;
    float: right;
}

/* End of Comment Section */
#footer #searchform #s {
    width:80%;
}

/* disable pace activity */
.pace .pace-activity {
        display: none;
}

/* ad code */
div#ezoic-pub-ad-placeholder-106 {
    text-align:center;
}
/*.after-post-title {
    margin: 0 auto;
    width: 30%;
}*/
.before-comment {
    text-align:center;
}
.top-of-page {
    margin: 0 auto;
    width: 70%;
}

/* billboard */
div#ezoic-pub-ad-placeholder-103 {
    text-align: center;
}
span.widget_border {
  width:0;
  height:0;
  margin-bottom:0;
}
#reply-title {
  margin:0;
}
.commentlist li ul li{
  list-style-type: disc;
}
.commentlist #respond {
  margin-top:0;
}
.commentlist .depth-3 {
   width:100%;
}
#hide shareaholic attribution
.shareaholic-recommendations-attribution-container {
   display:none;
}
.ng-scope.shareaholic-recommendations-attribution {
   display:none;
}
.to_top {
      background: rgba(0, 0, 0, 0.8);
      opacity:0.6;
}
.textwidget &gt; p {
    display: none;
}

#sidebar .widget_wrap {
    padding: 10px 10%;
}

.thn_post_wrap a:link, .thn_post_wrap a:visited, .lts_lightbox_content a:link, .lts_lightbox_content a:visited, .athor_desc a:link, .athor_desc a:visited {
       border-bottom: solid 1px #1e73be;
}

.btcpay-form.btcpay-form--block {
  background-color: #aaa;
}/*---------------------------------------------------------*/
</style>
<!--[if IE]>
<style type="text/css">
.text_block_wrap, .home .lay1, .home .lay2, .home .lay3, .home .lay4, .home .lay5, .home_testi .looper, #footer .widgets{opacity:1!important;}
#topmenu ul li a{display: block;padding: 20px; background:url(#);}
</style>
<![endif]-->
<style type="text/css" id="custom-background-css">
body.custom-background { background-color: #f9f9f9; }
</style>
<link rel="icon" href="https://www.linuxbabe.com/wp-content/uploads/2021/08/cropped-linuxbabe-logo-32x32.png" sizes="32x32" />
<link rel="icon" href="https://www.linuxbabe.com/wp-content/uploads/2021/08/cropped-linuxbabe-logo-192x192.png" sizes="192x192" />
<link rel="apple-touch-icon" href="https://www.linuxbabe.com/wp-content/uploads/2021/08/cropped-linuxbabe-logo-180x180.png" />
<meta name="msapplication-TileImage" content="https://www.linuxbabe.com/wp-content/uploads/2021/08/cropped-linuxbabe-logo-270x270.png" />
</head>
<body class="post-template-default single single-post postid-5102 single-format-standard custom-background site_full has_trans_header not_frontpage">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 0 0" width="0" height="0" focusable="false" role="none" style="visibility: hidden; position: absolute; left: -9999px; overflow: hidden;"><defs><filter id="wp-duotone-dark-grayscale"><feColorMatrix color-interpolation-filters="sRGB" type="matrix" values=" .299 .587 .114 0 0 .299 .587 .114 0 0 .299 .587 .114 0 0 .299 .587 .114 0 0 " /><feComponentTransfer color-interpolation-filters="sRGB"><feFuncR type="table" tableValues="0 0.49803921568627" /><feFuncG type="table" tableValues="0 0.49803921568627" /><feFuncB type="table" tableValues="0 0.49803921568627" /><feFuncA type="table" tableValues="1 1" /></feComponentTransfer><feComposite in2="SourceGraphic" operator="in" /></filter></defs></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 0 0" width="0" height="0" focusable="false" role="none" style="visibility: hidden; position: absolute; left: -9999px; overflow: hidden;"><defs><filter id="wp-duotone-grayscale"><feColorMatrix color-interpolation-filters="sRGB" type="matrix" values=" .299 .587 .114 0 0 .299 .587 .114 0 0 .299 .587 .114 0 0 .299 .587 .114 0 0 " /><feComponentTransfer color-interpolation-filters="sRGB"><feFuncR type="table" tableValues="0 1" /><feFuncG type="table" tableValues="0 1" /><feFuncB type="table" tableValues="0 1" /><feFuncA type="table" tableValues="1 1" /></feComponentTransfer><feComposite in2="SourceGraphic" operator="in" /></filter></defs></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 0 0" width="0" height="0" focusable="false" role="none" style="visibility: hidden; position: absolute; left: -9999px; overflow: hidden;"><defs><filter id="wp-duotone-purple-yellow"><feColorMatrix color-interpolation-filters="sRGB" type="matrix" values=" .299 .587 .114 0 0 .299 .587 .114 0 0 .299 .587 .114 0 0 .299 .587 .114 0 0 " /><feComponentTransfer color-interpolation-filters="sRGB"><feFuncR type="table" tableValues="0.54901960784314 0.98823529411765" /><feFuncG type="table" tableValues="0 1" /><feFuncB type="table" tableValues="0.71764705882353 0.25490196078431" /><feFuncA type="table" tableValues="1 1" /></feComponentTransfer><feComposite in2="SourceGraphic" operator="in" /></filter></defs></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 0 0" width="0" height="0" focusable="false" role="none" style="visibility: hidden; position: absolute; left: -9999px; overflow: hidden;"><defs><filter id="wp-duotone-blue-red"><feColorMatrix color-interpolation-filters="sRGB" type="matrix" values=" .299 .587 .114 0 0 .299 .587 .114 0 0 .299 .587 .114 0 0 .299 .587 .114 0 0 " /><feComponentTransfer color-interpolation-filters="sRGB"><feFuncR type="table" tableValues="0 1" /><feFuncG type="table" tableValues="0 0.27843137254902" /><feFuncB type="table" tableValues="0.5921568627451 0.27843137254902" /><feFuncA type="table" tableValues="1 1" /></feComponentTransfer><feComposite in2="SourceGraphic" operator="in" /></filter></defs></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 0 0" width="0" height="0" focusable="false" role="none" style="visibility: hidden; position: absolute; left: -9999px; overflow: hidden;"><defs><filter id="wp-duotone-midnight"><feColorMatrix color-interpolation-filters="sRGB" type="matrix" values=" .299 .587 .114 0 0 .299 .587 .114 0 0 .299 .587 .114 0 0 .299 .587 .114 0 0 " /><feComponentTransfer color-interpolation-filters="sRGB"><feFuncR type="table" tableValues="0 0" /><feFuncG type="table" tableValues="0 0.64705882352941" /><feFuncB type="table" tableValues="0 1" /><feFuncA type="table" tableValues="1 1" /></feComponentTransfer><feComposite in2="SourceGraphic" operator="in" /></filter></defs></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 0 0" width="0" height="0" focusable="false" role="none" style="visibility: hidden; position: absolute; left: -9999px; overflow: hidden;"><defs><filter id="wp-duotone-magenta-yellow"><feColorMatrix color-interpolation-filters="sRGB" type="matrix" values=" .299 .587 .114 0 0 .299 .587 .114 0 0 .299 .587 .114 0 0 .299 .587 .114 0 0 " /><feComponentTransfer color-interpolation-filters="sRGB"><feFuncR type="table" tableValues="0.78039215686275 1" /><feFuncG type="table" tableValues="0 0.94901960784314" /><feFuncB type="table" tableValues="0.35294117647059 0.47058823529412" /><feFuncA type="table" tableValues="1 1" /></feComponentTransfer><feComposite in2="SourceGraphic" operator="in" /></filter></defs></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 0 0" width="0" height="0" focusable="false" role="none" style="visibility: hidden; position: absolute; left: -9999px; overflow: hidden;"><defs><filter id="wp-duotone-purple-green"><feColorMatrix color-interpolation-filters="sRGB" type="matrix" values=" .299 .587 .114 0 0 .299 .587 .114 0 0 .299 .587 .114 0 0 .299 .587 .114 0 0 " /><feComponentTransfer color-interpolation-filters="sRGB"><feFuncR type="table" tableValues="0.65098039215686 0.40392156862745" /><feFuncG type="table" tableValues="0 1" /><feFuncB type="table" tableValues="0.44705882352941 0.4" /><feFuncA type="table" tableValues="1 1" /></feComponentTransfer><feComposite in2="SourceGraphic" operator="in" /></filter></defs></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 0 0" width="0" height="0" focusable="false" role="none" style="visibility: hidden; position: absolute; left: -9999px; overflow: hidden;"><defs><filter id="wp-duotone-blue-orange"><feColorMatrix color-interpolation-filters="sRGB" type="matrix" values=" .299 .587 .114 0 0 .299 .587 .114 0 0 .299 .587 .114 0 0 .299 .587 .114 0 0 " /><feComponentTransfer color-interpolation-filters="sRGB"><feFuncR type="table" tableValues="0.098039215686275 1" /><feFuncG type="table" tableValues="0 0.66274509803922" /><feFuncB type="table" tableValues="0.84705882352941 0.41960784313725" /><feFuncA type="table" tableValues="1 1" /></feComponentTransfer><feComposite in2="SourceGraphic" operator="in" /></filter></defs></svg>
<div class="header_wrap layer_wrapper">

<div class="header">
<div class="center">
<div class="head_inner">

<div class="logo hide_sitetagline">
<h2><a href="https://www.linuxbabe.com/">LinuxBabe</a></h2>
<span class="desc">Read The Friendly Manual | Linux Sysadmin, Server &amp; Desktop</span>
</div>



<a id="simple-menu" href="#sidr"><i class="fa-bars"></i></a>

<div id="topmenu" class="">
<div class="menu-header"><ul id="menu-main-menu" class="menu"><li id="menu-item-6200" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-6200"><a href="#">Distros</a>
<ul class="sub-menu">
<li id="menu-item-8270" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-8270"><a href="https://www.linuxbabe.com/category/debian">Debian</a></li>
<li id="menu-item-3525" class="menu-item menu-item-type-taxonomy menu-item-object-category current-post-ancestor current-menu-parent current-post-parent menu-item-3525"><a href="https://www.linuxbabe.com/category/ubuntu">Ubuntu</a></li>
<li id="menu-item-19533" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-19533"><a href="https://www.linuxbabe.com/category/centos">CentOS</a></li>
<li id="menu-item-7062" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-7062"><a href="https://www.linuxbabe.com/category/opensuse">openSUSE</a></li>
<li id="menu-item-4006" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-4006"><a href="https://www.linuxbabe.com/category/arch">Arch</a></li>
<li id="menu-item-3666" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-3666"><a href="https://www.linuxbabe.com/category/fedora">Fedora</a></li>
</ul>
</li>
<li id="menu-item-148" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-148"><a href="#">Sysadmin</a>
<ul class="sub-menu">
<li id="menu-item-270" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-270"><a href="https://www.linuxbabe.com/category/linux-server">Linux Server</a></li>
<li id="menu-item-272" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-272"><a href="https://www.linuxbabe.com/category/nginx">Nginx</a></li>
<li id="menu-item-271" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-271"><a href="https://www.linuxbabe.com/category/mariadb">MariaDB</a></li>
<li id="menu-item-3387" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-3387"><a href="https://www.linuxbabe.com/category/mail-server">Mail Server</a></li>
<li id="menu-item-9090" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-9090"><a href="https://www.linuxbabe.com/tag/backup">Backup</a></li>
<li id="menu-item-9056" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-9056"><a href="https://www.linuxbabe.com/tag/vpn">VPN Server</a></li>
<li id="menu-item-3251" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-3251"><a href="https://www.linuxbabe.com/category/monitoring">Server Monitoring</a></li>
<li id="menu-item-8204" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-8204"><a href="https://www.linuxbabe.com/tag/security">Security</a></li>
</ul>
</li>
<li id="menu-item-2105" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-has-children menu-item-2105"><a href="https://www.linuxbabe.com/category/desktop-linux">Desktop Apps</a>
<ul class="sub-menu">
<li id="menu-item-4194" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-4194"><a href="https://www.linuxbabe.com/category/themes">Themes</a></li>
<li id="menu-item-3346" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-3346"><a href="https://www.linuxbabe.com/category/games">Games</a></li>
<li id="menu-item-3375" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-3375"><a href="https://www.linuxbabe.com/category/multimedia">Multimedia</a></li>
<li id="menu-item-3555" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-3555"><a href="https://www.linuxbabe.com/category/softphone">Soft phone</a></li>
<li id="menu-item-3583" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-3583"><a href="https://www.linuxbabe.com/category/cloud-storage">Cloud Storage</a></li>
<li id="menu-item-6498" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-6498"><a href="https://www.linuxbabe.com/tag/instant-messenger">Instant Messenger</a></li>
<li id="menu-item-6244" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-6244"><a href="https://www.linuxbabe.com/tag/finance">Finance</a></li>
</ul>
</li>
<li id="menu-item-6196" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-6196"><a href="https://www.linuxbabe.com/tag/self-hosted">Self Hosted</a></li>
<li id="menu-item-21119" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-21119"><a href="https://newsletter.linuxbabe.com/subscription/wkeY5d6pg">Email Subscription</a></li>
<li id="menu-item-11328" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-11328"><a href="https://www.linuxbabe.com/donation">Buy me a beer</a></li>
<li id="menu-item-20682" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-20682"><a href="https://community.linuxbabe.com">Community</a></li>
</ul></div> 
<div class="head_soc">
</div>
</div>

</div>
</div>
</div>
</div>


<div class="post_wrap layer_wrapper">
<div id="content">
<div class="center">

<div class="single_wrap">
<div class="single_post">
<div class="post-5102 post type-post status-publish format-standard has-post-thumbnail hentry category-ubuntu tag-wordpress" id="post-5102">



<div class="single_post_content">
<h1 class="postitle entry-title">Install WordPress on Ubuntu 20.04 with Nginx, MariaDB, PHP7.4 (LEMP)</h1>

<div class="single_metainfo ">
 
<i class="fa-calendar"></i><a class="comm_date post-date updated">Last Updated: June 14th, 2022</a>

<i class="fa-user"></i><a class='vcard author post-author' href="https://www.linuxbabe.com/author/xiao-guoan"><span class='fn author'>Xiao Guoan (Admin)</span></a>

<i class="fa-comments-o"></i><div class="meta_comm"><a href="https://www.linuxbabe.com/ubuntu/install-wordpress-ubuntu-20-04-nginx-mariadb-php7-4-lemp#comments">11 Comments</a></div> 
<i class="fa-th-list"></i><div class="catag_list"><a href="https://www.linuxbabe.com/category/ubuntu" rel="category tag">Ubuntu</a></div>
</div>


<div class="thn_post_wrap">
<p>This tutorial is going to show you how to install WordPress on Ubuntu 20.04 with Nginx, MariaDB and PHP7.4 (LEMP Stack). WordPress is the most popular CMS (Content Management System) in the world. It is estimated that more than a third of websites today are powered by WordPress. PHP7.4 made into the Ubuntu 20.04 repository and WordPress runs perfectly with it.</p>
<h2>Prerequisite</h2>
<p>To follow this tutorial, you need to have an Ubuntu 20.04 server with at least 1GB RAM. If you are looking for a VPS (Virtual Private Server), then you can click <a href="https://www.linuxbabe.com/digitalocean" target="_blank" rel="noopener nofollow noreferrer">this special link</a> to get $50 free credit on DigitalOcean. (For new users only). If you are already a DigitalOcean user, then you can click <a href="https://www.linuxbabe.com/vultr" target="_blank" rel="noopener nofollow noreferrer">this special link</a> to get $50 free credit on Vultr (for new users only).</p>
<p>You also need a domain name, so visitors can type a domain name in the web browser address bar to access your site. I registered my domain name at <a href="https://www.linuxbabe.com/namecheap" target="_blank" rel="noopener nofollow noreferrer">NameCheap</a> because the price is low and they give whois privacy protection free for life.</p>
<p>This tutorial assumes that you have already set up a LEMP stack on Ubuntu 20.04. If not, please check out the following tutorial.</p>
<ul>
<li><a href="https://www.linuxbabe.com/ubuntu/install-lemp-stack-ubuntu-20-04-server-desktop" target="_blank" rel="noopener noreferrer">How to Install LEMP Stack (Nginx, MariaDB, PHP7.4) on Ubuntu 20.04</a></li>
</ul>
<p>After finishing LEMP installation, come back here and read on.</p>
<h2>Step 1: Download WordPress</h2>
<p>SSH into your Ubuntu 20.04 server and update existing software.</p>
<pre>sudo apt update &amp;&amp; sudo apt upgrade</pre>
<p>Next, go to <a href="https://wordpress.org/download/" target="_blank" rel="noopener noreferrer">wordpress.org download page</a> and download the zip archive. You can acquire the direct download link by right-clicking the download button and select <code>copy link location</code>.</p>
<p><picture><source srcset="https://www.linuxbabe.com/wp-content/uploads/2017/10/install-wordpress-on-ubuntu-20.04.webp 1034w, https://www.linuxbabe.com/wp-content/uploads/2017/10/install-wordpress-on-ubuntu-20.04-322x219.webp 322w, https://www.linuxbabe.com/wp-content/uploads/2017/10/install-wordpress-on-ubuntu-20.04-529x360.webp 529w, https://www.linuxbabe.com/wp-content/uploads/2017/10/install-wordpress-on-ubuntu-20.04-640x436.webp 640w" sizes="(max-width: 1034px) 100vw, 1034px" type="image/webp"><img decoding="async" class="aligncenter wp-image-20365 size-full webpexpress-processed" src="https://www.linuxbabe.com/wp-content/uploads/2017/10/install-wordpress-on-ubuntu-20.04.png" alt="install-wordpress-on-ubuntu-20.04" width="1034" height="704" srcset="https://www.linuxbabe.com/wp-content/uploads/2017/10/install-wordpress-on-ubuntu-20.04.png 1034w, https://www.linuxbabe.com/wp-content/uploads/2017/10/install-wordpress-on-ubuntu-20.04-322x219.png 322w, https://www.linuxbabe.com/wp-content/uploads/2017/10/install-wordpress-on-ubuntu-20.04-529x360.png 529w, https://www.linuxbabe.com/wp-content/uploads/2017/10/install-wordpress-on-ubuntu-20.04-640x436.png 640w" sizes="(max-width: 1034px) 100vw, 1034px"></picture></p>
<p>Then at the command line prompt, type in <strong>wget</strong> followed by the direct download link to download WordPress to your Ubuntu 20.04 server.</p>
<pre>wget https://wordpress.org/latest.zip</pre>
<p>Next, extract the zip archive using the command below.</p>
<pre>sudo apt install unzip

sudo mkdir -p /usr/share/nginx

sudo unzip latest.zip -d /usr/share/nginx/</pre>
<p>The archive will be extracted to <code>/usr/share/nginx/</code> directory. A new directory named <code>wordpress</code> will be created (/usr/share/nginx/wordpress). Now we can rename it like below, so it’s easy for us to identify each directory. Replace <code>example.com</code> with your real domain name.</p>
<pre>sudo mv /usr/share/nginx/wordpress /usr/share/nginx/<span style="color: #ff0000;">example.com</span></pre>
<h2>Step 2: Create a Database and User for WordPress Site</h2>
<p>Log into MariaDB shell as root with the following command.</p>
<pre>sudo mariadb -u root</pre>
<p>or</p>
<pre>sudo mysql -u root</pre>
<p>Once you are logged in, create a database for WordPress using the following command. I named it <code>wordpress</code>, but you can use whatever name you like such as your site name. (Don’t leave out the semicolon.)</p>
<pre>create database <span style="color: #ff0000;">wordpress</span>;</pre>
<p>Then enter the command below to create a database user for WordPress. This command also grants all privileges of WordPress database to the user. Replace <code>wpuser</code> and <code>your-password</code> with your preferred username and password.</p>
<pre>grant all privileges on <span style="color: #ff0000;">wordpress</span>.* to <span style="color: #ff0000;">wpuser</span>@localhost identified by '<span style="color: #ff0000;">your-password</span>';</pre>
<p>Flush the privileges table for the changes to take effect and then get out of MariaDB shell.</p>
<pre>flush privileges;

exit;</pre>
<h2>Step 3: Configure WordPress</h2>
<p>Go to your WordPress directory.</p>
<pre>cd /usr/share/nginx/<span style="color: #ff0000;">example.com</span>/</pre>
<p>Copy the sample configuration file and rename it to <code>wp-config.php</code>.</p>
<pre>sudo cp wp-config-sample.php wp-config.php</pre>
<p>Now edit the new config file with a command-line text editor like Nano.</p>
<pre>sudo nano wp-config.php</pre>
<p>Find the following lines and replace the red texts with the database name, username and password you created in the previous step.</p>
<pre>/** The name of the database for WordPress */
define('DB_NAME', '<span style="color: #ff0000;">database_name_here</span>');

/** MySQL database username */
define('DB_USER', '<span style="color: #ff0000;">username_here</span>');

/** MySQL database password */
define('DB_PASSWORD', '<span style="color: #ff0000;">password_here</span>');</pre>
<p>Then scroll down to find the following line.</p>
<pre>$table_prefix = 'wp_';</pre>
<p>By default, every WordPress database table name begins with <code>wp_</code> as the prefix. It&#8217;s highly recommended to change it to something else to improve security. Use random characters like below.</p>
<pre>$table_prefix = '9OzB3g_';</pre>
<p>Save and close the file. To save the file in Nano text editor, press <code>Ctrl+O</code>, then press <code>Enter</code> to confirm. Next, press <code>Ctrl+X</code> to exit.</p>
<p>We also need to set the Nginx user (<code>www-data</code>) as the owner of the WordPress site directory by using the following command.</p>
<pre>sudo chown www-data:www-data /usr/share/nginx/<span style="color: #ff0000;">example.com</span>/ -R</pre>
<h2>Step 4: Create an Nginx Server Block for WordPress</h2>
<p>We will create the server block file in <code>/etc/nginx/conf.d/</code> directory. The file name must end with <code>.conf</code>.</p>
<pre>sudo nano /etc/nginx/conf.d/<span style="color: #ff0000;">example.com</span>.conf</pre>
<p>Put the following texts into the file. Replace the red texts with your own domain name. Don&#8217;t forget to create A records for your domain name in your DNS manager.</p>
<pre>server {
  listen 80;
  listen [::]:80;
  server_name <span style="color: #ff0000;">www.example.com example.com</span>;
  root /usr/share/nginx/<span style="color: #ff0000;">example.com</span>/;
  index index.php index.html index.htm index.nginx-debian.html;

  location / {
    try_files $uri $uri/ /index.php;
  }

   location ~ ^/wp-json/ {
     rewrite ^/wp-json/(.*?)$ /?rest_route=/$1 last;
   }

  location ~* /wp-sitemap.*\.xml {
    try_files $uri $uri/ /index.php$is_args$args;
  }

  error_page 404 /404.html;
  error_page 500 502 503 504 /50x.html;

  client_max_body_size 20M;

  location = /50x.html {
    root /usr/share/nginx/html;
  }

  location ~ \.php$ {
    fastcgi_pass unix:/run/php/<span style="color: #008000;">php7.4-fpm.sock</span>;
    fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    include fastcgi_params;
    include snippets/fastcgi-php.conf;

    # Add headers to serve security related headers
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Permitted-Cross-Domain-Policies none;
    add_header X-Frame-Options "SAMEORIGIN";
  }

  #enable gzip compression
  gzip on;
  gzip_vary on;
  gzip_min_length 1000;
  gzip_comp_level 5;
  gzip_types application/json text/css application/x-javascript application/javascript image/svg+xml;
  gzip_proxied any;

  # A long browser cache lifetime can speed up repeat visits to your page
  location ~* \.(jpg|jpeg|gif|png|webp|svg|woff|woff2|ttf|css|js|ico|xml)$ {
       access_log        off;
       log_not_found     off;
       expires           360d;
  }

  # disable access to hidden files
  location ~ /\.ht {
      access_log off;
      log_not_found off;
      deny all;
  }

}</pre>
<p>Save and close the file. Then test Nginx configurations.</p>
<pre>sudo nginx -t</pre>
<p>If the test is successful, reload Nginx.</p>
<pre>sudo systemctl reload nginx</pre>
<p>Enter your domain name in the browser address bar.</p>
<pre><span style="color: #ff00ff;">example.com</span></pre>
<p>or</p>
<pre><span style="color: #ff00ff;">example.com</span>/wp-admin/install.php</pre>
<p>You shall see the WordPress installation wizard. Select a language.</p>
<p><picture><source srcset="https://www.linuxbabe.com/wp-content/uploads/2017/12/install-wordpress-ubuntu-17.10-lemp.webp 856w, https://www.linuxbabe.com/wp-content/uploads/2017/12/install-wordpress-ubuntu-17.10-lemp-331x219.webp 331w, https://www.linuxbabe.com/wp-content/uploads/2017/12/install-wordpress-ubuntu-17.10-lemp-543x360.webp 543w, https://www.linuxbabe.com/wp-content/uploads/2017/12/install-wordpress-ubuntu-17.10-lemp-300x199.webp 300w" sizes="(max-width: 856px) 100vw, 856px" type="image/webp"><img decoding="async" loading="lazy" class="aligncenter size-full wp-image-9206 webpexpress-processed" src="https://www.linuxbabe.com/wp-content/uploads/2017/12/install-wordpress-ubuntu-17.10-lemp.png" alt="install-wordpress-ubuntu-17.10-lemp" width="856" height="567" srcset="https://www.linuxbabe.com/wp-content/uploads/2017/12/install-wordpress-ubuntu-17.10-lemp.png 856w, https://www.linuxbabe.com/wp-content/uploads/2017/12/install-wordpress-ubuntu-17.10-lemp-331x219.png 331w, https://www.linuxbabe.com/wp-content/uploads/2017/12/install-wordpress-ubuntu-17.10-lemp-543x360.png 543w, https://www.linuxbabe.com/wp-content/uploads/2017/12/install-wordpress-ubuntu-17.10-lemp-300x199.png 300w" sizes="(max-width: 856px) 100vw, 856px"></picture></p>
<p>If the installation wizard isn’t displayed, you probably need to install some PHP7 extensions.</p>
<pre>sudo apt install php-imagick php7.4-fpm php7.4-mbstring php7.4-bcmath php7.4-xml php7.4-mysql php7.4-common php7.4-gd php7.4-json php7.4-cli php7.4-curl php7.4-zip</pre>
<p>Then reload PHP-FPM and Nginx. The wizard should now be displayed.</p>
<pre>sudo systemctl reload php7.4-fpm nginx
</pre>
<p>Before entering your sensitive information in the setup wizard, it’s recommended to enable HTTPS to prevent traffic hijacking.</p>
<h2>Step 5: Enabling HTTPS</h2>
<p>To encrypt the HTTP traffic, we can enable HTTPS by installing a free TLS certificate issued from Let’s Encrypt. Run the following command to install Let’s Encrypt client (certbot) on Ubuntu 20.04 server.</p>
<pre>sudo apt install certbot python3-certbot-nginx</pre>
<p>And run this command to obtain and install TLS certificate.</p>
<pre>sudo certbot --nginx --agree-tos --redirect --hsts --staple-ocsp --email <span style="color: #ff00ff;"><a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="a1d8ced4e1c4d9c0ccd1cdc48fc2cecc">[email&#160;protected]</a></span> -d <span style="color: #ff00ff;">yourdomain.com</span>,www.<span style="color: #ff00ff;">yourdomain.com</span></pre>
<p>Wher</p>
<ul>
<li><code>--nginx</code>: Use the Nginx plugin.</li>
<li><code>--agree-tos</code>: Agree to terms of service.</li>
<li><code>--redirect</code>: Force HTTPS by 301 redirect.</li>
<li><code>--hsts</code>: Add the Strict-Transport-Security header to every HTTP response. Forcing the browser to always use TLS for the domain. Defends against SSL/TLS Stripping.<code></code></li>
<li><code>--staple-ocsp</code>: Enables OCSP Stapling. A valid OCSP response is stapled to the certificate that the server offers during TLS.</li>
<li><code>--email</code>: Email used for registration and recovery contact.</li>
<li><code>-d</code> flag is followed by a list of domain names, separated by comma. You can add up to 100 domain names.</li>
</ul>
<p>The certificate should now be obtained and automatically installed.</p>
<p><picture><source srcset="https://www.linuxbabe.com/wp-content/uploads/2017/10/wordpress-apache-https.webp 700w, https://www.linuxbabe.com/wp-content/uploads/2017/10/wordpress-apache-https-400x149.webp 400w, https://www.linuxbabe.com/wp-content/uploads/2017/10/wordpress-apache-https-661x246.webp 661w, https://www.linuxbabe.com/wp-content/uploads/2017/10/wordpress-apache-https-640x238.webp 640w" sizes="(max-width: 700px) 100vw, 700px" type="image/webp"><img decoding="async" loading="lazy" class="aligncenter size-full wp-image-20366 webpexpress-processed" src="https://www.linuxbabe.com/wp-content/uploads/2017/10/wordpress-apache-https.png" sizes="(max-width: 700px) 100vw, 700px" srcset="https://www.linuxbabe.com/wp-content/uploads/2017/10/wordpress-apache-https.png 700w, https://www.linuxbabe.com/wp-content/uploads/2017/10/wordpress-apache-https-400x149.png 400w, https://www.linuxbabe.com/wp-content/uploads/2017/10/wordpress-apache-https-661x246.png 661w, https://www.linuxbabe.com/wp-content/uploads/2017/10/wordpress-apache-https-640x238.png 640w" alt="wordpress apache https" width="700" height="260"></picture></p>
<p>Now if you reload the WordPress setup wizard, you can see that HTTP is automatically redirected to HTTPS connection.</p>
<h2>Step 6: Finish the Installation with the Setup Wizard</h2>
<p>Create an admin account and click the <strong>Install WordPress</strong> button.</p>
<p><picture><source srcset="https://www.linuxbabe.com/wp-content/uploads/2017/10/wordpress-ubuntu-20.04-PHP7.4.webp 773w, https://www.linuxbabe.com/wp-content/uploads/2017/10/wordpress-ubuntu-20.04-PHP7.4-202x219.webp 202w, https://www.linuxbabe.com/wp-content/uploads/2017/10/wordpress-ubuntu-20.04-PHP7.4-332x360.webp 332w, https://www.linuxbabe.com/wp-content/uploads/2017/10/wordpress-ubuntu-20.04-PHP7.4-640x693.webp 640w" sizes="(max-width: 773px) 100vw, 773px" type="image/webp"><img decoding="async" loading="lazy" class="aligncenter wp-image-20367 size-full webpexpress-processed" src="https://www.linuxbabe.com/wp-content/uploads/2017/10/wordpress-ubuntu-20.04-PHP7.4.png" sizes="(max-width: 773px) 100vw, 773px" srcset="https://www.linuxbabe.com/wp-content/uploads/2017/10/wordpress-ubuntu-20.04-PHP7.4.png 773w, https://www.linuxbabe.com/wp-content/uploads/2017/10/wordpress-ubuntu-20.04-PHP7.4-202x219.png 202w, https://www.linuxbabe.com/wp-content/uploads/2017/10/wordpress-ubuntu-20.04-PHP7.4-332x360.png 332w, https://www.linuxbabe.com/wp-content/uploads/2017/10/wordpress-ubuntu-20.04-PHP7.4-640x693.png 640w" alt="wordpress ubuntu 20.04 PHP7.4" width="773" height="837"></picture></p>
<p>And now your new WordPress site is installed.</p>
<p><picture><source srcset="https://www.linuxbabe.com/wp-content/uploads/2017/10/install-wordpress-ubuntu-20.04-LAMP.webp 1096w, https://www.linuxbabe.com/wp-content/uploads/2017/10/install-wordpress-ubuntu-20.04-LAMP-355x219.webp 355w, https://www.linuxbabe.com/wp-content/uploads/2017/10/install-wordpress-ubuntu-20.04-LAMP-583x360.webp 583w, https://www.linuxbabe.com/wp-content/uploads/2017/10/install-wordpress-ubuntu-20.04-LAMP-640x395.webp 640w" sizes="(max-width: 1096px) 100vw, 1096px" type="image/webp"><img decoding="async" loading="lazy" class="aligncenter wp-image-20368 size-full webpexpress-processed" src="https://www.linuxbabe.com/wp-content/uploads/2017/10/install-wordpress-ubuntu-20.04-LAMP.png" sizes="(max-width: 1096px) 100vw, 1096px" srcset="https://www.linuxbabe.com/wp-content/uploads/2017/10/install-wordpress-ubuntu-20.04-LAMP.png 1096w, https://www.linuxbabe.com/wp-content/uploads/2017/10/install-wordpress-ubuntu-20.04-LAMP-355x219.png 355w, https://www.linuxbabe.com/wp-content/uploads/2017/10/install-wordpress-ubuntu-20.04-LAMP-583x360.png 583w, https://www.linuxbabe.com/wp-content/uploads/2017/10/install-wordpress-ubuntu-20.04-LAMP-640x395.png 640w" alt="install wordpress ubuntu 20.04 LAMP" width="1096" height="677"></picture></p>
<h2>How to Redirect www to non-www (Or Vice Versa)</h2>
<p>We have already enabled redirecting HTTP to HTTPS, what’s left to do is redirect www to non-www, or vice versa. It’s very easy. Simply go to <strong>WordPress Dashboard</strong> &gt; <strong>Settings</strong> &gt; <strong>General</strong> and set your preferred version (www or non-www) in <strong>WordPress Address</strong> and <strong>Site Address</strong>. Be sure to include the <code>https://</code> prefix.</p>
<p><picture><source srcset="https://www.linuxbabe.com/wp-content/uploads/2017/11/letsencrypt-apache-redirect.webp 758w, https://www.linuxbabe.com/wp-content/uploads/2017/11/letsencrypt-apache-redirect-374x219.webp 374w, https://www.linuxbabe.com/wp-content/uploads/2017/11/letsencrypt-apache-redirect-615x360.webp 615w, https://www.linuxbabe.com/wp-content/uploads/2017/11/letsencrypt-apache-redirect-300x176.webp 300w" sizes="(max-width: 758px) 100vw, 758px" type="image/webp"><img decoding="async" loading="lazy" class="aligncenter wp-image-8759 size-full webpexpress-processed" src="https://www.linuxbabe.com/wp-content/uploads/2017/11/letsencrypt-apache-redirect.png" alt="letsencrypt apache redirect" width="758" height="444" srcset="https://www.linuxbabe.com/wp-content/uploads/2017/11/letsencrypt-apache-redirect.png 758w, https://www.linuxbabe.com/wp-content/uploads/2017/11/letsencrypt-apache-redirect-374x219.png 374w, https://www.linuxbabe.com/wp-content/uploads/2017/11/letsencrypt-apache-redirect-615x360.png 615w, https://www.linuxbabe.com/wp-content/uploads/2017/11/letsencrypt-apache-redirect-300x176.png 300w" sizes="(max-width: 758px) 100vw, 758px"></picture></p>
<h2><a id="wordpress-send-emails"></a>How to Send Emails in WordPress</h2>
<p>Your WordPress site needs to send emails like account registration emails, password-resetting emails, comment notification emails, etc. Instead of using expensive third-party solutions like Gsuite to create professional email addresses for your website, you can follow <a href="https://www.linuxbabe.com/mail-server/ubuntu-20-04-iredmail-server-installation" target="_blank" rel="noopener noreferrer">this iRedMail tutorial</a> to set up your own mail server with your own domain name, so you can have unlimited mailboxes and send unlimited emails without breaking the bank.</p>
<p>Note that it’s a good practice to install mail server and WordPress on two different virtual private servers because you don’t want the mail server to slow down your WordPress site speed, and the mail server will leak the IP address of your WordPress site if they are on the same virtual private server, which means hackers can bypass any CDN (Content Delivery Network) you are using and launch DDoS attack directly at your origin server.</p>
<p>Once your mail server is up and running, you can install an SMTP plugin in WordPress, so it can connect to your mail server and send emails. Go to your <strong>WordPress dashboard</strong> -&gt; <strong>Plugins</strong>, click <strong>Add New</strong> to install a new plugin.</p>
<p><picture><source srcset="https://www.linuxbabe.com/wp-content/uploads/2017/10/wordpress-add-new-plugin.webp 783w, https://www.linuxbabe.com/wp-content/uploads/2017/10/wordpress-add-new-plugin-400x191.webp 400w, https://www.linuxbabe.com/wp-content/uploads/2017/10/wordpress-add-new-plugin-661x316.webp 661w, https://www.linuxbabe.com/wp-content/uploads/2017/10/wordpress-add-new-plugin-640x306.webp 640w" sizes="(max-width: 783px) 100vw, 783px" type="image/webp"><img decoding="async" loading="lazy" class="aligncenter size-full wp-image-20371 webpexpress-processed" src="https://www.linuxbabe.com/wp-content/uploads/2017/10/wordpress-add-new-plugin.png" alt="wordpress add new plugin" width="783" height="374" srcset="https://www.linuxbabe.com/wp-content/uploads/2017/10/wordpress-add-new-plugin.png 783w, https://www.linuxbabe.com/wp-content/uploads/2017/10/wordpress-add-new-plugin-400x191.png 400w, https://www.linuxbabe.com/wp-content/uploads/2017/10/wordpress-add-new-plugin-661x316.png 661w, https://www.linuxbabe.com/wp-content/uploads/2017/10/wordpress-add-new-plugin-640x306.png 640w" sizes="(max-width: 783px) 100vw, 783px"></picture></p>
<p>Then type in <strong>WP Mail SMTP</strong> in the search box. Install and activate the <strong>WP Mail SMTP by WPForms</strong> plugin.</p>
<p><picture><source srcset="https://www.linuxbabe.com/wp-content/uploads/2017/10/wp-mail-smtp.webp 643w, https://www.linuxbabe.com/wp-content/uploads/2017/10/wp-mail-smtp-400x172.webp 400w, https://www.linuxbabe.com/wp-content/uploads/2017/10/wp-mail-smtp-640x275.webp 640w" sizes="(max-width: 643px) 100vw, 643px" type="image/webp"><img decoding="async" loading="lazy" class="aligncenter size-full wp-image-20372 webpexpress-processed" src="https://www.linuxbabe.com/wp-content/uploads/2017/10/wp-mail-smtp.png" alt="wp mail smtp" width="643" height="276" srcset="https://www.linuxbabe.com/wp-content/uploads/2017/10/wp-mail-smtp.png 643w, https://www.linuxbabe.com/wp-content/uploads/2017/10/wp-mail-smtp-400x172.png 400w, https://www.linuxbabe.com/wp-content/uploads/2017/10/wp-mail-smtp-640x275.png 640w" sizes="(max-width: 643px) 100vw, 643px"></picture></p>
<p>Reload the WordPress dashboard web page, you will see <strong>WP Mail SMTP</strong> on the left menu bar. Click on it and select <strong>Settings</strong>.</p>
<p><picture><source srcset="https://www.linuxbabe.com/wp-content/uploads/2017/10/wp-mail-smtp-settings.webp 766w, https://www.linuxbabe.com/wp-content/uploads/2017/10/wp-mail-smtp-settings-400x146.webp 400w, https://www.linuxbabe.com/wp-content/uploads/2017/10/wp-mail-smtp-settings-661x242.webp 661w, https://www.linuxbabe.com/wp-content/uploads/2017/10/wp-mail-smtp-settings-640x234.webp 640w" sizes="(max-width: 766px) 100vw, 766px" type="image/webp"><img decoding="async" loading="lazy" class="aligncenter size-full wp-image-20373 webpexpress-processed" src="https://www.linuxbabe.com/wp-content/uploads/2017/10/wp-mail-smtp-settings.png" alt="wp mail smtp settings" width="766" height="280" srcset="https://www.linuxbabe.com/wp-content/uploads/2017/10/wp-mail-smtp-settings.png 766w, https://www.linuxbabe.com/wp-content/uploads/2017/10/wp-mail-smtp-settings-400x146.png 400w, https://www.linuxbabe.com/wp-content/uploads/2017/10/wp-mail-smtp-settings-661x242.png 661w, https://www.linuxbabe.com/wp-content/uploads/2017/10/wp-mail-smtp-settings-640x234.png 640w" sizes="(max-width: 766px) 100vw, 766px"></picture></p>
<p>Then scroll down to the Mailer section. By default, the PHP mailer is selected. We need to change it to <strong>Other SMTP</strong>.</p>
<p><picture><source srcset="https://www.linuxbabe.com/wp-content/uploads/2017/10/wordpress-send-emails.webp 1004w, https://www.linuxbabe.com/wp-content/uploads/2017/10/wordpress-send-emails-400x122.webp 400w, https://www.linuxbabe.com/wp-content/uploads/2017/10/wordpress-send-emails-661x201.webp 661w, https://www.linuxbabe.com/wp-content/uploads/2017/10/wordpress-send-emails-640x194.webp 640w" sizes="(max-width: 1004px) 100vw, 1004px" type="image/webp"><img decoding="async" loading="lazy" class="aligncenter size-full wp-image-20374 webpexpress-processed" src="https://www.linuxbabe.com/wp-content/uploads/2017/10/wordpress-send-emails.png" alt="wordpress send emails" width="1004" height="305" srcset="https://www.linuxbabe.com/wp-content/uploads/2017/10/wordpress-send-emails.png 1004w, https://www.linuxbabe.com/wp-content/uploads/2017/10/wordpress-send-emails-400x122.png 400w, https://www.linuxbabe.com/wp-content/uploads/2017/10/wordpress-send-emails-661x201.png 661w, https://www.linuxbabe.com/wp-content/uploads/2017/10/wordpress-send-emails-640x194.png 640w" sizes="(max-width: 1004px) 100vw, 1004px"></picture></p>
<p>Scroll down and you will need to enter the SMTP settings.</p>
<ul>
<li>Enter the hostname of your mail server.</li>
<li>Select TLS as Encryption.</li>
<li>Use port 587.</li>
<li>Enable Authentication.</li>
<li>Enter an email address of your domain and the password.</li>
</ul>
<p><picture><source srcset="https://www.linuxbabe.com/wp-content/uploads/2017/10/wordpress-set-up-your-own-email-server.webp 1020w, https://www.linuxbabe.com/wp-content/uploads/2017/10/wordpress-set-up-your-own-email-server-291x219.webp 291w, https://www.linuxbabe.com/wp-content/uploads/2017/10/wordpress-set-up-your-own-email-server-478x360.webp 478w, https://www.linuxbabe.com/wp-content/uploads/2017/10/wordpress-set-up-your-own-email-server-640x482.webp 640w" sizes="(max-width: 1020px) 100vw, 1020px" type="image/webp"><img decoding="async" loading="lazy" class="aligncenter size-full wp-image-20375 webpexpress-processed" src="https://www.linuxbabe.com/wp-content/uploads/2017/10/wordpress-set-up-your-own-email-server.png" alt="wordpress set up your own email server" width="1020" height="768" srcset="https://www.linuxbabe.com/wp-content/uploads/2017/10/wordpress-set-up-your-own-email-server.png 1020w, https://www.linuxbabe.com/wp-content/uploads/2017/10/wordpress-set-up-your-own-email-server-291x219.png 291w, https://www.linuxbabe.com/wp-content/uploads/2017/10/wordpress-set-up-your-own-email-server-478x360.png 478w, https://www.linuxbabe.com/wp-content/uploads/2017/10/wordpress-set-up-your-own-email-server-640x482.png 640w" sizes="(max-width: 1020px) 100vw, 1020px"></picture></p>
<p>After saving the settings, you can test email sending by logging out the WordPress dashboard, and click <strong>lost your password</strong> link to send a password-resetting email.</p>
<p><picture><source srcset="https://www.linuxbabe.com/wp-content/uploads/2017/10/wordpress-lost-your-password.webp 826w, https://www.linuxbabe.com/wp-content/uploads/2017/10/wordpress-lost-your-password-361x219.webp 361w, https://www.linuxbabe.com/wp-content/uploads/2017/10/wordpress-lost-your-password-594x360.webp 594w, https://www.linuxbabe.com/wp-content/uploads/2017/10/wordpress-lost-your-password-640x388.webp 640w" sizes="(max-width: 826px) 100vw, 826px" type="image/webp"><img decoding="async" loading="lazy" class="aligncenter size-full wp-image-20376 webpexpress-processed" src="https://www.linuxbabe.com/wp-content/uploads/2017/10/wordpress-lost-your-password.png" alt="wordpress lost your password" width="826" height="501" srcset="https://www.linuxbabe.com/wp-content/uploads/2017/10/wordpress-lost-your-password.png 826w, https://www.linuxbabe.com/wp-content/uploads/2017/10/wordpress-lost-your-password-361x219.png 361w, https://www.linuxbabe.com/wp-content/uploads/2017/10/wordpress-lost-your-password-594x360.png 594w, https://www.linuxbabe.com/wp-content/uploads/2017/10/wordpress-lost-your-password-640x388.png 640w" sizes="(max-width: 826px) 100vw, 826px"></picture></p>
<h2>Increase Upload File Size Limit</h2>
<p>By default, files such as images, PDF files uploaded to the WordPress media library can not be larger than 2MB. To increase the upload size limit, edit the PHP configuration file.</p>
<pre>sudo nano /etc/php/7.4/fpm/php.ini</pre>
<p>Find the following line (line 846).</p>
<pre>upload_max_filesize = 2M</pre>
<p>Change the value like below:</p>
<pre>upload_max_filesize = 20M</pre>
<p>Then find the following line (line 694).</p>
<pre>post_max_size = 8M</pre>
<p>Change the maximum size of POST data that PHP will accept.</p>
<pre>post_max_size = 20M</pre>
<p>Save and close the file. Alternatively, you can run the following two commands to change the value without manually opening the file.</p>
<pre>sudo sed -i 's/upload_max_filesize = 2M/upload_max_filesize = 20M/g' /etc/php/7.4/fpm/php.ini

sudo sed -i 's/post_max_size = 8M/post_max_size = 20M/g' /etc/php/7.4/fpm/php.ini</pre>
<p>Then restart PHP-FPM.</p>
<pre>sudo systemctl restart php7.4-fpm</pre>
<p>Nginx also sets a limit of upload file size. The default maximum upload file size limit set by Nginx is 1MB. To allow uploading large files to your WordPress site, edit the Nginx configuration file.</p>
<pre>sudo nano /etc/nginx/conf.d/<span style="color: #ff00ff;">example.com</span>.conf</pre>
<p>We have already set the maximum file size in this file, as indicated by</p>
<pre>client_max_body_size 2M;</pre>
<p>You can change it if you prefer, like 20M.</p>
<pre>client_max_body_size <span style="color: #ff00ff;">20M</span>;</pre>
<p>Save and close the file. Then reload Nginx for the changes to take effect.</p>
<pre>sudo systemctl reload nginx</pre>
<h2>Next Steps</h2>
<p>I hope this tutorial helped you install WordPress on Ubuntu 20.04 with Nginx, MariaDB and PHP7.4 (LEMP stack). As always, if you found this post useful, then <a href="https://newsletter.linuxbabe.com/subscription/wkeY5d6pg" target="_blank" rel="noopener noreferrer">subscribe to our free newsletter</a> to get more tips and tricks.</p>
<p><strong>Backup</strong> is important in case of hacking, data center disasters, etc. You should have a backup strategy for your WordPress site.</p>
<ul>
<li><a href="https://www.linuxbabe.com/mariadb/how-to-back-up-mariadb-databases-from-the-command-line" target="_blank" rel="noopener">Back Up and Restore MariaDB Databases From the Command line</a></li>
<li><a href="https://www.linuxbabe.com/backup/duplicati-debian-ubuntu-linux-mint-desktop-server" target="_blank" rel="noopener">Use Duplicati to Back Up Files on Debian, Ubuntu, Linux Mint</a></li>
</ul>
<p><strong>Linux Server Performance Tuning and Monitoring</strong></p>
<ul>
<li><a href="https://www.linuxbabe.com/ubuntu/enable-google-tcp-bbr-ubuntu" target="_blank" rel="noopener">Easily Boost Ubuntu Network Performance by Enabling TCP BBR</a></li>
<li><a href="https://www.linuxbabe.com/nginx/what-are-spdy-and-http2-and-how-to-enable-them-on-nginx" target="_blank" rel="noopener">What is HTTP/2 and How to Enable it on Nginx</a></li>
<li><a href="https://www.linuxbabe.com/monitoring/linux-server-performance-monitoring-with-netdata" target="_blank" rel="noopener">Linux Server Performance Monitoring with Netdata (2022)</a></li>
</ul>
<p><strong>WordPress Command Line Utility</strong></p>
<ul>
<li>You may also want to <a href="https://www.linuxbabe.com/linux-server/wp-cli-1-0-released-wordpress-command-line" target="_blank" rel="noopener noreferrer">use the WP-CLI command-line tool to manage your WordPress site</a>.</li>
<li>You can use <a href="https://www.linuxbabe.com/security/install-wpscan-wp-vulnerability-scanner" target="_blank" rel="noopener noreferrer">WPScan to scan the vulnerabilities of your WordPress site</a>.</li>
</ul>
<p>Take care 🙂</p>
<div style='text-align:left' class='yasr-auto-insert-visitor'><div id='yasr_visitor_votes_a383676d8c29c' class='yasr-visitor-votes'><div class="yasr-custom-text-vv-before yasr-custom-text-vv-before-5102">Rate this tutorial</div><div id='yasr-vv-second-row-container-a383676d8c29c' class='yasr-vv-second-row-container'><div id='yasr-visitor-votes-rater-a383676d8c29c' class='yasr-rater-stars-vv' data-rater-postid='5102' data-rating='4.4' data-rater-starsize='32' data-rater-readonly='false' data-rater-nonce='d8330de4cb' data-issingular='true'></div><div class="yasr-vv-stats-text-container" id="yasr-vv-stats-text-container-a383676d8c29c"><svg xmlns="https://www.w3.org/2000/svg" width="20" height="20" class="yasr-dashicons-visitor-stats" data-postid="5102" id="yasr-stats-dashicon-a383676d8c29c">
<path d="M18 18v-16h-4v16h4zM12 18v-11h-4v11h4zM6 18v-8h-4v8h4z"></path>
</svg><span id="yasr-vv-text-container-a383676d8c29c" class="yasr-vv-text-container">[Total: <span id="yasr-vv-votes-number-container-a383676d8c29c">10</span> Average: <span id="yasr-vv-average-container-a383676d8c29c">4.4</span>]</span></div><div id='yasr-vv-loader-a383676d8c29c' class='yasr-vv-container-loader'></div></div><div id='yasr-vv-bottom-container-a383676d8c29c' class='yasr-vv-bottom-container' style='display:none'></div></div></div><div style='display:none;' class='shareaholic-canvas' data-app='recommendations' data-title='Install WordPress on Ubuntu 20.04 with Nginx, MariaDB, PHP7.4 (LEMP)' data-link='https://www.linuxbabe.com/ubuntu/install-wordpress-ubuntu-20-04-nginx-mariadb-php7-4-lemp' data-app-id-name='post_below_content'></div>
</div>
<div style="clear:both"></div>
<div class="thn_post_wrap wp_link_pages">
</div>


<div class="post_foot">
<div class="post_meta">
<div class="post_tag">
<div class="tag_list">
<ul><li><i class="fa-tag"></i><a href="https://www.linuxbabe.com/tag/wordpress" rel="tag">wordpress</a></li></ul> </div>
</div>
</div>
</div>

</div>

</div>

<div class="comments_template ">


<h3 id="comments">
11 Responses to &#8220;<a>Install WordPress on Ubuntu 20.04 with Nginx, MariaDB, PHP7.4 (LEMP)</a>&#8221;
</h3>


<ul class="commentlist">

<li class="comment even thread-even depth-1" id="li-comment-135487">
<div id="comment-135487" class="comment-body">
<div class="comm_edit"></div>
<div class="comment-author vcard">
<div class="avatar"><img alt='' src='https://secure.gravatar.com/avatar/0354f14eb34a9639ac8e82cef1e6d7ab?s=30&#038;d=https%3A%2F%2Fwww.linuxbabe.com%2Fwp-content%2Fuploads%2F2018%2F06%2Flinuxbabe-comment-avatar-120x120.png&#038;r=g' srcset='https://secure.gravatar.com/avatar/0354f14eb34a9639ac8e82cef1e6d7ab?s=60&#038;d=https%3A%2F%2Fwww.linuxbabe.com%2Fwp-content%2Fuploads%2F2018%2F06%2Flinuxbabe-comment-avatar-120x120.png&#038;r=g 2x' class='avatar avatar-30 photo' height='30' width='30' loading='lazy' decoding='async' /></div>
<div class="comm_auth">Duffman</div>
<a class="comm_date"><i class="fa-clock-o"></i>2 years ago</a>
<div class="comm_reply">
<i class="fa-reply"></i> <a rel='nofollow' class='comment-reply-link' href='#comment-135487' data-commentid="135487" data-postid="5102" data-belowelement="comment-135487" data-respondelement="respond" data-replyto="Reply to Duffman" aria-label='Reply to Duffman'>Reply</a> </div>
</div>
<div class="org_comment"><p>Great Instructions LinuxBabe!!!</p>
<p>Thank you!!!</p>
</div>
</div>
</li>
<li class="comment odd alt thread-odd thread-alt depth-1" id="li-comment-138731">
<div id="comment-138731" class="comment-body">
<div class="comm_edit"></div>
<div class="comment-author vcard">
<div class="avatar"><img alt='' src='https://secure.gravatar.com/avatar/1dd1be26a2cdc82dd9345dfae745bfd6?s=30&#038;d=https%3A%2F%2Fwww.linuxbabe.com%2Fwp-content%2Fuploads%2F2018%2F06%2Flinuxbabe-comment-avatar-120x120.png&#038;r=g' srcset='https://secure.gravatar.com/avatar/1dd1be26a2cdc82dd9345dfae745bfd6?s=60&#038;d=https%3A%2F%2Fwww.linuxbabe.com%2Fwp-content%2Fuploads%2F2018%2F06%2Flinuxbabe-comment-avatar-120x120.png&#038;r=g 2x' class='avatar avatar-30 photo' height='30' width='30' loading='lazy' decoding='async' /></div>
<div class="comm_auth">bpsoft</div>
<a class="comm_date"><i class="fa-clock-o"></i>2 years ago</a>
<div class="comm_reply">
<i class="fa-reply"></i> <a rel='nofollow' class='comment-reply-link' href='#comment-138731' data-commentid="138731" data-postid="5102" data-belowelement="comment-138731" data-respondelement="respond" data-replyto="Reply to bpsoft" aria-label='Reply to bpsoft'>Reply</a> </div>
</div>
<div class="org_comment"><p>Easy installations following your instructions. I have Nextcloud installed (root dir: /var/www/nextcloud/) as in <a href="https://www.linuxbabe.com/ubuntu/install-nextcloud-ubuntu-20-04-nginx-lemp-stack" rel="noopener" target="_blank">https://www.linuxbabe.com/ubuntu/install-nextcloud-ubuntu-20-04-nginx-lemp-stack</a> and wanted to add WordPress (root dir :/var/www/wordpress/). https is working for both. I get to the wp-config.php, but I can&#8217;t login &#8211; always the index page is shown. What should be changed in the nginx config?</p>
</div>
</div>
<ul class="children">
<li class="comment byuser comment-author-xiao-guoan bypostauthor even depth-2" id="li-comment-774934">
<div id="comment-774934" class="comment-body">
<div class="comm_edit"></div>
<div class="comment-author vcard">
<div class="avatar"><img alt='' src='https://secure.gravatar.com/avatar/42e9cbb39d606a2cf089d69b84846f6c?s=30&#038;d=https%3A%2F%2Fwww.linuxbabe.com%2Fwp-content%2Fuploads%2F2018%2F06%2Flinuxbabe-comment-avatar-120x120.png&#038;r=g' srcset='https://secure.gravatar.com/avatar/42e9cbb39d606a2cf089d69b84846f6c?s=60&#038;d=https%3A%2F%2Fwww.linuxbabe.com%2Fwp-content%2Fuploads%2F2018%2F06%2Flinuxbabe-comment-avatar-120x120.png&#038;r=g 2x' class='avatar avatar-30 photo' height='30' width='30' loading='lazy' decoding='async' /></div>
<div class="comm_auth">Xiao Guoan (Admin)</div>
<a class="comm_date"><i class="fa-clock-o"></i>3 months ago</a>
<div class="comm_reply">
<i class="fa-reply"></i> <a rel='nofollow' class='comment-reply-link' href='#comment-774934' data-commentid="774934" data-postid="5102" data-belowelement="comment-774934" data-respondelement="respond" data-replyto="Reply to Xiao Guoan (Admin)" aria-label='Reply to Xiao Guoan (Admin)'>Reply</a> </div>
</div>
<div class="org_comment"><p>Make sure you use the correct web root directory in the Nginx virtual host file.</p>
<pre>root /var/www/wordpress/;</pre>
</div>
</div>
</li>
</ul>
</li>
<li class="comment odd alt thread-even depth-1" id="li-comment-162729">
<div id="comment-162729" class="comment-body">
<div class="comm_edit"></div>
<div class="comment-author vcard">
<div class="avatar"><img alt='' src='https://secure.gravatar.com/avatar/350b4bdde1cd25d714ce28fa836b5168?s=30&#038;d=https%3A%2F%2Fwww.linuxbabe.com%2Fwp-content%2Fuploads%2F2018%2F06%2Flinuxbabe-comment-avatar-120x120.png&#038;r=g' srcset='https://secure.gravatar.com/avatar/350b4bdde1cd25d714ce28fa836b5168?s=60&#038;d=https%3A%2F%2Fwww.linuxbabe.com%2Fwp-content%2Fuploads%2F2018%2F06%2Flinuxbabe-comment-avatar-120x120.png&#038;r=g 2x' class='avatar avatar-30 photo' height='30' width='30' loading='lazy' decoding='async' /></div>
<div class="comm_auth">Fred White</div>
<a class="comm_date"><i class="fa-clock-o"></i>2 years ago</a>
<div class="comm_reply">
<i class="fa-reply"></i> <a rel='nofollow' class='comment-reply-link' href='#comment-162729' data-commentid="162729" data-postid="5102" data-belowelement="comment-162729" data-respondelement="respond" data-replyto="Reply to Fred White" aria-label='Reply to Fred White'>Reply</a> </div>
</div>
<div class="org_comment"><p>Thanks for the tutorial. I am just wondering the reasoning behind installing WordPress at /usr/share/nginx location? While I keep installing my WordPress sites in this location, I am just curious. </p>
<p>Thanks<br />
Fred</p>
</div>
</div>
<ul class="children">
<li class="comment byuser comment-author-xiao-guoan bypostauthor even depth-2" id="li-comment-162978">
<div id="comment-162978" class="comment-body">
<div class="comm_edit"></div>
<div class="comment-author vcard">
<div class="avatar"><img alt='' src='https://secure.gravatar.com/avatar/42e9cbb39d606a2cf089d69b84846f6c?s=30&#038;d=https%3A%2F%2Fwww.linuxbabe.com%2Fwp-content%2Fuploads%2F2018%2F06%2Flinuxbabe-comment-avatar-120x120.png&#038;r=g' srcset='https://secure.gravatar.com/avatar/42e9cbb39d606a2cf089d69b84846f6c?s=60&#038;d=https%3A%2F%2Fwww.linuxbabe.com%2Fwp-content%2Fuploads%2F2018%2F06%2Flinuxbabe-comment-avatar-120x120.png&#038;r=g 2x' class='avatar avatar-30 photo' height='30' width='30' loading='lazy' decoding='async' /></div>
<div class="comm_auth">Xiao Guoan (Admin)</div>
<a class="comm_date"><i class="fa-clock-o"></i>2 years ago</a>
<div class="comm_reply">
<i class="fa-reply"></i> <a rel='nofollow' class='comment-reply-link' href='#comment-162978' data-commentid="162978" data-postid="5102" data-belowelement="comment-162978" data-respondelement="respond" data-replyto="Reply to Xiao Guoan (Admin)" aria-label='Reply to Xiao Guoan (Admin)'>Reply</a> </div>
</div>
<div class="org_comment"><p>It doesn&#8217;t matter where the web files are stored on the server, as long as the web server can read them. <code>/var/www/</code> is an Apache tradition. Nginx officially recommends <code>/usr/share/nginx/</code></p>
</div>
</div>
</li>
</ul>
</li>
<li class="comment odd alt thread-odd thread-alt depth-1" id="li-comment-163166">
<div id="comment-163166" class="comment-body">
<div class="comm_edit"></div>
<div class="comment-author vcard">
<div class="avatar"><img alt='' src='https://secure.gravatar.com/avatar/350b4bdde1cd25d714ce28fa836b5168?s=30&#038;d=https%3A%2F%2Fwww.linuxbabe.com%2Fwp-content%2Fuploads%2F2018%2F06%2Flinuxbabe-comment-avatar-120x120.png&#038;r=g' srcset='https://secure.gravatar.com/avatar/350b4bdde1cd25d714ce28fa836b5168?s=60&#038;d=https%3A%2F%2Fwww.linuxbabe.com%2Fwp-content%2Fuploads%2F2018%2F06%2Flinuxbabe-comment-avatar-120x120.png&#038;r=g 2x' class='avatar avatar-30 photo' height='30' width='30' loading='lazy' decoding='async' /></div>
<div class="comm_auth">Fred</div>
<a class="comm_date"><i class="fa-clock-o"></i>2 years ago</a>
<div class="comm_reply">
<i class="fa-reply"></i> <a rel='nofollow' class='comment-reply-link' href='#comment-163166' data-commentid="163166" data-postid="5102" data-belowelement="comment-163166" data-respondelement="respond" data-replyto="Reply to Fred" aria-label='Reply to Fred'>Reply</a> </div>
</div>
<div class="org_comment"><p>Thanks, Xiao. It&#8217;s nice to hear from the experts</p>
</div>
</div>
</li>
<li class="comment even thread-even depth-1" id="li-comment-539970">
<div id="comment-539970" class="comment-body">
<div class="comm_edit"></div>
<div class="comment-author vcard">
<div class="avatar"><img alt='' src='https://secure.gravatar.com/avatar/457b27012c4824ce0c75bdd2eab9a131?s=30&#038;d=https%3A%2F%2Fwww.linuxbabe.com%2Fwp-content%2Fuploads%2F2018%2F06%2Flinuxbabe-comment-avatar-120x120.png&#038;r=g' srcset='https://secure.gravatar.com/avatar/457b27012c4824ce0c75bdd2eab9a131?s=60&#038;d=https%3A%2F%2Fwww.linuxbabe.com%2Fwp-content%2Fuploads%2F2018%2F06%2Flinuxbabe-comment-avatar-120x120.png&#038;r=g 2x' class='avatar avatar-30 photo' height='30' width='30' loading='lazy' decoding='async' /></div>
<div class="comm_auth">eddiehd</div>
<a class="comm_date"><i class="fa-clock-o"></i>11 months ago</a>
<div class="comm_reply">
<i class="fa-reply"></i> <a rel='nofollow' class='comment-reply-link' href='#comment-539970' data-commentid="539970" data-postid="5102" data-belowelement="comment-539970" data-respondelement="respond" data-replyto="Reply to eddiehd" aria-label='Reply to eddiehd'>Reply</a> </div>
</div>
<div class="org_comment"><p>Great Ho-Tos, thank you for your time and dedication. Can you show us how to configure/run multiple WP sites/domains in the same server?</p>
</div>
</div>
</li>
<li class="comment odd alt thread-odd thread-alt depth-1" id="li-comment-774785">
<div id="comment-774785" class="comment-body">
<div class="comm_edit"></div>
<div class="comment-author vcard">
<div class="avatar"><img alt='' src='https://secure.gravatar.com/avatar/026040508d6f89c692802e13810e4e7b?s=30&#038;d=https%3A%2F%2Fwww.linuxbabe.com%2Fwp-content%2Fuploads%2F2018%2F06%2Flinuxbabe-comment-avatar-120x120.png&#038;r=g' srcset='https://secure.gravatar.com/avatar/026040508d6f89c692802e13810e4e7b?s=60&#038;d=https%3A%2F%2Fwww.linuxbabe.com%2Fwp-content%2Fuploads%2F2018%2F06%2Flinuxbabe-comment-avatar-120x120.png&#038;r=g 2x' class='avatar avatar-30 photo' height='30' width='30' loading='lazy' decoding='async' /></div>
<div class="comm_auth">Paul</div>
<a class="comm_date"><i class="fa-clock-o"></i>3 months ago</a>
<div class="comm_reply">
<i class="fa-reply"></i> <a rel='nofollow' class='comment-reply-link' href='#comment-774785' data-commentid="774785" data-postid="5102" data-belowelement="comment-774785" data-respondelement="respond" data-replyto="Reply to Paul" aria-label='Reply to Paul'>Reply</a> </div>
</div>
<div class="org_comment"><p>I tried using these steps twice to install 2 copies of WordPress on the same AWS EC2 instance. Now the new WordPress site goes to the first website when I type in the web address. Any thoughts on how to fix this? Thanks!</p>
</div>
</div>
<ul class="children">
<li class="comment byuser comment-author-xiao-guoan bypostauthor even depth-2" id="li-comment-774931">
<div id="comment-774931" class="comment-body">
<div class="comm_edit"></div>
<div class="comment-author vcard">
<div class="avatar"><img alt='' src='https://secure.gravatar.com/avatar/42e9cbb39d606a2cf089d69b84846f6c?s=30&#038;d=https%3A%2F%2Fwww.linuxbabe.com%2Fwp-content%2Fuploads%2F2018%2F06%2Flinuxbabe-comment-avatar-120x120.png&#038;r=g' srcset='https://secure.gravatar.com/avatar/42e9cbb39d606a2cf089d69b84846f6c?s=60&#038;d=https%3A%2F%2Fwww.linuxbabe.com%2Fwp-content%2Fuploads%2F2018%2F06%2Flinuxbabe-comment-avatar-120x120.png&#038;r=g 2x' class='avatar avatar-30 photo' height='30' width='30' loading='lazy' decoding='async' /></div>
<div class="comm_auth">Xiao Guoan (Admin)</div>
<a class="comm_date"><i class="fa-clock-o"></i>3 months ago</a>
<div class="comm_reply">
<i class="fa-reply"></i> <a rel='nofollow' class='comment-reply-link' href='#comment-774931' data-commentid="774931" data-postid="5102" data-belowelement="comment-774931" data-respondelement="respond" data-replyto="Reply to Xiao Guoan (Admin)" aria-label='Reply to Xiao Guoan (Admin)'>Reply</a> </div>
</div>
<div class="org_comment"><p>If you install 2 WordPress sites on the same server, you need to do the following:</p>
<p>1. Use different web root directories: <code>/usr/share/nginx/example.com</code> and <code>/usr/share/nginx/example.org</code><br />
2. Use different database name: <code>wordpress 1</code> and <code>wordpress2</code><br />
3. Create separate Nginx virtual host files: <code>/etc/nginx/conf.d/example.com.conf</code> and <code>/etc/nginx/conf.d/example.org.conf</code>. Make sure you use the correct web root directory in each virtual host file.</p>
</div>
</div>
</li>
</ul>
</li>
<li class="comment odd alt thread-even depth-1" id="li-comment-783233">
<div id="comment-783233" class="comment-body">
<div class="comm_edit"></div>
<div class="comment-author vcard">
<div class="avatar"><img alt='' src='https://secure.gravatar.com/avatar/ca7cded9b288c2929f52e88e5448faac?s=30&#038;d=https%3A%2F%2Fwww.linuxbabe.com%2Fwp-content%2Fuploads%2F2018%2F06%2Flinuxbabe-comment-avatar-120x120.png&#038;r=g' srcset='https://secure.gravatar.com/avatar/ca7cded9b288c2929f52e88e5448faac?s=60&#038;d=https%3A%2F%2Fwww.linuxbabe.com%2Fwp-content%2Fuploads%2F2018%2F06%2Flinuxbabe-comment-avatar-120x120.png&#038;r=g 2x' class='avatar avatar-30 photo' height='30' width='30' loading='lazy' decoding='async' /></div>
<div class="comm_auth">Ben Phiri</div>
<a class="comm_date"><i class="fa-clock-o"></i>2 months ago</a>
<div class="comm_reply">
<i class="fa-reply"></i> <a rel='nofollow' class='comment-reply-link' href='#comment-783233' data-commentid="783233" data-postid="5102" data-belowelement="comment-783233" data-respondelement="respond" data-replyto="Reply to Ben Phiri" aria-label='Reply to Ben Phiri'>Reply</a>  </div>
</div>
<div class="org_comment"><p>I followed your script everything was working until when i installed SSL certificate for the site it stopped working attached is the screenshot</p>
<p class="dco-attachment dco-image-attachment"><a rel="dco-ca-gallery-783233" href="https://www.linuxbabe.com/wp-content/uploads/2016/08/ssl.png" class="dco-attachment-link dco-image-attachment-link"><picture><source srcset="https://www.linuxbabe.com/wp-content/uploads/2016/08/ssl-395x219.webp 395w, https://www.linuxbabe.com/wp-content/uploads/2016/08/ssl-649x360.webp 649w, https://www.linuxbabe.com/wp-content/uploads/2016/08/ssl-640x355.webp 640w, https://www.linuxbabe.com/wp-content/uploads/2016/08/ssl.webp 826w" sizes="(max-width: 395px) 100vw, 395px" type="image/webp"><img width="395" height="219" src="https://www.linuxbabe.com/wp-content/uploads/2016/08/ssl-395x219.png" class="attachment-medium size-medium webpexpress-processed" alt="" decoding="async" loading="lazy" srcset="https://www.linuxbabe.com/wp-content/uploads/2016/08/ssl-395x219.png 395w, https://www.linuxbabe.com/wp-content/uploads/2016/08/ssl-649x360.png 649w, https://www.linuxbabe.com/wp-content/uploads/2016/08/ssl-640x355.png 640w, https://www.linuxbabe.com/wp-content/uploads/2016/08/ssl.png 826w" sizes="(max-width: 395px) 100vw, 395px"></picture></a></p>
</div>
</div>
</li>
<li class="comment even thread-odd thread-alt depth-1" id="li-comment-828298">
<div id="comment-828298" class="comment-body">
<div class="comm_edit"></div>
<div class="comment-author vcard">
<div class="avatar"><img alt='' src='https://secure.gravatar.com/avatar/bc9967b598c77a652e9d5ac0b34a8ff4?s=30&#038;d=https%3A%2F%2Fwww.linuxbabe.com%2Fwp-content%2Fuploads%2F2018%2F06%2Flinuxbabe-comment-avatar-120x120.png&#038;r=g' srcset='https://secure.gravatar.com/avatar/bc9967b598c77a652e9d5ac0b34a8ff4?s=60&#038;d=https%3A%2F%2Fwww.linuxbabe.com%2Fwp-content%2Fuploads%2F2018%2F06%2Flinuxbabe-comment-avatar-120x120.png&#038;r=g 2x' class='avatar avatar-30 photo' height='30' width='30' loading='lazy' decoding='async' /></div>
<div class="comm_auth">Serge</div>
<a class="comm_date"><i class="fa-clock-o"></i>4 weeks ago</a>
<div class="comm_reply">
<i class="fa-reply"></i> <a rel='nofollow' class='comment-reply-link' href='#comment-828298' data-commentid="828298" data-postid="5102" data-belowelement="comment-828298" data-respondelement="respond" data-replyto="Reply to Serge" aria-label='Reply to Serge'>Reply</a> </div>
</div>
<div class="org_comment"><p>Thanks for the great tutorial! However while starting the installation it cannot connect to the database :/<br />
The following error appears:</p>
<p>Cannot select database</p>
<p>The database server could be connected to (which means your username and password is okay) but the test database could not be selected.</p>
</div>
</div>
</li>
</ul>

<div class="navigation">
</div>

<div id="respond" class="comment-respond">
<h3 id="reply-title" class="comment-reply-title">Leave a Comment <small><a rel="nofollow" id="cancel-comment-reply-link" href="/ubuntu/install-wordpress-ubuntu-20-04-nginx-mariadb-php7-4-lemp#respond" style="display:none;">Cancel reply</a></small></h3><form action="https://www.linuxbabe.com/wp-comments-post.php" method="post" id="commentform" class="comment-form"><div class="comment-policy">
<ul>
<li>Comments with links are moderated by admin before published.</li>
<li>Your email address will not be published.</li>
<li>Use <strong>&lt;pre&gt; ... &lt;/pre&gt;</strong> HTML tag to quote the output from your terminal/console.</li>
<li>Please use the community (<a href="https://community.linuxbabe.com" target="_blank">https://community.linuxbabe.com</a>) for questions unrelated to this article.</li>
<li>I don't have time to answer every question. <a href="https://www.linuxbabe.com/donation" target="_blank">Making a donation</a> would incentivize me to spend more time answering questions. </li>
</ul>
</div><p class="comment-form-comment"><label for="comment">Comment <span class="required">*</span></label> <textarea id="comment" name="comment" cols="45" rows="8" maxlength="65525" required="required"></textarea></p><div class="comm_wrap"><p class="comment-form-author"><input placeholder="Name" id="author" name="author" type="text" value="" size="30" aria-required='true' /></p>
<p class="comment-form-email"><input placeholder="Email" id="email" name="email" type="text" value="" size="30" aria-required='true' /></p>
<p class="comment-form-url"><input placeholder="Website" id="url" name="url" type="text" value="" size="30" /></p></div>
<p class="comment-form-attachment">
<label class="comment-form-attachment__label" for="attachment">
Attachment </label>
<input class="comment-form-attachment__input" id="attachment" name="attachment" type="file" accept=".jpg,.jpeg,.png" />
<span class="comment-form-attachment__file-size-notice">
The maximum upload file size: 2 MB. </span>
<span class="comment-form-attachment__file-types-notice">
You can upload: <abbr title="jpg, jpeg, png">image</abbr>. </span>
<span class="comment-form-attachment__autoembed-links-notice">
Links to YouTube, Facebook, Twitter and other services inserted in the comment text will be automatically embedded. </span>
<span class="comment-form-attachment__drop-area">
<span class="comment-form-attachment__drop-area-inner">
Drop file here </span>
</span>
</p>
<p class="form-submit"><input name="submit" type="submit" id="submit" class="submit" value="Post Comment" /> <input type='hidden' name='comment_post_ID' value='5102' id='comment_post_ID' />
<input type='hidden' name='comment_parent' id='comment_parent' value='0' />
</p></form> </div>
</div>

</div>
</div>

<div id="sidebar" class="home_sidebar ">
<div class="widgets">
<div id="search-2" class="widget widget_search" data-widget-id="search-2"><div class="widget_wrap"><form role="search" method="get" id="searchform" action="https://www.linuxbabe.com/">
<div>
<input placeholder="Search &hellip;" type="text" value="" name="s" id="s" />
<input type="submit" id="searchsubmit" value="Search" />
</div>
</form><span class="widget_corner"></span></div></div><div id="google_translate_widget-2" class="widget widget_google_translate_widget" data-widget-id="google_translate_widget-2"><div class="widget_wrap"><div id="google_translate_element"></div><span class="widget_corner"></span></div></div><div id="block-3" class="widget widget_block" data-widget-id="block-3"><div class="widget_wrap"><p><a href="https://www.linuxbabe.com/linux-system-security-lpic-2" target="_blank"><picture><source srcset="https://www.linuxbabe.com/wp-content/uploads/2020/09/linux-system-security-course-lpic-2-pluralsight.webp" type="image/webp"><img decoding="async" src="https://www.linuxbabe.com/wp-content/uploads/2020/09/linux-system-security-course-lpic-2-pluralsight.jpg" alt="linux system security course LPIC 2" class="webpexpress-processed"></picture></a></p><span class="widget_corner"></span></div></div>
<div id="wpp-2" class="widget popular-posts" data-widget-id="wpp-2"><div class="widget_wrap">
<h3 class="widgettitle">Featured Tutorials</h3> <div class="wpp-widget-placeholder" data-widget-id="wpp-2"></div>
<span class="widget_corner"></span></div></div>
<div id="custom_html-2" class="widget_text widget widget_custom_html" data-widget-id="custom_html-2"><div class="widget_text widget_wrap"><h3 class="widgettitle">pCloud 65% Off Cloud Storage</h3><div class="textwidget custom-html-widget"><a href="https://www.linuxbabe.com/cloud-storage/install-pcloud-drive-ubuntu" target='_blank' rel="noopener"><picture><source srcset="https://www.linuxbabe.com/wp-content/uploads/2019/11/pcloud-2TB-lifetime-263x219.webp" type="image/webp"><img src="https://www.linuxbabe.com/wp-content/uploads/2019/11/pcloud-2TB-lifetime-263x219.jpg" alt="pcloud 2TB lifetime" class="webpexpress-processed"></picture></a></div><span class="widget_corner"></span></div></div><div id="zoom-social-icons-widget-2" class="widget zoom-social-icons-widget" data-widget-id="zoom-social-icons-widget-2"><div class="widget_wrap"><h3 class="widgettitle">Follow us</h3>
<ul class="zoom-social-icons-list zoom-social-icons-list--with-canvas zoom-social-icons-list--round zoom-social-icons-list--no-labels">
<li class="zoom-social_icons-list__item">
<a class="zoom-social_icons-list__link" href="https://facebook.com/linuxbabe" target="_blank" title="Facebook" rel="nofollow noopener noreferrer">
<span class="screen-reader-text">facebook</span>
<span class="zoom-social_icons-list-span social-icon socicon socicon-facebook" data-hover-rule="background-color" data-hover-color="#3b5998" style="background-color : #3b5998; font-size: 26px; padding:9px"></span>
</a>
</li>
<li class="zoom-social_icons-list__item">
<a class="zoom-social_icons-list__link" href="https://twitter.com/linuxbabe" target="_blank" title="Twitter" rel="nofollow noopener noreferrer">
<span class="screen-reader-text">twitter</span>
<span class="zoom-social_icons-list-span social-icon socicon socicon-twitter" data-hover-rule="background-color" data-hover-color="#1da1f2" style="background-color : #1da1f2; font-size: 26px; padding:9px"></span>
</a>
</li>
<li class="zoom-social_icons-list__item">
<a class="zoom-social_icons-list__link" href="https://newsletter.linuxbabe.com/subscription/wkeY5d6pg" target="_blank" title="Default Label" rel="nofollow noopener noreferrer">
<span class="screen-reader-text">email-alt</span>
<span class="zoom-social_icons-list-span social-icon dashicons dashicons-email-alt" data-hover-rule="background-color" data-hover-color="#1e73be" style="background-color : #1e73be; font-size: 26px; padding:9px"></span>
</a>
</li>
<li class="zoom-social_icons-list__item">
<a class="zoom-social_icons-list__link" href="https://mewe.com/p/linuxbabe" target="_blank" title="Default Label" rel="nofollow noopener noreferrer">
<span class="screen-reader-text">mewe</span>
<span class="zoom-social_icons-list-span social-icon socicon socicon-mewe" data-hover-rule="background-color" data-hover-color="#17377F" style="background-color : #17377F; font-size: 26px; padding:9px"></span>
</a>
</li>
</ul>
<span class="widget_corner"></span></div></div><div id="block-5" class="widget widget_block" data-widget-id="block-5"><div class="widget_wrap"><h3 class="widgettitle">VPS Hosting 30 Days Free Trial</h3>
<p><a href="https://www.linuxbabe.com/linux-server/how-to-create-a-linux-vps-server-on-kamatera" target="_blank"><picture><source srcset="https://www.linuxbabe.com/wp-content/uploads/2021/08/kamatera-VPS.webp" type="image/webp"><img decoding="async" src="https://www.linuxbabe.com/wp-content/uploads/2021/08/kamatera-VPS.png" alt="Kamatera 30 days free trial" class="webpexpress-processed"></picture></a></p><span class="widget_corner"></span></div></div><div id="block-2" class="widget widget_block" data-widget-id="block-2"><div class="widget_wrap"><div data-mailtrain-subscription-widget="" data-url="https://newsletter.linuxbabe.com/subscription/wkeY5d6pg/widget"><a href="https://newsletter.linuxbabe.com/subscription/wkeY5d6pg">Subscribe to our list</a></div>
<script data-cfasync="false" src="/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"></script><script src="https://newsletter.linuxbabe.com/subscription/widget.js"></script><span class="widget_corner"></span></div></div> </div>
</div>

</div>
</div>
</div>
<a class="to_top "><i class="fa-angle-up fa-2x"></i></a>

<div class="footer_wrap layer_wrapper ">
<div id="footer">
<div class="center">

<div class="widgets">
<ul>
<li id="recent-posts-4" class="widget widget_recent_entries" data-widget-id="recent-posts-4"><div class="widget_wrap">
<h3 class="widgettitle">Recent Posts</h3>
<ul>
<li>
<a href="https://www.linuxbabe.com/linux-server/set-up-package-repository-debian-ubuntu-server">How to Set Up APT Package Repository on Debian/Ubuntu Server</a>
</li>
<li>
<a href="https://www.linuxbabe.com/it-knowledge/reasons-to-use-softphones-in-your-call-center">Reasons to Use Softphones in Your Call Center</a>
</li>
<li>
<a href="https://www.linuxbabe.com/linux-server/fix-common-lets-encrypt-certbot-errors">How to Fix Common Let&#8217;s Encrypt/Certbot Errors</a>
</li>
<li>
<a href="https://www.linuxbabe.com/cryptocurrency/is-hedera-and-the-hbar-network-most-effectively-tied-to-nfts">Is Hedera and the HBAR Network Most Effectively Tied to NFTs?</a>
</li>
<li>
<a href="https://www.linuxbabe.com/mail-server/linux-mail-server-monitoring-lightmeter-debian-ubuntu">Linux Mail Server Monitoring with Lightmeter (Debian, Ubuntu)</a>
</li>
</ul>
</li><li id="search-3" class="widget widget_search" data-widget-id="search-3"><div class="widget_wrap"><form role="search" method="get" id="searchform" action="https://www.linuxbabe.com/">
<div>
<input placeholder="Search &hellip;" type="text" value="" name="s" id="s" />
<input type="submit" id="searchsubmit" value="Search" />
</div>
</form></li><li id="yasr_recent_ratings_widget-2" class="widget widget_yasr_recent_ratings_widget" data-widget-id="yasr_recent_ratings_widget-2"><div class="widget_wrap"><h3 class="widgettitle">Recent Ratings</h3><table class="yasr-widget-recent-ratings-table"><tr>
<td class="yasr-widget-recent-ratings-td">Vote <span class="yasr-widget-recent-ratings-text yasr-widget-recent-ratings-vote">5</span>
<span class="yasr-widget-recent-ratings-from-user"> from <span class="yasr-widget-recent-ratings-text yasr-widget-recent-ratings-user">anonymous</span>
</span> on<span class="yasr-widget-recent-ratings-text yasr-widget-recent-ratings-title">
<a href="https://www.linuxbabe.com/mail-server/secure-email-server-ubuntu-postfix-dovecot"> Part 2: Install Dovecot IMAP server on Ubuntu &#038; Enable TLS Encryption</a>
</span></td>
</tr><tr>
<td class="yasr-widget-recent-ratings-td">Vote <span class="yasr-widget-recent-ratings-text yasr-widget-recent-ratings-vote">5</span>
<span class="yasr-widget-recent-ratings-from-user"> from <span class="yasr-widget-recent-ratings-text yasr-widget-recent-ratings-user">anonymous</span>
</span> on<span class="yasr-widget-recent-ratings-text yasr-widget-recent-ratings-title">
<a href="https://www.linuxbabe.com/nginx/how-to-install-nginx-mainline-branch-on-ubuntu-server"> How to Install Nginx Mainline on Ubuntu Server</a>
</span></td>
</tr><tr>
<td class="yasr-widget-recent-ratings-td">Vote <span class="yasr-widget-recent-ratings-text yasr-widget-recent-ratings-vote">5</span>
<span class="yasr-widget-recent-ratings-from-user"> from <span class="yasr-widget-recent-ratings-text yasr-widget-recent-ratings-user">anonymous</span>
</span> on<span class="yasr-widget-recent-ratings-text yasr-widget-recent-ratings-title">
<a href="https://www.linuxbabe.com/ubuntu/install-discourse-ubuntu-18-04-server-without-docker"> Install Discourse Forum Software on Ubuntu 20.04/18.04 Without Docker</a>
</span></td>
</tr><tr>
<td class="yasr-widget-recent-ratings-td">Vote <span class="yasr-widget-recent-ratings-text yasr-widget-recent-ratings-vote">5</span>
<span class="yasr-widget-recent-ratings-from-user"> from <span class="yasr-widget-recent-ratings-text yasr-widget-recent-ratings-user">anonymous</span>
</span> on<span class="yasr-widget-recent-ratings-text yasr-widget-recent-ratings-title">
<a href="https://www.linuxbabe.com/ubuntu/set-up-softether-vpn-server"> How to Set Up SoftEther VPN Server on Ubuntu 22.04/20.04</a>
</span></td>
</tr><tr>
<td class="yasr-widget-recent-ratings-td">Vote <span class="yasr-widget-recent-ratings-text yasr-widget-recent-ratings-vote">5</span>
<span class="yasr-widget-recent-ratings-from-user"> from <span class="yasr-widget-recent-ratings-text yasr-widget-recent-ratings-user">anonymous</span>
</span> on<span class="yasr-widget-recent-ratings-text yasr-widget-recent-ratings-title">
<a href="https://www.linuxbabe.com/ubuntu/enable-google-tcp-bbr-ubuntu"> Easily Boost Ubuntu Network Performance by Enabling TCP BBR</a>
</span></td>
</tr></table></li> </ul>
</div>

</div>

<div id="copyright" class="soc_right">
<div class="center">

<div class="copytext"><p>© LinuxBabe.Com | Read The Friendly Manual</p></div>

<div class="foot_right_wrap">

<div id="footer_menu" class=""><div class="menu-footer"><ul id="menu-footer-navigation" class="menu"><li id="menu-item-5686" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-home menu-item-5686"><a href="https://www.linuxbabe.com">Home</a></li>
<li id="menu-item-5685" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-5685"><a href="https://www.linuxbabe.com/html-sitemap">HTML Sitemap</a></li>
<li id="menu-item-10720" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-10720"><a href="https://www.linuxbabe.com/donation">Donation</a></li>
<li id="menu-item-19635" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-19635"><a href="https://www.linuxbabe.com/about-me">About Me</a></li>
<li id="menu-item-488" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-488"><a href="https://www.linuxbabe.com/contact-us">Contact Me</a></li>
<li id="menu-item-449" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-privacy-policy menu-item-449"><a href="https://www.linuxbabe.com/privacy-policy">Privacy Policy</a></li>
<li id="menu-item-450" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-450"><a href="https://www.linuxbabe.com/terms-of-service">Terms &#038; Conditions</a></li>
<li id="menu-item-451" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-451"><a href="https://www.linuxbabe.com/disclaimer">Disclaimer</a></li>
</ul></div></div>


<div class="foot_soc">
<div class="social_bookmarks bookmark_simple bookmark_size_normal">
<a target="_blank" class="ast_twt" href="https://www.facebook.com/linuxbabe/"><i class="fa-twitter"></i></a> <a target="_blank" class="ast_gplus" href="https://twitter.com/linuxbabe"><i class="fa-google-plus"></i></a>
<a target="_blank" class="ast_flckr" href="https://mewe.com/p/linuxbabe"><i class="fa-flickr"></i></a>
</div></div>

</div>
</div>
</div>

</div>

</div>
<link rel='stylesheet' id='yasrcss-css' href='https://www.linuxbabe.com/wp-content/plugins/yet-another-stars-rating/includes/css/yasr.css?ver=3.1.6' type='text/css' media='all' />
<style id='yasrcss-inline-css' type='text/css'>

            .yasr-star-rating {
                background-image: url('https://www.linuxbabe.com/wp-content/plugins/yet-another-stars-rating/includes/img/star_2.svg');
            }
            .yasr-star-rating .yasr-star-value {
                background: url('https://www.linuxbabe.com/wp-content/plugins/yet-another-stars-rating/includes/img/star_3.svg') ;
            }
</style>
<script type='text/javascript' src='https://www.linuxbabe.com/wp-includes/js/comment-reply.min.js?ver=6.1.1' id='comment-reply-js'></script>
<script type='text/javascript' src='https://www.linuxbabe.com/wp-content/plugins/social-icons-widget-by-wpzoom/assets/js/social-icons-widget-frontend.js?ver=1667914810' id='zoom-social-icons-widget-frontend-js'></script>
<script type='text/javascript' id='dco-comment-attachment-js-extra'>
/* <![CDATA[ */
var dco_ca = {"commenting_form_not_found":"The commenting form not found."};
/* ]]> */
</script>
<script type='text/javascript' src='https://www.linuxbabe.com/wp-content/plugins/dco-comment-attachment/assets/dco-comment-attachment.js?ver=2.4.0' id='dco-comment-attachment-js'></script>
<script type='text/javascript' id='yasr-window-var-js-extra'>
/* <![CDATA[ */
var yasrWindowVar = {"siteUrl":"https:\/\/www.linuxbabe.com","adminUrl":"https:\/\/www.linuxbabe.com\/wp-admin\/","ajaxurl":"https:\/\/www.linuxbabe.com\/wp-admin\/admin-ajax.php","visitorStatsEnabled":"yes","ajaxEnabled":"yes","loaderHtml":"<div id=\"yasr-loader\" style=\"display: inline-block\">\u00a0 <img src=\"https:\/\/www.linuxbabe.com\/wp-content\/plugins\/yet-another-stars-rating\/includes\/img\/loader.gif\" \n                 title=\"yasr-loader\" alt=\"yasr-loader\" height=\"16\" width=\"16\"><\/div>","loaderUrl":"https:\/\/www.linuxbabe.com\/wp-content\/plugins\/yet-another-stars-rating\/includes\/img\/loader.gif","isUserLoggedIn":"false","isRtl":"false","starSingleForm":"\"star\"","starsPluralForm":"\"stars\"","textAfterVr":"\"[Total: %total_count%  Average: %average%]\"","textRating":"\"Rating\"","textLoadRanking":"\"Loading, please wait\"","textVvStats":"\"out of 5 stars\"","textOrderBy":"\"Order by\"","textMostRated":"\"Most Rated\"","textHighestRated":"\"Highest Rated\"","textLeftColumnHeader":"\"Post\""};
/* ]]> */
</script>
<script type='text/javascript' src='https://www.linuxbabe.com/wp-content/plugins/yet-another-stars-rating/includes/js/yasr-globals.js?ver=3.1.6' id='yasr-global-functions-js'></script>
<script type='text/javascript' src='https://www.linuxbabe.com/wp-content/plugins/yet-another-stars-rating/includes/js/tippy.all.min.js?ver=3.6.0' id='tippy-js'></script>
<script type='text/javascript' src='https://www.linuxbabe.com/wp-content/plugins/yet-another-stars-rating/includes/js/shortcodes/visitorVotes.js?ver=3.1.6' id='yasr-front-vv-js'></script>
<script type='text/javascript' id='google-translate-init-js-extra'>
/* <![CDATA[ */
var _wp_google_translate_widget = {"lang":"en_US","layout":"0"};
/* ]]> */
</script>
<script type='text/javascript' src='https://www.linuxbabe.com/wp-content/plugins/jetpack/_inc/build/widgets/google-translate/google-translate.min.js?ver=11.6' id='google-translate-init-js'></script>
---
layout: post
title: cai wordpress
---
  
<script type='text/javascript' src='//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit&#038;ver=11.6' id='google-translate-js'></script>
<script src='https://stats.wp.com/e-202250.js' defer></script>
<script>
		_stq = window._stq || [];
		_stq.push([ 'view', {v:'ext',blog:'109478216',post:'5102',tz:'8',srv:'www.linuxbabe.com',j:'1:11.6'} ]);
		_stq.push([ 'clickTrackerInit', '109478216', '5102' ]);
	</script>
<script>
 (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
 (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
 m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
 })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-60768269-3', 'auto');
 ga('send', 'pageview');

</script>

<script async src="https://www.googletagmanager.com/gtag/js?id=G-RW8DN8RN3D"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-RW8DN8RN3D');
</script>

<script type="text/javascript">
  var _paq = window._paq = window._paq || [];
  /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  (function() {
    var u="//analytics.linuxbabe.com/";
    _paq.push(['setTrackerUrl', u+'matomo.php']);
    _paq.push(['setSiteId', '1']);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.type='text/javascript'; g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
  })();
</script>
<noscript><p><img src="//analytics.linuxbabe.com/matomo.php?idsite=1&amp;rec=1" style="border:0;" alt="" /></p></noscript>


<style id="" media="all">/* cyrillic-ext */
@font-face {
  font-family: 'Roboto Mono';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(/fonts.gstatic.com/s/robotomono/v22/L0xuDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_3vq_SeW4Ep0.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Roboto Mono';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(/fonts.gstatic.com/s/robotomono/v22/L0xuDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_3vq_QOW4Ep0.woff2) format('woff2');
  unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek */
@font-face {
  font-family: 'Roboto Mono';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(/fonts.gstatic.com/s/robotomono/v22/L0xuDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_3vq_R-W4Ep0.woff2) format('woff2');
  unicode-range: U+0370-03FF;
}
/* vietnamese */
@font-face {
  font-family: 'Roboto Mono';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(/fonts.gstatic.com/s/robotomono/v22/L0xuDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_3vq_S-W4Ep0.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Roboto Mono';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(/fonts.gstatic.com/s/robotomono/v22/L0xuDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_3vq_SuW4Ep0.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Roboto Mono';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(/fonts.gstatic.com/s/robotomono/v22/L0xuDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_3vq_ROW4.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
</style>

<script defer src="https://static.cloudflareinsights.com/beacon.min.js/vaafb692b2aea4879b33c060e79fe94621666317369993" integrity="sha512-0ahDYl866UMhKuYcW078ScMalXqtFJggm7TmlUtp0UlD4eQk0Ixfnm5ykXKvGJNFjLMoortdseTfsRT8oCfgGA==" data-cf-beacon='{"rayId":"7842ebe08be3108b","token":"f3d587570d094fe68c4cc8a6ec776c94","version":"2022.11.3","si":100}' crossorigin="anonymous"></script>
</body>
</html>
