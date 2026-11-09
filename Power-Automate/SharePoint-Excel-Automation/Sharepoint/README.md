
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
