'use strict';

App.factory('Patient', ['$resource', function ($resource) {
    //$resource() function returns an object of resource class
    return $resource('http://localhost:8080/api/patients/:id', {},
    {
        query: {method:'GET', params:{}}
        
        
    });
}]);