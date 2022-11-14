import * as React from 'react'
import { useState, useEffect } from 'react'
import Row from '../../components/row'
import Icon from '../../components/icon'
import Number from '../../components/number'
import ColorInput from '../../components/color-input'
import { StyleData, onStyleChange } from '../../utils/types'
import { Collapse, Select, Slider } from 'antd'
import fontConfig from './config'
import { addUnit, removeUnit } from '../../utils'
import './index.less'
const Option = Select.Option
const Panel = Collapse.Panel

const BORDER_MAX = 30

enum BorderRadiusType {
  fixedBorder = 'fixedBorder',
  partBorder = 'partBorder',
}

const BorderDirectionMap = {
  borderLeft: 'borderLeft',
  borderRight: 'borderRight',
  borderTop: 'borderTop',
  borderBottom: 'borderBottom',
  // border:'border'
}

const borderRadiusMap = {
  borderRadius: 'borderRadius',
  borderTopLeftRadius: 'borderTopLeftRadius',
  borderTopRightRadius: 'borderTopRightRadius',
  borderBottomLeftRadius: 'borderBottomLeftRadius',
  borderBottomRightRadius: 'borderBottomRightRadius',
}

interface fontProps {
  styleData: StyleData | any
  onStyleChange?: onStyleChange
  unit?: string
}
export default (props: fontProps) => {
  const { styleData, onStyleChange, unit } = props
  const { borderType } = fontConfig
  const [selBorderType, setSelBorderType] = useState<any>(null)
  const [borderDirection, setBorderDirection] = useState<any>(null)

  useEffect(() => {
    if (!borderDirection) {
      for (let key in styleData) {
        for (let borderDirectionKey in BorderDirectionMap) {
          if (key.indexOf(borderDirectionKey) >= 0) {
            setBorderDirection(borderDirectionKey)
            break
          }
          if (styleData['border']) {
            setBorderDirection('border')
            break
          }
        }
      }
    }

    // 判断圆角类型
    if (styleData[borderRadiusMap.borderRadius]) {
      setSelBorderType(BorderRadiusType.fixedBorder)
    } else if (
      styleData[borderRadiusMap.borderBottomLeftRadius] ||
      styleData[borderRadiusMap.borderBottomRightRadius] ||
      styleData[borderRadiusMap.borderTopLeftRadius] ||
      styleData[borderRadiusMap.borderTopRightRadius]
    ) {
      setSelBorderType(BorderRadiusType.partBorder)
    }
  }, [styleData])

  const onChangeBorderType = (styleDataList: Array<StyleData>) => {
    if (styleDataList) {
      const styleKey = styleDataList[0].value
      setSelBorderType(styleKey)
    }
  }

  const onRangeChange = (styleKey: string, value: string, unit?: string) => {
    // 需要清除partBorder的圆角设置，不然会冲突，容易遗漏

    onStyleChange &&
      onStyleChange([
        {
          styleKey,
          value: unit ? addUnit(value, unit) : value,
        },
        {
          styleKey: borderRadiusMap.borderBottomLeftRadius,
          value: null,
        },
        {
          styleKey: borderRadiusMap.borderBottomRightRadius,
          value: null,
        },
        {
          styleKey: borderRadiusMap.borderTopLeftRadius,
          value: null,
        },
        {
          styleKey: borderRadiusMap.borderTopRightRadius,
          value: null,
        },
      ])
  }

  const onIconClick = (styleKey: string) => {
    setBorderDirection(styleKey)
  }

  const onPartBorderRadiusChange = (
    styleKey: string,
    value: number,
    unit: string,
    styleData: any
  ) => {
    let styleDataList = [
      {
        styleKey,
        value: unit ? addUnit(value, unit) : value,
      },
    ]
    if (styleData['borderRadius']) {
      styleDataList.push({
        styleKey: 'borderRadius',
        value: null,
      })
    }
    onStyleChange && onStyleChange(styleDataList)
  }

  const onBorderTypeChange = (styleKey: string, value: string) => {
    onStyleChange &&
      onStyleChange([
        {
          styleKey,
          value,
        },
      ])
  }

  return (
    <Collapse defaultActiveKey={['0']}>
      <Panel header="边框" key={'0'} className="border-style-container">
        <Row
          title={borderType.title}
          dataList={borderType.dataList}
          styleKey={'borderType'}
          {...props}
          onStyleChange={onChangeBorderType}
          value={selBorderType}
        />

        {selBorderType == 'fixedBorder' && (
          <Row title={' '} styleKey="borderRadius" {...props}>
            <div className="radius-container">
              {/* <Range
                max={BORDER_MAX}
                value={removeUnit(styleData.borderRadius)}
                onChange={(val) => onRangeChange('borderRadius', val, unit)}
              /> */}
              <Slider
                max={BORDER_MAX}
                value={removeUnit(styleData.borderRadius) as any}
                onChange={(val: any) =>
                  onRangeChange('borderRadius', val, unit)
                }
              />
              <Number
                styleKey="borderRadius"
                style={{ minWidth: '80px', marginLeft: '5px' }}
                {...props}
                max={BORDER_MAX}
              />
            </div>
          </Row>
        )}

        {selBorderType == 'partBorder' && (
          <>
            <Row
              title={' '}
              styleKey="borderRadius"
              {...props}
              contentStyle={{ justifyContent: 'space-between' }}
            >
              <div className="row-item">
                <Icon type="icon-radius-upleft" className="radius-icon" />
                <Number
                  max={BORDER_MAX}
                  min={0}
                  styleKey={borderRadiusMap.borderTopLeftRadius}
                  {...props}
                  style={{ width: '68px' }}
                  onChangeFunction={(styleKey: any, val: any, unit: any) =>
                    onPartBorderRadiusChange(styleKey, val, unit, styleData)
                  }
                />
              </div>
              <div className="row-item">
                <Icon type="icon-radius-upright" className="radius-icon" />
                <Number
                  max={BORDER_MAX}
                  styleKey={borderRadiusMap.borderTopRightRadius}
                  {...props}
                  style={{ width: '68px' }}
                  onChangeFunction={(styleKey: any, val: any, unit: any) =>
                    onPartBorderRadiusChange(styleKey, val, unit, styleData)
                  }
                />
              </div>
            </Row>
            <Row
              title={' '}
              styleKey="borderRadius"
              {...props}
              contentStyle={{ justifyContent: 'space-between' }}
            >
              <div className="row-item">
                <Icon type="icon-radius-bottomleft" className="radius-icon" />
                <Number
                  max={BORDER_MAX}
                  styleKey={borderRadiusMap.borderBottomLeftRadius}
                  {...props}
                  style={{ width: '68px' }}
                  onChangeFunction={(styleKey: any, val: any, unit: any) =>
                    onPartBorderRadiusChange(styleKey, val, unit, styleData)
                  }
                />
              </div>
              <div className="row-item">
                <Icon type="icon-radius-bottomright" className="radius-icon" />
                <Number
                  max={BORDER_MAX}
                  styleKey={borderRadiusMap.borderBottomRightRadius}
                  {...props}
                  onChangeFunction={(
                    styleKey: string,
                    val: number,
                    unit: string
                  ) => onPartBorderRadiusChange(styleKey, val, unit, styleData)}
                  style={{ width: '68px' }}
                />
              </div>
            </Row>
          </>
        )}

        <Row title={'边框'} styleKey="border" {...props}>
          <div className="border-container">
            <div className="border-icon-container">
              <div className="top-icon-container">
                <div
                  className={
                    borderDirection === BorderDirectionMap.borderTop
                      ? 'sel-icon icon-container'
                      : 'icon-container'
                  }
                  onClick={() => onIconClick('borderTop')}
                >
                  <Icon
                    type="icon--shangbiankuang"
                    style={{ width: 20, fontSize: 20 }}
                  />
                </div>
              </div>
              <div className="center-icon-container">
                <div
                  className={
                    borderDirection === BorderDirectionMap.borderLeft
                      ? 'sel-icon icon-container'
                      : 'icon-container'
                  }
                  onClick={() => onIconClick('borderLeft')}
                >
                  <Icon
                    type="icon--zuobiankuang"
                    style={{ width: 20, fontSize: 20 }}
                  />
                </div>

                <div
                  className={
                    borderDirection === 'border'
                      ? 'sel-icon icon-container'
                      : 'icon-container'
                  }
                  onClick={() => onIconClick('border')}
                >
                  <Icon
                    type="icon--quanbubiankuang"
                    style={{ width: 20, fontSize: 20 }}
                  />
                </div>
                <div
                  className={
                    borderDirection === BorderDirectionMap.borderRight
                      ? 'sel-icon icon-container'
                      : 'icon-container'
                  }
                  onClick={() => onIconClick('borderRight')}
                >
                  <Icon
                    type="icon--youbiankuang"
                    style={{ width: 20, fontSize: 20 }}
                  />
                </div>
              </div>
              <div className="bottom-icon-container">
                <div
                  className={
                    borderDirection === BorderDirectionMap.borderBottom
                      ? 'sel-icon icon-container'
                      : 'icon-container'
                  }
                  onClick={() => onIconClick('borderBottom')}
                >
                  <Icon
                    type="icon--xiabiankuang"
                    style={{ width: 20, fontSize: 20 }}
                  />
                </div>
              </div>
            </div>

            <div className="border-right-container">
              {borderDirection && (
                <>
                  <Number
                    min={0}
                    max={30}
                    className="border-width"
                    styleKey={borderDirection + 'Width'}
                    {...props}
                  />
                  <ColorInput styleKey={borderDirection + 'Color'} {...props} />
                  <Select
                    allowClear
                    style={{ marginTop: '10px' }}
                    value={styleData[borderDirection + 'Style']}
                    onChange={(value) => {
                      onBorderTypeChange(borderDirection + 'Style', value)
                    }}
                  >
                    <Option value="solid">solid</Option>
                    <Option value="dashed">dashed</Option>
                    <Option value="dotted">dotted</Option>
                  </Select>
                </>
              )}
            </div>
          </div>
        </Row>
      </Panel>
    </Collapse>
  )
}
