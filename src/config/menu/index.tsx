import { IconName, MaybeElement } from "@blueprintjs/core";

export interface IMenu {
  path: string;
  element?: string; // 为了支持React.lazy, 此处的字符串必须带上后缀  .tsx
  meta: {
    name: string;
    title: string;
    icon: IconName | MaybeElement;
    target?: "_blank" | "_self" | "_parent";
    url?: string;
  };
  children?: IMenu[];
}

// 菜单说明：
// 1.有子菜单的菜单无element项
// 2.步骤：
// a)按IMenu在menus中添加或修改菜单；
// b)在~/views下添加路径（element）对应页面
// c)在项目~/public/locals中按meta.name添加或修改国际化配置
const menus: IMenu[] = [
  {
    path: "/",
    element: "../views/Common/Welcome.tsx",
    meta: {
      name: "home",
      title: "首页",
      icon: "home",
    },
  },
  {
    path: "/user",
    meta: {
      name: "user",
      title: "用户管理",
      icon: "user",
    },
    children: [
      {
        path: "/user/list",
        element: "../views/User/UserList.tsx",
        meta: {
          name: "userList",
          title: "用户列表",
          icon: "th",
        },
      },
      {
        path: "/user/manage",
        element: "../views/Common/Welcome.tsx",
        meta: {
          name: "userManage",
          title: "用户权限",
          icon: "edit",
        },
      },
    ],
  },
  {
    path: "/goods",
    meta: {
      name: "goods",
      title: "商品管理",
      icon: "user",
    },
    children: [
      {
        path: "/goods/list",
        element: "../views/Goods/GoodsList.tsx",
        meta: {
          name: "goodsList",
          title: "商品列表",
          icon: "th",
        },
      },
    ],
  },
  {
    path: "/permission",
    meta: {
      name: "permission",
      title: "权限管理",
      icon: "shop",
    },
    children: [
      {
        path: "/permission/menu",
        element: "../views/Permission/MenuPermission.tsx",
        meta: {
          name: "menuPermission",
          title: "菜单权限",
          icon: "th",
        },
      },
      {
        path: "/permission/button",
        element: "../views/Permission/ButtonPermission.tsx",
        meta: {
          name: "buttonPermission",
          title: "按钮权限",
          icon: "edit",
        },
      },
    ],
  },
  // {
  //   path: "/commonComponents",
  //   meta: {
  //     name: "commonComponents",
  //     title: "常用组件",
  //     icon: "shop",
  //   },
  //   children: [
  //     {
  //       path: "/commonComponents/guide",
  //       element: "../views/CommonComponents/GuideExample.tsx",
  //       meta: {
  //         name: "guide",
  //         title: "引导页",
  //         icon: "th",
  //       },
  //     },
  //     {
  //       path: "/commonComponents/editor",
  //       element: "../views/CommonComponents/MTEditorExample.tsx",
  //       meta: {
  //         name: "editor",
  //         title: "富文本编辑器",
  //         icon: "edit",
  //       },
  //     },
  //     {
  //       path: "/commonComponents/selectFilter",
  //       element: "../views/CommonComponents/SelectFilterExample.tsx",
  //       meta: {
  //         name: "selectFilter",
  //         title: "分类筛选",
  //         icon: "edit",
  //       },
  //     },
  //     {
  //       path: "/commonComponents/treeFilter",
  //       element: "../views/CommonComponents/TreeFilterExample.tsx",
  //       meta: {
  //         name: "treeFilter",
  //         title: "树形筛选",
  //         icon: "edit",
  //       },
  //     },
  //     {
  //       path: "/commonComponents/lazyLoad",
  //       element: "../views/CommonComponents/LazyLoadExample.tsx",
  //       meta: {
  //         name: "lazyLoad",
  //         title: "图片懒加载",
  //         icon: "edit",
  //       },
  //     },
  //     {
  //       path: "/commonComponents/uploadFile",
  //       element: "../views/CommonComponents/UploadFileExample.tsx",
  //       meta: {
  //         name: "uploadFile",
  //         title: "文件上传",
  //         icon: "edit",
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: "/form",
  //   meta: {
  //     name: "form",
  //     title: "常用表单",
  //     icon: "shop",
  //   },
  //   children: [
  //     {
  //       path: "/form/basic",
  //       element: "../views/Form/BasicForm.tsx",
  //       meta: {
  //         name: "basicForm",
  //         title: "基础表单",
  //         icon: "th",
  //       },
  //     },
  //     {
  //       path: "/form/configurable",
  //       element: "../views/Form/ConfigurableForm.tsx",
  //       meta: {
  //         name: "configurableForm",
  //         title: "表单验证",
  //         icon: "edit",
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: "/eCharts",
  //   meta: {
  //     name: "eCharts",
  //     title: "ECharts",
  //     icon: "shop",
  //   },
  //   children: [
  //     {
  //       path: "/eCharts/water",
  //       element: "../views/ECharts/EChartsWater.tsx",
  //       meta: {
  //         name: "eChartsWater",
  //         title: "水型图",
  //         icon: "th",
  //       },
  //     },
  //     {
  //       path: "/eCharts/column",
  //       element: "../views/ECharts/EChartsColumn.tsx",
  //       meta: {
  //         name: "eChartsColumn",
  //         title: "柱状图",
  //         icon: "edit",
  //       },
  //     },
  //     {
  //       path: "/eCharts/line",
  //       element: "../views/ECharts/EChartsLine.tsx",
  //       meta: {
  //         name: "eChartsLine",
  //         title: "折线图",
  //         icon: "edit",
  //       },
  //     },
  //     {
  //       path: "/eCharts/pie",
  //       element: "../views/ECharts/EChartsPie.tsx",
  //       meta: {
  //         name: "eChartsPie",
  //         title: "饼图",
  //         icon: "edit",
  //       },
  //     },
  //     {
  //       path: "/eCharts/radar",
  //       element: "../views/ECharts/EChartsRadar.tsx",
  //       meta: {
  //         name: "eChartsRadar",
  //         title: "雷达图",
  //         icon: "edit",
  //       },
  //     },
  //     {
  //       path: "/eCharts/nested",
  //       element: "../views/ECharts/EChartsNested.tsx",
  //       meta: {
  //         name: "eChartsNested",
  //         title: "环形图",
  //         icon: "edit",
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: "/menu",
  //   meta: {
  //     name: "menu",
  //     title: "菜单嵌套",
  //     icon: "shop",
  //   },
  //   children: [
  //     {
  //       path: "/menu/menu1",
  //       meta: {
  //         name: "menuMenu1",
  //         title: "菜单1",
  //         icon: "th",
  //       },
  //       children: [
  //         {
  //           path: "/menu/menu1/menu11",
  //           element: "../views/Common/NestedMenu.tsx",
  //           meta: {
  //             name: "menuMenu1Menu11",
  //             title: "菜单1-1",
  //             icon: "th",
  //           },
  //         },
  //         {
  //           path: "/menu/menu1/menu12",
  //           meta: {
  //             name: "menuMenu1Menu12",
  //             title: "菜单1-2",
  //             icon: "edit",
  //           },
  //           children: [
  //             {
  //               path: "/menu/menu1/menu12/menu121",
  //               element: "../views/Common/NestedMenu.tsx",
  //               meta: {
  //                 name: "menuMenu1Menu12Menu121",
  //                 title: "菜单1-2-1",
  //                 icon: "th",
  //               },
  //             },
  //             {
  //               path: "/menu/menu1/menu12/menu122",
  //               element: "../views/Common/NestedMenu.tsx",
  //               meta: {
  //                 name: "menuMenu1Menu12Menu122",
  //                 title: "菜单1-2-2",
  //                 icon: "edit",
  //               },
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //     {
  //       path: "/menu/menu2",
  //       element: "../views/Common/NestedMenu.tsx",
  //       meta: {
  //         name: "menuMenu2",
  //         title: "菜单2",
  //         icon: "edit",
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: "/system",
  //   meta: {
  //     name: "system",
  //     title: "系统管理",
  //     icon: "shop",
  //   },
  //   children: [
  //     {
  //       path: "/system/account",
  //       element: "../views/Common/Welcome.tsx",
  //       meta: {
  //         name: "systemAccount",
  //         title: "账号管理",
  //         icon: "th",
  //       },
  //     },
  //     {
  //       path: "/system/role",
  //       element: "../views/Common/Welcome.tsx",
  //       meta: {
  //         name: "systemRole",
  //         title: "角色管理",
  //         icon: "edit",
  //       },
  //     },
  //     {
  //       path: "/system/menu",
  //       element: "../views/Common/Welcome.tsx",
  //       meta: {
  //         name: "systemMenu",
  //         title: "菜单管理",
  //         icon: "edit",
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: "/link",
  //   meta: {
  //     name: "link",
  //     title: "外部链接",
  //     icon: "shop",
  //   },
  //   children: [
  //     {
  //       path: "/link/github",
  //       element: "../views/Common/OutsideLink.tsx",
  //       meta: {
  //         name: "linkGithub",
  //         title: "GitHub",
  //         icon: "th",
  //         target: "_self",
  //         url: "https://github.com",
  //       },
  //     },
  //   ],
  // },
];
export default menus;
