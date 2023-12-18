namespace API.Entities
{
    public class Basket
    {
        public int Id { get; set; }
        public List<BasketItem> Items { get; set; } = new List<BasketItem>();
        public string BuyerId { get; set; }

        public void AddItem(Product product, int quantity) 
        {
            if(Items.All(item => item.ProductId != product.Id))
            {
                Items.Add(new BasketItem { Product = product, Quantity = quantity, ProductId=product.Id });
            }
            else
            {
                var itemToAdd = Items.FirstOrDefault(item => item.ProductId == product.Id);
                if(itemToAdd != null) 
                    itemToAdd.Quantity += quantity;
            }
        }

        public void RemoveItem(int productId, int quantity) 
        {
            var prod = Items.FirstOrDefault(item => item.ProductId == productId);
            if(prod.Quantity > quantity)
                prod.Quantity -= quantity; 
            else
                Items.Remove(prod);
        }
    }
}
