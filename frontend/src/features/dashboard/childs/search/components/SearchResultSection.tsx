import { Box, Paper, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  title: string;
  count: number;
  children: ReactNode;
};

export default function SearchResultSection({ title, count, children }: Props) {
  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        px={2}
        py={1.5}
      >
        <Typography fontWeight={700}>{title}</Typography>

        <Box
          sx={{
            minWidth: 28,
            height: 28,
            px: 1,
            borderRadius: 2,
            bgcolor: "action.hover",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="caption" fontWeight={700}>
            {count}
          </Typography>
        </Box>
      </Stack>

      <Stack>{children}</Stack>
    </Paper>
  );
}
