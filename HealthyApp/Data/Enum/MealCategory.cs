using System.Runtime.Serialization;

namespace HealthyApp.Data.Enum
{
    public enum MealCategory
    {
        [EnumMember(Value = "Vegan")]
        Vegan = 0,
        [EnumMember(Value = "Vegetarian")]
        Vegetarian = 1,
        [EnumMember(Value = "Pescetarian")]
        Pescetarian = 2,
        [EnumMember(Value = "Meat")]
        Meat = 3,
    }
}
