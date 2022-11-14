import * as React from 'react'
import './index.less'
import { Input } from 'antd'
import { StyleData, onStyleChange } from '../../utils/types'
import { addUnit, removeUnit } from '../../utils'

const KEY_ARROW_DOWN = 'ArrowDown'
const KEY_ARROW_UP = 'ArrowUp'

interface layoutBoxProps {
  styleData: StyleData | any
  onStyleChange: onStyleChange
  unit?: 'px'
  layoutPropsConfig: any
}

export default (props: layoutBoxProps) => {
  const { onStyleChange, unit = 'px', styleData, layoutPropsConfig } = props

  const onInputChange = (styleKey: string, value: string) => {
    if (value != '') {
      // 判断是否是数字
      if (!isNaN(parseInt(value))) {
        onStyleChange([
          {
            styleKey,
            value: addUnit(value, unit),
          },
        ])
      }
    } else {
      onStyleChange([
        {
          styleKey,
          value: null,
        },
      ])
    }
  }

  const onInputKeyDown = (key: string, styleKey: string) => {
    const { onStyleChange, unit = 'px', styleData } = props
    const value = styleData[styleKey] || 0
    if (key == KEY_ARROW_DOWN) {
      onStyleChange([
        {
          styleKey,
          value: addUnit(parseInt(value) - 1, unit),
        },
      ])
    } else if (key == KEY_ARROW_UP) {
      onStyleChange([
        {
          styleKey,
          value: addUnit(parseInt(value) + 1, unit),
        },
      ])
    }
  }

  return (
    <div className="layout-box-container">
      {layoutPropsConfig.isShowMargin && (
        <>
          <div className="margin-top-div">
            <Input
              bordered={false}
              placeholder="0"
              maxLength={3}
              value={removeUnit(styleData['marginTop']) as any}
              onChange={(e: any) => onInputChange('marginTop', e.target.value)}
              onKeyDown={(e) => onInputKeyDown(e.key, 'marginTop')}
            ></Input>
          </div>
          <div className="margin-right-div">
            <Input
              bordered={false}
              placeholder="0"
              maxLength={3}
              value={removeUnit(styleData['marginRight']) as any}
              onChange={(e: any) =>
                onInputChange('marginRight', e.target.value)
              }
              onKeyDown={(e) => onInputKeyDown(e.key, 'marginRight')}
            ></Input>
          </div>
          <div className="margin-bottom-div">
            <span className="help-txt">MARGIN</span>
            <Input
              bordered={false}
              placeholder="0"
              maxLength={3}
              value={removeUnit(styleData['marginBottom']) as any}
              onChange={(e) => onInputChange('marginBottom', e.target.value)}
              onKeyDown={(e) => onInputKeyDown(e.key, 'marginBottom')}
            ></Input>
          </div>
          <div className="margin-left-div">
            <Input
              bordered={false}
              placeholder="0"
              maxLength={3}
              value={removeUnit(styleData['marginLeft']) as any}
              onChange={(e) => onInputChange('marginLeft', e.target.value)}
              onKeyDown={(e) => onInputKeyDown(e.key, 'marginLeft')}
            ></Input>
          </div>
        </>
      )}

      {layoutPropsConfig.isShowPadding && (
        <>
          <div className="padding-top-div">
            <Input
              bordered={false}
              placeholder="0"
              maxLength={3}
              value={removeUnit(styleData['paddingTop']) as any}
              onChange={(e) => onInputChange('paddingTop', e.target.value)}
              onKeyDown={(e) => onInputKeyDown(e.key, 'paddingTop')}
            ></Input>
          </div>
          <div className="padding-right-div">
            <Input
              bordered={false}
              placeholder="0"
              maxLength={3}
              value={removeUnit(styleData['paddingRight']) as any}
              onChange={(e) => onInputChange('paddingRight', e.target.value)}
              onKeyDown={(e) => onInputKeyDown(e.key, 'paddingRight')}
            ></Input>
          </div>
          <div className="padding-bottom-div">
            <span className="help-txt">PADDING</span>
            <Input
              bordered={false}
              placeholder="0"
              maxLength={3}
              value={removeUnit(styleData['paddingBottom']) as any}
              onChange={(e) => onInputChange('paddingBottom', e.target.value)}
              onKeyDown={(e) => onInputKeyDown(e.key, 'paddingBottom')}
            ></Input>
          </div>
          <div className="padding-left-div">
            <Input
              bordered={false}
              placeholder="0"
              maxLength={3}
              value={removeUnit(styleData['paddingLeft']) as any}
              onChange={(e) => onInputChange('paddingLeft', e.target.value)}
              onKeyDown={(e) => onInputKeyDown(e.key, 'paddingLeft')}
            ></Input>
          </div>
        </>
      )}
    </div>
  )
}
