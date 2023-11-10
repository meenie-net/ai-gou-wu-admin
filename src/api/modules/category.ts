import { ICategory } from "../../views/Goods/goods";
import { http } from "../http";

export const getAllCategory = () => http.get("/category");

export const addCategory = (category: ICategory) =>
  http.post("/category", category);

export const updateCategory = (id: string, category: Partial<ICategory>) =>
  http.patch("/category/" + id, category);

export const enableCategory = (id: string) =>
  http.patch("/category/" + id, { state: 1 });

export const disableCategory = (id: string) =>
  http.patch("/category/" + id, { state: 0 });

export const deleteCategory = (id: string) => http.delete("/category/" + id);
