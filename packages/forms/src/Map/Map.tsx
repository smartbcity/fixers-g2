import {
  MapContainer,
  MapContainerProps,
  TileLayer,
  TileLayerProps
} from 'react-leaflet'
import { LatLngExpression, Map as LeafletMap } from 'leaflet'
import {
  FormHelperText,
  IconButton,
  Stack,
  StackProps,
  useMediaQuery,
  useTheme
} from '@mui/material'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  DraggableMarker,
  DraggableMarkerControl,
  DraggableMarkerNeeds
} from './DraggableMarker'
import 'leaflet/dist/leaflet.css'
import { Button } from '@smartb/g2-components'
import { CloseRounded } from '@mui/icons-material'
import L from 'leaflet'
import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import { cx } from '@emotion/css'
import { markerIcon, markerIcon2x, markerShadow } from './leafletImages'
//@ts-ignore
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow
})

export const defaultPosition = { center: { lng: 2, lat: 46 }, zoom: 5 }

export interface MapPlugin {
  key: string
  value?: any
  setValue?: (value) => void
  element: React.ElementType<any>
}

export interface MapPluginProps extends MapPlugin {
  map?: LeafletMap
  readonly: boolean
  isMobile: boolean
  isFullScreen: boolean
}

export interface MapClasses {
  map?: string
  openFullScreenButton?: string
  closeFullScreenIcon?: string
  errorMessage?: string
}

export interface MapStyles {
  map?: React.CSSProperties
  openFullScreenButton?: React.CSSProperties
  closeFullScreenIcon?: React.CSSProperties
  errorMessage?: React.CSSProperties
}

export interface MapBasicProps extends BasicProps {
  /**
   * the children wil be put under the map in the element tree you can pass absolute element that you want to apply above the map
   */
  children?: React.ReactNode
  /**
   * the pluggins you want to have inside the map they should be compatible with leaflet.
   * They should use the two required props `value` and `setValue` to handle their custom states
   * They will also receive the prop `map?: LeafletMap` of the type `import { Map as LeafletMap } from "leaflet"` to access the currentMap object and also the props `isMobile`, `readonly`, `isFullScreen` to be informed of the state of the current map
   */
  additionnalPlugins?: (MapPlugin & Record<string, any>)[]
  /**
   * the pluggin to have a draggableMarker on the map. When `readonly` is set to `true` its just a simple marker
   */
  draggableMarkerPlugin?: DraggableMarkerNeeds
  /**
   * the initial center of the map
   */
  center?: LatLngExpression
  /**
   * the initial zoom of the map
   */
  zoom?: number
  /**
   * the props passed to the map component
   */
  mapProps?: Partial<MapContainerProps>
  /**
   * the props passed to the TileLayer component
   */
  tileLayerProps?: Partial<TileLayerProps>
  /**
   * the string of the button to open the map in fullscreen on mobile mode
   */
  openFullScreenString?: string
  /**
   * the readonly property passed to the pluggins of the map
   */
  readonly?: boolean
  /**
   * the error message you want to display at the bottom of the map
   */
  errorMessage?: string
  /**
   * The classes applied to the different part of the component
   */
  classes?: MapClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: MapStyles
}

export type MapProps = MergeMuiElementProps<StackProps, MapBasicProps>

export const Map = (props: MapProps) => {
  const {
    children,
    draggableMarkerPlugin,
    center,
    zoom = !center ? defaultPosition.zoom : 40,
    additionnalPlugins,
    openFullScreenString,
    sx,
    readonly = false,
    errorMessage,
    classes,
    styles,
    className,
    mapProps,
    tileLayerProps,
    ...other
  } = props

  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.down('md'))
  const [isFullScreen, setIsFullScreen] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const toggleFullScreen = useCallback(() => {
    if (isFullScreen) {
      document.exitFullscreen()
    } else {
      containerRef.current?.requestFullscreen()
    }
  }, [isFullScreen])

  const onFullScreenChange = useCallback(() => {
    if (document.fullscreenElement === containerRef.current)
      setIsFullScreen(true)
    else setIsFullScreen(false)
  }, [])

  useEffect(() => {
    document.addEventListener('fullscreenchange', onFullScreenChange)

    return () => {
      document.removeEventListener('fullscreenchange', onFullScreenChange)
    }
  }, [onFullScreenChange])

  const [map, setMap] = useState<LeafletMap | undefined>()

  useEffect(() => {
    if (map) {
      if (isSm && !isFullScreen) {
        map.dragging.disable()
      } else {
        map.dragging.enable()
      }
    }
  }, [isSm, isFullScreen, map])

  const plugins = useMemo(
    () =>
      additionnalPlugins?.map((plugin) => {
        const { element, ...other } = plugin
        const PluginElement = element
        return (
          <PluginElement
            {...other}
            isMobile={isSm}
            readonly={readonly}
            isFullScreen={isFullScreen}
            map={map}
          />
        )
      }),
    [additionnalPlugins, readonly, isSm, isFullScreen, map]
  )

  return (
    <Stack
      ref={containerRef}
      sx={{
        position: 'relative',
        zIndex: 0,
        transition: '0.6s',
        ...sx
      }}
      className={cx('AruiMap-root', className)}
      {...other}
    >
      <MapContainer
        {...mapProps}
        //@ts-ignore
        ref={setMap}
        center={center ?? defaultPosition.center}
        zoom={zoom}
        scrollWheelZoom
        className={cx('AruiMap-map', classes?.map)}
        style={{
          height: '100%',
          minHeight: 400,
          width: '100%',
          zIndex: 0,
          ...styles?.map
        }}
      >
        <TileLayer
          {...tileLayerProps}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {!!draggableMarkerPlugin && (
          <DraggableMarker
            draggable={(!isSm || isFullScreen) && !readonly}
            {...draggableMarkerPlugin}
          />
        )}
        {plugins}
      </MapContainer>
      {children}
      {isSm && !isFullScreen && (
        <Button
          className={cx(
            'AruiMap-openFullScreenButton',
            classes?.openFullScreenButton
          )}
          style={styles?.openFullScreenButton}
          sx={{ position: 'absolute', top: '10px', right: '5px' }}
          onClick={toggleFullScreen}
        >
          {openFullScreenString ?? 'open in full screen'}
        </Button>
      )}
      {isFullScreen && (
        <IconButton
          className={cx(
            'AruiMap-closeFullScreenIcon',
            classes?.closeFullScreenIcon
          )}
          style={styles?.closeFullScreenIcon}
          sx={{ position: 'absolute', top: '10px', right: '5px' }}
          onClick={toggleFullScreen}
        >
          <CloseRounded />
        </IconButton>
      )}
      {!!draggableMarkerPlugin && (
        <DraggableMarkerControl
          isFullScreen={isFullScreen}
          isSm={isSm}
          {...draggableMarkerPlugin}
          map={map}
        />
      )}
      {!!errorMessage && (
        <FormHelperText
          sx={{
            position: 'absolute',
            top: '100%',
            color: 'error.main',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            lineHeight: 1.667,
            width: '100%',
            margin: '0',
            marginTop: '3px'
          }}
          className={cx('AruiMap-errorMessage', classes?.errorMessage)}
          style={styles?.errorMessage}
        >
          {errorMessage}
        </FormHelperText>
      )}
    </Stack>
  )
}
