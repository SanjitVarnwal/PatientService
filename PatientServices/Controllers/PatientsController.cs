using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using DataAccessLayer;
using PatientServices.Models;
using BusinessEntity;
using System.Data.Entity.Validation;
using System.Text;

namespace PatientServices.Controllers
{
    public class PatientsController : ApiController
    {
        private PatientManagementEntities db = new PatientManagementEntities();

        // GET: api/Patients
        public IQueryable<PatientDto> GetPatients()
        {
            var Patients = from p in db.Patients
                           where p.StatusFlag == 0
                           select new PatientDto()
                           {
                               Id = p.Id,
                               Name = p.Name,
                               Age = p.Age,
                               Gender = p.Gender,
                               Weight = p.Weight,
                               DOB = p.DOB,
                               ConsultingDoctor = p.Doctor.Name,
                               Disease = p.Disease,
                               Contact = p.Contact,
                               RegistrationFee = p.RegistrationFee,
                               LastVisit = p.LastVisit,
                           };
            if (Patients == null)
            {
                throw new HttpResponseException(HttpStatusCode.NoContent);
            }
            return Patients;
           
            
        }
        
        
        // GET: api/Patients/5
        [ResponseType(typeof(Patient))]
        public HttpResponseMessage GetPatient(int id)
        {
            var Patient =  db.Patients.Include(p => p.Doctor).Select(p =>
       new PatientDetailDto()
       {
           Id = p.Id,
           Name = p.Name,
           Age = p.Age,
           Gender = p.Gender,
           Weight = p.Weight,
           DOB = p.DOB,
           ConsultingDoctor = p.ConsultingDoctor,
           Disease = p.Disease,
           Contact = p.Contact,
           RegistrationFee = p.RegistrationFee,
           LastVisit = p.LastVisit


       }).FirstOrDefault(p => p.Id == id);
            if (Patient == null)
            {
                return new HttpResponseMessage(HttpStatusCode.NotFound);
            //    var resp = new HttpResponseMessage(HttpStatusCode.NotFound)
            //    {
            //        Content = new StringContent(string.Format("No Patient with ID = {0}", id)),
            //        ReasonPhrase = "Patient ID Not Found"
            //    };
            //    throw new HttpResponseException(resp);
            }

            return Request.CreateResponse(HttpStatusCode.OK, Patient);
        }

        // PUT: api/Patients/5
        [ResponseType(typeof(void))]
        public HttpResponseMessage PutPatient(int id, PatientDetailDto patientdto)
        {
            Patient patient = new Patient()
            {
                Id = patientdto.Id,
                Name = patientdto.Name,
                Age = patientdto.Age,
                Gender = patientdto.Gender,
                Weight = patientdto.Weight,
                DOB = patientdto.DOB,
                ConsultingDoctor = patientdto.ConsultingDoctor,
                Disease = patientdto.Disease,
                Contact = patientdto.Contact,
                RegistrationFee = patientdto.RegistrationFee,
                LastVisit = patientdto.LastVisit,
                StatusFlag = 0
            };

            
            if (!PatientExists(id))
            {
                return new HttpResponseMessage(HttpStatusCode.NotFound);
            }
            db.Entry(patient).State = EntityState.Modified;
            try
            {
                db.SaveChanges();
            }
            catch (Exception)
            {
                return new HttpResponseMessage(HttpStatusCode.InternalServerError);   
            }

            return Request.CreateResponse(HttpStatusCode.OK, patient);
        }

        // POST: api/Patients
        [ResponseType(typeof(Patient))]
        public HttpResponseMessage PostPatient(PatientDetailDto patientdto)
        {
            Patient patient = new Patient()
            {
                Id = patientdto.Id,
                Name = patientdto.Name,
                Age = patientdto.Age,
                Gender = patientdto.Gender,
                Weight = patientdto.Weight,
                DOB = patientdto.DOB,
                ConsultingDoctor = patientdto.ConsultingDoctor,
                Disease = patientdto.Disease,
                Contact = patientdto.Contact,
                RegistrationFee = patientdto.RegistrationFee,
                LastVisit = patientdto.LastVisit,
                StatusFlag = 0
            };
            

            db.Patients.Add(patient);
            try
            {
                db.SaveChanges();
            }
            catch (Exception) //DbUpdateException
            {
                //    throw new DbUpdateException("The request couldn't be successfully Executed !!");
                //}
                //catch (DbEntityValidationException ex)
                //{
                //    var errorMessages = ex.EntityValidationErrors
                //            .SelectMany(x => x.ValidationErrors)
                //            .Select(x => x.ErrorMessage);
                //    var fullErrorMessage = string.Join( " ; ", errorMessages);
                //    var exceptionMessage = string.Concat(ex.Message, " The validation errors are: ", fullErrorMessage);
                //    throw new DbEntityValidationException(exceptionMessage, ex.EntityValidationErrors);
                return new HttpResponseMessage(HttpStatusCode.InternalServerError);
            }
            //Loads the newly updated data in the patient with reference of foriegn doctor table
            db.Entry(patient).Reference(x => x.Doctor).Load();
            //var dto = new PatientIdDto()
            //{
            //    Id = patient.Id
            //};
            //returns Response 201 and dto object with it.
            var response =  Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent("" + patient.Id, Encoding.UTF8, "application/json");

            return response;
        }

        //Not implementing this function as a method for soft delete from database is already being implemented.
        // DELETE: api/Patients/5
        [ResponseType(typeof(Patient))]
        public HttpResponseMessage DeletePatient(int id)
        {
            var Patient = db.Patients.Find(id);
            //Patient patient = await db.Patients.FindAsync(id);
            if (Patient == null)
            {
                return new HttpResponseMessage(HttpStatusCode.NotFound);
            }

            Patient.StatusFlag = 1;
            db.Entry(Patient).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (Exception)
            {
                return new HttpResponseMessage(HttpStatusCode.InternalServerError);
            }

            return Request.CreateResponse(HttpStatusCode.OK, Patient.Id);

        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PatientExists(int id)
        {
            return db.Patients.Count(e => e.Id == id) > 0;
        }
    }
}