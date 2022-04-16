using HealthyApp.Data.Models;
using HealthyApp.Interfaces;
using HealthyApp.Models.BookModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HealthyApp.Controllers
{
    [Authorize]
    public class BookController : ApiController
    {
        private readonly IBookService _bookService;
        private readonly ILogService _logService;

        public BookController(IBookService bookService, ILogService logService)
        {
            _bookService = bookService;
            _logService = logService;
        }

        [HttpPost]
        [Route(nameof(Create))]
        public async Task<IActionResult> Create([FromBody] BookRequestModel bookModel)
        {
            try
            {
                var book = new Book
                {
                    Title = bookModel.Title,
                    Author = bookModel.Author,
                    Url = bookModel.Url,
                    PerformerId = bookModel.PerformerId,
                };

                await _bookService.CreateBookAsync(book);

                return Ok($"Successfuly created Book with id: {book.Id}");
            }
            catch (Exception ex)
            {
                return BadRequest(await _logService.LogExceptionAsync(ex));
            };
        }

        [HttpPut]
        [Route(nameof(Update))]
        public async Task<IActionResult> Update([FromBody] BookRequestModel bookModel)
        {
            try
            {
                var book = await _bookService.GetBookByIdAsync(bookModel.Id);

                if(book == null)
                {
                    return BadRequest($"Book with id: {bookModel.Id} can not be found!");
                }

                var updatedBook = new Book
                {
                    Id = book.Id,
                    Title = bookModel.Title,
                    Author = bookModel.Author,
                    Url = bookModel.Url,
                    PerformerId = book.PerformerId,
                };

                await _bookService.UpdateBookAsync(updatedBook);

                return Ok($"Successfuly updated Book with id: {book.Id}");
            }
            catch (Exception ex)
            {
                return BadRequest(await _logService.LogExceptionAsync(ex));
            };
        }

        [HttpDelete]
        [Route(nameof(Remove))]
        public async Task<IActionResult> Remove(int bookId)
        {
            try
            {
                await _bookService.RemoveBookAsync(bookId);
                return Ok($"Successfuly remove Book with id: {bookId}");
            }
            catch (Exception ex)
            {
                return BadRequest(await _logService.LogExceptionAsync(ex));
            }
        }

        [HttpGet]
        [Route(nameof(GetById))]
        public async Task<IActionResult> GetById(int bookId)
        {
            try
            {
                return Ok(await _bookService.GetBookByIdAsync(bookId));
            }
            catch (Exception ex)
            {
                return BadRequest(await _logService.LogExceptionAsync(ex));
            }
        }

        [HttpGet]
        [Route(nameof(GetAll))]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                return Ok(await _bookService.GetAllBooksAsync());
            }
            catch (Exception ex)
            {
                return BadRequest(await _logService.LogExceptionAsync(ex));
            }
        }
    }
}
