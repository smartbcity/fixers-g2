import React from 'react'
import { highLevelStyles } from '@smartb/archetypes-ui-themes'
import { DocsContainer } from '@storybook/addon-docs'
import "./font.css"

const useStyles = highLevelStyles()({
    markdownBody: {
        '& .sbdocs-p': {
            margin: 0,
            marginBottom: '10px',
            fontSize: '14px'
        },
        '& .sbdocs-h1, & .sbdocs-h2, & .sbdocs-h3, & .sbdocs-h4, & .sbdocs-h5, & .sbdocs-h6': {
            marginTop: '20px',
            marginBottom: '13px',
        },
        '& .sbdocs-h2, & .sbdocs-h3, & .sbdocs-h4, & .sbdocs-h5, & .sbdocs-h6': {
            borderBottom: '1px solid rgba(0,0,0,.1)'
        },
        '& .sbdocs-hr': {
            height: '.15em',
            margin: '15px 0',
            background: '#b7c0c9',
            borderRadius: '20px',
            border: "none"
        },
        '& article': {
            padding: '15px 0',
            borderBottom: 'solid 1px #b7c0c9'
        },
        '& article p:last-of-type': {
            margin: 0
        },
        '& article:last-of-type': {
            borderBottom: 'none'
        },
        '& blockquote': {
            margin: '10px 0'
        },
        "& .sbdocs-a:hover": {
            textDecoration: "underline"
        },
        "& .sbdocs-a code": {
            color: "#4174b0"
        },
        "& .sbdocs-a": {
            color: "#4174b0"
        },
        "& em": {
            fontWeight: "600"
        },
        "& .sbdocs-wrapper": {
            padding: "2rem 15px"
        },
        "& .sbdocs-content": {
            maxWidth: "1500px"
        },
        "& .sbdocs, .MuiTypography-root": {
            fontFamily: "'Atkinson Hyperlegible', sans-serif"
        },
        "& code": {
            fontFamily: "ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace"
        },
        "& pre code": {
            fontFamily: "monospace"
        },
        "& .AruiDescriptedCode-root": {
            width: "100%",
            marginLeft: "-15px",
            padding: "20px 15px",
            marginBottom: "30px"
        },
        "& .sbdocs-content .AruiDescriptedCode-root:nth-of-type(odd)": {
            background: "#fafcfc",
        }
    }
})

export const StorybookCanvas = ({ children, context }: any) => {
    const classes = useStyles()
    return (
        <div className={classes.markdownBody}>
            <DocsContainer context={context}>
                {children}
            </DocsContainer>
        </div>
    )
}
