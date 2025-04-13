"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { Check, Eye, MoreHorizontal, X } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

// Sample data for leave requests
const myRequests = [
  {
    id: "REQ-001",
    type: "Annual Leave",
    startDate: "2023-10-15",
    endDate: "2023-10-18",
    reason: "Family vacation",
    status: "Approved",
    proxyPerson: "Alice Johnson",
    approver: "Jane Smith",
  },
  {
    id: "REQ-002",
    type: "Sick Leave",
    startDate: "2023-09-05",
    endDate: "2023-09-06",
    reason: "Fever",
    status: "Approved",
    proxyPerson: "Bob Smith",
    approver: "Jane Smith",
  },
  {
    id: "REQ-003",
    type: "Personal Leave",
    startDate: "2023-11-20",
    endDate: "2023-11-20",
    reason: "Personal matters",
    status: "Pending",
    proxyPerson: "Carol Williams",
    approver: "-",
  },
  {
    id: "REQ-004",
    type: "Annual Leave",
    startDate: "2023-12-24",
    endDate: "2023-12-31",
    reason: "Year-end holiday",
    status: "Pending",
    proxyPerson: "David Brown",
    approver: "-",
  },
]

const pendingApproval = [
  {
    id: "REQ-005",
    employee: "John Doe",
    type: "Annual Leave",
    startDate: "2023-10-25",
    endDate: "2023-10-27",
    reason: "Family event",
    status: "Pending",
    proxyPerson: "Alice Johnson",
  },
  {
    id: "REQ-006",
    employee: "Sarah Lee",
    type: "Sick Leave",
    startDate: "2023-10-18",
    endDate: "2023-10-19",
    reason: "Not feeling well",
    status: "Pending",
    proxyPerson: "Bob Smith",
  },
]

const teamRequests = [
  ...myRequests,
  {
    id: "REQ-007",
    employee: "Michael Johnson",
    type: "Annual Leave",
    startDate: "2023-11-01",
    endDate: "2023-11-05",
    reason: "Vacation",
    status: "Approved",
    proxyPerson: "John Doe",
    approver: "Jane Smith",
  },
  {
    id: "REQ-008",
    employee: "Emily Davis",
    type: "Personal Leave",
    startDate: "2023-10-30",
    endDate: "2023-10-30",
    reason: "Personal matters",
    status: "Rejected",
    proxyPerson: "Sarah Lee",
    approver: "Jane Smith",
    rejectReason: "Critical project deadline",
  },
]

interface LeaveRequestsTableProps {
  type: "my-requests" | "pending-approval" | "team-requests"
}

