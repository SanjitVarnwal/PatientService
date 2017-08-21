app.factory('PatientService', function ($resource) {
    return $resource('/api/Patients/:Id', { Id: '@_id' }, {
        update: {
            method: 'PUT'
        }
    });

    
})