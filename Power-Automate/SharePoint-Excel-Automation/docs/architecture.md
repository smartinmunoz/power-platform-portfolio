# Solution Architecture

## Overview

This project demonstrates an automated Excel processing pipeline using Microsoft Power Platform.

## Main components

- SharePoint: Data registration and document storage
- Power Automate: Workflow orchestration
- Office Scripts: Excel data processing
- FL01: File reception and permission management
- FL02: File validation and transformation
- FL03: Temporary file cleanup
- FL05: Record-level permission management

## Architecture status

The detailed workflow diagram is being prepared.

All components will be recreated independently using fictional data and generic configurations.


```mermaid
flowchart TD
    A["FL01: File Reception"] --> B["Manual Excel Review"]
    B --> C{"Status = Validated?"}
    C -->|Yes| D["FL02: Excel Processing"]
    D --> E["Generate Output Files"]
    E --> F["Create SharePoint Records"]
    F --> G["FL05: Dynamic Permissions"]
    H["Permissions Configuration List"] --> G
    D -.-> I["Temporary Files"]
    J["FL03: Daily Cleanup"] --> I
    J --> K["Delete Files Older Than 8 Hours"]
```
  
