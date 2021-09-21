using Microsoft.EntityFrameworkCore.Migrations;

namespace Croissant.Migrations
{
    public partial class Roles : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "id", "concurrency_stamp", "name", "normalized_name" },
                values: new object[,]
                {
                    { "355D5374-C688-41D5-AB3F-EB0E03924D4F", "E00F3C16-0BAA-44FA-AC52-6432448F065B", "Moderator", "MODERATOR" },
                    { "77F3F9D1-F558-412E-882A-12FBAB8D1568", "2A3A7C48-6E1F-498A-9AB3-7CEA59A831D9", "Administrator", "ADMINISTRATOR" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "id",
                keyValue: "355D5374-C688-41D5-AB3F-EB0E03924D4F");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "id",
                keyValue: "77F3F9D1-F558-412E-882A-12FBAB8D1568");
        }
    }
}
