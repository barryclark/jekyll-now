require(['jquery', 'd3', 'ecco', 'bibtexParse'], ($, d3, ecco, bibtexParse) => {

    if (window.location.pathname =='/explaining-transformers/')
    {

        const rawBibliography = d3.selectAll('script[type="text/bibliography"]')._groups[0][0].innerText;
        const bib = bibtexParse.toJSON(rawBibliography);
        // console.log("BIB", bib);

        const citTags = d3.selectAll('cite'),
            citationsDict = {};

        let hoverBoxesDiv = d3.select('body').append('div').attr('id', 'hoverBoxes'),
            referencesList = []
        // Go over all <cite> tags. Index their references. Add the numbers to the text.
        citTags.each(function (d) {
            const tag = d3.select(this)
            const keys = tag.attr('key').split(',')

            let refIds = [], refIdsString = '', refInfos = []
            keys.forEach((key) => {
                    let refId
                    if (key in citationsDict) {
                        refId = citationsDict[key]
                    } else {
                        refId = Object.keys(citationsDict).length + 1
                        citationsDict[key] = refId
                    }
                    refIds.push(refId)

                    let refInfo = bib.filter((c) => c.citationKey === key)
                    refInfos.push(refInfo[0])
                    // refIdsString = refIdsString + "["+refId+"]";
                    referencesList[refId] = refInfo[0]
                }
            )
            if (refIds.length > 1) {
                refIdsString = refIds.join(',\xa0')
            } else {
                refIdsString = refIds
            }

            // console.log('refInfos', refInfos.map((info) => info.entryTags.title))
            // Add numbers ot the text
            tag.text("[" + refIdsString + "]")

            tag.data({text: refIdsString})

            // Citation info
            let citationText = refInfos.map((info) => {
                    // console.log('info', info)
                    let entry
                    if ("url" in info.entryTags) {
                        entry = "<a href='" + info.entryTags.url + "' style='font-weight:bold'>" +
                            info.entryTags.title
                            + "</a>"
                    } else {
                        entry = "<span style='font-weight:bold'>" + info.entryTags.title + "</span>"
                    }

                    entry = entry + "<br />" + info.entryTags.author+ ", " +info.entryTags.year + "<br /><br />"
                    return entry
                }
            )

            // Create hover div
            //http://bl.ocks.org/larsenmtl/ec50d6ab230f127d5cd9
            //https://stackoverflow.com/questions/28704093/how-can-i-keep-a-d3-mouseover-open-while-my-mouse-is-over-the-tooltip
            const hoverBox = hoverBoxesDiv
                .append('div')
                .attr('class', 'hover-box')
                .html(citationText.join(''))
                .style("opacity", 0)
                .attr('visible', false)
                // Don't disappear if user moves from the tag to the hover box (they might want to click on the link)
                .on("mouseenter", function (d) {
                    // console.log('hoverBox mouseover')
                    hoverBox.transition().duration(0)
                    d3.event.stopPropagation()
                })
                // Hide once mouse leaves
                .on("mouseleave", function () {
                    // console.log('hoverBox mouseout', d)
                    hoverBox.transition()
                        .duration(500)
                        .style("opacity", 0)
                        .style('display', 'none')
                        .attr('visible', false);
                });


            tag.on("mouseenter", () => {
                console.log('tag mouseover')
                hoverBox
                    .attr('visible', true)
                    .style('display', 'block')
                    .transition()
                    .duration(100)
                    .style("opacity", 1);
                hoverBox
                    .style("left", (d3.event.pageX + 20) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            }).on("mouseleave", function (d) {
                // console.log('tag mouseout')
                hoverBox.transition()
                    .duration(500)
                    .style("opacity", 0)
                    .attr('visible', false);
                // console.log('tag mouseout', d)
            });

            hoverBox.selectAll('a').on("mouseenter", ()=>{
                hoverBox.transition().duration(0)
                // console.log('LINK EVENT!', d3.event)
                // d3.event.stopPropagation()
            })
        })

        // console.log('referencesList', referencesList)
        let references = d3.select('references').selectAll('p').data(referencesList).join('p').html((d,i)=>{
            if (typeof d === "undefined")
                return
            // console.log('entry', d)
            let entry = "["+ i +"] ", info = d,
                journal = "journal" in info.entryTags ?  info.entryTags.journal+"." : '';
            if ("url" in info.entryTags) {
                entry = entry + "<a href='" + info.entryTags.url + "' style='font-weight:bold'>" +
                    info.entryTags.title
                    + "</a>"
            } else {
                entry = entry + "<span style='font-weight:bold'>" + info.entryTags.title + "</span>"
            }

            entry = entry + "<br />" + info.entryTags.author+ ", " +info.entryTags.year + ". "
                + journal + "<br /><br />"

            return entry;
        })
    }

})

