namespace Gamerize.DAL.Entities.Admin;

public class RefreshToken : BaseEntity<Guid>
{
    public string UserId { get; set; }
    public string Token { get; set; }
    public DateTimeOffset Expires { get; set; }
}