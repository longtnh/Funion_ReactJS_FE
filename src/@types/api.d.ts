interface Res {
  data: any
  message: string
}

interface PaginatedResult<T> {
  pageIndex: number
  pageSize: number
  count: number
  data: T
}
