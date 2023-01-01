
// hooks
import useQuestions from "../../hooks/useQuestions";
import { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from "react-router-dom";

// Components
import Skeleton from "react-loading-skeleton";
import { Error, PageButton, RenderWhen } from '../../components';
import AskQuestion from "./components/AskQuestion";
import DropDown from "./components/DropDown";
import DropdownItem from "./components/DropdownItem";
import SortedData from "./components/SortedData";
import useLimitedQuestions from "../../hooks/useLimitedQuestions";
import { AiOutlineRight , AiOutlineLeft } from 'react-icons/ai'



const Home = () => {
  const {page} = useParams()
  const { data, isLoading, error,isNextPage } = useLimitedQuestions(page || 1);
  const [filter,setFilter] = useState('noFilter')

  const navigate = useNavigate()



  return (
    <div className="pb-10">
      <AskQuestion total={data.total} />

      <RenderWhen condition={isLoading}>
        <Skeleton count={3} className='h-36 mb-6' />
      </RenderWhen>

      <RenderWhen condition={error}>
        <Error />
      </RenderWhen>


      <RenderWhen condition={data && data?.questions.length}>
        <div className="flex  sticky top-0 bg-white py-8 justify-between items-center">
          <h1 className='text-lg font-bold'>Top Questions</h1>
          <div> 
            {/* <button className="px-2 border border-black rounded-md mx-2 hover:bg-slate-200 ">Filter</button> */}
            <DropDown title='Sort' >
              <DropdownItem onClick={() => setFilter('views')} >Views</DropdownItem>
              <DropdownItem onClick={() => setFilter('rate')} >Votes</DropdownItem>
              <DropdownItem onClick={() => setFilter('date')} >Date</DropdownItem>
            </DropDown>
          </div>
        </div> 
        <SortedData data={data.questions} filterBy={filter} />
        <div className="flex justify-center w-full">
          <PageButton onClick={() => navigate(`/${Number(page) - 1}`)} hidden={!page || page <= 1} >
            <div className="flex items-center justify-between">
              <AiOutlineLeft/> Pre
            </div>
          </PageButton>
          <PageButton onClick={() => {
            if (page) {
              navigate(`/${Number(page) + 1}`)
            }
            else {
              navigate('/2')
            }
          }} hidden={!isNextPage}>
            <div className="flex items-center justify-between">
              Next <AiOutlineRight/>
            </div>
          </PageButton>
        </div>
      </RenderWhen>
      
    </div>
  )
};

export default Home;