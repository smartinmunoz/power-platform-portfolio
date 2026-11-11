
# Derived Documents Library

## 1. Overview

The Derived Documents Library is a SharePoint Online document library located in the Main SharePoint Site.

The library stores Excel document copies created automatically by FL01 when a new request is submitted through the Request Intake List.

All authorized Main SharePoint Site users, including Site Owners, Site Members, and External Staff, have read-only access to these documents. They can consult and download the files without modifying them.


> **Portfolio disclaimer:** This documentation describes a conceptual demonstration using fictional names and examples. No production URLs, credentials, real identifiers, or confidential business information are included.


## 2. Library Configuration

| Property | Configuration |
|---|---|
| Library Name | Derived Documents Library |
| Location | Main SharePoint Site |
| Library Type | SharePoint Document Library |
| Primary Purpose | Read-only consultation of Excel document copies created by FL01 |
| Site Owners | Read |
| Site Members | Read |
| Authorized External Staff | Read |
| Document Creation | FL01 through an authorized Power Automate connection |
| Document Modification | Restricted to authorized automation connections and Site Collection Administrators |

## 3. Purpose


The library provides a centralized, read-only location where authorized Main SharePoint Site users can access Excel document copies created by FL01 immediately after request submission and successful document distribution.

Its main objectives are:

- Centralize access to derived documents.
- Provide a consistent document consultation experience.
- Separate derived documents from original request attachments.
- Allow authorized users to download documents.
- Prevent unauthorized modification.
- Support traceability and document management.

The library complements the Request Intake List in the Main SharePoint Site.

## 4. Main Site Integration

The Main SharePoint Site provides the user-facing entry point for the solution.

Its principal resources include:

- **Request Intake List:** Allows external staff to submit requests using a customized SharePoint form.
- **Derived Documents Library:** Provides read-only access to documents made available to authorized users.

The Management Subsite contains the internal validation, processing, configuration, and logging resources.

This separation helps distinguish external-facing functionality from internal management operations.


## 5. Document Lifecycle

The document lifecycle begins when an authorized user submits a new item in the Request Intake List with an attached Excel workbook.

FL01 performs the initial document distribution:

1. An authorized user creates a request and attaches an Excel workbook.
2. FL01 retrieves the Excel attachment from the Request Intake List.
3. FL01 creates a document copy in the Derived Documents Library, located in the Main SharePoint Site.
4. FL01 creates a separate copy in the Validation Library, located in the Management Subsite.
5. The Derived Documents Library provides read-only access to authorized Main Site users, including external staff, Site Members, and Site Owners.
6. The Validation Library follows its own restricted permission model for internal validation and subsequent processing.

The Derived Documents Library does not depend on FL02 or a separate publication workflow to receive the initial document copy.

The two document copies serve different purposes and follow independent access-control requirements.

## 6. Permissions

The library uses a read-only access model for ordinary users.


| Role | Access |
|---|---|
| Site Collection Administrators | Administrative control |
| Site Owners | Read |
| Site Members | Read |
| Authorized External Staff | Read |
| Unauthorized Users | No access |
| Authorized Automation Connection | Permissions required to create and manage document copies |


Read access allows users to open and download documents without granting editing rights.

The effective permission configuration must be validated in the target environment.

## 7. Security Architecture

The Derived Documents Library is located in the Main SharePoint Site because it supports authorized document consultation.

It must not expose internal resources from the Management Subsite.

Security requirements include:

- Restricting document modification.
- Granting access only to authorized users.
- Preventing access to internal processing logs.
- Avoiding exposure of validation documents.
- Applying least-privilege permissions.
- Reviewing access when documents contain sensitive information.

If different users must access different documents, additional document-level permissions may be required.

This is an implementation decision and is not assumed to be part of the current demonstration.


## 8. Document Access Workflow

```mermaid
flowchart TD
    A[User submits Request Intake item]
    B[Excel workbook attached]
    C[FL01 - Request Intake Automation]
    D[Derived Documents Library - Main Site]
    E[Validation Library - Management Subsite]
    F[Authorized Main Site users]
    G[Internal validation and processing]
    H[Read or Download Document]

    A --> B
    B --> C
    C --> D
    C --> E
    D --> F
    F --> H
    E --> G
```

FL01 creates two independent copies of the Excel attachment.

- **Derived Documents Library:** Provides read-only access to authorized Main Site users, including external staff, Site Members, and Site Owners.
- **Validation Library:** Stores the separate copy used for internal validation and subsequent processing.

The Derived Documents Library receives its copy directly from FL01. No additional publication workflow is required.

## 9. Document Organization

The library can use SharePoint metadata and views to improve document navigation.

Possible configuration options include:

- Document type.
- Creation date.
- Request reference.
- Processing reference.
- Document status.
- Custom views.
- File naming conventions.

These are optional configuration examples.

The exact metadata structure must be defined according to the implementation requirements.

## 10. User Experience

The library should provide a simple and consistent consultation experience.

Recommended design considerations include:

- Clear document names.
- Useful metadata columns.
- Simplified library views.
- Appropriate filtering and sorting.
- Read-only access for ordinary users.
- Consistent navigation from the Main SharePoint Site.

SharePoint JSON formatting may be used to customize the interface.

However, interface customization does not replace SharePoint permission management.


## 11. Integration with Power Automate

The Derived Documents Library is integrated with the broader Power Automate solution.

### FL01 - Request Intake

FL01 starts when a new request is submitted through the Request Intake List with an attached Excel workbook.

The workflow retrieves the attachment and creates two separate document copies:

- One copy in the Derived Documents Library, located in the Main SharePoint Site.
- One copy in the Validation Library, located in the Management Subsite.

The Derived Documents Library provides read-only access to authorized Main Site users, including external staff, Site Members, and Site Owners.

No additional document publication workflow is required.

### FL02 - Excel Processing

FL02 processes validated Excel workbooks from the Management Subsite Validation Library.

It creates SharePoint records and generates export workbooks without modifying the document copy stored in the Derived Documents Library.

### FL04 - Processing Logs

FL04 records processing execution information in the Management Subsite.

### FL05 - Record Permissions

FL05 applies center-based permissions to processed records in the Management Subsite.

The Derived Documents Library follows its own read-only access model and does not inherit the record-level permissions managed by FL05.


## 12. Security and Governance Considerations

- Use SharePoint permissions to enforce access.
- Validate effective read-only permissions for Site Owners, Site Members, and authorized External Staff after FL01 creates the document copy.
- Restrict modification to authorized identities.
- Avoid sharing confidential documents through unrestricted links.
- Review document retention requirements.
- Consider version history where appropriate.
- Audit document access according to organizational requirements.
- Do not publish production URLs or sensitive configuration details in public repositories.

## 13. Related Documentation

- [Main SharePoint Site](../sites/main-site.md)
- [Request Intake List](../lists/request-intake.md)
- [Management Subsite](../sites/management-subsite.md)
- [Validation Library](validation-library.md)
- [Export Library](export-library.md)
- [SharePoint Sites Architecture](../architecture/sites-architecture.md)
- [SharePoint Overview](../README.md)

## 14. Documentation Status

**Status:** Conceptual library documentation complete.

The following implementation details remain configurable:

- Exact document publication mechanism.
- Library metadata columns.
- Document naming conventions.
- User and group permissions.
- Document retention policies.
- Library views and interface formatting.

This document is not an automated SharePoint library provisioning template.
