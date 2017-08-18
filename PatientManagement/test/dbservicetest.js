describe('.readPatient()', function () {
    it('should exist', function () {
        expect(DBService.readPatient).toBeDefined();
    });

    it('should return one patient object if it exists', function () {
        expect(DBService.readPatient('101')).toEqual(singlePatient);
    });

    it('should return undefined if the patient cannot be found', function () {
        expect(DBService.readPatient('108')).not.toBeDefined();
    });
})