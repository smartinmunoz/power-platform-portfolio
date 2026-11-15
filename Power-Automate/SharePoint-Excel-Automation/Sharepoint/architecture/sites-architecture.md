
# SharePoint Sites Architecture

## 1. Overview

This project demonstrates a SharePoint Online architecture designed to support a document intake, validation, processing, and reporting solution integrated with Power Automate.

The architecture consists of:

- A Main SharePoint Site for document intake and controlled access to document copies.
- A Management Subsite for validation, processing, configuration, and monitoring.

All names and configurations are fictionalized for portfolio purposes.

> **Disclaimer:** This document describes a conceptual demonstration architecture. It does not contain production URLs, credentials, real group identifiers, or confidential business data.

### 1.1 Site Structure

```text
Main SharePoint Site
|
|-- Request Intake List
|-- Derived Documents Library
|
`-- Management Subsite
    |
    |-- Validation Library
    |-- Temporary Files Library
    |-- Export Library
    |-- Processed Records List
    |-- Centers Configuration List
    `-- Processing Logs List
```

The architecture includes four SharePoint lists and four document libraries distributed across the Main Site and Management Subsite.

## 2. Main SharePoint Site

### 2.1 Purpose

The Main SharePoint Site provides a controlled entry point for external staff and internal management users.

It supports request submission and read-only consultation of document copies.

### 2.2 Request Intake List

External staff submit requests through a customized SharePoint form.

The form supports:

- Request information.
- Excel file attachments.
- Optional observations.
- Subsequent processing through Power Automate.

The list uses JSON customization for its form layout and command bar.

FL01 retrieves submitted attachments, distributes document copies, and applies request-level permissions.

After FL01 applies item-level permissions, the Request Creator retains Read access to their own submitted request.

Other External Staff must not receive access to requests they did not create.

### 2.3 Derived Documents Library

Stores document copies created by FL01 during the request intake process.

Authorized Main Site users, including External Staff where applicable, receive read-only access.

Document creation and management operations are performed through an appropriately authorized automation connection.

The library follows a separate security model from the restricted Validation Library.

## 3. Management Subsite

### 3.1 Purpose

The Management Subsite centralizes document validation, processing results, configuration, and monitoring.

Center Groups have general Read access to the subsite, subject to resource-specific and item-level permission restrictions.

External Staff do not have general access to the Management Subsite.

### 3.2 Validation Library

Stores Excel files awaiting validation and subsequent processing.

The library uses unique permissions to prevent Center Groups and External Staff from accessing it.

During validation, Site Owners and Site Members have Edit access.

The document lifecycle uses the following statuses:

| Status | Description |
|---|---|
| Pending Validation | Document awaiting review |
| Validated | Document approved for processing |
| Processing | FL02 is executing and the source document is protected |
| Processed | Processing and required logging completed successfully |
| Error | Processing failed or could not complete successfully |

When a document changes to the `Validated` status, FL02 starts the processing workflow and applies file-level protection.

The workflow performs the following operations:

1. Breaks permission inheritance on the source document.
2. Grants Read access to the Site Owners group.
3. Grants Read access to the Site Members group.
4. Updates the document status from `Validated` to `Processing`.
5. Processes the Excel data, creates SharePoint records, generates the export workbook, and invokes FL04 for execution logging.
6. Updates the document status to `Processed` when processing and logging complete successfully, or to `Error` if processing cannot complete successfully.

The `Processing` status indicates that the document has entered the protected processing stage. It does not guarantee successful completion.

The `Processed` status confirms successful completion, while `Error` identifies processing or logging failures.

Site Collection Administrators retain administrative control.

Appropriately authorized automation connections must retain the permissions required to complete processing and update document metadata.

Effective permissions must be validated to ensure that ordinary management users cannot modify protected source documents through other group memberships or direct permission assignments.

See [Validation Library](../libraries/validation-library.md) for detailed documentation.

### 3.3 Temporary Files Library

Stores temporary Excel workbooks created during FL02 processing.

The library is located in the Management Subsite and is restricted to authorized management and automation accounts.

FL03 periodically attempts to delete temporary files older than eight hours.

The workflow does not explicitly check whether a file is still required by an active processing operation.

Deletion failures, including those caused by active Excel file locks, are handled diagnostically without interrupting the remaining cleanup operations.

The eight-hour retention threshold should be reviewed against expected processing durations before production deployment.

See [Temporary Files Library](../libraries/temporary-files-library.md) for detailed documentation.

### 3.4 Export Library

Stores structured Excel export workbooks generated by FL02.

The export generation process uses an Excel template and Office Scripts to populate the required output structure.

The library provides read-only access to:

- Site Owners.
- Site Members.
- Authorized Center Groups.

External Staff do not have access.

FL02 creates and updates export workbooks through an appropriately authorized automation connection.

The library must maintain the configured access restrictions independently of the permissions applied to individual records in the Processed Records List.

See [Export Library](../libraries/export-library.md) for detailed documentation.

