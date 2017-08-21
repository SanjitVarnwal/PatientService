app.factory('PatientService', function ($resource) {
    var data = $resource('/api/Patients/:id', { id: '@id' }, {
        update: {
            method: 'PUT'
        }
    });

    return data;
})