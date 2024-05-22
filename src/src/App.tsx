import { Route, Routes, useSearchParams } from 'react-router-dom';
import BeverageInteractionPage from './Routes/Pages/BeverageInteractionPage.tsx';
import BeverageMaintenancePage from './Routes/Pages/BeverageMaintenancePage.tsx';
import BeverageMaintenanceService from './API/Services/BeverageMaintenanceService.ts';
import { useEffect, useState } from 'react';
import { BeverageMaintenanceContext } from './Components/Context/BeverageMaintenanceContext.ts';

function App() {
    // Hooks

    const [isAdmin, setIsAdmin] = useState(false);

    const [searchParams] = useSearchParams();

    const [beverageMaintenanceService, setBeverageMaintenanceService] = useState<BeverageMaintenanceService | null>(null);

    // Effects

    useEffect(() => {
        const keyValue = searchParams.get(import.meta.env.VITE_ACCESS_KEY);

        if (keyValue != null) {
            const _beverageMaintenanceService = new BeverageMaintenanceService(
                { keyName: keyValue, keyValue: keyValue }
            );

            _beverageMaintenanceService.GetNumberCoinsAsync()
                .then(() => {
                    setIsAdmin(true);
                    setBeverageMaintenanceService(_beverageMaintenanceService);
                })
                .catch(() => {
                    setIsAdmin(false);
                    setBeverageMaintenanceService(null);
                });
        }
        else {
            setIsAdmin(false);
            setBeverageMaintenanceService(null);
        }
    }, [searchParams]);

    return (
        <div className="App">
            <BeverageMaintenanceContext.Provider value={{ service: beverageMaintenanceService }}>

                <Routes>

                    <Route path='/' element={isAdmin ? <BeverageMaintenancePage /> : <BeverageInteractionPage />} />

                </Routes>

            </BeverageMaintenanceContext.Provider>
        </div>
    );
}

export default App;
