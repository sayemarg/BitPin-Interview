export interface IListResult<TData> {
  count: number;
  next: string | null;
  previous: string | null;
  results: TData[];
}
