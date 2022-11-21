import React, {
  useRef,
  useState
} from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Formik, setNestedObjectValues } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  FormHelperText,
  TextField,
  Typography,
  Link,
  makeStyles
} from '@material-ui/core';
import { register } from 'src/actions/accountActions';

const useStyles = makeStyles(() => ({
  root: {
  },
  uploadImage: {
    width: '200px',
    height: '150px',
    padding: '0px'
  },
  imagePreview: {
    width: '200px',
    height: '150px',
    borderRadius: '4px'
  },
  justifyCenter: {
    display: 'flex',
    justifyContent: 'center'
  }
}));

function RegisterForm({ className, onSubmitSuccess, ...rest }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [imgSrc, setImgSrc] = useState("");
  const [image, setImage] = useState();


  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        blog: '',
        image: ''
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().max(255).required('name is required'),
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        password: Yup.string().min(7).max(255).required('Password is required'),
        blog: Yup.string().max(1255),
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        console.log("@@@@");
        try {

          const formData = new FormData();

          formData.append('name', values.name);
          formData.append('email', values.email);
          formData.append('password', values.password);
          formData.append('blog', values.blog);
          formData.append('image', values.image);

          console.log("value => ", values);

          await dispatch(register(formData));
          onSubmitSuccess();
        } catch (error) {
          setStatus({ success: false });
          setErrors({ submit: error.message });
          setSubmitting(false);
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
        values,
        setFieldValue
      }) => (
        <form
          className={clsx(classes.root, className)}
          onSubmit={handleSubmit}
          {...rest}
        >
          <Box
            className={classes.justifyCenter}
            mt={4} mb={4}
          >
            <label htmlFor="upload-photo">
              <input
                style={{ display: 'none' }}
                id="upload-photo"
                name="upload-photo"
                type="file"
                accept="image/*"
                onChange={(event) => {
                  const image = event.target.files[0];
                  setFieldValue('image', image);
                  const fileReader = new FileReader();
                  fileReader.onload = (e) => {
                    const { result } = e.target;
                    if (result) {
                      setImgSrc(result)
                    }
                  }
                  fileReader.readAsDataURL(image);
                }}
              />
              {imgSrc ? (
                <Box
                  className={classes.uploadImage}
                >
                  <img className={classes.imagePreview} src={imgSrc} alt="image upload" />
                </Box>
              ) : (
                <Button
                  className={classes.uploadImage}
                  color="secondary"
                  variant="outlined"
                  component="span"
                >
                  <Box>
                    Add User Avatar
                  </Box>
                </Button>
              )}
            </label>
          </Box>
          <TextField
            error={Boolean(touched.name && errors.name)}
            fullWidth
            helperText={touched.name && errors.name}
            label="User name"
            margin="normal"
            name="name"
            onBlur={handleBlur}
            onChange={handleChange}
            type="name"
            value={values.name}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.email && errors.email)}
            fullWidth
            helperText={touched.email && errors.email}
            label="Email Address"
            margin="normal"
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            type="email"
            value={values.email}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.password && errors.password)}
            fullWidth
            helperText={touched.password && errors.password}
            label="Password"
            margin="normal"
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.profession && errors.profession)}
            fullWidth
            helperText={touched.profession && errors.profession}
            label="Blog"
            margin="normal"
            name="blog"
            onBlur={handleBlur}
            onChange={handleChange}
            type="blog"
            multiline
            rows={5}
            value={values.profession}
            variant="outlined"
          />
          {Boolean(touched.policy && errors.policy) && (
            <FormHelperText error>
              {errors.policy}
            </FormHelperText>
          )}
          <Box mt={2}>
            <Button
              color="secondary"
              disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Create account
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
}

RegisterForm.propTypes = {
  className: PropTypes.string,
  onSubmitSuccess: PropTypes.func
};

RegisterForm.default = {
  onSubmitSuccess: () => { }
};

export default RegisterForm;
