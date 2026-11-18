
# Solution Architecture

## Overview

This project demonstrates an automated Excel processing pipeline using Microsoft Power Platform, SharePoint Online and Office Scripts.

The solution combines manual validation, automated data transformation, SharePoint record creation and dynamic permission management.

## Architecture Diagram

```mermaid
flowchart TD
    A["SharePoint: New request with Excel attachment"]
    B["FL01: Receive and distribute attachments"]
    C["Main Site: Derived Documents Library"]
    D["Management Subsite: Validation Library"]
    E["Manual review"]
    F{"Status = Validated?"}
    G["FL02: Restrict source-file editing and set Processing"]
    H["Create temporary Excel copy"]
    I["Office Script 1: Extract records"]
    J["Create export workbook and run Office Script 2"]
    K["Sequentially create primary and associated records"]
    L["FL05: Apply dynamic record permissions"]
    M["Center / group configuration list"]
    N["FL04: Log execution and errors"]
    O{"Processing and logging successful; SharePointErrors = 0?"}
    P["Set source status to Processed"]
    Q["Set source status to Error"]
    R["FL03: Scheduled temporary-file cleanup"]

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
    M --> L
    G -.->|Call child flow after processing| N
    K --> N
    N --> O
    O -->|Yes| P
    O -->|No| Q
    S["Daily schedule"] --> R
```

## Main Components

### FL01: File Reception

Receives requests containing Excel attachments and creates copies in two SharePoint document libraries:

- Derived Documents Library in the Main Site for read-only access by authorized users.
- Validation Library in the Management Subsite for restricted internal review and processing.

### FL02: Excel Processing

Triggered when a file is marked as validated.

The workflow restricts editing permissions on the source document and sets its status to `Processing`. It then extracts Excel data, generates output files, creates related SharePoint records, and invokes FL04 to log the execution. Once processing and logging are evaluated, it sets the source status to `Processed` on success with `SharePointErrors = 0`, or `Error` on failure.

Primary and associated records are processed sequentially to preserve their relationships. This diagram summarizes conceptual responsibilities rather than an executable flow package; detailed error paths and action order are described in [FL02 documentation](../flows/FL02-demo/README.md).

### FL03: Temporary File Cleanup

Scheduled workflow that removes temporary processing files older than eight hours.

### FL04: Processing Logs and Error Tracking

Reusable child flow invoked by FL02 to centralize processing logs and error reporting.

The flow receives execution information, including the source file, processing reference, record counts, error details and execution identifier.

It creates a SharePoint log entry to provide traceability and support troubleshooting.

This separation keeps the main processing workflow focused on business operations while delegating execution logging to a dedicated component.


### FL05: Dynamic Permissions

Triggered when a SharePoint record is created.

Uses a configuration list to determine the appropriate security groups and applies record-level permissions.

## Security

This architecture represents an independent demonstration using fictional data and generic configurations.

No proprietary corporate components, credentials or internal configurations are included.
```

