var toDoList = angular.module("toDoList", []);

toDoList.controller('mainController', ['$scope', function ($scope) {
    
    $scope.item = {id:"", value:"", isComplete: false}; // Initializing a empty object
    
    $scope.counter = 1; // Adding the counter to assign the Id's to items
    
    /* 
    * Setting the default value of the item-container
    * If localStorage already consist the array then use that else
    * make a new one.
    */
    $scope.itemContainer = JSON.parse(localStorage.getItem('itemContainer')) || localStorage.setItem('itemContainer', JSON.stringify([]));
    
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
    
    
}]);