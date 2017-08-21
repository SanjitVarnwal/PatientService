app.factory('PatientService', function ($resource) {
    return $resource('/api/Doctors/:id', { id: '@id' });
})