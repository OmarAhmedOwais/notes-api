import { SelectQueryBuilder } from 'typeorm';

interface PaginationOptions {
  skip?: number;
  take?: number;
  order?: 'ASC' | 'DESC';
}

interface PaginatedResult<T> {
  data: T[];
  total: number;
  totalPages: number;
  pageSize: number;
  currentPage: number;
  nextPage?: number;
  previousPage?: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export async function paginate<T>(
  query: SelectQueryBuilder<T>,
  options: PaginationOptions,
): Promise<PaginatedResult<T>> {
  const { skip = 0, take = 10, order = 'DESC' } = options;

  query.orderBy('note.id', order).skip(skip).take(take);

  const [data, total] = await query.getManyAndCount();
  const currentPage = Math.floor(skip / take) + 1;
  const totalPages = Math.ceil(total / take);
  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;

  return {
    data,
    total,
    totalPages,
    pageSize: take,
    currentPage,
    nextPage: hasNextPage ? currentPage + 1 : undefined,
    previousPage: hasPreviousPage ? currentPage - 1 : undefined,
    hasNextPage,
    hasPreviousPage,
  };
}
