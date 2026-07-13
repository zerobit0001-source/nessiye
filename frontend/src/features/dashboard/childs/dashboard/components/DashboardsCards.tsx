"use client";
import SlideUpBoxAnimation from "@/components/SlideUpBoxAnimation";
import { dashboardCards } from "@/data/DashboardDatas";
import { Box, Card, Skeleton, Typography } from "@mui/material";
import { useGetDashboardCardsQuery } from "../api/ApiDashboard";
import { useEffect } from "react";

const DashboardsCards = () => {
    const { data, isLoading, error } = useGetDashboardCardsQuery();

    useEffect(() => {
        if (data) {
            console.log("Dashboard Cards Data:", data);
        }
    }, [data]);

    const dashboardData = data?.data;

    return (
        <Box className="grid grid-cols-1 lg:gap-6 md:gap-4 gap-2 md:grid-cols-3 lg:grid-cols-4">
            {dashboardCards.map((card, index) => (
                <SlideUpBoxAnimation key={card.id} delay={index / 15 + 0.1}>
                    <Card
                        sx={{
                            minWidth: 0,
                            p: 2,
                            borderTop: 2,
                            borderColor: `${card.color}.main`,
                        }}
                        className="flex flex-col gap-3"
                    >
                        {card.icon}
                        <Typography variant="body2">
                            {card.title}
                        </Typography>
                        <Typography variant="h6" className="text-end!" >
                            {isLoading ? (
                                <Skeleton width={100} />
                            ) : (
                                `${dashboardData?.[card.key].toLocaleString("fa-IR") ?? 0} ${card.unit ?? ''}`
                            )}
                        </Typography>
                        <Typography variant="body2">
                            مدت زمان : {card.period}
                        </Typography>
                    </Card>
                </SlideUpBoxAnimation>
            ))}
        </Box>
    );
};

export default DashboardsCards;
