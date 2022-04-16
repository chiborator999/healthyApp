namespace HealthyApp.Services
{
    using HealthyApp.Data;
    using HealthyApp.Data.Models;
    using HealthyApp.Interfaces;
    using HealthyApp.Models.BookModel;
    using Microsoft.EntityFrameworkCore;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public class BookService : IBookService
    {
        private readonly HealthAppDbContext _ctx;

        public BookService(HealthAppDbContext ctx)
        {
            _ctx = ctx;
        }

        public async Task CreateBookAsync(Book book)
        {
            await _ctx.AddAsync(book);
            await _ctx.SaveChangesAsync();
        }

        public async Task<IEnumerable<BookViewModel>> GetAllBooksAsync()
        {
            var bookList = await _ctx.Books.AsNoTracking().ToListAsync();

            var booksViewList = bookList.Select(b => new BookViewModel
            {
                                                        Id = b.Id,
                                                        Title = b.Title,
                                                        Author = b.Author,
                                                        Url = b.Url,
                                                        PerformerId = b.PerformerId,
            });

            return booksViewList;
        }

        public async Task<BookViewModel> GetBookByIdAsync(int bookId)
        {
            var book = await _ctx.Books.AsNoTracking().FirstOrDefaultAsync(book => book.Id == bookId);

            if (book is null)
            {
                throw new Exception($"Book with id: {bookId} does not exist!");
            }

            var bookViewById = new BookViewModel
            {
                Id = book.Id,
                Title = book.Title,
                Author = book.Author,
                Url = book.Url,
                PerformerId = book.PerformerId,
            };

            return bookViewById;
        }

        public async Task RemoveBookAsync(int bookId)
        {
            var book = _ctx.Books.FirstOrDefault(book => book.Id == bookId);

            if (book is null)
            {
                throw new Exception($"Book with id: {bookId} does not exist!");
            }

            _ctx.Books.Remove(book);
            await _ctx.SaveChangesAsync();
        }

        public async Task UpdateBookAsync(Book book)
        {
            _ctx.Entry(book).State = EntityState.Modified;
            await _ctx.SaveChangesAsync();
        }
    }
}