export function LeaveRequestsTable({ type }: LeaveRequestsTableProps) {
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false)
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false)
  const [rejectReason, setRejectReason] = useState("")

  const data = type === "my-requests" ? myRequests : type === "pending-approval" ? pendingApproval : teamRequests

  const handleView = (request: any) => {
    setSelectedRequest(request)
    setIsViewDialogOpen(true)
  }

  const handleApprove = (request: any) => {
    setSelectedRequest(request)
    setIsApproveDialogOpen(true)
  }

  const handleReject = (request: any) => {
    setSelectedRequest(request)
    setIsRejectDialogOpen(true)
  }

  const confirmApprove = () => {
    // In a real application, you would call your API to approve the request
    toast({
      title: "Request approved",
      description: `Leave request ${selectedRequest.id} has been approved.`,
    })
    setIsApproveDialogOpen(false)
  }

  const confirmReject = () => {
    // In a real application, you would call your API to reject the request
    if (!rejectReason) {
      toast({
        title: "Rejection reason required",
        description: "Please provide a reason for rejecting this request.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Request rejected",
      description: `Leave request ${selectedRequest.id} has been rejected.`,
    })
    setIsRejectDialogOpen(false)
    setRejectReason("")
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Request ID</TableHead>
            {(type === "pending-approval" || type === "team-requests") && <TableHead>Employee</TableHead>}
            <TableHead>Type</TableHead>
            <TableHead>Period</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Proxy Person</TableHead>
            {type !== "pending-approval" && <TableHead>Approver</TableHead>}
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((request) => (
            <TableRow key={request.id}>
              <TableCell className="font-medium">{request.id}</TableCell>
              {(type === "pending-approval" || type === "team-requests") && (
                <TableCell>{request.employee || "You"}</TableCell>
              )}
              <TableCell>{request.type}</TableCell>
              <TableCell>
                {request.startDate} to {request.endDate}
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    request.status === "Approved"
                      ? "success"
                      : request.status === "Rejected"
                        ? "destructive"
                        : "outline"
                  }
                >
                  {request.status}
                </Badge>
              </TableCell>
              <TableCell>{request.proxyPerson}</TableCell>
              {type !== "pending-approval" && <TableCell>{request.approver}</TableCell>}
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleView(request)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    {type === "pending-approval" && request.status === "Pending" && (
                      <>
                        <DropdownMenuItem onClick={() => handleApprove(request)}>
                          <Check className="mr-2 h-4 w-4" />
                          Approve
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleReject(request)}>
                          <X className="mr-2 h-4 w-4" />
                          Reject
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* View Request Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Leave Request Details</DialogTitle>
            <DialogDescription>Detailed information about the leave request.</DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium">Request ID:</div>
                <div className="col-span-2">{selectedRequest.id}</div>
              </div>
              {selectedRequest.employee && (
                <div className="grid grid-cols-3 gap-4">
                  <div className="font-medium">Employee:</div>
                  <div className="col-span-2">{selectedRequest.employee}</div>
                </div>
              )}
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium">Leave Type:</div>
                <div className="col-span-2">{selectedRequest.type}</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium">Period:</div>
                <div className="col-span-2">
                  {selectedRequest.startDate} to {selectedRequest.endDate}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium">Reason:</div>
                <div className="col-span-2">{selectedRequest.reason}</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium">Status:</div>
                <div className="col-span-2">
                  <Badge
                    variant={
                      selectedRequest.status === "Approved"
                        ? "success"
                        : selectedRequest.status === "Rejected"
                          ? "destructive"
                          : "outline"
                    }
                  >
                    {selectedRequest.status}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium">Proxy Person:</div>
                <div className="col-span-2">{selectedRequest.proxyPerson}</div>
              </div>
              {selectedRequest.approver && (
                <div className="grid grid-cols-3 gap-4">
                  <div className="font-medium">Approver:</div>
                  <div className="col-span-2">{selectedRequest.approver}</div>
                </div>
              )}
              {selectedRequest.rejectReason && (
                <div className="grid grid-cols-3 gap-4">
                  <div className="font-medium">Rejection Reason:</div>
                  <div className="col-span-2">{selectedRequest.rejectReason}</div>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Approve Request Dialog */}
      <Dialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Approve Leave Request</DialogTitle>
            <DialogDescription>Are you sure you want to approve this leave request?</DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium">Request ID:</div>
                <div className="col-span-2">{selectedRequest.id}</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium">Employee:</div>
                <div className="col-span-2">{selectedRequest.employee}</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium">Leave Type:</div>
                <div className="col-span-2">{selectedRequest.type}</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium">Period:</div>
                <div className="col-span-2">
                  {selectedRequest.startDate} to {selectedRequest.endDate}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsApproveDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmApprove}>Approve</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Request Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Reject Leave Request</DialogTitle>
            <DialogDescription>Please provide a reason for rejecting this leave request.</DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium">Request ID:</div>
                <div className="col-span-2">{selectedRequest.id}</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium">Employee:</div>
                <div className="col-span-2">{selectedRequest.employee}</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium">Leave Type:</div>
                <div className="col-span-2">{selectedRequest.type}</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium">Period:</div>
                <div className="col-span-2">
                  {selectedRequest.startDate} to {selectedRequest.endDate}
                </div>
              </div>
              <div className="grid gap-2">
                <div className="font-medium">Rejection Reason:</div>
                <Textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Please provide a reason for rejecting this request"
                  className="resize-none"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmReject}>
              Reject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
