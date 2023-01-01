import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from 'yup';
import { toast } from "react-toastify";


import Endpoints from '../../../constants/APIs';


const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(10, 'Too Short!')
    .max(150, 'Too Long!')
    .required('Please fill this input'),

  description: Yup.string()
    .min(100, 'Too Short!')
    .required('Please fill this input'),
});


const questionUploadToast = () => toast.success('Question submited successfully', {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  });

const useSubmitQuestion = ({ afterSubmission }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const formik = useFormik({
    initialValues: {
      title: '',
      description: ''
    },

    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        await axios.post(Endpoints.postQuestion(), {
          ...values,
          created_at: new Date(),
          author: 'Hesan',
          rate: { up: 0, down: 0, total: 0 },
          answers: {
            total: 0,
            quotes: []
          },
          views: 0,
          tags: [],
          comments: []
        });
        setIsLoading(false);
        if (afterSubmission && typeof afterSubmission === 'function') afterSubmission();
        questionUploadToast()
      } catch (e) {
        setIsLoading(false);
        setError(false);
      }
    },
    validationSchema,

  })

  return {
    isLoading,
    error,
    values: formik.values,
    errors: formik.errors,
    onChange: formik.handleChange,
    onSubmit: formik.handleSubmit,
  }
};

export default useSubmitQuestion;