using System.Runtime.Serialization;

namespace HealthyApp.Data.Enum
{
    public enum MealType
    {
        [EnumMember(Value = "Breakfast")]
        Breakfast = 0,
        [EnumMember(Value = "Lunch")]
        Lunch = 1,
        [EnumMember(Value = "Dinner")]
        Dinner = 2,
    }
}
