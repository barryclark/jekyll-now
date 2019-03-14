
keyring::keyring_unlock("clockify")
require('magrittr')

  clock <- httr::VERB(
    verb = "GET",
    url = paste0("https://api.clockify.me/api/workspaces/",
                 .api$clockify$workspaceID,"/timeEntries/"),
    httr::add_headers(`X-Api-Key` = .api$clockify$api),
    encode = "json"
  )



    times <- httr::VERB(
      verb = "GET",
      url = paste0("https://api.clockify.me/api/workspaces/",.api$clockify$workspaceID,
                   "/timeEntries/"),
      httr::add_headers(`X-Api-Key` = .api$clockify$api)#,
      #encode = "json"
    )

    # need to make a function to pull the details



      POST(url = paste0("https://api.clockify.me/api/workspaces/",.api$clockify$workspaceID,
                   "/reports/summary/"),
      httr::add_headers(`X-Api-Key` = .api$clockify$api,
                        `Content-Type`="application/json"),
      encode = "json",
      body = list(startDate = "2019-03-04T00:00:00.000Z",
                  endDate = "2019-03-08T23:59:59.999Z",
                  me = "false",
                  includeTimeEntries = "true",
                  billable = "both",
                  zoomLevel = "week",
                  description = "",
                  archived = "Active",
                  roundingOn = "false"),
      httr::verbose()
    )


