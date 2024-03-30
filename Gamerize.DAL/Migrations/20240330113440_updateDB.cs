using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Gamerize.DAL.Migrations
{
    /// <inheritdoc />
    public partial class updateDB : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Questions_Products_ProductId",
                table: "Questions");

            migrationBuilder.DropIndex(
                name: "IX_Questions_ProductId",
                table: "Questions");

            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "Questions");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Questions",
                type: "nvarchar(150)",
                maxLength: 150,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<byte>(
                name: "MindGameID",
                table: "Products",
                type: "tinyint",
                nullable: false,
                defaultValue: (byte)0);

            migrationBuilder.AddColumn<byte>(
                name: "MindGamesId",
                table: "Products",
                type: "tinyint",
                nullable: true);

            migrationBuilder.AddColumn<byte>(
                name: "PuzzleId",
                table: "Products",
                type: "tinyint",
                nullable: false,
                defaultValue: (byte)0);

            migrationBuilder.AddColumn<string>(
                name: "gameComponents",
                table: "Products",
                type: "text",
                maxLength: 200,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Genres",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "MindGames",
                columns: table => new
                {
                    Id = table.Column<byte>(type: "tinyint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MindGames", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Puzzles",
                columns: table => new
                {
                    Id = table.Column<byte>(type: "tinyint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Puzzles", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Products_MindGamesId",
                table: "Products",
                column: "MindGamesId");

            migrationBuilder.CreateIndex(
                name: "IX_Products_PuzzleId",
                table: "Products",
                column: "PuzzleId");

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
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_MindGames_MindGamesId",
                table: "Products");

            migrationBuilder.DropForeignKey(
                name: "FK_Products_Puzzles_PuzzleId",
                table: "Products");

            migrationBuilder.DropTable(
                name: "MindGames");

            migrationBuilder.DropTable(
                name: "Puzzles");

            migrationBuilder.DropIndex(
                name: "IX_Products_MindGamesId",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Products_PuzzleId",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "Questions");

            migrationBuilder.DropColumn(
                name: "MindGameID",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "MindGamesId",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "PuzzleId",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "gameComponents",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Genres");

            migrationBuilder.AddColumn<int>(
                name: "ProductId",
                table: "Questions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Questions_ProductId",
                table: "Questions",
                column: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_Questions_Products_ProductId",
                table: "Questions",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
