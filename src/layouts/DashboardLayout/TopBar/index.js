import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
  makeStyles,
  Link,
  SvgIcon
} from '@material-ui/core';
import { Menu as MenuIcon } from 'react-feather';
import Logo from 'src/components/Logo';
// import Account from './Account';

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: theme.zIndex.drawer + 100,
    boxShadow: 'none',
    backgroundColor: theme.palette.primary.main
  },
  toolbar: {
    minHeight: 64
  }
}));

function TopBar({
  className,
  onMobileNavOpen,
  ...rest
}) {
  const classes = useStyles();
  return (
    <AppBar
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Toolbar className={classes.toolbar}>
        <Hidden mdDown>
          <RouterLink to="/">
            <Logo />
          </RouterLink>
          <Typography
            variant='h2'
            style={{ marginLeft: '15px' }}
          >
            Media Library
          </Typography>
        </Hidden>
        <Box
          ml={2}
          flexGrow={1}
        />
        <Box ml={2}>
          <Link
            variant="h5"
            color="inherit"
            underline="none"
            to="/register"
            component={RouterLink}
          >
            Register
          </Link>
        </Box>
        <Box ml={2}>
          <Link
            variant="h5"
            color="inherit"
            underline="none"
            to="/login"
            component={RouterLink}
          >
            Log in
          </Link>
        </Box>
        <Box ml={2}>
          <Link
            variant="h5"
            color="inherit"
            component={RouterLink}
            underline="none"
          >
            Link
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

export default TopBar;
