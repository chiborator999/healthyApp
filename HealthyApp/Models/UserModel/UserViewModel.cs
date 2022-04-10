using System.ComponentModel.DataAnnotations;

namespace HealthyApp.Models.UserModel
{
    public class UserViewModel
    {

        [Required]
        public string FullName { get; set;}

        [Required]
        public string UserName { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        public int Age { get; set; }

        [Required]
        public string Gender { get; set; }

        public double Weight { get; set; }

        public double Height { get; set; }
    }
}
