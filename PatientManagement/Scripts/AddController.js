app.controller("AddController", function ($scope, $location, $http, Database) {

    Database.getDoctorList()
        .then(function (response) {
            $scope.doctors = response;
        })

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

    $scope.createPatient = function () {
        newPatient = {
            "Name": $scope.name,
            "Age": $scope.calcAge($scope.dob),
            "Gender": $scope.gender,
            "Weight": $scope.weight,
            "ConsultingDoctor": $scope.doctor,
            "DOB": $scope.dob,
            "Disease": $scope.disease,
            "Contact": $scope.contact,
            "RegistrationFee": $scope.fee,
            "LastVisit": new Date(),
            "StatusFlag": 1
        }

        Database.createPatient(newPatient)
            .then(function (response) {
                alert('Created Patient: ' + response.data[0])
            },
            function (err) {
                console.log("Error: " + err.data[1]);
            }
            )
    }

    $scope.redirect = function () {
        $location.path('/landing');
    };
})