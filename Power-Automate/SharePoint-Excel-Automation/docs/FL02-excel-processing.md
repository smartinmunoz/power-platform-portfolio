
# FL02 - Excel Processing and Record Creation

## Overview

This workflow processes manually validated Excel files, generates the required output files and creates related records in SharePoint Online.

It also manages document permissions to prevent validators from modifying the Excel file during processing.

## Trigger

SharePoint - When an item or file is modified.

The workflow starts when an authorized validator changes the file status to "Validated".

## Main Process

1. Detect the validated file.
2. Change validators' permissions from Edit/Contribute to Read before processing begins.
3. Read the Excel data using Office Scripts.
4. Generate the required output files, including a file prepared for import into an external application.
5. Create records in the target SharePoint list.
6. Process primary and associated records according to their reference codes and relationships.
7. When processing completes successfully, update the file status to "Processed".

## Record Processing

The source Excel identifies two types of records:

- T: Primary record
- B: Associated record

Primary records appear before their associated records.

Power Automate manages the creation and relationships of these records in SharePoint. This logic is not handled by the initial Excel-reading Office Script.

## Permission Management

Before accessing and processing the file, FL02 changes the validators' permissions from collaboration to read-only.

This prevents those users from editing the file during processing.

## Processing Status

- Validated: The file has been manually reviewed and approved for processing.
- Processed: The automated processing has completed successfully.

The workflow updates the status to Processed only after successful completion.

## Temporary Files

Office Scripts may leave temporary Excel files locked for a period of time.

A separate scheduled workflow (FL03) handles cleanup of temporary files older than 8 hours.

## Technologies

- Power Automate
- SharePoint Online
- Excel Online (Business)
- Office Scripts
- TypeScript
- SharePoint permission management

## Technical Skills Demonstrated

- Metadata-driven automation
- Document lifecycle management
- Permission changes before processing
- Office Scripts integration
- Excel data extraction
- Output file generation
- SharePoint record creation
- Related-record processing
- Workflow orchestration

## Security

This document describes a generic demonstration architecture.

No corporate URLs, real identifiers, personal data, proprietary scripts or internal configurations are included.
  
