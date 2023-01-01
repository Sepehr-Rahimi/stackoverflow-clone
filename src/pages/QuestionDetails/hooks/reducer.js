import * as constant from './constant'


const reducer = (state,action) => {
    switch (action.type) {
        case constant.getData :
            return({
                ...state,
                isLoading : true,
                isError : false,
                data : {}
            })

        case constant.getDataSuccsses : 
            return({
                ...state,
                isLoading : false,
                isError : false,
                data : action.payload,
                votes : action.payload?.rate?.up - action.payload?.rate?.down
            })

        case constant.getDataFail : 
            return({
                ...state,
                isLoading : false,
                isError : true,
                data : {}
            })
            break;

        case constant.upVote : 
            return({
                ...state,
                votes : state.votes + 1
            })

        case constant.downVote : 
            return({
                ...state,
                votes : state.votes - 1
            })
    
        default:
            return state
    }
}


export default reducer