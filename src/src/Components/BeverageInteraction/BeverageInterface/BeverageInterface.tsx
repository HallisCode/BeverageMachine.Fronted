import { useState } from "react";
import CoinSelectionBlock from "../CoinSelectionBlock/CoinSelectionBlock";

import style from "./BeverageInterface.module.css";
import BalanceSection from "../BalanceSection/BalanceSection";
import ChangeSection from "../ChangeSection/ChangeSection";
import Coin from "../../../API/Models/Coin";

function BeverageInterface() {

    const [coinBalance, SetCoinBalance] = useState<Coin[]>([]);

    return (
        <div className={style.BeverageInterface}>
            <div className={style.ScreenPanel}>

            </div>
            <div className={style.InteractionPanel}>
                <div className={style.BalancePanel}>
                    <BalanceSection coinBalance={coinBalance} />
                </div>
                <div className={style.CoinSelectpanel}>
                    <CoinSelectionBlock SetCoinBalance={SetCoinBalance} coinBalance={coinBalance} />
                </div>
                <div className={style.ChangePanel}>
                    <ChangeSection />
                </div>
            </div>
        </div>
    );
}

export default BeverageInterface;