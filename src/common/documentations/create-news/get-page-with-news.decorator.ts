import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PageResult } from '../../shared/results/page.result';
import { NewsView } from '../../../modules/news/views/news.view';

export function ApiGetPageWithNews() {
  return applyDecorators(
    ApiTags('News'),
    ApiOperation({
      summary: 'Вернет страницу с новостями',
    }),
    ApiOkResponse({ type: PageResult<NewsView> }),
  );
}
