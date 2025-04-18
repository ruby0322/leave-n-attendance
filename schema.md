# Leave Management System - Database Schema

## Data Dictionary

### 1. `users` Table
| Column | Data Type | Constraints | Description |
|--------|-----------|-------------|-------------|
| id | INT | PK, AUTO_INCREMENT | Unique identifier for each user |
| employee_id | VARCHAR(20) | UNIQUE, NOT NULL | Employee ID |
| first_name | VARCHAR(50) | NOT NULL | First name of the employee |
| last_name | VARCHAR(50) | NOT NULL | Last name of the employee |
| email | VARCHAR(100) | UNIQUE, NOT NULL | Email address of the employee |
| password_hash | VARCHAR(255) | NOT NULL | Hashed password |
| department_id | INT | FK, NOT NULL | Department the employee belongs to |
| position | VARCHAR(100) | NOT NULL | Job position of the employee |
| manager_id | INT | FK, NULL | ID of the employee's manager |
| hire_date | DATE | NOT NULL | Date when the employee was hired |
| is_manager | BOOLEAN | NOT NULL, DEFAULT FALSE | Whether the employee is a manager |
| annual_leave_quota | INT | NOT NULL, DEFAULT 7 | Annual leave quota per year |
| sick_leave_quota | INT | NOT NULL, DEFAULT 30 | Sick leave quota per year |
| personal_leave_quota | INT | NOT NULL, DEFAULT 14 | Personal leave quota per year |
| public_holiday_quota | INT | NOT NULL, DEFAULT 5 | Public holiday quota per year |
| created_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Timestamp when the record was created |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Timestamp when the record was last updated |

### 2. `departments` Table
| Column | Data Type | Constraints | Description |
|--------|-----------|-------------|-------------|
| id | INT | PK, AUTO_INCREMENT | Unique identifier for each department |
| name | VARCHAR(100) | NOT NULL | Name of the department |
| description | TEXT | NULL | Description of the department |
| created_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Timestamp when the record was created |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Timestamp when the record was last updated |

### 3. `leave_types` Table
| Column | Data Type | Constraints | Description |
|--------|-----------|-------------|-------------|
| id | INT | PK, AUTO_INCREMENT | Unique identifier for each leave type |
| name | VARCHAR(50) | NOT NULL | Name of the leave type (Annual Leave, Sick Leave, etc.) |
| description | TEXT | NULL | Description of the leave type |
| requires_attachment | BOOLEAN | NOT NULL, DEFAULT FALSE | Whether this leave type requires an attachment |
| color_code | VARCHAR(20) | NOT NULL | Color code for UI display |
| created_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Timestamp when the record was created |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Timestamp when the record was last updated |

### 4. `leave_requests` Table
| Column | Data Type | Constraints | Description |
|--------|-----------|-------------|-------------|
| id | INT | PK, AUTO_INCREMENT | Unique identifier for each leave request |
| request_id | VARCHAR(20) | UNIQUE, NOT NULL | Human-readable request ID (e.g., REQ-001) |
| user_id | INT | FK, NOT NULL | User ID of the requester |
| leave_type_id | INT | FK, NOT NULL | Leave type ID |
| proxy_user_id | INT | FK, NOT NULL | User ID of the proxy person |
| start_date | DATE | NOT NULL | Start date of the leave |
| end_date | DATE | NOT NULL | End date of the leave |
| start_half_day | BOOLEAN | NOT NULL, DEFAULT FALSE | Whether the start date is a half day |
| end_half_day | BOOLEAN | NOT NULL, DEFAULT FALSE | Whether the end date is a half day |
| days_count | DECIMAL(5,1) | NOT NULL | Total number of days requested |
| reason | TEXT | NOT NULL | Reason for the leave request |
| status | ENUM('Pending', 'Approved', 'Rejected') | NOT NULL, DEFAULT 'Pending' | Status of the leave request |
| approver_id | INT | FK, NULL | User ID of the approver |
| approved_at | TIMESTAMP | NULL | Timestamp when the request was approved/rejected |
| rejection_reason | TEXT | NULL | Reason for rejection if status is 'Rejected' |
| created_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Timestamp when the record was created |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Timestamp when the record was last updated |

