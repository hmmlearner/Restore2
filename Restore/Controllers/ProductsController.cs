using API.data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        public ProductsController(StoreContext storeContext)
        {
            StoreContext = storeContext;
        }

        public StoreContext StoreContext { get; }


        [HttpGet(Name ="GetProducts")]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            var products = await StoreContext.Products.ToListAsync();
            return products;
        }

        [HttpGet("{id}", Name = "GetProduct")]
        public async Task<ActionResult<Product>> GetProduct(int id) 
        {
            var product = await StoreContext.Products.SingleOrDefaultAsync(x => x.Id == id);
            if (product == null) { return NotFound(); }
            return product;
        }


   
    }
}
