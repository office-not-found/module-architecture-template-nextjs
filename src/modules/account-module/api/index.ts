import { instanceApi } from "@/shared/api";
import { type IPermissionItemResponse, type IUser, type TLoginData } from "../model";

export const fetchLogin = (data: TLoginData) =>
    instanceApi.post<IUser>("/auth/login/admin", data);

export const fetchLogout = () => instanceApi.get<void>("/auth/logoutAdmin");

export const fetchGetAllPermission = () =>
    instanceApi.get<IPermissionItemResponse[]>("/permission");

export const fetchGetSelf = () => instanceApi.get<IUser>("/admin/get-me");
