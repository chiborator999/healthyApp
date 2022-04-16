namespace HealthyApp.Tests.Entity
{
    using HealthyApp.Data.Models;
    using System;
    using Xunit;
    using FluentAssertions;
    using HealthyApp.Data.Enum;

    public class MealTests
    {
        [Fact]
        public void Should_Successfuly_Construct_Meal_Entity_With_All_Fields()
        {
            // Arrange
            Random rnd = new Random();

            var mealId = rnd.Next(1, 20);

            var mealProductOne = new MealProduct
            {
                MealId = rnd.Next(1, 20),
                ProductId = rnd.Next(1, 20),
            };

            var mealProductTwo = new MealProduct
            {
                MealId = rnd.Next(1, 20),
                ProductId = rnd.Next(1, 20),
            };

            var products = new HashSet<MealProduct> { mealProductOne, mealProductTwo };

            // Act
            var meal = new Meal
            {
                Id = mealId,
                MealType = MealType.Dinner,
                MealCategory = MealCategory.Meat,
                Products = products,
            };

            // Assert
            meal.Id.Should().Be(mealId);
            meal.MealType.Should().Be(MealType.Dinner);
            meal.MealCategory.Should().Be(MealCategory.Meat);
            meal.Products.Should().BeEquivalentTo(products);
        }
    }
}
