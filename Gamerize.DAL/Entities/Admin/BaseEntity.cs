namespace Gamerize.DAL.Entities.Admin;

public abstract class BaseEntity<T>
{
    public T Id { get; set; }
}