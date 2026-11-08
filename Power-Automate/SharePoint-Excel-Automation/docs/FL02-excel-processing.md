
# FL02 - Excel Processing and Record Creation

## Overview

This workflow processes manually validated Excel files, generates the required output files and creates related records in SharePoint Online.

It also manages document permissions to prevent validators from modifying the Excel file during processing.


## Trigger

SharePoint - When a file is created or modified
(properties only).

The workflow uses the following trigger condition:

```text
@equals(triggerBody()?['Estat']?['Value'], 'Validat')
```

Only events where the file status is "Validated"
are allowed to start the workflow.

## Additional Processing Check

Before entering the main processing block,
the workflow checks the validation status again.

This additional condition was introduced as a
safeguard during testing to prevent unintended
processing executions.


## Main Process


## Main Process

1. Trigger the workflow only when the SharePoint file status is "Validated", using a trigger condition.
2. Initialize error-tracking variables and the last primary record identifier.
3. Break permission inheritance and change validators' permissions from Edit/Contribute to Read.
4. Update the file status to "Processed" before starting the main data processing operations.
5. Perform an additional validation-status check to prevent unintended processing during testing.
6. If the condition is met, retrieve the validated Excel file and create a temporary working copy.
7. Execute Office Scripts to extract the Excel records and check the script result.
8. Generate the required output Excel files, including the file prepared for import into an external application.
9. Process the extracted records in Power Automate, distinguishing primary (T) and associated (B) records and managing their relationships.
10. Create the corresponding records in the target SharePoint list.

**Note:** In the current implementation, the "Processed" status is assigned before the main processing operations. It does not confirm successful completion.
  

## Record Processing

The source Excel identifies two types of records:

- T: Primary record
- B: Associated record

Primary records appear before their associated records.

Power Automate manages the creation and relationships of these records in SharePoint. This logic is not handled by the initial Excel-reading Office Script.

### Sequential Record Processing

The "Apply to each" loop processes Excel records sequentially, with concurrency limited to one iteration at a time.

This preserves the original record order and ensures that each primary record (T) is created before its associated records (B).

Power Automate stores the SharePoint ID of the most recently created primary record in a variable. Subsequent associated records use this identifier to establish the correct relationship.

Sequential execution prevents race conditions and incorrect associations caused by parallel processing.
  

## Permission Management

Before accessing and processing the file, FL02 changes the validators' permissions from collaboration to read-only.

This prevents those users from editing the file during processing.


## Processing Status

- **Validated (Validat):** The file has been manually reviewed and approved for processing.
- **Processed (Tractat):** The file has entered the automated processing stage.

The workflow changes the file status to "Processed" before executing the main data processing operations.

This status does not guarantee that processing has completed successfully.

Processing errors are tracked separately within the workflow.

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

## Excel Export Generation

After the validated source workbook has been processed, the flow generates an Excel file for an external application.

### Process

1. Retrieve the predefined Excel export template.
2. Create a new workbook from the template.
3. Prepare the source records as a JSON array.
4. Execute the `populate-export-template.ts` Office Script against the newly created workbook.
5. Write the selected fields into the predefined destination columns, starting at row 15.
6. Return the number of records written.

### Demonstration Files

- `sample-data/sample-records.xlsx`: Sample source data.
- `sample-data/export-template.xlsx`: Excel template with predefined headers.
- `office-scripts/process-records.ts`: Extracts source records.
- `office-scripts/populate-export-template.ts`: Populates the export workbook.

### Implementation Notes

The demonstration uses fictional records and a simplified four-column mapping.

The export workbook is generated before the flow starts creating records in the SharePoint destination list.

In the production architecture, Power Automate manages file creation and orchestration, while Office Scripts performs the Excel data transformations.
  
  
