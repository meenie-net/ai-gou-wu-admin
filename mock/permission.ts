/**
 * key: route.meta.name
 * value: string[]
 */
type IButtonPermission = "add" | "edit" | "delete" | "import" | "export";
type IPermission = {
  userList: IButtonPermission[];
};
export const permisson: {
  admin: IPermission;
  guest: IPermission;
} = {
  admin: { userList: ["add", "edit", "delete"] },
  guest: { userList: ["add"] },
};
