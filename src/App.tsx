import { ConfigProvider } from "antd";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { AsyncComponent } from "./components/AsyncComponent";
import Layout from "./components/Layout";
ConfigProvider.config({
  theme: {
    primaryColor: "#25b864",
  },
});
// console.log(new WasmPlayer());
const App = (): any => {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<AsyncComponent componentName="Login" />}
        />
        <Route
          path="/notFound"
          element={<AsyncComponent componentName="NotFound" />}
        />
        <Route path="/*" element={<Layout />}></Route>
        <Route path="*" element={<Navigate to="/notFound" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
