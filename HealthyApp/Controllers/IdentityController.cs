namespace HealthyApp.Controllers
{
    using HealthyApp.Data.Models;
    using HealthyApp.Interfaces;
    using HealthyApp.Models.Identity;
    using HealthyApp.Models.UserModel;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;
    using Microsoft.IdentityModel.Tokens;
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using System.Text;

    public class IdentityController : ApiController
    {
        private readonly UserManager<User> userManager;
        private readonly AppSettings appSettings;
        private readonly ILogService _logService;

        public IdentityController(
            UserManager<User> userManager,
            IOptions<AppSettings> appSettings,
            ILogService logService
            )
        {
            this.userManager = userManager;
            this.appSettings = appSettings.Value;
            _logService = logService;
        }
        
        [HttpPost]
        [Route(nameof(Register))]
        public async Task<ActionResult> Register(RegisterUserRequestModel model)
        {
            var user = new User
            {
                UserName = model.UserName,
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
                Age = model.Age,
                Gender = model.Gender,
                Weight = model.Weight,
                Height = model.Height
            };

            var result = await this.userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                return Ok();
            }

            return BadRequest(result.Errors);
        }

        [HttpPost]
        [Route(nameof(Login))]
        public async Task<ActionResult<object>> Login(LoginRequestModel model)
        {
            var user = await this.userManager.FindByNameAsync(model.UserName);

            if(user == null)
            {
                return Unauthorized();
            }

            var passwordValid = await this.userManager.CheckPasswordAsync(user, model.Password);

            if (!passwordValid)
            {
                return Unauthorized();
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim("id", user.Id.ToString()),
                    new Claim(ClaimTypes.Email, user.Email.ToString()),
                    new Claim("username", user.UserName.ToString()),
                    new Claim("firstName", user.FirstName.ToString()),
                    new Claim("lastName", user.LastName.ToString()),
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var encryptedToken = tokenHandler.WriteToken(token);

            return new
            {
                Token = encryptedToken
            };
        }

        [HttpGet]
        [Route(nameof(GetUser))]
        public async Task<ActionResult<UserViewModel>> GetUser(string userId)
        {
            try
            {
                var user = await this.userManager.FindByIdAsync(userId);

                var userViewModel = new UserViewModel
                {
                    FullName = $"{user.FirstName} {user.LastName}",
                    Email = user.Email,
                    UserName = user.UserName,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Age = user.Age,
                    Gender = user.Gender,
                    Height = user.Height,
                    Weight = user.Weight,
                };
                
                return userViewModel;
            }
            catch (Exception ex)
            {
                return BadRequest(await _logService.LogExceptionAsync(ex));
            }
        }

        [HttpPut]
        [Route(nameof(UpdateUser))]
        public async Task<ActionResult> UpdateUser(UserRequestModel model)
        {
            var user = await this.userManager.FindByNameAsync(model.UserName);

            user.Email = model.Email;
            user.FirstName = model.FirstName;
            user.LastName = model.LastName;
            user.Age = model.Age;
            user.Gender = model.Gender;
            user.Height = model.Height;          
            user.Weight = model.Weight;

            var result = await this.userManager.UpdateAsync(user);

            if (result.Succeeded)
            {
                return Ok($"Successfuly updated User with username: {user.UserName}");
            }

            return BadRequest(result.Errors);
        }
    }
}
