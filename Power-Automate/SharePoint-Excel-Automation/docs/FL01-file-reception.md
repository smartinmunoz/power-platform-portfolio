
# FL01 - File Reception and Permission Management

## Overview

This workflow demonstrates automated Excel file reception and SharePoint item-level permission management.

## Trigger

SharePoint - When an item is created.

The workflow starts when a user creates a new record in a SharePoint list with an Excel file attached.

## Main Process

1. Detect the newly created SharePoint item.
2. Break permission inheritance using a SharePoint HTTP request.
3. Grant read access to the user who created the item.
4. Assign permissions to configured SharePoint groups.
5. Retrieve the Excel attachment from the list item.
6. Create a copy of the file in a SharePoint document library.
7. Update the relevant metadata and processing status.

## Technologies

- Power Automate
- SharePoint Online
- SharePoint REST API
- HTTP requests
- Dynamic content

## Technical Skills Demonstrated

- Event-driven automation
- SharePoint item-level permissions
- REST API integration
- File and attachment handling
- Workflow orchestration

## Security

This documentation describes a generic demonstration architecture.

No corporate URLs, identifiers, credentials, personal data or proprietary source code are included.
  
