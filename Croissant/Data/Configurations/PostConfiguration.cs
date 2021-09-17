using System;
using Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Croissant.Data.Configurations
{
    public class PostConfiguration : IEntityTypeConfiguration<Post>
    {
        public void Configure(EntityTypeBuilder<Post> builder)
        {
            builder.HasData(new Post
                {
                    Id = new Guid("267CEC85-DCDB-4253-97FB-014563794EBB"),
                    Title = "Testing Post",
                    Content = "Testing Post Content"
                },
                new Post
                {
                    Id = new Guid("62EB1990-B49F-4C03-BCEF-D0639C36810E"),
                    Title = "Another Testing Post",
                    Content = "Content of the other testing Post"
                }
            );
        }
    }
}