using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using PatientServices.Controllers;
using System.Net.Http;
using System.Web.Http;
using BusinessEntity;
using DataAccessLayer;
using System.Net;

namespace UnitTestPatientServices
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void TestPutPatientSuccess()
        {
            var Controller = new PatientsController();
            Controller.Request = new HttpRequestMessage();
            Controller.Configuration = new HttpConfiguration();

            PatientDetailDto patientdto = new PatientDetailDto()
            {
                Id = 106,
                Name = "Suresh Kumar",
                Age = "50 years 0 months",
                Gender = "Male",
                Weight = 90,
                ConsultingDoctor = 102,
                DOB = new DateTime(1967, 8, 12),
                Disease = "Diarrhoea",
                Contact = "9983464423",
                RegistrationFee = 1000,
                LastVisit = new DateTime(),
                StatusFlag = 0
            };
            

            var response = Controller.PutPatient(106, patientdto);

            Assert.IsInstanceOfType(response, typeof(HttpResponseMessage));
            Assert.AreEqual(response.StatusCode, HttpStatusCode.OK);
        }

        [TestMethod]
        public void TestPutPatientFailure()
        {
            var Controller = new PatientsController();
            Controller.Request = new HttpRequestMessage();
            Controller.Configuration = new HttpConfiguration();

            PatientDetailDto patientdto = new PatientDetailDto()
            {
                Id = 201,
                Name = "Suresh Kumar",
                Age = "50 years 0 months",
                Gender = "Male",
                Weight = 90,
                ConsultingDoctor = 102,
                DOB = new DateTime(1967, 8, 12),
                Disease = "Diarrhoea",
                Contact = "9983464423",
                RegistrationFee = 1000,
                LastVisit = new DateTime(),
                StatusFlag = 0
            };


            var response = Controller.PutPatient(201, patientdto);

            Assert.IsInstanceOfType(response, typeof(HttpResponseMessage));
            Assert.AreEqual(response.StatusCode, HttpStatusCode.NotFound);
        }

        [TestMethod]
        public void TestPutPatientError()
        {
            var Controller = new PatientsController();
            Controller.Request = new HttpRequestMessage();
            Controller.Configuration = new HttpConfiguration();

            PatientDetailDto patientdto = new PatientDetailDto()
            {
                Id = 201,
                Name = "Suresh Kumar",
                Age = "50 years 0 months",
                Gender = "Male",
                Weight = 90,
                ConsultingDoctor = 102,
                DOB = new DateTime(1967, 8, 12),
                Disease = "Diarrhoea",
                Contact = "9983464423",
                RegistrationFee = 1000,
                LastVisit = new DateTime(),
                StatusFlag = 0
            };


            var response = Controller.PutPatient(101, patientdto);

            Assert.IsInstanceOfType(response, typeof(HttpResponseMessage));
            Assert.AreEqual(response.StatusCode, HttpStatusCode.InternalServerError);
        }
    }
}
