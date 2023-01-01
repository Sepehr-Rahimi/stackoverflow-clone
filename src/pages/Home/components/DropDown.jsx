import { useState } from "react"
import {AiFillCaretDown} from 'react-icons/ai'




const DropDown = ({children,title}) => {
    const [isExpand,setIsExpand] = useState(false)
    return(
        <button onClick={() => setIsExpand(!isExpand)} className=" border border-black rounded-md mx-2 w-24 relative">
            <div className="flex items-center justify-center">{title} <AiFillCaretDown/></div>
                {
                    isExpand ? 
                    <div className="absolute my-1 border border-black w-full rounded-md bg-slate-100 flex flex-col items-center">
                        {children}
                    </div> : null
        
                }
        </button>
    )
}


export default DropDown