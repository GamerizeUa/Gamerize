namespace Gamerize.DAL.Entities.Shop
{
	public class Answer
	{
		public int Id { get; set; }
		public string ManagerName { get; set; }
		public string Text { get; set; }
		public DateTime DateTime { get; set; }

		public int QuestionId { get; set; }
		public virtual Question Question { get; set; }
	}
}
