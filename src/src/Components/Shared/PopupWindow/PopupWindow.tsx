import style from "./PopupWindow.module.css";
import closeIcon from "../../../Assets/svg/icon-close.svg";

function PopupWindow({ isOpen, onClose, children }:
    {
        isOpen: boolean, onClose: Function, children?: any
    }) {


    return (
        <div className={`${style.PopupWindow} ${isOpen ? style.active : style.inactive}`}>
            <div className={style.Wrapper}>
                <div className={style.Content}>
                    <button className={style.Close} onClick={() => onClose()}>
                        <img src={closeIcon} /></button>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default PopupWindow;