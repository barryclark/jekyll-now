require(['jquery', 'd3', 'ecco', 'bibtexParse'], ($, d3, ecco, bibtexParse) => {
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



    // console.log('referencesList', referencesList)

    // $.get(dataPath + 'hero_eu_saliency.json', (euHeroData) => {
    //     ecco.interactiveTokens('viz_hero_saliency', euHeroData)
    // })
})


var code$2 = "\n\nfunction nodeFromString(str) {\n  var div = document.createElement(\"div\");\n  div.innerHTML = str;\n  return div.firstChild;\n}\n\nfunction make_hover_css(pos) {\n  var pretty = window.innerWidth > 600;\n  var padding = pretty? 18 : 12;\n  var outer_padding = pretty ? 18 : 0;\n  var bbox = document.querySelector(\"body\").getBoundingClientRect();\n  var left = pos[0] - bbox.left, top = pos[1] - bbox.top;\n  var width = Math.min(window.innerWidth-2*outer_padding, 648);\n  left = Math.min(left, window.innerWidth-width-outer_padding);\n  width = width - 2*padding;\n  return (`position: absolute;\n     background-color: #FFF;\n     opacity: 0.95;\n     max-width: ${width}px;\n     top: ${top}px;\n     left: ${left}px;\n     border: 1px solid rgba(0, 0, 0, 0.25);\n     padding: ${padding}px;\n     border-radius: ${pretty? 3 : 0}px;\n     box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.2);\n     z-index: ${1e6};`);\n}\n\n\nfunction DtHoverBox(div_id) {\n  this.div = document.querySelector(\"#\"+div_id);\n  this.visible = false;\n  this.bindDivEvents();\n  DtHoverBox.box_map[div_id] = this;\n}\n\nDtHoverBox.box_map = {};\n\nDtHoverBox.get_box = function get_box(div_id) {\n  if (div_id in DtHoverBox.box_map) {\n    return DtHoverBox.box_map[div_id];\n  } else {\n    return new DtHoverBox(div_id);\n  }\n}\n\nDtHoverBox.prototype.show = function show(pos){\n  this.visible = true;\n  this.div.setAttribute(\"style\", make_hover_css(pos) );\n  for (var box_id in DtHoverBox.box_map) {\n    var box = DtHoverBox.box_map[box_id];\n    if (box != this) box.hide();\n  }\n}\n\nDtHoverBox.prototype.showAtNode = function showAtNode(node){\n    var bbox = node.getBoundingClientRect();\n    this.show([bbox.right, bbox.bottom]);\n}\n\nDtHoverBox.prototype.hide = function hide(){\n  this.visible = false;\n  if (this.div) this.div.setAttribute(\"style\", \"display:none\");\n  if (this.timeout) clearTimeout(this.timeout);\n}\n\nDtHoverBox.prototype.stopTimeout = function stopTimeout() {\n  if (this.timeout) clearTimeout(this.timeout);\n}\n\nDtHoverBox.prototype.extendTimeout = function extendTimeout(T) {\n  //console.log(\"extend\", T)\n  var this_ = this;\n  this.stopTimeout();\n  this.timeout = setTimeout(function(){this_.hide();}.bind(this), T);\n}\n\n// Bind events to a link to open this box\nDtHoverBox.prototype.bind = function bind(node) {\n  if (typeof node == \"string\"){\n    node = document.querySelector(node);\n  }\n\n  node.addEventListener(\"mouseover\", function(){\n    if (!this.visible) this.showAtNode(node);\n    this.stopTimeout();\n  }.bind(this));\n\n  node.addEventListener(\"mouseout\", function(){this.extendTimeout(250);}.bind(this));\n\n  node.addEventListener(\"touchstart\", function(e) {\n    if (this.visible) {\n      this.hide();\n    } else {\n      this.showAtNode(node);\n    }\n    // Don't trigger body touchstart event when touching link\n    e.stopPropagation();\n  }.bind(this));\n}\n\nDtHoverBox.prototype.bindDivEvents = function bindDivEvents(){\n  // For mice, same behavior as hovering on links\n  this.div.addEventListener(\"mouseover\", function(){\n    if (!this.visible) this.showAtNode(node);\n    this.stopTimeout();\n  }.bind(this));\n  this.div.addEventListener(\"mouseout\", function(){this.extendTimeout(250);}.bind(this));\n\n  // Don't trigger body touchstart event when touching within box\n  this.div.addEventListener(\"touchstart\", function(e){e.stopPropagation();});\n  // Close box when touching outside box\n  document.body.addEventListener(\"touchstart\", function(){this.hide();}.bind(this));\n}\n\nvar hover_es = document.querySelectorAll(\"span[data-hover-ref]\");\nhover_es = [].slice.apply(hover_es);\nhover_es.forEach(function(e,n){\n  var ref_id = e.getAttribute(\"data-hover-ref\");\n  DtHoverBox.get_box(ref_id).bind(e);\n})\n";