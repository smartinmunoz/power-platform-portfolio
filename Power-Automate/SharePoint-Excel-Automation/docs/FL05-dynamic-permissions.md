
# FL05 - Dynamic SharePoint Permissions

## Overview

This workflow demonstrates dynamic item-level permission management in SharePoint Online.

Access permissions are determined by a separate SharePoint configuration list, allowing different records to be assigned to different security groups.

## Trigger

SharePoint - When an item is created.

The workflow starts automatically whenever a new record is created in the target SharePoint list.

## Main Process

1. Detect the creation of a new SharePoint list item.
2. Retrieve the reference value originating from the first column of the source Excel file.
3. Search a separate SharePoint configuration list for the corresponding reference value.
4. Identify the security groups associated with that reference.
5. Apply the configured permissions to the newly created record.

## Configuration-Driven Permissions

Instead of hardcoding group assignments for each record, the workflow uses a separate configuration list.

Example using fictional data:

| Reference | SharePoint Group |
|-----------|------------------|
| REGION-A | Group-A |
| REGION-B | Group-B |
| REGION-C | Group-C |

The configuration list determines which groups receive access to each record.

## Technologies

- Power Automate
- SharePoint Online
- SharePoint REST API
- SharePoint security groups
- Dynamic content

## Technical Skills Demonstrated

- Event-driven automation
- Dynamic permission assignment
- Configuration-driven workflows
- SharePoint list lookups
- Item-level access control
- Security automation

## Security

This document describes a generic demonstration architecture.

All reference values and group names are fictional.

No corporate URLs, security group identifiers, credentials or internal permission configurations are included.
  
