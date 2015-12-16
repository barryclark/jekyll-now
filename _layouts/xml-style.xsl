---
layout: null
source: 'http://www.evagoras.com/2011/02/10/improving-an-xml-feed-display-through-css-and-xslt/'
breadcrumbs: true
---
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" {{ page.stylesheetAttributes }}>
<xsl:output method="html" encoding="utf-8" />
<xsl:template match="{{ page.rootMatcher }}">
	<xsl:text disable-output-escaping="yes">&lt;!DOCTYPE html &gt;</xsl:text>
	<html>
	<head>
		<xsl:text disable-output-escaping="yes"><![CDATA[
		{% include _head.html %}
		]]></xsl:text>
	</head>
	<body id="top-of-page">
		<xsl:text disable-output-escaping="yes"><![CDATA[
		{% include _navigation.html %}
		{% include _masthead.html %}
		{% include alert warning=page.disclaimer classes="text-center" %}
		]]></xsl:text>
		{{ content }}
		<xsl:text disable-output-escaping="yes"><![CDATA[
		{% include _footer.html %}
		{% include _footer_scripts.html %}
		]]></xsl:text>
	</body>
	</html>
</xsl:template>
<xsl:template name="slugify">
	<xsl:param name="text" select="''" />
	<xsl:variable name="dodgyChars" select="' ,.#_-!?*:;=+|&amp;/\\'" />
	<xsl:variable name="replacementChar" select="'-----------------'" />
	<xsl:variable name="lowercase" select="'abcdefghijklmnopqrstuvwxyz'" />
	<xsl:variable name="uppercase" select="'ABCDEFGHIJKLMNOPQRSTUVWXYZ'" />
	<xsl:variable name="lowercased"><xsl:value-of select="translate( $text, $uppercase, $lowercase )" /></xsl:variable>
	<xsl:variable name="escaped"><xsl:value-of select="translate( $lowercased, $dodgyChars, $replacementChar )" /></xsl:variable>
	<xsl:value-of select="$escaped" />
</xsl:template>
</xsl:stylesheet>
