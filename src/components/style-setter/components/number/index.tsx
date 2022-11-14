import * as React from 'react'
import { useEffect, useState } from 'react'
import { InputNumber } from 'antd'
import { StyleData, onStyleChange } from '../../utils/types'
import {
  addUnit,
  removeUnit,
  isEmptyValue,
  getPlaceholderPropertyValue,
} from '../../utils'
interface numberProps {
  styleKey: string
  styleData: StyleData | any
  onStyleChange?: onStyleChange
  unit?: string
  min?: any
  max?: any
  style?: any
  className?: string
  field?: any
  placeholderScale?: any
  useComputedStyle?: boolean
  onChangeFunction?: any
}

export default (props: numberProps) => {
  const {
    styleData,
    styleKey,
    unit,
    onStyleChange,
    min,
    max,
    style = {},
    className = '',
    placeholderScale,
    onChangeFunction,
  } = props

  console.log('props', props)

  const [placeholder, setPlaceholder] = useState<any>(null)

  const onNumberChange = (styleKey: string, value: number, unit?: string) => {
    onStyleChange &&
      onStyleChange([
        {
          styleKey,
          value: unit ? addUnit(value, unit) : value,
        },
      ])
  }

  const initData = (props: numberProps) => {
    const { field, styleKey, useComputedStyle } = props
    if (useComputedStyle) {
      const placeholder = getPlaceholderPropertyValue(field, styleKey)

      if (placeholder && !isNaN(placeholder)) {
        setPlaceholder(placeholder * (1 / placeholderScale))
      } else {
        setPlaceholder('auto')
      }
    }
  }

  useEffect(() => {
    console.log(props, '====')
    initData(props)
  }, [])

  return (
    <InputNumber
      style={style}
      className={className}
      value={unit ? removeUnit(styleData[styleKey]) : styleData[styleKey]}
      min={isEmptyValue(min) ? Number.MIN_SAFE_INTEGER : min}
      max={isEmptyValue(max) ? Number.MAX_SAFE_INTEGER : max}
      onChange={(val: any) =>
        onChangeFunction
          ? onChangeFunction(styleKey, val, unit)
          : onNumberChange(styleKey, val, unit)
      }
      addonBefore={unit ? unit : ''}
      placeholder={placeholder}
    ></InputNumber>
  )
}
