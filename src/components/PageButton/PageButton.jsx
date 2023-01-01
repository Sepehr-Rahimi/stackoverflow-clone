import clsx from "clsx"



const PageButton = (props) => {



    return <button {...props} className={clsx('border border-slate-300 w-24 px-4 py-1 m-3 rounded-lg hover:scale-95 disabled:opacity-70',
    props.className)}>{props.children}</button>
}

export default PageButton