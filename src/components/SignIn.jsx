import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import Text from './Text';
import { useFormik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';

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
});

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup.string().min(3, 'Username must be more than 3 characters').required('Username is required'),
  password: yup.string().min(3, 'Password must be more than 3 characters').required('Password is required'),
});

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
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

export default SignIn;
