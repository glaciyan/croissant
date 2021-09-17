using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Croissant.Migrations
{
    public partial class InitialSeed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Posts",
                columns: new[] { "Id", "Content", "Title" },
                values: new object[,]
                {
                    { new Guid("267cec85-dcdb-4253-97fb-014563794ebb"), "Testing Post Content", "Testing Post" },
                    { new Guid("62eb1990-b49f-4c03-bcef-d0639c36810e"), "Content of the other testing Post", "Another Testing Post" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: new Guid("267cec85-dcdb-4253-97fb-014563794ebb"));

            migrationBuilder.DeleteData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: new Guid("62eb1990-b49f-4c03-bcef-d0639c36810e"));
        }
    }
}
