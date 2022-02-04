import React, { useEffect } from 'react'
import mermaid from 'mermaid'
import { MergeReactElementProps, BasicProps } from '@smartb/g2-themes'
import { cx } from '@emotion/css'

export interface MermaidBasicProps extends BasicProps {
  chart: string
}

export type MermaidProps = MergeReactElementProps<'div', MermaidBasicProps>

export const Mermaid = (props: MermaidProps) => {
  const { chart, className, ...other } = props
  mermaid.initialize({
    startOnLoad: true,
    theme: 'default',
    securityLevel: 'loose'
  })

  useEffect(() => {
    mermaid.contentLoaded()
  }, [chart])

  return (
    <div className={cx('mermaid', className)} {...other}>
      {chart}
    </div>
  )
}
