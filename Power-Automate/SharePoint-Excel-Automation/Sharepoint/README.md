
# SharePoint Online Customizations

## Overview

This folder contains reusable SharePoint Online customizations developed as part of the SharePoint & Excel Automation Pipeline project.

The objective is to improve the user experience, simplify data management and provide controlled interaction with SharePoint lists.

The examples are designed to be adapted to different business scenarios.

## Technologies

- SharePoint Online
- SharePoint JSON Formatting
- Microsoft Lists
- Power Automate

## Customizations

### List View Formatting

Custom JSON formatting is used to adapt the appearance and available actions of SharePoint list views.

Examples include:

- Customized list layouts.
- Simplified user interfaces.
- Visibility control for interface elements.
- Customized actions and navigation.
- Interfaces designed around grid-based editing workflows.

### Record Management Interface

The final records list uses a customized interface designed to encourage structured data editing.

The customization focuses on:

- Simplifying record management.
- Promoting grid-based editing.
- Reducing unnecessary interface actions.
- Hiding attachment-related actions where supported by the formatting interface.

These visual customizations do not replace SharePoint permissions or list-level configuration.

## Repository Structure

- `formatting/`: JSON files for SharePoint view and column formatting.

## Available JSON Customizations

### Request Intake View

**File:** `formatting/request-intake-view.json`

This customization is designed for a SharePoint list where users submit requests with Excel file attachments.

It simplifies the command bar to provide a more focused request submission experience.

**Features:**

- Renames the New button to "New Request".
- Hides grid editing.
- Hides sharing and copy-link commands.
- Hides export options.
- Hides form management commands.
- Hides automation and integration commands.

**Use case:**

Users create new requests and attach Excel files for subsequent processing through Power Automate.

The customization reduces unnecessary actions in the list interface while preserving the standard SharePoint request creation functionality.

**Important:** Hidden commands do not represent security restrictions. SharePoint permissions and list settings must be configured separately.

### Document Library Command Bar

**File:** `formatting/document-library-commandbar.json`

This customization provides a simplified command bar for SharePoint document libraries used in automated document processing and validation workflows.

**Features:**

- Highlights "Edit in Grid View" as the primary action.
- Preserves document opening options.
- Hides file upload and creation commands.
- Hides download, delete, rename, move and copy commands.
- Hides sharing and export options.
- Hides automation, integration and other non-essential commands.

**Use case:**

The same JSON configuration can be applied to two document libraries with different permission models:

1. **Protected Document Library:** Stores files managed by automated processes. Access and editing capabilities are restricted through SharePoint permissions.
2. **Validation Document Library:** Allows authorized validators to review documents and update metadata using grid editing.

This approach separates the user interface configuration from the underlying security model.

**Security considerations:**

JSON formatting only controls the visibility and presentation of supported interface commands.

It does not prevent users from performing operations through other interfaces, APIs or applications when their permissions allow them.

Actual access restrictions must be implemented using SharePoint permissions and library settings.

**Compatibility:**

Some command identifiers may not be supported in every SharePoint interface or Microsoft 365 version. The configuration should be tested in the target environment.


## Implementation

1. Create or select a SharePoint list.
2. Configure the required columns according to the business scenario.
3. Open the relevant view or column formatting settings.
4. Apply the corresponding JSON customization.
5. Adapt field references and actions to the target list.
6. Validate the behavior with the intended user permissions.

## Reusability

The JSON examples are intended as adaptable templates.

Column names, internal field references and business-specific settings may need to be modified before use.

## Security and Limitations

SharePoint JSON formatting customizes the user interface but does not enforce security restrictions.

Permissions, attachment settings and editing capabilities must be configured separately when technical enforcement is required.

All examples use generic configurations and exclude corporate identifiers, internal URLs and confidential information.
