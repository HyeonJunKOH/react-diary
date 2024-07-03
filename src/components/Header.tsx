import "./Header.css";


// Header 인터페이스 정의
interface HeaderProps{
    title: string,
    leftChild: React.ReactNode,
    rightChild: React.ReactNode;
}


const Header:React.FC<HeaderProps> = ({title, leftChild, rightChild}) => {
    return (
        <header className="Header">
            <div className="header_left">{leftChild}</div>
            <div className="header_center">{title}</div>
            <div className="header_right">{rightChild}</div>
        </header>
    );
};

export default Header;