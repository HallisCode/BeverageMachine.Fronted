import { useEffect, useState } from "react";
import style from "./ChangeNumberForm.module.css";
import Button from "../../UI/Button/Button";
import INumberCoinsResponse from "../../../API/RequestResponse/BeverageMaintenance/INumberCoinsResponse";
import IChangeCoinsRequest from "../../../API/RequestResponse/BeverageMaintenance/IChangeNumberCoinsRequest";



function ChangeNumberForm({ numberCoins, onSubmit }
    :
    {
        numberCoins: INumberCoinsResponse,
        onSubmit: (data: IChangeCoinsRequest) => void
    }
) {
    // Hooks state

    const [formData, setFormData] = useState<IChangeCoinsRequest>({});

    // Hooks effect
    // Актуализируем количество монет на основе numberCoins
    useEffect(() => {

        setFormData(
            {
                numberOneRuble: numberCoins.numberOneRuble,
                numberTwoRuble: numberCoins.numberTwoRuble,
                numberFiveRuble: numberCoins.numberFiveRuble,
                numberTenRuble: numberCoins.numberTenRuble,
            }
        );

    }, [numberCoins]);


    // Commands

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {

        formData[event.target.name] = parseInt(event.target.value);

        setFormData({ ...formData });
    };

    // Logic


    return (
        <form className={style.ChangeNumberForm}>
            <label>Number one ruble :</label>
            <input
                type="number" name="numberOneRuble"
                min={0}
                value={formData.numberOneRuble}
                onChange={handleChange}
            />


            <label>Number two ruble :</label>
            <input
                type="number" name="numberTwoRuble"
                min={0}
                value={formData.numberTwoRuble}
                onChange={handleChange}
            />

            <label>Number five ruble :</label>
            <input
                type="number" name="numberFiveRuble"
                min={0}
                value={formData.numberFiveRuble}
                onChange={handleChange}
            />

            <label>Number ten ruble :</label>
            <input className={style.lastInput}
                type="number" name="numberTenRuble"
                min={0}
                value={formData.numberTenRuble}
                onChange={handleChange}
            />

            <Button type="button" onClick={() => onSubmit?.(formData)}>Save</Button>
        </form>
    );
}

export default ChangeNumberForm;