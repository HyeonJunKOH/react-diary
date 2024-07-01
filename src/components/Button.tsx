import "./Button.css";


// props 타입 정의
interface ButtonProps {
    text: string;
    type?: "primary" | "secondary" | "danger";
    onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({text,type,onClick}) =>{
    return(
        <button onClick={onClick} className={`Button Button_${type}`}>
            {text}
        </button>
    )
}

export default Button;