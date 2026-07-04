"use client";

import { useAppSelector } from "@/lib/redux/hooks";
import { Button, TextField, Typography, Box } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const RegisterCode = () => {
    const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
    const inputRef = useRef<HTMLInputElement[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const user = useAppSelector((s) => s.userInfo);
    const router = useRouter();

    const handleChange = (value: string, index: number) => {
        if (!/^[0-9]?$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (value && index < otp.length - 1) {
            inputRef.current[index + 1]?.focus();
        }
    };

    console.log(otp);

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number,
    ) => {
        if (e.key === "Backspace") {
            if (otp[index]) {
                const newOtp = [...otp];
                newOtp[index] = "";
                setOtp(newOtp);
            } else if (index > 0) {
                inputRef.current[index - 1]?.focus();
            }
        }
        if (e.key === "Enter") {
            handleSubmitOtp();
        }
    };

    const handleSubmitOtp = async () => {
        let code = "";
        otp.map((num) => {
            code += num;
        });

        try {
            setLoading(true);
            const res = await fetch("/api/auth/verify-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    phone_number: user.phone_number,
                    code,
                }),
            });

            const data = await res.json();

            if (data.ok) {
                toast.success("ثبت نام با موفقیت کامل شد");
                user.is_shop
                    ? router.replace("/dashboard")
                    : router.replace("/main");
                return;
            }
            toast.error(data.error, { draggable: true, closeOnClick: true });
        } catch (error) {
            toast.error("ارور");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

   useEffect(() => {
           const handlePaste = (e: ClipboardEvent) => {
               const pasted = e.clipboardData?.getData("text") ?? "";
   
               const digits = pasted
                   .replace(/\D/g, "")
                   .slice(0, otp.length)
                   .split("");
   
               setOtp((prev) => {
                   const newOtp = [...prev];
   
                   digits.forEach((digit, i) => {
                       newOtp[i] = digit;
                   });
   
                   return newOtp;
               });
   
               inputRef.current[Math.min(digits.length, otp.length - 1)]?.focus();
           };
   
           window.addEventListener("paste", handlePaste);
   
           return () => {
               window.removeEventListener("paste", handlePaste);
           };
       }, []);

    return (
        <>
            <div className="flex flex-col gap-4 w-full border-b pb-6 border-gray-400">
                <Typography variant="body1">کد ارسال شده رو وارد کن</Typography>

                <Box display="flex" gap={2} dir="ltr">
                    {otp.map((value, index) => (
                        <TextField
                            key={index}
                            value={value}
                            variant="filled"
                            size="small"
                            type="tel"
                            autoComplete="off"
                            inputRef={(el) => {
                                if (el) inputRef.current[index] = el;
                            }}
                            onChange={(e) =>
                                handleChange(e.target.value, index)
                            }
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            inputProps={{
                                maxLength: 1,
                                inputMode: "numeric",
                                style: {
                                    textAlign: "center",
                                },
                                className: " p-2! md:p-4! max-w-[45px] ",
                            }}
                            className="w-full!"
                        />
                    ))}
                </Box>

                <Button
                    variant="contained"
                    disabled={loading}
                    loading={loading}
                    onClick={handleSubmitOtp}
                >
                    ارسال کد
                </Button>
            </div>

            <Typography variant="body2" className="mt-4!">
                قبلا اکانت نداشتید؟{" "}
                <Link className="text-blue-500" href="?mode=signup">
                    ساخت اکانت
                </Link>
            </Typography>
        </>
    );
};

export default RegisterCode;
