using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("BasketItems")]
    public class BasketItem
    {
        public int BasketItemId { get; set; }
        public int Quantity { get; set;}
        //navigation properties
        public Product Product { get; set; }
        public int ProductId { get; set; }
        public Basket Basket { get; set;}
        public int BasketId { get; set; }

    }
}
