namespace HealthyApp.Data
{
    using HealthyApp.Data.Models;
    using HealthyApp.Data.Models.Common;
    using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore;
    public class HealthAppDbContext : IdentityDbContext<User>
    {
        public HealthAppDbContext(DbContextOptions<HealthAppDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<MealProduct>().HasKey(mp => new { mp.MealId, mp.ProductId });
            builder.Entity<MealProduct>().HasOne(m => m.Meal).WithMany(mp => mp.Products).HasForeignKey(mp => mp.MealId);
            builder.Entity<MealProduct>().HasOne(p => p.Product).WithMany(mp => mp.MealProducts).HasForeignKey(mp => mp.ProductId);


            builder.Entity<ExerciseUser>().HasKey(eu => new { eu.ExerciseId, eu.UserId });
            builder.Entity<ExerciseUser>().HasOne(e => e.Exercise).WithMany(u => u.ExerciseUser).HasForeignKey(e => e.ExerciseId);
            builder.Entity<ExerciseUser>().HasOne(u => u.User).WithMany(u => u.ExerciseUser).HasForeignKey(u => u.UserId);

            builder.Entity<MealUser>().HasKey(mu => new { mu.MealId, mu.UserId });

            builder.Entity<BookUser>().HasKey(bu => new { bu.BookId, bu.UserId });
        }

        public DbSet<Product> Products { get; set; }

        public DbSet<Meal> Meals { get; set; }

        public DbSet<Exercise> Exercises { get; set; }

        public DbSet<Book> Books { get; set; }

        public DbSet<CustomException> CustomExceptions { get; set; }

        public DbSet<MealProduct> MealProducts { get; set; }

        public DbSet<ExerciseUser> ExerciseUsers { get; set; }

        public DbSet<MealUser> MealUsers { get; set; }

        public DbSet<BookUser> BookUsers { get; set; }
    }
}