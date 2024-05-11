import { useEffect, useState } from "react";
import BeverageInteractionService from "../../../API/Services/BeverageInteractionService";
import style from "./CoinSelectionBlock.module.css";
import IAllBlockedCoinsResponse from "../../../API/RequestResponse/IAllBlockedCoinsResponse";
import Coin from "../../../API/Models/Coin";
import CoinButton from "../../Shared/CoinButton/CoinButton";


interface ICointToView {
    coin: Coin;
    isBlocked: boolean;
}


function CoinSelectionBlock({ SetCoinBalance, coinBalance }: {
    SetCoinBalance: React.Dispatch<React.SetStateAction<Coin[]>>, coinBalance: Coin[]
}) {

    // Получаем заблокированные монеты с бд
    const [blockedCoins, SetBlockedCoins] = useState<IAllBlockedCoinsResponse>({ coins: [] })
    useEffect(() => {

        async function fetchData() {

            SetBlockedCoins(await BeverageInteractionService.GetAllBlockedCoins());
        }

        fetchData();
    }, [])


    // Готовим монету к отображению. Добавляем им поле isBlocked
    let coinsToView: Array<ICointToView> = [];
    Coin.AllAllowedCoins.forEach(coin => {
        let isBlocked: boolean = false;

        if (blockedCoins.coins.find(_coin => _coin.value == coin.value)) {
            isBlocked = true;
        }

        coinsToView.push({ coin: coin, isBlocked: isBlocked });
    });

    return (
        <div className={style.CoinSelectionBlock}>
            {coinsToView.map(coin =>
                <CoinButton coin={coin.coin} isBlocked={coin.isBlocked}
                    onClick={() => SetCoinBalance([...coinBalance, coin.coin])}
                />)}
        </div>
    );
}

export default CoinSelectionBlock;