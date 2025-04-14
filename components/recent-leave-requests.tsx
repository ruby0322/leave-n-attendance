import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const recentRequests = [
  {
    id: "REQ-001",
    type: "Annual Leave",
    startDate: "2023-10-15",
    endDate: "2023-10-18",
    status: "Approved",
    approver: "Jane Smith",
  },
  {
    id: "REQ-002",
    type: "Sick Leave",
    startDate: "2023-09-05",
    endDate: "2023-09-06",
    status: "Approved",
    approver: "Jane Smith",
  },
  {
    id: "REQ-003",
    type: "Personal Leave",
    startDate: "2023-11-20",
    endDate: "2023-11-20",
    status: "Pending",
    approver: "-",
  },
  {
    id: "REQ-004",
    type: "Annual Leave",
    startDate: "2023-12-24",
    endDate: "2023-12-31",
    status: "Pending",
    approver: "-",
  },
]

export function RecentLeaveRequests() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Request ID</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Period</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Approver</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recentRequests.map((request) => (
          <TableRow key={request.id}>
            <TableCell className="font-medium">{request.id}</TableCell>
            <TableCell>{request.type}</TableCell>
            <TableCell>
              {request.startDate} to {request.endDate}
            </TableCell>
            <TableCell>
              <Badge
                variant={
                  request.status === "Approved" ? "default" : request.status === "Rejected" ? "destructive" : "outline"
                }
              >
                {request.status}
              </Badge>
            </TableCell>
            <TableCell>{request.approver}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
