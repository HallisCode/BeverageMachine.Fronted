
import style from "./BalanceSection.module.css";

function BalanceSection({ balance }: {
    balance: number
}) {

    return (
        <div className={style.BalanceSection}>
            <div className={style.BalanceLabel}>
                <h1>{balance}</h1>
            </div>
        </div>
    );
}

export default BalanceSection;