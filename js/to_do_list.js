var toDoList = angular.module("toDoList", []);

toDoList.controller('mainController', ['$scope', function ($scope) {

    $scope.item = {
        id: "",
        value: "",
        isComplete: false,
        editing: false
    }; // Initializing a empty object

    /* 
     * Setting the default value of the item-container
     * If localStorage already consist the array then use that else
     * make a new one.
     */

    localStorage.setItem('itemContainer', JSON.stringify([]))

    $scope.itemContainer = JSON.parse(localStorage.getItem('itemContainer')) ;

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
    
    /* This function will update the localstorage with the changes */
    $scope.updateItem = function (itemContainer) {
        localStorage.setItem('itemContainer', JSON.stringify($scope.itemContainer));
    };
    
    /*
     * This constructor function will create the new list-item objects
     */
    $scope.itemObject = function (id, value) {
        this.id = id;
        this.value = value;
        this.isComplete = false;
        this.editing = false;
    };

    /*
     * This function will get called whenever any entry will be updated in the list
     */
    $scope.createItemObject = function () {
        var newItem = new $scope.itemObject($scope.counter, $scope.item.value);

        $scope.addItem(newItem);
        $scope.counter++;
    };

    /* This function will look if the item is checked or not. based on that it will
    * change the css-class in the 'li' element
    */
    $scope.addItemCheckedClass = function (obj) {
        if (obj.isComplete === false) {
            obj.isComplete = true;
            $scope.updateItem($scope.itemContainer);
        }else {
            obj.isComplete = false;
            $scope.updateItem($scope.itemContainer);
        }
    };
    
    /* This function will add the 'line-through' class on the 'li' if the item is checked */
    $scope.changeClass = function (obj) {
        if (obj.isComplete) {
            return true;
        }
    };
    
    /* This function will retrun the count of the pending items */
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
    };

    /* This function will remove the element from the list on clicking the close button*/
    $scope.removeItem = function (obj) {
        var index = $scope.itemContainer.indexOf(obj);
        $scope.itemContainer.splice(index, 1);
        $scope.updateItem();
    };
    
    /* Funtion will work whever the item is double-clicked */
    $scope.editItem = function (obj) {
        if (!obj.isComplete) {
            obj.editing = true;
            $scope.updateItem(obj);
        }
    };
    
    $scope.doneEdit = function (obj) {
        obj.editing = false;
        $scope.updateItem(obj);
    };
}]);