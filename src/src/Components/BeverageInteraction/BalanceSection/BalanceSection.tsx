
import Coin from "../../../API/Models/Coin";
import style from "./BalanceSection.module.css";

function BalanceSection({ coinBalance }: {
    coinBalance: Coin[]
}) {

    const balance: number = coinBalance.reduce((accumulator, coin) =>
        accumulator + coin.value
        , 0);

    return (
        <div className={style.BalanceSection}>
            <div className={style.BalanceLabel}>
                <h1>{balance}</h1>
            </div>
        </div>
    );
}

export default BalanceSection;