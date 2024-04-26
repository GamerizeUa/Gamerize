using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Gamerize.DAL.Migrations
{
    /// <inheritdoc />
    public partial class Questions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_MindGames_MindGamesId",
                table: "Products");

            migrationBuilder.AlterColumn<byte>(
                name: "MindGamesId",
                table: "Products",
                type: "tinyint",
                nullable: false,
                defaultValue: (byte)0,
                oldClrType: typeof(byte),
                oldType: "tinyint",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Products_MindGames_MindGamesId",
                table: "Products",
                column: "MindGamesId",
                principalTable: "MindGames",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_MindGames_MindGamesId",
                table: "Products");

            migrationBuilder.AlterColumn<byte>(
                name: "MindGamesId",
                table: "Products",
                type: "tinyint",
                nullable: true,
                oldClrType: typeof(byte),
                oldType: "tinyint");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_MindGames_MindGamesId",
                table: "Products",
                column: "MindGamesId",
                principalTable: "MindGames",
                principalColumn: "Id");
        }
    }
}
