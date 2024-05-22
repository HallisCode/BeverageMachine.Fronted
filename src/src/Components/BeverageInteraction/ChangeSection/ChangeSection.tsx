

import ICoin from "../../../API/Models/API/ICoin";
import CoinButton from "../../Shared/CoinButton/CoinButton";
import style from "./ChangeSection.module.css";

function ChangeSection({ changeCoin }:
    {
        changeCoin: Array<ICoin>
    }
) {
    return (
        <div className={style.ChangeSection}>
            <div className={style.DispendingSection}>
                {changeCoin.map(coin => <CoinButton coin={coin} />)}
            </div>

        </div>
    );
}

export default ChangeSection;