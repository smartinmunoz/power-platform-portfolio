
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

The following matrix summarizes the conceptual permission model for the Management Subsite.

| Resource | Site Owners | Site Members | Center Groups | External Staff |
|---|---|---|---|---|
| Management Subsite | According to role | According to role | Read | No access |
| Validation Library - During Validation | Edit | Edit | No access | No access |
| Validation Library - After FL02 Protection | Read | Read | No access | No access |
| Export Library | Read | Read | Read | No access |
| Processed Records List | According to security model | According to security model | Assigned records only | No access |
| Centers Configuration List | Read | Read | Read | No access |
| Processing Logs List | Read | Read | No access | No access |

### Validation Library Access

During validation, Site Owners and Site Members can edit documents.

When FL02 processes a validated document, it breaks file-level permission inheritance and assigns Read access to Site Owners and Site Members.

Site Collection Administrators retain administrative control.

### Center-Based Access

Center Groups have general Read access to the Management Subsite.

However, access to individual resources depends on their specific permissions.

FL05 assigns item-level permissions to Processed Records List items based on the center-to-group mapping stored in the Centers Configuration List.

Center Groups do not automatically receive access to every processed record.

### Restricted Resources

The Validation Library and Processing Logs List exclude Center Groups and External Staff.

External Staff do not have access to the Management Subsite.

### Permission Validation

The matrix represents the intended security model rather than a verified production configuration.

Effective permissions must be tested in a controlled SharePoint environment, including scenarios involving users who belong to multiple SharePoint groups.


## 10. Permission Inheritance

The Management Subsite combines general subsite-level access with resource-specific and item-level permission restrictions.

Center Groups have general Read access to the subsite, but this does not automatically grant access to every list, library, or document.

### Validation Library

- Library-level permission inheritance is interrupted.
- Center Groups and External Staff are excluded.
- Site Owners and Site Members have Edit access during validation.
- FL02 breaks file-level permission inheritance when processing a validated document.
- FL02 assigns Read access to Site Owners and Site Members.
- Site Collection Administrators retain administrative control.

### Export Library

- Site Owners, Site Members, and Center Groups receive Read access.
- External Staff are excluded.
- FL02 creates export workbooks through an appropriately authorized SharePoint connection.

### Processed Records List

- FL02 creates primary and associated records.
- FL05 applies item-level permissions based on the assigned center.
- FL05 retrieves the relevant SharePoint Group ID from the Centers Configuration List.
- Center Groups receive access only to records explicitly assigned to their group.
- General subsite Read access does not automatically grant access to all processed records.

### Centers Configuration List

- Site Owners, Site Members, and Center Groups receive Read access.
- External Staff are excluded.
- Configuration changes require separately authorized permissions.
- Group management links do not automatically grant group administration privileges.

### Processing Logs List

- List-level permission inheritance is interrupted.
- Site Owners and Site Members receive Read access.
- Center Groups and External Staff are excluded.
- FL04 creates log entries through an appropriately authorized SharePoint connection.

### Permission Validation

All permission inheritance changes and automated assignments must be tested in a controlled SharePoint environment.

Effective permissions must be verified for users belonging to multiple SharePoint groups and for automation connections performing privileged operations.


## 11. Power Automate Integration

The Management Subsite supports document validation, Excel processing, record creation, export generation, execution logging, and center-based permission management.

The solution uses five conceptual Power Automate workflows.

### 11.1 Workflow Responsibilities

| Workflow | Management Subsite Responsibility | Main Resources |
|---|---|---|
| FL01 | Creates a copy of each submitted Excel attachment for internal validation | Validation Library |
| FL02 | Processes validated Excel files, protects source documents, creates records, and generates export workbooks | Validation Library, Processed Records List, Export Library |
| FL03 | Removes temporary processing files older than the configured retention threshold | Temporary processing files |
| FL04 | Creates execution logs and returns the `Id_Log` identifier | Processing Logs List |
| FL05 | Applies center-based item-level permissions using the configured SharePoint Group ID | Processed Records List, Centers Configuration List |

### 11.2 Document Validation and Processing

1. FL01 creates an Excel document copy in the Validation Library.
2. Authorized Site Owners or Site Members review and validate the document.
3. FL02 starts when the document is validated.
4. FL02 breaks file-level permission inheritance and assigns Read access to Site Owners and Site Members.
5. FL02 updates the document status to `Tractat`.
6. FL02 processes the Excel data and creates primary and associated records.
7. FL02 generates the corresponding export workbook.

The `Tractat` status is applied before all subsequent processing operations have necessarily completed and does not independently guarantee successful end-to-end processing.

### 11.3 Logging and Permissions

FL02 calls FL04 to register processing information.

FL04 creates an entry in the Processing Logs List and returns its SharePoint item identifier through the `Id_Log` output parameter.

FL05 retrieves the center-to-group mapping from the Centers Configuration List and assigns item-level permissions to the corresponding processed records.

### 11.4 Temporary File Cleanup

FL03 removes temporary processing files older than eight hours according to the conceptual cleanup configuration.

The cleanup process must target temporary files and must not remove source documents, validated records, or generated exports.

### 11.5 Security Considerations

The workflows use appropriately authorized SharePoint connections.

Automation permissions are managed separately from ordinary user permissions.

External Staff do not receive access to the Management Subsite through the intake workflow.

The detailed workflow definitions and implementation considerations are documented in the Power Automate section of the portfolio.


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

**Status:** Conceptual Management Subsite documentation complete.

The following components are documented:

- Management Subsite structure and user roles.
- Validation Library configuration and document protection lifecycle.
- Export Library configuration and access model.
- Processed Records List structure and center-based permissions.
- Centers Configuration List and SharePoint group mapping.
- Processing Logs List and execution tracking.
- Resource-level and item-level permission strategies.
- Integration with Power Automate workflows FL01 through FL05.
- Security and governance considerations.

### Implementation Validation

The following aspects require validation in a target SharePoint environment:

- Management Subsite configuration and group membership.
- Effective permissions for Site Owners, Site Members, and Center Groups.
- Validation Library inheritance and processed document protection.
- Export Library access permissions.
- FL05 item-level permission assignments.
- Centers Configuration List permissions and group mapping.
- FL04 logging permissions and execution behavior.
- Power Automate connections and privileged operations.
- End-to-end processing, monitoring, and security testing.

This document describes a conceptual implementation and is not an automated SharePoint provisioning template.
