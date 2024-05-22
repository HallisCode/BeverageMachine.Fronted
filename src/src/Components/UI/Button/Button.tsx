
import style from "./Button.module.css";


function Button({
    type = "button",
    isDisabled = false, isBlocked = false,
    onClick = undefined, children = undefined }:
    {
        type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"],
        isDisabled?: boolean,
        isBlocked?: boolean,
        onClick?: Function
        children?: any
    }) {



    return (
        <button type={type} className={`${style.Button} ${isBlocked ? `${style.Blocked}` : ''}`}
            disabled={isDisabled} onClick={() => onClick?.()}>
            {children}
        </button>
    );
}

export default Button;