using Microsoft.EntityFrameworkCore.Migrations;

namespace Croissant.Migrations
{
    public partial class UserPostRelation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "poster_id",
                table: "posts",
                type: "text",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "ix_posts_poster_id",
                table: "posts",
                column: "poster_id");

            migrationBuilder.AddForeignKey(
                name: "fk_posts_users_poster_id",
                table: "posts",
                column: "poster_id",
                principalTable: "AspNetUsers",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_posts_users_poster_id",
                table: "posts");

            migrationBuilder.DropIndex(
                name: "ix_posts_poster_id",
                table: "posts");

            migrationBuilder.DropColumn(
                name: "poster_id",
                table: "posts");
        }
    }
}
