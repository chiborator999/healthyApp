using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthyApp.Migrations
{
    public partial class UpdateUserCollections : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropTable(
            //    name: "MealUser");

            migrationBuilder.AddColumn<int>(
                name: "MealId",
                table: "AspNetUsers",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_MealId",
                table: "AspNetUsers",
                column: "MealId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Meals_MealId",
                table: "AspNetUsers",
                column: "MealId",
                principalTable: "Meals",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Meals_MealId",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_MealId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "MealId",
                table: "AspNetUsers");

            //migrationBuilder.CreateTable(
            //    name: "MealUser",
            //    columns: table => new
            //    {
            //        MealsId = table.Column<int>(type: "int", nullable: false),
            //        UsersId = table.Column<string>(type: "nvarchar(450)", nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_MealUser", x => new { x.MealsId, x.UsersId });
            //        table.ForeignKey(
            //            name: "FK_MealUser_AspNetUsers_UsersId",
            //            column: x => x.UsersId,
            //            principalTable: "AspNetUsers",
            //            principalColumn: "Id",
            //            onDelete: ReferentialAction.Cascade);
            //        table.ForeignKey(
            //            name: "FK_MealUser_Meals_MealsId",
            //            column: x => x.MealsId,
            //            principalTable: "Meals",
            //            principalColumn: "Id",
            //            onDelete: ReferentialAction.Cascade);
            //    });

            //migrationBuilder.CreateIndex(
            //    name: "IX_MealUser_UsersId",
            //    table: "MealUser",
            //    column: "UsersId");
        }
    }
}
