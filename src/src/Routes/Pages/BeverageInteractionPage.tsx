import BeverageInterface from "../../Components/BeverageInteraction/BeverageInterface/BeverageInterface.tsx";

import style from "./BeverageInteractionPage.module.css";

function BeverageInteractionPage() {

    return (
        <div className={style.BeverageInteractionPage}>
            <BeverageInterface />
        </div>
    );
}

export default BeverageInteractionPage;