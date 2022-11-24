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
    path: "/code",
    //   key: '/dashboard',
    name: "编辑器",
    icon: <CrownOutlined />,
    component: "Code",
  },
  {
    path: "/style",
    //   key: '/dashboard',
    name: "样式组件",
    icon: <CrownOutlined />,
    component: "StyleSetter",
  },
  {
    path: "/gridlayout",
    //   key: '/dashboard',
    name: "样式组件",
    icon: <CrownOutlined />,
    component: "GridLayout",
  },
  {
    path: "/kitchen",
    //   key: '/dashboard',
    name: "编辑器组建",
    icon: <CrownOutlined />,
    component: "Kitchen",
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
];

export default menus;
