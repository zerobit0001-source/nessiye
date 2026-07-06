"use client";

import { Avatar, Box, Skeleton } from "@mui/material";

const CustomerRowSkeleton = () => {
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
            <Box className="flex items-center gap-2">
                <Skeleton variant="circular">
                    <Avatar />
                </Skeleton>

                <Skeleton
                    variant="text"
                    width={120}
                    height={28}
                />
            </Box>

            <Box className="flex justify-center">
                <Skeleton
                    variant="text"
                    width={110}
                    height={28}
                />
            </Box>

            <Box className="flex justify-center">
                <Skeleton
                    variant="text"
                    width={90}
                    height={28}
                />
            </Box>

            <Box className="flex justify-center">
                <Skeleton
                    variant="text"
                    width={90}
                    height={28}
                />
            </Box>

            <Box className="flex justify-center">
                <Skeleton
                    variant="text"
                    width={90}
                    height={28}
                />
            </Box>

            <Box className="flex justify-center">
                <Skeleton
                    variant="rounded"
                    width={80}
                    height={36}
                />
            </Box>
        </Box>
    );
};

export default CustomerRowSkeleton;