import { useEffect } from "react"
import { useState } from "react"
import QuestionItem from "../../../components/QuestionItem/QuestionItem"
import useRerender from "../../../hooks/useRerender"


const SortedData = ({data,filterBy}) => {
  const [rerender] = useRerender()
  


  useEffect(() => {
    switch (filterBy) {
      case 'views':
          data.sort((a,b) => {
            if (a.views > b.views){
                return -1
              }
              if (a.views < b.views){
                return 1
              }
        })
        break;
    
      case 'rate':
          data.sort((a,b) => { 
            if (a.rate.total > b.rate.total){
                return -1
              } 
              if (a.rate.total < b.rate.total){
                return 1
              }
        })
        break;
    
      case 'date':
          data.sort((a,b) => {
            if (a.date > b.date){
                return -1
              }
              if (a.date < b.date){
                return 1
              }
        })
        break;
    
      default:
        break;
    }
    rerender()
  },[filterBy])


    return(
        <div>
          {data.map(({ id, title, created_at, views, rate, description, author, answers, tags }) => (
            <QuestionItem
              key={id}
              id={id}
              className="mb-4"
              title={title}
              rate={rate}
              views={views}
              date={created_at} 
              description={description}
              author={author} 
              answers={answers}
              tags={tags}
            />
          ))}
        </div>
    )
}


export default SortedData