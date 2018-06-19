---
layout: post
title: Правильно обновлять Ответственного в сделках Bitrix24 КП
---

И так. Нужно перебить поле отвественного во всех сделках заново, чтобы сами отвественные видели эти сделки. Потому что кто-то напрямую вносил изменения в БД минуя API битрикса, при внесении сделок.

Имеем > 586 тыс. сделок (deal) на портале. В таблице **b_crm_entity_perms** из-за кривого внесения неправильно прописаны права на доступ к сделкам. Автор создавший сделок видит а отвественный пользователь нет.

Поэтому, разработал скрипт который пробегается по всем сделкам. И на основе записи по полю ответственный «ASSIGNED_BY_ID» у сделки обновлять таблицу прав доступа к ниму.


{% highlight php %}
<?php
use Bitrix\Main\Diag\Debug;
 
// не хватит памяти для обработки 586К сделок
ini_set('memory_limit', '1024M');
 
// может быть очень долго будет работать
set_time_limit(0);
 
define('NO_KEEP_STATISTIC', true);
define('NOT_CHECK_PERMISSIONS', true);
define('BX_CAT_CRON', true);
define('NO_AGENT_CHECK', true);
 
$_SERVER['DOCUMENT_ROOT'] = '/home/bitrix/www';
require_once($_SERVER['DOCUMENT_ROOT'] . '/bitrix/modules/main/include/prolog_before.php');
 
\Bitrix\Main\Loader::includeModule('crm');
 
// получаем все сделки которые есть в портале
$dbDeal = \CCrmDeal::GetList([], ['CHECK_PERMISSIONS' => 'N']);
 
$arDeal = [];
 
while ($deal = $dbDeal->Fetch()) {
    $arDeal[] = ['ID' => $deal['ID'], 'ASSIGNED_BY_ID' => $deal['ASSIGNED_BY_ID']];
}
 
unset($dbDeal);
 
$count = count($arDeal);
 
/* @var \CCrmDeal $deal */
$deal = new \CCrmDeal(false);
 
for ($i = 0; $i < $count; $i++) {
 
    $obj = $arDeal[$i];
 
    $arFields = ['ASSIGNED_BY_ID' => $obj['ASSIGNED_BY_ID']];
 
    $DB->StartTransaction();
 
    // для быстроты лучше отключить индексацию для поиска и сравнение, разгрузка по памяти будет
    if ($b = $deal->Update($obj['ID'], $arFields, false, false,
        ['DISABLE_USER_FIELD_CHECK' => true])) {
        $DB->Commit();
 
        $arErrors = [];
 
        // Обязательно нужно стартануть БП, иначе не обновяться права на доступ
        CCrmBizProcHelper::AutoStartWorkflows(
            CCrmOwnerType::Deal,
            $obj['ID'],
            CCrmBizProcEventType::Edit,
            $arErrors
        );
 
        if ($arErrors) {
            Debug::dumpToFile($arErrors);
        }
    } else {
        $DB->Rollback();
        Debug::dumpToFile($DB->GetErrorMessage());
    }
}
 
require_once($_SERVER['DOCUMENT_ROOT'] . '/bitrix/modules/main/include/epilog_after.php');
{% endhighlight %}


Вся проблема была из-за того что после создания сделки кривым способом, не был вызван штатный БП на редактирования сделок.
Бизнес-процесс не обрабатываются автоматически по событию. Либо же нужно было добить код, и чтобы в таблице **b_crm_entity_perms** были пробиты id отвественных менеджеров.

Если вдруг вылезут ошибки при обновления прав, то в корне проекта должно появиться лог __bx_log.log c записями от чего все.
