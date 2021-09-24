import React from 'react'
import { BasicProps } from '@smartb/g2-themes'
import { Box } from  '@mui/material'
import {makeStyles} from "@mui/styles"
import { FilePreview } from '../FilePreview'
import { Folder } from './Folder'

const useStyles = makeStyles(() => ({
  container: {
    width: '100%'
  },
  file: {
    width: '150px',
    height: '150px',
    margin: '10px'
  },
  folder: {
    width: '150px',
    height: '150px',
    margin: '10px'
  }
}))

export type FolderItemType = 'file' | 'folder'

interface FolderClasses {
  folder?: string
  file?: string
}

interface FolderStyles {
  folder?: React.CSSProperties
  file?: React.CSSProperties
}

export interface FolderItem {
  type: FolderItemType
  label: string
  key: string
  onClick?: () => void
  src?: string
  items?: FolderItem[]
  hoverComponent?: React.ReactNode
  isLoading?: boolean
  validated?: boolean
}

export interface FilesPanelProps extends BasicProps {
  /**
   * Main folder that will be use to display other files or folders that are located inside the main folder
   */
  folder: FolderItem
  /**
   * The classes applied to the different part of the component
   */
  classes?: FolderClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: FolderStyles
}

export const FilesPanel = (props: FilesPanelProps) => {
  const { folder, className, id, style, classes, styles } = props
  const defaultClasses = useStyles()
  return (
    <Box
      display='flex'
      flexWrap='wrap'
      className={`${className} ${defaultClasses.container}`}
      id={id}
      style={style}
    >
      {folder.items?.map((item) => {
        if (item.type === 'file')
          return (
            <FilePreview
              title={item.label}
              url={item.src}
              className={`${classes?.file} ${defaultClasses.file}`}
              style={styles?.file}
              onClick={item.onClick}
              key={item.key}
              hoverComponent={item.hoverComponent}
              isLoading={item.isLoading}
              readonly
              validated={item.validated}
            />
          )
        return (
          <Folder
            title={item.label}
            className={`${classes?.folder} ${defaultClasses.folder}`}
            style={styles?.folder}
            onClick={item.onClick}
            key={item.key}
          />
        )
      })}
    </Box>
  )
}
