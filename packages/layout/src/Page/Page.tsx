import { Box, BoxProps } from  '@mui/material'
import { BackButton } from '@smartb/g2-components'
import React, { useEffect, useState } from 'react'
import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'

interface PageClasses {
  header: string
  backButton: string
}

interface PageStyles {
  header: React.CSSProperties
  backButton: React.CSSProperties
}

export interface pageBasicProps extends BasicProps {
  /**
   * the page content
   */
  children?: React.ReactNode
  /**
   * the event triggered when the back button is clicked. If not provided the button wont appear
   */
  onGoBackClick?: (event: React.ChangeEvent<{}>) => void
  /**
   * The label inside the back button
   */
  goBackLabel?: string
  /**
   * Indicates if the header is either relative inside the root component or absolute outside
   */
  fixedHeader?: boolean
  /**
   * The content dislayed in the header component
   */
  headerContent?: React.ReactNode
  /**
   * The classes applied to the different part of the component
   */
  classes?: PageClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: PageStyles
}

export type pageProps = MergeMuiElementProps<BoxProps, pageBasicProps>

export const Page = (props: pageProps) => {
  const {
    children,
    goBackLabel,
    onGoBackClick,
    fixedHeader = false,
    headerContent,
    classes,
    styles,
    ...other
  } = props
  const [headerEl, setHeaderEl] = useState<HTMLDivElement | null>(null)
  useEffect(() => {
    setHeaderEl(document.getElementById('AruiPage-HeaderId') as HTMLDivElement)
  }, [onGoBackClick, headerContent])
  if (fixedHeader)
    return (
      <>
        <Box
          id='AruiPage-HeaderId'
          display='flex'
          width='100%'
          position='absolute'
          className={classes?.header}
          style={styles?.header}
        >
          {onGoBackClick && (
            <BackButton
              onClick={onGoBackClick}
              className={classes?.backButton}
              style={styles?.backButton}
            >
              {goBackLabel}
            </BackButton>
          )}
          {headerContent}
        </Box>
        <Box
          paddingTop={
            headerEl?.offsetHeight ? `${headerEl?.offsetHeight + 10}px` : '40px'
          }
          overflow='auto'
          {...other}
        >
          {children}
        </Box>
      </>
    )
  return (
    <Box {...other}>
      <Box
        id='AruiPage-HeaderId'
        display='flex'
        width='100%'
        position='relative'
        marginBottom='10px'
        className={classes?.header}
        style={styles?.header}
      >
        {onGoBackClick && (
          <BackButton
            onClick={onGoBackClick}
            className={classes?.backButton}
            style={styles?.backButton}
          >
            {goBackLabel}
          </BackButton>
        )}
        {headerContent}
      </Box>
      {children}
    </Box>
  )
}
