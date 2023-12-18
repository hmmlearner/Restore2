using API.data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        public BasketController(StoreContext storeContext)
        {
            Context = storeContext;
        }

        public StoreContext Context { get; }

        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            Basket currentBasket = await RetrieveBasket();
            if (currentBasket == null) { return NotFound(); }

            return mapToBasketDto(currentBasket);
        }

        
        [HttpPost]
        public async Task<ActionResult<BasketDto>> AddItem(int productId, int quantity)
        {
            Basket currentBasket = await RetrieveBasket();
            if (currentBasket == null)
            {
                //create a basket
                currentBasket = CreateBasket();
            }
            //get product
            var product = await Context.Products.FindAsync(productId);
            //Add Item to basket
            currentBasket.AddItem(product, quantity);

            //save changes
            var result = await Context.SaveChangesAsync() > 0;
            // currentBasket.AddItem()
            if (result) return CreatedAtRoute("GetBasket", mapToBasketDto(currentBasket));
            else return BadRequest(new ProblemDetails { Title = "Error saving item to basket", Status = 500 });
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
        {
            //getbasket
            Basket basket = await RetrieveBasket();
            if (basket == null) {
                return NotFound(new ProblemDetails{ Title="Couldnt find basket to remove product from"});
            }
            //getProduct
            var prod = await Context.Products.FindAsync(productId);
            //RemoveItem from basket
            basket.RemoveItem(productId, quantity);
            //save changes
            var result = await Context.SaveChangesAsync() > 0;
            if (result) return Ok();
            else return BadRequest(new ProblemDetails { Title = "Couldn't delete item from basket" });

        }

        private BasketDto mapToBasketDto(Basket currentBasket)
        {
            return new BasketDto
            {
                Id = currentBasket.Id,
                BuyerId = currentBasket.BuyerId,
                Items = currentBasket.Items.Select(item => new BasketItemDto
                {
                    ProductId = item.ProductId,
                    PictureUrl = item.Product.PictureUrl,
                    Type = item.Product.Type,
                    Brand = item.Product.Brand,
                    Quantity = item.Quantity,
                    Price = item.Product.Price,
                    Name = item.Product.Name
                }
              ).ToList()
            };
        }


        private async Task<Basket> RetrieveBasket()
        {
            return await Context.Baskets
                            .Include(i => i.Items)
                            .ThenInclude(p => p.Product)
                            .FirstOrDefaultAsync(basket => basket.BuyerId == Request.Cookies["buyerId"]);
        }

        private Basket CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(10) };
            Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            var basket = new Basket { BuyerId = buyerId };
            Context.Baskets.Add(basket);
            return basket;
        }
    }
}