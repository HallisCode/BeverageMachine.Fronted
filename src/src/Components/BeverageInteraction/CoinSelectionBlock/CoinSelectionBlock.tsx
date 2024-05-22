import { useEffect, useState } from "react";
import BeverageInteractionService from "../../../API/Services/BeverageInteractionService";
import style from "./CoinSelectionBlock.module.css";
import ICoin from "../../../API/Models/API/ICoin";
import CoinButton from "../../Shared/CoinButton/CoinButton";
import ICoinPresentation from "../../../API/Models/Presentation/ICoin";



function CoinSelectionBlock({ SetCoinBalance, coinBalance }: {
    SetCoinBalance: React.Dispatch<React.SetStateAction<ICoin[]>>, coinBalance: ICoin[]
}) {

    // Получаем заблокированные монеты с бд
    const [coinsView, SetcoinsView] = useState<Array<ICoinPresentation>>([])
    useEffect(() => {

        async function fetchData() {

            const beverageInteractionService = new BeverageInteractionService();

            SetcoinsView((await beverageInteractionService.GetAllCoinsAsync()));
        }

        fetchData();
    }, [])

    return (
        <div className={style.CoinSelectionBlock}>
            {coinsView.map(coin =>
                <CoinButton coin={coin.coin} isDisabled={coin.isBlocked} isBlocked={coin.isBlocked}
                    onClick={(coin) => SetCoinBalance([...coinBalance, coin])}
                />)}
        </div>
    );
}

export default CoinSelectionBlock;