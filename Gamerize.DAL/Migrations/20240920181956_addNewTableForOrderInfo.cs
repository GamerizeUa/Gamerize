using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Gamerize.DAL.Migrations
{
    /// <inheritdoc />
    public partial class addNewTableForOrderInfo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UnregisteredUserId",
                table: "Orders",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "UnregisteredUser",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DeliveryAddress = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UnregisteredUser", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Orders_UnregisteredUserId",
                table: "Orders",
                column: "UnregisteredUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_UnregisteredUser_UnregisteredUserId",
                table: "Orders",
                column: "UnregisteredUserId",
                principalTable: "UnregisteredUser",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_UnregisteredUser_UnregisteredUserId",
                table: "Orders");

            migrationBuilder.DropTable(
                name: "UnregisteredUser");

            migrationBuilder.DropIndex(
                name: "IX_Orders_UnregisteredUserId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "UnregisteredUserId",
                table: "Orders");
        }
    }
}
