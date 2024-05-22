interface IChangeCoinsRequest {
    numberOneRuble?: number;
    numberTwoRuble?: number;
    numberFiveRuble?: number;
    numberTenRuble?: number;

    [key: string]: number | undefined;
}

export default IChangeCoinsRequest;