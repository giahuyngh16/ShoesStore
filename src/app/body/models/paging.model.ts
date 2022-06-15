export class PagingModel {
  itemsPerPage: number;
  currentPage: number;
  skip: number;
  totalItems: number;

  constructor(itemsPerPageParam = 10, currentPageParam = 1, skipParam = 0, totalItems = 0) {
    this.itemsPerPage = itemsPerPageParam;
    this.currentPage = currentPageParam;
    this.skip = skipParam;
    this.totalItems = totalItems;
  }
}

