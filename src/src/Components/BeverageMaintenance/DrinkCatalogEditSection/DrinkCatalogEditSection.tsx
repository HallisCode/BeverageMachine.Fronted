
import IDrink from "../../../API/Models/API/IDrink";
import Button from "../../UI/Button/Button";
import DrinkAdminButton from "../DrinkAdminButton/DrinkAdminButton";
import style from "./DrinkCatalogEditSection.module.css";

function DrinkCatalogEditSection({
    drinks, onSelectDrink = undefined,
    onDelete = undefined, onEdit = undefined,
    onAdd = undefined, }:
    {
        drinks: Array<IDrink>,
        onSelectDrink?: ((drink: IDrink) => void) | undefined
        onEdit?: (drink: IDrink) => void, onDelete?: (drink: IDrink) => void,
        onAdd?: Function
    }) {
    return (
        <div className={style.DrinkSelectionBlock} >
            <div className={style.Catalog}>
                {drinks.map(drink =>
                    <DrinkAdminButton
                        drink={drink}
                        isDisabled={false} isBlocked={drink.isBlocked}
                        onClick={() => onSelectDrink?.(drink)}
                        onDelete={onDelete}
                        onEdit={onEdit}
                    />
                )}
            </div>
            <div className={style.AddDrink}>
                <Button onClick={() => onAdd?.()}>Add drink</Button>
            </div>
        </div>
    );
}

export default DrinkCatalogEditSection;