import clsx from "clsx"

const DropdownItem = (props) => {


    return(
        <span {...props} className={clsx('w-full border-black hover:border-b',props.className)}>{props.children}</span>
    )
}

export default DropdownItem