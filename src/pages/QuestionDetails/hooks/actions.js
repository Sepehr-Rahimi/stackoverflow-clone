
import * as constant from './constant'

export const getDataAction = () => ({ type : constant.getData })
export const getDataSuccssesAction = (payload) => ({ type : constant.getDataSuccsses , payload })
export const getDataFailAction = () => ({ type : constant.getDataFail })
export const upVote = () => ({ type : constant.upVote })
export const downVote = () => ({ type : constant.downVote })