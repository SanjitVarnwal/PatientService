app.controller("EditController", function ($scope, $location, $http, $routeParams, DoctorService, PatientService) {

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
        //var newPatient = {
        //    "Id": $scope.id,
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

        $scope.patient = PatientService.update({ Id: $routeParams.id },
            {
                Id: $scope.id,
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
            },
            function () {
                alert('Updated Patient: ' + $scope.id);
                $location.path('/landing');
            })

        //Database.updatePatient($scope.id, newPatient)
        //    .then(function (response) {
        //        alert('Updated Patient: ' + $scope.id);
        //        $location.path('/landing');
        //    },
        //    function (err) {
                
        //    }
        //)
    }

    $scope.doctors = DoctorService.query();
    //Database.getDoctorList()
    //    .then(function (response) {
    //        $scope.doctors = response;
    //    },
    //    function (err) {
           
    //    }
    //)
        
    patient = PatientService.get({ Id: $routeParams.id }, function () {
        console.log(patient);
        $scope.id = patient.Id;
        $scope.name = patient.Name;
        $scope.gender = patient.Gender;
        $scope.weight = patient.Weight;
        $scope.doctor = patient.ConsultingDoctor;
        $scope.dob = new Date(Date.parse("" + patient.DOB));
        $scope.disease = patient.Disease;
        $scope.contact = patient.Contact;
        $scope.fee = patient.RegistrationFee;
    });
    

    //Database.readPatient($routeParams.id)
    //    .then(function (response) {
    //        patient = response;
    //        $scope.id = patient.Id;
    //        $scope.name = patient.Name;
    //        $scope.gender = patient.Gender;
    //        $scope.weight = patient.Weight;
    //        $scope.doctor = patient.ConsultingDoctor;
    //        $scope.dob = new Date(Date.parse(""+patient.DOB));
    //        $scope.disease = patient.Disease;
    //        $scope.contact = patient.Contact;
    //        $scope.fee = patient.RegistrationFee;
    //    },
    //    function () {
            
    //    }
    //)

    
    
    

})