﻿namespace Gamerize.Common.Extensions.Exceptions
{
	public class ServerErrorException : CustomException
	{
		public ServerErrorException() { }
		public ServerErrorException(string message) : base(message) { }
		public ServerErrorException(string message, Exception innerException) : base(message, innerException) { }
	}
}
