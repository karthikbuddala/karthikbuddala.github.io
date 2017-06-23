/**
 * 
 */

function CommonService($http) {
   this.httpGetService=function(url){
        return $http.get('http://192.168.0.157:8080/mdm/admin/test');
    }

    this.httpPostService=function(url,data){
        return $http.post('http://192.168.0.157:8080/mdm/admin/test', {'department':$scope.department,'username':$scope.username,'firstname':$scope.firstname,'lastname':$scope.lastname,'password':$scope.password,'retypepassword':$scope.retypepassword});
    }
}

angular.module("mdm").service('commonService',CommonService);