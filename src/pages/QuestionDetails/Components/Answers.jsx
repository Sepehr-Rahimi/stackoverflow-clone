import { RenderWhen } from "../../../components"
import { useRef } from "react";
import axios from "axios";
import Endpoints from "../../../constants/APIs";





const Answers = ({data,questionId}) => {

    // const hasAlreadyVoted = useRef(false);



    // const handleUpvote = async () => {
    //     try {
    //         console.log('o1')
    //         await axios.patch(Endpoints.getQuestionById(questionId),
    //         { rate: { up: data.rate.up + 1, down: data.rate.down, total: data.rate.total + 1 } });
    //         console.log('o2')
    //     //   if (!hasAlreadyVoted.current) setVotes((currentVote) => currentVote + 1);
    //     //   else alert('You already voted');
    //     } catch (e) {
    //         console.log(e)
    //     }
    //   }
    
    //   const handleDownvote = async () => {
    //     try {
    //       await axios.patch(Endpoints.getQuestionById(data.id), { rate: { up: data.rate.up, down: data.rate.down + 1, total: data.rate.total + 1 } });
    //     //   if (!hasAlreadyVoted.current) setVotes((currentVote) => currentVote - 1);
    //     //   else alert('You already voted');
    //     } catch (e) {
          
    //     }
    //   }



    return(
        <div>
            {data.quotes.map(({rate,user,description},index) => {
                return(
                    <div key={index}>
                        <h1 className="text-2xl font-bold mb-8 border-b border-gray-300 pb-4">
                            Answer
                        </h1>
                        <div className="flex justify-center w-full">
                            <div className="px-10 mr-4">
                                <button className="p-4 text-xl">⬆️</button>

                                <div className="text-center">{rate.up - rate.down}</div>

                                <button className="p-4 text-xl" >⬇️</button>
                            </div>
                            <div className="grow">
                                <div className="pb-2 border-b border-gray-300 text-xs mb-4">
                                    <span className="text-gray-500">Answered By : </span>
                                    <span className="">{user.name}</span>
                                </div>
                                <p>{description}</p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )}
export default Answers