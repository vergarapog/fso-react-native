import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import Text from './Text';
import { useFormik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';
import { useState } from 'react';
import useSignUp from '../hooks/useSignUp';

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
  confirmPassword: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, 'Username must be more than 5 characters')
    .max(30, 'Username must be less than 30 characters')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password must be more than 5 characters')
    .max(50, 'Password must be less than 50 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});

export const SignUpForm = ({ onSubmit, signUpError }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      {!!signUpError && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{signUpError}</Text>
        </View>
      )}
      <TextInput
        style={[styles.input, formik.errors.username && { borderColor: 'red' }]}
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        placeholder="Username"
        autoComplete="off"
        textContentType="none"
      />
      {formik.touched.username && formik.errors.username && <Text style={{ color: 'red' }}>{formik.errors.username}</Text>}
      <TextInput
        style={[styles.input, formik.errors.username && { borderColor: 'red' }]}
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        placeholder="Password"
        secureTextEntry
        autoComplete="new-password"
      />
      {formik.touched.password && formik.errors.password && <Text style={{ color: 'red' }}>{formik.errors.password}</Text>}
      <TextInput
        style={[styles.input, formik.errors.confirmPassword && { borderColor: 'red' }]}
        value={formik.values.confirmPassword}
        onChangeText={formik.handleChange('confirmPassword')}
        placeholder="Confirm password"
        autoComplete="new-password"
        secureTextEntry
      />
      {formik.touched.confirmPassword && formik.errors.confirmPassword && <Text style={{ color: 'red' }}>{formik.errors.confirmPassword}</Text>}

      <Pressable style={styles.submitButton} onPress={formik.handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </Pressable>
    </View>
  );
};

const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  const [signUpError, setSignUpError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      await signUp(values);
      await signIn(values);
      navigate('/');
    } catch (error) {
      setSignUpError(error.message);
    }
  };

  return <SignUpForm onSubmit={onSubmit} signUpError={signUpError} />;
};

export default SignUp;
