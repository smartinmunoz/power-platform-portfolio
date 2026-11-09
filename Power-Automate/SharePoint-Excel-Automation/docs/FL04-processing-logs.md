
# FL04 - Processing Logs and Error Tracking

## Overview

FL04 is a reusable Power Automate child flow responsible for recording processing results and errors in SharePoint Online.

It centralizes execution logging and provides traceability for automated Excel processing operations.

## Trigger

Power Automate - When a flow is called.

FL04 is invoked by the parent workflow (FL02).

## Input Parameters

The child flow receives processing information from FL02:

- Processing reference identifier.
- Source file name.
- Number of records read.
- Number of records created.
- Processing errors.
- Flow execution identifier.

## Main Process

1. Receive the processing information from FL02.
2. Prepare the execution summary.
3. Create a log entry in a SharePoint list.
4. Store the processing results and error details.
5. Preserve the execution identifier for traceability.

## SharePoint Logging

A dedicated SharePoint list stores the execution history.

The information can be used to:

- Review processing results.
- Identify failed or incomplete executions.
- Investigate processing errors.
- Compare the number of records read and created.
- Support troubleshooting and operational monitoring.

## Architecture

FL04 is a child flow of FL02.

Separating logging from the main processing workflow improves modularity, maintainability and reusability.

## Technologies

- Power Automate
- Child flows
- SharePoint Online
- JSON
- Error handling

## Implementation Notes

The public demonstration uses fictional data and generic SharePoint list structures.

The source file name and other input parameters must be validated to ensure that logging records contain the expected values.

## Security

No corporate URLs, tenant identifiers, credentials, personal data or proprietary configurations are included.
