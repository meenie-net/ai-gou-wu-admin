import { IBrand } from "../../views/Goods/goods";
import { http } from "../http";

export const getAllBrand = () => http.get("/brand");

export const addBrand = (brand: IBrand) => http.post("/brand", brand);

export const updateBrand = (id: string, brand: Partial<IBrand>) =>
  http.patch("/brand/" + id, brand);

export const enableBrand = (id: string) =>
  http.patch("/brand/" + id, { state: 1 });

export const disableBrand = (id: string) =>
  http.patch("/brand/" + id, { state: 0 });

export const deleteBrand = (id: string) => http.delete("/brand/" + id);
