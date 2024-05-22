
import Coin from "../../../API/Models/API/ICoin";

import oneRubleImage from "../../../Assets/Images/1.png";
import twoRubleImage from "../../../Assets/Images/2.png";
import fiveRubleImage from "../../../Assets/Images/5.png";
import tenRubleImage from "../../../Assets/Images/10.png";
import Button from "../../UI/Button/Button";
import ICoin from "../../../API/Models/API/ICoin";

function CoinButton({ coin, isDisabled = false, isBlocked = false, onClick = undefined, imagePath = undefined }: {
    coin: Coin,
    isDisabled?: boolean,
    isBlocked?: boolean,
    imagePath?: string,
    onClick?: (coin: ICoin) => void
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
        <Button
            isDisabled={isDisabled}
            isBlocked={isBlocked}
            onClick={() => onClick?.(coin)}>
            <img src={imagePath} />
        </Button>
    );
}

export default CoinButton;