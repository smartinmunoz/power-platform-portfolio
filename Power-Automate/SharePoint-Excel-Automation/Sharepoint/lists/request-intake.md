
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

The Request Intake List is located in the Main SharePoint Site and allows authorized External Staff to submit Excel documents for processing.

### Request Submission Permissions

External Staff must have the necessary SharePoint permissions to create request items and upload attachments.

The customized form provides a simplified submission interface but does not control the underlying SharePoint permissions.

### Request Item Permissions

FL01 applies item-level permissions to protect each submitted request.

The conceptual permission model is:

| Role | Access |
|---|---|
| Site Collection Administrators | Administrative control |
| Request Creator | Read |
| Site Owners | Read |
| Site Members | Read |
| Other External Staff | No access |
| Center Groups | No access |

After submission, FL01 breaks permission inheritance for the request item and assigns the required Read permissions.

The Request Creator can consult the submitted request without receiving ordinary editing permissions.

Site Owners and Site Members can consult submitted requests according to the configured security model.

### Attachment Security

Excel attachments belong to their corresponding SharePoint list item and must be protected through the item's effective permissions.

FL01 retrieves the submitted Excel attachment using an appropriately authorized SharePoint connection.

The workflow creates separate document copies in:

- The Derived Documents Library in the Main SharePoint Site.
- The Validation Library in the Management Subsite.

Each destination applies its own security model.

### Security Considerations

- Apply the principle of least privilege.
- Ensure that External Staff can submit requests without accessing other users' request items.
- Verify that item-level permission inheritance is correctly broken.
- Prevent unauthorized modification of submitted requests.
- Validate effective permissions for users belonging to multiple SharePoint groups.
- Do not rely on JSON form or command bar customization to enforce security.
- Test the complete submission and permission assignment process in a controlled SharePoint environment.



## 9. Power Automate Integration

The Request Intake List is the entry point for the automated document processing solution.

FL01 starts when a new request item is created in the Main SharePoint Site.

### FL01 - Document Intake and Distribution

The workflow follows this conceptual sequence:

1. An authorized user creates a request in the Request Intake List.
2. The user enters optional observations and attaches an Excel workbook.
3. SharePoint creates the request item and assigns its unique item ID.
4. FL01 retrieves the request information and its Excel attachment.
5. FL01 creates a document copy in the Derived Documents Library in the Main SharePoint Site.
6. FL01 creates a separate document copy in the Validation Library in the Management Subsite.
7. FL01 applies the corresponding permissions and updates the required request and document metadata.

### Document Destinations

| Destination | Location | Purpose |
|---|---|---|
| Derived Documents Library | Main SharePoint Site | Read-only consultation by authorized main-site users, including External Staff |
| Validation Library | Management Subsite | Internal document validation by authorized Site Owners and Site Members |

The two document copies serve different purposes and have different access permissions.

### Subsequent Processing

Once the document is validated in the Validation Library, FL02 starts the Excel processing workflow.

The overall solution also includes:

- FL03 for temporary file cleanup.
- FL04 for processing logs.
- FL05 for dynamic center-based record permissions.

The detailed workflow logic is documented in the Power Automate section of the portfolio.

### Security Considerations

FL01 must use an appropriately authorized SharePoint connection to create document copies and manage permissions.

External Staff must not receive access to the restricted Validation Library in the Management Subsite.

The Derived Documents Library provides read-only access to authorized users of the Main SharePoint Site.

The request item and its attachments must remain protected through SharePoint permissions.


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

The following components are documented:

- Request Intake List structure and configuration.
- Observations field and standard SharePoint attachments.
- Customized New Item form JSON.
- Command bar JSON formatting.
- Request submission process.
- Integration with Power Automate FL01.
- General security and permission considerations.

### Implementation Validation

The following aspects require validation or configuration in a target SharePoint environment:

- Native attachment control behavior within the customized JSON form.
- Effective list-level and item-level permissions.
- Excel attachment validation rules, including file type and number of attachments.
- Power Automate connection permissions.
- End-to-end testing of the request submission and FL01 execution.

The documentation describes a conceptual implementation and does not provide an automated SharePoint list provisioning template.


