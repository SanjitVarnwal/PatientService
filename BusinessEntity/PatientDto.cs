using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BusinessEntity
{
    public class PatientDetailDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Age { get; set; }
        public string Gender { get; set; }
        public double Weight { get; set; }
        public int ConsultingDoctor { get; set; }
        public System.DateTime DOB { get; set; }
        public string Disease { get; set; }
        public string Contact { get; set; }
        public int RegistrationFee { get; set; }
        public System.DateTime LastVisit { get; set; }
    }
    public class PatientDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Age { get; set; }
        public string Gender { get; set; }
        public double Weight { get; set; }
        public string ConsultingDoctor { get; set; }
        public System.DateTime DOB { get; set; }
        public string Disease { get; set; }
        public string Contact { get; set; }
        public int RegistrationFee { get; set; }
        public System.DateTime LastVisit { get; set; }
        public byte StatusFlag { get; set; }
    }
}