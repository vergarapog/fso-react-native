import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import Text from './Text';
import { useFormik } from 'formik';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  input: {
    height: 40,
    margin: 12,
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

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} value={formik.values.username} onChangeText={formik.handleChange('username')} placeholder="Username" />
      <TextInput
        style={styles.input}
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        placeholder="Password"
        secureTextEntry
      />
      <Pressable style={styles.submitButton} onPress={formik.handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;
