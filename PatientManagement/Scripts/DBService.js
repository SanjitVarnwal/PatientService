//var DBService = angular.module('DBService', [])
//    .factory('Database', function ($http) {

//        var Database = {};

//        Database.readAllPatients = function () {
//            return $http.get('/api/Patients')
//                .then(function (response) {
//                    return response.data;
//                });
//        }

//        Database.readPatient = function (id) {
//            return $http.get('/api/Patients/' + id)
//                .then(function (response) {
//                    return response.data;
//                },
//                funtion(response){
                    
//                }
//            );
//        }

//        Database.createPatient = function (patient) {
//            var request = $http({
//                method: "post",
//                url: "/api/Patients",
//                data: patient
//            });
//            return request;
//        }

//        Database.updatePatient = function (id, patient) {
//            var request = $http({
//                method: "put",
//                url: "/api/Patients/" + id,
//                data: patient
//            });
//            return request;
//        }

//        Database.deletePatient = function (id) {
//            var request = $http({
//                method: "put",
//                url: "/api/Patients/" + id
//            });
//            return request;
//        }

//    Database.getDoctorList = function () {
//        return $http.get('/api/Doctors')
//            .then(function (response) {
//                return response.data;
//            });
//    }

//    return Database;

//})