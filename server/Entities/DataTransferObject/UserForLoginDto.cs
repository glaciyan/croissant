using System.ComponentModel.DataAnnotations;

namespace Entities.DataTransferObject
{
    public class UserForLoginDto
    {
        [Required] public string Email { get; set; }
        [Required] public string Password { get; set; }
    }
}