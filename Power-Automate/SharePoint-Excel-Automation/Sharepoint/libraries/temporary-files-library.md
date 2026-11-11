
# Temporary Files Library

## 1. Overview

The Temporary Files Library is a SharePoint Online document library located in the Management Subsite.

It provides a dedicated storage location for temporary Excel workbooks generated during automated processing.

The library is used by Power Automate workflows FL02 and FL03 to separate working files from original documents and final export files.

All resources described in this document are conceptual and use fictional information.

## 2. Library Configuration

| Property | Value |
|---|---|
| Library Name | Temporary Files Library |
| SharePoint Location | Management Subsite |
| Resource Type | Document Library |
| Primary Purpose | Temporary Excel processing |
| Main Workflow | FL02 - Excel Processing |
| Maintenance Workflow | FL03 - Temporary File Cleanup |
| Retention Threshold | 8 hours |
| Access Model | Restricted to authorized processing and administration accounts |

## 3. Business Purpose

The library provides an isolated workspace for automated Excel processing.

Its main objectives are:

- Prevent temporary processing files from mixing with validated source documents.
- Separate working copies from final export documents.
- Support Office Scripts execution through Power Automate.
- Reduce unnecessary document accumulation.
- Simplify automated maintenance and troubleshooting.

## 4. Integration with FL02

FL02 uses the Temporary Files Library during Excel processing.

### Processing Sequence

1. FL02 detects a validated Excel document in the Validation Library.
2. The workflow retrieves the source workbook.
3. A temporary working copy is created in the Temporary Files Library.
4. Office Scripts processes the temporary workbook.
5. The extracted information is used to create SharePoint records.
6. Final output workbooks are stored in the Export Library.
7. Temporary working files remain subject to automated cleanup by FL03.

The original validated workbook remains separate from temporary processing operations.

## 5. Integration with FL03

FL03 is responsible for removing temporary files that exceed the configured retention threshold.

### Cleanup Sequence

1. FL03 starts according to its configured recurrence schedule.
2. The workflow retrieves files from the Temporary Files Library.
3. Each file is evaluated against the retention threshold.
4. Files older than 8 hours are selected for deletion.
5. The workflow attempts to delete each eligible file.
6. Deletion failures are recorded for diagnostic purposes.

### Retention Policy

| Property | Configuration |
|---|---|
| Retention Threshold | 8 hours |
| Cleanup Mechanism | Power Automate FL03 |
| Execution Frequency | To be defined during implementation |
| Deletion Scope | Temporary processing files only |
| Failure Handling | Diagnostic tracking and subsequent review |

The eight-hour threshold represents the minimum file age for cleanup eligibility, not a guaranteed deletion time.

## 6. Security Model

The Temporary Files Library is restricted to authorized users and automation accounts.

### Permission Matrix

| Role | Access |
|---|---|
| Site Owners | Full Control |
| Authorized Management Members | As required for administration |
| Power Automate Processing Connection | Read / Write / Delete |
| Center Groups | No access |
| External Staff | No access |

### Security Considerations

- Restrict access to temporary workbooks.
- Avoid granting access to external or center-based users.
- Apply least-privilege permissions to automation connections.
- Protect temporary files containing business information.
- Review effective permissions and inherited access.
- Ensure the cleanup workflow has the permissions required to delete eligible files.

The library should not be used for permanent document storage.

## 7. Relationship with Other Libraries

| Library | Purpose |
|---|---|
| Derived Documents Library | Stores copies distributed from incoming requests |
| Validation Library | Stores documents awaiting or undergoing validation |
| Temporary Files Library | Stores temporary processing workbooks |
| Export Library | Stores generated output workbooks |

Each library has a separate responsibility within the document lifecycle.

## 8. Operational Considerations

### File Locking

Excel Online operations may temporarily lock workbooks.

FL03 should handle deletion failures caused by active file locks without interrupting the entire cleanup process.

### Concurrent Processing

Temporary filenames should be unique to avoid collisions between simultaneous workflow executions.

### Processing Failures

Temporary files left behind after failed processing runs remain eligible for scheduled cleanup.

### Retention Safety

The cleanup process should verify that files are no longer actively required before deleting them.

File age alone does not guarantee that a workbook is safe to delete.

## 9. Related Components

- [SharePoint Architecture](../architecture/sites-architecture.md)
- [Validation Library](validation-library.md)
- [Export Library](export-library.md)
- [FL02 - Excel Processing](../../flows/FL02-demo/README.md)
- [FL03 - Temporary File Cleanup](../../flows/FL03-demo/README.md)

## 10. Implementation Status

This document describes the intended architecture of a demonstration SharePoint library.

The configuration is conceptual and has not been provided as a deployable SharePoint provisioning package.

Actual permissions, retention behavior, automation connections, and cleanup safeguards must be validated in a Microsoft 365 test environment.
