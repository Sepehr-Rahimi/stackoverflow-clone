import clsx from "clsx";
import { useNavigate, useParams } from "react-router-dom";
import { RenderWhen } from "../../components";
import Answers from "./Components/Answers";
import useQuestion from "./hooks/useQuestion";
import useSubmitAnswer from "./hooks/useSubmitAnswer";
import useRerender from "../../hooks/useRerender";
const QuestionDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, error, votes, handleUpvote, handleDownvote } = useQuestion(id);
  const {errors,onChange,onSubmit,values} = useSubmitAnswer(id)
  return (
    <div className="py-8">

      <div className="mb-4">
        <button className="py-2 text-sm" onClick={() => navigate(-1)}>
          {'< Back'}
        </button>
      </div>

      <RenderWhen condition={isLoading}>
        <h2>Loading...</h2>
      </RenderWhen>

      <RenderWhen condition={error}>
        <h2>Error...</h2>
      </RenderWhen>

      <RenderWhen condition={data && Object.keys(data).length}>
        <h1 className="text-2xl font-bold mb-8 border-b border-gray-300 pb-4">

          {data?.title}
        </h1>
        <div className="flex justify-center">
          <div className="px-10 mr-4">
            <button className="p-4 text-xl" onClick={handleUpvote}>⬆️</button>

            <div className="text-center">{votes}</div>

            <button className="p-4 text-xl" onClick={handleDownvote}>⬇️</button>
          </div>
          <div>
            <div className="pb-2 border-b border-gray-300 text-xs mb-4">
              <span className="text-gray-500">Asked: </span>
              <span className=" mr-4">{data?.created_at}</span>

              <span className="text-gray-500">By </span>
              <span className="">{data?.author}</span>
            </div>
            <p>{data?.description}</p>
          </div>
        </div>
        <form onSubmit={onSubmit} className="border-y border-slate-300 p-5 my-5">
          <div className="font-semibold text-xl">Your Answer</div>
          <textarea onChange={onChange} value={values.description} className={clsx('pl-3 w-full my-3 p-5 border border-slate-300 rounded-md',
          {'border-red-600' : errors.description} 
          )} placeholder="Write your answer" name="description" id="description" cols="30" rows="10"></textarea>
          <div className='py-1 text-xs text-red-500'>{errors.description}</div>
          <button type="submit" className="border border-slate-300 rounded-lg px-3 py-1 hover:scale-95 m-5">Submit answer</button>
        </form>
        <Answers data={data?.answers} questionId={id} />
      </RenderWhen>

    </div>
  )
};

export default QuestionDetails;