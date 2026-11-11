
# Technical Documentation

This directory serves as the technical documentation index for the SharePoint & Excel Automation Pipeline demonstration project.

The project showcases a conceptual Microsoft Power Platform solution integrating Power Automate, SharePoint Online, Excel Online, and Office Scripts.

All resources are based on fictional data and generic configurations.

## Solution Architecture

The solution includes five conceptual Power Automate workflows, two Office Scripts, and a documented SharePoint structure.

### SharePoint Architecture

- [SharePoint Overview](../Sharepoint/README.md)
- [Site Architecture](../Sharepoint/architecture/sites-architecture.md)
- [Main Site](../Sharepoint/sites/main-site.md)
- [Management Subsite](../Sharepoint/sites/management-subsite.md)

### Power Automate Workflows

| Workflow | Description | Documentation |
|---|---|---|
| FL01 | Document intake and permissions | [FL01](../flows/FL01-demo/README.md) |
| FL02 | Excel processing and SharePoint record creation | [FL02](../flows/FL02-demo/README.md) |
| FL03 | Scheduled temporary file cleanup | [FL03](../flows/FL03-demo/README.md) |
| FL04 | Centralized processing logs | [FL04](../flows/FL04-demo/README.md) |
| FL05 | Dynamic record-level permissions | [FL05](../flows/FL05-demo/README.md) |

These workflows are conceptual demonstrations, not importable Power Automate flow definitions.

### Office Scripts

- [Process Excel Records](../office-scripts/process-records.ts)
- [Populate Export Template](../office-scripts/populate-export-template.ts)

The scripts demonstrate Excel data extraction and export workbook population.

### Sample Data

- [Sample Records](../sample-data/sample-records.xlsx)
- [Export Template](../sample-data/export-template.xlsx)
- [Sample Data Documentation](../sample-data/README.md)

### SharePoint Components

The documented SharePoint solution includes:

- Four document libraries
- Four SharePoint lists
- One example form configuration
- Two JSON formatting examples
- Site structure and permission documentation

See the [SharePoint documentation](../Sharepoint/README.md) for component details.

## Implementation Scope

This repository documents a fictional reference architecture.

The Power Automate JSON files describe conceptual workflow structures and are not directly importable into Power Automate.

The Office Scripts are provided as TypeScript examples.

A production deployment would require environment-specific configuration, connector authentication, permissions, testing, and implementation of the actual Power Automate actions.

## Security and Privacy

- Fictional records and identifiers
- Generic SharePoint configurations
- No real corporate information
- No credentials or secrets
- No proprietary solution exports

## Project Overview

Return to the [main project README](../README.md).
