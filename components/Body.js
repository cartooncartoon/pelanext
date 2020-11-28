import React, {useEffect, useState} from "react";
import styles from "../styles/Body.module.css";
import Grid from '@material-ui/core/Grid';
import Job from './Job'
import moment from 'moment';


const Body = ({jobs}) => {

  const timestamp = new Date();
  const friendlyTimestamp = moment(timestamp).format("LLLL");

  return (
    <div className="body scrollbar">
    <div style={{display: 'grid', position: 'relative', width: '100%', alignItems: 'center', justifyContent: 'center'}}>
        <div className="timestamp">{friendlyTimestamp}
        </div>
        <div className="timestamp"><p>
          
          <a href="https://www.iubenda.com/terms-and-conditions/51012749" target="_blank">Terms</a> • <a href="https://www.iubenda.com/privacy-policy/51012749" target="_blank">Privacy</a> • <a>Support</a> • <a>Create A Post</a></p></div>
        </div>
      <div className="content scrollable">
      <Grid container direction="column" justify="center" alignItems="center"  style={{overflow: "hidden"}}>
      <Grid item xs={12}>
        <Grid container direction="column"  spacing={2}>
          {jobs.map((job) => (
            <Grid key={job} item >
              <Job job={job}/>
            </Grid>
          ))}
        </Grid>
      </Grid>
      </Grid>
      </div>
    </div>
  );
};

export default Body;
