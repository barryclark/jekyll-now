---
layout: page
title: Search Engine Optimization
---

## What Is Seo?
- Methods, principles, and techniques used by people to organically
rank their web pages in search results

## Seo Factors 
### On-Page SEO
- Any type of search engine optimization that is done on the page. 
  - Structuring URLs, adding alt text to images, using keywords in your content, posting new content regularly
### Off-Page SEO
- Any kind of optimization that is done off the page
  - Guest blogging, link building, social media, content marketing

## Seo Best Practices
- Get Google to trust your website
  - Provide Value (content, content, content) 
  - Build Trust
    - age (age of domain, how fresh is your content) 
    - authority (trusted websites link back to us)

## The Algorithm
Google changes its algorithm often so that low quality sites can't "beat the system" and rank high on search results.

## Some Algorithm Updates In 2018
- Page speed became a ranking factor for mobile results (July 9, 2018)
- Google changed snippets (meta descriptions) shown on search results page to have a max limit of 150-160 characters (May 13, 2018)
- Mobile versions of websites (instead of desktop) are used to rank pages (March 26, 2018)

Source: https://moz.com/google-algorithm-change

## Black Hat Seo
Practices that go against SEO guidelines in order to get a site ranking higher in search results.
- keyword stuffing
- cloaking
- using private link networks

### KEYWORD STUFFING
Filling your content with irrelevant keywords to manipulate page
rank.
- lists of phone numbers without substantial added value
- blocks of text listing cities and states a web page is trying to rank for
- repeating the same words or phrases so often that it sounds unnatural

“We are in the business of selling **web development software**. **Web development software** is what we sell. If you are thinking of getting **web development software** get in touch with one of our **web development software** consultants.”

### CLOAKING
Showing one piece of content to users and a different piece of
content to search engines.

Treat search engine crawlers the same as your human visitors.

### Sneaky Redirects
Sending a visitor to a different URL than the one they initially clicked on.
- Redirects have a purpose and are supposed to help visitors, not confuse or lie to them

### Link Exchanges
Link exchanges used to be common SEO practice, but are now
usually a sign of Black Hat SEO.
- They don't help your rankings as much as one-way links. 
- Usually just a list of links and rarely actually relevant.

## How To Do Keyword Research For Seo

### Step 1: Make A List Of Important, Relevant Topics
- Come up with 5-10 topics you think are important to the business. 
- What topics do you want to rank for in search results?
- What do you blog about?
- What topics come up most often in sales conversations?

"web design", "custom CSS", "WordPress", "business", "developer collaboration", "blogging", "e-commerce"

## Step 2: Fill In Those Topics With Keywords
"web design"
- web design inspiration
- web design tips
- web design layout
- web design tutorials
- web design trends
- WordPress web design
- responsive web design
- how to tell if you need a new web design web design tools
- how to create a winning web design how to find a good web designer  

## Step 3: Research Related Search Terms

## STEP 4: CHECK FOR A MIX OF HEAD TERMS AND LONG-TAIL KEYWORDS
- **head terms**: keyword phrases that are generally shorter and more generic (1-3 words in length)
- **long-tail keywords**: phrases that contain 3 or more words

"web design" vs "how to optimize your web design"

## Step 5: Check Out The Competition
Use tools like https://www.semrush.com/ and https://serpstat.com/
to see what keywords your competition is ranking for

## Step 6: Focus On Specific Keywords 
Use Tools Like:
- https://moz.com/explorer/ 
- https://trends.google.com/trends/ 
- https://www.google.com/trends/correlate

These will help you see how well a keyword is doing and whether or not it's worth trying to rank for.

## Step 7: Adding Keywords To Your Content
1. Heading Tags (`h1`, `h2`, `h3`)
2. `<title></title>`
3. Throughout content
4. `<strong></strong>`
5. text in links
6. image filenames

## RETURN ON INVESTMENT (ROI)
### CALCULATING ROI
Sales Income - Costs = ROI 

Costs include:
- web development costs 
- hosting
- staff
- maintenance equipment
- rental advertising

## How Do Websites Generate Revenue
- Getting sales leads
- selling digital products (software, ebooks, music, etc.) 
- selling services (web development, web design, SEO) 
- advertising revenue (banner ads, Google Ads)
- donations (generally for non-profits)
- online courses
- affiliate marketing (Amazon, companies you partner with)

## COPYRIGHT
### TIP #1
Make sure you have the right to use every piece of content when
developing the website.
- Text 
- Images 
- Video 
- Audio

## TIP #2
Add a clause to your contract.
>“You guarantee that all elements of text, images or other artwork you provide are either owned by your good selves, or that you’ve permission to use them. When you provide text, images or other artwork to us, you agree to protect us from any claim by a third party that we’re using their intellectual property.”
— Killer Contract

## TIP #3
Remind your clients about copyright when collecting content from
them.

## FAVICON

### HOW TO ADD A FAVICON
1. Start with a simplified version of your logo. Size: 260px 260px
2. Use https://realfavicongenerator.net/ to create favicons.
3. Configure generator settings for different devices
4. Generate favicon
5. Donload the favicon package into the root of your website folder.
6. Add the HTML code to the head section of your website.

## Print Styles

1. Use A Media Query

        @media print {
            // print styles go here
        }

2. Make Color Changes Explicit

        @media print {
          body {
              background: #FFFFFF;
              color: #000000;
          }
        }

3. Remove Unneeded Page Elements.

        @media print {
          nav, .search-form {
              display: none;
          }
        }

4. SET PAGE WIDTH AND MARGINS

        @media print {
          @page {
              margin: 1cm; // Use centimeters or inches, not pixels
          }
          body {
            width: 100%;
            margin: 0;
            padding: 0; 
          }
        }

5. AVOID ODD PAGE BREAKS.

        @media print {
          h1, h2, h3, h4, h5, h6 {
            page-break-after: avoid; // Prevent headings from being printed at the bottom of the page
          }

          article {
            page-break-before: always; // Always start new articles on a new page
          }

          img {
            page-break-inside: avoid; // Prevent images from being split up
          } 
        }

6. FORCE BACKGROUND IMAGES AND COLORS.

        @media print and (color) { 
          * {
              -webkit-print-color-adjust: exact; 
              print-color-adjust: exact;
          } 
        }

7. DISPLAY LINK URLS.

        @media print { 
          a[href^=http]:after {
            font-style: italic;
            content: " < " attr(href) " > "; 
          }
        }

To add to WordPress sites: https://www.jotform.com/blog/css-perfect-print-stylesheet-98272/

## Testing Print Stylesheets
![screen cap](assets/chrome-print-styles.png)

1. Open Chrome DevTools.
2. Click on the three dots icon and then select “More Tools” and
“Rendering”.
3. You can then select print under Emulate CSS Media.