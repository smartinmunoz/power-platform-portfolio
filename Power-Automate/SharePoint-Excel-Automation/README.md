
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
| FL02 | Excel processing, output generation, and SharePoint record creation | Planned | Coming soon |
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

> All examples use fictional data and independently developed demonstration components. Conceptual JSON files are not directly importable into Power Automate.



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
