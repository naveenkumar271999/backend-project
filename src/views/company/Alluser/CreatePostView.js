import React, {
  useState,
  useEffect
} from 'react';
import {
  Avatar,
  Box,
  Card,
  Grid,
  Link,
  makeStyles,
  TextField,
  Typography,
  Button
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useSnackbar } from 'notistack';
import clsx from 'clsx';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import axios from 'axios';
import { API_BASE_URL } from 'src/config';
import { SET_POSTS } from 'src/actions/postActions';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    padding: theme.spacing(2)
  },
  item: {
    padding: theme.spacing(3),
    textAlign: 'start',
    [theme.breakpoints.up('md')]: {
      '&:not(:last-of-type)': {
        borderRight: `1px solid ${theme.palette.divider}`
      }
    },
    [theme.breakpoints.down('sm')]: {
      '&:not(:last-of-type)': {
        borderBottom: `1px solid ${theme.palette.divider}`
      }
    }
  },
  avatar: {
    height: 150,
    width: 150,
    marginRight: theme.spacing(1)
  },
  form: {
    alignItems: 'center',
  },
  submit: {
    marginLeft: '30px'
  },
  submitbox: {
    display: 'flex',
    justifyContent: 'end'
  },
  center: {
    display: 'flex',
    alignItems: 'center'
  }
}));

function CreatePostView({ className, user, ...rest }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  console.log("User Data in All User ==> ", user);

  return (
    <Box my={2}>
      <Card
        className={clsx(classes.root, className)}
        {...rest}
      >
        <Formik
          initialValues={{
            name: user.name,
            email: user.email,
            blog: user.blog
          }}
          validationSchema={Yup.object().shape({
            blog: Yup.string().required('Blog is required'),
          })}
          onSubmit={async (values, {
            setErrors,
            setStatus,
            setSubmitting
          }) => {
            try {
              history.push("/login");
              // const response = await axios.post(`${API_BASE_URL}/user/me`, values);
              // setStatus({ success: response.data.status });
              // setSubmitting(false);
              // enqueueSnackbar('Updated your profile', {
              //   variant: 'success'
              // });
              // axios
              //   .get(`${API_BASE_URL}/company/post`)
              //   .then((response) => {
              //     dispatch({
              //       type: SET_POSTS,
              //       payload: {
              //         posts: response.data.post,
              //       }
              //     });
              //   });
            } catch (error) {
              const message = (error.response && error.response.data.message) || 'Failed post!';
              setStatus({ success: false });
              setErrors({ submit: message });
              setSubmitting(false);
              enqueueSnackbar(message, {
                variant: 'error'
              });
            }
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values
          }) => (
            <form
              // noValidate
              className={clsx(classes.root, className)}
              onSubmit={handleSubmit}
              {...rest}
            >
              <Box>
                <Grid
                  container
                  spacing={3}
                  {...rest}
                >
                  <Grid
                    item
                    lg={2}
                    md={2}
                    xl={2}
                    xs={2}
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                    >
                      <Avatar
                        className={classes.avatar}
                        src={user.image ? `http://localhost:8000/api/images/${user.image}` : ""}
                        alt={user.name}
                      />
                    </Box>
                  </Grid>
                  <Grid
                    item
                    lg={8}
                    md={8}
                    xl={8}
                    xs={8}
                    className={classes.center}
                  >
                    <div>
                      <Box className={classes.form}>
                        <Typography
                          color="inherit"
                          variant="h4"
                        >
                          {user.name}
                        </Typography>
                      </Box>
                      <Box className={classes.form}>
                        <Typography
                          color="inherit"
                          variant="h6"
                        >
                          {user.blog}
                        </Typography>
                      </Box>
                    </div>
                  </Grid>
                  <Grid
                    item
                    lg={2}
                    md={2}
                    xl={2}
                    xs={2}
                    className={classes.center}
                  >
                    <Box className={classes.submitbox}>
                      <Button
                        className={classes.submit}
                        disabled={isSubmitting}
                        type="submit"
                        color="secondary"
                        size="large"
                        variant='contained'
                      >
                        Edit
                      </Button>
                    </Box>
                  </Grid>



                </Grid>

              </Box>
            </form>
          )}
        </Formik>
      </Card>
    </Box>
  );
}

CreatePostView.propTypes = {
  className: PropTypes.string
};

export default CreatePostView;
