
# Management Subsite

## 1. Overview

The Management Subsite is a SharePoint Online subsite within the Main SharePoint Site.

It provides a centralized environment for document validation, Excel processing, record management, center configuration, and execution monitoring.

The solution integrates SharePoint Online with Power Automate workflows FL01-FL05.

> **Portfolio disclaimer:** This documentation describes a fictionalized demonstration architecture. No production URLs, real group IDs, credentials, or confidential business information are included.

## 2. Subsite Structure

```text
Management Subsite
|
|-- Validation Library
|-- Export Library
|
|-- Processed Records List
|-- Centers Configuration List
`-- Processing Logs List
```

## 3. User Roles

The subsite uses SharePoint groups and resource-specific permissions.

| Role | Description |
|---|---|
| Site Collection Administrators | Retain administrative control over the site collection |
| Site Owners | Management users with resource-specific permissions |
| Site Members | Internal operational users |
| Center Groups | Users associated with individual operational centers |
| External Staff | No general access to the management subsite |

Center groups have read access to the subsite, except where inheritance is interrupted or item-level permissions restrict access.

Site Owners and Members may also have different effective permissions depending on the resource.

## 4. Validation Library

### 4.1 Purpose

The Validation Library stores Excel documents awaiting validation and processing.

Documents are reviewed and validated before the automated processing workflow continues.

### 4.2 Permission Configuration

The library uses unique permissions rather than unrestricted inheritance from the subsite.

- Site Owners: authorized management access.
- Site Members: authorized management access.
- Center Groups: no access.
- External Staff: no access.
- Site Collection Administrators: administrative control.

### 4.3 Processed Document Protection

When a document is validated and changes to the `Tractat` (Processed) status, FL02 applies file-level permissions.

The workflow:

1. Breaks permission inheritance on the document.
2. Assigns Read permissions to the Site Owners group.
3. Assigns Read permissions to the Site Members group.
4. Updates the document status to `Tractat`.
5. Continues the Excel processing workflow.

After this change, ordinary Site Owners and Members have read-only access to the processed document.

Only Site Collection Administrators retain the ability to modify the protected file under the documented permission model.

**Important:** The document status and permission changes occur before all subsequent processing operations have necessarily completed. Therefore, `Tractat` should not be interpreted as an unconditional guarantee of successful end-to-end processing.

## 5. Export Library

### 5.1 Purpose

The Export Library stores Excel workbooks generated during the processing workflow.

These files provide structured outputs for authorized users.

### 5.2 Permissions

| Role | Permission |
|---|---|
| Site Collection Administrators | Administrative control |
| Site Owners | Read |
| Site Members | Read |
| Center Groups | Read |
| External Staff | No access |

The library may use customized SharePoint command bar formatting.

JSON formatting is used for presentation and usability, not as a replacement for access control.

## 6. Processed Records List

### 6.1 Purpose

The Processed Records List stores information extracted from validated Excel workbooks.

The processing workflow creates primary records and associated records.

Associated records reference their corresponding primary record.

### 6.2 Center-Based Access

Access is controlled through item-level permissions.

FL05 assigns permissions based on the center associated with each record.

This allows center groups to access only the records assigned to them.

General read access to the subsite does not automatically grant access to every record in this list.

### 6.3 Relationship with FL02 and FL05

FL02 creates the processed records.

FL05 applies the required SharePoint permissions to individual list items.

The center-to-group mapping is retrieved from the Centers Configuration List.

## 7. Centers Configuration List

### 7.1 Purpose

A single SharePoint list maintains the relationship between operational centers and their corresponding SharePoint groups.

### 7.2 Configuration Fields

| Field | Description |
|---|---|
| Center | Center name or identifier |
| SharePoint Group ID | Identifier of the group associated with the center |
| Group Management Link | Link used by authorized administrators to manage group membership |

The list is readable by all users who have access to the management subsite.

### 7.3 Group Management

Group management links are available for reference.

However, access to a link does not grant permission to modify group membership.

Only users with the appropriate SharePoint group management privileges can administer those groups.

### 7.4 Integration with FL05

FL05 uses the center configuration to identify the relevant SharePoint group and assign item-level permissions to processed records.

The public portfolio does not include real SharePoint group identifiers or administrative URLs.

## 8. Processing Logs List

### 8.1 Purpose

The Processing Logs List provides traceability for automated document processing.

FL04 creates log entries containing execution and processing information.

### 8.2 Example Information

Depending on the workflow configuration, a log entry may contain:

- Processing execution identifier.
- Source document reference.
- Processing status.
- Number of successfully created records.
- Error information.
- Processing summary.

The exact column schema will be documented separately.

### 8.3 Permissions

| Role | Permission |
|---|---|
| Site Collection Administrators | Administrative control |
| Site Owners | Read |
| Site Members | Read |
| Center Groups | No access |
| External Staff | No access |

The list must use restricted permissions to prevent center groups from inheriting general read access from the subsite.

FL04 writes log entries through an appropriately authorized Power Automate connection.

Read-only access for ordinary users does not prevent an authorized automation connection from creating records.

## 9. Permissions Matrix

| Resource | Site Owners | Site Members | Center Groups | External Staff |
|---|---|---|---|---|
| Management Subsite | According to role | According to role | Read | No access |
| Validation Library | Management access | Management access | No access | No access |
| Processed Validation Files | Read | Read | No access | No access |
| Export Library | Read | Read | Read | No access |
| Processed Records List | According to role | According to role | Assigned records only | No access |
| Centers Configuration List | Read | Read | Read | No access |
| Processing Logs List | Read | Read | No access | No access |

Site Collection Administrators retain administrative privileges across these resources.

## 10. Permission Inheritance

The architecture combines subsite-level permissions with resource-level and item-level security.

### Validation Library

Permission inheritance is interrupted to exclude Center Groups.

FL02 also applies unique permissions to processed documents.

### Export Library

Read access is provided to Site Owners, Site Members, and Center Groups.

### Processed Records List

FL05 assigns item-level permissions according to the center associated with each record.

### Centers Configuration List

All users with access to the subsite have read access.

### Processing Logs List

Permissions are restricted to Site Owners and Site Members, excluding Center Groups.

## 11. Power Automate Integration

| Flow | Management Subsite Responsibility |
|---|---|
| FL01 | Supports the intake and validation lifecycle |
| FL02 | Processes validated Excel files and creates records and exports |
| FL03 | Removes temporary processing files |
| FL04 | Creates processing log entries |
| FL05 | Assigns center-based permissions to processed records |

The workflows are documented separately in the Power Automate section of this project.

## 12. Security and Governance

The solution follows these principles:

- Least-privilege access.
- Separation of external intake and internal management.
- Restricted access to validation documents.
- Read-only protection of processed source documents.
- Center-based record isolation.
- Restricted visibility of processing logs.
- Centralized center-to-group configuration.
- Administrative control through Site Collection Administrators.
- Review of effective permissions for users belonging to multiple groups.

SharePoint JSON formatting is not used as a security mechanism.

Permission inheritance and effective access must be validated in a test environment before deployment.

## 13. Related Documentation

- [SharePoint Sites Architecture](../architecture/sites-architecture.md)
- [Main SharePoint Site](main-site.md)
- [SharePoint Overview](../README.md)
- [Document Library Command Bar Formatting](../formatting/document-library-commandbar.json)

## 14. Documentation Status

**Status:** Conceptual subsite architecture documented.

The following components will be documented separately:

- Validation Library configuration.
- Export Library configuration.
- Processed Records List schema.
- Centers Configuration List schema.
- Processing Logs List schema.
- Item-level permission implementation.
- Relevant JSON formatting examples.

This document is not an automated SharePoint provisioning template.
