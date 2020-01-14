---
layout: post
title: How to convert UTC time to current timezone in MySQL
permalink: /sugarcrm/how-to-convert-utc-time-to-current-timezone-in-mysql
post_id: 1115
categories:
- Code
- mysql
- SugarCRM
- Timezone
---

Using SugarCRM (this client is using Enterprise 6.5.15) and we want the last two hundred items in the tracker table. The problem is that the `tracker`.`date_modified` field is in UTC time, not the local time zone, which is +10:00.

The solution is to use the CONVERT_TZ MySQL command, as shown in the example below. It will convert between timezones for you.


SELECT `users`.`user_name` AS "User",
 `tracker`.`module_name` AS "Module",
 `tracker`.`item_summary` AS "Summary",
 `tracker`.`action` AS "Action",
CONVERT_TZ(`tracker`.`date_modified`,'+00:00','+10:00') AS "Modified"
FROM `users`
INNER JOIN `tracker` ON
`users`.`id` = `tracker`.`user_id`
WHERE `tracker`.`deleted` = 0
ORDER BY `tracker`.`date_modified` DESC
LIMIT 200
