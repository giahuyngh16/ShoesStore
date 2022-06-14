export class PaginationModel {
    id?: string;
    take: number;
    pageIndex: number;
    skip: number;
    total: number;

    constructor(total = 0, take = 10, skip = 0, pageIndex = 1) {
        this.id = createUUID();
        this.total = total;
        this.take = take;
        this.skip = skip;
        this.pageIndex = pageIndex;
    }
}

const createUUID = () => {
  let time = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (matchValue) => {
    // tslint:disable-next-line: no-bitwise
    const r = (time + Math.random() * 16) % 16 | 0;
    time = Math.floor(time / 16);
    // tslint:disable-next-line: no-bitwise
    return (matchValue === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
};

