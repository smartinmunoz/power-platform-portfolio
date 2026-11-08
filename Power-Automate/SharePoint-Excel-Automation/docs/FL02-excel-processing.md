
# FL02 - Excel Processing and Data Transformation

## Overview

This workflow demonstrates the processing of previously reviewed Excel files using Power Automate, Office Scripts and SharePoint Online.

It generates structured output files and creates related records in a SharePoint list.

## Trigger

SharePoint - When an item or file is modified.

The workflow processes an Excel file after a user has manually reviewed it and updated its metadata status to "Validated".

Data verification and the review of mandatory fields are performed by a person before the workflow begins processing.

## Main Process

1. Detect the metadata change indicating that the file has been validated.
2. Access the corresponding Excel file.
3. Process and transform the Excel data using Office Scripts.
4. Generate the required output files.
5. Create records in a SharePoint list.
6. Identify primary and associated records using the input data.
7. Establish relationships between related records using reference codes.
8. Prepare the transformed Excel file for import into an external application.

## Record Relationships

The input data distinguishes between two record types:

- T: Primary record
- B: Associated record

Primary records appear before their associated records.

The demonstration implementation will use fictional records and generic reference codes.

## Technologies

- Power Automate
- SharePoint Online
- Excel Online (Business)
- Office Scripts
- TypeScript

## Technical Skills Demonstrated

- Metadata-driven workflow execution
- Excel data transformation
- Office Scripts integration
- Structured file generation
- SharePoint list operations
- Related-record processing
- Data preparation for external systems

## Security

This document describes a demonstration architecture.

No real personal data, corporate configurations, proprietary scripts or internal integration details are included.
  
