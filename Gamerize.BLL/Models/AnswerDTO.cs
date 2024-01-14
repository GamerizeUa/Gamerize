namespace Gamerize.BLL.Models
{
	public class AnswerDTO
	{
		public int Id { get; set; }
		public string ManagerName { get; set; }
		public string Text { get; set; }
		public DateTime DateTime { get; set; }
		public int QuestionId { get; set; }
	}
}