### 3.5 Processed Records List

Stores primary and associated records extracted from validated Excel files.

FL02 creates the SharePoint records and maintains parent-child relationships.

FL05 applies item-level permissions based on the center associated with each record.

The intended permission model is:

- Assigned Center Group: Read.
- Other Center Groups: No access.
- Site Owners: Edit.
- Site Members: Edit.
- External Staff: No access.

If the center configuration is missing, FL05 follows a restrictive permission model and records a diagnostic error.

Effective permissions must be verified to ensure that users cannot access records assigned to unrelated centers.

See [Processed Records List](../lists/processed-records.md) for detailed documentation.

### 3.6 Centers Configuration List

A single configuration list maintains the relationship between operational centers and SharePoint groups.

The list contains:

- Center identifier or name.
- SharePoint Group ID associated with the center.
- Group management link.

The list is readable by authorized users with access to the Management Subsite.

Modification of center configuration requires separately authorized permissions.

Group membership management remains restricted to users authorized to administer the corresponding SharePoint groups.

FL05 uses this list to resolve the group that should receive access to each processed record.

Missing, duplicated, or invalid center mappings must not result in unintended access.

See [Centers Configuration List](../lists/centers-configuration.md) for detailed documentation.

### 3.7 Processing Logs List

Stores execution and processing information recorded through FL04.

The list provides Read access to:

- Site Owners.
- Site Members.

Center Groups and External Staff do not have access.

The list uses restricted permissions rather than unrestricted inheritance from the Management Subsite.

FL04 creates log entries through an appropriately authorized automation connection.

The logging structure supports:

- Processing reference identifiers.
- Source document identifiers.
- Execution identifiers.
- Number of records read.
- Number of records created.
- Number of failed SharePoint record creation operations.
- Processing status.
- Error details.

FL04 supports four conceptual execution statuses:

- Success.
- Partial Success.
- Error.
- No Records.

These execution statuses are separate from the source document lifecycle statuses managed by FL02.

See [Processing Logs List](../lists/processing-logs.md) for detailed documentation.

## 4. Permissions Matrix

The following matrix summarizes the conceptual access model across the Main SharePoint Site and the Management Subsite.

| Resource | Site Owners | Site Members | Center Groups | External Staff |
|---|---|---|---|---|
| Main SharePoint Site | According to role | According to role | According to assignment | Authorized access |
| Request Intake List | Read on submitted items | Read on submitted items | No access | Create requests; Read own submitted items |
| Derived Documents Library | Read | Read | According to assignment | Read |
| Management Subsite | According to role | According to role | Read | No access |
| Validation Library - During Validation | Edit | Edit | No access | No access |
| Validation Library - After FL02 Protection | Read | Read | No access | No access |
| Temporary Files Library | Administrative access | Authorized access only | No access | No access |
| Export Library | Read | Read | Read | No access |
| Processed Records List | Edit | Edit | Assigned records only | No access |
| Centers Configuration List | Read | Read | Read | No access |
| Processing Logs List | Read | Read | No access | No access |

### 4.1 Request Creator Access

The Request Intake List uses item-level permissions.

External Staff can create new requests, but after FL01 applies the corresponding permissions, the Request Creator retains Read access only to their own submitted items.

Other External Staff must not receive access to requests they did not create.

The initial list permissions must be configured carefully because FL01 applies item-level protection after the request item has been created.

### 4.2 Document Access

The Derived Documents Library provides Read access to authorized users of the Main SharePoint Site, including External Staff.

The Validation Library is restricted to management users.

During validation, Site Owners and Site Members can edit documents.

When FL02 starts processing a validated document, it breaks file-level permission inheritance and grants Read access to Site Owners and Site Members.

The Temporary Files Library is restricted to authorized management and automation accounts.

The Export Library provides Read access to authorized Site Owners, Site Members, and Center Groups.

### 4.3 Administrative Access

Site Collection Administrators retain administrative privileges across the relevant SharePoint resources.

Administrative permissions and appropriately authorized automation connections are managed separately from ordinary user access.

### 4.4 Important Considerations

The matrix describes the intended permission model rather than a verified production configuration.

Effective access depends on:

- SharePoint group membership.
- Permission inheritance.
- Direct permission assignments.
- Membership in multiple groups.
- Automation connection privileges.
- Site collection administrative privileges.

All permissions must be validated in a controlled SharePoint environment.

## 5. Permission Inheritance Strategy

SharePoint permission inheritance is selectively interrupted to enforce resource-specific and item-level security.

The architecture combines site-level permissions, library-level restrictions, and automated item-level permission assignments.

### 5.1 Request Intake List

- Authorized External Staff can create new request items.
- FL01 breaks permission inheritance on each submitted request.
- The Request Creator receives Read access to their own request.
- Site Owners and Site Members receive Read access.
- Other External Staff and Center Groups are excluded.
- Request attachments remain protected through the corresponding list item's effective permissions.
- Initial list permissions must prevent unintended access before FL01 completes its permission assignments.

