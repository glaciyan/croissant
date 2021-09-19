using System;
using Entities.Models;
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
                    Content = "Testing Post Content",
                    CreatedAt = new DateTime(2021, 9, 10, 12, 12, 12, 100),
                    UpdatedAt = new DateTime(2021, 9, 10, 12, 12, 12, 100)
                },
                new Post
                {
                    Id = new Guid("62EB1990-B49F-4C03-BCEF-D0639C36810E"),
                    Title = "Another Testing Post",
                    Content = "Content of the other testing Post",
                    CreatedAt = new DateTime(2021, 9, 11, 12, 12, 12, 100),
                    UpdatedAt = new DateTime(2021, 9, 11, 12, 12, 12, 100)
                }
            );
        }
    }
}