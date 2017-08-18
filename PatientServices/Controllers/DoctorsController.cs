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

namespace PatientServices.Controllers
{
    using BusinessEntity;
    using System.Data.Entity.SqlServer;

    internal static class MissingDllHack
    {
        // Must reference a type in EntityFramework.SqlServer.dll so that this dll will be
        // included in the output folder of referencing projects without requiring a direct 
        // dependency on Entity Framework. See http://stackoverflow.com/a/22315164/1141360.
        private static SqlProviderServices instance = SqlProviderServices.Instance;
    }

    public class DoctorsController : ApiController
    {
        private PatientManagementEntities db = new PatientManagementEntities();

        // GET: api/Doctors
        public IQueryable<DoctorsDto> GetDoctors()
        {
            var Doctors = from d in db.Doctors
                          select new DoctorsDto()
                          {
                              Id = d.Id,
                              Name = d.Name,
                              Department = d.Department
                          };

            return Doctors;

            //return db.Doctors;
        }

        // GET: api/Doctors/5
        [ResponseType(typeof(Doctor))]
        public async Task<IHttpActionResult> GetDoctor(int id)
        {
            Doctor doctor = await db.Doctors.FindAsync(id);
            if (doctor == null)
            {
                return NotFound();
            }

            return Ok(doctor);
        }

        // PUT: api/Doctors/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutDoctor(int id, Doctor doctor)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != doctor.Id)
            {
                return BadRequest();
            }

            db.Entry(doctor).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DoctorExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Doctors
        [ResponseType(typeof(Doctor))]
        public async Task<IHttpActionResult> PostDoctor(Doctor doctor)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Doctors.Add(doctor);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = doctor.Id }, doctor);
        }

        // DELETE: api/Doctors/5
        [ResponseType(typeof(Doctor))]
        public async Task<IHttpActionResult> DeleteDoctor(int id)
        {
            Doctor doctor = await db.Doctors.FindAsync(id);
            if (doctor == null)
            {
                return NotFound();
            }

            db.Doctors.Remove(doctor);
            await db.SaveChangesAsync();

            return Ok(doctor);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool DoctorExists(int id)
        {
            return db.Doctors.Count(e => e.Id == id) > 0;
        }
    }
}