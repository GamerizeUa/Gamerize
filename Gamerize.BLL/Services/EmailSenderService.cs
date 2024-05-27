using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using SendGrid.Helpers.Mail;
using SendGrid;
using Microsoft.AspNetCore.Identity.UI.Services;
using Gamerize.BLL.Models;

namespace Gamerize.BLL.Services
{
    public class EmailSenderService : IEmailSender
    {
        private readonly ILogger _logger;

        public EmailSenderService(IOptions<AuthMessageSenderOptions> optionsAccessor,
                           ILogger<EmailSenderService> logger)
        {
            Options = optionsAccessor.Value;
            _logger = logger;
        }

        public AuthMessageSenderOptions Options { get; }

        public async Task SendEmailAsync(string toEmail, string subject, string message)
        {
            if (string.IsNullOrEmpty(Options.SendGridKey))
            {
                _logger.LogError("Null SendGridKey");
                throw new Exception("Null SendGridKey");
            }
            _logger.LogInformation("Sending email to {ToEmail}", toEmail);
            await Execute(Options.SendGridKey, subject, message, toEmail);
        }

        public async Task Execute(string apiKey, string subject, string message, string toEmail)
        {
            var client = new SendGridClient(apiKey);
            var msg = new SendGridMessage()
            {
                From = new EmailAddress("sasha11hutsul@gmail.com", "Gamerize"),
                Subject = subject,
                PlainTextContent = message,
                HtmlContent = message
            };
            msg.AddTo(new EmailAddress(toEmail));
            msg.SetClickTracking(false, false);

            var response = await client.SendEmailAsync(msg);

            if (response.IsSuccessStatusCode)
            {
                _logger.LogInformation("Email sent successfully to {ToEmail}", toEmail);
            }
            else
            {
                _logger.LogError("Failed to send email to {ToEmail}. Status Code: {StatusCode}, Body: {Body}", toEmail, response.StatusCode, await response.Body.ReadAsStringAsync());
            }
        }

    }
}
