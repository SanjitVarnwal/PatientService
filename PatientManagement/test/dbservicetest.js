describe('get()', function () {

    beforeEach(angular.mock.module('patientApp'));
    //beforeEach(angular.mock.module('DBService'));

    //beforeEach(inject(function (_Database_) {
    //    Database = _Database_;
    //}))

    beforeEach(inject(function (_PatientService_) {
        PatientService = _PatientService_;
    }))

    var patient = {
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

    it('should return undefined if the patient cannot be found', function () {
        expect(PatientService.get({ Id: 108 })).not.toBeDefined();
    });

    it('should return one patient object if it exists', function () {
        expect(PatientService.get({ Id: 101 })).toEqual(patient);
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