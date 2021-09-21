using System;

namespace Entities.DataTransferObject
{
    public class PostDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
    }
}