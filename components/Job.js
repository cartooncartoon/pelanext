import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import ExploreIcon from "@material-ui/icons/Explore";
import { Modal, Button } from "antd";
import cx from "clsx";
import clsx from "clsx";
import React, { useEffect } from "react";
import styles from "../styles/Job.module.css";

const useStyles = makeStyles((theme) => {
  const family =
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
  return {
    card: {
      display: "flex",
      cursor: "pointer",
      padding: theme.spacing(2.5),
      minWidth: 288,
      width: 600,
      borderRadius: 12,
      boxShadow: "0 2px 4px 0 rgba(138, 148, 159, 0.2)",
      "& > *:nth-child(1)": {
        marginRight: theme.spacing(2),
      },
      "& > *:nth-child(2)": {
        flex: "auto",
      },
      [theme.breakpoints.down("sm")]: {
        width: 350,
      },
      "&:hover": {
        boxShadow: "0 8px 16px 0 rgba(138, 148, 159, 0.2)",
      },
    },
    avatar: {
      transition: "0.3s",
      width: 75,
      height: 75,
      borderRadius: "1rem",
    },
    heading: {
      fontFamily: family,
      fontSize: 16,
      marginBottom: 0,
    },
    subheader: {
      fontFamily: family,
      fontSize: 14,
      color: theme.palette.grey[600],
      letterSpacing: "1px",
      marginBottom: 4,
    },
    location: {
      fontFamily: family,
      fontSize: 14,
      color: theme.palette.grey[600],
      letterSpacing: "1px",
      marginBottom: 4,
      display: "inline-flex",
      flexWrap: "wrap",
      gap: "4px",
    },
    value: {
      marginLeft: 8,
      fontSize: 14,
      color: theme.palette.grey[500],
    },

    joblisting: {
      display: "flex",
      cursor: "pointer",
      padding: theme.spacing(2),
    },
  };
});

export const Job = ({ job }) => {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  let history = useHistory();

  const showModal = () => {
    setVisible(true);
  };

  let url = `http://localhost:1337${job.lister_image.url}`;

  console.log(url);

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  function handleClick() {
    history.push("/home");
  }

  useEffect(() => {
    const pathname = window.location.pathname;
    const jobIdInUrl = pathname.split("/").pop();
    if (jobIdInUrl == job.job_id) {
      setVisible(true);
    }
  }, []);



  const className = useStyles();

  return (
    <div>
        <Modal
          visible={visible}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Return
            </Button>,
            <Button href={job.applicationUrl} 
            target="_blank"
            rel="noreferrer"
            style={{backgroundColor: '#703cdb', borderColor: '#703cdb'}}
            key="apply" type="primary"  
            onClick={handleOk}>
              Apply
            </Button>,
          ]}
        >
            <Grid container direction="row">
            <Avatar src={url} className={className.avatar} style={{marginRight: 16}}/>
            <Box>
              <h3 className={className.heading}> {job.listing_title} </h3>
              <p className={className.subheader}>
                {" "}
                {job.lister_name} • Technology • {job.job_type}
              </p>
              <p className={className.location}>
                {" "}
                <ExploreIcon style={{ width: "15px" }} />
                {job.city}, {job.state}{" "}
              </p>
            </Box>
            </Grid>
        </Modal>

        <Fade
        in={true}
        style={{ transformOrigin: "0 0 0" }}
        {...(true ? { timeout: 500 } : {})}
      >
          <Card
            variant="outlined"
            className={cx(className.card)}
            elevation={1}
            onClick={showModal}
          >
            <Avatar src={url} className={className.avatar} />
            <Box>
              <h3 className={className.heading}> {job.listing_title} </h3>
              <p className={className.subheader}>
                {" "}
                {job.lister_name} • Technology • {job.job_type}
              </p>
              <p className={className.location}>
                {" "}
                <ExploreIcon style={{ width: "15px" }} />
                {job.city}, {job.state}{" "}
              </p>
            </Box>
          </Card>
          </Fade>
    </div>
  );
};

export default Job;
