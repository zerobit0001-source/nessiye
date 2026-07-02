"use client";

import {
    CustomersDataAutoComplete,
    CustomersUsernameAndId,
    methodsAutocomplete,
} from "@/data/AutoCompletesData";
import { AddRounded, CloseRounded } from "@mui/icons-material";
import {
    Autocomplete,
    Box,
    Button,
    Checkbox,
    IconButton,
    Modal,
    TextField,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import ModalContainer from "./ModalContainer";
import { toast } from "react-toastify";
import { paymentSliceActions } from "../childs/payments/slices/paymentFormSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
    ApiCustomer,
    useGetCustomerCreditsQuery,
    useGetCustomersQuery,
    useLazyGetCustomerCreditsQuery,
} from "../childs/customers/api/ApiCustomer";
import { useAddPaymentMutation } from "../childs/payments/api/ApiPayment";
import { CustomerType, DebtType } from "@/types/types";
import { useGetModalDataQuery } from "../api/ApiModalsData";

const AddPaymentModal = () => {
    const dispatch = useAppDispatch();

    const [state, setState] = useState({
        customer: null,
        debt: null,
        amount: null,
        date: null,
        decription: null,
    });

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [selectedCustomer, setSelectedCustomer] =
        useState<CustomerType | null>(null);
    const [selectedDebt, setSelectedDebt] = useState<DebtType | null>(null);
    const [debts, setDebts] = useState<DebtType[] | []>([]);
    const [customers, setCustomers] = useState<CustomerType[] | []>([]);
    const [amount, setAmount] = useState<number>(0);
    const [check, setCheck] = useState<boolean>(false);

    // RTKQuery
    const {
        data: customersData,
        isLoading: isCustomerLoading,
        error: isCustomerError,
        isSuccess: CustomersSuccess,
    } = useGetModalDataQuery({ type: "customers" }, { skip: !open });
    const [
        getCustomerCredits,
        {
            data: Credits,
            isLoading: isCreditsLoading,
            error: CreditsError,
            isSuccess: CreditsSuccess,
        },
    ] = useLazyGetCustomerCreditsQuery();

    const [
        addPayment,
        {
            data: paymentData,
            isLoading: addPaymentLoading,
            error: addPaymentError,
            isSuccess: addPaymentSuccess,
        },
    ] = useAddPaymentMutation();

    useEffect(() => {
        if (CustomersSuccess) {
            setCustomers(customersData.customers);
        }
    }, [CustomersSuccess, customersData]);
    useEffect(() => {
        if (CreditsSuccess) {
            setDebts(Credits.debts);
        }
    }, [CreditsSuccess, Credits]);

    async function handleSubmitPayment() {
        if (!selectedDebt) {
            return;
        }

        try {
            const result = await addPayment({
                debt_id: selectedDebt.id,
                amount,
                pay_full: check,
            }).unwrap();

            if (result.ok) {
                toast.success(result.message || "پرداخت با موفقیت انجام شد");
                dispatch(ApiCustomer.util.invalidateTags(["Credits"]));
                setSelectedCustomer(null);
                setSelectedDebt(null);
                setDebts([]);
                setAmount(0);
                setCheck(false);
            } else {
                toast.error(result.data.error);
            }
        } catch (error) {
            console.error("Error adding payment:", error);
            toast.error(error.data.error);
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
                پرداخت
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
                            ثبت پرداختی
                        </Typography>
                        <IconButton color="error" onClick={handleClose}>
                            <CloseRounded />
                        </IconButton>
                    </Box>
                    <Box className="p-4">
                        <form className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <Typography variant="body2">مشتری</Typography>
                                <Autocomplete
                                    disablePortal
                                    id="category-select"
                                    options={customers}
                                    getOptionLabel={(option) =>
                                        option.full_name
                                    }
                                    value={selectedCustomer}
                                    renderOption={(props, option) => {
                                        return (
                                            <li {...props} key={option.id}>
                                                {option.full_name}
                                            </li>
                                        );
                                    }}
                                    onChange={(event, newValue) => {
                                        setSelectedCustomer(newValue);
                                        setSelectedDebt(null);
                                        if (newValue) {
                                            getCustomerCredits(newValue.id);
                                        }
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            placeholder="انتخاب کنید..."
                                        />
                                    )}
                                    size="small"
                                    fullWidth
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Typography variant="body2">نسیه</Typography>
                                <Autocomplete
                                    disablePortal
                                    id="category-select"
                                    options={debts}
                                    getOptionLabel={(option) =>
                                        `${option.id} - ${option.remaining} - ${option.created_at}`
                                    }
                                    value={selectedDebt}
                                    renderOption={(props, option) => {
                                        return (
                                            <li
                                                {...props}
                                                key={option.id}
                                                className={`${option.is_paid ? "bg-green-200 hover:bg-green-100" : "hover:bg-gray-100"} p-2 my-1 transition-all flex gap-2 `}
                                            >
                                                <span>{option.id}</span>-
                                                <span>{option.remaining}</span>-
                                                <span>{option.created_at}</span>
                                            </li>
                                        );
                                    }}
                                    onChange={(event, newValue) => {
                                        setSelectedDebt(newValue);
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            placeholder="انتخاب کنید..."
                                        />
                                    )}
                                    disabled={
                                        !selectedCustomer || debts.length === 0
                                    }
                                    size="small"
                                    fullWidth
                                />
                            </div>
                            <div className="flex items-center gap-2 w-full">
                                <div className="w-full">
                                    <Typography variant="body2">
                                        مبلغ (تومان)
                                    </Typography>
                                    <TextField
                                        placeholder="مبلغ به تومان"
                                        size="small"
                                        fullWidth
                                        value={amount}
                                        onChange={(e) => {
                                            setAmount(Number(e.target.value));
                                        }}
                                    />
                                </div>
                                <Checkbox
                                    checked={check}
                                    onChange={(e) => setCheck(e.target.checked)}
                                />
                            </div>
                            <TextField
                                multiline
                                rows={3}
                                label="توضیحات"
                                size="small"
                                // value={}
                                onChange={(e) => {
                                    dispatch(
                                        paymentSliceActions.updateForm({
                                            field: "description",
                                            value: e.target.value,
                                        }),
                                    );
                                }}
                            />
                        </form>
                    </Box>
                    <div className="flex gap-2 border-t border-gray-300 pt-4 ">
                        <Button
                            variant="contained"
                            onClick={handleSubmitPayment}
                        >
                            ثبت پرداختی
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={() => {
                                dispatch(paymentSliceActions.resetForm());
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

export default AddPaymentModal;
