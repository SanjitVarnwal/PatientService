app.controller("ViewController", function ($scope, $location, $http, $routeParams, Database) {

    $scope.redirectToLanding = function () {
        $location.path('/landing');
    };

    Database.readPatient($routeParams.id)
        .then(function (response) {
            $scope.list = response;
            patient = $scope.list[$routeParams.id];
            console.log(patient);
            $scope.id = patient.Id;
            $scope.name = patient.Name;
            $scope.gender = patient.Gender;
            $scope.weight = patient.Weight;
            $scope.doctor = patient.Doctor;
            $scope.dob = new Date(Date.parse("" + patient.DateOfBirth));
            $scope.disease = patient.Disease;
            $scope.contact = patient.Contact;
            $scope.fee = patient.RegFee;
        })

})