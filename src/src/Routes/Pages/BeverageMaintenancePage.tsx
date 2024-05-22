import BeverageInterface from "../../Components/BeverageMaintenance/BeverageInterface/BeverageInterface";
import style from "./BeverageMaintenancePage.module.css";

function BeverageMaintenancePage() {
    return (
        <div className={style.BeverageMaintenancePage}>
            <BeverageInterface />
        </div>
    );
}

export default BeverageMaintenancePage;