namespace HealthyApp.Data.Models
{
    using Microsoft.AspNetCore.Identity;
    using System.ComponentModel.DataAnnotations;

    public class User : IdentityUser
    {
        public User()
        {
            this.Meals = new HashSet<Meal>();
            this.Books = new HashSet<Book>();
            this.Exercises = new HashSet<Exercise>();
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

        public ICollection<Meal> Meals { get; set; }

        public ICollection<Exercise> Exercises { get; set; }

        public ICollection<Book> Books { get; set; }
    }
}
