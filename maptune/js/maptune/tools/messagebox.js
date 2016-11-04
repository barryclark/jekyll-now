jQuery.fn.center = function (absolute) {
    return this.each(function () {
        var t = jQuery(this);

        t.css({
            position: absolute ? 'absolute' : 'fixed',
            left: '50%',
            top: '50%',
            zIndex: '1000000'
        }).css({
            marginLeft: '-' + (t.outerWidth() / 2) + 'px',
            marginTop: '-' + (t.outerHeight() / 2) + 'px'
        });

        if (absolute) {
            t.css({
                marginTop: parseInt(t.css('marginTop'), 10) + jQuery(window).scrollTop(),
                marginLeft: parseInt(t.css('marginLeft'), 10) + jQuery(window).scrollLeft()
            });
        }
    });
};



var MESSAGE_TYPE = { "Information": 1, "Error": 2, "Confirmation": 3, "Lightbox": 4, "Loading": 5 };
 
var MessageBox =
{
    close: function () {
        MessageBox.successEvent = function () { MessageBox.close() }
        MessageBox.cancelEvent = function () { MessageBox.close() }
        $(".popup_messagebox").remove();
        $(".cover_background").remove();
    },
 
    successEvent: function () { MessageBox.close(); },
 
    cancelEvent: function () { MessageBox.close(); },
 
    show: function (messageType, header, content, onSuccess, onCancel) {
        var popupStr = "<div align='center' class='popup_messagebox ui-simpledialog-container ui-overlay-shadow ui-corner-all pop ui-body-a in'>"
                    + getMessageContent(messageType, header, content) + "</div>";
		$("body").append(popupStr);
        $(".popup_messagebox").center();
        $(".popup_messagebox").trigger("create");
        $("body").append($('<div class="cover_background"></div>'));
 
        if (onSuccess != undefined || onSuccess != null) {
            this.successEvent = function () { onSuccess(); MessageBox.close(); }
        }
        else {
            this.successEvent = function () { MessageBox.close() }
        }
 
        if (onCancel != undefined || onCancel != null) {
            this.cancelEvent = function () { MessageBox.close(); onCancel(); }
        }
        else {
            this.cancelEvent = function () { MessageBox.close() }
        }
 
        $(".popup_messagebox #MsgOkButton").bind("click", this.successEvent);
        $(".popup_messagebox #CancelButton").bind("click", this.cancelEvent);
    }
}
 
function getMessageContent(messagType, header, content) {
    var messageContent = "";
    if (messagType == MESSAGE_TYPE.Information) {
        messageContent = '<div class="messagebox_container"><div class="messagebox_header">' + header + '</div>'
        + '<div class="messagebox_content">' + content + '</div>'
        + '</div>';
    }
    else if (messagType == MESSAGE_TYPE.Confirmation) {
        messageContent = '<div class="messagebox_container"><div class="messagebox_header">' + header + '</div>'
        + '<div class="messagebox_content">' + content + '</div>'
        + ''
        + '</div>';
    }
    else if (messagType == MESSAGE_TYPE.Error) {
        messageContent = '<div class="messagebox_container"><div class="messagebox_header">' + header + '</div>'
        + '<div class="messagebox_error_content">' + content + '</div>'
        + '</div>';
    }
    else if (messagType == MESSAGE_TYPE.Lightbox) {
        header += "<div style='float:right;margin-right:0.7em;margin-top:-0.2em;'>"
        + "<a id='MsgOkButton' href='#' data-role='button' data-theme='a'><div style='font-family:verdana;margin:2px;'>x</div></a>"
        + "</div>";
        messageContent = "<div class='messagebox_container'><div class='messagebox_header'>" + header + "</div>"
        + "<div class='messagebox_content'>" + content + "</div>"
        + "</div>";
    }
    else if (messagType == MESSAGE_TYPE.Loading) {
        header += "<div style='float:right;margin-right:0.7em;margin-top:-0.2em;'>"
        + "<a id='MsgOkButton' href='#' data-role='button' data-theme='a'><div style='font-family:verdana;margin:2px;'>x</div></a>"
        + "</div>";
        messageContent = "<div class='messagebox_container'><div class='messagebox_header'>" + header + "</div>"
        + "<div class='messagebox_content'>" + content + "</div>"
        + "</div>";
    }

  if (messagType == MESSAGE_TYPE.Confirmation) {
        messageContent += '<div style="margin:1em;">'
        + '<a id="MsgOkButton" href="#" data-role="button" data-theme="c" class="btn btn-default"><span style="margin:2px;">ok</span></a>&nbsp;'
        + '<a id="CancelButton" href="#" data-role="button" data-theme="c" class="btn btn-default"><span style="margin:2px;">cancel</span></a>'
        + '</div>';
    }else
    if (messagType == MESSAGE_TYPE.Information || messagType == MESSAGE_TYPE.Error) {
        messageContent += ''
        + '<a id="MsgOkButton" href="#" data-role="button" data-theme="a"><div style="margin:2px;">ok</div></a>'
        + '';
    }

	return messageContent;
}
 