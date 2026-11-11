
# Main SharePoint Site

## 1. Overview

The Main SharePoint Site serves as the entry point for a document intake and processing solution built with SharePoint Online and Power Automate.

It provides a controlled environment where authorized external staff can submit requests and access relevant generated documents.

A Management Subsite supports the internal validation, processing, and monitoring operations.

> **Portfolio disclaimer:** This documentation uses fictional names and describes a conceptual demonstration. No production URLs, real group IDs, credentials, or confidential information are included.

## 2. Site Structure

```text
Main SharePoint Site
|
|-- Request Intake List
|   |-- Customized New Item Form
|   `-- Command Bar JSON Formatting
|
|-- Derived Documents Library
|
`-- Management Subsite
    `-- Internal processing and administration
```

## 3. User Access

The site supports different user roles.

| User Role | Purpose |
|---|---|
| External Staff | Submit requests and access authorized documents |
| Site Owners | Site management and administration |
| Site Members | Internal operational activities |
| Site Collection Administrators | Administrative control over the site collection |

Access to individual resources is controlled through SharePoint permissions.

The exact permissions for each list and library are documented separately.

## 4. Request Intake List

### 4.1 Purpose

The Request Intake List provides a structured mechanism for collecting requests from authorized external staff.

Users create new requests through a customized SharePoint form.


### 4.2 Request Submission

The Request Intake List provides a simplified submission process for authorized External Staff.

The process follows these steps:

1. The user opens the customized New Item form.
2. The user optionally enters additional information in the `Observations` field.
3. The user attaches an Excel workbook using the standard SharePoint attachment functionality.
4. The user saves the request.
5. SharePoint creates the list item and assigns a unique item ID.
6. FL01 retrieves the request information and its Excel attachment.
7. FL01 creates a document copy in the Derived Documents Library in the Main SharePoint Site.
8. FL01 creates a separate document copy in the Validation Library in the Management Subsite.
9. FL01 applies the configured request item permissions.

### Request Security

After submission, FL01 breaks permission inheritance on the request item.

The Request Creator retains Read access to their submitted request.

Site Owners and Site Members receive Read access, while other External Staff and Center Groups are excluded.

### Document Distribution

The Derived Documents Library provides Read access to authorized Main Site users, including External Staff.

The Validation Library is restricted to authorized management users and supports the subsequent validation and processing lifecycle.

The detailed request structure, form configuration, and permissions are documented in the Request Intake List documentation.


### 4.3 Customized Form

The Request Intake List uses SharePoint JSON form customization to provide a simplified request submission interface.

The form is designed around two fields:

- **Observations:** An optional multiple-lines-of-text field for additional information.
- **Attachments:** The standard SharePoint list attachment functionality, used to submit Excel workbooks.

The demonstration form configuration is available in the repository:

[View Request Intake Form JSON](../forms/request-intake-form.json)

This JSON represents a conceptual form layout example. Its compatibility with the native SharePoint attachment control must be verified in a demonstration environment.

Form customization is separate from command bar formatting and does not replace SharePoint permissions or validation rules.


### 4.4 Command Bar Formatting

The list uses SharePoint JSON formatting to customize available commands.

The demonstration configuration is stored in:

`../formatting/request-intake-view.json`

This customization provides a more focused request submission interface.

> Command bar formatting improves usability but does not replace SharePoint security permissions.


## 5. Derived Documents Library

### 5.1 Purpose

The Derived Documents Library is located in the Main SharePoint Site.

It stores a copy of each submitted Excel workbook created by FL01 during the document intake process.

This library provides a consultation area for authorized users of the Main SharePoint Site.

### 5.2 Document Creation

FL01 creates the document copy after retrieving the Excel attachment from the Request Intake List.

The workflow uses an appropriately authorized SharePoint connection to create documents in the library.

The original request attachment remains associated with its SharePoint list item.

A separate copy is also created in the Validation Library in the Management Subsite.

### 5.3 Access Model

The Derived Documents Library provides Read access to authorized Main SharePoint Site users.

| User Role | Access |
|---|---|
| Site Collection Administrators | Administrative control |
| Site Owners | Read |
| Site Members | Read |
| External Staff | Read |
| Center Groups | According to Main Site assignment |

Ordinary users do not require Edit permissions to consult the documents.

Document creation and management operations are performed through the authorized automation connection.

### 5.4 Library Customization

The solution includes a demonstration of SharePoint document library command bar formatting.

The corresponding JSON file is available at:

`../formatting/document-library-commandbar.json`

Command bar formatting improves the user interface but does not replace SharePoint security permissions.

### 5.5 Related Documentation

The detailed library configuration, document lifecycle, and permission considerations are documented in:

[Derived Documents Library](../libraries/derived-documents.md)



## 6. Integration with Power Automate

The Main SharePoint Site acts as the entry point for the automated document processing lifecycle.

The solution uses five conceptual Power Automate workflows.

### 6.1 Workflow Responsibilities

| Workflow | Responsibility | Main Resources |
|---|---|---|
| FL01 | Request intake, attachment retrieval, document distribution, and request item permissions | Request Intake List, Derived Documents Library, Validation Library |
| FL02 | Validated Excel processing, record creation, export generation, and processed document protection | Validation Library, Processed Records List, Export Library |
| FL03 | Temporary file cleanup | Temporary processing files |
| FL04 | Execution logging and diagnostic tracking | Processing Logs List |
| FL05 | Center-based item-level permission assignments | Processed Records List, Centers Configuration List |

### 6.2 Main Site Operations

The Main SharePoint Site supports the initial submission and document consultation stages.

1. External Staff submit an Excel workbook through the Request Intake List.
2. FL01 retrieves the submitted attachment.
3. FL01 creates a document copy in the Derived Documents Library.
4. FL01 creates a separate document copy in the Management Subsite's Validation Library.
5. FL01 applies the configured item-level permissions to the original request.

The Derived Documents Library provides Read access to authorized Main Site users.

### 6.3 Management Subsite Operations

The Management Subsite handles the subsequent internal processing lifecycle.

- Authorized management users validate submitted documents.
- FL02 processes validated Excel files and creates primary and associated records.
- FL02 generates export workbooks and protects processed source documents.
- FL04 records execution information and returns the `Id_Log` identifier.
- FL05 assigns record-level permissions based on the configured center.
- FL03 removes temporary files according to the configured cleanup rules.

### 6.4 Security and Automation Connections

Power Automate workflows use appropriately authorized connections to perform SharePoint operations.

Ordinary user permissions remain separate from the permissions required by automation.

External Staff do not receive access to the Management Subsite through the document submission process.

The detailed workflow definitions and documentation are available in the Power Automate section of the portfolio.

## 7. Security Considerations

The architecture follows these principles:

- External users receive access only to authorized resources.
- Management resources are separated from the external intake interface.
- SharePoint permissions enforce access restrictions.
- JSON formatting is not treated as a security boundary.
- Site collection administrators retain administrative control.
- Production identifiers and confidential information are excluded from public documentation.

## 8. Related Documentation

- [SharePoint Sites Architecture](../architecture/sites-architecture.md)
- [SharePoint Overview](../README.md)
- [Request Intake Command Bar Formatting](../formatting/request-intake-view.json)
- [Document Library Command Bar Formatting](../formatting/document-library-commandbar.json)


## 9. Documentation Status

**Status:** Conceptual Main SharePoint Site documentation complete.

The following components are documented:

- Main SharePoint Site structure and user roles.
- Request Intake List configuration and submission process.
- Customized New Item form JSON.
- Command bar JSON formatting.
- Derived Documents Library configuration and access model.
- Integration with Power Automate workflows FL01 through FL05.
- Request item-level permissions.
- Document distribution between the Main Site and Management Subsite.
- Security and automation connection considerations.

### Implementation Validation

The following aspects require validation in a target SharePoint environment:

- Main Site configuration and group membership.
- Effective permissions for External Staff, Site Owners, and Site Members.
- Request item-level permission assignments performed by FL01.
- Native SharePoint attachment behavior in the customized form.
- Document creation and access permissions in the Derived Documents Library.
- Power Automate connection permissions and execution behavior.
- End-to-end testing of the request submission and document distribution process.

This document describes a conceptual implementation and is not an automated SharePoint site provisioning template.
