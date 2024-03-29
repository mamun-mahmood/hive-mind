import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Avatar, Box } from "@material-ui/core";
import db from "../../firebase";
import PostBody from "./PostBody";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import "./NotificationCard.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 400,
    borderRadius: 0,
    marginTop: 10,
    cursor: "pointer",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "60vw",
    marginLeft: "20vw",
    border: "1px solid #000",
    maxHeight: "80vh",
    marginTop: "10vh",
  },
}));
const NotificationCard = ({ data }) => {
  const classes = useStyles();
  const handleNotification = () => {
    if (!data.data.isRead) {
      db.collection("notification").doc(data.id).update({
        isRead: true,
      });
    }
    setOpen(true);
  };
  const [open, setOpen] = useState(false);
  return (
    <>
      <Card
        className="notification-card"
        style={{
          backgroundColor: `${data.data.isRead ? "white" : "#ebebeb"}`,
          minWidth: 275,
          borderRadius: 10,
          marginTop: 10,
          cursor: "pointer",
        }}
      >
        <CardContent
          onClick={handleNotification}
          className="notification-card"
          style={{ display: "flex", alignItems: "center" }}
        >
          <Avatar
            src={data.data.photoURL}
            style={{ padding: 5, marginRight: 5 }}
          />
          <p>{data.data.notification}</p>
        </CardContent>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => setOpen(false)}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          onBackdropClick={() => setOpen(false)}
          className="noti_box"
        >
          {/* <Fade in={open}> */}
          <Box
            className="hide-scrollbar noti_box"
            style={{
              overflowY: "scroll",
              height: "100%",
              width: "100%",
            }}
          >
            <PostBody id={data.data.postId} />
          </Box>
          {/* </Fade> */}
        </Dialog>
      </Card>
    </>
  );
};

export default NotificationCard;
