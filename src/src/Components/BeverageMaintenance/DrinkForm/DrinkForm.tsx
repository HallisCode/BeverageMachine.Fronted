import { useState } from "react";
import style from "./DrinkForm.module.css";
import Button from "../../UI/Button/Button";
import IDrink from "../../../API/Models/API/IDrink";


interface IFormDataAddDrink {
    title?: string;
    image?: File,
    cost?: number,
    count?: number;
}

function DrinkForm({ drink, onSubmit }:
    {
        drink?: IDrink
        onSubmit: (data: IFormDataAddDrink,) => void
    }
) {

    const [formData, setFormData] = useState<IFormDataAddDrink>(drink ?? {});


    // Commands

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {

        switch (event.target.name) {

            case ("title"):
                formData.title = event.target.value;
                break;

            case ("image"):
                formData.image = event.target.files?.[0];
                break;

            case ("cost"):
                formData.cost = parseInt(event.target.value) ?? 0;
                break;

            case ("count"):
                formData.count = parseInt(event.target.value) ?? 0;
                break;
        }

        setFormData({ ...formData });
    };

    // Logic


    return (
        <form className={style.CreateDrinkForm}>
            <label>Title:</label>
            <input
                type="string" name="title"
                value={formData.title}
                onChange={handleChange}
            />


            <label>Image:</label>
            <input
                type="file" name="image"
                onChange={handleChange}
            />

            <label>Cost :</label>
            <input
                type="number" name="cost"
                min={0}
                value={formData.cost}
                onChange={handleChange}
            />

            <label>Count :</label>
            <input className={style.lastInput}
                type="number" name="count"
                min={0}
                value={formData.count}
                onChange={handleChange}
            />

            <Button type="button" onClick={() => onSubmit?.(formData)}>Save</Button>
        </form>
    );
}

export { DrinkForm };
export type { IFormDataAddDrink };
