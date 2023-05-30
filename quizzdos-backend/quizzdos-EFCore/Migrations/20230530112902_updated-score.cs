using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace quizzdos_EFCore.Migrations
{
    /// <inheritdoc />
    public partial class updatedscore : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OptionScore",
                table: "Options");

            migrationBuilder.AlterColumn<double>(
                name: "QuestionScore",
                table: "Questions",
                type: "float",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<double>(
                name: "ScorePercentage",
                table: "Options",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ScorePercentage",
                table: "Options");

            migrationBuilder.AlterColumn<int>(
                name: "QuestionScore",
                table: "Questions",
                type: "int",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "float");

            migrationBuilder.AddColumn<int>(
                name: "OptionScore",
                table: "Options",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
