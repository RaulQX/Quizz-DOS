using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace quizzdos_EFCore.Migrations
{
    /// <inheritdoc />
    public partial class removedindex : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Index",
                table: "Questions");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "Index",
                table: "Questions",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);
        }
    }
}
