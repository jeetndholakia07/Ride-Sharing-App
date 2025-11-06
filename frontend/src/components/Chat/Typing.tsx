import "./style.css";

const Typing = () => {
    return (
        <div className="flex justify-start items-center gap-2 px-3">
            <div className="bg-white p-2 rounded-2xl shadow-sm max-w-[100px] flex items-center justify-start">
                <div className="flex space-x-1">
                    <span className="typing-dot bg-gray-400"></span>
                    <span className="typing-dot bg-gray-400"></span>
                    <span className="typing-dot bg-gray-400"></span>
                </div>
            </div>
        </div>
    )
}
export default Typing;