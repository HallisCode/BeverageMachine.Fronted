interface IUpdateDrinkRequest {
    drinkId: number
    cost?: number;
    title?: string;
    image?: File
    count?: number;
}


export default IUpdateDrinkRequest;