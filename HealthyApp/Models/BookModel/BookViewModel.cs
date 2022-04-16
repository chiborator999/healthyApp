using System.ComponentModel.DataAnnotations;

namespace HealthyApp.Models.BookModel
{
    public class BookViewModel
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Author { get; set; }

        public string Url { get; set; }

        public string PerformerId { get; set; }

    }
}
