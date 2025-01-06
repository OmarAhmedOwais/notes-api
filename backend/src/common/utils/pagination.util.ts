export interface PaginationOptions {
  skip: number;
  take: number;
  order: 'ASC' | 'DESC';
}

export function parsePagination(query: any): PaginationOptions {
  const skip = query.skip ? parseInt(query.skip, 10) : 0;
  const take = query.take ? parseInt(query.take, 10) : 10;
  const order = query.order === 'ASC' ? 'ASC' : 'DESC';

  return { skip, take, order };
}
