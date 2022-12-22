import { StyleData } from "./types";
import { toCSS, toJSON } from "../../Cssjson";

function getComputePropertyValue(node: any, property: string) {
  const nativeNode = node?.getDOMNode();
  if (!nativeNode) return null;
  try {
    return window.getComputedStyle(nativeNode, null).getPropertyValue(property);
  } catch (e) {
    console.error(e);
    return null;
  }
}

/**
 * 获取提示属性值
 * @param field
 * @param property
 */
export function getPlaceholderPropertyValue(field: any, property: string) {
  const propertyValue: any = getComputePropertyValue(
    field?.getNode(),
    toLine(property)
  );

  if (propertyValue != "auto" && propertyValue != "") {
    if (property != "backgroundColor") {
      return removeUnit(propertyValue);
    } else {
      return hexify(propertyValue);
    }
  }

  return propertyValue;
}

export function removeUnit(value: string) {
  if (value != undefined && value != null) {
    return parseInt(value);
  }

  return null;
}

export function addUnit(value: number | string, unit: string) {
  if (value != undefined && value != null) {
    return value + unit;
  } else {
    return null;
  }
}

export function isEmptyValue(value: string | number | boolean) {
  if (value == undefined || value == null) {
    return true;
  }

  return false;
}

/**
 * 将驼峰写法改成xx-xx的css命名写法
 * @param styleKey
 */
export function toLine(styleKey: string) {
  return styleKey.replace(/([A-Z])/g, "-$1").toLowerCase();
}

export function toHump(name: String) {
  return name.replace(/\-(\w)/g, function (all, letter) {
    return letter.toUpperCase();
  });
}

/**
 * rgba转16进制
 * @param color
 */
export function hexify(color: string) {
  const values = color
    .replace(/rgba?\(/, "")
    .replace(/\)/, "")
    .replace(/[\s+]/g, "")
    .split(",");
  const a = parseFloat(values[3]);
  const r = Math.floor(a * parseInt(values[0]) + (1 - a) * 255);
  const g = Math.floor(a * parseInt(values[1]) + (1 - a) * 255);
  const b = Math.floor(a * parseInt(values[2]) + (1 - a) * 255);
  return (
    "#" +
    ("0" + r.toString(16)).slice(-2) +
    ("0" + g.toString(16)).slice(-2) +
    ("0" + b.toString(16)).slice(-2)
  );
}

export function parseToCssCode(styleData: any) {
  const parseStyleData: any = {};
  for (const styleKey in styleData) {
    parseStyleData[toLine(styleKey)] = styleData[styleKey];
  }

  const cssJson: any = {
    children: {
      "#main": {
        children: {},
        attributes: parseStyleData,
      },
    },
  };
  return toCSS(cssJson);
}

export function parseToStyleData(cssCode: string) {
  const styleData: any = {};
  try {
    const cssJson = toJSON(cssCode);
    const cssJsonData = cssJson?.children?.["#main"]?.attributes;
    for (const key in cssJsonData) {
      styleData[toHump(key)] = cssJsonData[key];
    }
    // 转化key
  } catch (e: any) {
    console.error(e.message);
  }

  return styleData;
}
