import React, { useEffect, useMemo, useRef, useState } from "react";
import { Layout } from "antd";
import ProLayout, { PageContainer } from "@ant-design/pro-layout";
import menus from "@/router";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { AsyncComponent } from "../AsyncComponent";
import "./index.less";
import { useSiderDragWidth } from "@/hooks";
// 生成路由结构
const generateRoutes = (menu: any): any => {
  return menu.map((item: any) => {
    if (item.routes && item.routes?.length) {
      return generateRoutes(item.routes);
    }
    return (
      <Route
        key={item.path}
        path={item.path}
        element={<AsyncComponent componentName={item.component} />}
      ></Route>
    );
  });
};
const RoutesPage: React.FC = () => {
  return (
    <Routes>
      {generateRoutes(menus)}
      <Route path="/*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

const defaultProps = { routes: menus };

export default () => {
  const location = useLocation();
  const [pathname, setPathname] = useState<string>();
  const navigate = useNavigate();
  // const [width, setWidth] = useState(220);
  const { width } = useSiderDragWidth({});
  useEffect(() => {
    setPathname(location.pathname);
  }, [location.pathname]);

  const page = useMemo(() => {
    return (
      <PageContainer>
        <RoutesPage />
      </PageContainer>
    );
  }, []);

  // useEffect(() => {
  //   if (document.querySelector(".ant-layout-sider")) {
  //     let node = document.createElement("div");
  //     node.setAttribute("class", "react-resizable-handle-pro");
  //     node.onmousedown = function (e) {
  //       e.preventDefault();
  //       document.onmousemove = mouseMove;
  //       document.onmouseup = mouseUp;
  //     };
  //     document.querySelector(".ant-layout-sider")?.appendChild(node);
  //   }

  //   function mouseMove(e: any) {
  //     var e = e || window.event;

  //     setWidth(e.clientX);
  //   }
  //   //终止事件
  //   function mouseUp() {
  //     document.onmousemove = null;
  //     document.onmouseup = null;
  //   }
  // }, []);

  return (
    <>
      <ProLayout
        route={defaultProps}
        location={{
          pathname,
        }}
        navTheme="light"
        fixSiderbar
        siderWidth={width}
        headerRender={false}
        menuItemRender={(item: any, dom: any) => (
          <a
            onClick={() => {
              navigate(item.path || "/dashboard");
            }}
          >
            {dom}
          </a>
        )}
      >
        {page}
      </ProLayout>
    </>
  );
};
