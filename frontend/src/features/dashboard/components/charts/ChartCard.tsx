import { Card, CardContent, Stack, Typography } from "@mui/material";

type ChartCardProps = {
  title: string;
  caption: string;
  icon: React.ReactNode;
  children: React.ReactNode;
};

export function ChartCard({ title, caption, icon, children }: ChartCardProps) {
  return (
    <Card>
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          className="w-full mb-4"
        >
          <span>
            <Typography variant="body1" className="font-bold!">
              {title}
            </Typography>
            <Typography variant="caption">{caption}</Typography>
          </span>

          {icon}
        </Stack>

        {children}
      </CardContent>
    </Card>
  );
}
