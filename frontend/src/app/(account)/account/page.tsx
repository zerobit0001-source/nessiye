"use client";
import Container from "@/components/dash/Container";
import SlideUpAnimation from "@/components/SlideUpAnimation";
import { useGetMeQuery } from "@/features/account/api/ApiAccount";
import ShopsCard from "@/features/account/components/ShopsCard";
import { useAppSelector } from "@/lib/redux/hooks";
import { ReceiptRounded, StoreRounded } from "@mui/icons-material";
import {
    Box,
    Button,
    CircularProgress,
    Divider,
    Typography,
} from "@mui/material";

const page = () => {
    const user = useAppSelector((s) => s.userInfo);
    const { data, isLoading, error, isSuccess } = useGetMeQuery();

    if (isLoading) {
        return <CircularProgress />;
    }
    if (error) {
        return <p>something went wrong</p>;
    }

    const my_shops = isSuccess ? data.shops : [];

    console.log(data);

    return (
        <Container>
            <SlideUpAnimation>
                <div className="px-4 md:px-0">
                    <Box>
                        <Typography variant="caption">
                            شنبه ، 26 خرداد 1405
                        </Typography>
                        <p className="font-bold! text-xl! md:text-2xl! lg:3xl!">
                            درود ، {user.full_name} 👋
                        </p>
                        <Typography variant="caption">
                            خلاصه بدهی‌های شما در فروشگاه‌های مختلف
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            bgcolor: "primary.main",
                            color: "white",
                            borderRadius: 5,
                            p: 5,
                        }}
                        className="w-full"
                    >
                        <div className="">
                            <Typography variant="body2">
                                مجموع بدهی کل
                            </Typography>
                            <p className="font-bold! text-xl! md:text-2xl! lg:3xl!">
                                {data?.total_amount.toLocaleString("fa-IR")}
                            </p>
                            <Typography variant="body2">تومان</Typography>
                        </div>
                        <Divider
                            sx={{
                                borderColor: "rgba(255,255,255,0.18)",
                                my: 2.5,
                            }}
                        />
                        <div className="flex gap-4 w-full">
                            <Box
                                sx={{
                                    bgcolor: "rgba(255,255,255,0.12)",
                                    backdropFilter: "blur(8px)",
                                    border: "1px solid rgba(255,255,255,0.15)",
                                    borderRadius: 5,
                                    py: 5,
                                }}
                                className="w-full p-5 flex flex-col items-center gap-2"
                            >
                                <StoreRounded />
                                <p className="font-bold! text-xl! md:text-2xl! lg:3xl!">
                                    {data?.shops.length}
                                </p>
                                <Typography variant="body2">
                                    فروشگاه بدهکار
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    bgcolor: "rgba(255,255,255,0.12)",
                                    backdropFilter: "blur(8px)",
                                    border: "1px solid rgba(255,255,255,0.15)",
                                    borderRadius: 5,
                                    py: 5,
                                }}
                                className="w-full p-5 flex flex-col items-center gap-2"
                            >
                                <ReceiptRounded />
                                <p className="font-bold! text-xl! md:text-2xl! lg:3xl!">
                                    {data?.number_of_debts}
                                </p>
                                <Typography variant="body2">
                                    فاکتور باز
                                </Typography>
                            </Box>
                        </div>
                    </Box>
                    <div className="flex items-center justify-between w-full my-4!">
                        <div className="">
                            <Typography variant="h5" className="font-bold!">
                                فروشگاه های بدهکار
                            </Typography>
                        </div>
                        <Button variant="outlined">5 فروشگاه</Button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {my_shops?.map((shop) => (
                            <ShopsCard shop={shop} key={shop.shop_id} />
                        ))}
                    </div>
                </div>
            </SlideUpAnimation>
        </Container>
    );
};

export default page;
