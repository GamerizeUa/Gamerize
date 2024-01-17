namespace Gamerize.DAL.Entities.Shop
{
	public class Answer
	{
		public int Id { get; set; }
		public required string ManagerName { get; set; }
		public required string Text { get; set; }
		public required DateTime DateTime { get; set; }

		public required int QuestionId { get; set; }
		public virtual Question Question { get; set; }
	}
}
