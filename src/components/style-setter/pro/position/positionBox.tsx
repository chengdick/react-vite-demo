import * as React from 'react'
import { Input } from 'antd'
import { StyleData, onStyleChange } from '../../utils/types'
import positionConfig from './config'
import Row from '../../components/row'
import { addUnit, removeUnit } from '../../utils'
import './index.less'
const KEY_ARROW_DOWN = 'ArrowDown'
const KEY_ARROW_UP = 'ArrowUp'

interface positionBoxProps {
  styleData: StyleData | any
  onStyleChange: onStyleChange
  unit?: any
}

export default (props: positionBoxProps) => {
  const { onStyleChange, styleData, unit } = props
  const { positionTemplete } = positionConfig
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

  const onPositionTempleteChange = (styleDataList: Array<StyleData>) => {
    // 解析模板的值
    styleDataList.map((item) => {
      if (item.value == 'topLeft') {
        onStyleChange([
          {
            styleKey: 'top',
            value: 0,
          },
          {
            styleKey: 'left',
            value: 0,
          },
          {
            styleKey: 'bottom',
            value: null,
          },
          {
            styleKey: 'right',
            value: null,
          },
        ])
      } else if (item.value === 'topRight') {
        onStyleChange([
          {
            styleKey: 'top',
            value: 0,
          },
          {
            styleKey: 'left',
            value: null,
          },
          {
            styleKey: 'bottom',
            value: null,
          },
          {
            styleKey: 'right',
            value: 0,
          },
        ])
      } else if (item.value === 'bottomLeft') {
        onStyleChange([
          {
            styleKey: 'top',
            value: null,
          },
          {
            styleKey: 'left',
            value: 0,
          },
          {
            styleKey: 'bottom',
            value: 0,
          },
          {
            styleKey: 'right',
            value: null,
          },
        ])
      } else if (item.value === 'bottomRight') {
        onStyleChange([
          {
            styleKey: 'top',
            value: null,
          },
          {
            styleKey: 'left',
            value: null,
          },
          {
            styleKey: 'bottom',
            value: 0,
          },
          {
            styleKey: 'right',
            value: 0,
          },
        ])
      }
      return item
    })
  }

  return (
    <div>
      {styleData['position'] && styleData['position'] === 'absolute' && (
        <Row
          dataList={positionTemplete.dataList}
          onStyleChange={onPositionTempleteChange}
          styleKey={'positionTemplete'}
        />
      )}

      <div className="position-box-container">
        <div className="top-div">
          <Input
            bordered={false}
            className="next-noborder"
            placeholder="auto"
            maxLength={4}
            value={removeUnit(styleData['top']) as any}
            onChange={(e) => onInputChange('top', e.target.value)}
            onKeyDown={(e) => onInputKeyDown(e.key, 'top')}
          />
        </div>
        <div className="right-div">
          <Input
            bordered={false}
            className="next-noborder"
            placeholder="auto"
            maxLength={4}
            value={removeUnit(styleData['right']) as any}
            onChange={(e) => onInputChange('right', e.target.value)}
            onKeyDown={(e) => onInputKeyDown(e.key, 'right')}
          />
        </div>
        <div className="bottom-div">
          <Input
            bordered={false}
            className="next-noborder"
            placeholder="auto"
            maxLength={4}
            value={removeUnit(styleData['bottom']) as any}
            onChange={(e) => onInputChange('bottom', e.target.value)}
            onKeyDown={(e) => onInputKeyDown(e.key, 'bottom')}
          />
        </div>
        <div className="left-div">
          <Input
            className="next-noborder"
            placeholder="auto"
            maxLength={4}
            value={removeUnit(styleData['left']) as any}
            onChange={(e) => onInputChange('left', e.target.value)}
            onKeyDown={(e) => onInputKeyDown(e.key, 'left')}
          />
        </div>
      </div>
    </div>
  )
}
