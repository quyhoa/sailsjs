// begin handlle login with facebook
window.fbAsyncInit = function() {
    FB.init({
      appId            : '419488471723927',
      // autoLogAppEvents : true,
      xfbml            : true,
      version          : 'v2.10',
      status 			: true
    });
    FB.getLoginStatus(function(response) {
	    // statusChangeCallback(response);
      connected 			: true
	    if(response.status === 'connected'){
	    	// we all connected success
	    }else if(response.status === 'not_authorized'){
	    	// not author
	    }else{
	    	// not logged facebook
	    }
	});
  };

(function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
// end handlle login with facebook

(function(){
    var p = document.createElement('script');
    p.type = 'text/javascript';
    p.async = true,
    p.src = 'https://apis.google.com/js/client.js?onload=onLoadFunction';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(p, s);
  })();
  function onLoadFunction(){
    gapi.client.setApiKey('AIzaSyB1N604LajjYSndzfTITzV8LzNmwJTDRbo');
    gapi.client.load('plus','v1',function(){});
  }
// AIzaSyB1N604LajjYSndzfTITzV8LzNmwJTDRbo
// 52411663413-fj1fuu1j41o160l0890750vdg3v4nfuq.apps.googleusercontent.com
// fJ6lSlAQL_9SQAJKsvzQgjjS