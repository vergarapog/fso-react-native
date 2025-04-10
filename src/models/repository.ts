export enum SortBy {
    CREATED_AT = 'CREATED_AT',
    RATING_AVERAGE = 'RATING_AVERAGE',
  }
  
export enum OrderBy {
    ASC = 'ASC',
    DESC = 'DESC',
  }
  
export const SORT_OPTIONS = {
    latest: { orderBy: SortBy.CREATED_AT, orderDirection: OrderBy.DESC },
    highest: { orderBy: SortBy.RATING_AVERAGE, orderDirection: OrderBy.DESC },
    lowest: { orderBy: SortBy.RATING_AVERAGE, orderDirection: OrderBy.ASC },
  };
  