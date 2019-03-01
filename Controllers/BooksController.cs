using System;
using System.Net;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using BookStore.Models;

namespace BookStore.Controllers
{
    [Route("api/[controller]")]
    public class BooksController : Controller
    {
        private readonly BookStoreContext _context = new BookStoreContext();

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var books = _context.Books.ToList();
                if (books.Count > 0)
                    return Ok(books);
                else
                    return NotFound();

            }
            catch (Exception)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError);
            }
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                var book = _context.Books.FirstOrDefault(e => e.BookId == id);
                if (book != null)
                    return Ok(book);
                else
                    return NotFound();

            }
            catch (Exception)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError);
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody]Book book)
        {
            if (ModelState.IsValid == false) return BadRequest(ModelState);
            try
            {
                _context.Books.Add(book);
                _context.SaveChanges();
                return Created("created", book);
            }
            catch (Exception)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError);
            }
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]Book book)
        {
            if (id != book.BookId) return NotFound();
            if (ModelState.IsValid == false) return BadRequest(ModelState);
            try
            {
                _context.Update(book);
                _context.SaveChanges();
                return Ok(book);

            }
            catch (Exception)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var book = _context.Books.FirstOrDefault(e => e.BookId == id);
                if (book == null)
                    return NotFound();
                else
                {
                    _context.Books.Remove(book);
                    _context.SaveChanges();
                    return Ok();
                }

            }
            catch (Exception)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError);
            }
        }
    }
}
