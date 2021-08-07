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

## OBD2 list of PIDs

<!-- do not edit, the table below is auto generated -->
<!-- insert-table-here -->
PID | Description | Units
------------ | -------------| --------------
00 | PIDs supported 00-20 | Bit Encoded
01 | Monitor status since DTCs cleared | Bit Encoded
02 | DTC that caused required freeze frame data storage | Bit Encoded
03 | Fuel system 1 and 2 status | Bit Encoded
04 | Calculated LOAD Value | %
05 | Engine Coolant Temperature | Celsius
06 | Short Term Fuel Trim - Bank 1,3 | %
07 | Long Term Fuel Trim - Bank 1,3 | %
08 | Short Term Fuel Trim - Bank 2,4 | %
09 | Long Term Fuel Trim - Bank 2,4 | %
0A | Fuel Pressure | kPa
0B | Intake Manifold Absolute Pressure | kPa
0C | Engine RPM | rev/min
0D | Vehicle Speed Sensor | km/h
0E | Ignition Timing Advance for #1 Cylinder | degrees relative to #1 cylinder
0F | Intake Air Temperature | Celsius
10 | Air Flow Rate from Mass Air Flow Sensor | g/s
11 | Absolute Throttle Position | %
12 | Commanded Secondary Air Status | Bit Encoded
13 | Location of Oxygen Sensors | Bit Encoded
14 | Bank 1 - Sensor 1/Bank 1 - Sensor 1 Oxygen Sensor Output Voltage / Short Term Fuel Trim | V
15 | Bank 1 - Sensor 2/Bank 1 - Sensor 2 Oxygen Sensor Output Voltage / Short Term Fuel Trim | V
16 | Bank 1 - Sensor 3/Bank 2 - Sensor 1 Oxygen Sensor Output Voltage / Short Term Fuel Trim | V
17 | Bank 1 - Sensor 4/Bank 2 - Sensor 2 Oxygen Sensor Output Voltage / Short Term Fuel Trim | V
18 | Bank 2 - Sensor 1/Bank 3 - Sensor 1 Oxygen Sensor Output Voltage / Short Term Fuel Trim | V
19 | Bank 2 - Sensor 2/Bank 3 - Sensor 2 Oxygen Sensor Output Voltage / Short Term Fuel Trim | V
1A | Bank 2 - Sensor 3/Bank 4 - Sensor 1 Oxygen Sensor Output Voltage / Short Term Fuel Trim | V
1B | Bank 2 - Sensor 4/Bank 4 - Sensor 2 Oxygen Sensor Output Voltage / Short Term Fuel Trim | V
1C | OBD requirements to which vehicle is designed | Bit Encoded
1D | Location of oxygen sensors | Bit Encoded
1E | Auxiliary Input Status | Bit Encoded
1F | Time Since Engine Start | seconds
20 | PIDs supported 21-40 | Bit Encoded
21 | Distance Travelled While MIL is Activated | km
22 | Fuel Rail Pressure relative to manifold vacuum | kPa
23 | Fuel Rail Pressure (diesel) | kPa
24 | Bank 1 - Sensor 1/Bank 1 - Sensor 1 (wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Voltage | (ratio)
25 | Bank 1 - Sensor 2/Bank 1 - Sensor 2 (wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Voltage | (ratio)
26 | Bank 1 - Sensor 3 /Bank 2 - Sensor 1(wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Voltage | (ratio)
27 | Bank 1 - Sensor 4 /Bank 2 - Sensor 2(wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Voltage | (ratio)
28 | Bank 2 - Sensor 1 /Bank 3 - Sensor 1(wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Voltage | (ratio)
29 | Bank 2 - Sensor 2 /Bank 3 - Sensor 2(wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Voltage | (ratio)
2A | Bank 2 - Sensor 3 /Bank 4 - Sensor 1(wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Voltage | (ratio)
2B | Bank 2 - Sensor 4 /Bank 4 - Sensor 2(wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Voltage | (ratio)
2C | Commanded EGR | %
2D | EGR Error | %
2E | Commanded Evaporative Purge | %
2F | Fuel Level Input | %
30 | Number of warm-ups since diagnostic trouble codes cleared | 
31 | Distance since diagnostic trouble codes cleared | km
32 | Evap System Vapour Pressure | Pa
33 | Barometric Pressure | kPa
34 | Bank 1 - Sensor 1/Bank 1 - Sensor 1 (wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Current | (ratio)
35 | Bank 1 - Sensor 2/Bank 1 - Sensor 2 (wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Current | (ratio)
36 | Bank 1 - Sensor 3/Bank 2 - Sensor 1 (wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Current | (ratio)
37 | Bank 1 - Sensor 4/Bank 2 - Sensor 2 (wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Current | (ratio)
38 | Bank 2 - Sensor 1/Bank 3 - Sensor 1 (wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Current | (ratio)
39 | Bank 2 - Sensor 2/Bank 3 - Sensor 2 (wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Current | (ratio)
3A | Bank 2 - Sensor 3/Bank 4 - Sensor 1 (wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Current | (ratio)
3B | Bank 2 - Sensor 4/Bank 4 - Sensor 2 (wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Current | (ratio)
3C | Catalyst Temperature Bank 1 /  Sensor 1 | Celsius
3D | Catalyst Temperature Bank 2 /  Sensor 1 | Celsius
3E | Catalyst Temperature Bank 1 /  Sensor 2 | Celsius
3F | Catalyst Temperature Bank 2 /  Sensor 2 | Celsius
40 | PIDs supported 41-60 | Bit Encoded
41 | Monitor status this driving cycle | Bit Encoded
42 | Control module voltage | V
43 | Absolute Load Value | %
44 | Fuel/air Commanded Equivalence Ratio | (ratio)
45 | Relative Throttle Position | %
46 | Ambient air temperature | Celsius
47 | Absolute Throttle Position B | %
48 | Absolute Throttle Position C | %
49 | Accelerator Pedal Position D | %
4A | Accelerator Pedal Position E | %
4B | Accelerator Pedal Position F | %
4C | Commanded Throttle Actuator Control | %
4D | Time run by the engine while MIL activated | minutes
4E | Time since diagnostic trouble codes cleared | minutes
4F | External Test Equipment Configuration #1 | Bit Encoded
50 | External Test Equipment Configuration #2 | Bit Encoded
51 | Fuel Type | Bit Encoded
52 | Ethanol fuel % | %
53 | Absolute Evap system Vapor Pressure | kPa
54 | Evap system vapor pressure | Pa
55 | Short term secondary oxygen sensor trim bank 1 and bank 3 | %
56 | Long term secondary oxygen sensor trim bank 1 and bank 3 | %
57 | Short term secondary oxygen sensor trim bank 2 and bank 4 | %
58 | Long term secondary oxygen sensor trim bank 2 and bank 4 | %
59 | Fuel rail pressure (absolute) | kPa
5A | Relative accelerator pedal position | %
5B | Hybrid battery pack remaining life | %
5C | Engine oil temperature | °C
5D | Fuel injection timing | °
5E | Engine fuel rate | L/h
5F | Emission requirements to which vehicle is designed | Bit Encoded
62 | Actual engine - percent torque | %
67 | Engine coolant temperature | Celsius
6B | Exhaust gas recirculation temperature | Celsius
6D | Fuel pressure control system | Celsius
6E | Injection pressure control system | Celsius
73 | Exhaust pressure | Celsius
78 | Exhaust Gas temperature Bank 1 | Celsius

<!-- end-table-here -->

## LICENSE
This module is available under a [Apache 2.0 license](http://www.apache.org/licenses/LICENSE-2.0.html), see also the [LICENSE file](https://raw.github.com/nishkalkashyap/obd-utils/master/LICENSE) for details.