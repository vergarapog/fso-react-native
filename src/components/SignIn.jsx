import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import Text from './Text';
import { useFormik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';
import { useState } from 'react';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 12,
  },
  input: {
    height: 40,
    marginBlock: 12,
    borderWidth: 1,
    padding: 10,
  },
  submitButton: {
    display: 'flex',
    alignItems: 'center',
    margin: 12,
    borderRadius: 6,
    padding: 6,
    width: 'full',
    color: theme.colors.white,
    backgroundColor: theme.colors.primary,
  },
  submitButtonText: {
    color: theme.colors.white,
  },
  errorContainer: {
    backgroundColor: theme.colors.redError,
    padding: 10,
    borderRadius: 4,
    marginBottom: 10,
  },
  errorText: {
    color: theme.colors.white,
    textAlign: 'center',
  },
});

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup.string().min(3, 'Username must be more than 3 characters').required('Username is required'),
  password: yup.string().min(3, 'Password must be more than 3 characters').required('Password is required'),
});

export const SignInForm = ({ onSubmit, loginError }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      {!!loginError && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{loginError}</Text>
        </View>
      )}
      <TextInput
        style={[styles.input, formik.errors.username && { borderColor: 'red' }]}
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        placeholder="Username"
      />
      {formik.touched.username && formik.errors.username && <Text style={{ color: 'red' }}>{formik.errors.username}</Text>}
      <TextInput
        style={[styles.input, formik.errors.username && { borderColor: 'red' }]}
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        placeholder="Password"
        secureTextEntry
      />
      {formik.touched.password && formik.errors.password && <Text style={{ color: 'red' }}>{formik.errors.password}</Text>}
      <Pressable style={styles.submitButton} onPress={formik.handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const data = await signIn(values);
      navigate('/');
    } catch (error) {
      setLoginError('Invalid username or password');
      console.log(error);
    }
  };

  return <SignInForm onSubmit={onSubmit} loginError={loginError} />;
};

export default SignIn;
