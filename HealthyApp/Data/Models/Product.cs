namespace HealthyApp.Data.Models
{
    using System.ComponentModel.DataAnnotations;

    public class Product
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public int KCal { get; set; }

        [Required]
        public string Fat { get; set; }

        [Required]
        public string Protein { get; set; }

        [Required]
        public string Carbohydrate { get; set; }

        public ICollection<MealProduct> MealProducts { get; set; } = new HashSet<MealProduct>();
    }
}
