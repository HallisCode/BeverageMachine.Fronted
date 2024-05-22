
class ErrorConverter {

    public constructor() { }


    /** 
    Объект, который может являться IError => преобразуется в явный IError
    */
    public Convert({ data, statusCode }:
        {
            data: any, statusCode: number
        }
    ): IError | null {

        const _error: IError = {
            statusCode: statusCode,
            typeError: "",
            title: "",
            details: {},
        }

        if (Object.keys(data).length == 0 ||
            Object.keys(_error).find((key) => Object.keys(data).includes(key))
        ) {
            _error.typeError = data.typeError;
            _error.title = data.title;

            for (const key in data.details) {

                _error.details[key] = (JSON.stringify(data.details[key]))
            }

            return _error;
        }

        return null;

    }

}

export default ErrorConverter;