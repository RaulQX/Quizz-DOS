using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace quizzdos_EFCore.Migrations
{
    /// <inheritdoc />
    public partial class updatequiz : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Index",
                table: "Quizzes");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "Index",
                table: "Quizzes",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);
        }
    }
}
