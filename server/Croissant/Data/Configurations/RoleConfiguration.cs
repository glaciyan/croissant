using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Croissant.Data.Configurations
{
    public class RoleConfiguration : IEntityTypeConfiguration<IdentityRole>
    {
        public void Configure(EntityTypeBuilder<IdentityRole> builder)
        {
            builder.HasData(
                new IdentityRole
                {
                    Name = "Moderator",
                    NormalizedName = "MODERATOR",
                    Id = "355D5374-C688-41D5-AB3F-EB0E03924D4F",
                    ConcurrencyStamp = "E00F3C16-0BAA-44FA-AC52-6432448F065B"
                }, new IdentityRole
                {
                    Name = "Administrator",
                    NormalizedName = "ADMINISTRATOR",
                    Id = "77F3F9D1-F558-412E-882A-12FBAB8D1568",
                    ConcurrencyStamp = "2A3A7C48-6E1F-498A-9AB3-7CEA59A831D9"
                });
        }
    }
}