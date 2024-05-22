import { useContext, useEffect, useState } from "react";
import BeverageInteractionService from "../../../API/Services/BeverageInteractionService";
import CoinButton from "../../Shared/CoinButton/CoinButton";
import ICoinPresentation from "../../../API/Models/Presentation/ICoin";
import { BeverageMaintenanceContext, IBeverageMaintenanceContext } from "../../Context/BeverageMaintenanceContext";
import ICoin from "../../../API/Models/API/ICoin";

import style from "./LockUnlockCoinsSection.module.css"

function LockUnlockCoinSection() {
    // Hooks state

    const [coinsView, SetcoinsView] = useState<Array<ICoinPresentation>>([])

    const { service } = useContext<IBeverageMaintenanceContext>(BeverageMaintenanceContext);

    // Hoos effect

    useEffect(() => {

        async function fetchData() {

            const beverageInteractionService = new BeverageInteractionService();

            SetcoinsView([...(await beverageInteractionService.GetAllCoinsAsync())]);
        }

        fetchData();
    }, [])


    // Commands

    async function LockUnlockCoin(coin: ICoin) {

        await service?.LockUnlockCoinAsync({ coin: coin });

        const beverageInteractionService = new BeverageInteractionService();

        SetcoinsView([...(await beverageInteractionService.GetAllCoinsAsync())]);
    }

    // Logic

    return (
        <div className={style.CoinSelectionBlock}>
            {coinsView.map(coin =>
                <CoinButton coin={coin.coin} isDisabled={false} isBlocked={coin.isBlocked}
                    onClick={() => LockUnlockCoin(coin.coin)}
                />)}
        </div>
    );
}

export default LockUnlockCoinSection;