import { Route, Routes } from 'react-router-dom';
import BeverageInteractionPage from './Pages/BeverageInteractionPage.tsx';
import BeverageMaintenancePage from './Pages/BeverageMaintenancePage.tsx';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path='/user' element={<BeverageInteractionPage />} />
                <Route path='/admin' element={<BeverageMaintenancePage />} />
            </Routes>
        </div>
    );
}

export default App;
