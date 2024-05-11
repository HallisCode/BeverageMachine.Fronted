class Coin {
    private _value: number;

    public get value() {
        return this._value;
    }


    public constructor(value: number) {
        this._value = value;
    }

    public static readonly One: Coin = new Coin(1);
    public static readonly Two: Coin = new Coin(2);
    public static readonly Five: Coin = new Coin(5);
    public static readonly Ten: Coin = new Coin(10);

    public static readonly AllAllowedCoins: Array<Coin> = [
        this.One, this.Two, this.Five, this.Ten
    ];
}

export default Coin;