import { Card, TextField, Typography } from "@mui/material";

export default function CreateProductForm() {
  return (
    <Card className="p-4 rounded-lg! " elevation={1}>
      <form>
        <TextField size="small" label="نام کالا *" />
      </form>
    </Card>
  );
}
