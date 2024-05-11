
import style from "./CoinButton.module.css";
import Coin from "../../../API/Models/Coin";

import oneRubleImage from "../../../../public/Images/Coins/1.png";
import twoRubleImage from "../../../../public/Images/Coins/2.png";
import fiveRubleImage from "../../../../public/Images/Coins/5.png";
import tenRubleImage from "../../../../public/Images/Coins/10.png";

function CoinButton({ coin, isBlocked, onClick, imagePath = undefined }: {
    coin: Coin,
    isBlocked: boolean, imagePath?: string | undefined,
    onClick: Function
}) {

    if (imagePath == undefined) {
        switch (coin.value) {
            case (1):
                imagePath = oneRubleImage;
                break;
            case (2):
                imagePath = twoRubleImage;
                break;
            case (5):
                imagePath = fiveRubleImage;
                break;
            case (10):
                imagePath = tenRubleImage;
                break;
        }
    }

    return (
        <button className={style.CoinButton}
            disabled={isBlocked} onClick={() => onClick()}>
            <img className={isBlocked ? `${style.Blocked}` : ''} src={imagePath} />
        </button>
    );
}

export default CoinButton;