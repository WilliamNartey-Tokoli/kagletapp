import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login } from "./components/Login";
import { SplashScreen } from "./components/SplashScreen";
import { HomeScreen } from "./components/HomeScreen";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#EE6C4D",
      light: "#ff9b79",
      dark: "#b53a22",
    },
    secondary: {
      main: "#4C5760",
      light: "#78848d",
      dark: "#242e36",
    },
  },
  // typography: {
  //   fontFamily: ["Nunito", "Roboto"].join(","),
  // },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/">
            <SplashScreen />{" "}
          </Route>
          <Route exact path="/login">
            <Login />{" "}
          </Route>
          <Route exact path="/home">
            <HomeScreen />{" "}
          </Route>
          <Route exact path="/splashscreen">
            <SplashScreen />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}
