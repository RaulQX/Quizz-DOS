using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace quizzdos_EFCore.Migrations
{
    /// <inheritdoc />
    public partial class updatesection : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Index",
                table: "Sections");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "Index",
                table: "Sections",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);
        }
    }
}
