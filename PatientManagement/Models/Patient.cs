using System;

namespace PatientManagement.Models
{
    public class Patient
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Age { get; set; }
        public string Gender { get; set; }
        public float Weight { get; set; }
        public string Doctor { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Disease { get; set; }
        public string Contact { get; set; }
        public int RegFee { get; set; }
        public DateTime LastVisitDate { get; set; }

    }
}