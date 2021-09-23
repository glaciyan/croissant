using System;
using Microsoft.AspNetCore.Identity;

namespace Entities.Models
{
    public class User : IdentityUser
    {
        public User()
        {
            RefreshTokenVersion = Guid.NewGuid().ToString();
        }

        public string RefreshTokenVersion { get; set; }
    }
}