import type { FC } from "react";

type props = {
    specialNote: string;
}

const SpecialNote: FC<props> = ({ specialNote }) => {
    return (
        <p className="text-gray-600 text-sm whitespace-normal break-words">
            {specialNote && <><span className="font-bold">Note: </span><span>{specialNote}</span></>}
        </p>
    )
}
export default SpecialNote;