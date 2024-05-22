import httpClient from "../HttpClient.ts";
import INumberCoinsResponse from "../RequestResponse/BeverageMaintenance/INumberCoinsResponse.ts";
import IChangeCoinsRequest from "../RequestResponse/BeverageMaintenance/IChangeNumberCoinsRequest.ts";
import IUpdateDrinkRequest from "../RequestResponse/BeverageMaintenance/IUpdateDrinkRequest.ts";
import IDrink from "../Models/API/IDrink.ts";
import IAddDrinkRequest from "../RequestResponse/BeverageMaintenance/IAddDrinkRequest.ts";
import IDeleteDrinkRequest from "../RequestResponse/BeverageMaintenance/IDeleteDrinkRequest.ts";
import ILockUnlockDrinkRequest from "../RequestResponse/BeverageMaintenance/ILockUnlockDrinlRequest.ts";
import ICoin from "../Models/API/ICoin.ts";

class BeverageMaintenanceService {

    private readonly service_path = "/BeverageMaintenance/";

    private readonly keyName: string;
    private readonly keyValue: string;

    private readonly QueryParamas: any = {};


    public constructor({ keyName, keyValue }:
        {
            keyName: string, keyValue: string
        }
    ) {
        this.keyName = keyName;
        this.keyValue = keyValue;

        this.QueryParamas[this.keyName] = this.keyValue;
    }

    public async GetNumberCoinsAsync(): Promise<INumberCoinsResponse> {

        const blockedCoins = (await httpClient.get<INumberCoinsResponse>(
            this.service_path + "GetNumberCoins",
            { params: this.QueryParamas })
        ).data;

        return blockedCoins;
    }

    public async ChangeNumberCoinsAsync({ numberCoins }: { numberCoins: IChangeCoinsRequest }): Promise<INumberCoinsResponse> {

        const _numberCoins = (await httpClient.post<INumberCoinsResponse>(
            this.service_path + "ChangeNumberCoins",
            numberCoins,
            { params: this.QueryParamas })
        ).data;

        return _numberCoins;
    }

    public async UpdateDrinkAsync({ updateDrink }: { updateDrink: IUpdateDrinkRequest }) {

        const headers = {
            'Content-Type': 'multipart/form-data'
        };

        (await httpClient.post(
            this.service_path + "UpdateDrink",
            updateDrink,
            { params: this.QueryParamas, headers: headers })
        );

    }

    public async AddDrinkAsync({ addDrink }: { addDrink: IAddDrinkRequest }) {

        const headers = {
            'Content-Type': 'multipart/form-data'
        };

        const _drink = (await httpClient.post<IDrink>(
            this.service_path + "AddDrink",
            addDrink,
            { params: this.QueryParamas, headers: headers })
        ).data;

        return _drink;
    }

    public async DeleteDrinkAsync({ deleteDrink }: { deleteDrink: IDeleteDrinkRequest }) {

        (await httpClient.post<IDrink>(
            this.service_path + "DeleteDrink",
            deleteDrink,
            { params: this.QueryParamas })
        );
    }

    public async LockUnlockDrinkAsync({ lockUnolockDrink }: { lockUnolockDrink: ILockUnlockDrinkRequest }) {

        (await httpClient.post(
            this.service_path + "LockUnlockDrink",
            lockUnolockDrink,
            { params: this.QueryParamas })
        );
    }

    public async LockUnlockCoinAsync({ coin }: { coin: ICoin }) {

        (await httpClient.post(
            this.service_path + "LockUnlockCoin",
            coin,
            { params: this.QueryParamas })
        );
    }



}

export default BeverageMaintenanceService;