var post = angular.module('Post',[]);
var file = angular.module('Upload',[]);
post.controller('PostCtrl',['$scope',function($scope){	
	$scope.remove = function(index){
		var cf = confirm("Bạn có muốn xóa bài post này!");
		if(cf == true){
			console.log(index);
			// handle when user click ok button
			// $scope.content.splice(index,1);
		}		
	};
	$scope.facebook = {username: '', email: ''}
	// hanhle authentical with facebook
	$scope.FBlogin = function(){
		FB.login(function(response) {
		    if (response.authResponse) {
		     FB.api('/me','GET',{fields: 'email, first_name, name, id, picture'}, function(response) {
		     	$scope.$apply(function(){
		       	$scope.facebook.title = 'Thông tin login facebook';
		       	$scope.facebook.username = response.name;
		       	$scope.facebook.email = response.email;
		       	$scope.facebook.f_image = response.picture.data.url;
		       });
		     });
		    } else {
		     console.log('User cancelled login or did not fully authorize.');
		    }
		},{
			scope: 'email,user_likes',
			auth_type: 'rerequest'
		});
	};
	// handle login with google plus
	$scope.gmail = {
		username: '',
		email: ''
	};
	$scope.Gglogin = function(){
		var params = {
			'clientid': '52411663413-fj1fuu1j41o160l0890750vdg3v4nfuq.apps.googleusercontent.com',
			'cookiepolicy': 'single_host_origin',
			'callback': function(result){
				// console.log(result.status.signed_in);
				if(result.status.signed_in){					
					var request = gapi.client.plus.people.get({
						'userId': 'me'
					});

					request.execute(function(resp){
						$scope.$apply(function(){
							$scope.gmail.title = 'Thông tin login google plus';
							$scope.gmail.username = resp.displayName;
							$scope.gmail.email = resp.emails[0].value;
							$scope.gmail.g_image = resp.image.url;
						});
					});
				}
			},
			'approvalpromt':'force',
			'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read'
		};
		gapi.auth.signIn(params);

	};
	io.socket.get('/post',function(data){
		$scope.content = data;
	    $scope.$apply();
	});

}]);

file.controller('UploadCtrl',['$scope',function($scope){
	io.socket.get('/user',function(data){
		$scope.users = data;		
	    $scope.$apply();
	});
}]);

// (function(d, s, id) {
//   var js, fjs = d.getElementsByTagName(s)[0];
//   if (d.getElementById(id)) return;
//   js = d.createElement(s); js.id = id;
//   js.src = "//connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v2.10&appId=419488471723927";
//   fjs.parentNode.insertBefore(js, fjs);
// }(document, 'script', 'facebook-jssdk'));