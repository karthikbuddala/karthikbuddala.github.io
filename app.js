

/**
 * Created by Ramakrishna_S03 on 2/21/2017.
 */

function mdmController($state) {
    // $state.go("scheduler");  --- Commneting as we don't need to redirect

}
function mdmController($scope,$http,$location,$timeout) {
    
	var vm = $scope;
	vm.link = "http://localhost";
	
	vm.userLogged = "";
	vm.loadLoggedUser = function(){
		var link = "http://localhost:8080/mdm/admin/getLoggedUser";
		$http.get(link,{'Access-Control-Allow-Origin' : '*'}).success(function(data,status,headers,config){
            vm.userLogged = data.name;
        });
	};	
	
	
	
	
	//user data submittion//
    vm.createusernew = {};
    vm.userMessage = "";
    vm.userDangerMessage = "";


    
    
    vm.userSubmit = function () {
        $http.post(vm.link+':8080/mdm/admin/user',vm.createusernew, { 'Content-Type': 'application/json','Access-Control-Allow-Origin' : '*'})
        .success(function (data, status, headers, config) {
        
            if (status == 200) {
                
                vm.userMessage = "New user created successfully!!";
                $timeout(function() {
                	vm.userMessage = false;
                  }, 2000)
            } else{
                
                vm.userDangerMessage = "New user created not successfull!!";
                $timeout(function() {
                	vm.userDangerMessage = false;
                  }, 2000)
            }
        });
      
        vm.savecreateuser();
        

    };
    
vm.createuser = [];
vm.userupdatedMessage = "";
vm.userupdatedDangerMessage = "";
    
    vm.userupdateSubmit = function (valid) {
    	if (valid) {
    	  $http.put(vm.link+':8080/mdm/admin/user',vm.clickedcreateuser, { 'Content-Type': 'application/json','Access-Control-Allow-Origin' : '*'})
          .success(function (data, status, headers, config) {
              
              if (status == 200) {
                  
                  vm.userupdatedMessage = "user updated successfully!!";
                  $timeout(function() {
                  	vm.userupdatedMessage = false;
                    }, 2000)
              } else{
                  
                  vm.userupdatedDangerMessage = "user updated not successfull!!";
                  $timeout(function() {
                  	vm.userupdatedDangerMessage = false;
                    }, 2000)
              }
          });
    	  
    	  $http.get(vm.link+':8080/mdm/admin/user',vm.clickedcreateuser, { 'Content-Type': 'application/json','Access-Control-Allow-Origin' : '*'})
          .success(function (data, status, headers, config) {
        	  vm.createuser = data;
            
          });
    	} else {
    		
    	}
    };
    
    
//datasource submittion//
    
    vm.names = ["Emil", "Tobias", "Linus"];
    
    vm.formDatasource = {};
   
    vm.datasourceDangerMessage = "";
    vm.datasourceMessage = "";
 
    vm.formSubmit = function () {
    	var dataArray = [];
        dataArray.push(vm.formDatasource.userName);
        
        vm.formDatasource["userName"] = dataArray;
      
       
    	 $http.post(vm.link+':8080/mdm/admin/datasource',vm.formDatasource, { 'Content-Type': 'application/json','Access-Control-Allow-Origin' : '*'})
         .success(function (data, status, headers, config) {
             
             if (status == 200) {
               
                 vm.datasourceMessage = "Datasource created successfully!!";
                 $timeout(function() {
                 	vm.datasourceMessage = false;
                   }, 2000)
             } else{
               
                 vm.datasourceDangerMessage = "Datasource created not successfull!!";
                 $timeout(function() {
                 	vm.datasourceDangerMessage = false;
                   }, 2000)
             }
         });
      
        vm.saveUser();
        
    };
    
    vm.formDatasource = {};
    vm.user = [];
    vm.datasourceupdateDangerMessage = "";
    vm.datasourceupdateMessage = "";
    vm.formupdateSubmit = function () {
    
    	var clickedArray = [];
    	clickedArray.push(vm.clickedUser.userName);
    
        
        
    	vm.clickedUser["userName"] = clickedArray;
    	
       
        
    	  $http.put(vm.link+':8080/mdm/admin/datasource',vm.clickedUser, { 'Content-Type': 'application/json','Access-Control-Allow-Origin' : '*'})
          .success(function (data, status, headers, config) {
             
              
              for(var i = 0; i < vm.prevData.length;i++){
            	  if(vm.prevData[i].dataSourceName == data.dataSourceName){
            		  vm.prevData[i] = data;
            	  }
              }
              
              if (status == 200) {
                 
                  vm.datasourceupdateMessage = "Datasource updated successfully!!";
                  $timeout(function() {
                  	vm.datasourceupdateMessage = false;
                    }, 2000)
              } else{
                
                  vm.datasourceupdateDangerMessage = "Datasource updated not successfull!!";
                  $timeout(function() {
                  	vm.datasourceupdateDangerMessage = false;
                    }, 2000)
              }
          })
    	  .error(function (data, status, headers, config) {
    		  $scope.messages = data || "Request failed";
              $scope.status = status;
    	  });
    
    };
    
	    
    
 // form fields data submittion//
    vm.formFields = {};
    vm.formfieldsMessage = "";
    vm.formfieldsDangerMessage = "";

    vm.fieldSubmit = function () {
    	
    	var dataSrcName = vm.formFields.dataSourceName.split(',');
    	var dataSrcTyp = vm.formFields.dataSourceType.split(',');
    	
      
      
        
        vm.formFields["dataSourceType"] = dataSrcTyp;
        vm.formFields["dataSourceName"] = dataSrcName;
        
       
    	
        
    	 $http.post(vm.link+':8080/mdm/admin/field',vm.formFields, { 'Content-Type': 'application/json','Access-Control-Allow-Origin' : '*'})
         .success(function (data, status, headers, config) {
         
             if (status == 200) {
                 
                 vm.formfieldsMessage = "Formfields created successfully!!";
                 $timeout(function() {
                 	vm.formfieldsMessage = false;
                   }, 2000)
             } else{
                
                 vm.formfieldsDangerMessage = "Formfields not created successfull!!";
                 $timeout(function() {
                 	vm.formfieldsDangerMessage = false;
                   }, 2000)
             }
         });
       
        vm.saveform();
        
    };
    
    vm.formfieldsupdateMessage = "";
    vm.formfieldsupdateDangerMessage = "";
    
    
    vm.fieldupdateSubmit = function () {
    
    	
    	if(!angular.isArray(vm.clickedform.dataSourceName)){
    		var dataSourceName = vm.clickedform.dataSourceName.split(',');
    		vm.clickedform.dataSourceName = dataSourceName;
    	}
    	
    	if(!angular.isArray(vm.clickedform.dataSourceType)){
    		var datsSourceType = vm.clickedform.dataSourceType.split(',');
        	vm.clickedform.dataSourceType = datsSourceType;
    	}
    	
    	
    	
        $http.put(vm.link+':8080/mdm/admin/field',vm.clickedform, { 'Content-Type': 'application/json','Access-Control-Allow-Origin' : '*'})
        .success(function (data, status, headers, config) {
           
            
            
            for(var i = 0; i < vm.prevField.length;i++){
            	
            	
            	var temp = [];
            	if(vm.prevField[i].sequence == data.sequence){
            		vm.prevField[i] = data;
            	}
            }
            
            if (status == 200) {
              
                vm.formfieldsupdateMessage = "Formfields updated successfully!!";
                $timeout(function() {
                	vm.formfieldsupdateMessage = false;
                  }, 2000)
            } else{
         
                vm.formfieldsupdateDangerMessage = "Formfields not updated successfull!!";
                $timeout(function() {
                	vm.formfieldsupdateDangerMessage = false;
                  }, 2000)
            }
           
        });
    	
    }
    
    
    
//datasource model code //
    
    vm.formDatasource = {};
    vm.clickedUser = {};
    


    vm.users = [];

    vm.saveUser = function () {
        vm.users.push(vm.formDatasource);
        vm.formDatasource = {};
    };
    
    
    

    vm.clickedUser = {};
        vm.selectUser = function (user) {
           
            vm.clickedUser = user;
          
            $http.get(vm.link+':8080/mdm/admin/datasource/'+user.dataSourceName,{'Access-Control-Allow-Origin' : '*'})
        	.success(function(data,status,headers,config){
        		
        		vm.clickedUser = data[0];
        		
        		
        		
        	});
            
        };
        $scope.updatedata = function () {
         
          
        };
        $scope.deletedatasource = function () {
            $scope.users.splice($scope.users.indexOf($scope.clickedUser), 1);
          
        };


        //Form-fields model code //
        
        vm.formFields = {};
        vm.clickedform = {};
      

        vm.forms = [];


        vm.saveform = function () {
            vm.forms.push(vm.formFields);
            vm.formFields = {};
             
        };
  
        
        vm.isMinMax = true;
        vm.changeFormSelection =  function(fieldName){
        	
        	if(fieldName.type == 'select'){
        		vm.isMinMax = false;
        		
        		fieldName.minValue = null;
        		fieldName.maxValue = null;
        	}
        }

        
        /*
         * Page : formField 
         * 
         * type : required fields
         */
        vm.isEditMinMax = true;
        vm.editSelect = function(formName){
        	if(formName.type == 'select'){
        		vm.isEditMinMax = false;
        		formName.minValue = null;
        		formName.maxValue = null;
        	}
        }
        
        
        vm.selectForm = function (form) {
         
            //vm.clickedform = form;
            
            $http.get(vm.link+":8080/mdm/admin/field/"+form.sequence,{'Access-Control-Allow-Origin' : '*'}).success(function(data,status,headers,config){
            
            	vm.clickedform = data[0];
            	if(vm.clickedform.type == 'select'){
            		vm.isEditMinMax = false;
            	}
            });
            
        };
        $scope.updateform = function () {
        	
        };
        $scope.deleteform = function () {
            $scope.forms.splice($scope.forms.indexOf($scope.clickedform), 1);

        };
        
        
      //List model code //

        vm.formList = {};
        vm.clickedlist = {};
     
       

     
       
        $scope.checkAll = function () {
            if (!$scope.selectedAll) {
                $scope.selectedAll = true;
            } else {
                $scope.selectedAll = false;
            }
            angular.forEach($scope.personalDetails, function (formList) {
                formList.selected = $scope.selectedAll;
            });
        };

        vm.lists = [];

        vm.savelist = function () {
            vm.lists.push(vm.formList);
            vm.formList = {};

        
        };
        vm.listMessage = false;

        
        /*
         * gets single list
         */
        //vm.oneList = null;
        vm.listStorage = [];
        
        vm.loadAllList = function(){
        	$http.get(vm.link+':8080/mdm/admin/totalList',{'Access-Control-Allow-Origin' : '*'}).success(function(data,status,headers,config){
        		for(var i = 0; i <  data.length;i++){
        			vm.listStorage[data[i].listName] = data[i];
        		}
        	});
        }
        
        
        vm.getOneList = function(listName){
        	
        	
   
        	
        	
        	return vm.listStorage[listName];
        	
        }
        
        /*
         * get list 
         */
        vm.selectlist = function (list) {

        	
        	$http.get(vm.link+':8080/mdm/admin/list/'+list.listName,{'Access-Control-Allow-Origin' : '*'}).success(function(data,status,headers,config){
        		 //vm.clickedlist = data[0];
        		var label = [];
        		var value = [];
        		
        		for(var i = 0; i < data[0].fieldsList.length;i++){
        			label.push(data[0].fieldsList[i].label);
        			value.push(data[0].fieldsList[i].value);
        		}
        		
        		var temp = {
        				"listName":data[0].listName,
        				"description":data[0].description,
        				"label":label,
        				"value":value
        		}
        		
        		vm.clickedlist = temp;
        		
     	   });
        	
           
        };
        $scope.updatelist = function () {
            $scope.listMessage = "Update Successfully!!";
        };
        $scope.deletelist = function () {
            $scope.lists.splice($scope.lists.indexOf($scope.clickedlist), 1);

        };
        
       
        
    	//list data submittion //
        vm.formList = {};
        vm.personalDetail = {};
        vm.listMessage = "";
        vm.listDangerMessage = "";
      
        
        vm.listSubmit = function () {
        	var fieldsList = [];
        	
        	 var i = 1;
        	 angular.forEach(vm.formList.label,function(value,key){
        		
        		fieldsList.push({"label":vm.formList.label[i],"value":vm.formList.value[i]});
        		i++;
        	 });
        	 
        	
        	 
        	 var tempList = {
        		"listName":	vm.formList.listName,
        		"description":vm.formList.description,
        		"fieldsList":fieldsList
        	 }
        	 $http.post(vm.link+':8080/mdm/admin/list',tempList, { 'Content-Type': 'application/json','Access-Control-Allow-Origin' : '*'})
             .success(function (data, status, headers, config) {
                 
                 //vm.formList = data;
                
                 vm.prevList.push(data);
                 if (status == 200) {
                   
                     vm.listMessage = "List created successfully!!";
                     $timeout(function() {
                     	vm.listMessage = false;
                       }, 2000)
                 } else{
                  
                     vm.listDangerMessage = "List created not successfull!!";
                     $timeout(function() {
                     	vm.listDangerMessage = false;
                       }, 2000)
                 }
                 
             });
        	 
           // vm.savelist();
           
          
               
               
        };
        
        
        vm.listupdateMessage = "";
        vm.listupdateDangerMessage = "";
        
        
        vm.listupdateSubmit = function () {
            
        	
        	
         	var fieldsList = [];
        	
       	 var i = 0;
       	 angular.forEach(vm.clickedlist.label,function(value,key){
       		
       		fieldsList.push({"label":vm.clickedlist.label[i],"value":vm.clickedlist.value[i]});
       		i++;
       	 });
       	 
       	 
       	 var tempLists = {
       		"listName":	vm.clickedlist.listName,
       		"description":vm.clickedlist.description,
       		"fieldsList":fieldsList
       	 }
       	 
       	 
       	 
       	 $http.put(vm.link+':8080/mdm/admin/list',tempLists, { 'Content-Type': 'application/json','Access-Control-Allow-Origin' : '*'})
            .success(function (data, status, headers, config) {
              
                if (status == 200) {
                    
                    vm.listupdateMessage = "List created successfully!!";
                    $timeout(function() {
                    	vm.listupdateMessage = false;
                      }, 2000)
                } else{
                    
                    vm.listupdateDangerMessage = "List created not successfull!!";
                    $timeout(function() {
                    	vm.listupdateDangerMessage = false;
                      }, 2000)
                }
            });      
       	vm.savelist();
        
        } 
        
        

        
        
        
        
        
      //Usercreate model code //

        vm.createusernew = {};
        vm.clickedcreateuser = {};
        vm.optionsUsers = null;
        


        vm.usernew = [];

        vm.savecreateuser = function () {
            vm.usernew.push(vm.createusernew);
            vm.createusernew = {};
         
           
        };


        vm.selectcreateuser = function (createuser) {
        
            vm.clickedcreateuser = createuser;
        };
        //Auto number model code //

        vm.createautonumber = {};
        vm.clickedcreateautonumber = {};
        vm.optionsAutonumber = null;
        


        vm.autonumbernew = [];

        vm.savecreateautonumber = function () {
            
         
            vm.prevAutonumber.push(vm.createautonumber);
            vm.createautonumber = {};
        };


        vm.selectcreateautonumber = function (createautonumber) {
        
            vm.clickedcreateautonumber = createautonumber;
        };

      //autonumber data submittion//
        vm.createautonumber = {};
      

        vm.autonumberSubmit = function () {
        	console.log(vm.createautonumber);
            $http.post(vm.link+':8080/mdm/admin/autonumber',vm.createautonumber, { 'Content-Type': 'application/json','Access-Control-Allow-Origin' : '*'})
            .success(function (data, status, headers, config) {
            	vm.createautonumber = data;
            
            });
            
            vm.savecreateautonumber();
            

        };
        
        vm.createautonumber = {};
        vm.userupdatedMessage = "";
        vm.userupdatedDangerMessage = "";
            
            vm.autonumberupdateSubmit = function (valid) {
            	if (valid) {
            	  $http.put(vm.link+':8080/mdm/admin/autonumber',vm.clickedcreateautonumber, { 'Content-Type': 'application/json','Access-Control-Allow-Origin' : '*'})
                  .success(function (data, status, headers, config) {
              
                  });
            	  
            	  $http.get(vm.link+':8080/mdm/admin/autonumberList',vm.clickedcreateautonumber, { 'Content-Type': 'application/json','Access-Control-Allow-Origin' : '*'})
                  .success(function (data, status, headers, config) {
                	  vm.createautonumber = data;
                    
                  });
            	} else {
            		
            	}
            };
            
            /*
             * Load autonumber in UI
             */
            vm.prevAutonumber = null;
            vm.loadAutonumber = function(){
            	$http.get(vm.link+':8080/mdm/admin/autonumberList',{'Access-Control-Allow-Origin' : '*'})
            	.success(function(data,status,headers,config){
            		vm.prevAutonumber = data;
            	});
            }
        
            
            /*
             * delete user
             */
            vm.autoDel = null;
            vm.initANDelete =  function(autonumber){
            	vm.autoDel = autonumber;
            }
            vm.deleteAutonumber = function(){
            	var tempa  = [];
            	if(vm.autoDel !=  null){
        	    	var path = vm.link+':8080/mdm/admin/autonumber/'+vm.autoDel.name;
        	    	console.log(path);
        	    	
        	    	$http.delete(path,{'Access-Control-Allow-Origin' : '*'})
        	    	.success(function(data,status,headers,config){
        	    		
        	    			for(var i = 0 ; i < vm.prevAutonumber.length;i++){
        		    			if(vm.prevAutonumber[i].name != data.name){
        		    				
        		    				tempa.push(vm.prevAutonumber[i]);
        		    			}
        		    		}
        		    		vm.prevAutonumber.length = 0;
        		    		vm.prevAutonumber = tempa;
        	    		
        	    		
        	    		vm.autoDel = null;
        	    	});
            	}
            }
   
            
            
            
            
            
        /*
         * Load Users in UI
         */
        vm.prevUsers = null;
        vm.loadUser = function(){
        	console.log("user: "+vm.userLogged);
        	$http.get(vm.link+':8080/mdm/admin/userList',{'Access-Control-Allow-Origin' : '*'})
        	.success(function(data,status,headers,config){
        		vm.prevUsers = data;
        		
        	});
        }
        
        
        
        vm.userSelectOptions = null;
        vm.intitUserSelect = function(user){
        	var result = null;
        	if(prevUsers != null){
        		angular.forEach(prevUsers , function(value,key){
        				result += '<option value="'+value+'" >'+value+'</option>';
        		});
        	}
        }
        
      
        /*
         * delete user
         */
        vm.tempDel = null;
        vm.initDelete =  function(user){
        	vm.tempDel = user;
        }
        vm.deleteUser = function(){
        	var temp  = [];
        	if(vm.tempDel !=  null){
    	    	var path = vm.link+':8080/mdm/admin/user/'+vm.tempDel.userName;
    	    	
    	    	$http.delete(path,{'Access-Control-Allow-Origin' : '*'})
    	    	.success(function(data,status,headers,config){
    	    		
    	    			for(var i = 0 ; i < vm.prevUsers.length;i++){
    		    			if(vm.prevUsers[i].userName != data.userName){
    		    				
    		    				temp.push(vm.prevUsers[i]);
    		    			}
    		    		}
    		    		vm.prevUsers.length = 0;
    		    		vm.prevUsers = temp;
    	    		
    	    		
    	    		vm.tempDel = null;
    	    	});
        	}
        }

        
        /*
         * delete datasource
         */
        
        vm.tempeDel = null;
        vm.initDeletes =  function(datasource){
        	vm.tempeDel = datasource;
        }
        vm.deletedatasource = function(){
        	if(vm.tempeDel !=  null){
    	    	var path = vm.link+':8080/mdm/admin/datasource/'+vm.tempeDel.dataSourceName;
    	    	
    	    	$http.delete(path,{'Access-Control-Allow-Origin' : '*'})
    	    	.success(function(data,status,headers,config){
    	    		vm.tempeDel = null;
    	    		var temp = [];
    	    		for(var i = 0; i < vm.prevData.length;i++){
    	    			
    	    			if(vm.prevData[i].dataSourceName != data.dataSourceName){
    	    				temp.push(vm.prevData[i]);
    	    			}
    	    		}
    	    		vm.prevData.length = 0;
    	    		vm.prevData = temp;
    	    	});
        	}
        }
      
        
        /*
         * delete formfields
         */
        
        vm.tempelDel = null;
        vm.initDeletess =  function(forms){
        	vm.tempelDel = forms;
        }
        vm.deleteform = function(){
        	if(vm.tempelDel !=  null){
    	    	var path = vm.link+':8080/mdm/admin/field/'+vm.tempelDel.sequence;
    	    	
    	    	
    	    	$http.delete(path,{'Access-Control-Allow-Origin' : '*'})
    	    	.success(function(data,status,headers,config){
    	    		
    	    		vm.tempelDel = null;
    	    	
    	    		
    	    		var temp = [];
    	    		for(var i = 0; i < vm.prevField.length;i++){
    	    			
    	    			if(vm.prevField[i].sequence != data.sequence){
    	    				
    	    				temp.push(vm.prevField[i]);
    	    			}
    	    		}
    	    		vm.prevField.length = 0;
    	    		vm.prevField = temp;
    	    	});
        	}
        }
        
        
        /*
         * delete list
         */
        
        vm.tempelaDel = null;
        vm.initDeletelist =  function(lists){
        	vm.tempelaDel = lists;
        }
        vm.deletelist = function(){
        	if(vm.tempelaDel !=  null){
    	    	var path = vm.link+':8080/mdm/admin/list/'+vm.tempelaDel.listName;
    	    	
    	    	$http.delete(path,{'Access-Control-Allow-Origin' : '*'})
    	    	.success(function(data,status,headers,config){
    	    		
    	    		vm.tempelaDel = null;
    	    		
    	    		
    	    		var temp = [];
    	    		for(var i = 0; i < vm.prevList.length;i++){
    	    			
    	    			if(vm.prevList[i].listName != data.listName){
    	    				
    	    				temp.push(vm.prevList[i]);
    	    			}
    	    		}
    	    		vm.prevList.length = 0;
    	    		vm.prevList = temp;
    	    		
    	    	});
        	}
        }
       
        
        /*
         * Load datasource in UI
         */

        vm.prevDataname = null;
        vm.loadDataname = function(){
        	$http.get(vm.link+':8080/mdm/admin/datasourceList',{'Access-Control-Allow-Origin' : '*'})
        	.success(function(data,status,headers,config){
        		vm.prevDataname = data;
        	});
        } 
 
        
        
        /*
         * Load datasource in UI
         */

        vm.prevData = null;
        vm.loadData = function(){
        	$http.get(vm.link+':8080/mdm/admin/datasourceList',{'Access-Control-Allow-Origin' : '*'})
        	.success(function(data,status,headers,config){
        		vm.prevData = data;
        	});
        } 
        

        
        /*
         * Load formfields in UI
         */
        vm.prevField = null;
        vm.loadField = function(){
        	$http.get(vm.link+':8080/mdm/admin/fieldList',{'Access-Control-Allow-Origin' : '*'})
        	.success(function(data,status,headers,config){
        		vm.prevField = data;
        		
        	});
        } 
        
        
        /*
         * Load list in UI
         */
        vm.prevList = null;
        vm.loadList = function(){
        	$http.get(vm.link+':8080/mdm/admin/totalList',{'Access-Control-Allow-Origin' : '*'})
        	.success(function(data,status,headers,config){
        		vm.prevList = data;
        	});
        	
        } 
        
       /*
        * load on list on
        */
       vm.labelArr = [];
       vm.loadOneList =  function(list){
    	   $http.get(vm.link+':8080/mdm/admin/list/'+list.listName,{'Access-Control-Allow-Origin' : '*'}).success(function(data,status,headers,config){
    		   vm.labelArr.length = 0;
    		   vm.labelArr.push(data[0]);
    	   });
       }
        
       //add row function//

       $scope.personalDetails = [];
       
       $scope.addNew2 = function(){
    	   $scope.personalDetails.push($scope.formList);
       }
       $scope.addNew = function () {
           //$scope.personalDetails.push($scope.formList);
    	
    	  
    	   vm.clickedlist.label.push('');
    	   
    	 
    	   
       };

       $scope.remove = function (index,listarr) {
    	   /*
           var newDataList = [];
           $scope.selectedAll = false;
           angular.forEach($scope.personalDetails, function (selected) {
               if (!selected.selected) {
                   newDataList.push(selected);
               }
           });
           $scope.personalDetails = newDataList;
           */
    	   
    	  
    	   
    	  listarr.splice(index,1);
       };

       
       
       $scope.exportData = function () {


    	    var blob = new Blob([document.getElementById('exportable').innerHTML], {
    	        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
    	    });
    	    saveAs(blob, "Report.xls");
    	};

    	$scope.outputData = {};

    	
    	$scope.outputData = {};
    	$scope.addRow = function() {
    		vm.outputData.push(vm.outputData.length);

    		$scope.counter++;
    		
    	  }
    	
    	///new
    	$scope.outputData = [];
    	
    	var Row = function(tel, text) {
    		  // Private data
    		  var private = {
    		    text: text,
    		    text: text
    		  }
    		  
    		// Expose public API
    		  return {
    		    get: function( prop ) {
    		      if ( private.hasOwnProperty( prop ) ) {
    		        return private[ prop ];
    		      }
    		    }
    		  }
    		
    		};
    	
    	
    		 $scope.addRow = function(){
    			    
    			    if($scope.outputData.length < 8){
    			      var newItemNum = $scope.outputData.length;
    			      var row = new Row('item' + newItemNum, 'item' + newItemNum);
    			      
    			     $scope.outputData.push(row);
    			      //$scope.outputData.push($scope.outputData.length);
    			    }
    			  };
    			  
    			  $scope.saveAll = function(){
    			  //  $scope.result = 'something';
    			  };
    	
    			   //output
    			  
    			  
    				/* 
    				 * Intital output
    				 */
    				 vm.counter = 0;
    				  vm.outputData = [];
    				  vm.outputObject = null;
    				    vm.loadoutputData = function(){
    				    	
    				    	console.log("login user: "+vm.userLogged);
    				    	$http.get(vm.link+':8080/mdm/admin/outputFields/'+vm.userLogged,{'Access-Control-Allow-Origin' : '*'}).success(function(data,status,headers,config){
    				    		
    				    		
    				    		var fields = [];
    				    		for(var i = 0; i < data.length;i++){
    				    			
    				    		
    				    			var temp = {
    				    					"name":data[i].label+0,
    				    					"type":data[i].type,
    				    					"min":data[i].minValue,
    				    					"max":data[i].maxValue,
    				    					"list":data[i].list,
    				    					"required":data[i].required,
    				    					"value":data[i].value,
    				    					"auto":data[i].auto
    				    			};
    				    			fields.push(temp);
    				    		}
    				    		var row = {
    				    	    			"sequence" : 0,
    				    	    			"fields" : fields
    				    		} 
    				    		
    				    		
    				    		
    				    		vm.outputData.push(row);
    				    		vm.outputObject = data;
    				    		
    				    		for(var i = 0; i < 4;i++){
    				    			vm.createOutputRow();
    				    		}
    				    	});
    				    } 
    				    
    				    $scope.removes = function(){
    				        var newoutputData=[];
    				        angular.forEach($scope.outputData,function(v){
    				        if(!v.isDelete){
    				            newoutputData.push(v);
    				        }
    				    });    $scope.outputData=newoutputData;
    				    };
    				    
    				    
    				    
    				    
    				    
    					/* 
        				 * Item page output
        				 */
        				 vm.counter = 0;
        				  vm.itemData = [];
        				  vm.itemObject = null;
        				    vm.loadItemData = function(){
        				    	
        				    	console.log("login user: "+vm.userLogged);
        				    	$http.get(vm.link+':8080/mdm/admin/outputFields/'+vm.userLogged,{'Access-Control-Allow-Origin' : '*'}).success(function(data,status,headers,config){
        				    		
        				    		
        				    		var fields = [];
        				    		for(var i = 0; i < data.length;i++){
        				    			
        				    		
        				    			var temp = {
        				    					"name":data[i].label+0,
        				    					"type":data[i].type,
        				    					"min":data[i].minValue,
        				    					"max":data[i].maxValue,
        				    					"list":data[i].list,
        				    					"required":data[i].required,
        				    					"value":data[i].value,
        				    					"auto":data[i].auto,
        				    					"label":data[i].label
        				    			};
        				    			console.log("temp=  "+temp.label);
        				    			fields.push(temp);
        				    		}
        				    		var row = {
        				    	    			"sequence" : 0,
        				    	    			"fields" : fields
        				    		} 
        				    		
        				    		
        				    		
        				    		vm.itemData.push(row);
        				    		vm.itemObject = data;
        				    		
        				    		
        				    	});
        				    } 
        				      
        				    
        				    /* 
            				 * Item page output submit
            				 */  
        				    $scope.itemData = [];
      				      vm.itemMessage = "";

      				      vm.itemSubmit = function () {

      					    	
      					    	
      				    	  
      					    	var username = vm.userLogged;
      					    	var dataSource = [];
      					    	
      					    	fields = [];
      					    	
      					    	for(var i = 0; i < vm.itemObject.length;i++){
      					    	
      					    		//inserts dataSource
      					    		var dataSourceName = vm.itemObject[i].dataSourceName;
      					    		for(var k = 0 ; k < dataSourceName.length;k++){
      					    			dataSource.push(dataSourceName[k]);
      					    		}
      					    		
      					    		
      					    		//inserts output values
      					    		var label = vm.itemObject[i].label;
      					    		var labelValue = [];
      					    		for(var j = 0; j < vm.itemData.length;j++){
      					    			var tempLabel = vm.itemData[j].fields[i].name;
      					    			var tempLabelValue  = document.getElementById(tempLabel).value;
      					    			labelValue.push(tempLabelValue);
      					    		}
      					    		
      					    		var oneField = {
      					    				"label":label,
      					    				"values":labelValue
      					    		};
      					    		fields.push(oneField);
      					    	}
      					    	
      					  
      					    	
      					    	var sendOutput = {
      					    			"userName":username,
      					    			"datasource":dataSource,
      					    			"fields":fields
      					    	};
      					    	
      					    	//updates auto numbers
      					    	vm.updateNextAutoNumbers();
      					    	
      					    	 $http.post('/mdm/admin/output',sendOutput, { 'Content-Type': 'application/json','Access-Control-Allow-Origin' : '*'})
      					         .success(function (data, status, headers, config) {   
      					        	 if(status == 200){
      						    		 vm.outputMessage = "output submitted successfully!!";
      						    	 }else{
      						    		 vm.outputMessage = "output submitted unsuccessfully!!";
      						    	 }
      						    	 
      						         $timeout(function() {
      						         	 vm.outputMessage = false;
      						           }, 2000)
      					         });
      					    	 
      					    	 
      					    	
      					    };
    				    
    				    /*
    				     * copy & Paste functionality.
    				     */ 
    				    
    				    vm.nex = function(){ 
    				    
    				    	$('input').bind('paste', function (e) {
    				    	    var $start = $(this);
    				    	    var source

    				    	    //check for access to clipboard from window or event
    				    	    if (window.clipboardData !== undefined) {
    				    	        source = window.clipboardData
    				    	    } else {
    				    	        source = e.originalEvent.clipboardData;
    				    	    }
    				    	    var data = source.getData("Text");
    				    	    if (data.length > 0) {
    				    	        if (data.indexOf("\t") > -1) {
    				    	            var columns = data.split("\n");
    				    	            $.each(columns, function () {
    				    	                var values = this.split("\t");
    				    	                $.each(values, function () {
    				    	                    $start.val(this);
    				    	                    if ($start.closest('td').next('td').find('input,textarea,select,button')[0] != undefined || $start.closest('td').next('td').find('textarea')[0] != undefined) {
    				    	                    $start = $start.closest('td').next('td').find('input,textarea,select,button');
    				    	                    }
    				    	                    else
    				    	                    {
    				    	                     return false;  
    				    	                    }
    				    	                });
    				    	                $start = $start.closest('td').parent().next('tr').children('td:first').find('input,textarea,select,button');
    				    	            });
    				    	            e.preventDefault();
    				    	        }
    				    	    }
    				    	});
    				    
    				    }
    				    
    				    
    		
    				    
    				    /*
    				     * creates new Row of output
    				     */
    				    vm.createOutputRow = function(){
    				    	
    				    	var length = vm.outputData.length;
    				    	var fields = [];
    				    	for(var i = 0; i < vm.outputObject.length;i++){
    				    		var temp = {
    				    				"name":vm.outputObject[i].label + length,
    				    				"type":vm.outputObject[i].type,
    			    					"min":vm.outputObject[i].minValue,
    			    					"max":vm.outputObject[i].maxValue,
    			    					"list":vm.outputObject[i].list,
    			    					"required":vm.outputObject[i].required,
    			    					"value":vm.outputObject[i].value,
    			    					"auto":vm.outputObject[i].auto
    				    		};
    				    		
    				    		fields.push(temp);
    				    	}
    				    	
    				    	var row = {
    				    			"sequence" : length,
    				    			"fields" : fields
    				    	}
    				    	
    				    	
    				    	vm.outputData.push(row);
    				    }
    				    
    				    
    				    
    				    $scope.outputData = [];
    				      vm.outputMessage = "";

    				      vm.outputSubmit = function () {

    					    	
    					    	
    				    	  
    					    	var username = vm.userLogged;
    					    	var dataSource = [];
    					    	
    					    	fields = [];
    					    	
    					    	for(var i = 0; i < vm.outputObject.length;i++){
    					    	
    					    		//inserts dataSource
    					    		var dataSourceName = vm.outputObject[i].dataSourceName;
    					    		for(var k = 0 ; k < dataSourceName.length;k++){
    					    			dataSource.push(dataSourceName[k]);
    					    		}
    					    		
    					    		
    					    		//inserts output values
    					    		var label = vm.outputObject[i].label;
    					    		var labelValue = [];
    					    		for(var j = 0; j < vm.outputData.length;j++){
    					    			var tempLabel = vm.outputData[j].fields[i].name;
    					    			var tempLabelValue  = document.getElementById(tempLabel).value;
    					    			labelValue.push(tempLabelValue);
    					    		}
    					    		
    					    		var oneField = {
    					    				"label":label,
    					    				"values":labelValue
    					    		};
    					    		fields.push(oneField);
    					    	}
    					    	
    					  
    					    	
    					    	var sendOutput = {
    					    			"userName":username,
    					    			"datasource":dataSource,
    					    			"fields":fields
    					    	};
    					    	
    					    	//updates auto numbers
    					    	vm.updateNextAutoNumbers();
    					    	
    					    	 $http.post('/mdm/admin/output',sendOutput, { 'Content-Type': 'application/json','Access-Control-Allow-Origin' : '*'})
    					         .success(function (data, status, headers, config) {   
    					        	 if(status == 200){
    						    		 vm.outputMessage = "output submitted successfully!!";
    						    	 }else{
    						    		 vm.outputMessage = "output submitted unsuccessfully!!";
    						    	 }
    						    	 
    						         $timeout(function() {
    						         	 vm.outputMessage = false;
    						           }, 2000)
    					         });
    					    	 
    					    	 
    					    	
    					    };
    					   
    					
    					    $scope.appTemplate=function () {
    					    	add_ripple_btn_effect()
    					    	  };
    					    
    					    /*
    					     *	output view by user  
    					     */
    					   vm.outputViewData = {};
    					   vm.showOutput = function(name){
    						   $http.get(vm.link+':8080/mdm/admin/output/'+name, {'Access-Control-Allow-Origin' : '*'})
    					         .success(function (data, status, headers, config) {   
    					    
    					        	 var labels = [];
    					        	 
    					        	 for(var i = 0; i < data[0].fields.length;i++){
    					        		 labels.push(data[0].fields[i].label);
    					        	 }
    					        	 
    					        	 vm.outputViewData['labels'] = labels; 
    					        	 for(var i = 0; i < data[0].fields.length;i++){
    					        		 vm.outputViewData[data[0].fields[i].label] = data[0].fields[i].values; 
    					        	 }
    					        	 
    					        	 /*
    					        	vm.outputViewData = {
    					        			"labels":labels,
    					        			"output":data
    					        	}*/
    					        	
    					         });  
    					   }
    					   
    					   
    					   
    					   /*
    					    * 
    					    * 
    					    * 
    					    * checking unique values
    					    * 
    					    * 
    					    * 
    					    */
    					 
    					   /*
    					    * User check
    					    */
    					   vm.uwarn = true;
    					   vm.checkUser = function(){
    						   
    						   var username = vm.createusernew.userName;
    						   $http.get('/mdm/admin/user/'+username,{'Access-Control-Allow-Origin' : '*'}).success(function (data, status, headers, config) {   
    							  if(data.length > 0){
    								  vm.uwarn = false;
    								  vm.userwarn = "user already exists";
    								  
    							  }else{
    								  vm.uwarn = true;
    								  vm.userwarn = "";
    							  }
    						   });
    					   }
        
    					   /*
    					    * datasource check
    					    */
    					   vm.dwarn = true;
    					   vm.checkDataSource = function(){
    						   
    						   var dts = vm.formDatasource.dataSourceName;
    						  
    						   $http.get('/mdm/admin/datasource/'+dts,{'Access-Control-Allow-Origin' : '*'}).success(function (data, status, headers, config) {   
    							  if(data.length > 0){
    								  vm.dwarn = false;
    								  vm.datawarn = "DataSource already exists";
    								  
    							  }else{
    								  vm.dwarn = true;
    								  vm.datawarn = "";
    							  }
    						   });
    					   }
    					   
    					   
    					   /*
    					    * form field check
    					    */
    					   
    					   vm.fwarn = true;
    					 
    					   vm.checkFormSequence = function(){
    						   
    						   var seq = vm.formFields.sequence;
    					
    						   $http.get('/mdm/admin/field/'+seq,{'Access-Control-Allow-Origin' : '*'}).success(function (data, status, headers, config) {   
    							  
    							   if(data.length > 0){
    								  vm.fwarn = false;
    								  vm.formwarn = "Sequence already exists";
    								 
    							  }else{
    								  vm.fwarn = true;
    								  vm.formwarn = "";
    								
    							  }
    						   });
    					   }
    					   
    					   
    					   /*
    					    * list check
    					    */
    					   vm.lwarn = true;
    					   
    					   vm.checkListName = function(){
    						   
    						   var list = vm.formList.listName;
    					
    						   $http.get('/mdm/admin/list/'+list,{'Access-Control-Allow-Origin' : '*'}).success(function (data, status, headers, config) {   
    							
    							   if(data.length > 0){
    								  vm.lwarn = false;
    								  vm.listwarn = "List already exists";
    							
    							  }else{
    								  vm.lwarn = true;
    								  vm.listwarn = "";
    								  
    							  }
    						   });
    					   }
    					   
    					   /*
    					    * list check
    					    */
    					   vm.awarn = true;
    					   
    					   vm.checkAutonumberName = function(){
    						   
    						   var autonumber = vm.createautonumber.name;
    					
    						   $http.get('/mdm/admin/autonumber/'+autonumber,{'Access-Control-Allow-Origin' : '*'}).success(function (data, status, headers, config) {   
    							
    							   if(data.length > 0){
    								  vm.awarn = false;
    								  vm.autonumberwarn = "Name already exists";
    							
    							  }else{
    								  vm.awarn = true;
    								  vm.autonumberwarn = "";
    								  
    							  }
    						   });
    					   }
    					   
    					   
    					   
    					   
    					   /*
    					    * 
    					    * 
    					    * Auto Number generates
    					    * 
    					    * 
    					    */
    					   
    					  
    					   
    					   
    					   /*
    					    * load all auto Numbers
    					    */
    					   vm.saveAutoNumber = [];
    					   vm.loadAutoNumbers = function(){
    						   console.log("comming inside loop");
    						   $http.get('/mdm/admin/autonumberList',{'Access-Control-Allow-Origin' : '*'}).success(function (data, status, headers, config) {
    							   for(var i = 0; i < data.length;i++){
    								   vm.saveAutoNumber[data[i].name] = data[i];
    							   }
    						   });
    					   }
    					   
    					  
    					   /*
    					    * genrates the uniques values 
    					    */
    					   vm.uniqueNumPool = [];
    					   vm.duplicateDetect = [];
    					   vm.autoNames = {};
    					   vm.uniqueNumber = function(name,id){
    						   //if repeating same input
    						   if(vm.duplicateDetect[id] != undefined){
    							   return vm.duplicateDetect[id];
    						   }
    						   
    						   var auto = vm.saveAutoNumber[name];
    						   
    						   if(vm.uniqueNumPool[name] == undefined && auto.nextSerialNum == null){
    							   vm.uniqueNumPool[auto.name] = auto.numberFormat;
    							   var value = auto.prefix+auto.seprator+auto.numberFormat+auto.seprator+auto.suffix;
    							   vm.duplicateDetect[id] = value;
    							   vm.checkOrPush(auto.name,auto.numberFormat);
    							   return value;
    						   }else if(vm.uniqueNumPool[name] == undefined && auto.nextSerialNum != null){
    							   var nextNum = vm.nextNumber(auto.nextSerialNum,auto.incrementBy); 
    							   vm.uniqueNumPool[auto.name] = nextNum;
    							   var value = auto.prefix+auto.seprator+nextNum+auto.seprator+auto.suffix;
    							   vm.duplicateDetect[id] = value;
    							   vm.checkOrPush(auto.name,nextNum);
    							   return value;
    						   }else{
    							   var nextNum = vm.nextNumber(vm.uniqueNumPool[auto.name],auto.incrementBy); 
    							   vm.uniqueNumPool[auto.name] = nextNum;
    							   var value = auto.prefix+auto.seprator+nextNum+auto.seprator+auto.suffix;
    							   vm.duplicateDetect[id] = value;
    							   vm.checkOrPush(auto.name,nextNum);
    							   return value;
    						   }
    					   }
    					   
    					   
    					   /*
    					    * updates or inserts name & value
    					    */
    					   vm.checkOrPush = function(name,value){
    						   if(vm.autoNames[name] != undefined || vm.autoNames[name] != null){
    							   if(vm.autoNames[name] != value){
    								   vm.autoNames[name] = value;
    							   }
    						   }else{
    							   vm.autoNames[name] = value;
    						   }
    					   }
    					   
    					   /*
    					    * generates next number 
    					    */
    					 vm.nextNumber=function(presentNum, incrementBy){
    						   var len = presentNum.length;
    						   incrementBy = parseInt(incrementBy);
    						   if(parseInt(presentNum.charAt(len-1))+incrementBy < 9){
    							   var num = parseInt(presentNum.charAt(len-1))+parseInt(incrementBy);
    							   return presentNum.slice(0,presentNum.length-1)+num;
    						   }else if(parseInt(presentNum.slice(len-2))+incrementBy < 99){
    							   var num = parseInt(presentNum.substr(len-2))+incrementBy;
    							   return presentNum.substr(0,len-2)+num;
    						   }else if(parseInt(presentNum.slice(len-3))+incrementBy < 999){
    							   var num = parseInt(presentNum.substr(len-3))+incrementBy;
    							   return presentNum.substr(0,len-3)+num;
    						   }else if(parseInt(presentNum.slice(len-4))+incrementBy < 9999){
    							   var num = parseInt(presentNum.substr(len-4))+incrementBy;
    							   return presentNum.substr(0,len-4)+num;
    						   }else if(parseInt(presentNum.slice(len-5))+incrementBy < 99999){
    							   var num = parseInt(presentNum.substr(len-5))+incrementBy;
    							   return presentNum.substr(0,len-5)+num;
    						   }else if(parseInt(presentNum.slice(len-6))+incrementBy < 999999){
    							   var num = parseInt(presentNum.substr(len-6))+incrementBy;
    							   return presentNum.substr(0,len-6)+num;
    						   }else if(parseInt(presentNum.slice(len-7))+incrementBy < 9999999){
    							   var num = parseInt(presentNum.substr(len-7))+incrementBy;
    							   return presentNum.substr(0,len-7)+num;
    						   }
    					   }
    					 
    					 /*
    					  * Update auto numbers
    					  */
    					 vm.updateNextAutoNumbers = function(){
  						   	console.log("comming to function");
    						 $http.get('/mdm/admin/autonumberList',{'Access-Control-Allow-Origin' : '*'}).success(function (data, status, headers, config) {
  							  var autos = [];
  							   for(var i = 0; i < data.length;i++){
  								   autos[data[i].name] = data[i];
  							   }
  							   angular.forEach(vm.autoNames,function(value,key){
  								  var obj = autos[key];
  								  obj.nextSerialNum = value;
	  							  $http.put('/mdm/admin/autonumber',obj,{ 'Content-Type': 'application/json','Access-Control-Allow-Origin' : '*'}).success(function (data, status, headers, config) {
	  									 console.log("update auto number= "+status);
	  							  });
  							   });
  							   		
  						   });
  					   }
    					 
	
}



// all pages routing //

function navigator($stateProvider) {
    $stateProvider.state('usercreate', {
        url: '/usercreate',
        templateUrl: 'usercreate.html'
    })

    $stateProvider.state('formfields', {
        url: '/formfields',
        templateUrl: 'formfields.html'
    })
     $stateProvider.state('item', {
        url: '/item',
        templateUrl: 'item.html'
    })
    $stateProvider.state('list', {
        url: '/list',
        templateUrl: 'list.html'
    })
    $stateProvider.state('datasource', {
        url: '/datasource',
        templateUrl: 'datasource.html'
    })
   $stateProvider.state('output', {
        url: '/output',
        templateUrl: 'output.html'
    })
    $stateProvider.state('exp', {
        url: '/exp',
        templateUrl: 'exp.html'
    })
     $stateProvider.state('outputview', {
        url: '/outputview',
        templateUrl: 'table.html'
    })
       $stateProvider.state('autonumber', {
        url: '/autonumber',
        templateUrl: 'autonumber.html'
    })
}

 angular.module('mdm', ['ui.router', 'ui.bootstrap'])
    .config(navigator)
    .controller('mdmController', mdmController);
    
 /* 
 mdmcontroller.directive()   
  */ 


