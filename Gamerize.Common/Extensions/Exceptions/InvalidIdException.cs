namespace Gamerize.Common.Extensions.Exceptions
{
	public class InvalidIdException : CustomException
	{
		public InvalidIdException() { }
		public InvalidIdException(string message) : base(message) { }
		public InvalidIdException(string message, Exception innerException) : base(message, innerException) { }
	}
}
