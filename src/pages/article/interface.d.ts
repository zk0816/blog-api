import { PageParams } from '@/common/common';

declare namespace Article {
  export interface ArticlePageParams extends PageParams {
    categoryId?: number;
    tagId?: number;
  }
}
