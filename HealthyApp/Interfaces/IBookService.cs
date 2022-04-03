namespace HealthyApp.Interfaces
{
    using HealthyApp.Data.Models;
    using HealthyApp.Models.BookModel;

    public interface IBookService
    {
        Task<IEnumerable<BookViewModel>> GetAllBooksAsync();
        Task<BookViewModel> GetBookByIdAsync(int bookId);
        Task CreateBookAsync(Book book);
        Task UpdateBookAsync(Book book);
        Task RemoveBookAsync(int bookId);
    }
}
