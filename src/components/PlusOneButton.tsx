import { Typography } from "@material-ui/core";
import firebase from "firebase";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import React from "react";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import {
  makeStyles,
  Theme,
  createTheme,
  ThemeProvider,
} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    // width: '100%',
    // '& > * + *': {
    //   marginTop: theme.spacing(2),
    //   marginBottom: theme.spacing(2),
    // },
    flexGrow: 1,
  },
  button: {
    alignContent: "center",
    alignItems: "flex-start",
    justify: "center",
    marginTop: theme.spacing(1.1),
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(-1),
    borderRadius: 20,
    padding: "0.5rem 0.8rem",
    textTransform: "none",
  },
  rsvpCount: {
    paddingBottom: 7,
    paddingLeft: 10,
  },
}));

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#EE6C4D",
//       light: "#ff9b79",
//       dark: "#b53a22",
//     },
//     secondary: {
//       main: "#4C5760",
//       light: "#78848d",
//       dark: "#242e36",
//     },
//   },
// });

export interface RsvpDetails {
  eventID?: string;
  rsvpList?: any;
}

const database = firebase.database();

// export interface State extends SnackbarOrigin {
//   open: boolean;
// }

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
let check = false;

function UIDarray(eventID?: string, rsvpList?: any) {
  console.log(eventID);
  const auth = firebase.auth();
  const user = auth.currentUser;
  console.log(typeof rsvpList);

  if (user) {
    if (!rsvpList.includes(user.email)) {
      rsvpList.push(user.email);
      PushFirebase(rsvpList, eventID);
    } else {
      //setCheck(true);
      check = true;
      // snackbar shows up saying you're already going
      // to the event, add to calendar here
    }
  }
}

function PushFirebase(rsvpList?: any, eventID?: string) {
  database.ref("events/" + eventID + "/").update({
    rsvpList: rsvpList,
  });
}

export const PlusOneButton: React.FC<RsvpDetails> = (props: RsvpDetails) => {
  const classes = useStyles();
  const [submitDisabled, setSubmitDisabled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClick1 = () => {
    setOpen1(true);
  };

  // const [state, setState] = React.useState<State>({
  //   open: false,
  //   vertical: "bottom",
  //   horizontal: "center",
  // });

  // const { vertical, horizontal } = state;

  // const handleClose = () => {
  //   setState({ ...state, open: false });
  //   setOpen(false);
  //   //setOpen1(false);
  // };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

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
  });

  function handleDisable() {
    setSubmitDisabled(true);
  }

  function validity() {
    UIDarray(props.eventID, props.rsvpList);
    console.log(check);
    if (check === false) {
      handleClick();
      handleDisable();
      props.rsvpList.length = props.rsvpList.length + 1;
    } else {
      handleClick1();
      handleDisable();
    }
  }

  const buttons = (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Button
          disabled={submitDisabled}
          className={classes.button}
          size="small"
          color="primary"
          onClick={() => {
            validity();
          }}
        >
          I'll join! 😁
        </Button>
      </ThemeProvider>
    </React.Fragment>
  );

  return (
    <div>
      <Typography component="div" align="center">
        <div>
          {buttons}
          <Snackbar
            autoHideDuration={2000}
            //anchorOrigin={{ vertical: "bottom", horizontal }}
            open={open}
            onClose={handleClose}
            //message="Link successfully sent"
            //key={vertical + horizontal}
          >
            <Alert onClose={handleClose} severity="success">
              You're on the list! 👍
            </Alert>
          </Snackbar>

          <Snackbar
            autoHideDuration={2000}
            //anchorOrigin={{ vertical: "bottom", horizontal }}
            open={open1}
            onClose={handleClose}
            //message="Link successfully sent"
            //key={vertical + horizontal}
          >
            <Alert onClose={handleClose} severity="error">
              You've already RSVP'd
            </Alert>
          </Snackbar>
        </div>
      </Typography>
    </div>
  );
};
