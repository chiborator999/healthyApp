namespace HealthyApp.Tests.Entity
{
    using HealthyApp.Data.Models;
    using System;
    using Xunit;
    using FluentAssertions;

    public class ExerciseTests
    {
        [Fact]
        public void Should_Successfuly_Construct_Exercise_Entity_With_All_Fields()
        {
            // Arrange
            const string name = "test exercise name";

            Random rnd = new Random();
            var kCalSpent = rnd.Next(1, 200).ToString();
            var exerciseId = rnd.Next(1, 20);

            // Act

            var exercise = new Exercise
            {
                Id = exerciseId,
                Name = name,
                KCalSpent = kCalSpent,
            };

            // Assert
            exercise.Id.Should().Be(exerciseId);
            exercise.Name.Should().Be(name);
            exercise.KCalSpent.Should().Be(kCalSpent);
        }

    }
}
