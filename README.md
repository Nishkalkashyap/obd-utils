# OBD Utils

The aim of this library is to provide utility methods to make it easier to work with the OBD-II protocol.

## Programmatic Usage:
```ts
import { parseOBDResponse, getPIDInfo } from 'obd-utils';

// Parse an OBD response
const parsedCommand = parseOBDResponse('41 05 3C \r');
console.log(parsedCommand);
/**
 * The resulting output will resemble:
 * IParsedOBDResponse {
 *      mode: '41',
 *      pid: '05',
 *      name: 'temp',
 *      unit: 'Celsius',
 *      value: '60'
 * }
 */

// Get the info for a PID
const info = getPIDInfo('0C');
console.log(info);
/**
 * The resulting output will resemble:
 * IObdPIDDescriptor {
 *      mode: '01',
 *      pid: '0C',
 *      bytes: 2,
 *      name: 'rpm',
 *      description: 'Engine RPM',
 *      min: 0,
 *      max: 16383.75,
 *      unit: 'rev/min'
 * }
 */


// List all PID IDs
const allPids = getAllPIDs();
console.log(allPids);
/**
 * The resulting output will resemble:
 * Array<IObdPIDDescriptor> [
 *    ...,
 *    {
 *       mode: '01',
 *       pid: '0C',
 *       bytes: 2,
 *       name: 'rpm',
 *       description: 'Engine RPM',
 *       min: 0,
 *       max: 16383.75,
 *       unit: 'rev/min'
 *    }
 * ]
 */
```

## List of OBD2 PIDs

<!-- do not edit, the table below is auto generated -->
<!-- insert-table-here -->
<!-- end-table-here -->
