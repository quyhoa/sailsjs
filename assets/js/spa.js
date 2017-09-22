var app = angular.module('Demo',[]);

app.controller('UserCtrl',['$scope',function($scope){
	// $scope.content = [
	// 	{
	// 		id:1,
	// 		username:'first Name'
	// 	},
	// 	{
	// 		id:2,
	// 		username:'last Name'
	// 	},
	// ];
	// console.log($scope.content);
	io.socket.get('/user',function(data){
		// message = data.message;
		// if(message){
		// 	$scope.message = message;
		// }
		$scope.message = "message tesst";
		$scope.content = data;		
		$scope.myFunc = function() {
			alert();
	    };
	    console.log(data);


	    $scope.$apply();
	});

	io.socket.on('user',function(event){		
		switch (event.verb){
			case 'created':
				$scope.content.push(event.data);
				$scope.$apply();
				break;
		}
	});
}]);
