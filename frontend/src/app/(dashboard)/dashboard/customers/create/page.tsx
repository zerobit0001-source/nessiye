"use client";
import Container from "@/components/dash/Container";
import SlideUpAnimation from "@/components/SlideUpAnimation";
import CreatePagesTitle from "@/features/dashboard/childs/components/CreatePagesTitle";
import {
  useAddCustomerMutation,
  useVerifyCustomerMutation,
} from "@/features/dashboard/childs/customers/api/ApiCustomer";
import AddCustomerForm from "@/features/dashboard/childs/customers/components/AddCustomerForm";
import { validateAddCustomerForm } from "@/utils/validations/CustomerValidation";
import { Typography } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";

export default function CreateCustomerPage() {
  const [form, setForm] = useState({
    phone_number: "",
    code: "",
  });

  const [errors, setErrors] = useState({
    phone_number: "",
    code: "",
  });
  const [isCode, setIsCode] = useState(false);

  const [sendCode, sendCodeQuery] = useAddCustomerMutation();
  const [verifyCustomer, verifyCustomerQuery] = useVerifyCustomerMutation();

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSendCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form);
    const validation = validateAddCustomerForm.safeParse({
      phone_number: form.phone_number,
    });

    if (!validation.success) {
      const issue = validation.error.issues[0];

      setErrors({
        phone_number: issue.message,
        code: "",
      });

      return;
    }

    setErrors({
      phone_number: "",
      code: "",
    });

    try {
      const result = await sendCode(form).unwrap();

      console.log("Add product result:", result);

      if (result.ok) {
        toast.success("کد برای مشتری ارسال شد");
        setIsCode(true);
      } else {
        toast.error("خطا در ارسال کد مشتری");
      }
    } catch (error) {
      console.log("Error adding product:", error);
      toast.error(error.data.error || "خطا در ثبت مشتری");
      return;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = validateAddCustomerForm.safeParse({
      code: form.code,
    });

    if (!validation.success) {
      const issue = validation.error.issues[0];

      setErrors({
        phone_number: "",
        code: issue.message,
      });

      return;
    }

    setErrors({
      phone_number: "",
      code: "",
    });

    try {
      const result = await verifyCustomer(form).unwrap();

      console.log("Add product result:", result);

      if (result.ok) {
        toast.success("مشتری اضافه شد");
        setIsCode(false);
      } else {
        toast.error("خطا در اضافه کردن مشتری");
      }
    } catch (error) {
      console.log("Error adding product:", error);
      toast.error(error.data.error || "خطا در ثبت مشتری");
      return;
    }
    setForm({ phone_number: "", code: "" });
  };

  const handleCancel = () => {
    setForm({ phone_number: "", code: "" });
    setIsCode(false);
  };

  return (
    <Container>
        <CreatePagesTitle title="ثبت مشتری جدید" subtitle="اطلاعات خواسته شده را تکمیل کنید" />
        <div className="w-full flex items-center justify-center">
          <AddCustomerForm
            form={form}
            handleFormChange={handleFormChange}
            isCode={isCode}
            handleSendCode={handleSendCode}
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
            errors={errors}
            isLoading={sendCodeQuery.isLoading || verifyCustomerQuery.isLoading}
          />
        </div>
    </Container>
  );
}
