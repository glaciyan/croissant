using System.ComponentModel.DataAnnotations;

namespace Entities.DataTransferObject
{
    public class UserForRegistrationDto
    {
        [Required]
        [MaxLength(24, ErrorMessage = "Username can't be over 24 characters long")]
        [MinLength(3, ErrorMessage = "Username has to be at least 3 characters long")]
        public string UserName { get; set; }

        [Required]
        [MaxLength(64, ErrorMessage = "Maximum allowed length for a password is 64 character")]
        public string Password { get; set; }

        [EmailAddress]
        [Required]
        [MaxLength(128, ErrorMessage = "Email can't be longer than 128 characters")]
        public string Email { get; set; }
    }
}