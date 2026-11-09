
# Power Automate Flows

This folder is intended for independently developed demonstration flows based on a generic Excel processing scenario.

## Solution Flows

| Flow | Description |
|---|---|
| FL01 | File reception and SharePoint document distribution |
| FL02 | Excel processing, export generation and SharePoint record creation |
| FL03 | Scheduled temporary file cleanup |
| FL04 | Child flow for processing logs and error tracking |
| FL05 | Dynamic SharePoint record-level permissions |

## Architecture

FL01 prepares the documents for manual validation.

FL02 processes validated files and creates the corresponding SharePoint records.

FL03 independently cleans up temporary files on a daily schedule.

FL04 is invoked by FL02 to record processing results and errors.

FL05 applies dynamic permissions when SharePoint records are created.

## Project Status

The demonstration flows are being prepared for independent implementation.

Technical documentation is available in the `docs` folder.

## Security

Only fictional data, generic configurations and independently developed components will be published.

No corporate solution exports, credentials, internal URLs or confidential information will be included.
