using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Croissant.Migrations
{
    public partial class FixDynamicValuesSeeding : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "id",
                keyValue: "899133c1-2cfd-4512-b834-8c6de3588b6f");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "id", "concurrency_stamp", "name", "normalized_name" },
                values: new object[] { "6874C1E4-9CB2-413C-AECE-0EF6220417AE", "664DF3CF-304D-4A9E-AE66-A3B4737A0060", "GeneralUser", "GENERAL_USER" });

            migrationBuilder.InsertData(
                table: "posts",
                columns: new[] { "id", "content", "created_at", "title", "updated_at" },
                values: new object[,]
                {
                    { new Guid("62eb1990-b49f-4c03-bcef-d0639c36810e"), "Content of the other testing Post", new DateTime(2021, 9, 11, 12, 12, 12, 100, DateTimeKind.Unspecified), "Another Testing Post", new DateTime(2021, 9, 11, 12, 12, 12, 100, DateTimeKind.Unspecified) },
                    { new Guid("267cec85-dcdb-4253-97fb-014563794ebb"), "Testing Post Content", new DateTime(2021, 9, 10, 12, 12, 12, 100, DateTimeKind.Unspecified), "Testing Post", new DateTime(2021, 9, 10, 12, 12, 12, 100, DateTimeKind.Unspecified) }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "id",
                keyValue: "6874C1E4-9CB2-413C-AECE-0EF6220417AE");

            migrationBuilder.DeleteData(
                table: "posts",
                keyColumn: "id",
                keyValue: new Guid("267cec85-dcdb-4253-97fb-014563794ebb"));

            migrationBuilder.DeleteData(
                table: "posts",
                keyColumn: "id",
                keyValue: new Guid("62eb1990-b49f-4c03-bcef-d0639c36810e"));

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "id", "concurrency_stamp", "name", "normalized_name" },
                values: new object[] { "899133c1-2cfd-4512-b834-8c6de3588b6f", "65a3a970-d815-44fa-9269-3dd040d14d6c", "GeneralUser", "GENERAL_USER" });
        }
    }
}
