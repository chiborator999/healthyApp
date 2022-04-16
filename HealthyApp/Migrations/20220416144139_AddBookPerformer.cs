using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthyApp.Migrations
{
    public partial class AddBookPerformer : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "performerId",
                table: "Books",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "performerId",
                table: "Books");
        }
    }
}
