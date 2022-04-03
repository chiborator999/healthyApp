using HealthyApp.Data.Models;
using HealthyApp.Interfaces;
using HealthyApp.Models.ProductModel;
using Microsoft.AspNetCore.Mvc;

namespace HealthyApp.Controllers
{
    public class ProductController : ApiController
    {
        private readonly IProductService _productService;
        private readonly ILogService _logService;

        public ProductController(IProductService productService, ILogService logService)
        {
            _productService = productService;
            _logService = logService;
        }

        [HttpPost]
        [Route(nameof(Create))]
        public async Task<IActionResult> Create([FromBody] ProductRequestModel productModel)
        {
            try
            {
                var product = new Product
                {
                    Name = productModel.Name,
                    KCal = productModel.KCal,
                    Fat = productModel.Fat,
                    Protein = productModel.Protein,
                    Carbohydrate = productModel.Carbohydrate,
                };

                await _productService.CreateProductAsync(product);

                return Ok($"Successfuly created Product with id: {product.Id}");
            }
            catch (Exception ex)
            {
                return BadRequest(await _logService.LogExceptionAsync(ex));
            };
        }

        [HttpPut]
        [Route(nameof(Update))]
        public async Task<IActionResult> Update([FromBody] ProductRequestModel productModel)
        {
            try
            {
                var product = await _productService.GetProductByIdAsync(productModel.Id);

                if(product == null)
                {
                    return BadRequest($"Product with id: {productModel.Id} can not be found!");
                }

                var updatedProduct = new Product
                {
                    Name = productModel.Name,
                    KCal = productModel.KCal,
                    Fat = productModel.Fat,
                    Protein = productModel.Protein,
                    Carbohydrate = productModel.Carbohydrate,
                    Id = product.Id
                };

                await _productService.UpdateProductAsync(updatedProduct);

                return Ok($"Successfuly updated Product with id: {product.Id}");
            }
            catch (Exception ex)
            {
                return BadRequest(await _logService.LogExceptionAsync(ex));
            };
        }

        [HttpDelete]
        [Route(nameof(Remove))]
        public async Task<IActionResult> Remove(int productId)
        {
            try
            {
                await _productService.RemoveProductAsync(productId);
                return Ok($"Successfuly remove Product with id: {productId}");
            }
            catch (Exception ex)
            {
                return BadRequest(await _logService.LogExceptionAsync(ex));
            }
        }

        [HttpGet]
        [Route(nameof(GetById))]
        public async Task<IActionResult> GetById(int productId)
        {
            try
            {
                return Ok(await _productService.GetProductByIdAsync(productId));
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
                return Ok(await _productService.GetAllProductsAsync());
            }
            catch (Exception ex)
            {
                return BadRequest(await _logService.LogExceptionAsync(ex));
            }
        }
    }
}
