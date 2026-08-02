"use client";

import { useState } from "react";
import {
  CalendarMonthRounded,
  ExpandMoreRounded,
  FilterAltOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Collapse,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DateObject from "react-date-object";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

export default function ReportFilters() {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({
    from_date: "",
    to_date: "",
  });
  console.log(filters);
  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 4,
      }}
    >
      {/* Header */}
      <Box
        px={3}
        py={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        onClick={() => setOpen(!open)}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography fontWeight={700}>فیلترهای پیشرفته گزارش</Typography>

          <IconButton size="small" color="primary">
            <FilterAltOutlined fontSize="small" />
          </IconButton>
        </Stack>

        <Button
          size="small"
          color="inherit"
          endIcon={
            <ExpandMoreRounded
              sx={{
                transition: ".25s",
                transform: open ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          }
        >
          {open ? "بستن فیلترها" : "باز کردن فیلترها"}
        </Button>
      </Box>

      <Collapse in={open}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack spacing={1}>
                <Typography variant="body2" fontWeight={500}>
                  از تاریخ
                </Typography>

                {/* date picker for from_date */}

                <DatePicker
                  calendar={persian}
                  locale={persian_fa}
                  value={
                    filters.from_date ? new Date(filters.from_date) : undefined
                  }
                  onChange={(value) => {
                    setFilters((prev) => ({
                      ...prev,
                      from_date:
                        value instanceof DateObject
                          ? value.toDate().toISOString()
                          : "",
                    }));
                  }}
                  render={(value, openCalendar) => (
                    <TextField
                      fullWidth
                      size="small"
                      value={value}
                      onClick={openCalendar}
                      slotProps={{
                        input: {
                          readOnly: true,
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton size="small" onClick={openCalendar}>
                                <CalendarMonthRounded fontSize="small" />
                              </IconButton>
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  )}
                />
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Stack spacing={1}>
                <Typography variant="body2" fontWeight={500}>
                  تا تاریخ
                </Typography>

                {/* date picker for to_date */}
                <DatePicker
                  calendar={persian}
                  locale={persian_fa}
                  value={
                    filters.to_date ? new Date(filters.to_date) : undefined
                  }
                  onChange={(value) => {
                    setFilters((prev) => ({
                      ...prev,
                      to_date:
                        value instanceof DateObject
                          ? value.toDate().toISOString()
                          : "",
                    }));
                  }}
                  render={(value, openCalendar) => (
                    <TextField
                      fullWidth
                      size="small"
                      value={value}
                      onClick={openCalendar}
                      slotProps={{
                        input: {
                          readOnly: true,
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton size="small" onClick={openCalendar}>
                                <CalendarMonthRounded fontSize="small" />
                              </IconButton>
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  )}
                />
              </Stack>
            </Grid>
          </Grid>

          <Stack direction="row" spacing={2} mt={4} justifyContent="flex-start">
            <Button variant="contained" size="large">
              اعمال فیلتر
            </Button>

            <Button variant="outlined" size="large">
              بازنشانی فیلترها
            </Button>
          </Stack>
        </CardContent>
      </Collapse>
    </Card>
  );
}
