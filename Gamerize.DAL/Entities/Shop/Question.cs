namespace Gamerize.DAL.Entities.Shop
{
	public class Question
	{
		public int Id { get; set; }
		public string UserName { get; set; }
		public string Text { get; set; }
		public DateTime DateTime { get; set; }
		public bool IsAnswered { get; set; }

		public int ProductId { get; set; }
		public virtual Product Product { get; set; }

		public virtual Answer Answer { get; set; }
	}
}
