import React, { useEffect, useMemo, useRef, useState } from "react";
import { Layout } from "antd";
import ProLayout, { PageContainer } from "@ant-design/pro-layout";
import canUseDom from "rc-util/lib/Dom/canUseDom";
import menus from "@/router";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { AsyncComponent } from "../AsyncComponent";
import ReactDOM from "react-dom";
import "./index.less";
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
  const [width, setWidth] = useState(200);
  const mousemoveRef = useRef<any>();
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

  const searchModalContainer = React.useMemo(() => {
    console.log("searchModalContainer");
    if (!canUseDom()) {
      return;
    }
    const searchModalContainer$ = document.querySelector(".ant-layout-sider");
    return searchModalContainer$ || document.body;
  }, [document.querySelector(".ant-layout-sider")]);

  useEffect(() => {
    //记录鼠标相对left盒子x轴位置
    var mouse_x = 0;
    //设置最大/最小宽度
    var max_width = 400,
      min_width = 200;
    if (document.querySelector(".ant-layout-sider")) {
      let node = document.createElement("div");
      node.setAttribute("class", "react-resizable-handle-pro");
      node.onmousedown = function (e) {
        var e = e || window.event;
        //阻止默认事件
        e.preventDefault();
        mouse_x = e.clientX - width;
        document.onmousemove = mouseMove;
        document.onmouseup = mouseUp;
        console.log(e, "ll");
      };
      document.querySelector(".ant-layout-sider")?.appendChild(node);
    }

    function mouseMove(e: any) {
      var e = e || window.event;
      // var left_width = e.clientX - mouse_x;
      // left_width = left_width < min_width ? min_width : left_width;
      // left_width = left_width > max_width ? max_width : left_width;
      // console.log(left_width, "left_width");
      // left.style.width = left_width + 'px';
      // right.style.left = left_width + 'px';
      setWidth(e.clientX);
      // console.log(e.clientX);
    }
    //终止事件
    function mouseUp() {
      document.onmousemove = null;
      document.onmouseup = null;
    }
  }, []);

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
