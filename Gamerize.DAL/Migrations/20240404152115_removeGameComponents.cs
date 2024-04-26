using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Gamerize.DAL.Migrations
{
    /// <inheritdoc />
    public partial class removeGameComponents : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "gameComponents",
                table: "Products");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "gameComponents",
                table: "Products",
                type: "text",
                maxLength: 200,
                nullable: false,
                defaultValue: "");
        }
    }
}
