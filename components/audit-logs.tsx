"use client"

import { useState } from "react"
import { Eye, Filter } from "lucide-react"
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
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample data for audit logs
const auditLogs = [
  {
    id: "LOG-001",
    action: "Login",
    user: "john.doe@example.com",
    timestamp: "2023-10-15 14:32:45",
    details: "User logged in successfully",
    ip: "192.168.1.1",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
  },
  {
    id: "LOG-002",
    action: "Leave Request",
    user: "john.doe@example.com",
    timestamp: "2023-10-15 14:45:22",
    details: "Created leave request REQ-004",
    ip: "192.168.1.1",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
  },
  {
    id: "LOG-003",
    action: "Leave Approval",
    user: "jane.smith@example.com",
    timestamp: "2023-10-15 15:10:18",
    details: "Approved leave request REQ-003",
    ip: "192.168.1.2",
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
  },
  {
    id: "LOG-004",
    action: "Leave Rejection",
    user: "jane.smith@example.com",
    timestamp: "2023-10-15 15:15:33",
    details: "Rejected leave request REQ-002 with reason: Critical project deadline",
    ip: "192.168.1.2",
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
  },
  {
    id: "LOG-005",
    action: "Logout",
    user: "john.doe@example.com",
    timestamp: "2023-10-15 16:30:45",
    details: "User logged out",
    ip: "192.168.1.1",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
  },
]

export function AuditLogs() {
  const [selectedLog, setSelectedLog] = useState<any | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [actionFilters, setActionFilters] = useState<string[]>([])

  const handleView = (log: any) => {
    setSelectedLog(log)
    setIsViewDialogOpen(true)
  }

  const toggleActionFilter = (action: string) => {
    setActionFilters((prev) => (prev.includes(action) ? prev.filter((a) => a !== action) : [...prev, action]))
  }

  const uniqueActions = Array.from(new Set(auditLogs.map((log) => log.action)))

  const filteredLogs =
    actionFilters.length > 0 ? auditLogs.filter((log) => actionFilters.includes(log.action)) : auditLogs

  return (
    <>
      <div className="flex justify-end mb-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {uniqueActions.map((action) => (
              <DropdownMenuCheckboxItem
                key={action}
                checked={actionFilters.includes(action)}
                onCheckedChange={() => toggleActionFilter(action)}
              >
                {action}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Log ID</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Timestamp</TableHead>
            <TableHead>Details</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredLogs.map((log) => (
            <TableRow key={log.id}>
              <TableCell className="font-medium">{log.id}</TableCell>
              <TableCell>
                <Badge variant="outline">{log.action}</Badge>
              </TableCell>
              <TableCell>{log.user}</TableCell>
              <TableCell>{log.timestamp}</TableCell>
              <TableCell className="max-w-xs truncate">{log.details}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" onClick={() => handleView(log)}>
                  <Eye className="h-4 w-4" />
                  <span className="sr-only">View</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* View Log Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Audit Log Details</DialogTitle>
            <DialogDescription>Detailed information about the audit log.</DialogDescription>
          </DialogHeader>
          {selectedLog && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium">Log ID:</div>
                <div className="col-span-2">{selectedLog.id}</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium">Action:</div>
                <div className="col-span-2">
                  <Badge variant="outline">{selectedLog.action}</Badge>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium">User:</div>
                <div className="col-span-2">{selectedLog.user}</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium">Timestamp:</div>
                <div className="col-span-2">{selectedLog.timestamp}</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium">Details:</div>
                <div className="col-span-2">{selectedLog.details}</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium">IP Address:</div>
                <div className="col-span-2">{selectedLog.ip}</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium">User Agent:</div>
                <div className="col-span-2 break-words text-xs">{selectedLog.userAgent}</div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
