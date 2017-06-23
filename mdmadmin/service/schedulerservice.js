/**
 * Created by Ramakrishna_S03 on 2/21/2017.
 */

function SchedulerService(commonService){
    this.getRecords=function(){
        return commonService.httpGetService("fetch/configurations");
    };
    
    this.updateRecord=function(data){
        return commonService.httpPostService("update/configurations", data, {});
    };


    this.fetchTriggers=function(path){
        return commonService.httpGetService(path);
    };


    this.processRecords=function(data){
        var processedRecords=[];
        if(data){
            for(var i=0;i<data.length;i++){
                var schedulerType= parseSchedulerType(data[i].id);
                var cronExpression=data[i].val.cronExpression;
                var lockedAt=data[i].val.lockedAt;
                var  id=data[i].id;
               for(var j=0;j<data[i].val.options.length;j++){
                    var displayRecord={
                        "schedulerType"         :     schedulerType,
                        "cronexpression"        :      cronExpression,
                         "tableName"            :      data[i].val.options[j].tablename,
                         "status"               :      data[i].val.options[j].schedulingStatus,
                         "lastScheduledTime"    :      lockedAt,
                         "nextFetchStartTime"   :      data[i].val.options[j].dataStartWindow,
                         "nextFetchEndTime"     :      data[i].val.options[j].dataEndwindow,
                         "id"                   :      id,
                        "originalData"          :       data[i]

                    };
                   processedRecords.push(displayRecord);
                } // End of inside loop.
            } // End of for loop.

        } // end of if.
        return processedRecords;
    };


// TO DO Need to fetch the scheduler Type.
    function parseSchedulerType(schedulerKey){
        var transactiuonType=schedulerKey.split(":");
        return transactiuonType[2];
    }
}

angular.module('scheduler').service('schedulerService',SchedulerService);