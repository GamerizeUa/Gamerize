namespace Gamerize.BLL.Models
{
	public class QuestionDTO
	{
		public int Id { get; set; }
		public string UserName { get; set; }
		public string Text { get; set; }
		public DateTime DateTime { get; set; }
		public int ProductId { get; set; }
		public AnswerDTO? Answer { get; set; }
	}
}
