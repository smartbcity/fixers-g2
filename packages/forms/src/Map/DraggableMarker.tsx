import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Marker } from 'react-leaflet'
import { LatLngLiteral, Marker as LeafletMarker, Map } from 'leaflet'
import { Button } from '@smartb/g2-components'
import GeoJSON, { Feature, Point } from 'geojson'
import { useTranslation } from 'react-i18next'

export interface DraggableMarkerNeeds {
  position?: LatLngLiteral
  onPositionChange?: (position: LatLngLiteral, geojson: Feature<Point>) => void
}

export interface DraggableMarkerProps extends DraggableMarkerNeeds {
  draggable?: boolean
  map?: Map
}

export const DraggableMarker = (props: DraggableMarkerProps) => {
  const { draggable = false, onPositionChange, position, map } = props
  const [diplayInfo, setDiplayInfo] = useState(draggable)
  const [markerRef, setmarkerRef] = useState<LeafletMarker<any> | null>(null)
  const hasPositionChanged = useRef(false)
  const { t } = useTranslation()

  useEffect(() => {
    setDiplayInfo(draggable)
  }, [draggable])

  useEffect(() => {
    if (!hasPositionChanged.current && position && map) {
      map.setView(position, 10)
    }
  }, [position, map])

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef
        if (marker != null && onPositionChange) {
          onPositionChange(
            marker.getLatLng(),
            GeoJSON.parse(marker.getLatLng(), { Point: ['lat', 'lng'] })
          )
          hasPositionChanged.current = true
        }
      },
      dragstart() {
        setDiplayInfo(false)
      },
      click() {
        setDiplayInfo(false)
      }
    }),
    [onPositionChange, markerRef]
  )

  useEffect(() => {
    if (diplayInfo && !!markerRef) {
      markerRef.bindPopup(t('canDrag')).openPopup()
    } else {
      markerRef?.closePopup()
      markerRef?.unbindPopup()
    }
  }, [diplayInfo, markerRef])

  if (!position) return <></>
  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={setmarkerRef}
    ></Marker>
  )
}

export const DraggableMarkerControl = (
  props: DraggableMarkerProps & {
    map?: Map
    isSm: boolean
    isFullScreen: boolean
    readOnly?: boolean
  }
) => {
  const { onPositionChange, position, map, isSm, isFullScreen, readOnly } =
    props

  const { t } = useTranslation()

  const onAddMarker = useCallback(() => {
    !!map &&
      onPositionChange &&
      onPositionChange(
        map.getCenter(),
        GeoJSON.parse(map.getCenter(), { Point: ['lat', 'lng'] })
      )
  }, [onPositionChange, map])

  const onUseMyLocation = useCallback(() => {
    !!map &&
      navigator.geolocation.getCurrentPosition(
        (event) => {
          const position = {
            lat: event.coords.latitude,
            lng: event.coords.longitude
          }
          if (onPositionChange) {
            onPositionChange(
              position,
              GeoJSON.parse(position, { Point: ['lat', 'lng'] })
            )
            map.flyTo(position, 17, {
              duration: 3
            })
          }
        },
        undefined,
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      )
  }, [onPositionChange, map])

  if (!map || readOnly) return <></>
  return (
    <>
      {(!isSm || isFullScreen) && !position && (
        <Button
          sx={{
            position: 'absolute',
            bottom: isFullScreen && isSm ? '80px' : '20px',
            right: '5px'
          }}
          onClick={onAddMarker}
        >
          {t('addMarker')}
        </Button>
      )}
      {isSm && (
        <Button sx={{ marginTop: '24px' }} onClick={onUseMyLocation}>
          {t('useMyPosition')}
        </Button>
      )}
    </>
  )
}
