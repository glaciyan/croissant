using System.ComponentModel.DataAnnotations;

namespace Entities.ObjectBases
{
    public class PostBase
    {
        [Required(ErrorMessage = "A title is required")]
        [MaxLength(70, ErrorMessage = "Title can't be over 70 characters")]
        public string Title { get; set; }

        [MaxLength(200, ErrorMessage = "Post can't be over 200 characters")]
        public string Content { get; set; }
    }
}