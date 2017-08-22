describe('get()', function () {

    beforeEach(angular.mock.module('patientApp'));
    //beforeEach(angular.mock.module('DBService'));

    //beforeEach(inject(function (_Database_) {
    //    Database = _Database_;
    //}))

    beforeEach(inject(function (_PatientService_) {
        PatientService = _PatientService_;
    }))

    var newpatient = {
        "Id": 101,
        "Name": "Ramesh Kumar",
        "Age": "5 years 2 months",
        "Gender": "Male",
        "Weight": 9.3,
        "ConsultingDoctor": "M P Sharma",
        "DOB": "2012-06-01T00:00:00",
        "Disease": "Fever",
        "Contact": "8789342567",
        "RegistrationFee": 40,
        "LastVisit": "2017-08-21T00:00:00",
        "StatusFlag": 0
    };

    it('should exist', function () {
        expect(PatientService).toBeDefined();
    });

    it('should exist', function () {
        expect(PatientService.get).toBeDefined();
    });

    it('should return one patient object if it exists', function () {
        patient = PatientService.get({ Id: 101 }, function () {
            expect(patient).toEqual(newpatient);
        });
    });

    it('should return undefined if the patient cannot be found', function () {
        patient = PatientService.get({ Id: 206 }, function () {
            expect(patient).not.toBeDefined();
        });
    });

    

    //it('should exist', function () {
    //    expect(Database).toBeDefined();
    //});

    //it('should exist', function () {
    //    expect(Database.readPatient).toBeDefined();
    //});

    //it('should return undefined if the patient cannot be found', function () {
    //    expect(Database.readPatient(108)).not.toBeDefined();
    //});

    //it('should return one patient object if it exists', function () {
    //    expect(Database.readPatient(101)).toEqual(patient);
    //});

    
})

describe('query()', function () {

    beforeEach(angular.mock.module('patientApp'));
    
    beforeEach(inject(function (_PatientService_) {
        PatientService = _PatientService_;
    }))
    var patients;
    var patientList = [
        {
            "Id": 101,
            "Name": "Ramesh Kumar",
            "Age": "50 years 0 months",
            "Gender": "Male",
            "Weight": 78,
            "ConsultingDoctor": "M P Sharma",
            "DOB": "1967-08-12T00:00:00",
            "Disease": "Fever",
            "Contact": "8789342567",
            "RegistrationFee": 400,
            "LastVisit": "2017-08-21T00:00:00",
            "StatusFlag": 0
        },
        {
            "Id": 102,
            "Name": "Anjali Kumari",
            "Age": "25 years 5 months",
            "Gender": "Female",
            "Weight": 78.6,
            "ConsultingDoctor": "A K Mehta",
            "DOB": "1992-03-05T00:00:00",
            "Disease": "Fever",
            "Contact": "9889762343",
            "RegistrationFee": 600,
            "LastVisit": "2017-08-21T00:00:00",
            "StatusFlag": 0
        },
        {
            "Id": 103,
            "Name": "Rohan Sharma",
            "Age": "40 years 7 months",
            "Gender": "Male",
            "Weight": 78.6,
            "ConsultingDoctor": "BN Mishra",
            "DOB": "1977-01-30T00:00:00",
            "Disease": "Fever",
            "Contact": "9889762347",
            "RegistrationFee": 600,
            "LastVisit": "2017-08-21T00:00:00",
            "StatusFlag": 0
        },
        {
            "Id": 105,
            "Name": "Chahat Khanna",
            "Age": "17 years 4 months",
            "Gender": "Female",
            "Weight": 50,
            "ConsultingDoctor": "BN Mishra",
            "DOB": "2000-04-02T00:00:00",
            "Disease": "Malaria",
            "Contact": "7833927763",
            "RegistrationFee": 560,
            "LastVisit": "2017-08-21T00:00:00",
            "StatusFlag": 0
        },
        {
            "Id": 106,
            "Name": "q",
            "Age": "16 years 11 months",
            "Gender": "Male",
            "Weight": 12,
            "ConsultingDoctor": "BN Mishra",
            "DOB": "2000-08-31T00:00:00",
            "Disease": "ewrewr",
            "Contact": "8835423542",
            "RegistrationFee": 323,
            "LastVisit": "2017-08-22T00:00:00",
            "StatusFlag": 0
        }
        ]

    it('should exist', function () {
        expect(PatientService.query).toBeDefined();
    });

    it('should return a list of Patients ', function () {
        patients = PatientService.query(function () {
            expect(patients).toEqual(patientList);
        });
    });

})

describe('update()', function () {

    beforeEach(angular.mock.module('patientApp'));

    beforeEach(inject(function (_PatientService_) {
        PatientService = _PatientService_;
    }))
    var newpatient = {
        "Id": 101,
        "Name": "Ramesh Kumar",
        "Age": "5 years 2 months",
        "Gender": "Male",
        "Weight": 9.3,
        "ConsultingDoctor": "M P Sharma",
        "DOB": "2012-06-01T00:00:00",
        "Disease": "Jukaam",
        "Contact": "8789342567",
        "RegistrationFee": 40,
        "LastVisit": "2017-08-21T00:00:00",
        "StatusFlag": 0
    };
    it('should exist', function () {
        expect(PatientService.update).toBeDefined();
    });

    it('should return updated patient object if Patient is updated ', function () {
        patients = PatientService.update({ Id: 101 }, newpatient, function () {
            expect(patients).toEqual(newpatient);
        });
    });

    it('should return not found if Patient id does not exist in database ', function () {
        patients = PatientService.update({ Id: 303 }, newpatient, function () {
            expect(patients.statusCode).toBeStatusCode(404);;
        });
    });

})

describe('Post()', function () {

    beforeEach(angular.mock.module('patientApp'));

    beforeEach(inject(function (_PatientService_) {
        PatientService = _PatientService_;
    }))
    var newpatient = {
        "Name": "Alankar Kumar",
        "Age": "5 years 2 months",
        "Gender": "Male",
        "Weight": 9.3,
        "ConsultingDoctor": 103,
        "DOB": "2012-06-01T00:00:00",
        "Disease": "Jukaam",
        "Contact": "8789342567",
        "RegistrationFee": 40,
        "LastVisit": "2017-08-21T00:00:00",
        "StatusFlag": 0
    };
    it('should exist', function () {
        expect(PatientService.save).toBeDefined();
    });

    it('should return added patient object if Patient is added successfully ', function () {
        patients = PatientService.save( newpatient, function () {
            expect(patients).toEqual(newpatient);
        });
    });


})