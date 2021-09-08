import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { SBButton, Panel, Card } from "../../packages/components/src";
import { getShadows } from "./Theme";
import ThemeGetter from "./ThemeGetter";
import { ThemeColors, useThemeContext } from "@smartb/g2-themes";

const useStyles = makeStyles(() =>
  createStyles({
    card: {
      width: "150px",
      height: "150px",
      boxShadow: "rgba(0, 0, 0, 0.2) -3px -5px inset",
      margin: "10px",
      borderRadius: "5px",
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
    },
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      flexWrap: "wrap",
      width: "100%",
    },
    root: {
      width: "100%",
      border: "#dbdbdb 1px solid",
      borderRadius: "10px",
      marginBottom: "20px",
    },
    header: {
      width: "80%",
      marginLeft: "10%",
      borderBottom: "#dbdbdb 1px solid",
      display: "flex",
      padding: "15px",
      justifyContent: "center",
      flexDirection: "column",
    },
    image: {
      maxWidth: "500px",
      maxHeight: "200px",
    },
    text: {
      color: "black",
    },
    inputContainer: {
      display: "inline-flex",
      flexWrap: "wrap",
    },
    input: {
      width: "20px",
    },
  })
);

const ThemeOverview = () => {
  const classes = useStyles();
  const themeContext = useThemeContext();
  const onColorChange = (props: keyof ThemeColors, color: string) => {
    themeContext.changeTheme({ [props]: color });
    localStorage.setItem(props as string, color);
  };

  const onShadowChange = (index: number, values: string) => {
    let newValues = [...themeContext.theme.shadows];
    newValues[index] = values;
    const stringShadow = `${values[0]}px ${values[1]}px ${values[2]}px ${values[3]}px rgba(${values[4]},${values[5]},${values[6]},${values[7]})`;
    themeContext.changeTheme({
      shadows: getShadows(stringShadow),
    });
    localStorage.setItem("shadows", stringShadow);
  };

  return (
    <>
      <div className={classes.root}>
        <div className={classes.header}>
          <Typography variant="subtitle2">
            Il vous suffit de définir uniquement la première élévation et toutes
            les autres seront calculées automatiquement:
          </Typography>
          <div className={classes.inputContainer}>
            boxShadow:{" "}
            <input
              className={classes.input}
              id="shadow0"
              type="text"
              onChange={(event) => onShadowChange(0, event.target.value)}
              value={themeContext.theme.shadows[0]}
            />
            px{" "}
            <input
              className={classes.input}
              id="shadow1"
              type="text"
              onChange={(event) => onShadowChange(1, event.target.value)}
              value={themeContext.theme.shadows[1]}
            />
            px{" "}
            <input
              className={classes.input}
              id="shadow2"
              type="text"
              onChange={(event) => onShadowChange(2, event.target.value)}
              value={themeContext.theme.shadows[2]}
            />
            px{" "}
            <input
              className={classes.input}
              id="shadow3"
              type="text"
              onChange={(event) => onShadowChange(3, event.target.value)}
              value={themeContext.theme.shadows[3]}
            />
            px rgba(
            <input
              className={classes.input}
              id="shadow4"
              type="text"
              onChange={(event) => onShadowChange(4, event.target.value)}
              value={themeContext.theme.shadows[4]}
            />
            ,
            <input
              className={classes.input}
              id="shadow5"
              type="text"
              onChange={(event) => onShadowChange(5, event.target.value)}
              value={themeContext.theme.shadows[5]}
            />
            ,
            <input
              className={classes.input}
              id="shadow6"
              type="text"
              onChange={(event) => onShadowChange(6, event.target.value)}
              value={themeContext.theme.shadows[6]}
            />
            ,
            <input
              className={classes.input}
              id="shadow7"
              type="text"
              onChange={(event) => onShadowChange(7, event.target.value)}
              value={themeContext.theme.shadows[7]}
            />
            )
          </div>
        </div>
        <div className={classes.container}>
          <Card header="elevation 1" elevation={1} style={{ width: "300px" }}>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
          </Card>
          <Card header="elevation 6" elevation={6} style={{ width: "300px" }}>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
          </Card>
          <Card header="elevation 12" elevation={12} style={{ width: "300px" }}>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
          </Card>
        </div>
      </div>
      <div className={classes.root}>
        <div className={classes.header}>
          <div className={classes.inputContainer}>
            primaryColor:{" "}
            <input
              type="text"
              onChange={(event) => onColorChange("primary", event.target.value)}
              value={themeContext.theme.colors.primary}
            />
          </div>
        </div>
        <div className={classes.container}>
          <Card header="Primary Color" style={{ width: "300px" }}>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
          </Card>
        </div>
      </div>
      <div className={classes.root}>
        <div className={classes.header}>
          <div className={classes.inputContainer}>
            secondaryColor:{" "}
            <input
              type="text"
              onChange={(event) =>
                onColorChange("secondary", event.target.value)
              }
              value={themeContext.theme.colors.secondary}
            />
          </div>
        </div>
        <div className={classes.container}>
          <SBButton style={{ margin: "20px" }}>Secondary Color</SBButton>
        </div>
      </div>
      <div className={classes.root}>
        <div className={classes.header}>
          <div className={classes.inputContainer}>
            tertiaryColor:{" "}
            <input
              type="text"
              onChange={(event) =>
                onColorChange("tertiary", event.target.value)
              }
              value={themeContext.theme.colors.tertiary}
            />
          </div>
        </div>
        <div className={classes.container}>
          <Panel style={{ margin: "20px", width: "500px" }}>
            Tertiary Color
          </Panel>
        </div>
      </div>
      <ThemeGetter myTheme={themeContext.theme} />
    </>
  );
};

export default ThemeOverview;
