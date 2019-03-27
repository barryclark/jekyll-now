
/*
 * prefiks
 * https://github.com/Leny/prefiks
 *
 * Copyright (c) 2014 Leny
 * Licensed under the MIT license.
 */
"use strict";
var fPrefixSort, lodash, oAgents, oCaniuseData, semver, _getBrowser, _versionToSemver;

oCaniuseData = require("caniuse-db/data.json");

semver = require("semver");

lodash = require("lodash");

oAgents = oCaniuseData.agents;

fPrefixSort = function(sPrefix) {
  return sPrefix.length;
};

_getBrowser = function(sBrowserName) {
  var oAgent, sAgent;
  sAgent = (function() {
    switch (sBrowserName.toLowerCase()) {
      case "ie":
      case "internet explorer":
      case "internet-explorer":
      case "internet_explorer":
      case "internetexplorer":
        return "ie";
      case "firefox":
      case "ff":
        return "firefox";
      case "chrome":
        return "chrome";
      case "safari":
        return "safari";
      case "opera":
        return "opera";
      case "ios_saf":
      case "ios":
      case "ios-safari":
        return "ios_saf";
      case "op_mini":
      case "opera-mini":
      case "opera_mini":
      case "operamini":
        return "op_mini";
      case "android":
      case "android-browser":
        return "android";
      case "op_mob":
      case "opera-mobile":
      case "operamobile":
      case "opera_mobile":
        return "op_mob";
      case "bb":
      case "blackberry":
      case "blackberry-browser":
        return "bb";
      case "and_chr":
      case "android-chrome":
      case "android_chrome":
      case "androidchrome":
        return "and_chr";
      case "and_ff":
      case "android-firefox":
      case "android_firefox":
      case "androidfirefox":
        return "and_ff";
      case "ie_mob":
      case "ie-mobile":
      case "ie_mobile":
      case "iemobile":
        return "ie_mob";
      default:
        return null;
    }
  })();
  if (sAgent) {
    oAgent = oAgents[sAgent];
    oAgent["name"] = sAgent;
    return oAgent;
  }
};

_versionToSemver = function(sVersion) {
  if (semver.valid(sVersion)) {
    return sVersion;
  }
  sVersion += ".0";
  if (semver.valid(sVersion)) {
    return sVersion;
  }
  sVersion += ".0";
  if (semver.valid(sVersion)) {
    return sVersion;
  }
};

module.exports = function(sFeature, mBrowsers, mGivenVersion) {
  var aPrefixes, bUseDefaulfPrefix, oBrowser, oBrowserFeatureImplementations, oBrowsersHash, oFeature, sBrowser, sExceptionPrefix, sGivenVersionRange, sImplementation, sInterval, sPrefixExceptionVersion, sVersion, _i, _len, _ref, _ref1;
  if (mGivenVersion == null) {
    mGivenVersion = "*";
  }
  if (!(oFeature = oCaniuseData.data[sFeature])) {
    throw new Error("Unknown feature '" + sFeature + "' !");
  }
  if (typeof mBrowsers === "string") {
    oBrowsersHash = {};
    oBrowsersHash[mBrowsers] = mGivenVersion;
  } else {
    oBrowsersHash = mBrowsers;
  }
  aPrefixes = [];
  for (sBrowser in oBrowsersHash) {
    mGivenVersion = oBrowsersHash[sBrowser];
    if (!(oBrowser = _getBrowser(sBrowser))) {
      throw new Error("Unknown browser '" + sBrowser + "' !");
    }
    sGivenVersionRange = semver.validRange(mGivenVersion.toString());
    if (!(oBrowserFeatureImplementations = oFeature.stats[oBrowser.name])) {
      continue;
    }
    for (sInterval in oBrowserFeatureImplementations) {
      sImplementation = oBrowserFeatureImplementations[sInterval];
      _ref = sInterval.split("-");
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        sVersion = _ref[_i];
        if (semver.satisfies(_versionToSemver(sVersion), sGivenVersionRange)) {
          if (sImplementation && sImplementation.indexOf("x") !== -1) {
            bUseDefaulfPrefix = true;
            if (oBrowser.prefix_exceptions) {
              _ref1 = oBrowser.prefix_exceptions;
              for (sPrefixExceptionVersion in _ref1) {
                sExceptionPrefix = _ref1[sPrefixExceptionVersion];
                if (!(semver.satisfies(_versionToSemver(sPrefixExceptionVersion), sGivenVersionRange))) {
                  continue;
                }
                bUseDefaulfPrefix = false;
                aPrefixes.push(sExceptionPrefix);
              }
            }
            if (bUseDefaulfPrefix || sGivenVersionRange === "*") {
              aPrefixes.push(oBrowser.prefix);
            }
          }
        }
      }
    }
  }
  return lodash.sortBy(lodash.unique(aPrefixes), fPrefixSort).reverse();
};
