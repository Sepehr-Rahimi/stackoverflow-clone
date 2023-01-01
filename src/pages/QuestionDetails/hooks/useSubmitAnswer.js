
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from 'yup';
import { toast } from "react-toastify";


import Endpoints from '../../../constants/APIs';


const validationSchema = Yup.object().shape({
  description: Yup.string()
    .min(50, 'Too Short!')
    .required('Please fill this input'),
});


const questionUploadToast = () => toast.success('Answer submited successfully', {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  });

const useSubmitAnswer = (id) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const formik = useFormik({
      initialValues: {
          description: ''
        },
        onSubmit: async (values) => {
            try {
                setIsLoading(true);
                const {data : selectedQuestion} = await axios.get(Endpoints.getQuestionById(id))
                await axios.patch(Endpoints.getQuestionById(id), { 
                        answers : {
                            total : selectedQuestion.answers.total + 1 ,
                            quotes : [
                                ...selectedQuestion.answers.quotes,
                                {
                                    ...values,
                                    user : {
                                        name : 'Sepehr Rahimi',
                                        points : 80,
                                        
                                    },
                                    is_verified : true ,
                                    rate : {
                                        up : 0,
                                        down : 0 ,
                                        total : 0
                                    },
                                    comments : [] ,
                                }

                            ]

            }
            

        });
        setIsLoading(false);
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

export default useSubmitAnswer;