$(function() {    
    var bucketName = 'customer-references-2';
    var bucketRegion = 'us-west-2';
    var IdentityPoolId = 'us-west-2:817299d3-4a21-4dad-99a3-fc70742e1f15';    
    var fileTypes = ['image/jpeg', 'image/pjpeg', 'image/png'];
    var imageList = new Array();
    var errorList = new Array();
    var fileListCount = 0;

    // BEGIN S3 UPLOAD SECTION
    // Set the region where your identity pool exists (us-east-1, eu-west-1)
    AWS.config.region = bucketRegion;

    // Configure the credentials provider to use your identity pool
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: IdentityPoolId,
    });

    // Make the call to obtain credentials
    AWS.config.credentials.get(function(){
        // Credentials will be available when this function is called.
        accessKeyId = AWS.config.credentials.accessKeyId;
        secretAccessKey = AWS.config.credentials.secretAccessKey;
        sessionToken = AWS.config.credentials.sessionToken;
    });

    var s3 = new AWS.S3({
      apiVersion: '2006-03-01',
      params: {Bucket: bucketName}
    });

    function addPhoto(file, fileNum) {
      var fileName = Date.now().toString() + '_' + file.name;
      s3.upload({
        Key: fileName,
        Body: file,
        ACL: 'public-read',
        ContentType: file.type
      }, function(err, data) {
        if (err) {
          errorList.push('Error uploading file \'' + fileName + '\': ' + err.message);
          return;
        }
        imageList.push('Image #' + fileNum + ': ' + data.Location);
      });
    }
    // END S3 UPLOAD SECTION

    $('#email').change(function() {
      if($(this).val()){
        $('.submit').prop('disabled', false);
      }
    });

    function validFileType(file) {
      for(var i = 0; i < fileTypes.length; i++) {
        if(file.type === fileTypes[i]) {
          return true;
        }
      }
      return false;
    }

    function returnFileSize(number) {
      if(number < 1024) {
        return number + 'bytes';
      } else if(number > 1024 && number < 1048576) {
        return (number/1024).toFixed(1) + 'KB';
      } else if(number > 1048576) {
        return (number/1048576).toFixed(1) + 'MB';
      }
    }

    function sendEmail(imageList) {
        var email = $('#email').val();
        var instructions = $('#instructions').val();
        var data = {
            '_subject': 'Customer Preferences Submission',
            'email': email,
            'images': imageList.sort().join('\r\n'),
            'instructions': instructions
        };
        $.ajax({
            url: '//formspree.io/info@photovisionprints.com',
            method: 'POST',
            data: data,
            dataType: 'json',
            beforeSend: function () {
                $('.uploading').remove();
                $('.notifications').append('<p class="required_notification sending">Ok. Now sending your preferences…</p>');
            },
            success: function (data) {
                window.location.replace("/preferences-thanks");
            },
            error: function (err) {
                $('.sending').remove();
                $('.notifications').append('<p class="required_notification">Oops, there was an error sending your preferences. Please try again or contact us for support.</p>');
            }
        });
    }
    
    function checkIfUploadsDone() {
        if(imageList.length + errorList.length != fileListCount) {
            window.setTimeout(checkIfUploadsDone, 250); /* this checks if upload attempts are done every 250 milliseconds*/
        } else {
            if (errorList.length === 0) {
                sendEmail(imageList);
                $('html,body').css('cursor','default');
                return;
            } else {
                $('.uploading').remove();
                $('.notifications').append('<p class="required_notification">Oops, there was an error uploading one or more files. Here are the errors: <br /><br />'
                 + errorList.sort().join('<br />') 
                 + '<br /></br /> Please retry, or call us for support.' + '</p>');
                $('html,body').css('cursor','default');
                return;
            }
        }
    }

    $('.submit').click(function(e) {
      e.preventDefault();
      $('html,body').css('cursor','wait');
      var files = $('#image-uploader')[0].files;
      fileListCount = files.length;

      if (fileListCount > 0) {          
        $('.notifications').append('<p class="required_notification uploading">Hang on...Uploading image(s) first… Please don\'t refresh or leave this page.</p>');
        for(var i = 0; i < fileListCount; i++) {
          addPhoto(files[i], i + 1);
        }
      }
      
      checkIfUploadsDone(files);      
    });

    $('#image-uploader').change(function() {
      $('.image-preview').empty();
      var files = this.files;

      if(files.length === 0){
        $('.image-preview').append('<p class="required_notification">No files currently selected for upload</p>');
      } else if(files.length > 5) {
        $('.image-preview').append('<p class="required_notification">Please limit your selection to 5 (five) images or less</p>');
      } else {
        var list = document.createElement('ul');
        $('.image-preview').append(list);
        for(var i = 0; i < files.length; i++) {
          var listItem = document.createElement('li');
          var para = document.createElement('p');
          para.setAttribute("class", "required_notification");
          if(validFileType(files[i])) {
            if(files[i].size > 2621440) {
              para.textContent = files[i].name + ' is too large. Please restrict your selection to files under 2.5MB.';
              $('.image-preview').append(para);
            } else {
              var img = document.createElement('img');
              img.src = window.URL.createObjectURL(files[i]);
              img.width = 130;
              img.onload = function() {
                window.URL.revokeObjectURL(this.src);
              }
              img.setAttribute("title", files[i].name + " -- " + returnFileSize(files[i].size));

              listItem.appendChild(img);
            }
          } else {
            para.textContent = '"' + files[i].name + '" is not a valid JPEG or PNG image. Please update your selection.';
            $('.image-preview').append(para);
          }
          list.appendChild(listItem);
        }
      }
    });
  });
