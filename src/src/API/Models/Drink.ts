class Drink {
    private _title: string;
    private _imageName: string;
    private _cost: number;
    private _count: number;

    public get title() { return this._title }
    public get imageName() { return this._imageName }
    public get cost() { return this._cost }
    public get count() { return this._count }

    public constructor({ title, imageName, cost, count }: {
        title: string, imageName: string,
        cost: number, count: number
    }) {
        this._title = title;
        this._imageName = imageName;
        this._cost = cost;
        this._count = count;
    }
}

export default Drink;