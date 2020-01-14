---
layout: post
title: SugarCRM field visibility dependant on multiple values
permalink: /how-to/sugarcrm-field-visibility-dependant-on-multiple-values
post_id: 889
categories:
- How to
- SugarCRM
- SugarLogic
---

I've often got cause to make fields in SugarCRM (Professional and Corporate editions) to only appear based on the value of another field. We can do this easily using SugarLogic in Studio using this 'dependant' formula:


equal($fieldname_c,"value_1")

However today I need to make this particular field visible if the field it is dependant on is one of a few values. Thusly a different 'dependant formula is required:


isInList($fieldname_c,createList("value_1","value_2","value_3"))

Hat tip to Anton in Sugar Support for pointing to the '
[isInList()](http://support.sugarcrm.com/04_Find_Answers/02KB/02Administration/100Studio_and_Module_Builder/Sugar_Logic/Dependent_Field_%3A_Display_Based_on_List_Values)' instead of trying to build something with nested ifElse()'s.
