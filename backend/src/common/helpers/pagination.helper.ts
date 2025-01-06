import { SelectQueryBuilder } from 'typeorm';
import { PaginationOptionsDto } from '../dtos/pagination-options.dto';
import { PaginationResponseDto } from '../dtos/pagination-response.dto';
import { PaginationMetaDto } from '../dtos/pagination-meta.dto';

export async function paginate<T>(
  query: SelectQueryBuilder<T>,
  options: PaginationOptionsDto,
): Promise<PaginationResponseDto<T>> {
  const { take = 10, page = 1, order = 'DESC' } = options;
  const skip = (page - 1) * take;

  query.orderBy('note.id', order).skip(skip).take(take);

  const [data, total] = await query.getManyAndCount();

  const meta = new PaginationMetaDto({
    pageOptionsDto: options,
    itemCount: total,
  });

  return new PaginationResponseDto(data, meta);
}
