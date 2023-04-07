import React, { useState } from 'react'
import { Map, MapBasicProps } from './Map'
import { Meta } from '@storybook/react'
import { Story } from '@storybook/react/types-6-0'
import { MapClasses, MapStyles } from './docs'
import { Geoman } from './Geoman'
import { BrowserRouter } from 'react-router-dom'
import {
  ArgsTable,
  PRIMARY_STORY,
  Primary,
  Description
} from '@storybook/addon-docs'

export default {
  title: 'Forms/Map',
  component: Map,
  parameters: {
    docs: {
      page: () => (
        <>
          <Primary />
          <Description>
            This map is plugin oriented. You can use the default plugin
            `draggableMarkerPlugin` that can add a static or draggable marker on
            the map which is the most basic use case. If you have other use case
            you can plug other component in see the code of the example to view
            how geoman is plugged in to the map.
          </Description>
          <Description>
            in the obect where you add your plugin you must provide `value`,
            `key` and `component`, also `setValue` if the value is mutable. You
            can pass any other props to this object they will passed to your
            component. In your component you can work with the props:
          </Description>
          <Description>
            - `value` and `setValue` that you have provided.
          </Description>
          <Description>
            - `map?: LeafletMap` of the type `import &#123; Map as LeafletMap
            &#125; from "leaflet"` to access the currentMap object.
          </Description>
          <Description>
            - `isMobile`, `readOnly`, `isFullScreen` that are props provided by
            the map to keep you updated with its current state.
          </Description>
          <Description>
            You can use the `MapPluginProps` to type those props
          </Description>
          <ArgsTable story={PRIMARY_STORY} />
        </>
      )
    }
  },
  argTypes: {
    classes: {
      table: {
        type: {
          summary: 'MapClasses',
          detail: MapClasses
        }
      }
    },
    styles: {
      table: {
        type: {
          summary: 'MapStyles',
          detail: MapStyles
        }
      }
    }
  }
} as Meta

export const MapStory: Story<MapBasicProps> = (args: MapBasicProps) => {
  const [geoman, setGeoman] = useState<any>(undefined)
  const [position, setPosition] = useState<any>(undefined)
  console.log(geoman)
  return (
    <BrowserRouter>
      <Map
        {...args}
        style={{ height: 600 }}
        additionalPlugins={[
          {
            key: 'geoman',
            value: geoman,
            setValue: setGeoman,
            element: Geoman
          }
        ]}
        draggableMarkerPlugin={{
          position: position,
          onPositionChange(position, geojson) {
            setPosition(position)
            console.log(geojson)
          }
        }}
      />
    </BrowserRouter>
  )
}

MapStory.args = {}

MapStory.storyName = 'Map'
