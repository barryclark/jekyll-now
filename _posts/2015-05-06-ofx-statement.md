---
layout: post
title: OFX Statement
tags:
  - ofx
  - personal finance
  - budget
  - development
author: Daniel Smith
---

See the code below for how to make a successful OFX call to Capital One 360. Other banks may have slightly different implementations of the OFX standard, and some don't support OFX out of the box.

```html
OFXHEADER:100
DATA:OFXSGML
VERSION=102
SECURITY=NONE
ENCODING=USASCII
CHARSET:1252
COMPRESSION:NONE
OLDFILEUID=NONE
NEWFILEUID=NONE

<OFX>
  <SIGNONMSGSRQV1>
    <SONRQ>
      <DTCLIENT>{a date in %Y%m%d%H%M%S.%L string/float format}
      <USERID>{a userid for a bank}
      <USERPASS>{password for a bank}
      <LANGUAGE>ENG
    </SONRQ>
  </SIGNONMSGSRQV1>
  <BANKMSGSRQV1>
  <ACCTINFOTRNRQ>
    <ACCTINFORQ>
      <DTACCTUP>{a date in %Y%m%d%H%M%S.%L string/float format}
    </ACCTINFORQ>
  </ACCTINFOTRNRQ>
  </BANKMSGSRQV1>
</OFX>
```

The OFX documents are available online, but like many standards documents that are designed by committee, they tend to be a bit cryptic. The request above, when POSTed to your [bank's ofx page](http://www.ofxhome.com/index.php/home/directory), will return a list of the accounts for that user. This works for Capital One 360 for me. The return data looks something like this:

```html
OFXHEADER:100
DATA:OFXSGML
VERSION:102
SECURITY:NONE
ENCODING:USASCII
CHARSET:1252
COMPRESSION:NONE
OLDFILEUID:NONE
NEWFILEUID:

<OFX>
  <SIGNONMSGSRSV1>
    <SONRS>
      <STATUS>
        <CODE>0
        <SEVERITY>INFO
      </STATUS>
      <DTSERVER>20150507014746.741
      <LANGUAGE>ENG
      <DTACCTUP>20150507014746.741
    </SONRS>
  </SIGNONMSGSRSV1>
  <BANKMSGSRSV1>
    <ACCTINFOTRNRS>
      <TRNUID>
      <STATUS>
        <CODE>0
        <SEVERITY>INFO
      </STATUS>
      <ACCTINFORS>
        <DTACCTUP>19700101000000.000
        <ACCTINFO>
          <DESC>{the description the bank assigns to the account}
          <BANKACCTINFO>
            <BANKACCTFROM>
              <BANKID>{could be bank routing number here}
              <ACCTID>{the account id}
              <ACCTTYPE>{account type CHECKING/SAVINGS}
            </BANKACCTFROM>
            <SUPTXDL>Y
            <XFERSRC>N
            <XFERDEST>N
            <SVCSTATUS>ACTIVE
          </BANKACCTINFO>
        </ACCTINFO>
      </ACCTINFORS>
    </ACCTINFOTRNRS>
  </BANKMSGSRSV1>
</OFX>
```

The file format is RGML, a format I've had a hard time finding something to reliably parse it. I usually rely on Nokogiri to give me the nodes it can, then use regex to parse out the bits I need. For example, to get the account ID from the response above, I might use this:

```ruby
doc = Nokogiri::HTML(response.body)
doc.xpath('//acctinfo').each do |row|
  account\_id = row.to_xml[/<acctid>([^<]*)</, 1]
end
```

The regex basically is finding anything right after the `<acctid>` tag that isn't a `<` and returning that.

I have tried a few parsing gems, but nothing seems to have worked for me quite like I want.

Here is a request for a statement from one of the bank accounts that returns actual transactions:

```html
OFXHEADER:100
DATA:OFXSGML
VERSION=103
SECURITY=NONE
ENCODING=USASCII
CHARSET:1252
COMPRESSION:NONE
OLDFILEUID=NONE
NEWFILEUID=NONE

<OFX>
  <SIGNONMSGSRQV1>
    <SONRQ>
      <DTCLIENT>{dtclient}
      <USERID>{userid}
      <USERPASS>{userpass}
      <LANGUAGE>ENG
      <APPID>PFIN
      <APPVER>0001
    </SONRQ>
  </SIGNONMSGSRQV1>
  <BANKMSGSRQV1>
    <STMTTRNRQ>
      <TRNUID>{trnuid}
      <STMTRQ>
        <BANKACCTFROM>
          <BANKID>{bankid}
          <ACCTID>{acctid}
          <ACCTTYPE>{accttype}
        </BANKACCTFROM>
        <INCTRAN>
          <DTSTART>{dtstart}
          <DTEND>{dtend}
          <INCLUDE>Y
        </INCTRAN>
      </STMTRQ>
    </STMTTRNRQ>
  </BANKMSGSRQV1>
</OFX>
```

At one point I had gotten a credit card connection to work as well, but can't seem to find the one that did the trick. When I get a chance to hack on it some more, I'll post it as well.