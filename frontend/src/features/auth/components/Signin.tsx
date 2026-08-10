"use client";

import { useAppDispatch } from "@/lib/redux/hooks";
import { Button, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import z from "zod";
import { userInfoActions } from "../slices/userInformationsSlice";

const validatePhone = z
  .string()
  .trim()
  .nonempty("شماره موبایل نمی‌تواند خالی باشد.")
  .regex(/^09\d{9}$/, "شماره موبایل باید با 09 شروع شده و 11 رقم باشد.");
const Signin = () => {
  const [phone, setPhone] = useState<string>("");
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const dispatch = useAppDispatch();

  const handleValueChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPhone(() => e.target.value);
    const value = e.target.value;

    setPhone(value);

    const validationResult = validatePhone.safeParse(value);

    if (!validationResult.success) {
      setPhoneError(validationResult.error.issues[0].message);
      return;
    }

    setPhoneError(null);
  };

  const handleSendOtpCode = async () => {
    const validationError = validatePhone.safeParse(phone);
    if (!validationError.success) {
      setPhoneError(validationError.error.issues[0].message);
      return;
    }

    setPhoneError(null);
    setLoading(true);

    // --- Simulate API Call ---

    try {
      const res = await fetch("/api/auth/send-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone_number: phone,
        }),
      });

      const data = await res.json();

      if (!data.ok) {
        toast.error(data.error);
        return;
      }

      console.log(data);
      dispatch(
        userInfoActions.updateForm({
          field: "phone_number",
          value: phone,
        }),
      );
      toast.success(data.message);
      router.push("?mode=login-code");
    } catch (error) {
      console.log(error);
      toast.error("خطا در ارسال کد");
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4 w-full border-b pb-6 border-gray-400">
        <Typography variant="body1">ورود به اکانت</Typography>
        <TextField
          label="شماره موبایل"
          size="small"
          type="tel"
          placeholder="09123456789"
          required
          autoComplete="off"
          autoFocus
          value={phone}
          onChange={handleValueChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              // Trigger button click via its ref
              buttonRef.current?.click();
            }
          }}
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
            maxLength: 15,
          }}
          error={!!phoneError}
          helperText={
            phoneError
              ? phoneError
              : "شماره ای که با آن ثبت نام کردید"
          }
        />

        <Button
          variant="contained"
          onClick={handleSendOtpCode}
          ref={buttonRef}
          disabled={loading || !!phoneError}
        >
          {loading ? "درحال پردازش..." : "ارسال کد"}
        </Button>
      </div>
      <Typography variant="body2" className="mt-4!">
        قبلا اکانت نداشتید ؟{" "}
        <Link className="text-blue-500" href={"?mode=signup"}>
          {" "}
          ساخت اکانت{" "}
        </Link>
      </Typography>
    </>
  );
};

export default Signin;
