import * as React from "react";
import { Popover, Radio } from "antd";
import { RadioItem, onStyleChange } from "../../utils/types";
import Icon from "../icon";
import "./index.less";
const RadioGroup = Radio.Group;

interface radioProps {
  dataList: Array<RadioItem>;
  styleKey: string;
  // styleData?: StyleData | any;
  onStyleChange?: onStyleChange;
  // 某些时候值并不是直接从StyleData中获取的，value值提供了外部定义的扩展
  value: string;
}

export default (props: radioProps) => {
  const { dataList, styleKey, onStyleChange, value } = props;

  const onRadioChange = (key: string, val: string | number | boolean) => {
    onStyleChange &&
      onStyleChange([
        {
          styleKey: key,
          value: val,
        },
      ]);
  };

  // const onRadioItemClick = (
  //   key: string,
  //   val: string | number | boolean,
  //   value: string
  // ) => {
  //   if (value == val) {
  //     onStyleChange &&
  //       onStyleChange([
  //         {
  //           styleKey: key,
  //           value: null,
  //         },
  //       ])
  //   }
  // }

  return (
    <div className="radiogroup-style">
      {/* {value ? (
        <RadioGroup
          value={value}
          shape="button"
          onChange={(val) => onRadioChange(styleKey, val)}
          // onClick={(event) => {
          //   onRadioClick(event, styleKey, value);
          // }}
          aria-labelledby="groupId"
        >
          {dataList &&
            dataList.map((item: RadioItem) => (
              <Balloon
                trigger={
                  <Radio
                    id={item.value}
                    value={item.value}
                    onClick={(e) => {
                      onRadioItemClick(styleKey, e.currentTarget.id, value);
                    }}
                  >
                    {item.icon ? <Icon type={item.icon} size="small"></Icon> : item.title}
                  </Radio>
                }
                triggerType="hover"
                closable={false}
                align="t"
              >
                {item.tips}
              </Balloon>
            ))}
        </RadioGroup>
      ) : (
        <RadioGroup
          shape="button"
          onChange={(val) => onRadioChange(styleKey, val)}
          aria-labelledby="groupId"
        >
          {dataList &&
            dataList.map((item: RadioItem) => (
              <Balloon
                trigger={
                  <Radio id={item.value} value={item.value}>
                    {item.icon ? <Icon type={item.icon} size="small"></Icon> : item.title}
                  </Radio>
                }
                triggerType="hover"
                closable={false}
                align="t"
              >
                {item.tips}
              </Balloon>
            ))}
        </RadioGroup>
      )} */}
      <RadioGroup
        value={value}
        // shape="button"
        onChange={(e) => onRadioChange(styleKey, e.target.value)}
        // onClick={(event) => {
        //   onRadioClick(event, styleKey, value);
        // }}
        aria-labelledby="groupId"
        style={{ width: "100%" }}
      >
        {dataList &&
          dataList.map((item: RadioItem, index: number) => (
            // <Balloon
            //   key={index}
            //   trigger={

            //   }
            //   triggerType="hover"
            //   closable={false}
            //   align="t"
            // >
            //   {item.tips}
            // </Balloon>

            <Popover key={index} content={item.tips}>
              <Radio.Button
                id={item.value}
                value={item.value}
                // onClick={(e) => {
                //   onRadioItemClick(styleKey, e.currentTarget.id, value)
                // }}
              >
                {item.icon ? (
                  <Icon type={item.icon} size="small"></Icon>
                ) : (
                  item.title
                )}
              </Radio.Button>
            </Popover>
          ))}
      </RadioGroup>
    </div>
  );
};
