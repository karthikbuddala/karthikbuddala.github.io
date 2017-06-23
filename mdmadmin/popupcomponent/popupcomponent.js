function popupController($scope,schedulerService,$window){
    var vm=$scope;
    vm.configuration=vm.$ctrl.value;
    vm.showErrormessage=true;
    vm.ok=function(){
        var data={
            "key" :vm.$ctrl.key,
            "value": vm.configuration
        };
        schedulerService.updateRecord(data).then(function succes(response){
            //console.log( "Before processed Data:::"+JSON.stringify(response.data));
            vm.showErrormessage=false;
            vm.errormessage = response.data.message;
            $window.location.reload(true);
            vm.$ctrl.close();
        },function error(response){
            vm.showErrormessage=false;
            vm.errormessage = response.data.error;
        });
    };

    vm.cancel=function(){
        vm.$ctrl.close();
    }
}


var popupComponent={
    templateUrl: './popupcomponent/popup.html',
    controller: popupController,
    bindings: {
        value: '=',
        key:"@",
        close:"&",
        dismiss:"&"
    }
};
angular.module('scheduler').component('popupComponent',popupComponent);