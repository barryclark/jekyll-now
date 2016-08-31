Raccolte fondi

{% for member in site.data.raccolte %}

{{member.Chi}}
{% if member.Descrizione %}
{{member.Descrizione}}
{% endif %} {% if member.Intestazione %}
Intestazione:
{{member.Intestazione}}
{% endif %}

{% if member.IBAN %}

IBAN:
{{member.IBAN}}
{% endif %}

{% if member.BICSWIFT %}

BIC/SWIFT:
{{member.BICSWIFT}}
{% endif %}

{% if member.CCPostale %}

Cc postale:
{{member.CCPostale}}
{% endif %}

{% if member.Causale %}

Causale:
{{member.Causale}}
{% endif %}

{% if member.Link %}

Link:
{{member.Link}}
{% endif %}

{% endfor %}
