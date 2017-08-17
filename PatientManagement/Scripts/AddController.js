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
        var newPatient = {
            "Name": $scope.name,
            "Age": $scope.calcAge($scope.dob),
            "Gender": $scope.gender,
            "Weight": $scope.weight,
            "Doctor": $scope.doctor,
            "DateOfBirth": moment($scope.dob).format('YYYY-MM-DD'),
            "Disease": $scope.disease,
            "Contact": $scope.contact,
            "RegFee": $scope.fee,
            "LastVisitDate": moment(new Date()).format('YYYY-MM-DD')
        }

        Database.createPatient(newPatient)
            .then(function () {

            },
            function (err) {
                console.log("Error: " + err);
            }
            )
    }

    $scope.redirect = function () {
        $location.path('/landing');
    };
})