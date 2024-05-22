import hostAdress from "../HostAdress.ts";


class ImagesService {
    private readonly service_path = "/Images/";


    public constructor() { }

    public GetImagePath({ imgName }: { imgName: string }) {

        const imagePath = hostAdress + this.service_path + imgName;

        console.log(imagePath);

        return imagePath;
    }
}

export default ImagesService;