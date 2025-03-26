import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import Text from './Text';
import { useFormik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import { useState } from 'react';
import useReview from '../hooks/useReview';

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
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .typeError('Rating must be a number')
    .min(0, 'Rating must be at least 0')
    .max(100, 'Rating must be at most 100')
    .required('Rating is required'),
  text: yup.string().optional(),
});

export const ReviewForm = ({ onSubmit, reviewError }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      {!!reviewError && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{reviewError}</Text>
        </View>
      )}
      <TextInput
        style={[styles.input, formik.errors.ownerName && { borderColor: 'red' }]}
        value={formik.values.ownerName}
        onChangeText={formik.handleChange('ownerName')}
        placeholder="Owner name"
        placeholderTextColor="gray"
      />
      {formik.touched.ownerName && formik.errors.ownerName && <Text style={{ color: 'red' }}>{formik.errors.ownerName}</Text>}
      <TextInput
        style={[styles.input, formik.errors.repositoryName && { borderColor: 'red' }]}
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange('repositoryName')}
        placeholder="Repository name"
        placeholderTextColor="gray"
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && <Text style={{ color: 'red' }}>{formik.errors.repositoryName}</Text>}
      <TextInput
        style={[styles.input, formik.errors.rating && { borderColor: 'red' }]}
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')}
        placeholder="Rating (0 to 100)"
        placeholderTextColor="gray"
        keyboardType="numeric"
      />
      {formik.touched.rating && formik.errors.rating && <Text style={{ color: 'red' }}>{formik.errors.rating}</Text>}
      <TextInput
        style={[styles.input, formik.errors.text && { borderColor: 'red' }]}
        value={formik.values.text}
        onChangeText={formik.handleChange('text')}
        placeholder="Review text"
        placeholderTextColor="gray"
        multiline
      />
      {formik.touched.text && formik.errors.text && <Text style={{ color: 'red' }}>{formik.errors.text}</Text>}
      <Pressable style={styles.submitButton} onPress={formik.handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </Pressable>
    </View>
  );
};

const Review = () => {
  const [review] = useReview();
  const [reviewError, setReviewError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const formattedValues = {
        ...values,
        rating: Number(values.rating),
      };

      const data = await review(formattedValues);
      console.log('return', data);
      navigate(`/repository/${data?.createReview?.repositoryId}`);
    } catch (error) {
      setReviewError(error.message);
    }
  };

  return <ReviewForm onSubmit={onSubmit} reviewError={reviewError} />;
};

export default Review;
