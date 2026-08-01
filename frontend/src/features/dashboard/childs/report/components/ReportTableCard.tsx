import { Box, Card, Typography } from "@mui/material";
import React from "react";

interface ReportTableCardProps<T> {
  icon: React.ReactNode;
  title: string;
  caption: string;
  tableHeaderTitles: string[];
  data: T[];
  rowRender: (item: T, index: number) => React.ReactNode;
}

export default function ReportTableCard<T>({
  icon,
  title,
  caption,
  tableHeaderTitles,
  data,
  rowRender,
}: ReportTableCardProps<T>) {
  return (
    <Card sx={{ p: 2 }} className="rounded-lg!">
      <Box className="flex items-center justify-between mb-4">
        <Box className="flex items-center gap-2">
          {icon}
          <Typography variant="h6" fontWeight={700}>
            {title}
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary">
          {caption}
        </Typography>
      </Box>

      <table className="w-full border-collapse "> 
        <thead>
          <tr className="border-b border-gray-300 ">
            {tableHeaderTitles.map((header, index) => (
              <th key={index} className="py-2 text-right font-semibold">
                <Typography variant="body2">{header}</Typography>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className="border-b border-gray-200 last:border-b-0"
            >
              {rowRender(item, index)}
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
