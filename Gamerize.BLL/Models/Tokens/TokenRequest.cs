using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gamerize.BLL.Models.Tokens
{
    public class TokenRequest
    {
        public string Email { get; set; } = default!;
        public string Password { get; set; } = default!;
    }

}
