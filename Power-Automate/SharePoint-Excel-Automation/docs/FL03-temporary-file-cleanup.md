
# FL03 - Scheduled Temporary File Cleanup

## Overview

This workflow demonstrates scheduled maintenance of temporary Excel files generated during automated data processing.

It addresses file-locking issues that may occur after executing Office Scripts.

## Trigger

Power Automate - Recurrence

The workflow runs automatically once per day.

## Main Process

1. Start the scheduled cleanup process.
2. Retrieve temporary files from the designated storage location.
3. Check the age of each file.
4. Identify files older than 8 hours.
5. Delete files that meet the cleanup criteria.

## Technical Challenge

Excel files processed using Office Scripts may remain temporarily locked.

Attempting to delete these files immediately can cause errors in Power Automate and interfere with other workflows.

## Solution

The cleanup process is separated from the main processing workflow.

A scheduled flow removes temporary files after a defined retention period, reducing conflicts caused by temporary file locks.

## Technologies

- Power Automate
- Scheduled cloud flows
- SharePoint Online
- Date and time expressions
- File management

## Technical Skills Demonstrated

- Scheduled automation
- Temporary file lifecycle management
- Date-based filtering
- Workflow separation
- Operational reliability
- File-lock handling

## Security

The public demonstration will use a dedicated test location and fictional files.

No corporate storage paths, credentials or internal configurations will be included.
  
