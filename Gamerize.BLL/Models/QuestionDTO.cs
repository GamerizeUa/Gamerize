namespace Gamerize.BLL.Models
{
	public class QuestionDTO
	{
		public int Id { get; set; }
		public string UserName { get; set; }
		public string Text { get; set; }
		public string Email { get; set; }
		public DateTime DateTime { get; set; }
		public bool IsStarred { get; set; }
		public bool IsAnswered { get; set; }
		public AnswerDTO? Answer { get; set; }
	}
}
