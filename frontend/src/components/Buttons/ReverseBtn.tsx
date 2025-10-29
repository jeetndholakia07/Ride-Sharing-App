import type { FC } from "react";
import useMediaQuery from "../../utils/useMediaQuery";

type reverseBtnProps = {
    handleClick: any;
}

const ReverseBtn: FC<reverseBtnProps> = ({ handleClick }) => {
    const matches = useMediaQuery('(max-width:768px)');
    return (
        <button
            type="button"
            className="bg-transparent px-3 py-2 rounded-md hover:cursor-pointer font-medium focus:outline-none"
            onClick={handleClick}
        >
            {!matches && <i className="bi bi-arrow-left-right text-lg text-blue-600" />}
            {matches && <i className="bi bi-arrow-down-up text-lg text-blue-600" />}
        </button>
    )
}
export default ReverseBtn;