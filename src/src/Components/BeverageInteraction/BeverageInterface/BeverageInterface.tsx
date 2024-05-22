import { useEffect, useState } from "react";
import CoinSelectionBlock from "../CoinSelectionBlock/CoinSelectionBlock";

import style from "./BeverageInterface.module.css";
import BalanceSection from "../BalanceSection/BalanceSection";
import ChangeSection from "../ChangeSection/ChangeSection";
import ICoin from "../../../API/Models/API/ICoin";
import DrinkSelectionBlock from "../DrinkSelectionBlock/DrinkSelectionBlock";
import IDrink from "../../../API/Models/API/IDrink";
import BeverageInteractionService from "../../../API/Services/BeverageInteractionService";
import PopupWindow from "../../Shared/PopupWindow/PopupWindow";
import { AxiosError } from "axios";

function BeverageInterface() {
    // Hooks state
    const [popupWindowData, setPopupWindowData] = useState(null);
    const [isPopupOpen, setisPopupOpen] = useState(false);

    const [coinBalance, SetCoinBalance] = useState<ICoin[]>([]);
    const balance = TotalCoins({ coins: coinBalance });

    const [changeCoin, SetChangeCoin] = useState<ICoin[]>([]);

    const [drinks, setDrinks] = useState<Array<IDrink>>([]);


    // Hooks effect

    // Загружает напитки с бд
    useEffect(() => {

        async function fetchData() {
            const beverageInteractionService = new BeverageInteractionService();

            const drinks = (await beverageInteractionService.GetAllDrinks()).drinks;

            drinks.forEach(drink => {
                drink.isBlocked = balance < drink.cost || drink.count <= 0 || drink.isBlocked;
            });

            setDrinks(drinks);
        }

        fetchData();
    }, [coinBalance]);


    // Commmands

    async function TakeOrder(drink: IDrink) {

        if (balance < drink.cost) return;

        const beverageService = new BeverageInteractionService()

        beverageService.MakeOrder({ drinkID: drink.id, balanceCoin: coinBalance }).then((change) => {

            SetCoinBalance(change.coins);

        }).catch(error => {
            if (error instanceof AxiosError) {
                setPopupWindowData(error.response?.data.title);
                setisPopupOpen(true);
            }
        });

    }

    function GetChange() {
        SetChangeCoin([...coinBalance]);
        SetCoinBalance([]);
    }


    // Logic

    return (
        <div className={style.BeverageInterface}>
            <PopupWindow isOpen={isPopupOpen} onClose={() => setisPopupOpen(false)}>{popupWindowData}</PopupWindow>
            <div className={style.ScreenPanel}>
                <DrinkSelectionBlock drinks={drinks} onSelectDrink={TakeOrder} />
            </div>
            <div className={style.InteractionPanel}>
                <div className={style.BalancePanel}>
                    <BalanceSection balance={balance} />
                </div>
                <div className={style.CoinSelectpanel}>
                    <CoinSelectionBlock SetCoinBalance={SetCoinBalance} coinBalance={coinBalance} />
                </div>
                <div className={style.OtherButtons}>
                    <button className={style.Button} onClick={() => GetChange()}> Get change</button>
                </div>
                <div className={style.ChangePanel}>
                    <ChangeSection changeCoin={changeCoin} />
                </div>
            </div>
        </div>
    );
}

function TotalCoins({ coins }: { coins: ICoin[] }): number {

    const total: number = coins.reduce((accumulator, coin) =>
        accumulator + coin.value
        , 0);

    return total;
}

export default BeverageInterface;