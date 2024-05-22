
import style from "./DrinkSelectionBlock.module.css";
import Drink from "../../Shared/DrinkButton/DrinkButton";
import IDrink from "../../../API/Models/API/IDrink";

function DrinkSelectionBlock({ drinks, onSelectDrink = undefined }: {
    drinks: Array<IDrink>, onSelectDrink?: ((drink: IDrink) => void) | undefined
}) {

    return (
        <div className={style.DrinkSelectionBlock} >
            <div className={style.Catalog}>
                {drinks.map(drink =>
                    <Drink drink={drink} isDisabled={drink.isBlocked} isBlocked={drink.isBlocked} onClick={() => onSelectDrink?.(drink)} />
                )}
            </div>
        </div>
    );
}

export default DrinkSelectionBlock;