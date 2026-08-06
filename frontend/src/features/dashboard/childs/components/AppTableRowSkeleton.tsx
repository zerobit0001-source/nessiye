import { Skeleton, TableCell, TableRow } from "@mui/material";


export default function AppTableRowSkeleton({ columns, rows }: { columns: number; rows: number }) {


  return (
  <>
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <TableRow key={rowIndex}>
        {Array.from({ length: columns }).map((_, colIndex) => (
          <TableCell key={colIndex} >
            <Skeleton  variant="text" width="100%" height="100%" />
          </TableCell>
        ))}
      </TableRow>
    ))}
  </>
      )

}
