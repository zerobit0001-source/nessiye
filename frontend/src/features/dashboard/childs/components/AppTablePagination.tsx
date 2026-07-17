"use client";

import { Box, IconButton, Pagination, Stack, Typography } from "@mui/material";
import { ChevronLeft, ChevronRight, MoreHoriz } from "@mui/icons-material";

interface AppTablePaginationProps {
  page: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onChange: (page: number) => void;
}

export default function AppTablePagination({
  page,
  totalPages,
  totalItems,
  pageSize,
  onChange,
}: AppTablePaginationProps) {
  const start = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalItems);

  return (
    <Box
      sx={{
        mt: 2,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
        p: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 2,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        نمایش {start} تا {end} از {totalItems} رکورد
      </Typography>

      <Stack direction="row" spacing={1} alignItems="center">
        <IconButton disabled={page === 1} onClick={() => onChange(page - 1)}>
          <ChevronRight />
        </IconButton>

        <Pagination
          page={page}
          count={totalPages}
          onChange={(_, value) => onChange(value)}
          color="primary"
          shape="rounded"
          siblingCount={1}
          boundaryCount={1}
          renderItem={(item) => {
            if (
              item.type === "start-ellipsis" ||
              item.type === "end-ellipsis"
            ) {
              return (
                <IconButton disabled>
                  <MoreHoriz fontSize="small" />
                </IconButton>
              );
            }

            return undefined;
          }}
        />

        <IconButton
          disabled={page === totalPages}
          onClick={() => onChange(page + 1)}
        >
          <ChevronLeft />
        </IconButton>
      </Stack>
    </Box>
  );
}
