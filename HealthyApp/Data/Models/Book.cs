namespace HealthyApp.Data.Models
{
    using System.ComponentModel.DataAnnotations;

    public class Book
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Author { get; set; }

        public string Url { get; set; }

        public ICollection<User> Users { get; set; }

    }
}
