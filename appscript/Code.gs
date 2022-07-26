/**
 * @OnlyCurrentDoc
 */

var RECAPTCHA_SECRET_KEY = null; //TODO add this if using RECAPTCHA
var RECAPTCHA_THRESHOLD = .4;
var CACHING_ENABLED = true;

/* Consts used so that typos don't occur between usages */
const SHEET_CACHE_KEY = "sheet_comment_data_cache_key";
const SHEET_CAHCE_HEADERS_KEY = "sheet_headers_data_cache_key";
const COLUMN_TIMESTAMP = "columnTimestamp";
const COLUMN_URL ="columnUrl";
const COLUMN_NAME = "columnName";
const COLUMN_COMMENT = "columnComment";
const COLUMN_IS_AUTHOR = "columnIsAuthor";

function doGet(req) {
  var url = req?.parameter?.url || null;

  if (url == null) {
    return getError("Required URL Parameter is null");
  }

  var cache = CacheService.getScriptCache();
  var cachedSheet = cache.get(SHEET_CACHE_KEY);
  var cachedHeaders = cache.get(SHEET_CAHCE_HEADERS_KEY);
  var sheetData;
  var headers;
  if (CACHING_ENABLED && cachedSheet != null && cachedHeaders != null ) {
    sheetData = JSON.parse(cachedSheet);
    headers = JSON.parse(cachedHeaders);
  } else {
    var sh = SpreadsheetApp.getActiveSheet();
  
    var sheetHeaders = sh.getSheetValues(1, 1, 1, sh.getLastColumn())[0];
    headers = {};
    headers[COLUMN_TIMESTAMP] = sheetHeaders.findIndex(element => "timestamp".toUpperCase() === element.toUpperCase());
    headers[COLUMN_URL] = sheetHeaders.findIndex(element => element.toUpperCase().includes("url".toUpperCase()));
    headers[COLUMN_NAME] = sheetHeaders.findIndex(element => "name".toUpperCase() === element.toUpperCase());
    headers[COLUMN_COMMENT] = sheetHeaders.findIndex(element => "comment".toUpperCase() === element.toUpperCase());
    headers[COLUMN_IS_AUTHOR] = sheetHeaders.findIndex(element => "isAuthor".toUpperCase() === element.toUpperCase());

    /* Ensure required rows are there, technically isAuthor is not required, so we don't check for it at this point */
    if (headers[COLUMN_TIMESTAMP] == null || headers[COLUMN_TIMESTAMP] < 0) {
      return getError("Can't find 'timestamp' column in Google Sheet");
    }
    if (headers[COLUMN_URL] == null || headers[COLUMN_URL] < 0) {
      return getError("Can't find 'article url' column in Google Sheet");
    }
    if (headers[COLUMN_NAME] == null || headers[COLUMN_NAME] < 0) {
      return getError("Can't find 'name' column in Google Sheet");
    }
    if (headers[COLUMN_COMMENT] == null || headers[COLUMN_COMMENT] < 0) {
      return getError("Can't find 'comment' column in Google Sheet");
    }

    var numRows = sh.getLastRow() - 1;
    if (numRows == 0) {
      return ContentService
      .createTextOutput(JSON.stringify([]))
      .setMimeType(ContentService.MimeType.JSON);
    }
    sheetData = sh.getSheetValues(2, 1, sh.getLastRow() - 1, sh.getLastColumn())
    /* Cache data for 1 hour OR until an error occurs OR a new comment is added */
    cache.put(SHEET_CACHE_KEY, JSON.stringify(sheetData), 3600);
    cache.put(SHEET_CAHCE_HEADERS_KEY, JSON.stringify(headers), 3600);
  }

  var values = sheetData
    .sort((a, b) => a[headers[COLUMN_TIMESTAMP]] - b[headers[COLUMN_TIMESTAMP]])
    .filter(element => (element[headers[COLUMN_TIMESTAMP]] || 0) != 0)
    .filter(element => element[headers[COLUMN_URL]] == url);

  var data = values.map(element => {
    return {
      "timestamp" : element[headers[COLUMN_TIMESTAMP]] || 0,
      "name" : element[headers[COLUMN_NAME]] || "",
      "comment" : element[headers[COLUMN_COMMENT]] || "",
      "isAuthor" : element[headers[COLUMN_IS_AUTHOR]] || false
    }
  })

  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function getError(errorText) {
  clearCachedData();
  return ContentService
    .createTextOutput(JSON.stringify({
      "error": errorText
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(req) {
  var bodyData = JSON.parse(req?.postData?.contents || "{}")

  if (RECAPTCHA_SECRET_KEY != null) {
    var recaptchaToken = bodyData?.recaptchaToken || null;
    if (recaptchaToken == null) {
      return getError("POST body missing required 'recaptchaToken' paramter (which must also be non-empty)");
    }

    var formData = {
      "secret": RECAPTCHA_SECRET_KEY,
      "response": recaptchaToken
    };
    var options = {
      "method" : "post",
      "payload" : formData
    };

    var recaptchaResponse = JSON.parse(UrlFetchApp.fetch("https://www.google.com/recaptcha/api/siteverify", options).getContentText());
    try {
      var sucess = recaptchaResponse.success || false;
      if (!sucess) {
        return getError("reCAPTCHA is required but appears to be misconfigured on the site")
      }
      var score = recaptchaResponse.score || 0;
      if (score < RECAPTCHA_THRESHOLD) {
        return getError("reCAPTCHA suspects bot behavior, please try again in a bit")
      }
    } catch {
      return getError("reCAPTCHA could not be verified");
    }
  }

  clearCachedData();

  var url = bodyData?.url || null;
  var name = bodyData?.name || null;
  var comment = bodyData?.comment || null;

  if (url == null || url == "") {
    return getError("POST body missing required 'url' paramter (which must also be non-empty)");
  }
  if (name == null || name == "") {
    return getError("POST body missing required 'name' paramter (which must also be non-empty)");
  }
  if (comment == null || comment == "") {
    return getError("POST body missing required 'comment' paramter (which must also be non-empty)");
  }

  var sh = SpreadsheetApp.getActiveSheet();
  var headers = sh.getSheetValues(1, 1, 1, sh.getLastColumn())[0];
  var columnTimestamp = headers.findIndex(element => "timestamp".toUpperCase() === element.toUpperCase());
  var columnUrl = headers.findIndex(element => element.toUpperCase().includes("url".toUpperCase()));
  var columnName = headers.findIndex(element => "name".toUpperCase() === element.toUpperCase());
  var columnComment = headers.findIndex(element => "comment".toUpperCase() === element.toUpperCase());

  /* Ensure required rows are there, technically isAuthor is not required, so we don't check for it at this point */
  if (columnTimestamp < 0) {
    return getError("Can't find 'timestamp' column in Google Sheet");
  }
  if (columnUrl < 0) {
    return getError("Can't find 'article url' column in Google Sheet");
  }
  if (columnName < 0) {
    return getError("Can't find 'name' column in Google Sheet");
  }
  if (columnComment < 0) {
    return getError("Can't find 'comment' column in Google Sheet");
  }

  var newRow = [];

  for (let i = 0; i < sh.getLastColumn(); i++) {
    switch(i) {
      case columnTimestamp:
        newRow.push(new Date());
        break;
      case columnUrl:
        newRow.push(url);
        break;
      case columnName:
        newRow.push(name);
        break;
      case columnComment:
        newRow.push(comment);
        break;
      default:
        newRow.push(null);
    }
  }

  try {
    sh.appendRow(newRow);
    return doGet({ parameter : { url : url }});
  } catch {
    return getError("Submission failed, please try again in a bit.");
  }
}

/**
 * Function used in Apps Script Editor to test functionality
 * and grant permissions. If you want to validate output, you
 * can change the url parameter below
 */
function testGetComments() {
  var start = Date.now()
  var results = doGet({ parameter : { url : "test-url"}}).getContent();
  Logger.log("doGet results:")
  Logger.log(results);
  var end = Date.now()
  Logger.log("Run took " + (end - start) + " millis")
}

/**
 * Function used in Apps Script Editor to test functionality
 * and grant permissions. If you want to validate output, you
 * can change the url, name, and comment parameters below
 */
function testPostComment() {
  var testResponse = {
    postData : {
      contents : JSON.stringify({
        url : "test-url",
        recaptchaToken: "abc",
        name: "test-name",
        comment: "test-comment"
      })
    }
  }
  var results = doPost(testResponse).getContent();
  Logger.log("doPost results:");
  Logger.log(results);
}

/**
 * Function that can be used to clear the cached comment data
 */
function clearCachedData() {
  var cache = CacheService.getScriptCache();
  cache.removeAll([SHEET_CACHE_KEY, SHEET_CAHCE_HEADERS_KEY]);
}

/**
 * Triggered when the spreadsheet is updated. 
 * This is so that the comment cache is cleared when the spreadsheet
 * is manually edited so that developer changes to the spreadsheet
 * are reflected immediately and not hindered by the cache system.
 */
function onEdit(e) {
  clearCachedData();
  Logger.log("Spreadsheet was edited, so cache was cleared");
}