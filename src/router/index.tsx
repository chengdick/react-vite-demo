import { CrownOutlined, UserOutlined, SmileOutlined } from "@ant-design/icons";
const menus: any = [
  // 菜单相关路由
  {
    path: "/dashboard",
    //   key: '/dashboard',
    name: "首页",
    icon: <CrownOutlined />,
    component: "Dashboard",
  },
  {
    path: "/role",
    //   key: '/role',
    name: "角色",
    icon: <CrownOutlined />,
    routes: [
      {
        //   key: '1',
        path: "/role/list",
        name: "角色列表",
        component: "List",
        // hideInBreadcrumb: true,
      },
    ],
  },
  {
    path: "/drag",
    //   key: '/dashboard',
    name: "布局",
    icon: <CrownOutlined />,
    component: "Drag",
  },
];

export default menus;
