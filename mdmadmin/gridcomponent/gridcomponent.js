/**
 * Created by Ramakrishna_S03 on 2/21/2017.
 */

function GridController($scope,schedulerService,$uibModal){
    var vm=$scope;
    vm.showPopup = true;
    schedulerService.getRecords().then(function succes(response){
        vm.displayedCollection= schedulerService.processRecords(response.data);
    },function error(response){
        vm.displayedCollection=response.statusText;
    });


    vm.openPopUp=function(originalData,id){
      $uibModal.open({
            template: '<popup-component value="$ctrl.originalData" key='+id+' close="$ctrl.close()" dismiss="$ctrl.close()"></popup-component>',
            controller:  function ($uibModalInstance ) {
                this.originalData= JSON.stringify(originalData.val);
                this.close = $uibModalInstance.close;
                this.dismiss = $uibModalInstance.dismiss;
            },
            controllerAs: '$ctrl',
            size: 'lg',
            scope : $scope
        });

    }

}


var gridComponent={
    templateUrl: './mdmadmin/gridcomponent/grid.html',
    controller: GridController
};
angular.module('scheduler').component('gridComponent',gridComponent);