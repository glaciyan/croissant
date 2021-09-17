using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Croissant.Migrations
{
    public partial class PostSeeding : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "posts",
                columns: new[] { "id", "content", "created_at", "title", "updated_at" },
                values: new object[,]
                {
                    { new Guid("267cec85-dcdb-4253-97fb-014563794ebb"), "Testing Post Content", new DateTime(2021, 9, 17, 15, 13, 8, 315, DateTimeKind.Local).AddTicks(5432), "Testing Post", new DateTime(2021, 9, 17, 15, 13, 8, 318, DateTimeKind.Local).AddTicks(2779) },
                    { new Guid("62eb1990-b49f-4c03-bcef-d0639c36810e"), "Content of the other testing Post", new DateTime(2021, 9, 17, 15, 13, 8, 318, DateTimeKind.Local).AddTicks(3192), "Another Testing Post", new DateTime(2021, 9, 17, 15, 13, 8, 318, DateTimeKind.Local).AddTicks(3205) }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "posts",
                keyColumn: "id",
                keyValue: new Guid("267cec85-dcdb-4253-97fb-014563794ebb"));

            migrationBuilder.DeleteData(
                table: "posts",
                keyColumn: "id",
                keyValue: new Guid("62eb1990-b49f-4c03-bcef-d0639c36810e"));
        }
    }
}
