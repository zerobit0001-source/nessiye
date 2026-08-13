"use client";

import { PersonAddAlt1Rounded } from "@mui/icons-material";
import {
  Button,
  Card,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

interface AddCustomerFormProps {
  isCode?: boolean;
  form: {
    phone_number: string;
    code: string;
  };
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSendCode: () => void;
  handleSubmit: () => void;
  handleCancel: () => void;
  errors: {
    phone_number: string;
    code: string;
  };
  isLoading?: boolean;
}

export default function AddCustomerForm({
  isCode = false,
  form,
  handleFormChange,
  handleSendCode,
  handleSubmit,
  handleCancel,
  errors,
  isLoading,
}: AddCustomerFormProps) {
  return (
    <Card
      elevation={1}
      className="rounded-xl! p-6 flex flex-col gap-6 max-w-lg mx-auto"
    >
      <Stack spacing={0.5}>
        <Typography variant="h6">ثبت مشتری جدید</Typography>

        <Typography variant="body2" color="text.secondary">
          شماره موبایل مشتری را وارد کنید تا کد تأیید برای او ارسال شود.
        </Typography>
      </Stack>

      <Divider />

      <Stack spacing={3}>
        <Stack spacing={1}>
          <Typography variant="body2" fontWeight={600}>
            شماره موبایل
          </Typography>

          <TextField
            fullWidth
            size="small"
            placeholder="09123456789"
            type="tel"
            disabled={isCode}
            name="phone_number"
            onChange={(e) => handleFormChange(e)}
            value={form.phone_number}
            error={!!errors.phone_number}
            helperText={errors.phone_number}
          />
        </Stack>

        {isCode && (
          <Stack spacing={1}>
            <Typography variant="body2" fontWeight={600}>
              کد تأیید
            </Typography>

            <TextField
              fullWidth
              size="small"
              placeholder="123456"
              inputProps={{
                maxLength: 6,
              }}
              name="code"
              onChange={(e) => handleFormChange(e)}
              value={form.code}
              error={!!errors.code}
              helperText={errors.code}
            />

            <Typography variant="caption" color="text.secondary">
              کد ارسال شده به شماره موبایل را وارد کنید.
            </Typography>
          </Stack>
        )}

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button variant="outlined" color="inherit" onClick={handleCancel}>
            انصراف
          </Button>

          <Button
            variant="contained"
            loading={isLoading}
            startIcon={<PersonAddAlt1Rounded />}
            onClick={isCode ? handleSubmit : handleSendCode}
            disabled={isLoading}
          >
            {isCode ? "ثبت مشتری" : "ارسال کد"}
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
}
