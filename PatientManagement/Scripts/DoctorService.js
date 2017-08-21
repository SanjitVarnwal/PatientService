app.factory('DoctorService', function ($resource) {
    return $resource('/api/Doctors/:id');
})