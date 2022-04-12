using HealthyApp;
using HealthyApp.Data;
using HealthyApp.Data.Models;
using HealthyApp.Infrastructure;
using HealthyApp.Interfaces;
using HealthyApp.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services
    .AddDbContext<HealthAppDbContext>(options =>
    options.UseSqlServer(connectionString));

builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddIdentity<User, IdentityRole>(options =>
{
    options.Password.RequireDigit = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = false;
    options.Password.RequiredLength = 6;
})
    .AddEntityFrameworkStores<HealthAppDbContext>();

var appSettingsSection = builder.Configuration.GetSection("ApplicationSettings");
builder.Services.Configure<AppSettings>(appSettingsSection);

var appSettings = appSettingsSection.Get<AppSettings>();
var key = Encoding.ASCII.GetBytes(appSettings.Secret);

builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
    .AddJwtBearer(x => {
    x.RequireHttpsMetadata = false;
    x.SaveToken = false;
    x.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false,
        ClockSkew = TimeSpan.Zero
    };
});

builder.Services.AddControllers();

builder.Services.AddTransient<IProductService, ProductService>(s => new ProductService ( s.GetRequiredService<HealthAppDbContext>() ));
builder.Services.AddTransient<IMealService, MealService>(s => new MealService ( s.GetRequiredService<HealthAppDbContext>() ));
builder.Services.AddTransient<IBookService, BookService>(s => new BookService ( s.GetRequiredService<HealthAppDbContext>() ));
builder.Services.AddTransient<IExerciseService, ExerciseService>(s => new ExerciseService( s.GetRequiredService<HealthAppDbContext>() ));
builder.Services.AddTransient<IUserService, UserService>(s => new UserService( s.GetRequiredService<HealthAppDbContext>() ));
builder.Services.AddTransient<ILogService, LogService>(s => new LogService ( s.GetRequiredService<HealthAppDbContext>() ));
builder.Services.AddControllers().AddNewtonsoftJson(options =>
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "HealthyApp Api", Version = "v1" });
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(options => {
    options.SwaggerEndpoint("/swagger/v1/swagger.json", "My HealthyApp v1");
    options.RoutePrefix = String.Empty;
});

app.UseRouting();

app.UseCors(options => options
.AllowAnyOrigin()
.AllowAnyHeader()
.AllowAnyMethod());

app.UseAuthentication();
app.UseAuthorization();

app.UseEndpoints(endpoints => endpoints.MapControllers());

app.ApplyMigrations();

app.Run();
