import React from "react";
import BeverageMaintenanceService from "../../API/Services/BeverageMaintenanceService";

interface IBeverageMaintenanceContext {
    service: BeverageMaintenanceService | null;
}

const BeverageMaintenanceContext = React.createContext<IBeverageMaintenanceContext>({
    service: null,

});

export { BeverageMaintenanceContext };
export type { IBeverageMaintenanceContext };