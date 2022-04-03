using System.ComponentModel.DataAnnotations;

namespace HealthyApp.Models.ProductModel
{
    public class ProductRequestModel
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set;}

        public int KCal { get; set;}

        [Required]
        public string Fat { get; set;}

        [Required]
        public string Protein { get; set;}

        [Required]
        public string Carbohydrate { get; set; }
    }
}
