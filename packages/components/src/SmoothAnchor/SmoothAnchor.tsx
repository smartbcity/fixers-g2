import { cx } from '@emotion/css'
import { BasicProps } from '@smartb/g2-themes'
import { MergeReactElementProps } from '@smartb/g2-utils'
import React, { useLayoutEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

export interface SmoothAnchorBasicProps extends BasicProps {
  id: string
}

export type SmoothAnchorProps = MergeReactElementProps<
  'div',
  SmoothAnchorBasicProps
>

export const SmoothAnchor = (props: SmoothAnchorProps) => {
  const { id, className, ...other } = props
  const location = useLocation()
  const ref = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    const anchorTargeted: string | undefined = location.hash
      .split('#')[1]
      ?.split('&')[0]
    if (anchorTargeted === id && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [location, id])

  return (
    <div
      className={cx('AruiSmoothAnchor-root', className)}
      ref={ref}
      id={id}
      {...other}
    />
  )
}
