import * as React from 'react'
import Row from '../../components/row'
import { Collapse, Select, InputNumber } from 'antd'
import { useEffect } from 'react'
import PositionBox from '../position/positionBox'
import { StyleData, onStyleChange } from '../../utils/types'
import positionConfig from './config'
const Panel = Collapse.Panel

interface layoutProps {
  styleData: StyleData | any
  onStyleChange: onStyleChange
  positionPropsConfig?: any
}

export default (props: layoutProps) => {
  const { float, clear, position } = positionConfig

  const { onStyleChange, styleData, positionPropsConfig } = props

  const { isShowFloat, isShowClear } = positionPropsConfig

  const onZIndexChange = (zIndex: any) => {
    onStyleChange && onStyleChange([{ styleKey: 'zIndex', value: zIndex }])
  }

  const initData = () => {}

  useEffect(() => {
    initData()
  }, [])

  return (
    <Collapse defaultActiveKey={['0']}>
      <Panel header="位置" key={'0'}>
        <Row title={position.title} styleData={styleData} styleKey="position">
          <Select
            options={position.dataList}
            value={styleData.position}
            allowClear={true}
            style={{ width: '100%' }}
            onChange={(val) =>
              onStyleChange &&
              onStyleChange([{ styleKey: 'position', value: val }])
            }
          />
        </Row>

        {styleData['position'] && styleData['position'] != 'static' && (
          <PositionBox
            // styleData={styleData}
            // onStyleChange={onStyleChange}
            {...props}
          />
        )}

        <Row title={'zIndex'} styleData={styleData} styleKey="zIndex">
          <InputNumber
            style={{ width: '100%' }}
            step={1}
            precision={2}
            onChange={onZIndexChange}
            value={styleData['zIndex']}
          />
        </Row>

        {isShowFloat && (
          <Row
            title={float.title}
            dataList={float.dataList}
            onStyleChange={onStyleChange}
            styleData={styleData}
            styleKey="float"
          />
        )}
        {isShowClear && (
          <Row
            title={clear.title}
            dataList={clear.dataList}
            onStyleChange={onStyleChange}
            styleData={styleData}
            styleKey="clear"
          />
        )}
      </Panel>
    </Collapse>
  )
}
