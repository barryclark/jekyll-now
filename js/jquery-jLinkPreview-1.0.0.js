/**
 * jQuery "Link Preview" Plugin
 * 
 * @name jquery-jLinkPreview-1.0.0.js
 * @author Sarpdoruk TAHMAZ - http://www.sarpdoruktahmaz.com
 * @version 1.0.0
 * @date June 12, 2011
 * @category jQuery Plugin Widget
 * @copyright (c) 2011 Sarpdoruk TAHMAZ (sarpdoruktahmaz.com)
 * @license GNU - GENERAL PUBLIC LICENSE - https://github.com/jquery/jquery/blob/master/GPL-LICENSE.txt
 * @info Visit http://www.sarpdoruktahmaz.com/projects/j-link-preview for more info
**/
(function($){
$.fn.jLinkPreview = function(custom) {
     
    var temp,
        title,
        heightPlus,
        idArray = [],
        classArray = [],
        targetA = "",
        posX,
        posY,
        j,
		href,
        settings = {
            'preload': true,
            'width': 256,
            'height': 192,
            'fade': 300,
            'background-color': '#555',
            'elementsHavingId': '',
            'elementsHavingClass': '',
            'elementsRejectParenet': '',
            'elementsRejectClass': '',
            'attribute': 'title',
            'waitingimage': '',
            'waitingimagetype': 'png'
        };
        
    $.extend(settings, custom);
    
    if(settings['elementsHavingId'] != "") {
        idArray = settings['elementsHavingId'].split(",");
    }
    
    if(settings['elementsHavingClass'] != "") {
        classArray = settings['elementsHavingClass'].split(",");
    }
    if (settings['elementsRejectClass'] != "") {
        rejectClasses = settings['elementsRejectClass'].split(",");
    }
    if(settings['elementsRejectParenet'] != "") {
        rejectParents = settings['elementsRejectParenet'].split(",");
    }
    
    if(idArray.length == 0 && classArray.length == 0) {
        targetA = "BODY A";
    } else {
        for(j = 0; j < idArray.length; j++) {
            targetA += "#" + idArray[j] + ", ";
        }
        
        for(j = 0; j < classArray.length; j++) {
            targetA += "." + classArray[j] + ", ";
        }
    }
    
    var getWatingImageUri = function() {
        if (settings['waitingimage'] != "") {
            var retstr = "_waitbgpic_" + encodeURIComponent(settings['waitingimage']);
            if (settings['waitingimagetype'] != "") {
                retstr = retstr + "_waitbgpictype_" + settings['waitingimagetype'];
            }
            retstr = retstr + "_waitpic_" + encodeURIComponent(settings['waitingimage']);
            if (settings['waitingimagetype'] != "") {
                retstr = retstr + "_waitpictype_" + settings['waitingimagetype'];
            }
            return retstr;
        } else {
            return "";
        }
    }
    
    var ignoreNode = function(obj) {
        if (obj.attr("href").startsWith("mailto:") == true) {
            return true;
        }
        if (rejectClasses.length > 0) {
            for(j = 0; j < rejectClasses.length; j++) {
                if(obj.attr("class") == rejectClasses[j]) {
                    return true;
                }
            }
        }
        if(rejectParents.length > 0) {
            for(j = 0; j < rejectParents.length; j++) {
                if (obj.parents(rejectParents[j]).size() > 0) {
                    return true;
                }
            }
        }
        return false;
    };
    
    if(settings['preload'] == true) {
        $(targetA).each(function(event) {
            if (ignoreNode($(this)) == true) {
                return;
            }
            temp = new Image();
			if($(this).attr("href").substring(0, 4) === "http") { 
				href = $(this).attr("href");
			} else {
				href = "http://" + $(this).attr("href");
			}
            temp.src = "http://wimg.ca/w_" + settings['width'] + "_h_" + settings['height'] + getWatingImageUri() + "/" + href;
            temp = null;
        });
    }
    
    $(targetA).hover(function(event) {
        if (ignoreNode($(this)) == true) {
            return;
        }
        temp = new Image();		
		if($(this).attr("href").substring(0, 4) === "http") {
			href = $(this).attr("href");
		} else {
			href = "http://" + $(this).attr("href");
		}
        temp.src = "http://wimg.ca/w_" + settings['width'] + "_h_" + settings['height'] + getWatingImageUri() + "/" + href;
        
        if(settings['height'] < 96) {
            temp.height = 96;
        } else if(settings['height'] > 384) {
            temp.height = 384;
        } else {
            temp.height = settings['height'];
        }
           
        if(settings['width'] < 128) {
            temp.width = 128;
        } else if(settings['width'] > 512) {
            temp.width = 512;
        } else {
            temp.width = settings['width'];
        }
        
        if($(this).attr(settings['attribute']) == null || $(this).attr(settings['attribute']) == "noreferrer") {
            title = "";
            heightPlus = 0;
        } else {
            title = $(this).attr(settings['attribute']);
            heightPlus = 25;
        }
        
        if((event.clientX + $(".jLinkPreview").width() + 20) > $(window).width()) {
            posX = (event.clientX - $(".jLinkPreview").width() - 15);
        } else {
            posX = event.clientX + 15;
        }
        
        if((event.clientY + $(".jLinkPreview").height() + 20) > $(window).height()) {
            posY = (event.clientY - $(".jLinkPreview").height() - 15);
        } else {
            posY = event.clientY + 15;
        }
        
        $("BODY").prepend("<div class='jLinkPreview' style='background:url(" + temp.src + ")" + settings['background-color'] + " no-repeat bottom; width:" + temp.width + "px; height:" + (temp.height + heightPlus) + "px; top:" + posY + "px; left:" + posX + "px;'>"+title+"</div>");
        
        $(".jLinkPreview").fadeIn(settings['fade']);        
    },
    function() {
        $(".jLinkPreview").remove();
        temp = null;
    });
    
    $(targetA).mousemove(function(event) {
        
        if((event.clientX + $(".jLinkPreview").width() + 20) > $(window).width()) {
            posX = (event.clientX - $(".jLinkPreview").width() - 15);
        } else {
            posX = event.clientX + 15;
        }
        
        if((event.clientY + $(".jLinkPreview").height() + 20) > $(window).height()) {
            posY = (event.clientY - $(".jLinkPreview").height() - 15);
        } else {
            posY = event.clientY + 15;
        }
        
       $(".jLinkPreview").css({"top":posY + "px", "left":posX + "px"}); 
    });
	
	String.prototype.startsWith = function(str){
		return (this.indexOf(str) === 0);
	}
    
};
})(jQuery);
