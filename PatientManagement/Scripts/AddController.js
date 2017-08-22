app.controller("AddController", function ($scope, $location, $http, PatientService, DoctorService) {

    $scope.gender = "Male";
    $scope.doctors = DoctorService.query();
    //Database.getDoctorList()
    //    .then(function (response) {
    //        $scope.doctors = response;
    //    })

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
        //newPatient = {
        //    "Name": $scope.name,
        //    "Age": $scope.calcAge($scope.dob),
        //    "Gender": $scope.gender,
        //    "Weight": $scope.weight,
        //    "ConsultingDoctor": $scope.doctor,
        //    "DOB": $scope.dob,
        //    "Disease": $scope.disease,
        //    "Contact": $scope.contact,
        //    "RegistrationFee": $scope.fee,
        //    "LastVisit": new Date(),
        //    "StatusFlag": 0
        //}

        $scope.patient = PatientService.save({
            Name: $scope.name,
            Age: $scope.calcAge($scope.dob),
            Gender: $scope.gender,
            Weight: $scope.weight,
            ConsultingDoctor: $scope.doctor,
            DOB: $scope.dob,
            Disease: $scope.disease,
            Contact: $scope.contact,
            RegistrationFee: $scope.fee,
            LastVisit: new Date(),
            StatusFlag: 0
        }, function (response) {
            alert('Patient Saved: ' + response);
            $location.path('/landing');
        })

        //Database.createPatient(newPatient)
        //    .then(function (response) {
        //        alert('Created Patient: ')
        //    },
        //    function (err) {
                
        //    }
        //    )
    }

    $scope.redirect = function () {
        $location.path('/landing');
    };
})