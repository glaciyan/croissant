using System;

namespace Entities
{
    public interface ITimeStamped
    {
        DateTime CreatedAt { get; set; }
        DateTime UpdatedAt { get; set; }
    }
}