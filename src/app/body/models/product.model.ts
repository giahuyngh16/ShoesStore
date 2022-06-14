export class Product {
  id: string;
  name: string;
  price: number;
  imgPath: string;
  constructor(id: string, name: string, price: number, imgPath: string) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.imgPath = imgPath;
  }
}
