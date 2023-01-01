import { useNavigate } from "react-router-dom";

const TagItem = ({ label, onClick }) => {
  return (
    <span className="cursor-pointer mr-2 mb-2 bg-blue-50 text-blue-400 border border-blue-200 px-2 py-1 text-xs rounded" onClick={() => onClick(label)}>
      {label}
    </span>
  )
};

const Tags = ({ tags , onClick }) => {
  // const navigate = useNavigate();

  // const handleClick = (label) => navigate(`/search?query=${label}`);

  return (
    <div>
      {
        tags.map((label) => <TagItem key={label} label={label} onClick={onClick} />)
      }
    </div>
  )
};

export default Tags;