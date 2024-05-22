import { useContext, useEffect, useState } from "react";
import ChangeNumberForm from "../ChangeNumberForm/ChangeNumberForm";
import style from "./BeverageInterface.module.css";
import PopupWindow from "../../Shared/PopupWindow/PopupWindow";
import LockUnlockCoinSection from "../LockUnlockCoinsSection/LockUnlockCoinsSection";
import DrinkCatalogEditSection from "../DrinkCatalogEditSection/DrinkCatalogEditSection";
import IDrink from "../../../API/Models/API/IDrink";
import BeverageInteractionService from "../../../API/Services/BeverageInteractionService";
import { BeverageMaintenanceContext, IBeverageMaintenanceContext } from "../../Context/BeverageMaintenanceContext";
import INumberCoinsResponse from "../../../API/RequestResponse/BeverageMaintenance/INumberCoinsResponse";
import IChangeCoinsRequest from "../../../API/RequestResponse/BeverageMaintenance/IChangeNumberCoinsRequest";
import { DrinkForm, IFormDataAddDrink } from "../DrinkForm/DrinkForm";
import IAddDrinkRequest from "../../../API/RequestResponse/BeverageMaintenance/IAddDrinkRequest";
import axios from "axios";
import ErrorConverter from "../../../API/utils/ErrorConverter";
import ErrorMessage from "../../Shared/ErrorMessage/ErrorMessage";
import IUpdateDrinkRequest from "../../../API/RequestResponse/BeverageMaintenance/IUpdateDrinkRequest";


function BeverageInterface() {
    // Context
    const { service } = useContext<IBeverageMaintenanceContext>(BeverageMaintenanceContext);
    const beverageMaintenanceService = service;


    // Services
    const beverageInteractionService = new BeverageInteractionService();


    // Hooks
    const [popupWindowData, setPopupWindowData] = useState<any>(undefined);
    const [isPopupOpen, setisPopupOpen] = useState(false);

    const [drinks, setDrinks] = useState<Array<IDrink>>([]);

    const [numberCoins, setNumberCoins] = useState<INumberCoinsResponse>(
        {
            numberOneRuble: 0,
            numberTwoRuble: 0,
            numberFiveRuble: 0,
            numberTenRuble: 0,
        }
    );


    // Hooks effect
    // Загружает напитки с бд
    useEffect(() => {

        async function fetchData() {
            setDrinks((await beverageInteractionService.GetAllDrinks()).drinks);
        }

        fetchData();
    }, []);

    // Загружаем количество монет с бд
    useEffect(() => {

        async function fetchData() {

            const coins: INumberCoinsResponse | undefined = (await beverageMaintenanceService?.GetNumberCoinsAsync());

            if (coins != undefined) setNumberCoins(coins);
        }

        fetchData();
    }, []);


    // Commands

    async function LockUnlockDrink(drink: IDrink) {
        await beverageMaintenanceService?.LockUnlockDrinkAsync({ lockUnolockDrink: { drinkID: drink.id } });

        setDrinks((await beverageInteractionService.GetAllDrinks()).drinks);
    }

    async function DeleteDrink(drink: IDrink) {
        await beverageMaintenanceService?.DeleteDrinkAsync({ deleteDrink: { drinkId: drink.id } })

        setDrinks((await beverageInteractionService.GetAllDrinks()).drinks);
    }

    async function ChangeNumberCoins(changeCoinsData: IChangeCoinsRequest) {

        await beverageMaintenanceService?.ChangeNumberCoinsAsync({ numberCoins: changeCoinsData });

        const coins: INumberCoinsResponse | undefined = (await beverageMaintenanceService?.GetNumberCoinsAsync());

        if (coins != undefined) setNumberCoins(coins);
    }

    async function AddDrink(data: IFormDataAddDrink) {

        const isFilled = data.title && data.image && data.cost && data.count
            && Object.values(data).length != 0;

        if (!isFilled) {
            setPopupWindowData(<ErrorMessage title="Не все поля формы были заполнены!"></ErrorMessage>);

            setisPopupOpen(true);

            return;
        }

        const drink: IAddDrinkRequest = {
            title: data.title!,
            image: data.image!,
            cost: data.cost!,
            count: data.count!
        }

        beverageMaintenanceService?.AddDrinkAsync({ addDrink: drink }).then(async () => {
            setisPopupOpen(false);

            setPopupWindowData(undefined);

            setDrinks((await beverageInteractionService.GetAllDrinks()).drinks);

        }).catch(error => {
            if (axios.isAxiosError(error)) {
                const converter = new ErrorConverter();

                const _error = converter.Convert({ statusCode: error.response?.status ?? 400, data: error.response?.data })

                setPopupWindowData(<ErrorMessage title={_error?.title ??
                    "Произошла ошибка, сервер изменил структуру ответа и ошибка не была определена"}>
                    {_error?.details}
                </ErrorMessage>);

                setisPopupOpen(true);
            }
        });
    }

    async function EditDrink({ drinkId, data }: { drinkId: number, data: IFormDataAddDrink }) {

        const drink: IUpdateDrinkRequest = {
            drinkId: drinkId,
            title: data.title!,
            image: data.image!,
            cost: data.cost!,
            count: data.count!
        }

        beverageMaintenanceService?.UpdateDrinkAsync({ updateDrink: drink }).then(async () => {
            setisPopupOpen(false);

            setPopupWindowData(undefined);

            setDrinks((await beverageInteractionService.GetAllDrinks()).drinks);

        }).catch(error => {

            if (axios.isAxiosError(error)) {
                const converter = new ErrorConverter();

                const _error = converter.Convert({ statusCode: error.response?.status ?? 400, data: error.response?.data })

                setPopupWindowData(<ErrorMessage title={_error?.title ??
                    "Произошла ошибка, сервер изменил структуру ответа и ошибка не была определена"}>
                    {_error?.details}
                </ErrorMessage>);

                setisPopupOpen(true);
            }
        });
    }

    function OpenAddDrinkForm() {

        setPopupWindowData(<DrinkForm onSubmit={AddDrink}></DrinkForm>);

        setisPopupOpen(true);
    }

    function OpenEditDrinkForm(drink: IDrink) {
        setPopupWindowData(<DrinkForm drink={drink} onSubmit={(data) => EditDrink({ drinkId: drink.id, data: data })}></DrinkForm>);

        setisPopupOpen(true);
    }

    // Logic

    return (
        <div className={style.BeverageInterface}>
            <div className={style.ScreenPanel}>

                <DrinkCatalogEditSection
                    drinks={drinks} onSelectDrink={LockUnlockDrink}
                    onDelete={DeleteDrink}
                    onAdd={OpenAddDrinkForm}
                    onEdit={OpenEditDrinkForm}
                />

            </div>
            <div className={style.InteractionPanel}>

                <div className={style.ChangeNumberPanel}>
                    <ChangeNumberForm numberCoins={numberCoins} onSubmit={ChangeNumberCoins} />
                </div>

                <div className={style.LockUnlockCoinPanel}>
                    <LockUnlockCoinSection />
                </div>

                <div className={style.Void}>
                </div>

            </div>
            <PopupWindow isOpen={isPopupOpen} onClose={() => setisPopupOpen(false)}>{popupWindowData}</PopupWindow>
        </div>);
}

export default BeverageInterface;