Social.init({
    FACEBOOK_APP_ID: '191408320869529', // Mandatory
    TWITTER_ACCOUNT: 'jordanforeman' // Optional
});

var FacebookShareButton = document.querySelector('.facebook-share');
Social.Facebook.registerButton(FacebookShareButton);

var TwitterTweetButton = document.querySelector('.twitter-share')
Social.Twitter.registerButton(TwitterTweetButton);

var GooglePlusShareButton = document.querySelector('.google-plus-share');
Social.GooglePlus.registerButton(GooglePlusShareButton);
