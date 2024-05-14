namespace Gamerize.BLL.Models
{
    public class ProfileDTO
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string Email { get; set; }
        public string? Phone {  get; set; }
        public string? City { get; set; }
        public string? DeliveryAddress { get; set; }
        public string? ProfilePicture { get; set; }
    }
}