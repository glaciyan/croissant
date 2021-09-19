using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Croissant.Data.Configurations
{
    public class RoleConfiguration : IEntityTypeConfiguration<IdentityRole>
    {
        public void Configure(EntityTypeBuilder<IdentityRole> builder)
        {
            builder.HasData(new IdentityRole
            {
                Name = "GeneralUser",
                NormalizedName = "GENERALUSER",
                Id = "6874C1E4-9CB2-413C-AECE-0EF6220417AE",
                ConcurrencyStamp = "664DF3CF-304D-4A9E-AE66-A3B4737A0060"
            });
        }
    }
}