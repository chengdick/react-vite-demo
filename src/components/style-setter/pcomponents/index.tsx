import { createFromIconfontCN } from '@ant-design/icons'
import * as React from 'react'
import { useEffect } from 'react'

const ICON_URL = '//at.alicdn.com/t/font_2761185_gdpwg9vnz7.js'

let CustomIcon: any

document.addEventListener('DOMContentLoaded', function () {
  // console.log('3 seconds passed');
  CustomIcon = createFromIconfontCN({
    scriptUrl: ICON_URL,
  })
})

interface IconProps {
  type: string
  size?:
    | number
    | 'small'
    | 'xxs'
    | 'xs'
    | 'medium'
    | 'large'
    | 'xl'
    | 'xxl'
    | 'xxxl'
    | 'inherit'
  className?: string
  style?: any
}

export default (props: IconProps) => {
  const {
    type,
    size,
    className = '',
    style = { width: 16, fontSize: 16 },
  } = props
  console.log(props.style)
  useEffect(() => {
    if (!CustomIcon) {
      CustomIcon = createFromIconfontCN({
        scriptUrl: ICON_URL,
      })
    }
  }, [])
  return (
    <>
      {CustomIcon && (
        <CustomIcon
          type={type}
          size={size}
          className={className}
          style={style}
        />
      )}
    </>
  )
}
