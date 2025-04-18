# Leave Management System - API Specification

## Authentication Endpoints

### POST /api/auth/login
Login with email and password.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response (200 OK):**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "employee_id": "EMP001",
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com",
    "department": {
      "id": 1,
      "name": "Engineering"
    },
    "position": "Software Engineer",
    "is_manager": false
  }
}
```

### POST /api/auth/logout
Logout the current user.

**Response (200 OK):**
```json
{
  "message": "Logged out successfully"
}
```

## User Endpoints

### GET /api/users/me
Get the current user's profile.

**Response (200 OK):**
```json
{
  "id": 1,
  "employee_id": "EMP001",
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@example.com",
  "department": {
    "id": 1,
    "name": "Engineering"
  },
  "position": "Software Engineer",
  "manager": {
    "id": 2,
    "first_name": "Jane",
    "last_name": "Smith"
  },
  "hire_date": "2022-01-01",
  "is_manager": false
}
```

### GET /api/users/team
Get users in the current user's team (for managers only).

**Response (200 OK):**
```json
{
  "team_members": [
    {
      "id": 3,
      "employee_id": "EMP003",
      "first_name": "Alice",
      "last_name": "Johnson",
      "position": "Junior Developer",
      "email": "alice.johnson@example.com"
    },
    {
      "id": 4,
      "employee_id": "EMP004",
      "first_name": "Bob",
      "last_name": "Smith",
      "position": "Senior Developer",
      "email": "bob.smith@example.com"
    }
  ]
}
```

## Leave Balance Endpoints

### GET /api/leave-balances
Get leave balances for the current user.

**Response (200 OK):**
```json
{
  "year": 2023,
  "balances": [
    {
      "leave_type": {
        "id": 1,
        "name": "Annual Leave",
        "color_code": "#4f46e5"
      },
      "quota": 7,
      "used_days": 2,
      "remaining_days": 5,
      "leave_requests": [
        {
          "id": 1,
          "request_id": "REQ-001",
          "start_date": "2023-10-15",
          "end_date": "2023-10-18",
          "days_count": 2,
          "status": "Approved"
        }
      ]
    },
    {
      "leave_type": {
        "id": 2,
        "name": "Sick Leave",
        "color_code": "#ef4444"
      },
      "quota": 30,
      "used_days": 3,
      "remaining_days": 27,
      "leave_requests": [
        {
          "id": 2,
          "request_id": "REQ-002",
          "start_date": "2023-09-05",
          "end_date": "2023-09-06",
          "days_count": 2,
          "status": "Approved"
        },
        {
          "id": 3,
          "request_id": "REQ-003",
          "start_date": "2023-11-20",
          "end_date": "2023-11-20",
          "days_count": 1,
          "status": "Approved"
        }
      ]
    }
  ]
}
```

### GET /api/leave-balances/{user_id}
Get leave balances for a specific user (for managers only).

**Response (200 OK):**
Same format as above.

## Leave Request Endpoints

### POST /api/leave-requests
Create a new leave request.

**Request:**
```json
{
  "leave_type_id": 1,
  "start_date": "2023-12-24",
  "end_date": "2023-12-31",
  "start_half_day": false,
  "end_half_day": false,
  "reason": "Year-end holiday",
  "proxy_user_id": 3
}
```

**Response (201 Created):**
```json
{
  "id": 5,
  "request_id": "REQ-005",
  "leave_type": {
    "id": 1,
    "name": "Annual Leave"
  },
  "start_date": "2023-12-24",
  "end_date": "2023-12-31",
  "days_count": 6,
  "reason": "Year-end holiday",
  "status": "Pending",
  "proxy_person": {
    "id": 3,
    "first_name": "Alice",
    "last_name": "Johnson"
  },
  "created_at": "2023-10-15T10:30:00Z"
}
```

### GET /api/leave-requests
Get leave requests for the current user.

**Query Parameters:**
- status (optional): Filter by status (Pending, Approved, Rejected)
- startDate (optional): Filter by start date
- endDate (optional): Filter by end date

**Response (200 OK):**
```json
{
  "leave_requests": [
    {
      "id": 1,
      "request_id": "REQ-001",
      "leave_type": {
        "id": 1,
        "name": "Annual Leave"
      },
      "start_date": "2023-10-15",
      "end_date": "2023-10-18",
      "days_count": 4,
      "reason": "Family vacation",
      "status": "Approved",
      "proxy_person": {
        "id": 3,
        "first_name": "Alice",
        "last_name": "Johnson"
      },
      "approver": {
        "id": 2,
        "first_name": "Jane",
        "last_name": "Smith"
      },
      "approved_at": "2023-10-10T14:30:00Z",
      "created_at": "2023-10-05T09:15:00Z"
    }
  ],
  "pagination": {
    "total": 4,
    "page": 1,
    "per_page": 10,
    "total_pages": 1
  }
}
```

### GET /api/leave-requests/team
Get leave requests for the team (for managers only).

**Query Parameters:**
Same as above, plus:
- userId (optional): Filter by specific user ID

**Response (200 OK):**
Similar to above, but includes user information.

### GET /api/leave-requests/pending
Get pending leave requests awaiting approval (for managers only).

**Response (200 OK):**
Similar to above, filtered to only show pending requests.

### GET /api/leave-requests/{id}
Get details of a specific leave request.

**Response (200 OK):**
```json
{
  "id": 1,
  "request_id": "REQ-001",
  "user": {
    "id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "employee_id": "EMP001"
  },
  "leave_type": {
    "id": 1,
    "name": "Annual Leave"
  },
  "start_date": "2023-10-15",
  "end_date": "2023-10-18",
  "days_count": 4,
  "reason": "Family vacation",
  "status": "Approved",
  "proxy_person": {
    "id": 3,
    "first_name": "Alice",
    "last_name": "Johnson"
  },
  "approver": {
    "id": 2,
    "first_name": "Jane",
    "last_name": "Smith"
  },
  "approved_at": "2023-10-10T14:30:00Z",
  "created_at": "2023-10-05T09:15:00Z",
  "attachments": [
    {
      "id": 1,
      "file_name": "vacation_docs.pdf",
      "file_type": "application/pdf",
      "file_size": 1024000,
      "uploaded_at": "2023-10-05T09:20:00Z"
    }
  ]
}
```

### PATCH /api/leave-requests/{id}/approve
Approve a leave request (for managers only).

**Request:**
```json
{
  "approver_id": 2
}
```

**Response (200 OK):**
```json
{
  "id": 3,
  "request_id": "REQ-003",
  "status": "Approved",
  "approver": {
    "id": 2,
    "first_name": "Jane",
    "last_name": "Smith"
  },
  "approved_at": "2023-10-16T11:45:00Z"
}
```

### PATCH /api/leave-requests/{id}/reject
Reject a leave request (for managers only).

**Request:**
```json
{
  "approver_id": 2,
  "rejection_reason": "Critical project deadline"
}
```

**Response (200 OK):**
```json
{
  "id": 4,
  "request_id": "REQ-004",
  "status": "Rejected",
  "approver": {
    "id": 2,
    "first_name": "Jane",
    "last_name": "Smith"
  },
  "approved_at": "2023-10-16T11:50:00Z",
  "rejection_reason": "Critical project deadline"
}
```

### POST /api/leave-requests/{id}/attachments
Upload an attachment for a leave request.

**Request (multipart/form-data):**
- file: The file to upload

**Response (201 Created):**
```json
{
  "id": 2,
  "leave_request_id": 3,
  "file_name": "medical_certificate.pdf",
  "file_type": "application/pdf",
  "file_size": 512000,
  "uploaded_at": "2023-10-16T12:30:00Z"
}
```

## Calendar Endpoints

### GET /api/calendar/team
Get team leave calendar data.

**Query Parameters:**
- month (optional): Month number (1-12)
- year (optional): Year (e.g., 2023)

**Response (200 OK):**
```json
{
  "year": 2023,
  "month": 10,
  "days": [
    {
      "date": "2023-10-15",
      "members_on_leave": [
        {
          "id": 1,
          "first_name": "John",
          "last_name": "Doe",
          "leave_type": "Annual Leave"
        },
        {
          "id": 3,
          "first_name": "Alice",
          "last_name": "Johnson",
          "leave_type": "Sick Leave"
        }
      ]
    },
    {
      "date": "2023-10-16",
      "members_on_leave": [
        {
          "id": 1,
          "first_name": "John",
          "last_name": "Doe",
          "leave_type": "Annual Leave"
        }
      ]
    }
  ]
}
```

## Notification Endpoints

### GET /api/notifications
Get notifications for the current user.

**Query Parameters:**
- unread_only (optional): If true, only return unread notifications

**Response (200 OK):**
```json
{
  "notifications": [
    {
      "id": 1,
      "title": "Leave Request Approved",
      "message": "Your leave request (REQ-001) has been approved by Jane Smith.",
      "related_to": "leave_request",
      "related_id": 1,
      "is_read": false,
      "created_at": "2023-10-10T14:35:00Z"
    },
    {
      "id": 2,
      "title": "New Leave Request",
      "message": "John Doe has submitted a new leave request (REQ-003) for your approval.",
      "related_to": "leave_request",
      "related_id": 3,
      "is_read": true,
      "created_at": "2023-10-05T09:20:00Z"
    }
  ],
  "pagination": {
    "total": 2,
    "page": 1,
    "per_page": 10,
    "total_pages": 1
  }
}
```

### PATCH /api/notifications/{id}/read
Mark a notification as read.

**Response (200 OK):**
```json
{
  "id": 1,
  "is_read": true
}
```

### PATCH /api/notifications/read-all
Mark all notifications as read.

**Response (200 OK):**
```json
{
  "message": "All notifications marked as read",
  "count": 5
}
```

## Reports Endpoints

### GET /api/reports/leave-usage
Get leave usage report for a department or team.

**Query Parameters:**
- year (optional): Year (e.g., 2023)
- department_id (optional): Filter by department
- leave_type_id (optional): Filter by leave type

**Response (200 OK):**
```json
{
  "year": 2023,
  "total_days_taken": 45,
  "by_leave_type": [
    {
      "leave_type": {
        "id": 1,
        "name": "Annual Leave",
        "color_code": "#4f46e5"
      },
      "days_taken": 20
    },
    {
      "leave_type": {
        "id": 2,
        "name": "Sick Leave",
        "color_code": "#ef4444"
      },
      "days_taken": 15
    },
    {
      "leave_type": {
        "id": 3,
        "name": "Personal Leave",
        "color_code": "#10b981"
      },
      "days_taken": 10
    }
  ],
  "by_month": [
    {
      "month": 1,
      "days_taken": 5
    },
    {
      "month": 2,
      "days_taken": 3
    }
  ]
}
```

### GET /api/reports/leave-balances
Get leave balances report for all employees in a department or team.

**Query Parameters:**
- department_id (optional): Filter by department

**Response (200 OK):**
```