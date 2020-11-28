import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FilterListIcon from "@material-ui/icons/FilterList";
import SendIcon from "@material-ui/icons/Send";
import { Modal, Button } from "antd";
import clsx from "clsx";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import React from "react";
import styles from "../styles/Footer.module.css"

const useStyles = makeStyles((theme) => ({
  input: {
    minWidth: 288,
    width: 650,
    [theme.breakpoints.down("sm")]: {
      width: 350,
    },
  },
}));
const Footer = ({ query, sendQuery, setQuery }) => {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  console.log(query);

  const filterIcon = () => (
    <div style={{ display: "inline-flex", justifyContent: "space-between" }}>
      Filter{" "}
    </div>
  );

  const showModal = () => {
    setVisible(true);
  };

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

  const className = useStyles();

  return (
    <div className={styles.barWrapper}>
      <Modal
        title={filterIcon()}
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button style={{backgroundColor: '#703cdb', borderColor: '#703cdb' }}key="apply" type="primary"  onClick={handleOk}>
            Apply
          </Button>,
        ]}
      >
        <form style={{ display: "grid", gridGap: 20 }}>
          <TextField variant="outlined" label="Location 📍"  />
          <TextField variant="outlined" label="Job Field  💼"/>
          <FormControl variant="outlined">
          <InputLabel htmlFor="age-native-simple">Job Type 👨‍💼👩‍💼</InputLabel>
          <Select native 
          label="Job Type 👨‍💼👩‍💼" 
          inputProps={{
            name: 'age',
            id: 'age-native-simple',
          }}>
          <option aria-label="None" value="" />
          <option value={10}>Full-Time</option>
          <option value={20}>Part-Time</option>
          <option value={30}>Internship</option>
          </Select>
          </FormControl>
        </form>
      </Modal>
      <div className={clsx(className.input, styles.bar)}>
        <input
          className={styles.searchbar}
          type="text"
          placeholder="Type a message..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(event) =>
            event.key === "Enter" ? sendQuery(event) : null
          }
        />
        <SendIcon onClick={sendQuery} className={styles.send} />
        <FilterListIcon onClick={showModal} className={styles.filter}/>
      </div>
    </div>
  );
};

export default Footer;