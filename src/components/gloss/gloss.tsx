import styled from '@emotion/styled'
import { clearFix } from 'polished'
import { Children, ReactNode, useEffect, useRef, useState } from 'react'
import * as R from 'remeda'

import { Margin } from './margin'

const ChildrenContainer = styled.div`
  ${ clearFix() }
`

interface OffsetRect {
  bottom: number
  height: number
  left: number
  middle: number
  right: number
  top: number
  width: number
}

const getOffsetRect = (element?: HTMLElement): OffsetRect => {
  if (!element) {
    return {
      bottom: 0,
      height: 0,
      left: 0,
      middle: 0,
      right: 0,
      top: 0,
      width: 0,
    }
  }

  const { bottom, height, left, right, top, width } =
    element.getBoundingClientRect()

  // const top = element.offsetTop
  // const height = element.offsetHeight
  // const bottom = top + height
  // const left = element.offsetLeft
  // const width = element.offsetWidth
  // const right = left + width
  const middle = height / 2

  return { bottom, height, left, middle, right, top, width }
}

interface Props {
  children: ReactNode
  left?: boolean
  top?: number
}

export function Gloss ({ children, left, top = 50 }: Props) {
  const { childEls, marginEl } = R.groupBy(Children.toArray(children), c =>
    c?.type === Margin ? 'marginEl' : 'childEls',
  )

  const [childrenRect, setChildrenRect] = useState<OffsetRect>(getOffsetRect())
  const [marginRect, setMarginRect] = useState<OffsetRect>(getOffsetRect())

  const childElsRef = useRef<HTMLDivElement | null>(null)
  const marginElsRef = useRef<HTMLDivElement | null>(null)
  const glossRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const childWrapper = childElsRef.current

    if (!childWrapper) return

    const af = requestAnimationFrame(() => {
      setChildrenRect(getOffsetRect(childWrapper))
    })

    return () => cancelAnimationFrame(af)
  }, [childElsRef])

  useEffect(() => {
    const margin = marginElsRef.current

    if (!margin) return

    const af = requestAnimationFrame(() => {
      setMarginRect(getOffsetRect(margin))
    })

    return () => cancelAnimationFrame(af)
  }, [marginElsRef])

  let shapeTop = (childrenRect.height || 0) / 2 - (marginRect.height || 0) / 2
  shapeTop += shapeTop % 8
  let shapeBottom =
    (marginRect.height || 0) / 2 + (childrenRect.height || 0) / 2
  shapeBottom -= shapeBottom % 8

  const shapeWidth = (marginRect.width || 0) * 0.8
  const childrenRectHeight = childrenRect.height || 0
  const childrenRectMiddle = childrenRect.middle || 0

  const path = left
    ? `polygon(0 ${ shapeTop }px, ${ shapeWidth }px ${ shapeTop }px, ${ shapeWidth }px ${ shapeBottom }px, 0 ${ shapeBottom }px)`
    : `polygon(0 ${ shapeTop }px, 0 ${ shapeBottom }px, ${ shapeWidth }px ${ shapeBottom }px, ${ shapeWidth }px ${ shapeTop }px)`

  return (
    <div
      ref={ glossRef }
      style={{ paddingLeft: left ? '15%' : 0, position: 'relative' }}>
      <div ref={ childElsRef } style={{ width: left ? '125%' : 'auto' }}>
        <div
          style={{
            clipPath: path,
            /* stylelint-disable */
            float: left ? 'left' : 'right',
            /* stylelint-enable */
            height: childrenRectHeight,
            shapeOutside: path,
            width: shapeWidth,
          }} />
        { childEls }
      </div>
      <div
        ref={ marginElsRef }
        style={{
          left: left ? 0 : 'auto',
          position: 'absolute',
          right: left ? 'auto' : 0,
          top: childrenRectMiddle,
          transform: left
            ? `translate(-5%, ${ top * -1 }%)`
            : `translate(25%, ${ top * -1 }%)`,
          width: '75%',
        }}>
        { marginEl }
      </div>
    </div>
  )
}
