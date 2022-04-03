namespace HealthyApp.Services
{
    using HealthyApp.Data;
    using HealthyApp.Data.Models;
    using HealthyApp.Interfaces;
    using HealthyApp.Models.ProductModel;
    using Microsoft.EntityFrameworkCore;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public class ProductService : IProductService
    {
        private readonly HealthAppDbContext _ctx;

        public ProductService(HealthAppDbContext ctx)
        {
            _ctx = ctx;
        }

        public async Task CreateProductAsync(Product product)
        {
            await _ctx.AddAsync(product);
            await _ctx.SaveChangesAsync();
        }

        public async Task<IEnumerable<ProductViewModel>> GetAllProductsAsync()
        {
            var productList = await _ctx.Products.AsNoTracking().ToListAsync();

            var productViewList = productList.Select(p => new ProductViewModel
                                                    {
                                                        Id = p.Id,
                                                        Name = p.Name,
                                                        KCal = p.KCal,
                                                        Fat = p.Fat,
                                                        Protein = p.Protein,
                                                        Carbohydrate = p.Carbohydrate
                                                    });

            return productViewList;
        }

        public async Task<ProductViewModel> GetProductByIdAsync(int productId)
        {
            var product = await _ctx.Products.AsNoTracking().FirstOrDefaultAsync(product => product.Id == productId);

            if (product is null)
            {
                throw new Exception($"Product with id: {productId} does not exist!");
            }

            var productViewById = new ProductViewModel
            {
                Id = product.Id,
                Name = product.Name,
                KCal = product.KCal,
                Fat = product.Fat,
                Protein = product.Protein,
                Carbohydrate = product.Carbohydrate
            };

            return productViewById;
        }

        public async Task RemoveProductAsync(int productId)
        {
            var product = _ctx.Products.FirstOrDefault(product => product.Id == productId);

            if (product is null)
            {
                throw new Exception($"Product with id: {productId} does not exist!");
            }

            _ctx.Products.Remove(product);
            await _ctx.SaveChangesAsync();
        }

        public async Task UpdateProductAsync(Product product)
        {
            _ctx.Entry(product).State = EntityState.Modified;
            await _ctx.SaveChangesAsync();
        }
    }
}
