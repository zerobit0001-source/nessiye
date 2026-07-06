"use client";

import { Box, Skeleton } from "@mui/material";

const PaymentsRowSkeleton = () => {
    return (
        <Box
            className="
                w-300
                xl:w-full
                grid
                grid-cols-6
                items-center
                p-4
                border-b
                border-gray-300
            "
        >
            <Box className="flex justify-center">
                <Skeleton variant="text" width={30} height={28} />
            </Box>

            <Box className="flex justify-center">
                <Skeleton variant="text" width={120} height={28} />
            </Box>

            <Box className="flex justify-center">
                <Skeleton variant="text" width={100} height={28} />
            </Box>

            <Box className="flex justify-center">
                <Skeleton variant="text" width={100} height={28} />
            </Box>

            <Box className="flex justify-center">
                <Skeleton variant="text" width={100} height={28} />
            </Box>

            <Box className="flex justify-center">
                <Skeleton variant="text" width={120} height={28} />
            </Box>

        </Box>
    );
};

export default PaymentsRowSkeleton;