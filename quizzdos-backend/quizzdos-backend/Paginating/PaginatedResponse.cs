namespace quizzdos_backend.Paging
{
    public class PaginatedResponse<T>
    {
        public int Page { get; set; }
        public int PageSize { get; set; }
        public int TotalCount { get; set; }
        public int TotalPages => (int)Math.Ceiling((double)TotalCount / PageSize);
        public IEnumerable<T> Data { get; set; }
        public PaginatedResponse(int page, int pageSize, int totalCount, IEnumerable<T> data)
        {
            Page = page;
            PageSize = pageSize;
            TotalCount = totalCount;
            Data = data;
        }
    }
}
