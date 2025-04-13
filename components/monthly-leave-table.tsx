import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const monthlyData = [
  { month: "January", annual: 5, sick: 3, personal: 2, public: 1, total: 11 },
  { month: "February", annual: 3, sick: 4, personal: 1, public: 0, total: 8 },
  { month: "March", annual: 2, sick: 2, personal: 3, public: 0, total: 7 },
  { month: "April", annual: 4, sick: 1, personal: 2, public: 1, total: 8 },
  { month: "May", annual: 6, sick: 2, personal: 1, public: 1, total: 10 },
  { month: "June", annual: 8, sick: 3, personal: 2, public: 0, total: 13 },
  { month: "July", annual: 10, sick: 2, personal: 3, public: 0, total: 15 },
  { month: "August", annual: 7, sick: 4, personal: 2, public: 0, total: 13 },
  { month: "September", annual: 5, sick: 5, personal: 1, public: 0, total: 11 },
  { month: "October", annual: 3, sick: 6, personal: 2, public: 1, total: 12 },
  { month: "November", annual: 4, sick: 3, personal: 3, public: 0, total: 10 },
  { month: "December", annual: 8, sick: 2, personal: 4, public: 2, total: 16 },
]

export function MonthlyLeaveTable() {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Month</TableHead>
            <TableHead className="text-right">Annual Leave</TableHead>
            <TableHead className="text-right">Sick Leave</TableHead>
            <TableHead className="text-right">Personal Leave</TableHead>
            <TableHead className="text-right">Public Holiday</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {monthlyData.map((row) => (
            <TableRow key={row.month}>
              <TableCell className="font-medium">{row.month}</TableCell>
              <TableCell className="text-right">{row.annual}</TableCell>
              <TableCell className="text-right">{row.sick}</TableCell>
              <TableCell className="text-right">{row.personal}</TableCell>
              <TableCell className="text-right">{row.public}</TableCell>
              <TableCell className="text-right font-medium">{row.total}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell className="font-bold">Total</TableCell>
            <TableCell className="text-right font-bold">
              {monthlyData.reduce((sum, row) => sum + row.annual, 0)}
            </TableCell>
            <TableCell className="text-right font-bold">
              {monthlyData.reduce((sum, row) => sum + row.sick, 0)}
            </TableCell>
            <TableCell className="text-right font-bold">
              {monthlyData.reduce((sum, row) => sum + row.personal, 0)}
            </TableCell>
            <TableCell className="text-right font-bold">
              {monthlyData.reduce((sum, row) => sum + row.public, 0)}
            </TableCell>
            <TableCell className="text-right font-bold">
              {monthlyData.reduce((sum, row) => sum + row.total, 0)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
