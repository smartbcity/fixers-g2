import { MapContainer, TileLayer } from 'react-leaflet'
import { LatLngExpression, Map as LeafletMap } from 'leaflet'
import {
  FormHelperText,
  IconButton,
  Stack,
  StackProps,
  SxProps,
  Theme,
  useMediaQuery,
  useTheme
} from '@mui/material'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  DraggableMarker,
  DraggableMarkerControl,
  DraggableMarkerNeeds
} from './DraggableMarker'
import 'leaflet/dist/leaflet.css'
import { Button } from '@smartb/g2-components'
import { useSearchParams } from 'react-router-dom'
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

const fullScreenSx: SxProps<Theme> = {
  position: 'fixed',
  width: 'calc(100vw - 20px)',
  height: 'calc(100vh - 20px)',
  top: '10px',
  left: '10px',
  zIndex: 2000
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
    ...other
  } = props

  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.down('md'))
  const [searchParams, setSearchParams] = useSearchParams()

  const isFullScreen = useMemo(
    () => searchParams.get('fullScreenMap') === 'true',
    [searchParams]
  )

  const toggleFullScreen = useCallback(() => {
    setSearchParams(
      { fullScreenMap: !isFullScreen ? 'true' : 'false' },
      { replace: false }
    )
  }, [setSearchParams, isFullScreen])

  const [map, setMap] = useState<LeafletMap | undefined>()

  useEffect(() => {
    if (map) {
      if (isSm && !isFullScreen) {
        map.scrollWheelZoom.disable()
      } else {
        map.scrollWheelZoom.enable()
      }
    }
  }, [isSm, isFullScreen])

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
      sx={{
        position: 'relative',
        zIndex: 0,
        transition: '0.6s',
        ...(isFullScreen ? fullScreenSx : undefined),
        ...sx
      }}
      className={cx('AruiMap-root', className)}
      {...other}
    >
      <MapContainer
        //@ts-ignore
        ref={setMap}
        center={center ?? defaultPosition.center}
        zoom={zoom}
        scrollWheelZoom={isSm && !isFullScreen ? false : true}
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
