
# Solution Architecture

## Overview

This project demonstrates an automated Excel processing pipeline using Microsoft Power Platform, SharePoint Online and Office Scripts.

The solution combines manual validation, automated data transformation, SharePoint record creation and dynamic permission management.

## Architecture Diagram

```mermaid
flowchart TD
    A["SharePoint: New Request with Excel Attachment"]
    B["FL01: File Reception"]
    C["Protected Document Library"]
    D["Validation Document Library"]
    E["Manual Excel Review"]
    F{"Status = Validated?"}
    G["FL02: Excel Processing"]
    H["Restrict Validator Permissions to Read"]
    I["Set Status to Processed"]
    J["Create Temporary Excel Copy"]
    K["Office Script 1: Extract Records"]
    L["Power Automate: Create Workbook from Template"]
    M["Office Script 2: Populate Export Workbook"]
    N["Sequential Record Processing"]
    O["Create SharePoint Records"]
    P["FL05: Apply Dynamic Record Permissions"]
    Q["Permissions Configuration List"]
    R["FL03: Scheduled Temporary File Cleanup"]
    T["FL04: Processing Logs and Error Tracking"]
    U["SharePoint: Processing Logs List"]

    A --> B
    B --> C
    B --> D
    D --> E
    E --> F
    F -->|Yes| G
    G --> H
    H --> I
    I --> J
    J --> K
    K --> L
    L --> M
    M --> N
    N --> O
    O --> P
    Q --> P
    G -.->|"Child flow invocation"| T
    T --> U
    S["Scheduled: Daily"]
    S --> R

```

## Main Components

### FL01: File Reception

Receives requests containing Excel attachments and creates copies in two SharePoint document libraries:

- Protected library for administrative access.
- Validation library for authorized reviewers.

### FL02: Excel Processing

Triggered when a file is marked as validated.

The workflow restricts editing permissions, updates the processing status, extracts Excel data, generates output files and creates related SharePoint records.

Primary and associated records are processed sequentially to preserve their relationships.

### FL03: Temporary File Cleanup

Scheduled workflow that removes temporary processing files older than eight hours.

### FL05: Dynamic Permissions

Triggered when a SharePoint record is created.

Uses a configuration list to determine the appropriate security groups and applies record-level permissions.

## Security

This architecture represents an independent demonstration using fictional data and generic configurations.

No proprietary corporate components, credentials or internal configurations are included.
```

