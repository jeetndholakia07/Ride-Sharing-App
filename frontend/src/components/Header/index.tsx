import { type FC } from "react";

type headerProps = {
    children?: React.ReactNode;
}

const Header: FC<headerProps> = ({ children }) => {
    return (
        <header className="bg-white items-center justify-evenly shadow-md fixed w-full z-20">
            {children}
        </header>
    )
}
export default Header;