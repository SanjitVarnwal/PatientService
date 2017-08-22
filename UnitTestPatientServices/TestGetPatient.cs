using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http.Results;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using PatientServices.Controllers;
using BusinessEntity;
using System.Web.Http;
using System.Net.Http;
using System.Net;

namespace UnitTestPatientServices
{
    [TestClass]
    public class TestGetPatient
    {
        
        //[TestMethod]
        //public void TestGetPatient()
        //{
        //    var Controller = new PatientsController();
        //    Controller.Request = new HttpRequestMessage();
        //    Controller.Configuration = new HttpConfiguration();
        //    PatientDetailDto entity = new PatientDetailDto();
        //    var response = Controller.GetPatients() as List<PatientDetailDto>;
             
        //    Assert.IsNotNull(response);
        //}
    
        [TestMethod]
        public void TestGetPatientFound()
        {
            var Controller = new PatientsController();
            Controller.Request = new HttpRequestMessage();
            Controller.Configuration = new HttpConfiguration();


            var response = Controller.GetPatient(101);

            PatientDetailDto patient;

            Assert.IsTrue(response.TryGetContentValue<PatientDetailDto>(out patient));
            Assert.AreEqual(101, patient.Id);
            Assert.AreEqual("Ramesh Kumar", patient.Name);
            Assert.AreEqual("Male", patient.Gender);
            Assert.AreEqual(43, patient.Weight);
            Assert.AreEqual(103, patient.ConsultingDoctor);
            Assert.AreEqual(new DateTime(1967, 8, 11), patient.DOB);
            Assert.AreEqual("Fever", patient.Disease);
            Assert.AreEqual("8789342567", patient.Contact);
            Assert.AreEqual(400, patient.RegistrationFee);
            Assert.AreEqual("50 years 0 months", patient.Age);
            Assert.AreEqual(new DateTime(2017, 8, 22), patient.LastVisit);

            

        }

        [TestMethod]
        public void TestGetPatientNotFound()
        {
            var Controller = new PatientsController();
            Controller.Request = new HttpRequestMessage();
            Controller.Configuration = new HttpConfiguration();


            var response = Controller.GetPatient(203);
            
            Assert.IsInstanceOfType(response, typeof(HttpResponseMessage));
            Assert.AreEqual(response.StatusCode, HttpStatusCode.NotFound);
        }
    }
    
}
