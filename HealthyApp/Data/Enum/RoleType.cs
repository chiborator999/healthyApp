using System.Runtime.Serialization;

namespace HealthyApp.Data.Enum
{
    public enum RoleType
    {
        [EnumMember(Value = "User")]
        User = 0,
        [EnumMember(Value = "Admin")]
        Admin = 1,
    }
}
