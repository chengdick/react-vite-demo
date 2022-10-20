import React, { useEffect, useState } from "react";
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
const { Header } = Layout;
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
  useEffect(() => {
    setPathname(location.pathname);
  }, [location.pathname]);
  return (
    <>
      <ProLayout
        route={defaultProps}
        location={{
          pathname,
        }}
        navTheme="light"
        fixSiderbar
        // headerRender={<Header></Header>}
        onMenuHeaderClick={(e: any) => console.log(e)}
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
        <PageContainer>
          <RoutesPage />
        </PageContainer>
      </ProLayout>
    </>
  );
};
