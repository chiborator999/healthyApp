namespace HealthyApp.Models.MealModel
{
    using HealthyApp.Data.Enum;
    using HealthyApp.Models.MealProductModel;

    public class MealRequestModel
    {
        public int Id { get; set; }

        public MealType MealType { get; set; }

        public MealCategory MealCategory { get; set; }

        public HashSet<MealProductRequestModel> Products { get; set; } = new HashSet<MealProductRequestModel>();
    }
}
