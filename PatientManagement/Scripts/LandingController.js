app.controller("LandingController", function ($scope, $location, $http, DoctorService, PatientService) {

    $scope.input = { "id": "", "name": "", "doctor": "", "contact": "" };

    $scope.clear = function () {
        $scope.input = {};
    };

    $scope.redirectToAdd = function(){
        $location.path('/add');
    };

    

    $scope.doctors = DoctorService.query();
    //Database.getDoctorList()
    //    .then(function (response) {
    //        $scope.doctors = response;
    //    })
        

    
    $scope.list = PatientService.query();
    //Database.readAllPatients()
    //    .then(function (response) {
    //        $scope.list = response;
    //    })
    
     
    
    
    

    $scope.redirectToEdit = function (id) {
        $location.path('/edit/' + id);
    }

    $scope.deletePatient = function (id) {
        if (confirm("Are you sure?")) {
            $scope.patient = PatientService.update({ Id: id },
                {
                    StatusFlag: 1
                },
                function () {
                    alert('Deleted Patient: ' + id);
                    
                })
        }
    }
    
})