import ICoin from "../Models/API/ICoin";

class CoinType {


    public static readonly One: ICoin = { value: 1 };
    public static readonly Two: ICoin = { value: 2 };
    public static readonly Five: ICoin = { value: 5 };
    public static readonly Ten: ICoin = { value: 10 };

    public static readonly AllAllowedCoins: Array<ICoin> = [
        this.One, this.Two, this.Five, this.Ten
    ];
}

export default CoinType;