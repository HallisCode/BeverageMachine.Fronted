import IDrink from "../../../API/Models/API/IDrink";
import DrinkButton from "../../Shared/DrinkButton/DrinkButton";
import style from "./DrinkAdminButton.module.css";

import iconDelete from "../../../Assets/svg/redsquare.svg";
import iconEdit from "../../../Assets/svg/bluesquare.svg";

function DrinkAdminButton({
    drink, isDisabled = false,
    isBlocked = false, onClick = undefined,
    onEdit = undefined, onDelete = undefined }:
    {
        drink: IDrink,
        isDisabled?: boolean,
        isBlocked?: boolean,
        onClick?: (drink: IDrink) => void,
        onEdit?: (drink: IDrink) => void, onDelete?: (drink: IDrink) => void

    }) {

    return (
        <div className={style.DrinkAdminButton}>
            <img src={iconDelete} className={style.iconDelete} onClick={() => onDelete?.(drink)} />
            <img src={iconEdit} className={style.iconEdit} onClick={() => onEdit?.(drink)} />

            <DrinkButton drink={drink} isDisabled={isDisabled} isBlocked={isBlocked} onClick={() => onClick?.(drink)} />

            <div className={style.Count}>
                count: {drink.count}
            </div>
        </div>
    );
}

export default DrinkAdminButton;