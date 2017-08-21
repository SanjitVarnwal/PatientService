app.controller("LandingController", function ($scope, $location, $http, Database) {

    $scope.input = { "id": "", "name": "", "doctor": "", "contact": "" };

    $scope.clear = function () {
        $scope.input = {};
    };

    $scope.redirectToAdd = function(){
        $location.path('/add');
    };

    

    

    Database.getDoctorList()
        .then(function (response) {
            $scope.doctors = response;
        })
        

    
    
    Database.readAllPatients()
        .then(function (response) {
            $scope.list = response;
        })
    
     
    
    
    

    $scope.redirectToEdit = function (id) {
        $location.path('/edit/' + id);
    }

    $scope.deletePatient = function (id) {
        if (confirm("Are you sure?")) {
            Database.deletePatient(id)
                .then(function () {
                    alert("Delete Patient: " + id);
                },
                function () {
                    console.log("Error: " + err);
                }
            )
        }
    }
    
})