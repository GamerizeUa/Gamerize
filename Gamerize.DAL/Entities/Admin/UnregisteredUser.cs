namespace Gamerize.DAL.Entities.Admin
{
    public class UnregisteredUser
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public string City { get; set; }
        public string DeliveryAddress { get; set; }
        public string Email { get; set; }
    }
}