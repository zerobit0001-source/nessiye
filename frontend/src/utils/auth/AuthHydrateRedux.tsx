"use client";

import { useLazyGetProfileQuery } from "@/features/account/api/ApiAccount";
import { userInfoActions } from "@/features/auth/slices/userInformationsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthHydrator() {
    const userInfo = useAppSelector((s) => s.userInfo);
    const dispatch = useAppDispatch();
    const [getProfile, { data: user, isLoading, error }] =
        useLazyGetProfileQuery();
    const router = useRouter();

    useEffect(() => {
        if (!userInfo.isAuthenticated) {
            getProfile();
        }
    }, [userInfo.isAuthenticated, getProfile]);

    useEffect(() => {
        if (!user) return;

        console.log(user)

        dispatch(
            userInfoActions.updateForm({
                field: "phone_number",
                value: user.phone_number,
            }),
        );
        dispatch(
            userInfoActions.updateForm({
                field: "full_name",
                value: user.full_name,
            }),
        );
        dispatch(
            userInfoActions.updateForm({
                field: "is_shop",
                value: user.is_shop,
            }),
        );
        dispatch(
            userInfoActions.updateForm({
                field: "shop_name",
                value: user.shop_name,
            }),
        );
        dispatch(
            userInfoActions.updateForm({
                field: "shop_address",
                value: user.shop_address,
            }),
        );
        dispatch(
            userInfoActions.updateForm({
                field: "isAuthenticated",
                value: true,
            }),
        );
    }, [dispatch, user]);

    // useEffect(() => {
    //     if (!error) return;

    //     // logout
    //     router.replace("/auth");
    // }, [error]);

    return null;
}
