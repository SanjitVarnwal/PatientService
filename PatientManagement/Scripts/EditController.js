app.controller("EditController", function ($scope, $location, $http, $routeParams, Database) {

    $scope.redirect = function () {
        $location.path('/landing');
    };

    $scope.calcAge = function (dob) {
        today = new Date();
        yrs = today.getFullYear() - dob.getFullYear();
        mts = today.getMonth() - dob.getMonth();
        if (mts < 0) {
            mts = 12 + mts;
            yrs--;
        }

        return (yrs + " years " + mts + " months");
    }

    $scope.updatePatient = function () {
        var newPatient = {
            "Id": $scope.id,
            "Name": $scope.name,
            "Age": $scope.calcAge($scope.dob),
            "Gender": $scope.gender,
            "Weight": $scope.weight,
            "ConsultingDoctor": $scope.doctor,
            "DOB": moment($scope.dob).format('YYYY-MM-DD'),
            "Disease": $scope.disease,
            "Contact": $scope.contact,
            "RegistrationFee": $scope.fee,
            "LastVisit": new Date()
        }

        Database.updatePatient($scope.id, newPatient)
            .then(function () {

            },
            function (err) {
                console.log("Error: " + err);
            }
        )
    }

    Database.getDoctorList()
        .then(function (response) {
            $scope.doctors = response;
        },
        function () {
            console.log("Error: " + err);
        }
    )
        

    Database.readPatient($routeParams.id)
        .then(function (response) {
            patient = response;
            $scope.id = patient.Id;
            $scope.name = patient.Name;
            $scope.gender = patient.Gender;
            $scope.weight = patient.Weight;
            $scope.doctor = patient.Doctor;
            $scope.dob = new Date(Date.parse(""+patient.DOB));
            $scope.disease = patient.Disease;
            $scope.contact = patient.Contact;
            $scope.fee = patient.RegistrationFee;
        },
        function () {
            console.log("Error: " + err);
        }
    )

    
    
    

})