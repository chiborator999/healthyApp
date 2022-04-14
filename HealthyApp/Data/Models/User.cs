namespace HealthyApp.Data.Models
{
    using Microsoft.AspNetCore.Identity;
    using System.ComponentModel.DataAnnotations;

    public class User : IdentityUser
    {
        public User()
        {
            this.MealUsers = new HashSet<MealUser>();
            this.Books = new HashSet<Book>();
            this.ExerciseUser = new HashSet<ExerciseUser>();
        }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        public int Age { get; set; }

        [Required]
        public string Gender { get; set; }

        public double Weight { get; set; }

        public double Height { get; set; }

        public ICollection<MealUser> MealUsers { get; set; }

        public ICollection<ExerciseUser> ExerciseUser { get; set; }

        public ICollection<Book> Books { get; set; }
    }
}
