export declare interface IGoods {
  id?: string;
  brandId: string;
  categoryId: string;
  channel: 0;
  desc: string;
  name: string;
}
export declare interface IGoodsResponse extends IGoods {
  brand: string;
  category: string;
  channel: 0;
  updateTime?: string;
}
export declare interface ICategory {
  id?: string;
  name: string;
  logo: string;
  parentId: string;
}
export declare interface ICategoryResponse extends ICategory {
  id: string;
  children: ICategoryResponse[];
  createTime: string;
}
