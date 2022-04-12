namespace HealthyApp.Data.Models
{
    public class BookUser
    {
        public int BookId { get; set; }

        public Book Book { get; set; }

        public string UserId { get; set; }

        public User User { get; set; }
    }
}
