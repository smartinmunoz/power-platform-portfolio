# SharePoint Sites Architecture

## 1. Overview

This project demonstrates a SharePoint Online architecture designed to support a document intake, validation, processing, and reporting solution integrated with Power Automate.

The architecture consists of:

- A main SharePoint site for document intake and controlled access to generated documents.
- A management subsite for validation, processing, configuration, and monitoring.

All names and configurations are fictionalized for portfolio purposes.

> **Disclaimer:** This document describes a conceptual demonstration architecture. It does not contain production URLs, credentials, real group identifiers, or confidential business data.

## 2. Site Hierarchy

```text
Main SharePoint Site
|
|-- Request Intake List
|-- Derived Documents Library
|
`-- Management Subsite
    |
    |-- Validation Library
    |-- Export Library
    |-- Processed Records List
    |-- Centers Configuration List
    `-- Processing Logs List
```

## 3. Main SharePoint Site

### 3.1 Purpose

The main site provides a controlled entry point for external staff and internal management users.

### 3.2 Request Intake List

External staff submit requests through a customized SharePoint form.

The form supports:

- Request information.
- Excel file attachments.
- Structured data entry.
- Subsequent processing through Power Automate.

The list uses customized JSON formatting for its command bar.

### 3.3 Derived Documents Library

Stores documents generated or derived during the processing lifecycle.

Authorized users, including external staff where applicable, have read-only access.

## 4. Management Subsite

### 4.1 Purpose

The management subsite centralizes document validation, processing results, configuration, and monitoring.

Center groups have general read access to the subsite, subject to resource-specific and item-level permission restrictions.

External staff do not have general access to the management subsite.

### 4.2 Validation Library

Stores Excel files awaiting validation and subsequent processing.

The library uses unique permissions to prevent center groups from accessing it.

When a document is validated and changes to the `Tractat` (Processed) status:

1. FL02 breaks permission inheritance on the file.
2. Read permissions are assigned to the site Owners group.
3. Read permissions are assigned to the site Members group.
4. Only site collection administrators retain the ability to modify the processed file.

This protects processed source documents from further editing by ordinary management users.

### 4.3 Export Library

Stores Excel workbooks generated during processing.

Read access is granted to:

- Site Owners.
- Site Members.
- Center groups.

### 4.4 Processed Records List

Stores primary and associated records extracted from validated Excel files.

FL05 applies item-level permissions based on the center associated with each record.

Center groups can access only records for which they have been explicitly granted permissions.

### 4.5 Centers Configuration List

A single configuration list contains:

- Center identifier or name.
- SharePoint group ID associated with the center.
- Group management link.

The list is readable by all users with access to the management subsite.

Group membership management remains restricted to users authorized to administer the corresponding SharePoint groups.

### 4.6 Processing Logs List

Stores execution and processing information recorded through FL04.

The list provides read access to:

- Site Owners.
- Site Members.

Center groups do not have access.

The list must therefore use restricted permissions rather than unrestricted inheritance from the subsite.


## 5. Permissions Matrix

The following matrix summarizes the conceptual access model across the Main SharePoint Site and the Management Subsite.

| Resource | Site Owners | Site Members | Center Groups | External Staff |
|---|---|---|---|---|
| Main SharePoint Site | According to role | According to role | According to assignment | Authorized access |
| Request Intake List | Read on submitted items | Read on submitted items | No access | Create requests; Read own submitted items |
| Derived Documents Library | Read | Read | According to assignment | Read |
| Management Subsite | According to role | According to role | Read | No access |
| Validation Library - During Validation | Edit | Edit | No access | No access |
| Validation Library - After FL02 Protection | Read | Read | No access | No access |
| Export Library | Read | Read | Read | No access |
| Processed Records List | According to security model | According to security model | Assigned records only | No access |
| Centers Configuration List | Read | Read | Read | No access |
| Processing Logs List | Read | Read | No access | No access |

### Request Creator Access

The Request Intake List uses item-level permissions.

External Staff can create new requests, but after FL01 applies the corresponding permissions, the Request Creator retains Read access only to their own submitted items.

Other External Staff must not receive access to requests they did not create.

### Document Access

The Derived Documents Library provides Read access to authorized users of the Main SharePoint Site, including External Staff.

The Validation Library is restricted to management users.

During validation, Site Owners and Site Members can edit documents.

When FL02 starts processing a validated document, it breaks file-level permission inheritance and grants Read access to Site Owners and Site Members.

### Administrative Access

Site Collection Administrators retain administrative privileges across the relevant SharePoint resources.

Administrative permissions and appropriately authorized automation connections are managed separately from ordinary user access.

### Important Considerations

The matrix describes the intended permission model rather than a verified production configuration.

Effective access depends on SharePoint group membership, inheritance settings, direct assignments, and the permissions granted to automation connections.

All permissions must be validated in a controlled SharePoint environment.


## 6. Permission Inheritance Strategy

SharePoint permission inheritance is selectively interrupted to enforce resource-specific security.

### Validation Library

- Permission inheritance is interrupted.
- Center groups are excluded.
- Processed files receive unique permissions.
- Site Owners and Members receive read access after validation.

### Processed Records List

- FL05 assigns item-specific permissions.
- Access is determined by the record's center.
- Center groups do not automatically receive access to all records.

### Processing Logs List

- Access is restricted to Site Owners and Site Members.
- Center groups are excluded despite having general read access to the subsite.

### Export Library

- Site Owners, Site Members, and Center groups receive read access.

## 7. Power Automate Integration

| Flow | Responsibility |
|---|---|
| FL01 | Intake and document lifecycle orchestration |
| FL02 | Validated Excel processing, document permissions, and record creation |
| FL03 | Temporary file cleanup |
| FL04 | Processing logs and execution tracking |
| FL05 | Center-based item-level permissions |

## 8. Security Considerations

- Apply the principle of least privilege.
- Separate document validation from general center access.
- Protect processed source documents against unauthorized modification.
- Restrict processing logs to management users.
- Use dedicated SharePoint groups for center-based access.
- Avoid storing real group IDs, production URLs, or confidential information in public repositories.
- Review effective permissions when users belong to multiple groups.
- Validate inheritance breaks and permission assignments in a controlled test environment.

## 9. Documentation Status

**Status:** Conceptual architecture documented.

Additional documents will describe individual lists, document libraries, JSON formatting, and customized forms.

This document is not an automated SharePoint provisioning template.
