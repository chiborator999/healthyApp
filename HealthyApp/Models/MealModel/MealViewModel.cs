namespace HealthyApp.Models.MealModel
{
    using HealthyApp.Data.Enum;
    using HealthyApp.Data.Models;
    using HealthyApp.Models.ProductModel;

    public class MealViewModel
    {
        public int Id { get; set; }

        public MealType MealType { get; set; }

        public MealCategory MealCategory { get; set; }

        public List<ProductViewModel> Products { get; set; } = new List<ProductViewModel>();

        public double TotalKCal { get; set; }
    }
}
