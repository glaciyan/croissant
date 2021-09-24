using System;
using System.Collections.Generic;

namespace Entities.DataTransferObject
{
    public class UserDto
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public IEnumerable<PostDto> Posts { get; set; }
    }
}