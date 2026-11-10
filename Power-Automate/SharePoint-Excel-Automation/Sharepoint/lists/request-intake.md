
# Request Intake List

## 1. Overview

The Request Intake List is a SharePoint Online list located in the Main SharePoint Site.

It provides a simple interface for authorized external staff to submit Excel documents for subsequent validation and automated processing.

The solution is designed to minimize manual data entry and simplify the submission process.

> **Portfolio disclaimer:** This documentation describes a fictionalized demonstration. No production URLs, real identifiers, credentials, or confidential business information are included.

## 2. List Configuration

| Property | Configuration |
|---|---|
| List Name | Request Intake |
| Location | Main SharePoint Site |
| List Type | SharePoint Online List |
| Attachments | Enabled |
| User Interface | Customized SharePoint form |
| Automation | Power Automate |
| Primary Purpose | Excel document submission |

The list uses standard SharePoint capabilities and JSON-based user interface customization.

## 3. List Columns

The submission form requires only one custom field and the standard SharePoint attachment functionality.

| Field | Type | Purpose |
|---|---|---|
| Observations | Multiple lines of text | Optional comments or information provided by the requester |
| Attachments | SharePoint list attachments | Upload the Excel document to be processed |

The solution also uses standard SharePoint system fields.

| System Field | Purpose |
|---|---|
| ID | Unique SharePoint list item identifier |
| Created | Date and time of submission |
| Created By | User who created the request |
| Modified | Date and time of the latest modification |
| Modified By | User who last modified the request |

The default Title column may exist in the underlying SharePoint list but is not required as a user-entered field in this demonstration.

## 4. Request Submission Process

The user follows a simple submission process:

1. Opens the Request Intake List.
2. Selects the option to create a new request.
3. Enters observations when necessary.
4. Attaches the Excel workbook.
5. Saves the request.

The submitted item and its attachment become available to the configured Power Automate workflow.


## 5. Customized SharePoint Form

The Request Intake List uses SharePoint JSON form customization to provide a simplified interface for submitting Excel documents.

The form is designed around two fields:

- **Observations:** An optional multiple-lines-of-text field where users can provide additional information.
- **Attachments:** The standard SharePoint list attachment functionality used to upload Excel workbooks.

### Form Configuration

The demonstration JSON configuration is available in the repository:

[View Request Intake Form JSON](../forms/request-intake-form.json)

The form configuration organizes the request information into a section named "Request Information".

The example is conceptual. The behavior of the native SharePoint attachment control within the JSON form layout must be verified in a demonstration environment.

### Form and Command Bar Customization

SharePoint form customization and command bar formatting serve different purposes:

- **Form JSON:** Defines the layout and organization of the request form.
- **Command Bar JSON:** Customizes the available list commands and their presentation.
- **SharePoint Permissions:** Control which users can create, read, edit, or manage list items.

JSON interface customization does not replace SharePoint security permissions or server-side validation.


## 6. Command Bar Customization

The Request Intake List uses JSON command bar formatting to simplify the available actions.

The existing demonstration configuration is available at:

[Request Intake Command Bar JSON](../formatting/request-intake-view.json)

The customization may rename or hide commands to improve the user experience.

**Important:** Hiding commands through JSON formatting does not prevent users from performing actions for which they retain SharePoint permissions.

## 7. Attachment Handling

The list uses the standard SharePoint attachment functionality.

The intended document format is Excel.

The Power Automate workflow is responsible for retrieving and processing the submitted attachment.

Attachment-related validation, including file type, file count, and content structure, must be implemented separately if required.

The presence of an attachment field does not automatically enforce Excel-only uploads.

## 8. Permissions and Security

The list is accessible to authorized users of the Main SharePoint Site.

External staff can submit requests according to their assigned SharePoint permissions.

Site Owners and Site Members have access according to their configured roles.

The following security principles apply:

- Grant only the permissions necessary for request submission.
- Avoid exposing management resources to external users.
- Protect attachments through SharePoint access controls.
- Do not rely on JSON formatting to enforce security.
- Validate effective permissions in a test environment.

The exact list-level permission assignments are not included in this conceptual demonstration.

## 9. Power Automate Integration

The Request Intake List serves as the starting point for the document processing lifecycle.

FL01 handles the intake and initial document lifecycle operations.

The overall processing solution subsequently includes:

- Document validation.
- Excel processing through FL02.
- Creation of primary and associated records.
- Generation of export workbooks.
- Execution logging through FL04.
- Center-based permissions through FL05.

Temporary file cleanup is handled by FL03.

The detailed workflow logic is documented in the Power Automate section of the portfolio.

## 10. Example Submission

The following example uses fictional information.

| Field | Example |
|---|---|
| Observations | Monthly data submission for review |
| Attachment | sample-request.xlsx |

The example demonstrates the intended user experience without using real business information.

## 11. Related Documentation

- [Main SharePoint Site](../sites/main-site.md)
- [SharePoint Sites Architecture](../architecture/sites-architecture.md)
- [SharePoint Overview](../README.md)
- [Request Intake Command Bar JSON](../formatting/request-intake-view.json)

## 12. Documentation Status

**Status:** Conceptual list documentation complete.

The following components remain to be documented:

- Customized New Item form JSON.
- Detailed permission configuration.
- Attachment validation rules, where applicable.

This document is not an automated SharePoint list provisioning template.

