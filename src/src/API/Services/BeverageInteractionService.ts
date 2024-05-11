import httpClient from "../HttpClient.ts";
import IAllBlockedCoinsResponse from "../RequestResponse/IAllBlockedCoinsResponse.ts";

class BeverageInteractionService {

    static #service_path = "/BeverageInteraction/";


    static async GetAllBlockedCoins(): Promise<IAllBlockedCoinsResponse> {

        const blockedCoins = (await httpClient.get<IAllBlockedCoinsResponse>(this.#service_path + "GetAllBlockedCoins")).data;

        return blockedCoins;
    }
}

export default BeverageInteractionService;