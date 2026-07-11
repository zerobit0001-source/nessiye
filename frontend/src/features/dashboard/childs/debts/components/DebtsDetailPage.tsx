"use client";

import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Divider,
    Grid,
    LinearProgress,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import {
    ArrowBack,
    CheckCircleRounded,
    LocalMallRounded,
    PersonRounded,
    PhoneRounded,
    PaymentsRounded,
    ArrowForwardIosRounded,
} from "@mui/icons-material";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { useGetDebtByIdQuery } from "../../sales/api/ApiSales";
import Link from "next/link";

interface Props {
    id: number;
}

const MotionCard = motion(Card);

const money = (value: number) => new Intl.NumberFormat("fa-IR").format(value);

export default function DebtsDetailPage({ id }: Props) {
    const { data, isLoading, error } = useGetDebtByIdQuery(id);

    if (isLoading)
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="80vh"
            >
                <CircularProgress />
            </Box>
        );

    if (error || !data)
        return (
            <Typography color="error">
                دریافت اطلاعات با خطا مواجه شد.
            </Typography>
        );

    const debt = data.debt;

    const percent = data?.debt.amount
        ? (data.debt.paid_amount / data.debt.amount) * 100
        : 0;

    return (
        <Box
            sx={{
                maxWidth: 1600,
                mx: "auto",
            }}
        >
            {/* Header */}

            <Stack
                direction={{
                    xs: "column",
                    md: "row",
                }}
                justifyContent="space-between"
                alignItems={{
                    xs: "flex-start",
                    md: "center",
                }}
                spacing={2}
                mb={4}
            >
                <Stack direction="row" spacing={2} alignItems="center">
                    <Link href={"/dashboard/debts"}>
                        <Button
                            startIcon={<ArrowForwardIosRounded />}
                            variant="outlined"
                        >
                            بازگشت
                        </Button>
                    </Link>

                    <Typography variant="h5" fontWeight="bold">
                        جزئیات بدهی
                    </Typography>
                </Stack>

                <Button
                    variant="contained"
                    size="large"
                    startIcon={<PaymentsRounded />}
                    sx={{
                        borderRadius: 3,
                    }}
                >
                    ثبت پرداخت
                </Button>
            </Stack>

            {/* Hero */}

            <MotionCard
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                sx={{
                    mb: 4,
                    borderRadius: 6,
                    background:
                        "linear-gradient(135deg,#2563eb,#1d4ed8,#0f172a)",
                    color: "#fff",
                    overflow: "hidden",
                }}
            >
                <CardContent
                    sx={{
                        p: 5,
                    }}
                >
                    <Grid container spacing={4}>
                        <Grid size={{ xs: 12, lg: 6 }}>
                            <Stack
                                direction="row"
                                spacing={3}
                                alignItems="center"
                            >
                                <Avatar
                                    sx={{
                                        width: 80,
                                        height: 80,
                                        bgcolor: "rgba(255,255,255,.15)",
                                    }}
                                >
                                    <PersonRounded fontSize="large" />
                                </Avatar>

                                <Box>
                                    <Typography variant="h5" fontWeight="bold">
                                        {debt.customer_name}
                                    </Typography>

                                    <Stack direction="row" spacing={1} mt={1}>
                                        <PhoneRounded />

                                        <Typography>
                                            {debt.customer_phone}
                                        </Typography>
                                    </Stack>

                                    <Chip
                                        sx={{
                                            mt: 2,
                                            bgcolor: debt.is_paid
                                                ? "#22c55e"
                                                : "#f59e0b",
                                            color: "#fff",
                                            fontWeight: "bold",
                                        }}
                                        icon={<CheckCircleRounded />}
                                        label={
                                            debt.is_paid
                                                ? "تسویه شده"
                                                : "دارای بدهی"
                                        }
                                    />
                                </Box>
                            </Stack>
                        </Grid>

                        <Grid size={{ xs: 12, lg: 6 }}>
                            <Typography
                                variant="h4"
                                fontWeight="bold"
                                textAlign={{
                                    xs: "left",
                                    lg: "right",
                                }}
                            >
                                {money(debt.amount)}
                            </Typography>

                            <Typography
                                textAlign={{
                                    xs: "left",
                                    lg: "right",
                                }}
                            >
                                تومان
                            </Typography>

                            <Box mt={4}>
                                <LinearProgress
                                    variant="determinate"
                                    value={percent}
                                    sx={{
                                        height: 12,
                                        borderRadius: 20,

                                        "& .MuiLinearProgress-bar": {
                                            transformOrigin: "right",
                                        },
                                    }}
                                />

                                <Typography mt={1} variant="body2">
                                    {percent.toFixed(0)}٪ پرداخت شده
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
            </MotionCard>

            {/* Summary */}

            <Grid container spacing={3}>
                {[
                    {
                        title: "مبلغ کل",
                        value: debt.amount,
                        color: "#3b82f6",
                    },
                    {
                        title: "پرداخت شده",
                        value: debt.paid_amount,
                        color: "#22c55e",
                    },
                    {
                        title: "باقیمانده",
                        value: debt.remaining,
                        color: "#ef4444",
                    },
                ].map((card) => (
                    <Grid
                        key={card.title}
                        size={{
                            xs: 12,
                            sm: 6,
                            md: 4,
                        }}
                    >
                        <MotionCard
                            whileHover={{
                                y: -8,
                            }}
                            sx={{
                                borderRadius: 5,
                                height: "100%",
                                background: "rgba(255,255,255,.04)",
                                backdropFilter: "blur(20px)",
                            }}
                        >
                            <CardContent>
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <Typography color="text.secondary">
                                        {card.title}
                                    </Typography>

                                    <Avatar
                                        sx={{
                                            bgcolor: card.color,
                                        }}
                                    >
                                        <PaymentsRounded />
                                    </Avatar>
                                </Stack>

                                <Typography
                                    mt={4}
                                    variant="h5"
                                    fontWeight="bold"
                                >
                                    {money(card.value)}
                                </Typography>

                                <Typography color="text.secondary">
                                    تومان
                                </Typography>
                            </CardContent>
                        </MotionCard>
                    </Grid>
                ))}
            </Grid>

            <Divider sx={{ my: 5 }} />

            <Grid container spacing={4}>
                {" "}
                {/* Products */}
                <Grid
                    size={{
                        xs: 12,
                        lg: 7,
                    }}
                >
                    <MotionCard
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        sx={{
                            borderRadius: 5,
                            height: "100%",
                            background: "rgba(255,255,255,.04)",
                            backdropFilter: "blur(20px)",
                        }}
                    >
                        <CardContent>
                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={1}
                                mb={3}
                            >
                                <LocalMallRounded color="primary" />
                                <Typography variant="h6" fontWeight="bold">
                                    کالاهای خریداری شده
                                </Typography>
                            </Stack>

                            {debt.items.length === 0 ? (
                                <Paper
                                    sx={{
                                        p: 5,
                                        textAlign: "center",
                                        borderRadius: 4,
                                    }}
                                >
                                    <Typography color="text.secondary">
                                        کالایی ثبت نشده است.
                                    </Typography>
                                </Paper>
                            ) : (
                                <Stack spacing={2}>
                                    {debt.items.map((item: any) => (
                                        <Paper
                                            key={item.id}
                                            elevation={0}
                                            sx={{
                                                borderRadius: 4,
                                                p: 2.5,
                                                transition: ".25s",
                                                border: "1px solid",
                                                borderColor: "divider",
                                                "&:hover": {
                                                    transform:
                                                        "translateY(-4px)",
                                                    borderColor: "primary.main",
                                                    boxShadow:
                                                        "0 12px 30px rgba(0,0,0,.18)",
                                                },
                                            }}
                                        >
                                            <Stack
                                                direction={{
                                                    xs: "column",
                                                    sm: "row",
                                                }}
                                                spacing={2}
                                                justifyContent="space-between"
                                                alignItems={{
                                                    xs: "flex-start",
                                                    sm: "center",
                                                }}
                                            >
                                                <Stack
                                                    direction="row"
                                                    spacing={2}
                                                    alignItems="center"
                                                >
                                                    <Avatar
                                                        sx={{
                                                            bgcolor:
                                                                "primary.main",
                                                        }}
                                                    >
                                                        <LocalMallRounded />
                                                    </Avatar>

                                                    <Box>
                                                        <Typography
                                                            fontWeight={700}
                                                        >
                                                            {item.product_name}
                                                        </Typography>

                                                        <Typography
                                                            variant="body2"
                                                            color="text.secondary"
                                                        >
                                                            شناسه محصول:{" "}
                                                            {item.product_id}
                                                        </Typography>
                                                    </Box>
                                                </Stack>

                                                <Stack
                                                    direction="row"
                                                    spacing={5}
                                                >
                                                    <Box textAlign="center">
                                                        <Typography
                                                            variant="caption"
                                                            color="text.secondary"
                                                        >
                                                            تعداد
                                                        </Typography>

                                                        <Typography
                                                            fontWeight={700}
                                                        >
                                                            {item.quantity}
                                                        </Typography>
                                                    </Box>

                                                    <Box textAlign="center">
                                                        <Typography
                                                            variant="caption"
                                                            color="text.secondary"
                                                        >
                                                            قیمت واحد
                                                        </Typography>

                                                        <Typography
                                                            fontWeight={700}
                                                        >
                                                            {money(item.price)}
                                                        </Typography>
                                                    </Box>

                                                    <Box textAlign="center">
                                                        <Typography
                                                            variant="caption"
                                                            color="text.secondary"
                                                        >
                                                            جمع
                                                        </Typography>

                                                        <Typography
                                                            color="primary.main"
                                                            fontWeight={700}
                                                        >
                                                            {money(
                                                                item.quantity *
                                                                    item.price,
                                                            )}
                                                        </Typography>
                                                    </Box>
                                                </Stack>
                                            </Stack>
                                        </Paper>
                                    ))}
                                </Stack>
                            )}
                        </CardContent>
                    </MotionCard>
                </Grid>
                {/* Payments */}
                <Grid
                    size={{
                        xs: 12,
                        lg: 5,
                    }}
                >
                    <MotionCard
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        sx={{
                            borderRadius: 5,
                            background: "rgba(255,255,255,.04)",
                            backdropFilter: "blur(20px)",
                        }}
                    >
                        <CardContent>
                            <Typography variant="h6" fontWeight="bold" mb={3}>
                                تاریخچه پرداخت‌ها
                            </Typography>

                            {debt.payments.length === 0 ? (
                                <Paper
                                    sx={{
                                        p: 5,
                                        textAlign: "center",
                                        borderRadius: 4,
                                    }}
                                >
                                    <Typography color="text.secondary">
                                        هنوز پرداختی ثبت نشده است.
                                    </Typography>
                                </Paper>
                            ) : (
                                <Stack spacing={3}>
                                    {debt.payments.map((payment: any) => (
                                        <Stack
                                            key={payment.id}
                                            direction="row"
                                            spacing={2}
                                        >
                                            <Avatar
                                                sx={{
                                                    bgcolor: "success.main",
                                                }}
                                            >
                                                <CheckCircleRounded />
                                            </Avatar>

                                            <Paper
                                                elevation={0}
                                                sx={{
                                                    flex: 1,
                                                    p: 2,
                                                    borderRadius: 4,
                                                    border: "1px solid",
                                                    borderColor: "divider",
                                                }}
                                            >
                                                <Typography fontWeight={700}>
                                                    {money(payment.amount)}{" "}
                                                    تومان
                                                </Typography>

                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                    mt={1}
                                                >
                                                    {new Date(
                                                        payment.created_at,
                                                    ).toLocaleString("fa-IR")}
                                                </Typography>
                                            </Paper>
                                        </Stack>
                                    ))}
                                </Stack>
                            )}
                        </CardContent>
                    </MotionCard>
                </Grid>
            </Grid>
        </Box>
    );
}
