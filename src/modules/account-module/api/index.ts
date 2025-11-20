import { type TLoginData, type IPermissionItemResponse, type IUser } from "../model";
import { instanceApi } from "@/shared/api";

export const fetchLogin = (data: TLoginData) =>
    instanceApi.post<IUser>("/auth/login/admin", data).then((response) => response);

export const fetchLogout = () =>
    instanceApi.get<void>("/auth/logoutAdmin").then((response) => response);

export const fetchGetAllPermission = () =>
        instanceApi.get<IPermissionItemResponse[]>("/permission").then((response) => response);

export const fetchGetSelf = () =>
    instanceApi.get<IUser>("/admin/get-me").then((response) => response);
