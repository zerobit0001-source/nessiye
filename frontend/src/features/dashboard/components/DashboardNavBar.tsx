import ToggleThemeBtn from "@/theme/ToggleThemeBtn";
import ChoseMarketDialog from "@/features/dashboard/components/ChoseMarketDialog";
import { Notifications } from "@mui/icons-material";
import { Avatar, Card, IconButton, TextField, Typography } from "@mui/material";
import Link from "next/link";

const DashboardNavBar = () => {
    return (
        <Card className="w-full py-2! px-4!  flex items-center justify-between">
            <div className="flex items-center gap-4">
                <Typography
                    variant="h6"
                    className="text-center border-l border-gray-300 pl-4"
                >
                    داشبورد
                </Typography>
                <ChoseMarketDialog />
            </div>
            <div className="flex items-center gap-4">
                <TextField
                    variant="outlined"
                    size="small"
                    label="جستجو"
                    placeholder="فروش ، خرید ، ..."
                    className="hidden! lg:block!"
                />
                <IconButton size="large">
                    <Notifications />
                </IconButton>
                <ToggleThemeBtn />
                <Link href={"/dashboard/profile"}>
                    <Avatar
                        className="cursor-pointer"
                        sx={{ bgcolor: "primary.main" }}
                    >
                        P
                    </Avatar>
                </Link>
            </div>
        </Card>
    );
};

export default DashboardNavBar;
