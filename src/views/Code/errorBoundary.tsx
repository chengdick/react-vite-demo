import React, { Component } from "react";

const errorBoundary = (Element: any, errorCallback: any) => {
  return class ErrorBoundary extends Component {
    componentDidCatch(error: any) {
      errorCallback(error);
    }

    render() {
      return typeof Element === "function" ? (
        <Element />
      ) : React.isValidElement(Element) ? (
        Element
      ) : null;
    }
  };
};

export default errorBoundary;