### 5. `leave_attachments` Table
| Column | Data Type | Constraints | Description |
|--------|-----------|-------------|-------------|
| id | INT | PK, AUTO_INCREMENT | Unique identifier for each attachment |
| leave_request_id | INT | FK, NOT NULL | Leave request ID |
| file_name | VARCHAR(255) | NOT NULL | Original file name |
| file_path | VARCHAR(255) | NOT NULL | Path to the stored file |
| file_type | VARCHAR(100) | NOT NULL | MIME type of the file |
| file_size | INT | NOT NULL | Size of the file in bytes |
| uploaded_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Timestamp when the file was uploaded |

### 6. `notifications` Table
| Column | Data Type | Constraints | Description |
|--------|-----------|-------------|-------------|
| id | INT | PK, AUTO_INCREMENT | Unique identifier for each notification |
| user_id | INT | FK, NOT NULL | User ID of the recipient |
| title | VARCHAR(255) | NOT NULL | Title of the notification |
| message | TEXT | NOT NULL | Content of the notification |
| related_to | VARCHAR(50) | NOT NULL | Type of entity the notification is related to (leave_request, etc.) |
| related_id | INT | NOT NULL | ID of the related entity |
| is_read | BOOLEAN | NOT NULL, DEFAULT FALSE | Whether the notification has been read |
| created_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Timestamp when the notification was created |

### 7. `audit_logs` Table
| Column | Data Type | Constraints | Description |
|--------|-----------|-------------|-------------|
| id | INT | PK, AUTO_INCREMENT | Unique identifier for each audit log |
| user_id | INT | FK, NOT NULL | User ID who performed the action |
| action | VARCHAR(100) | NOT NULL | Action performed (create, update, delete, approve, reject) |
| entity_type | VARCHAR(50) | NOT NULL | Type of entity the action was performed on |
| entity_id | INT | NOT NULL | ID of the entity |
| details | JSON | NOT NULL | Additional details about the action |
| ip_address | VARCHAR(50) | NULL | IP address from which the action was performed |
| created_at | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Timestamp when the action was performed |

## ER Diagram

```
+---------------+       +----------------+       +----------------+
|  departments  |       |     users      |       |  leave_types   |
+---------------+       +----------------+       +----------------+
| PK id         |<------| FK department_id|       | PK id         |
| name          |       | PK id          |       | name          |
| description   |       | employee_id    |       | description   |
|               |       | first_name     |       | requires_     |
|               |       | last_name      |       |   attachment  |
|               |       | email          |       | color_code    |
|               |       | password_hash  |       |               |
|               |       | position       |       |               |
|               |       | FK manager_id  |------>|               |
|               |       | hire_date      |       |               |
|               |       | is_manager     |       |               |
|               |       | annual_leave_  |       |               |
|               |       |   quota        |       |               |
|               |       | sick_leave_    |       |               |
|               |       |   quota        |       |               |
|               |       | personal_leave_|       |               |
|               |       |   quota        |       |               |
|               |       | public_holiday_|       |               |
|               |       |   quota        |       |               |
+---------------+       +----------------+       +----------------+
                               ^  |                      
                               |  |                      
                               |  |                      
                               |  v                      
+----------------+      +----------------+      
| notifications  |      | leave_requests |      
+----------------+      +----------------+      
| PK id          |      | PK id          |      
| FK user_id     |<-----| FK user_id     |      
| title          |      | request_id     |      
| message        |      | FK leave_type_id|      
| related_to     |      | FK proxy_user_id|      
| related_id     |      | start_date     |      
| is_read        |      | end_date       |      
|                |      | days_count     |      
|                |      | reason         |      
|                |      | status         |      
|                |      | FK approver_id |      
|                |      | approved_at    |      
|                |      | rejection_reason|      
+----------------+      +----------------+      
                               |
                               |
                               v
     +----------------+      +----------------+
     |   audit_logs   |      |leave_attachments|
     +----------------+      +----------------+
     | PK id          |      | PK id          |
     | FK user_id     |      | FK leave_      |
     | action         |      |   request_id   |
     | entity_type    |      | file_name      |
     | entity_id      |      | file_path      |
     | details        |      | file_type      |
     | ip_address     |      | file_size      |
     |                |      | uploaded_at    |
     +----------------+      +----------------+
``` 