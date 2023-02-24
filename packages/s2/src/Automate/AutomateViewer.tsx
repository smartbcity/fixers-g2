import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Node, Network, Edge } from 'vis-network'
import { BasicProps, makeG2STyles, useTheme } from '@smartb/g2-themes'
import { MergeReactElementProps } from '@smartb/g2-utils'

const useStyles = makeG2STyles()({
  container: {
    width: '100%',
    height: '100%',
    outline: 'none',
    '& div': {
      outline: 'none'
    },
    '& canvas': {
      outline: 'none'
    }
  }
})

const options = {
  physics: {
    enabled: true,
    solver: 'repulsion',
    repulsion: {
      damping: 0.9,
      springConstant: 0.1,
      springLength: 300,
      nodeDistance: 150
    }
  },
  manipulation: {
    enabled: false
  },
  interaction: {
    zoomView: true
  }
}

interface Data {
  edges: Edge[]
  nodes: Node[]
}

export interface Transition {
  label: string
  from?: number
  to: number
}

export interface AutomateViewerBasicProps extends BasicProps {
  /**
   * The automate that wil be displayed in the viewer
   */
  transitions: Transition[]
  /**
   * the event triggered when the user click on the different part of the viewer
   */
  onSelect?: (edgesSelected: Edge[], nodeSelected?: Node) => void
  /**
   * the envent to customise the nodes
   */
  customNode?: (index: number) => Partial<Node>
  /**
   * the envent to customise the nodes
   */
  customEdge?: (transition: Transition, index: number) => Partial<Edge>
}

export type AutomateViewerProps = MergeReactElementProps<
  'div',
  AutomateViewerBasicProps
>

export const AutomateViewer = (props: AutomateViewerProps) => {
  const { transitions, onSelect, className, customNode, customEdge, ...other } =
    props
  const theme = useTheme()
  const defaultStyles = useStyles()
  const [network, setNetwork] = useState<Network | undefined>(undefined)
  const containerRef = useRef<HTMLDivElement>(null)

  const data: Data = useMemo(() => {
    const selfRefSize: number[] = []
    const nodes: Node[] = []
    let hasUndefinedFrom = false
    let nbNodes = 0
    const edges: Edge[] = transitions.map((transition, index) => {
      const from = transition.from
      const to = transition.to
      if (from !== undefined && !selfRefSize[from]) selfRefSize[from] = 0
      if (from === to) selfRefSize[from] += 0.2
      if (from == undefined) hasUndefinedFrom = true
      nbNodes = Math.max(nbNodes, Math.max(to + 1))
      return {
        label: transition.label,
        id: index,
        from: from ?? -1,
        to: to,
        arrows: 'to',
        selfReference: {
          size: 40,
          angle: Math.PI / selfRefSize[from ?? 0],
          renderBehindTheNode: false
        },
        ...(customEdge ? customEdge(transition, index) : undefined)
      }
    })
    if (hasUndefinedFrom) {
      nodes.push({
        id: -1,
        shape: 'circle',
        color: {
          border: theme.colors.secondary,
          background: theme.colors.secondary,
          highlight: {
            border: theme.colors.secondary,
            background: theme.colors.secondary
          },
          hover: {
            background: theme.colors.secondary,
            border: theme.colors.secondary
          }
        },
        borderWidth: 0,
        margin: {
          bottom: 3,
          left: 3,
          right: 3,
          top: 3
        }
      })
    }
    for (let i = 0; i < nbNodes; i++) {
      nodes.push({
        id: i,
        label: i.toLocaleString(),
        shape: 'circle',
        color: {
          border: theme.colors.secondary,
          background: theme.colors.primary + 'CC',
          highlight: {
            border: theme.colors.secondary,
            background: theme.colors.primary
          },
          hover: {
            background: theme.colors.primary,
            border: theme.colors.secondary
          }
        },
        borderWidth: 2,
        borderWidthSelected: 3,
        margin: {
          bottom: 30,
          left: 30,
          right: 30,
          top: 30
        },
        ...(customNode ? customNode(i) : {})
      })
    }
    return {
      edges: edges,
      nodes: nodes
    }
  }, [transitions, customNode])

  useEffect(() => {
    containerRef.current &&
      data &&
      setNetwork(new Network(containerRef.current, data, options))
  }, [data, containerRef.current])

  useEffect(() => {
    if (network && onSelect) {
      network.on('click', function (properties) {
        const edges = data?.edges?.filter((edge) =>
          properties.edges.includes(edge.id)
        )
        const node = data?.nodes?.find(
          (node) => properties.nodes[0] === node.id
        )
        onSelect(edges ?? [], node)
      })
    }
  }, [network, onSelect])

  return (
    <div
      {...other}
      ref={containerRef}
      className={defaultStyles.cx(
        defaultStyles.classes.container,
        'AruiAutomateViewer-root',
        className
      )}
    />
  )
}
