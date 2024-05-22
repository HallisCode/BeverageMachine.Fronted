import IDrink from "../../../API/Models/API/IDrink";
import style from "./DrinkButton.module.css";
import ImagesService from "../../../API/Services/ImagesService";

function DrinkButton({ drink, isDisabled = false, isBlocked = false, onClick = undefined }:
    {
        drink: IDrink,
        isDisabled?: boolean,
        isBlocked?: boolean,
        onClick?: Function | undefined
    }) {

    const imagesService = new ImagesService();

    const imagepath = imagesService.GetImagePath({ imgName: drink.imageName });

    return (
        <button className={`${style.Drink} ${isBlocked ? style.Blocked : ''} `} disabled={isDisabled} onClick={() => onClick?.()}>
            <div className={style.Cover}>
                <img src={imagepath} />
            </div>
            <div className={style.Title}>
                {drink.title}
            </div>
            <div className={style.Cost}>
                {drink.cost}₽
            </div>
        </button>
    );
}

export default DrinkButton;