### 5.2 Derived Documents Library

- Authorized Main Site users receive Read access.
- External Staff, Site Owners, and Site Members can consult document copies.
- Document creation and management operations are performed through an appropriately authorized automation connection.

### 5.3 Validation Library

- Library-level permission inheritance is interrupted.
- Center Groups and External Staff are excluded.
- Site Owners and Site Members have Edit access during validation.
- When FL02 processes a validated document, it breaks file-level permission inheritance.
- FL02 assigns Read permissions to Site Owners and Site Members.
- The document status changes to `Processing`.
- Site Collection Administrators retain administrative control.

### 5.4 Temporary Files Library

- Access is restricted to authorized management and automation accounts.
- Center Groups and External Staff are excluded.
- FL02 creates temporary Excel processing files.
- FL03 attempts to delete temporary files older than eight hours.
- FL03 handles deletion failures diagnostically.
- The workflow does not explicitly verify whether a file is required by an active processing operation.

### 5.5 Export Library

- Site Owners, Site Members, and Center Groups receive Read access.
- External Staff are excluded.
- FL02 creates export documents using an appropriately authorized automation connection.

### 5.6 Processed Records List

- FL02 creates primary and associated records.
- FL05 applies item-level permissions based on the record's assigned center.
- Assigned Center Groups receive Read access.
- Site Owners and Site Members receive Edit access.
- Other Center Groups do not receive access.
- Missing center configurations follow a restrictive permission model.
- Effective permissions must be tested in SharePoint.

### 5.7 Centers Configuration List

- Site Owners, Site Members, and Center Groups receive Read access.
- External Staff are excluded.
- The list stores the center-to-SharePoint-group mapping used by FL05.
- Changes to configuration items require separately authorized permissions.

### 5.8 Processing Logs List

- List-level permission inheritance is interrupted.
- Site Owners and Site Members receive Read access.
- Center Groups and External Staff are excluded.
- FL04 creates log entries through an appropriately authorized SharePoint connection.

### 5.9 Permission Validation

All inheritance breaks and permission assignments must be tested in a controlled SharePoint environment.

Effective access must be verified for users belonging to multiple SharePoint groups and for automation connections performing privileged operations.

## 6. Power Automate Integration

The architecture integrates five conceptual Power Automate workflows.

| Flow | Responsibility |
|---|---|
| FL01 | Request intake, document distribution, and request-level permissions |
| FL02 | Validated Excel processing, document protection, record creation, and export generation |
| FL03 | Scheduled temporary file cleanup |
| FL04 | Processing logs and execution tracking |
| FL05 | Center-based item-level permissions |

### 6.1 Workflow Coordination

1. FL01 receives a SharePoint request and distributes Excel document copies.
2. Authorized management users validate the document.
3. FL02 processes the validated Excel workbook and creates SharePoint records.
4. FL05 applies center-based permissions to newly created records.
5. FL02 generates an export workbook and invokes FL04 for execution logging.
6. FL02 updates the source document status according to the processing result.
7. FL03 independently performs scheduled cleanup of temporary processing files.

The workflows are documented as conceptual demonstrations rather than directly importable Power Automate packages.

## 7. Security Considerations

- Apply the principle of least privilege.
- Separate document validation from general center access.
- Protect processed source documents against unauthorized modification.
- Restrict processing logs to management users.
- Restrict temporary processing files to authorized accounts.
- Use dedicated SharePoint groups for center-based access.
- Prevent unintended access to newly created request items before FL01 applies item-level permissions.
- Validate center-to-group configuration before assigning record permissions.
- Avoid storing real group IDs, production URLs, or confidential information in public repositories.
- Review effective permissions when users belong to multiple groups.
- Validate inheritance breaks and permission assignments in a controlled test environment.
- Ensure automation connections retain the permissions necessary to complete privileged operations.

## 8. Documentation Status

**Status:** Conceptual SharePoint architecture documented.

The portfolio includes documentation for:

- Main SharePoint Site and Management Subsite.
- Site hierarchy and resource distribution.
- Four SharePoint lists.
- Four SharePoint document libraries.
- Customized JSON form configuration.
- Command bar JSON formatting.
- Site-level, library-level, and item-level permission strategies.
- Integration with Power Automate workflows FL01 through FL05.
- Document lifecycle and processing statuses.
- Scheduled temporary file cleanup.
- Centralized processing logs.
- Center-based record permissions.

### 8.1 Implementation Validation

The following aspects require validation in a target SharePoint environment:

- Site and subsite configuration.
- SharePoint group membership and effective permissions.
- Permission inheritance and automated permission assignments.
- Initial request item security before FL01 completes.
- Customized form and command bar behavior.
- Power Automate connections and execution permissions.
- Office Scripts integration with the provided Excel samples.
- End-to-end document processing and security testing.
- Temporary file retention behavior.
- Error handling and recovery scenarios.

This document describes a conceptual architecture and is not an automated SharePoint provisioning template.
