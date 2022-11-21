import React, {
  useState,
  useEffect,
  useCallback
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Grid, makeStyles, Container } from '@material-ui/core';
import ProfileDetails from './ProfileDetails';
// import GeneralSettings from './GeneralSettings';
import Page from 'src/components/Page';
import Header from './Header';
import PostListView from './PostListView';
import CreatePostView from './CreatePostView';
import axios from 'axios';
import { API_BASE_URL } from 'src/config';
import { SET_POSTS } from 'src/actions/postActions';

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 24
  }
}));

function General({ className, ...rest }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.account);
  const { posts } = useSelector((state) => state.post);

  console.log("User one ===> ", user);

  const getPosts = () => {
    axios
      .get(`${API_BASE_URL}/user/me`, user)
      .then((response) => {
        dispatch({
          type: SET_POSTS,
          payload: {
            user: response.data.user,
          }
        });
      });
  };



  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Page
      className={classes.root}
      title="Company"
    >
      <Container maxWidth="xl">
        {/* <Header /> */}

        <Grid
          item
          lg={12}
          md={12}
          xl={12}
          xs={12}
        >
          <CreatePostView user={user} />
        </Grid>
      </Container>
    </Page>
  );
}

General.propTypes = {
  className: PropTypes.string
};

export default General;
