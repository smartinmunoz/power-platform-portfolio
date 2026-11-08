
# SharePoint & Excel Automation Pipeline

## Project Overview

An end-to-end automation solution built with Microsoft Power Platform, SharePoint Online and Office Scripts.

The project demonstrates how to automate the reception, validation, transformation and processing of Excel files while managing document and record-level permissions.

This portfolio project is an independent demonstration based on a generic business scenario.

## Technologies

- Microsoft Power Automate
- SharePoint Online
- Excel Online
- Office Scripts
- JSON
- SharePoint REST API

## Business Scenario

An organization receives Excel files containing structured records that require manual validation before being processed.

Once validated, the system automatically:

1. Restricts editing permissions on the validated file.
2. Extracts and transforms Excel data.
3. Generates output workbooks from predefined templates.
4. Creates related records in SharePoint.
5. Applies dynamic permissions to individual records.
6. Cleans up temporary processing files.

## Solution Components

| Component | Purpose |
|---|---|
| FL01 | File reception and document preparation |
| FL02 | Excel processing and SharePoint record creation |
| FL03 | Scheduled temporary file cleanup |
| FL05 | Dynamic record-level permissions |
| Office Scripts | Excel data extraction and export generation |
| SharePoint | Document storage, records and permissions |

## Technical Highlights

- Event-driven automation with trigger conditions.
- Manual validation integrated into automated workflows.
- Office Scripts execution from Power Automate.
- JSON-based data exchange between scripts.
- Sequential processing to preserve parent-child relationships.
- SharePoint permission inheritance management.
- Configuration-driven access control.
- Scheduled cleanup of temporary files.

## Repository Structure

- `docs/`: Technical documentation and architecture.
- `flows/`: Power Automate demonstration flows.
- `office-scripts/`: Independently developed Office Scripts.
- `sample-data/`: Fictional Excel datasets and templates.

## Project Status

**In development**

Technical documentation and demonstration Office Scripts are available.

Power Automate demonstration flows are being developed independently.

## Security and Confidentiality

This repository contains only fictional data, generic configurations and independently developed demonstration code.

No corporate exports, credentials, internal URLs, proprietary components or real personal data are included.
