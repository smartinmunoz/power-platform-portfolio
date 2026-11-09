# FL01 - SharePoint File Reception and Distribution

## Overview

Demonstration of a Power Automate workflow designed to receive Excel attachments from a SharePoint list and distribute them to two document libraries.

All names, identifiers and data are fictional.

## Architecture

### Workflow Diagram

```mermaid
flowchart TD
    A["New SharePoint list item"] --> B["Break item permission inheritance"]
    B --> C["Grant access to the item"]
    C --> D["Assign read access to Members"]
    D --> E["Assign read access to Owners"]
    E --> F["Get attachments"]
    F --> G["Get attachment content"]
    G --> H["Create original file"]
    H --> I["Break original file permission inheritance"]
    I --> J["Assign read access to Members"]
    J --> K["Assign read access to Owners"]
    K --> L["Update original file properties"]
    L --> M["Get original file properties"]
    M --> N["Update request status"]
    N --> O["Update original file results"]
    O --> P["Create validation file"]
    P --> Q["Update validation file properties"]
    Q --> R["Terminate flow"]
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

The workflow uses different permission levels depending on the SharePoint resource.

| SharePoint Resource | Members | Owners |
|---|---|---|
| Request list item | Read | Read |
| Original document | Read | Read |
| Validation document | Edit | Edit |

Permission inheritance is broken for the request list item and the original document.

The demonstration uses fictional SharePoint groups (`IntegrantesDemo` and `PropietariosDemo`).


## Implementation Status

**Conceptual demonstration. Not an importable Power Automate flow.**

The FL01-demo.json file documents the intended workflow architecture.

SharePoint permissions, metadata updates and attachment processing must be implemented and tested in an appropriate environment.

## Security

- Fictional SharePoint resources.
- No real user data.
- No credentials or connection identifiers.
- No corporate solution exports.

## Technologies

- Microsoft Power Automate
- SharePoint Online
- JSON

