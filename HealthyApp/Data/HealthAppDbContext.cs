﻿namespace HealthyApp.Data
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
        }

        public DbSet<Product> Products { get; set; }

        public DbSet<Meal> Meals { get; set; }

        public DbSet<Exercise> Exercises { get; set; }

        public DbSet<Book> Books { get; set; }

        public DbSet<CustomException> CustomExceptions { get; set; }

        public DbSet<MealProduct> MealProducts { get; set; }
    }
}