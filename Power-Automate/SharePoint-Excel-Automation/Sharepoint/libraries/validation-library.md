
# Validation Library

## 1. Overview

The Validation Library is a SharePoint Online document library located in the Management Subsite.

It stores Excel workbooks awaiting validation and processing through Power Automate.

The library implements document-level security to protect validated files against unauthorized modification.

> **Portfolio disclaimer:** This documentation describes a conceptual demonstration using fictional names. No production URLs, credentials, real identifiers, or confidential information are included.

## 2. Library Configuration

| Property | Configuration |
|---|---|
| Library Name | Validation Library |
| Location | Management Subsite |
| Library Type | SharePoint Document Library |
| Document Format | Excel workbooks |
| Processing Workflow | FL02 |
| Security Model | Library-level and file-level permissions |
| External Staff Access | Not permitted |
| Center Groups Access | Not permitted |

## 3. Document Lifecycle

Documents enter the library as part of the request intake and validation process.

The general lifecycle is:

1. A request is submitted through the Main SharePoint Site.
2. The document becomes available for internal validation.
3. Authorized management users review the document.
4. The document is validated.
5. FL02 processes the validated Excel workbook.
6. The document is protected with read-only permissions for Site Owners and Site Members.

The exact intake and validation operations are documented in the FL01 workflow.

## 4. Document Status

The processing workflow uses document metadata to identify files ready for processing.

The demonstration uses the following conceptual statuses:

| Status | Purpose |
|---|---|
| Pending Validation | Document awaiting review |
| Validated | Document approved for processing |
| Tractat (Processed) | Document marked as processed and protected |

The exact SharePoint choice values and internal column names must match the target implementation.

The `Validated` status is used by the FL02 trigger condition.

## 5. Library Permissions

The Validation Library uses unique permissions rather than unrestricted inheritance from the Management Subsite.

| Role | Access |
|---|---|
| Site Collection Administrators | Administrative control |
| Site Owners | Authorized management access |
| Site Members | Authorized management access |
| Center Groups | No access |
| External Staff | No access |

Center Groups are excluded even though they have general read access to the Management Subsite.

## 6. Processed Document Protection

FL02 modifies file-level permissions when a document is validated and transitions to `Tractat`.

The workflow performs the following operations:

1. Breaks permission inheritance on the file.
2. Grants Read permission to the Site Owners group.
3. Grants Read permission to the Site Members group.
4. Updates the document status to `Tractat`.
5. Continues the main Excel processing operations.

Under this security model, ordinary Site Owners and Members cannot modify the protected document.

Site Collection Administrators retain administrative privileges.

The effective permissions must be validated to ensure that no additional group memberships or direct grants provide unintended editing access.

## 7. Processing Workflow

```mermaid
flowchart TD
    A[Excel Document in Validation Library]
    B{Status Validated?}
    C[FL02 Starts]
    D[Break File Permission Inheritance]
    E[Grant Read to Owners and Members]
    F[Update Status to Tractat]
    G[Process Excel Data]
    H[Create Records and Export Workbook]
    I[Write Processing Log]

    A --> B
    B -->|Yes| C
    C --> D
    D --> E
    E --> F
    F --> G
    G --> H
    H --> I
```

This diagram summarizes the conceptual processing sequence.

The complete workflow, including error handling and record relationships, is documented separately in FL02.

## 8. Important Processing Consideration

The document is marked as `Tractat` before all downstream processing operations necessarily finish.

Therefore, this status indicates that the document has entered the protected processing stage.

It does not independently guarantee that all Excel records were successfully created.

The Processing Logs List provides additional execution and error information through FL04.

## 9. Integration with Power Automate

### FL01 - Document Intake

Supports the initial request and validation lifecycle.

### FL02 - Excel Processing

Handles:

- Validated document detection.
- File-level permission changes.
- Status updates.
- Excel extraction.
- Creation of primary and associated records.
- Export workbook generation.
- Processing summaries and logging.

### FL04 - Processing Logs

Stores processing results and diagnostic information in the Processing Logs List.

### FL05 - Record Permissions

Applies center-based permissions to processed SharePoint records.

## 10. Security Considerations

- Break inheritance only where required.
- Exclude unauthorized Center Groups.
- Restrict modification of processed documents.
- Preserve administrative access for Site Collection Administrators.
- Validate effective permissions after permission changes.
- Use an appropriately authorized Power Automate connection.
- Do not rely on JSON formatting to enforce security.
- Avoid exposing production identifiers in public repositories.

## 11. Related Documentation

- [Management Subsite](../sites/management-subsite.md)
- [SharePoint Sites Architecture](../architecture/sites-architecture.md)
- [Processed Records List](../lists/processed-records.md)
- [Processing Logs List](../lists/processing-logs.md)
- [SharePoint Overview](../README.md)

## 12. Documentation Status

**Status:** Conceptual library documentation complete.

The following implementation details are environment-specific:

- Exact metadata column names.
- SharePoint permission role definitions.
- Power Automate connection references.
- Production library identifiers.

This document is not an automated SharePoint library provisioning template.
