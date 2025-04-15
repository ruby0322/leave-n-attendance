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
import { AlertCircle, CheckCircle2, Clock, MoreHorizontal } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

interface Alert {
  id: string
  severity: "High" | "Medium" | "Low"
  message: string
  source: string
  timestamp: string
  status: "Active" | "Acknowledged" | "Resolved"
  resolvedAt?: string
  acknowledgedAt?: string
}

// Sample data for system alerts
const alerts: Alert[] = [
  {
    id: "ALERT-001",
    severity: "High",
    message: "Database connection timeout",
    source: "Database",
    timestamp: "2023-10-15 14:32:45",
    status: "Active",
  },
  {
    id: "ALERT-002",
    severity: "Medium",
    message: "API response time exceeds threshold",
    source: "API Gateway",
    timestamp: "2023-10-15 15:10:22",
    status: "Active",
  },
  {
    id: "ALERT-003",
    severity: "Low",
    message: "CPU usage above 80%",
    source: "Application Server",
    timestamp: "2023-10-15 12:45:18",
    status: "Resolved",
    resolvedAt: "2023-10-15 13:15:32",
  },
  {
    id: "ALERT-004",
    severity: "Low",
    message: "Memory usage above 75%",
    source: "Application Server",
    timestamp: "2023-10-15 11:22:05",
    status: "Resolved",
    resolvedAt: "2023-10-15 11:45:12",
  },
  {
    id: "ALERT-005",
    severity: "Medium",
    message: "Failed login attempts exceeded threshold",
    source: "Authentication Service",
    timestamp: "2023-10-14 22:15:33",
    status: "Acknowledged",
    acknowledgedAt: "2023-10-14 22:20:45",
  },
]

export function AlertsTable() {
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isResolveDialogOpen, setIsResolveDialogOpen] = useState(false)

  const handleView = (alert: Alert) => {
    setSelectedAlert(alert)
    setIsViewDialogOpen(true)
  }

  const handleResolve = (alert: Alert) => {
    setSelectedAlert(alert)
    setIsResolveDialogOpen(true)
  }

  const confirmResolve = () => {
    if (selectedAlert) {
      // In a real application, you would call your API to resolve the alert
      toast("Alert resolved", {
        description: `Alert ${selectedAlert.id} has been marked as resolved.`,
      })
    }
    setIsResolveDialogOpen(false)
  }

  const getStatusIcon = (status: Alert["status"]) => {
    switch (status) {
      case "Active":
        return <AlertCircle className="h-4 w-4 text-destructive" />
      case "Acknowledged":
        return <Clock className="h-4 w-4 text-amber-500" />
      case "Resolved":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      default:
        return null
    }
  }

  const getSeverityBadge = (severity: Alert["severity"]) => {
    switch (severity) {
      case "High":
        return <Badge variant="destructive">{severity}</Badge>
      case "Medium":
        return <Badge className="bg-amber-500">{severity}</Badge>
      case "Low":
        return <Badge variant="outline">{severity}</Badge>
      default:
        return <Badge>{severity}</Badge>
    }
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Alert ID</TableHead>
            <TableHead>Severity</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Timestamp</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {alerts.map((alert) => (
            <TableRow key={alert.id}>
              <TableCell className="font-medium">{alert.id}</TableCell>
              <TableCell>{getSeverityBadge(alert.severity)}</TableCell>
              <TableCell>{alert.message}</TableCell>
              <TableCell>{alert.source}</TableCell>
              <TableCell>{alert.timestamp}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {getStatusIcon(alert.status)}
                  <span>{alert.status}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleView(alert)}>View Details</DropdownMenuItem>
                    {alert.status !== "Resolved" && (
                      <DropdownMenuItem onClick={() => handleResolve(alert)}>Mark as Resolved</DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* View Alert Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Alert Details</DialogTitle>
            <DialogDescription>Detailed information about the alert.</DialogDescription>
          </DialogHeader>
          {selectedAlert && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium">Alert ID:</div>
                <div className="col-span-2">{selectedAlert.id}</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium">Severity:</div>
                <div className="col-span-2">{getSeverityBadge(selectedAlert.severity)}</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium">Message:</div>
                <div className="col-span-2">{selectedAlert.message}</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium">Source:</div>
                <div className="col-span-2">{selectedAlert.source}</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium">Timestamp:</div>
                <div className="col-span-2">{selectedAlert.timestamp}</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium">Status:</div>
                <div className="col-span-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(selectedAlert.status)}
                    <span>{selectedAlert.status}</span>
                  </div>
                </div>
              </div>
              {selectedAlert.resolvedAt && (
                <div className="grid grid-cols-3 gap-4">
                  <div className="font-medium">Resolved At:</div>
                  <div className="col-span-2">{selectedAlert.resolvedAt}</div>
                </div>
              )}
              {selectedAlert.acknowledgedAt && (
                <div className="grid grid-cols-3 gap-4">
                  <div className="font-medium">Acknowledged At:</div>
                  <div className="col-span-2">{selectedAlert.acknowledgedAt}</div>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Resolve Alert Dialog */}
      <Dialog open={isResolveDialogOpen} onOpenChange={setIsResolveDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Resolve Alert</DialogTitle>
            <DialogDescription>Are you sure you want to mark this alert as resolved?</DialogDescription>
          </DialogHeader>
          {selectedAlert && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium">Alert ID:</div>
                <div className="col-span-2">{selectedAlert.id}</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium">Message:</div>
                <div className="col-span-2">{selectedAlert.message}</div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsResolveDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmResolve}>Resolve</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
