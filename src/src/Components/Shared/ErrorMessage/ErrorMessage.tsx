import style from "./ErrorMessage.module.css";

function ErrorMessage({ title, children }:
    {
        title: string,
        children?: any
    }
) {
    return (
        <div className={style.ErrorMessage}>
            <div className={style.Title}>
                {title}
            </div>
            <div className={style.Details}>
                {JSON.stringify(children)}
            </div>
        </div>
    );
}

export default ErrorMessage;