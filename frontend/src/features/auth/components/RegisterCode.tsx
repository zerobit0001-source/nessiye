"use client";

import { useAppSelector } from "@/lib/redux/hooks";
import { Box, Button, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const RegisterCode = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRef = useRef<HTMLInputElement[]>([]);
  const [loading, setLoading] = useState(false);

  const user = useAppSelector((s) => s.userInfo);
  const router = useRouter();

  const handleSubmitOtp = async (code?: string) => {
    const finalCode = code ?? otp.join("");

    if (finalCode.length !== otp.length) {
      toast.error("لطفا کد را کامل وارد کنید");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone_number: user.phone_number,
          code: finalCode,
        }),
      });

      const data = await res.json();

      if (data.ok) {
        toast.success("ثبت نام با موفقیت کامل شد");

        if (user.is_shop) {
          router.replace("/dashboard");
        } else {
          router.replace("/main");
        }

        return;
      }

      toast.error(data.error || "خطایی رخ داد", {
        draggable: true,
        closeOnClick: true,
      });
    } catch (error) {
      console.error(error);
      toast.error("خطایی رخ داد");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputRef.current[index + 1]?.focus();
    }

    // Submit when the last digit is entered
    if (index === otp.length - 1 && value) {
      handleSubmitOtp(newOtp.join(""));
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
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

  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();

    const pasted = e.clipboardData.getData("text");

    const digits = pasted
      .replace(/\D/g, "")
      .slice(0, otp.length)
      .split("");

    const newOtp = [...otp];

    digits.forEach((digit, i) => {
      newOtp[i] = digit;
    });

    setOtp(newOtp);

    if (digits.length === otp.length) {
      handleSubmitOtp(newOtp.join(""));
    } else {
      inputRef.current[Math.min(digits.length, otp.length - 1)]?.focus();
    }
  };

  useEffect(() => {
    inputRef.current[0]?.focus();
  }, []);

  return (
    <>
      <Typography variant="h6" className="mb-4!">
        کد ارسال شده رو وارد کن
      </Typography>

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
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            inputProps={{
              maxLength: 1,
              inputMode: "numeric",
              style: {
                textAlign: "center",
              },
              className: "p-2! md:p-4! max-w-[45px]",
            }}
            className="w-full!"
          />
        ))}
      </Box>

      <Button
        variant="contained"
        loading={loading}
        disabled={loading}
        onClick={() => handleSubmitOtp()}
        className="mt-4!"
      >
        ارسال کد
      </Button>

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
