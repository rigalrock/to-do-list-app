var toDoList = angular.module("toDoList", []);

toDoList.controller('mainController', ['$scope', function ($scope) {
    
    $scope.item = {id:"", value:"", isComplete: false}; // Initializing a empty object
    
    /* 
    * Setting the default value of the item-container
    * If localStorage already consist the array then use that else
    * make a new one.
    */
    $scope.itemContainer = JSON.parse(localStorage.getItem('itemContainer')) || localStorage.setItem('itemContainer', JSON.stringify([]));
    
    $scope.counter = $scope.itemContainer.length + 1; // Adding the counter to assign the Id's to items
    
    /* 
    * This function will add the item to the item-container in localStorage 
    * This function will accept a new Object as parameter
    */
    $scope.addItem = function (newItem) {
        $scope.itemContainer.push(newItem);
        localStorage.setItem('itemContainer', JSON.stringify($scope.itemContainer));
        $scope.item = "";
        return $scope.item;
    };
    
    $scope.updateItem = function (itemContainer) {
        localStorage.setItem('itemContainer', JSON.stringify($scope.itemContainer));  
    };
    /*
    * This constructor function will create the new list-item objects
    */
    $scope.itemObject = function (id, value, isComplete) {
        this.id = id;
        this.value = value;
        this.isComplete = false;
    };
    
    /*
    * This function will get called whenever any entry will be updated in the list
    */
    $scope.createItemObject = function () {
        var newItem = new $scope.itemObject($scope.counter, $scope.item.value, $scope.item.isComplete);
        
        $scope.addItem(newItem);
        $scope.counter ++;
    };
    
    $scope.addItemCheckedClass = function (obj) {
        obj.isComplete = true;
        var index = $scope.itemContainer.indexOf(obj);
        if ( index !== -1) {
            $scope.itemContainer[index] = obj;
            $scope.updateItem($scope.itemContainer);
        }
    };
    
    $scope.changeClass = function (obj) {
        if (obj.isComplete) {
            return "line-through";
        }
    };
    
    $scope.checkPendingItem = function () {
        var len = $scope.itemContainer.length;
        var count = 0;
        for (var i = 0; i < len; i++) {
            var obj = $scope.itemContainer[i];
            if (obj.isComplete) {
                count++;
            }
        }
        return (len - count);
        console.log("I am working fine");
    };
}]);