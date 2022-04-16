namespace HealthyApp.Tests.Entity
{
    using HealthyApp.Data.Models;
    using System;
    using Xunit;
    using FluentAssertions;

    public class BookTests
    {
        [Fact]
        public void Should_Successfuly_Construct_Book_Entity_With_All_Fields()
        {
            // Arrange
            const string title = "test title book";
            const string author = "test author";
            const string url = "test url";

            var performerId = new Guid().ToString();

            Random rnd = new Random();

            var bookId = rnd.Next(1, 10);

            // Act

            var book = new Book
            {
                Id = bookId,
                Title = title,
                Author = author,
                Url = url,
                PerformerId = performerId
            };

            // Assert
            book.Id.Should().Be(bookId);
            book.Title.Should().Be(title);
            book.Author.Should().Be(author);
            book.PerformerId.Should().Be(performerId);
        }

    }
}
