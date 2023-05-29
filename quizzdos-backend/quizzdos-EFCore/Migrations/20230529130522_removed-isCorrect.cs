using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace quizzdos_EFCore.Migrations
{
    /// <inheritdoc />
    public partial class removedisCorrect : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsCorrect",
                table: "Options");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsCorrect",
                table: "Options",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
