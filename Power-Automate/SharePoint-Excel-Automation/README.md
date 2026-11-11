
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

### The Challenge

An organization receives structured Excel files from multiple external users and operational centers.

These documents require validation, data processing, record creation, and controlled distribution of information.

Without automation, this process may involve:

- Manual document collection and organization.
- Repetitive Excel data extraction and transformation.
- Manual creation of SharePoint records.
- Difficulty maintaining relationships between related records.
- Complex permission management across operational centers.
- Limited visibility into processing results and errors.

### The Solution

The proposed architecture centralizes document intake through SharePoint and coordinates processing activities using Power Automate and Office Scripts.

The solution provides:

- A standardized request submission process.
- Automated document distribution between SharePoint locations.
- A controlled document validation stage.
- Automated extraction and transformation of Excel data.
- Sequential creation of primary and associated records.
- Structured Excel export generation.
- Center-based access control using SharePoint groups.
- Centralized processing logs and scheduled temporary file cleanup.

### Business Benefits

The architecture is designed to demonstrate how automation can:

- Reduce repetitive administrative tasks.
- Improve consistency in document processing.
- Preserve relationships between related records.
- Support controlled access to sensitive operational information.
- Improve traceability of processing activities.
- Simplify maintenance through centralized configuration.
- Provide a scalable foundation for future workflow improvements.

These benefits represent the intended design objectives of the demonstration architecture and have not been measured in a production environment.


## Solution Components

The solution combines five Power Automate workflows, Office Scripts, and SharePoint Online resources.

### Power Automate Workflows

| Component | Purpose |
|---|---|
| FL01 - Request Intake | Retrieves Excel attachments from SharePoint requests, distributes document copies to two libraries, and manages request-level permissions. |
| FL02 - Excel Processing | Processes validated Excel documents, protects source files, creates primary and associated SharePoint records, and generates export workbooks. |
| FL03 - Temporary File Cleanup | Performs scheduled cleanup of temporary processing files older than eight hours. |
| FL04 - Processing Logs | Creates execution log entries and returns the `Id_Log` identifier to the calling workflow. |
| FL05 - Dynamic Permissions | Assigns item-level SharePoint permissions based on center-to-group configuration. |

### Supporting Technologies

| Component | Purpose |
|---|---|
| SharePoint Online | Provides request intake, document libraries, structured lists, and permission management. |
| Excel Online | Supports workbook storage and integration with automated processing. |
| Office Scripts | Performs structured Excel data processing and populates export templates. |
| SharePoint REST API | Supports advanced SharePoint operations, including permission inheritance and role assignments. |
| JSON | Supports data exchange, conceptual workflow definitions, and SharePoint interface customizations. |

### Component Coordination

FL01 manages request intake and document distribution.

FL02 performs validated document processing and coordinates record creation and export generation.

FL04 supports execution logging, while FL05 applies center-based permissions to processed records.

FL03 independently performs scheduled cleanup of temporary processing files.

Together, these components demonstrate a modular architecture that separates document intake, processing, security, logging, and maintenance responsibilities.



## Technical Highlights

This project demonstrates several Microsoft Power Platform and SharePoint automation design patterns.

### Power Automate Orchestration

- Event-driven workflows triggered by SharePoint list and document events.
- Trigger conditions to control workflow execution.
- Coordination between multiple automated processes.
- Child flow integration for centralized execution logging.
- Scheduled automation for temporary file cleanup.
- Modular separation of processing, permissions, and logging responsibilities.

### Excel Automation with Office Scripts

- Integration between Power Automate and Excel Online.
- Execution of Office Scripts for structured data processing.
- JSON-based data exchange between scripts and workflows.
- Sequential record processing to preserve parent-child relationships.
- Automated population of Excel export templates.

### SharePoint Architecture and Security

- Main Site and Management Subsite architecture.
- SharePoint lists and document libraries with differentiated permissions.
- File-level permission inheritance management.
- Dynamic item-level permissions using SharePoint REST API.
- Center-to-group mapping through a centralized configuration list.
- Separation of ordinary user permissions and automation connection privileges.

### Data Processing and Traceability

- Creation of primary and associated SharePoint records.
- Preservation of parent-child relationships using record identifiers.
- Execution logging through a dedicated child workflow.
- Processing status tracking and error reporting.
- Scheduled cleanup of temporary processing files.

### Reusable Design Principles

- Modular workflow architecture.
- Configuration-driven permission management.
- Separation of responsibilities.
- Least-privilege access design.
- Maintainability and extensibility.
- Documentation-first development using fictional demonstration data.

These capabilities are illustrated through conceptual workflow definitions, technical documentation, and selected independently developed demonstration components.


## Project Components & Documentation

This project includes Power Automate workflows, Office Scripts, and sample Excel files demonstrating an integrated document processing solution.


### Power Automate Workflows

The solution includes five documented conceptual workflows, each with a dedicated technical README and JSON architecture example.

| Workflow | Main Responsibility | Documentation | Conceptual JSON |
|---|---|---|---|
| FL01 - Request Intake | SharePoint request submission, Excel attachment distribution, and request permissions | [README](flows/FL01-demo/README.md) | [JSON](flows/FL01-demo/FL01-demo.json) |
| FL02 - Excel Processing | Document validation, Excel processing, SharePoint record creation, and export generation | [README](flows/FL02-demo/README.md) | [JSON](flows/FL02-demo/FL02-demo.json) |
| FL03 - Temporary Cleanup | Scheduled removal of temporary processing files older than eight hours | [README](flows/FL03-demo/README.md) | [JSON](flows/FL03-demo/FL03-demo.json) |
| FL04 - Processing Logs | Centralized execution logging and return of the `Id_Log` identifier | [README](flows/FL04-demo/README.md) | [JSON](flows/FL04-demo/FL04-demo.json) |
| FL05 - Dynamic Permissions | Center-based SharePoint item-level permission assignments | [README](flows/FL05-demo/README.md) | [JSON](flows/FL05-demo/FL05-demo.json) |

The JSON files describe conceptual workflow structures for learning and portfolio purposes.

They are not directly importable Power Automate flow packages.


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
