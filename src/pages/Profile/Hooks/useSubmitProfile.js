import axios from "axios"
import { useFormik } from "formik"
import { useState } from "react"
import Endpoints from "../../../constants/APIs"
import * as Yup from 'yup'
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'





const useSubmitProfile = (id) => {
    const [isUploading,setIsUploading] = useState(false)
    const [isError,setIsError] = useState(false)
    const navigate = useNavigate()



    const profileUpdateToast = () => toast.success('Profile updated successfully', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    


    const formik = useFormik({
        initialValues : {
            fullName : '',
            email : '',
            picUrl : ''
        },
        onSubmit : async(values) => {
            try {
                setIsUploading(true)
                setIsError(false)
                await axios.patch(Endpoints.patchProfile(id),{...values})
                setIsUploading(false)
                setIsError(false)
            } catch(e) {
                setIsUploading(false)
                setIsError(true)
            }
            navigate('/')
            profileUpdateToast()
        },
        validationSchema : Yup.object({
            fullName : Yup.string()
            .required('Required'),

            email : Yup.string()
            .email('Enter valid email')
            .required('Required'),

            picUrl : Yup.string()
            .url('Enter valid url')
            .required('Required')
        }),
        
    })

    return {
        isUploading,
        isError,
        onChange : formik.handleChange,
        onSubmit : formik.handleSubmit,
        onBlur : formik.handleBlur,
        isTouched : formik.touched,
        values : formik.values,
        errors : formik.errors
    }



}


export default useSubmitProfile