using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Gamerize.DAL.Migrations
{
    /// <inheritdoc />
    public partial class nullableFieldinProduct : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_Categories_CategoryId",
                table: "Products");

            migrationBuilder.DropForeignKey(
                name: "FK_Products_Genres_GenreId",
                table: "Products");

            migrationBuilder.DropForeignKey(
                name: "FK_Products_MindGames_MindGamesId",
                table: "Products");

            migrationBuilder.DropForeignKey(
                name: "FK_Products_Puzzles_PuzzleId",
                table: "Products");

            migrationBuilder.DropForeignKey(
                name: "FK_Products_Themes_ThemeId",
                table: "Products");

            migrationBuilder.AlterColumn<byte>(
                name: "ThemeId",
                table: "Products",
                type: "tinyint",
                nullable: true,
                oldClrType: typeof(byte),
                oldType: "tinyint");

            migrationBuilder.AlterColumn<byte>(
                name: "PuzzleId",
                table: "Products",
                type: "tinyint",
                nullable: true,
                oldClrType: typeof(byte),
                oldType: "tinyint");

            migrationBuilder.AlterColumn<byte>(
                name: "MindGamesId",
                table: "Products",
                type: "tinyint",
                nullable: false,
                defaultValue: (byte)0,
                oldClrType: typeof(byte),
                oldType: "tinyint",
                oldNullable: true);

            migrationBuilder.AlterColumn<byte>(
                name: "MindGameID",
                table: "Products",
                type: "tinyint",
                nullable: true,
                oldClrType: typeof(byte),
                oldType: "tinyint");

            migrationBuilder.AlterColumn<byte>(
                name: "GenreId",
                table: "Products",
                type: "tinyint",
                nullable: true,
                oldClrType: typeof(byte),
                oldType: "tinyint");

            migrationBuilder.AlterColumn<byte>(
                name: "CategoryId",
                table: "Products",
                type: "tinyint",
                nullable: true,
                oldClrType: typeof(byte),
                oldType: "tinyint");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Categories_CategoryId",
                table: "Products",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Genres_GenreId",
                table: "Products",
                column: "GenreId",
                principalTable: "Genres",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_MindGames_MindGamesId",
                table: "Products",
                column: "MindGamesId",
                principalTable: "MindGames",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Puzzles_PuzzleId",
                table: "Products",
                column: "PuzzleId",
                principalTable: "Puzzles",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Themes_ThemeId",
                table: "Products",
                column: "ThemeId",
                principalTable: "Themes",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_Categories_CategoryId",
                table: "Products");

            migrationBuilder.DropForeignKey(
                name: "FK_Products_Genres_GenreId",
                table: "Products");

            migrationBuilder.DropForeignKey(
                name: "FK_Products_MindGames_MindGamesId",
                table: "Products");

            migrationBuilder.DropForeignKey(
                name: "FK_Products_Puzzles_PuzzleId",
                table: "Products");

            migrationBuilder.DropForeignKey(
                name: "FK_Products_Themes_ThemeId",
                table: "Products");

            migrationBuilder.AlterColumn<byte>(
                name: "ThemeId",
                table: "Products",
                type: "tinyint",
                nullable: false,
                defaultValue: (byte)0,
                oldClrType: typeof(byte),
                oldType: "tinyint",
                oldNullable: true);

            migrationBuilder.AlterColumn<byte>(
                name: "PuzzleId",
                table: "Products",
                type: "tinyint",
                nullable: false,
                defaultValue: (byte)0,
                oldClrType: typeof(byte),
                oldType: "tinyint",
                oldNullable: true);

            migrationBuilder.AlterColumn<byte>(
                name: "MindGamesId",
                table: "Products",
                type: "tinyint",
                nullable: true,
                oldClrType: typeof(byte),
                oldType: "tinyint");

            migrationBuilder.AlterColumn<byte>(
                name: "MindGameID",
                table: "Products",
                type: "tinyint",
                nullable: false,
                defaultValue: (byte)0,
                oldClrType: typeof(byte),
                oldType: "tinyint",
                oldNullable: true);

            migrationBuilder.AlterColumn<byte>(
                name: "GenreId",
                table: "Products",
                type: "tinyint",
                nullable: false,
                defaultValue: (byte)0,
                oldClrType: typeof(byte),
                oldType: "tinyint",
                oldNullable: true);

            migrationBuilder.AlterColumn<byte>(
                name: "CategoryId",
                table: "Products",
                type: "tinyint",
                nullable: false,
                defaultValue: (byte)0,
                oldClrType: typeof(byte),
                oldType: "tinyint",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Categories_CategoryId",
                table: "Products",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Genres_GenreId",
                table: "Products",
                column: "GenreId",
                principalTable: "Genres",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Products_MindGames_MindGamesId",
                table: "Products",
                column: "MindGamesId",
                principalTable: "MindGames",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Puzzles_PuzzleId",
                table: "Products",
                column: "PuzzleId",
                principalTable: "Puzzles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Themes_ThemeId",
                table: "Products",
                column: "ThemeId",
                principalTable: "Themes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
