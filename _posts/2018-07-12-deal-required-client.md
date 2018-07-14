---
layout: post
title: Сделать обязательным полем клиенты (контакты) Bitrix24 CRM в сделках.
---

*И так, проблема.*
Есть сущность сделка в CRM. Нужно сделать так чтобы при создании и редактирования сделок, была проверка на обязательное
содержание клиентов, т.е. "Компании" или "Контакты". Без этого сделка не правильна.

*Решение.*
Добавим один обработчик **onBeforeCrmDealAddAndUpdate**, на два события, это добавления и редактирования сделок.

{% highlight php %}
AddEventHandler('crm', 'OnBeforeCrmDealAdd', ['Davletyarov\Core\Crm\Handler\DealHandler', 'onBeforeCrmDealAddAndUpdate'], 10000);
AddEventHandler('crm', 'OnBeforeCrmDealUpdate', ['Davletyarov\Core\Crm\Handler\DealHandler', 'onBeforeCrmDealAddAndUpdate'], 10000);
{% endhighlight %}

В самом хэндлере опишем так:

{% highlight php %}
<?php

namespace Davletyarov\Core\Crm\Handler;

class DealHandler
{
    public function onBeforeCrmDealAddAndUpdate(&$arFields)
    {
        if (!$arFields['COMPANY_ID'] && !$arFields['CONTACT_BINDINGS']) {
            // перебиваем штатный сообщение об ошибке
            $arFields['RESULT_MESSAGE'] = 'Клиент для сделки обязателен!';
            $GLOBALS['APPLICATION']->ThrowException('Клиент для сделки обязателен!');
            return false;
        }
    }
}
{% endhighlight %}

И все. Теперь без явного указания клиента, сделка в CRM не зафиксируется, а старые при редактирования придется дополнить.

**Заметка!!!**

Если не перебить, штатный мессэдж об ошибке, то при попытке добавления (редактирования) сделки без "Клиента" получим ошибку:
**Создание сделки отменено обработчиком события:**
![Штатный текст об ошибке](/images/error-message-deal.png)

и вот после перебивки

![Новый текст об ошибке](/images/new-error-message-deal.png)


