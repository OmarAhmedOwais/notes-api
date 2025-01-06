import { SelectQueryBuilder } from 'typeorm';

interface PaginationOptions {
  pageSize?: number;
  pageNumber?: number;
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
  const { pageSize = 10, pageNumber = 1, order = 'DESC' } = options;
  const skip = (pageNumber - 1) * pageSize;
  const take = pageSize;

  query.orderBy('note.id', order).skip(skip).take(take);

  const [data, total] = await query.getManyAndCount();
  const totalPages = Math.ceil(total / pageSize);
  const hasNextPage = pageNumber < totalPages;
  const hasPreviousPage = pageNumber > 1;

  return {
    data,
    total,
    totalPages,
    pageSize,
    currentPage: pageNumber,
    nextPage: hasNextPage ? pageNumber + 1 : undefined,
    previousPage: hasPreviousPage ? pageNumber - 1 : undefined,
    hasNextPage,
    hasPreviousPage,
  };
}
