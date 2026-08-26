"use client";

import { useAppDispatch } from "@/lib/redux/hooks";
import { shopSignupFormSchema } from "@/utils/validations/validateSignupForm";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
    Button,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { userInfoActions } from "../slices/userInformationsSlice";

export interface formDataType {
    phone_number: string;
    full_name: string;
    password: string;
    is_shop: boolean;
    shop_name: string;
    shop_address: string;
}

const ShopRegister = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [formData, setFormData] = useState<formDataType>({
        phone_number: "",
        full_name: "",
        password: "",
        is_shop: true,
        shop_name: "",
        shop_address: "",
    });

    const [canSubmit, setCanSubmit] = useState<boolean>(false);

    const [errors, setErrors] = useState({
        phone_number: false,
        full_name: false,
        password: false,
        shop_name: false,
        shop_address: false,
    });
    const [errorsMessages, setErrorsMessages] = useState({
        phone_number: "",
        full_name: "",
        password: "",
        shop_name: "",
        shop_address: "",
    });

    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter();

    const dispatch = useAppDispatch();

    const handleValueChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));

        const name = e.target.name as keyof formDataType;
        const value = e.target.value;

        const validationResult =
            shopSignupFormSchema.shape[name].safeParse(value);
        setErrors((prev) => ({
            ...prev,
            [name]: !validationResult.success,
        }));
        setErrorsMessages((prev) => ({
            ...prev,
            [name]: validationResult.success
                ? ""
                : validationResult.error.flatten().formErrors[0] || "",
        }));

        const isValidForm = shopSignupFormSchema.safeParse(formData);

        setCanSubmit(isValidForm.success);
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: any) => {
        event.preventDefault(); // جلوگیری از دیفالت براوزر موقع کلیک
    };

    const handleSubmin = async () => {
        const result = shopSignupFormSchema.safeParse(formData);

        if (!result.success) {
            return;
        }

        // const mypromise = new Promise((resolve, reject) => {
        //     setTimeout(() => {
        //         let success = true;
        //         if (success) {
        //             resolve("successfully");
        //             redirect("?mode=code");
        //         }
        //         reject("unsuccessfully");
        //     }, 2000);
        // });
        // toast.promise(mypromise, {
        //     pending: "درحال ارسال اطلاعات",
        //     success: "کد ارسال شده را وارد کنید",
        //     error: "مشکلی در ارسال اطلات به وجود آمده",
        // });

        try {
            setLoading(true);
            const res = await fetch("api/auth/signup", {
                method: "POST",
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (data.ok) {
                router.push("?mode=signup-code");
                toast.success("کد ارسال شد");
                dispatch(
                    userInfoActions.updateForm({
                        field: "phone_number",
                        value: formData.phone_number,
                    }),
                );
                dispatch(
                    userInfoActions.updateForm({
                        field: "full_name",
                        value: formData.full_name,
                    }),
                );
                dispatch(
                    userInfoActions.updateForm({
                        field: "password",
                        value: formData.password,
                    }),
                );
                dispatch(
                    userInfoActions.updateForm({
                        field: "shop_name",
                        value: formData.shop_name,
                    }),
                );
                dispatch(
                    userInfoActions.updateForm({
                        field: "is_shop",
                        value: formData.is_shop,
                    }),
                );
                dispatch(
                    userInfoActions.updateForm({
                        field: "shop_address",
                        value: formData.shop_address,
                    }),
                );
            }

            toast.error(data.error);
 
        } catch (error) {
 
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="flex flex-col gap-4 w-full border-b pb-6 border-gray-400 ">
                <Typography variant="body1">یه اکانت بساز</Typography>
                <TextField
                    label="شماره موبایل"
                    size="small"
                    type="tel"
                    required
                    inputProps={{
                        inputMode: "numeric", // فعال‌سازی صفحه‌کلید عددی در موبایل
                        pattern: "[0-9]*", // فقط عدد قبول کنه
                        maxLength: 15, // مثلا برای شماره‌های ایران
                    }}
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={(e) => {
                        handleValueChange(e);
                    }}
                    error={errors.phone_number}
                    helperText={
                        errors.phone_number
                            ? errorsMessages.phone_number
                            : "شمازه موبایل که قبلا باهش ثبت نام نکردید رو وارد کنید"
                    }
                />
                <TextField
                    label="نام کاربری"
                    size="small"
                    required
                    name="full_name"
                    value={formData.full_name}
                    onChange={(e) => {
                        handleValueChange(e);
                    }}
                    error={errors.full_name}
                    helperText={
                        errors.full_name
                            ? errorsMessages.full_name
                            : "نام و نام خانوادگی خودت رو وارد کن"
                    }
                />
                <TextField
                    label="نام فروشگاه"
                    size="small"
                    required
                    name="shop_name"
                    value={formData.shop_name}
                    onChange={(e) => {
                        handleValueChange(e);
                    }}
                    error={errors.shop_name}
                    helperText={
                        errors.shop_name
                            ? errorsMessages.shop_name
                            : "اسم فروشگاهت رو بزن"
                    }
                />
                <TextField
                    label="آدرس"
                    size="small"
                    required
                    name="shop_address"
                    value={formData.shop_address}
                    onChange={(e) => {
                        handleValueChange(e);
                    }}
                    error={errors.shop_address}
                    helperText={
                        errors.shop_address
                            ? errorsMessages.shop_address
                            : "آدرس فروشگاه یا سوپرمارکت رو بزن"
                    }
                />
                <TextField
                    label="گذرواژه"
                    size="small"
                    type={showPassword ? "text" : "password"}
                    required
                    InputProps={{
                        // این قسمت برای قرار دادن آیکون در انتهای فیلده
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end" // برای چسبیدن آیکون به لبه
                                >
                                    {showPassword ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    name="password"
                    value={formData.password}
                    onChange={(e) => {
                        handleValueChange(e);
                    }}
                    error={errors.password}
                    helperText={
                        errors.password
                            ? errorsMessages.password
                            : "گذرواژه خودت رو وارد کن"
                    }
                />
                <Button
                    variant="contained"
                    onClick={handleSubmin}
                    disabled={!canSubmit || loading}
                >
                    ثبت نام
                </Button>
            </div>
            <Typography variant="body2" className="mt-4!">
                قبلا اکانت داشتید ؟{" "}
                <Link className="text-blue-500" href={"?mode=signin"}>
                    {" "}
                    ورود اکانت{" "}
                </Link>
            </Typography>
        </>
    );
};

export default ShopRegister;
