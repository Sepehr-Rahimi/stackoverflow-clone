import { useState } from "react"



const useRerender = () => { 
    const [renderCommand,setRenderCommand] = useState(false)

    const rerender = () => {
        setRenderCommand(!renderCommand)
    }


    return [
        rerender
    ]
    


}

export default useRerender