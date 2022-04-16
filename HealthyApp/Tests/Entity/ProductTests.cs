namespace HealthyApp.Tests.Entity
{
    using HealthyApp.Data.Models;
    using System;
    using Xunit;
    using FluentAssertions;

    public class ProductTests
    {
        [Fact]
        public void Should_Successfuly_Construct_Product_Entity_With_All_Fields()
        {
            // Arrange
            const string name = "test product name";

            Random rnd = new Random();
            var productId = rnd.Next(1, 20);
            var kCal = rnd.Next(1, 200);
            var fat = rnd.Next(1, 200).ToString();
            var protein = rnd.Next(1, 200).ToString();
            var carbohydrate = rnd.Next(1, 200).ToString();

        // Act

        var product = new Product
            {
                Id = productId,
                Name = name,
                KCal = kCal,
                Fat = fat,
                Protein = protein,
                Carbohydrate = carbohydrate,
            };

            // Assert
            product.Id.Should().Be(productId);
            product.Name.Should().Be(name);
            product.KCal.Should().Be(kCal);
            product.Fat.Should().Be(fat);
            product.Protein.Should().Be(protein);
            product.Carbohydrate.Should().Be(carbohydrate);
        }

    }
}
