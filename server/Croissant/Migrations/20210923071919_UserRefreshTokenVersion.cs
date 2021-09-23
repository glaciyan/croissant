using Microsoft.EntityFrameworkCore.Migrations;

namespace Croissant.Migrations
{
    public partial class UserRefreshTokenVersion : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "refresh_token_version",
                table: "AspNetUsers",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "refresh_token_version",
                table: "AspNetUsers");
        }
    }
}
