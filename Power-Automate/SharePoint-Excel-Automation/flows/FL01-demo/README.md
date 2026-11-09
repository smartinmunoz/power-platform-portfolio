# FL01 - SharePoint File Reception and Distribution

## Overview

Demonstration of a Power Automate workflow designed to receive Excel attachments from a SharePoint list and distribute them to two document libraries.

All names, identifiers and data are fictional.

## Architecture

### Workflow Diagram

```mermaid
flowchart TD
    A["New item in SolicitudesDemo"] --> B{"Has attachments?"}
    B -->|No| C["End without processing"]
    B -->|Yes| D["Get attachments"]
    D --> E["For each attachment"]
    E --> F{"Is it an .xlsx file?"}
    F -->|No| G["Skip attachment"]
    F -->|Yes| H["Get attachment content"]
    H --> I["Create file in DocumentosEntradaDemo"]
    I --> J["Create file in DocumentosValidacionDemo"]
    J --> K["Associate document metadata"]
    K --> L["Record processing result"]
    H -.->|Error| M["Log error and notify administrator"]
    I -.->|Error| M
    J -.->|Error| M
    K -.->|Error| M
```

**Trigger:** When an item is created in `SolicitudesDemo`.

**Process:**

1. Detect a new SharePoint list item.
2. Check whether attachments exist.
3. Retrieve each attachment.
4. Process Excel files (.xlsx).
5. Create a copy in `DocumentosEntradaDemo`.
6. Create a copy in `DocumentosValidacionDemo`.
7. Associate document metadata.
8. Record the processing result.

## SharePoint Components

| Component | Purpose |
|---|---|
| SolicitudesDemo | Request intake list |
| DocumentosEntradaDemo | Restricted document library |
| DocumentosValidacionDemo | Validation document library |

## Permissions

- AdministradoresDemo: access to both libraries.
- ValidadoresDemo: access to the validation library.

## Error Handling

The proposed design includes processing statuses:

- Completado
- Error
- Omitido

Errors should be logged and reported to an administrator.

## Implementation Status

**Conceptual demonstration. Not an importable Power Automate flow.**

The FL01-demo.json file documents the intended workflow architecture.

SharePoint permissions, metadata updates, error handling and attachment processing must be implemented and tested in an appropriate environment.

## Security

- Fictional SharePoint resources.
- No real user data.
- No credentials or connection identifiers.
- No corporate solution exports.

## Technologies

- Microsoft Power Automate
- SharePoint Online
- JSON

