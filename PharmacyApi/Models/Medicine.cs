using System.ComponentModel.DataAnnotations;

namespace PharmacyApi.Models
{
    public class Medicine
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Medicine name is required.")]
        public string Name { get; set; } = string.Empty;

        public string Notes { get; set; } = string.Empty;

        public DateTime ExpiryDate { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Quantity cannot be negative.")]
        public int Quantity { get; set; }

        // decimal so the price keeps its 2 decimal places
        [Range(0, 1000000, ErrorMessage = "Price cannot be negative.")]
        public decimal Price { get; set; }

        [Required(ErrorMessage = "Brand is required.")]
        public string Brand { get; set; } = string.Empty;
    }
}
