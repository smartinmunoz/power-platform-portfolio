# FL01 - Excel File Reception and Distribution

## Overview

This workflow automates the reception and controlled distribution of Excel files in SharePoint Online.

It creates two copies of each submitted file in separate document libraries, applying different permissions according to their purpose.

## Trigger

SharePoint - When an item is created.

The workflow starts when a new item containing an Excel attachment is created in a SharePoint list.

## Main Process

1. Detect the newly created SharePoint list item.
2. Retrieve the attached Excel file.
3. Create a copy in a protected document library.
4. Configure access permissions for the protected copy.
5. Create a second copy in a validation document library.
6. Configure permissions for the users authorized to review and validate the file.
7. Update the relevant SharePoint metadata and processing information.

## Document Libraries

### Protected Library

Stores a protected copy of the submitted Excel file.

Only the SharePoint site administrator is authorized to modify these files.

### Validation Library

Stores a separate copy for manual review and validation.

Authorized validators have collaboration permissions during the validation stage.

## Workflow Boundaries

FL01 does not execute Office Scripts or process the contents of the Excel file.

Its responsibility is file reception, distribution and initial permission configuration.

The subsequent processing is managed by FL02 after manual validation.

## Technologies

- Power Automate
- SharePoint Online
- SharePoint document libraries
- SharePoint REST API
- Item-level and file-level permission management

## Technical Skills Demonstrated

- Event-driven automation
- SharePoint attachment handling
- Automated file distribution
- Permission management
- Separation of document storage and validation
- Controlled document lifecycle

## Security

This documentation describes a generic demonstration architecture.

No corporate URLs, real group identifiers, credentials, personal data or proprietary source code are included.
