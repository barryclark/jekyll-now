###
 * prefiks
 * https://github.com/Leny/prefiks
 *
 * Copyright (c) 2014 Leny
 * Licensed under the MIT license.
###

"use strict"

oCaniuseData = require "caniuse-db/data.json"
semver = require "semver"
lodash = require "lodash"

oAgents = oCaniuseData.agents

fPrefixSort = ( sPrefix ) -> sPrefix.length

_getBrowser = ( sBrowserName ) ->
    # TODO add many more aliases
    sAgent = switch sBrowserName.toLowerCase()
        when "ie", "internet explorer", "internet-explorer", "internet_explorer", "internetexplorer" then "ie"
        when "firefox", "ff" then "firefox"
        when "chrome" then "chrome"
        when "safari" then "safari"
        when "opera" then "opera"
        when "ios_saf", "ios", "ios-safari" then "ios_saf"
        when "op_mini", "opera-mini", "opera_mini", "operamini" then "op_mini"
        when "android", "android-browser" then "android"
        when "op_mob", "opera-mobile", "operamobile", "opera_mobile" then "op_mob"
        when "bb", "blackberry", "blackberry-browser" then "bb"
        when "and_chr", "android-chrome", "android_chrome", "androidchrome" then "and_chr"
        when "and_ff", "android-firefox", "android_firefox", "androidfirefox" then "and_ff"
        when "ie_mob", "ie-mobile", "ie_mobile", "iemobile" then "ie_mob"
        else null
    if sAgent
        oAgent = oAgents[ sAgent ]
        oAgent[ "name" ] = sAgent
        return oAgent

_versionToSemver = ( sVersion ) ->
    return sVersion if semver.valid sVersion
    sVersion += ".0"
    return sVersion if semver.valid sVersion
    sVersion += ".0"
    return sVersion if semver.valid sVersion

module.exports = ( sFeature, mBrowsers, mGivenVersion = "*" ) ->
    throw new Error "Unknown feature '#{ sFeature }' !" unless oFeature = oCaniuseData.data[ sFeature ]

    if typeof mBrowsers is "string"
        oBrowsersHash = {}
        oBrowsersHash[ mBrowsers ] = mGivenVersion
    else
        oBrowsersHash = mBrowsers

    aPrefixes = []

    for sBrowser, mGivenVersion of oBrowsersHash
        return throw new Error "Unknown browser '#{ sBrowser }' !" unless oBrowser = _getBrowser sBrowser

        sGivenVersionRange = semver.validRange mGivenVersion.toString()

        continue unless oBrowserFeatureImplementations = oFeature.stats[ oBrowser.name ]

        for sInterval, sImplementation of oBrowserFeatureImplementations
            for sVersion in sInterval.split "-" when semver.satisfies _versionToSemver( sVersion ), sGivenVersionRange
                if sImplementation and sImplementation.indexOf( "x" ) isnt -1
                    bUseDefaulfPrefix = yes
                    if oBrowser.prefix_exceptions
                        for sPrefixExceptionVersion, sExceptionPrefix of oBrowser.prefix_exceptions when semver.satisfies _versionToSemver( sPrefixExceptionVersion ), sGivenVersionRange
                            bUseDefaulfPrefix = no
                            aPrefixes.push sExceptionPrefix
                    aPrefixes.push oBrowser.prefix if bUseDefaulfPrefix or sGivenVersionRange is "*"

    lodash.sortBy( lodash.unique( aPrefixes ), fPrefixSort ).reverse()
