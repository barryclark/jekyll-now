---
layout: post
title: Today - Performance, Copyright and Licensing
categories: dsgn270
---
## Housekeeping
- Library
- CPRG 210 Reference

## 1. Performance
### Learning Objectives
- Define First Contentful Paint (FCP).
- Define First Meaningful Paint (FMP).
- Locate the Audit tab in Chrome Developer Tools.
- Locate the Performance tab in browser Developer Tools
- Profile a website using the Audit and Performance tabs in Dev Tools.

### Terminology
<dl>
  <dt>First Contentful Paint (FCP)</dt>
  <dd>The first content that is rendered on the screen when users browse the website. It measures the time from navigation to the time when the browser renders the first piece of content defined in the Document Object Model (DOM). This can be text, an image or canvas render.</dd>
  <dt>First Meaningful Paint (FMP)</dt>
  <dd>The primary content of the page is visible. After the first meaningful paint render, it gives meaningful information to the users.</dd>
</dl>

> "Whenever you are testing your website on speed testing tools such as Google’s PageSpeed Insights, GTMetrix.com  you see the result with First Contentful Paint and First Meaningful Paint along with other speed metrics. These are important user-centric metrics that can tell you a lot about how long your visitors are waiting for content."

See: [First Contentful Paint (FCP) and First Meaningful Paint (FMP) Explained](https://www.acmethemes.com/blog/first-contentful-paint-and-first-meaningful-paint/)

### Activity: Performance Audits
You will work in groups of 3 or 4 for this activity.

After a short demo from your instructor, evaluate your favourite sites using the Performance and Lighthouse (an audit tool) tabs in Chrome Dev Tools.
- Which sites score the lowest?
- Which score the highest?
- In each case, what was the FCP and FMP?

Select a representative from your group to summarize your findings for the rest of the class.

## 2. Copyright & Licensing
### Learning Objectives
- Describe the concepts of copyright, public domain and Creative Commons.
- List some of the ways you can legally obtain content to use for free on a website.
- Explain the potential legal issues around privacy laws and websites.
- Find tool alternatives with divergent searches.

### Terminology
<dl>
  <dt>Copyright</dt>
  <dd>The exclusive legal right to produce, reproduce, publish or perform an original literary, artistic, dramatic or musical work. The creator is usually the copyright owner. However, an employer—for example, a film studio—may have copyright in works created by employees unless there is an agreement in place stating otherwise.</dd>
  <dt>License</dt>
  <dd>Legal terms that allow someone else to use a work for certain purposes and under certain conditions. The copyright owner still retains ownership.</dd>
</dl>

See:
- [Copyright Cheatsheet]({{site.baseurl}}/cheatsheets/copyright/open-assets)
- [Privacy Cheatsheet]({{site.baseurl}}/cheatsheets/privacy)

### Activity: Finding open asset alternatives
You will be working in groups of 3 for this activity.

Using [Google Suggest](https://en.ryte.com/wiki/Google_Suggest), find relevant alternatives to the tools and services listed in the [Open-source Assets Cheatsheet]({{site.baseurl}}/cheatsheets/open-assets).

Are there any that should be listed in the Cheatsheet?

## 3. Lab Time
1. Configure and Customize VS Code
    - configuration
      - Set tab length to 2 spaces
    - Extensions
      - Live Server (currently at v5.6.1)
      - Bracket Pair Colourizer (currently at v1.0.61)
      - Optional: HTML/CSS validator of your choice
        - Tony uses HTMLHint ( currently at v0.8.0). It's ok. 
      - Search: [best vs code extensions](https://www.google.com/search?q=best+VS+Code+extensions) 
    - See: [VS Code Tips and Tricks](https://code.visualstudio.com/docs/getstarted/tips-and-tricks)
2. ???

## Clean up time!
- [Tomorrow's homework and agenda]({{site.baseurl}}/tomorrow)