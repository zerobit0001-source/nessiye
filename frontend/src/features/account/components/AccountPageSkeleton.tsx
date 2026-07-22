import Container from "@/components/dash/Container";
import { Box, Card, Skeleton } from "@mui/material";

export default function AccountPageSkeleton() {
  return (
    <Container>
      <div className="max-w-4xl m-auto p-4 md:p-0 flex flex-col gap-5 mt-5">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <Skeleton variant="text" width={180} height={40} />
            <Skeleton variant="text" width={260} height={24} />
          </div>

          <div className="flex gap-2">
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="circular" width={40} height={40} />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="rounded-xl! p-4">
              <Skeleton variant="circular" width={28} height={28} />
              <Skeleton variant="text" width="60%" height={22} sx={{ mt: 1 }} />
              <Skeleton variant="text" width="80%" height={32} />
            </Card>
          ))}
        </div>

        {/* Title */}
        <Skeleton variant="text" width={220} height={40} />

        {/* Shop Cards */}
        <div className="flex flex-col gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="rounded-xl! p-6 flex flex-col gap-6">
              {/* Shop Header */}
              <div className="flex items-center gap-3">
                <Skeleton variant="circular" width={42} height={42} />

                <div className="flex-1">
                  <Skeleton variant="text" width="40%" height={30} />
                  <Skeleton variant="text" width="60%" height={22} />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[...Array(4)].map((_, j) => (
                  <div key={j}>
                    <Skeleton variant="text" width="70%" />
                    <Skeleton variant="text" width="90%" height={32} />
                  </div>
                ))}
              </div>

              {/* Progress */}
              <Box>
                <div className="flex justify-between mb-2">
                  <Skeleton variant="text" width={120} />
                  <Skeleton variant="text" width={40} />
                </div>

                <Skeleton variant="rounded" width="100%" height={10} />
              </Box>

              {/* Button */}
              <div className="flex justify-end">
                <Skeleton variant="rounded" width={170} height={42} />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Container>
  );
}
