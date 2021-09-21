using System;
using System.ComponentModel.DataAnnotations;
using Entities.ObjectBases;

namespace Entities.Models
{
    public class Post : PostBase, ITimeStamped
    {
        [Key] public Guid Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}