/**
 * Created by Ramakrishna_S03 on 2/24/2017.
 */
function cardController($scope,$uibModal){
var vm=$scope;
    vm.clickTrigger=function(){
     $uibModal.open({
            template: '<dialogue-component dialoguetitle="$ctrl.dialoguetitle" path="$ctrl.path" close="$ctrl.close()" ></dialogue-component>',
            controller:  function ($uibModalInstance ) {
                this.dialoguetitle= vm.$ctrl.action;
                this.close = $uibModalInstance.close;
                this.path = vm.$ctrl.path;
            },
            controllerAs: '$ctrl',
            size: 'sm',
            scope : $scope
        });

    }

}


var cardComponent={
    templateUrl: './mdmadmin/cardcomponent/card.html',
    controller: cardController,
    bindings: {
        title: '@',
        description:"@",
        action:"@",
        path:'@'
    }
};
angular.module('scheduler').component('cardComponent',cardComponent);