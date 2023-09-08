export interface IErrorWithMessage {
   message: string;
}

type IError = IErrorWithMessage;

export interface IResponseError {
   error: IError;
}
