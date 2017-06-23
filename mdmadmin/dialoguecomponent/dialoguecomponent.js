/**
 * Created by Ramakrishna_S03 on 2/24/2017.
 */
function dialogueController($scope,schedulerService){
    var vm=$scope;
    vm.showMessage=true;
    vm.progressBar=true;
    vm.showErrMessage=true;


    schedulerService.fetchTriggers(vm.$ctrl.path).then(function sucess(response){
        vm.progressBar = false;
        vm.showMessage=false;
        vm.showSuccessMessage = response.data.message;

    },function error(response){
        vm.progressBar = false;
        vm.showErrMessage=false;
        vm.showErrorMessage = response.data.error;
        
    });

   vm.close=function(){
       vm.$ctrl.close();
    }
}


var dialogueComponent={
    templateUrl: './mdmadmin/dialoguecomponent/dialogue.html',
    controller: dialogueController,
    bindings:{
        path: '=',
        dialoguetitle:"=",
        close:"&"
    }
};
angular.module('scheduler').component('dialogueComponent',dialogueComponent);