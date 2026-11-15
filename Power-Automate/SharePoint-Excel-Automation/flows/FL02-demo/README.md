
# FL02 - Excel Processing and Record Creation

## Overview

FL02 is the main Power Automate workflow responsible for processing validated Excel files, generating output workbooks, and creating related records in SharePoint Online.

It orchestrates SharePoint document management, Office Scripts, sequential record processing, error tracking, and execution logging through the FL04 child flow.

This is an independent conceptual demonstration using fictional data.

## Architecture

```mermaid
flowchart TD
    A["SharePoint: File created or modified"]
    A --> B{"Status = Validated?"}
    B -->|No| Z["End"]
    B -->|Yes| C["Initialize 5 variables"]

    C --> D["Break file permission inheritance"]
    D --> E["Grant Read to Members"]
    E --> F["Grant Read to Owners"]
    F --> G["Update file status to Processing"]
    G --> H{"Additional validation condition"}

    H -->|Yes| I["Get validated Excel file"]
    I --> J["Create temporary Excel file"]
    J --> K["Run Office Script: Extract records"]
    K --> L{"Script result valid?"}

    L -->|Yes| M["Get Excel export template"]
    M --> N["Create export workbook"]
    N --> O["Run Office Script: Populate export"]
    O --> P["Apply to each Excel record - Sequential"]

    subgraph LOOP["Excel record processing"]
        P --> Q["Look up center"]
        Q --> R{"Record type = T?"}

        R -->|Yes| S["Create primary SharePoint record"]
        S --> T{"Creation successful?"}
        T -->|Yes| U["Save LastPrimaryRecordId"]
        U --> V["Increment RecordsCreated"]
        T -->|No| W["Increment SharePointErrors"]
        W --> X["Append error to ErrorDetails"]

        R -->|No| Y{"Record type = B?"}
        Y -->|Yes| AA["Create associated SharePoint record"]
        AA --> AB["Set ParentRecordId from LastPrimaryRecordId"]
        AB --> AC{"Creation successful?"}
        AC -->|Yes| AD["Increment RecordsCreated"]
        AC -->|No| AE["Increment SharePointErrors"]
        AE --> AF["Append error to ErrorDetails"]
        Y -->|No| AG["Skip unsupported record"]
    end

    V --> AH["Next record"]
    X --> AH
    AD --> AH
    AF --> AH
    AG --> AH
    AH -->|More records| P

    AH -->|All records processed| AI["Calculate final diagnostics"]
    L -->|No| AI
    H -->|No| AI

    AI --> AJ["Build processing summary"]
    AJ --> AK["Call FL04 child flow"]

    AK --> AL{"Processing completed successfully and SharePointErrors = 0?"}
    AL -->|Yes| AM["Update file status to Processed"]
    AL -->|No| AN["Update file status to Error"]

    AM --> AO["End"]
    AN --> AO

    G -.->|Unrecoverable execution failure| AN
    AK -.->|FL04 logging failure| AN
```

The architecture diagram illustrates the conceptual processing workflow.

The source file is marked as `Processing` before Excel operations begin.

After processing and logging, the workflow determines whether the file should be marked as `Processed` or `Error`.

Dashed arrows represent conceptual exception paths. They do not imply executable Power Automate error handling.

## Trigger

**SharePoint - When a file is created or modified (properties only)**

The workflow uses a trigger condition that checks whether the file status is `Validated`.

An additional condition is used before the main processing operations.

Changing the file status to `Processing` prevents subsequent file modifications from satisfying the `Validated` trigger condition.

## Initialization

The workflow initializes five variables:

| Variable | Type | Purpose |
|---|---|---|
| SharePointErrors | Integer | Counts failed SharePoint record creation operations |
| RecordsWithErrors | Integer | Stores the final number of records whose SharePoint creation failed |
| LastPrimaryRecordId | Integer | Stores the last successfully created primary record ID |
| ErrorDetails | Array | Collects SharePoint record creation error details |
| RecordsCreated | Integer | Counts successfully created SharePoint records |

In this conceptual demonstration, `RecordsWithErrors` is calculated from `SharePointErrors` during final diagnostics.

Both values represent the number of failed SharePoint record creation operations.

## Document Permission Management

Before processing the Excel file, the workflow:

1. Breaks permission inheritance on the source document.
2. Grants Read permissions to the configured Members group.
3. Grants Read permissions to the configured Owners group.

This restricts editing during processing.

## Document Status

FL02 manages the source document lifecycle using four conceptual SharePoint status values.

### Status Definitions

| Status | Description |
|---|---|
| Validated | The document has been validated and is ready for processing |
| Processing | The workflow has started processing the document |
| Processed | Processing and execution logging completed successfully without SharePoint record creation errors |
| Error | Processing failed, SharePoint record creation errors occurred, or execution logging failed |

### Status Transitions

| Previous Status | New Status | Condition |
|---|---|---|
| Validated | Processing | FL02 starts processing the validated document |
| Processing | Processed | Main processing and FL04 logging succeed, with SharePointErrors = 0 |
| Processing | Error | Main processing fails, SharePointErrors > 0, or FL04 logging fails |

### Processing Status

At the beginning of execution, FL02 updates the source file status from `Validated` to `Processing`.

This distinguishes documents currently being processed from documents that have completed processing.

The trigger condition only accepts files with status `Validated`, helping prevent duplicate executions caused by subsequent metadata updates.

### Successful Completion

After completing the main processing operations, FL02 prepares the execution diagnostics and invokes FL04.

If processing and logging complete successfully and no SharePoint record creation errors are reported, FL02 updates the source
