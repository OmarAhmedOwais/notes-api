import { SelectQueryBuilder } from 'typeorm';
import { PaginationOptionsDto } from '../dtos/pagination-options.dto';
import { PaginationResponseDto } from '../dtos/pagination-response.dto';
import { PaginationMetaDto } from '../dtos/pagination-meta.dto';

interface PaginateOptions extends PaginationOptionsDto {
  alias?: string;
  orderByField?: string;
}

export async function paginate<T>(
  query: SelectQueryBuilder<T>,
  options: PaginateOptions,
): Promise<PaginationResponseDto<T>> {
  const {
    take = 10,
    page = 1,
    order = 'DESC',
    alias,
    orderByField = 'id',
  } = options;
  const skip = (page - 1) * take;

  if (alias) {
    query.orderBy(`${alias}.${orderByField}`, order);
  }

  query.skip(skip).take(take);

  const [data, total] = await query.getManyAndCount();

  const meta = new PaginationMetaDto({
    pageOptionsDto: options,
    itemCount: total,
  });

  return new PaginationResponseDto(data, meta);
}
