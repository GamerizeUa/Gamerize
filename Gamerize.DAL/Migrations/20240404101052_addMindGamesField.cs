using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Gamerize.DAL.Migrations
{
    /// <inheritdoc />
    public partial class addMindGamesField : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte>(
                name: "MindGamesId",
                table: "Products",
                type: "tinyint",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Products_MindGamesId",
                table: "Products",
                column: "MindGamesId");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_MindGames_MindGamesId",
                table: "Products",
                column: "MindGamesId",
                principalTable: "MindGames",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Products_MindGamesId",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "MindGamesId",
                table: "Products");
        }
    }
}
