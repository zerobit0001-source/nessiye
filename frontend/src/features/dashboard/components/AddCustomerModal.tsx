"use client";

import { AddRounded, CloseRounded } from "@mui/icons-material";
import {
    Box,
    Button,
    IconButton,
    Modal,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";
import ModalContainer from "./ModalContainer";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { customerSliceActions } from "../childs/customers/slices/customerFormSlice";
import { CustomerModalFormType } from "@/types/modalsTypes";
import { validateAddCustomerForm } from "@/utils/validations/CustomerValidation";
import {
    useAddCustomerMutation,
    useVerifyCustomerMutation,
} from "../childs/customers/api/ApiCustomer";

const AddCustomerModal = () => {
    const formData = useAppSelector((s) => s.customersForm);
    const dispatch = useAppDispatch();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [isCode, setIsCode] = useState(false);

    const [form, setForm] = useState<CustomerModalFormType>({
        phone_number: "",
        code: "",
    });

    const [addCustomer, { isLoading, error, data }] = useAddCustomerMutation();
    const [
        verifyCustomer,
        { isLoading: isvrifying, error: verifyError, data: vrifyData },
    ] = useVerifyCustomerMutation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let { name, value }: { name: string; value: string | number } =
            e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        type FormFields = keyof typeof validateAddCustomerForm.shape;

        const fieldName = name as FormFields;

        dispatch(
            customerSliceActions.updateForm({ field: fieldName, value: value }),
        );
    };

    async function handleSentCode() {
        const isValid = validateAddCustomerForm.safeParse({
            phone_number: form.phone_number,
        });
        if (!isValid.success) {
            toast.error(isValid.error.issues[0].message);
 
            return;
        }
 
        try {
            const result = await addCustomer(form).unwrap();
 
            if (result.ok) {
                toast.success("کد برای مشتری ارسال شد");
                dispatch(customerSliceActions.resetForm());
                setIsCode(true);
            } else {
                toast.error("خطا در ارسال کد مشتری");
            }
        } catch (error) {
 
            toast.error(error.data.error || "خطا در ثبت مشتری");
            return;
        }
    }

    async function handleVerifyCustomer() {
        const isValid = validateAddCustomerForm.safeParse({
            code: form.code,
        });
        if (!isValid.success) {
            toast.error(isValid.error.issues[0].message);
 
            return;
        }
 
        try {
            const result = await verifyCustomer(form).unwrap();
 
            if (result.ok) {
                toast.success("مشتری اضافه شد");
                dispatch(customerSliceActions.resetForm());
                setIsCode(false);
                handleClose();
            } else {
                toast.error("خطا در اضافه کردن مشتری");
            }
        } catch (error) {
 
            toast.error(error.data.error || "خطا در ثبت مشتری");
            return;
        }
    }

    return (
        <>
            <Button
                endIcon={<AddRounded fontSize="small" />}
                variant="contained"
                onClick={handleOpen}
            >
                مشتری
            </Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className=" bg-black/10 backdrop-blur-xs transition-all "
            >
                <ModalContainer>
                    <Box className="p-2 flex items-center justify-between w-full border-b border-gray-200">
                        <Typography variant="subtitle1" className="font-bold!">
                            ثبت مشتری جدید
                        </Typography>
                        <IconButton color="error" onClick={handleClose}>
                            <CloseRounded />
                        </IconButton>
                    </Box>
                    <Box className="p-4">
                        <form
                            className="flex flex-col gap-4"
                            onSubmit={
                                isCode ? handleVerifyCustomer : handleSentCode
                            }
                        >
                            <div className="w-full">
                                <Typography variant="body2">
                                    شماره موبایل
                                </Typography>
                                <TextField
                                    name="phone_number"
                                    placeholder="*******0922"
                                    size="small"
                                    fullWidth
                                    value={form.phone_number}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="w-full">
                                <Typography variant="body2">کد</Typography>
                                <TextField
                                    name="code"
                                    placeholder="******"
                                    size="small"
                                    fullWidth
                                    value={form.code}
                                    onChange={handleChange}
                                />
                            </div>
                        </form>
                    </Box>
                    <div className="flex gap-2 border-t border-gray-300 pt-4 ">
                        <Button
                            variant="contained"
                            onClick={
                                isCode ? handleVerifyCustomer : handleSentCode
                            }
                            disabled={isLoading}
                        >
                            {isCode ? " ثبت مشتری" : "ارسال کد"}
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={() => {
                                dispatch(customerSliceActions.resetForm());
                                handleClose();
                            }}
                        >
                            انصراف
                        </Button>
                    </div>
                </ModalContainer>
            </Modal>
        </>
    );
};

export default AddCustomerModal;
