app.controller("ViewController", function ($scope, $location, $http, $routeParams, Database) {

    $scope.redirectToLanding = function () {
        $location.path('/landing');
    };

    Database.readPatient($routeParams.id)
        .then(function (response) {
            patient = response;
            console.log(patient);
            $scope.id = patient.Id;
            $scope.name = patient.Name;
            $scope.gender = patient.Gender;
            $scope.weight = patient.Weight;
            $scope.doctor = patient.ConsultingDoctor;
            $scope.dob = moment(patient.DOB).format('YYYY-MM-DD');
            $scope.disease = patient.Disease;
            $scope.contact = patient.Contact;
            $scope.fee = patient.RegistrationFee;
        })

})