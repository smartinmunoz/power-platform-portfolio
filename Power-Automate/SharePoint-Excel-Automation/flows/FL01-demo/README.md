# FL01 - SharePoint File Reception and Distribution

## Overview

Demonstration of a Power Automate workflow designed to receive Excel attachments from a SharePoint list and distribute them to two document libraries.

All names, identifiers and data are fictional.

## Architecture

### Workflow Diagram


flowchart TD
    A["Nuevo elemento en lista SharePoint"]
    B["Romper herencia de permisos"]
    C["Conceder acceso al elemento"]
    D["Asignar permisos de lectura a grupo A"]
    E["Asignar permisos de lectura a grupo B"]
    F["Obtener adjuntos"]
    G["Obtener contenido del adjunto"]
    H["Crear archivo original"]
    I["Romper herencia de permisos del archivo"]
    J["Asignar lectura al grupo A"]
    K["Asignar lectura al grupo B"]
    L["Actualizar propiedades del archivo"]
    M["Obtener propiedades del archivo original"]
    N["Actualizar estado de la solicitud"]
    O["Actualizar resultado del archivo original"]
    P["Crear archivo para validacion"]
    Q["Actualizar propiedades del archivo para validacion"]
    R["Finalizar"]

    A --> B --> C --> D --> E --> F --> G --> H
    H --> I --> J --> K --> L --> M --> N --> O
    O --> P --> Q --> R

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

