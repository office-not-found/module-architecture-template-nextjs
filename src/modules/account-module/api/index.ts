import { type TLoginData, type IPermissionItemResponse, type IUser } from "../model";
import { instanceApi } from "@/shared/api";

export const fetchLogin = (data: TLoginData) =>
    instanceApi.post<IUser>("/auth/login/admin", data);

export const fetchLogout = () => instanceApi.get<void>("/auth/logoutAdmin");

export const fetchGetAllPermission = () =>
    instanceApi.get<IPermissionItemResponse[]>("/permission");

export const fetchGetSelf = () => instanceApi.get<IUser>("/admin/get-me");
