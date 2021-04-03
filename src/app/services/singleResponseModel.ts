import { ResponseModel } from "../models/ResponseModel";

export interface SingleResponseModel<T> extends ResponseModel{
    data:T
}