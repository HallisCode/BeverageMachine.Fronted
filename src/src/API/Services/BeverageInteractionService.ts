import httpClient from "../HttpClient.ts";
import ICoin from "../Models/API/ICoin.ts";
import ICoinView from "../Models/Presentation/ICoin.ts";
import IAllBlockedCoinsResponse from "../RequestResponse/BeverageInteraction/IAllBlockedCoinsResponse.ts";
import IAllDrinksResponse from "../RequestResponse/BeverageInteraction/IAllDrinksResponse.ts";
import IChangeResponse from "../RequestResponse/BeverageInteraction/IChangeResponse.ts";
import CoinType from "../Enums/CoinType.ts";

class BeverageInteractionService {

    private readonly service_path = "/BeverageInteraction/";


    public constructor() { }


    public async GetAllCoinsAsync(): Promise<Array<ICoinView>> {

        const blockedCoins = (await httpClient.get<IAllBlockedCoinsResponse>(this.service_path + "GetAllBlockedCoins")).data;

        let coinsToView: Array<ICoinView> = [];

        CoinType.AllAllowedCoins.forEach(coin => {
            let isBlocked: boolean = false;

            if (blockedCoins.coins.find(blockedCoin => blockedCoin.value == coin.value)) {
                isBlocked = true;
            }

            coinsToView.push({ coin: coin, isBlocked: isBlocked });
        });

        return coinsToView;
    }

    public async GetAllDrinks() {
        const drinks = (await httpClient.get<IAllDrinksResponse>(this.service_path + "GetAllDrinks")).data;

        return drinks;
    }

    public async MakeOrder({ drinkID, balanceCoin }:
        {
            drinkID: number, balanceCoin: Array<ICoin>
        }
    ) {
        const data = {
            drinkID: drinkID,
            coins: balanceCoin
        }

        const change = (await httpClient.post<IChangeResponse>(this.service_path + "TakeOrder", data)).data;

        return change
    }

}

export default BeverageInteractionService;