import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  withStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  FormHelperText,
} from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/dCandidate";
import { useToasts } from "react-toast-notifications";

const styles = (theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      minWidth: 230,
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 230,
  },
  smMargin: {
    margin: theme.spacing(1),
  },
});

const initialFieldValues = {
  fullName: "",
  mobile: "",
  email: "",
  age: "",
  bloodGroup: "",
  address: "",
};

const DCandidateForm = ({ classes, ...props }) => {
  const { addToast } = useToasts();

  const validate = (fieldValues = values) => {
    const temp = { ...errors };
    if ("fullName" in fieldValues)
      temp.fullName = fieldValues.fullName ? "" : "This field is required.";
    if ("mobile" in fieldValues)
      temp.mobile = fieldValues.mobile ? "" : "This field is required.";
    if ("bloodGroup" in fieldValues)
      temp.bloodGroup = fieldValues.bloodGroup ? "" : "This field is required.";
    if ("email" in fieldValues)
      temp.email = /^.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Email is not valid.";
    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useForm(initialFieldValues, validate, props.setCurrentId);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const onSuccess = () => {
        resetForm();
        addToast("Submitted successfully.", { appearance: "success" });
      };
      if (props.currentId == 0) {
        props.createDCandidate(values, onSuccess);
      } else {
        props.updateDCandidate(props.currentId, values, onSuccess);
      }
    }
  };

  useEffect(() => {
    if (props.currentId != 0) {
      setValues({
        ...props.dCandidateList.find((x) => x.id == props.currentId),
      });
      setErrors({});
    }
  }, [props.currentId]);

  return (
    <form
      autoComplete="off"
      noValidate
      className={classes.root}
      onSubmit={handleSubmit}
    >
      <Grid container>
        <Grid item xs={6}>
          <TextField
            name="fullName"
            label="Full Name"
            variant="outlined"
            value={values.fullName}
            onChange={handleInputChange}
            {...(errors.fullName && {
              error: true,
              helperText: errors.fullName,
            })}
          />
          <TextField
            name="email"
            label="Email"
            variant="outlined"
            value={values.email}
            onChange={handleInputChange}
            {...(errors.email && {
              error: true,
              helperText: errors.email,
            })}
          />
          <FormControl
            variant="outlined"
            className={classes.formControl}
            {...(errors.bloodGroup && {
              error: true,
            })}
          >
            <InputLabel id="bloodGroup">Blood Group</InputLabel>
            <Select
              name="bloodGroup"
              value={values.bloodGroup}
              onChange={handleInputChange}
            >
              <MenuItem value="">Select Blood Group</MenuItem>
              <MenuItem value="A+">A+</MenuItem>
              <MenuItem value="B+">B+</MenuItem>
              <MenuItem value="AB+">AB+</MenuItem>
              <MenuItem value="O+">O+</MenuItem>
              <MenuItem value="A-">A-</MenuItem>
              <MenuItem value="B-">B-</MenuItem>
              <MenuItem value="AB-">AB-</MenuItem>
              <MenuItem value="O-">O-</MenuItem>
            </Select>
            {errors.bloodGroup && (
              <FormHelperText>{errors.bloodGroup}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="mobile"
            label="Mobile"
            variant="outlined"
            value={values.mobile}
            onChange={handleInputChange}
            {...(errors.mobile && {
              error: true,
              helperText: errors.mobile,
            })}
          />
          <TextField
            name="age"
            label="Age"
            variant="outlined"
            value={values.age}
            onChange={handleInputChange}
          />
          <TextField
            name="address"
            label="Address"
            variant="outlined"
            value={values.address}
            onChange={handleInputChange}
          />
          <Button
            className={classes.smMargin}
            variant="contained"
            color="primary"
            type="submit"
          >
            Submit
          </Button>
          <Button
            className={classes.smMargin}
            variant="contained"
            onClick={resetForm}
          >
            Reset
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

const mapStateToProps = (state) => ({
  dCandidateList: state.dCandidate.list,
});

const mapActionToProps = {
  createDCandidate: actions.create,
  updateDCandidate: actions.update,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(DCandidateForm));
