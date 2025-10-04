import {type FC} from 'react';

type props={
    handleClick:any;
}

const ResetProfileImg:FC<props> = ({ handleClick }) => {
  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 hover:cursor-pointer px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300"
    >
      <i className="bi bi-x-circle h-5 w-5"/>
      Reset Image
    </button>
  );
};

export default ResetProfileImg;
