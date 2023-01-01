import { useState } from "react"
import useProfile from "../../hooks/useProfile"
import axios from "axios"
import Endpoints from "../../constants/APIs"
import useSubmitProfile from "./Hooks/useSubmitProfile"
import { RenderWhen, Error } from "../../components"
import { useDispatch } from "react-redux"
import { increment , decrement , setTo } from '../../Redux/CounterSlicer'



const Profile = () => {

    const [profile,isLoading,error] = useProfile()
    const [fullName,setFullName] = useState()
    const [email,setEmail] = useState()
    const [picUrl,setPicUrl] = useState()
    const {errors,isError,isUploading,onChange,onSubmit,values,isTouched,onBlur} = useSubmitProfile(profile.id)
    const  dispatch = useDispatch()


    return(
        <>
            <RenderWhen condition={profile && !isLoading && !error} >
                <form onSubmit={onSubmit} className="flex items-center justify-between bg-slate-200 rounded-lg p-5 w-full my-5 flex-wrap shadow-black shadow-md">
                    <div className="flex flex-col mx-5 text-xl bg-white rounded-lg p-5 shadow-md shadow-black ">
                        <div className="my-2 py-2 w-full">
                            <label htmlFor="fullName">Full name : </label>
                            <input onBlur={onBlur} name="fullName" onChange={onChange} value={values.fullName} className="px-2 py-2 b-slate-200 border rounded-lg w-full" type="text" placeholder={profile.fullName} />
                            <RenderWhen condition={(errors.fullName && isTouched.fullName)}>
                                <div className='py-1 text-xs text-red-500'>{errors.fullName}</div>
                            </RenderWhen>
                        </div>
                        <div className="my-2 py-2 w-full">
                            <label htmlFor="email">Email : </label>
                            <input onBlur={onBlur} name="email" onChange={onChange} value={values.email} className="px-2 py-2 b-slate-200 border rounded-lg w-full" type="text" placeholder={profile.email} />
                            <RenderWhen condition={errors.email && isTouched.email}>
                                <div className='py-1 text-xs text-red-500'>{errors.email}</div>
                            </RenderWhen>
                        </div>
                        <div className="my-2 py-2 w-full">
                            <label htmlFor="picUrl">Picture URL : </label>
                            <input onBlur={onBlur} name="picUrl" onChange={onChange} value={values.picUrl} className="px-2 py-2 b-slate-200 border rounded-lg w-full" type="text" placeholder={profile.picUrl} />
                            <RenderWhen condition={errors.picUrl && isTouched.picUrl}>
                                <div className='py-1 text-xs text-red-500'>{errors.fullName}</div>
                            </RenderWhen>
                        </div>
                        <button type="submit" className="shadow-black shadow w-32 rounded-lg mx-auto hover:bg-slate-200">Edit</button>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <img className="rounded-full w-[200px]"  src={profile.picUrl} alt={profile.fullName} />
                    </div>
                </form>
            </RenderWhen>
            <RenderWhen condition={isLoading}>
                <div>Is loading ...</div>
            </RenderWhen>
            <RenderWhen condition={!isLoading && isError}>
                <Error  />
            </RenderWhen>
            <RenderWhen condition={isUploading}>
                Uploading data
            </RenderWhen>
            <RenderWhen condition={isError}>
                Something wrong during uploading !
            </RenderWhen>
            <button onClick={() => dispatch(increment())} >Increase</button>
            <button onClick={() => dispatch(decrement())} >Decrease</button>
        </>
    )
}


export default Profile