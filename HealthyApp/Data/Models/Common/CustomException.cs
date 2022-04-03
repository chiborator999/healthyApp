using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace HealthyApp.Data.Models.Common
{
    public sealed class CustomException : Exception
    {
        private Guid _id;
        public CustomException() { }
        public CustomException(Exception ex)
        {
            _id = Guid.NewGuid();
            CustomMessage = ex?.Message;
            CustomStackTrace = PrettifyStackTrace(ex?.StackTrace ?? "");
            InnerMessage = ex?.InnerException?.Message ?? null;
            InnerStackTrace = ex?.InnerException?.StackTrace ?? null;
            InnerSource = ex?.InnerException?.Source ?? null;
            DateCreated = DateTime.Now;
        }

        [Key]
        public Guid Id
        {
            get { return _id; }
            private set { _id = value; }
        }

        public string CustomMessage { get; set; }

        public string CustomStackTrace { get; set; }

        public string InnerMessage { get; set; }

        public string InnerStackTrace { get; set; }

        public string InnerSource { get; set; }

        public DateTime DateCreated { get; set; }

        public string ClientErrorMessage { get { return CreateClientErrorMessage(); } set { CustomMessage = value; } }

        private string PrettifyStackTrace(string stackTrace)
        {
            return Regex.Replace(stackTrace, @"\r\n\t", Environment.NewLine);
        }

        private string CreateClientErrorMessage()
        {
            return
                $"Unexpected error with Id: ({Id}) has occured on the server. Message: ({InnerMessage ?? CustomMessage})";
        }
    }
}