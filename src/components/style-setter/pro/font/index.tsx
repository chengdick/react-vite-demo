import * as React from 'react'
import Row from '../../components/row'
import Number from '../../components/number'
import { StyleData, onStyleChange } from '../../utils/types'
import { InputNumber, Select, Slider } from 'antd'
import { Collapse } from 'antd'
import ColorInput from '../../components/color-input'
import fontConfig from './config'
import { addUnit, isEmptyValue } from '../../utils'
import './index.less'
const Panel = Collapse.Panel

interface fontProps {
  styleData: StyleData | any
  onStyleChange?: onStyleChange
  fontPropsConfig?: any
  unit?: string
}
export default (props: fontProps) => {
  const { styleData, onStyleChange, fontPropsConfig } = props
  const defaultFontPropsConfig = {
    // display 展示列表
    fontFamilyList: [
      { value: 'Helvetica', label: 'Helvetica' },
      { value: 'Arial', label: 'Arial' },
      { value: 'serif', label: 'serif' },
    ],
  }

  // 配置合并
  const propsConfig = { ...defaultFontPropsConfig, ...fontPropsConfig }

  const { fontWeight, textAlign } = fontConfig

  const onNumberChange = (styleKey: string, value: number, unit?: string) => {
    onStyleChange &&
      onStyleChange([
        {
          styleKey,
          value: unit ? addUnit(value, unit) : value,
        },
      ])
  }
  console.log(fontWeight.dataList, '=====121212')
  return (
    <Collapse defaultActiveKey={['0']}>
      <Panel header="文字" key={'0'} className="font-style-container">
        <div className="inner-row-contaienr">
          <div className="row-item">
            <span className="row-item-title">字号</span>
            <Number
              max={100}
              min={0}
              styleKey="fontSize"
              {...props}
              style={{ marginRight: '10px', width: '100%' }}
              useComputedStyle={true}
            />
          </div>
          <div className="row-item">
            <span className="row-item-title">行高</span>
            <Number
              min={0}
              styleKey="lineHeight"
              {...props}
              style={{ width: '100%' }}
              useComputedStyle={true}
            />
          </div>
        </div>

        <Row title={'字重'} styleData={styleData} styleKey="">
          <Select
            options={fontWeight.dataList}
            style={{ width: '100%' }}
            value={styleData.fontWeight}
            allowClear={true}
            onChange={(val) =>
              onStyleChange &&
              onStyleChange([{ styleKey: 'fontWeight', value: val }])
            }
          />
        </Row>
        <Row title={'字体'} styleData={styleData} styleKey="">
          <Select
            options={propsConfig.fontFamilyList}
            style={{ width: '100%' }}
            value={styleData.fontFamily}
            allowClear={true}
            onChange={(val) =>
              onStyleChange &&
              onStyleChange([{ styleKey: 'fontFamily', value: val }])
            }
          />
        </Row>

        <Row title={'文字颜色'} styleKey="" {...props}>
          <ColorInput
            styleKey={'color'}
            {...props}
            inputWidth="100%"
          ></ColorInput>
        </Row>

        <Row
          title={textAlign.title}
          dataList={textAlign.dataList}
          styleKey="textAlign"
          {...props}
        />

        <Row title={'透明度'} styleKey="opacity" {...props}>
          <div className="opacity-container">
            <Slider
              style={{ marginRight: '7px', width: '100%' }}
              value={
                !isEmptyValue(styleData.opacity) ? styleData.opacity * 100 : 0
              }
              onChange={(val: any) =>
                onNumberChange('opacity', parseInt(val) / 100)
              }
            />
            <InputNumber
              value={
                !isEmptyValue(styleData.opacity)
                  ? Math.floor(styleData.opacity * 100)
                  : undefined
              }
              max={100}
              min={0}
              onChange={(val: any) => {
                onNumberChange(
                  'opacity',
                  (isEmptyValue(val) ? null : val / 100) as number
                )
              }}
            />
          </div>
        </Row>
      </Panel>
    </Collapse>
  )
}
