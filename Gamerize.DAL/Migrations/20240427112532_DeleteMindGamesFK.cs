using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Gamerize.DAL.Migrations
{
    /// <inheritdoc />
    public partial class DeleteMindGamesFK : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_MindGames_MindGamesId",
                table: "Products");


            migrationBuilder.DropColumn(
                name: "MindGamesId",
                table: "Products");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte>(
                name: "MindGamesId",
                table: "Products",
                type: "tinyint",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Products_MindGames_MindGamesId",
                table: "Products",
                column: "MindGamesId",
                principalTable: "MindGames",
                principalColumn: "Id");
        }
    }
}
