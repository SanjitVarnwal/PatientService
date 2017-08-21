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

namespace PatientServices.Controllers
{
    public class PatientsController : ApiController
    {
        private PatientManagementEntities db = new PatientManagementEntities();

        // GET: api/Patients
        /**
        public IEnumerable<string> GetPatients()
        {
            return new string[] { "sanju", "hi" };

        }
            
        public IQueryable<Patient> GetPatients()
        {
            
            return db.Patients;
        } 
        **/
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
                                   StatusFlag = p.StatusFlag
                               };
                return Patients;
           
            //return db.Patients;
        }
        
        
        // GET: api/Patients/5
        [ResponseType(typeof(Patient))]
        public async Task<IHttpActionResult> GetPatient(int id)
        {
            var Patient = await db.Patients.Include(p => p.Doctor).Select(p =>
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


       }).SingleOrDefaultAsync(p => p.Id == id);
            if (Patient == null)
            {
                return NotFound();
            }

            return Ok(Patient);
        }

        // PUT: api/Patients/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutPatient(int id, Patient patient)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != patient.Id)
            {
                return BadRequest();
            }

            if (!PatientExists(id))
            {
                return NotFound();
            }

            db.Entry(patient).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {    
                throw;
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Patients
        [ResponseType(typeof(Patient))]
        public async Task<IHttpActionResult> PostPatient(Patient patient)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Patients.Add(patient);
            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }
                //New Code
            db.Entry(patient).Reference(x => x.Doctor).Load();
            var dto = new PatientDto()
            {
                Id = patient.Id,
            };

            return CreatedAtRoute("DefaultApi", new { id = patient.Id }, dto);
        }

        // DELETE: api/Patients/5
        [ResponseType(typeof(Patient))]
        public async Task<IHttpActionResult> DeletePatient(int id)
        {
            var Patients = await db.Patients.FindAsync(id);
            //Patient patient = await db.Patients.FindAsync(id);
            if (Patients == null)
            {
                return NotFound();
            }

            db.Patients.Remove(Patients);
            await db.SaveChangesAsync();

            return Ok(Patients);
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