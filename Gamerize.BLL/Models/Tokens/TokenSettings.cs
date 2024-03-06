using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gamerize.BLL.Models.Tokens
{
    public class TokenSettings
    {
        public string ValidAudience { get; set; } = default!;
        public string ValidIssuer { get; set; } = default!;
        public string Secret { get; set; } = default!;
        public int TokenValidityInMinutes { get; set; }
        public int RefreshTokenValidityInDays { get; set; }
    }
}
