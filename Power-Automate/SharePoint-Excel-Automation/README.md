
# SharePoint & Excel Automation Pipeline

## Project Overview

This project demonstrates an end-to-end document processing and automation architecture using Microsoft Power Platform, SharePoint Online, Excel Online, and Office Scripts.

The solution automates the lifecycle of Excel-based requests, from initial submission and document distribution to validation, data processing, record creation, export generation, and permission management.

### How It Works

1. **Request Submission:** Authorized external users submit requests through a SharePoint list, attaching Excel files and providing observations.

2. **Document Distribution:** Power Automate retrieves the Excel attachments and creates copies in two SharePoint document libraries:
   - Derived Documents Library in the Main SharePoint Site.
   - Validation Library in the Management Subsite.

3. **Document Validation:** Authorized management users review the submitted documents and validate them for processing.

4. **Excel Processing:** Power Automate and Office Scripts extract and transform the Excel data, creating primary and associated SharePoint records.

5. **Export Generation:** Processed information is used to populate structured Excel export templates.

6. **Permission Management:** SharePoint permissions are applied at document and record level, including center-based access restrictions.

7. **Logging and Maintenance:** The solution records processing activity and performs scheduled cleanup of temporary files.

### Architecture Highlights

- Two-level SharePoint architecture with a Main Site and Management Subsite.
- Five coordinated Power Automate workflows (FL01-FL05).
- Office Scripts for structured Excel processing.
- SharePoint lists and document libraries with differentiated access permissions.
- Dynamic item-level security based on configurable SharePoint groups.
- Execution logging and temporary file management.

### Portfolio Scope

This is an independent portfolio demonstration based on a fictional business scenario.

The repository includes conceptual workflow definitions, technical documentation, reusable configuration examples, and independently developed demonstration components.

It is not a fully deployable production solution.

No confidential organizational information, real credentials, or proprietary workflow exports are included.


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
| FL02 | Excel processing, output generation and SharePoint record creation |
| FL03 | Scheduled temporary file cleanup |
| FL04 | Child flow for processing logs, execution tracking and error reporting |
| FL05 | Dynamic record-level permissions |
| Office Scripts | Excel data extraction and export generation |
| SharePoint | Document storage, records, permissions and processing logs |


## Technical Highlights

- Event-driven automation with trigger conditions.
- Manual validation integrated into automated workflows.
- Office Scripts execution from Power Automate.
- JSON-based data exchange between scripts.
- Sequential processing to preserve parent-child relationships.
- SharePoint permission inheritance management.
- Configuration-driven access control.
- Scheduled cleanup of temporary files.


## Project Components & Documentation

This project includes Power Automate workflows, Office Scripts, and sample Excel files demonstrating an integrated document processing solution.

### Power Automate Workflows

| ID | Description | Status | Documentation |
|---|---|---|---|
| FL01 | SharePoint and Excel document preparation, validation, and permissions | Documented | [View FL01](flows/FL01-demo/README.md) |
| FL02 | Excel processing, output generation, and SharePoint record creation | Documented | [View FL02](flows/FL02-demo/README.md) |
| FL03 | Scheduled cleanup of temporary files older than 8 hours | Documented | [View FL03](flows/FL03-demo/README.md) |
| FL04 | Processing logs, execution tracking, and error reporting | Documented | [View FL04](flows/FL04-demo/README.md) |
| FL05 | Dynamic SharePoint record-level permissions | Documented | [View FL05](flows/FL05-demo/README.md) |


### Office Scripts

Office Scripts support Excel data extraction, transformation, validation, and output generation.

| Script | Purpose | Source Code |
|---|---|---|
| process-records.ts | Processes structured Excel records for automation workflows. | [View Script](office-scripts/process-records.ts) |
| populate-export-template.ts | Populates an Excel export template with processed data. | [View Script](office-scripts/populate-export-template.ts) |

[Explore all Office Scripts](office-scripts/)

### Sample Excel Files

Fictional Excel datasets and templates used to demonstrate the automation process.

| File | Purpose | Download |
|---|---|---|
| sample-records.xlsx | Sample structured records used as input data. | [View File](sample-data/sample-records.xlsx) |
| export-template.xlsx | Excel template for generated output files. | [View File](sample-data/export-template.xlsx) |

[Explore all Sample Data](sample-data/)


### Technical Documentation

Architecture diagrams, implementation notes, and supporting technical documentation.


[Explore Documentation](docs/)

### SharePoint Architecture & Configuration

The project includes a documented SharePoint Online architecture with a Main Site and a Management Subsite.

The documentation covers:

- SharePoint site hierarchy and security architecture.
- Four SharePoint lists.
- Three document libraries.
- Role-based and item-level permissions.
- JSON command bar customizations.
- Request intake form layout.
- Integration with Power Automate workflows FL01-FL05.

| Component | Documentation |
|---|---|
| SharePoint Overview | [View Documentation](Sharepoint/README.md) |
| Sites Architecture | [View Architecture](Sharepoint/architecture/sites-architecture.md) |
| Main Site | [View Main Site](Sharepoint/sites/main-site.md) |
| Management Subsite | [View Management Subsite](Sharepoint/sites/management-subsite.md) |
| SharePoint Lists | [View Lists](Sharepoint/lists/request-intake.md) |
| Document Libraries | [View Libraries](Sharepoint/libraries/validation-library.md) |
| Request Form | [View JSON](Sharepoint/forms/request-intake-form.json) |

The documentation demonstrates reusable architecture and configuration patterns, not a fully deployable SharePoint provisioning package.

> All examples use fictional data and independently developed demonstration components. Conceptual JSON files are not directly importable into Power Automate.



## Repository Structure

- `docs/`: Technical documentation and architecture.
- `flows/`: Power Automate demonstration flows.
- `office-scripts/`: Independently developed Office Scripts.
- `sample-data/`: Fictional Excel datasets and templates.
- `Sharepoint/`: SharePoint Online architecture, sites, lists, document libraries, forms, and JSON customizations.

## Project Status

**Status: Documentation complete - Demonstration project**

The portfolio currently includes:

- Five documented Power Automate workflows (FL01-FL05).
- Conceptual workflow JSON definitions.
- Office Scripts source code.
- Fictional Excel sample data and templates.
- SharePoint site architecture documentation.
- Four documented SharePoint lists.
- Three documented document libraries.
- SharePoint JSON formatting examples.
- Request intake form layout example.
- Security and permissions documentation.

The conceptual Power Automate JSON files are not directly importable as production flows.

The project demonstrates the architecture and implementation approach but is not provided as a fully deployable solution package.

Further development may include executable demonstration flows, automated deployment, and additional testing.

## Security and Confidentiality

This repository contains only fictional data, generic configurations and independently developed demonstration code.

No corporate exports, credentials, internal URLs, proprietary components or real personal data are included.
