using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Croissant.Migrations
{
    public partial class RoleSeed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "id", "concurrency_stamp", "name", "normalized_name" },
                values: new object[] { "899133c1-2cfd-4512-b834-8c6de3588b6f", "65a3a970-d815-44fa-9269-3dd040d14d6c", "GeneralUser", "GENERALUSER" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "id",
                keyValue: "899133c1-2cfd-4512-b834-8c6de3588b6f");
        }
    }
}
