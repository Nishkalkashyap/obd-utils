# OBD Utils

The aim of this library is to provide utility methods to make it easier to work with the OBD-II protocol. This library only provides the interface/helper functions to make it easier to work with the protocol, and **does NOT** provides any bindings/transport to communicate with the underlying hardware.

A large part of the implementation is borrowed from EricSmekens's [node-bluetooth-obd](https://github.com/EricSmekens/node-bluetooth-obd) project.

## CLI Usage:

```bash
# e.g. parse an OBD response
$ npx obd-utils parse "41 05 3C"
{
    "mode": "41",
    "pid": "05",
    "name": "temp",
    "unit": "Celsius",
    "value": 20
}

# e.g. get info for PID "05", i.e. engine temperature sensor
$ npx obd-utils info 05
{
    "mode": "01",
    "pid": "05",
    "bytes": 1,
    "name": "temp",
    "description": "Engine Coolant Temperature",
    "min": -40,
    "max": 215,
    "unit": "Celsius"
}
```

## Programmatic Usage:

```ts
import { parseOBDResponse, getPIDInfo, getAllPIDs } from "obd-utils";

// Parse an OBD response
const parsedCommand = parseOBDResponse("41 05 3C");
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
const info = getPIDInfo("0C");
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
Index | PID | Description | Units
------------ |------------ | -------------| --------------
1 | 00 | PIDs supported 00-20 | Bit Encoded
2 | 01 | Monitor status since DTCs cleared | Bit Encoded
3 | 02 | DTC that caused required freeze frame data storage | Bit Encoded
4 | 03 | Fuel system 1 and 2 status | Bit Encoded
5 | 04 | Calculated LOAD Value | %
6 | 05 | Engine Coolant Temperature | Celsius
7 | 06 | Short Term Fuel Trim - Bank 1,3 | %
8 | 07 | Long Term Fuel Trim - Bank 1,3 | %
9 | 08 | Short Term Fuel Trim - Bank 2,4 | %
10 | 09 | Long Term Fuel Trim - Bank 2,4 | %
11 | 0A | Fuel Pressure | kPa
12 | 0B | Intake Manifold Absolute Pressure | kPa
13 | 0C | Engine RPM | rev/min
14 | 0D | Vehicle Speed Sensor | km/h
15 | 0E | Ignition Timing Advance for #1 Cylinder | degrees relative to #1 cylinder
16 | 0F | Intake Air Temperature | Celsius
17 | 10 | Air Flow Rate from Mass Air Flow Sensor | g/s
18 | 11 | Absolute Throttle Position | %
19 | 12 | Commanded Secondary Air Status | Bit Encoded
20 | 13 | Location of Oxygen Sensors | Bit Encoded
21 | 14 | Bank 1 - Sensor 1/Bank 1 - Sensor 1 Oxygen Sensor Output Voltage / Short Term Fuel Trim | V
22 | 15 | Bank 1 - Sensor 2/Bank 1 - Sensor 2 Oxygen Sensor Output Voltage / Short Term Fuel Trim | V
23 | 16 | Bank 1 - Sensor 3/Bank 2 - Sensor 1 Oxygen Sensor Output Voltage / Short Term Fuel Trim | V
24 | 17 | Bank 1 - Sensor 4/Bank 2 - Sensor 2 Oxygen Sensor Output Voltage / Short Term Fuel Trim | V
25 | 18 | Bank 2 - Sensor 1/Bank 3 - Sensor 1 Oxygen Sensor Output Voltage / Short Term Fuel Trim | V
26 | 19 | Bank 2 - Sensor 2/Bank 3 - Sensor 2 Oxygen Sensor Output Voltage / Short Term Fuel Trim | V
27 | 1A | Bank 2 - Sensor 3/Bank 4 - Sensor 1 Oxygen Sensor Output Voltage / Short Term Fuel Trim | V
28 | 1B | Bank 2 - Sensor 4/Bank 4 - Sensor 2 Oxygen Sensor Output Voltage / Short Term Fuel Trim | V
29 | 1C | OBD requirements to which vehicle is designed | Bit Encoded
30 | 1D | Location of oxygen sensors | Bit Encoded
31 | 1E | Auxiliary Input Status | Bit Encoded
32 | 1F | Time Since Engine Start | seconds
33 | 20 | PIDs supported 21-40 | Bit Encoded
34 | 21 | Distance Travelled While MIL is Activated | km
35 | 22 | Fuel Rail Pressure relative to manifold vacuum | kPa
36 | 23 | Fuel Rail Pressure (diesel) | kPa
37 | 24 | Bank 1 - Sensor 1/Bank 1 - Sensor 1 (wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Voltage | (ratio)
38 | 25 | Bank 1 - Sensor 2/Bank 1 - Sensor 2 (wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Voltage | (ratio)
39 | 26 | Bank 1 - Sensor 3 /Bank 2 - Sensor 1(wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Voltage | (ratio)
40 | 27 | Bank 1 - Sensor 4 /Bank 2 - Sensor 2(wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Voltage | (ratio)
41 | 28 | Bank 2 - Sensor 1 /Bank 3 - Sensor 1(wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Voltage | (ratio)
42 | 29 | Bank 2 - Sensor 2 /Bank 3 - Sensor 2(wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Voltage | (ratio)
43 | 2A | Bank 2 - Sensor 3 /Bank 4 - Sensor 1(wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Voltage | (ratio)
44 | 2B | Bank 2 - Sensor 4 /Bank 4 - Sensor 2(wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Voltage | (ratio)
45 | 2C | Commanded EGR | %
46 | 2D | EGR Error | %
47 | 2E | Commanded Evaporative Purge | %
48 | 2F | Fuel Level Input | %
49 | 30 | Number of warm-ups since diagnostic trouble codes cleared | 
50 | 31 | Distance since diagnostic trouble codes cleared | km
51 | 32 | Evap System Vapour Pressure | Pa
52 | 33 | Barometric Pressure | kPa
53 | 34 | Bank 1 - Sensor 1/Bank 1 - Sensor 1 (wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Current | (ratio)
54 | 35 | Bank 1 - Sensor 2/Bank 1 - Sensor 2 (wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Current | (ratio)
55 | 36 | Bank 1 - Sensor 3/Bank 2 - Sensor 1 (wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Current | (ratio)
56 | 37 | Bank 1 - Sensor 4/Bank 2 - Sensor 2 (wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Current | (ratio)
57 | 38 | Bank 2 - Sensor 1/Bank 3 - Sensor 1 (wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Current | (ratio)
58 | 39 | Bank 2 - Sensor 2/Bank 3 - Sensor 2 (wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Current | (ratio)
59 | 3A | Bank 2 - Sensor 3/Bank 4 - Sensor 1 (wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Current | (ratio)
60 | 3B | Bank 2 - Sensor 4/Bank 4 - Sensor 2 (wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Current | (ratio)
61 | 3C | Catalyst Temperature Bank 1 /  Sensor 1 | Celsius
62 | 3D | Catalyst Temperature Bank 2 /  Sensor 1 | Celsius
63 | 3E | Catalyst Temperature Bank 1 /  Sensor 2 | Celsius
64 | 3F | Catalyst Temperature Bank 2 /  Sensor 2 | Celsius
65 | 40 | PIDs supported 41-60 | Bit Encoded
66 | 41 | Monitor status this driving cycle | Bit Encoded
67 | 42 | Control module voltage | V
68 | 43 | Absolute Load Value | %
69 | 44 | Fuel/air Commanded Equivalence Ratio | (ratio)
70 | 45 | Relative Throttle Position | %
71 | 46 | Ambient air temperature | Celsius
72 | 47 | Absolute Throttle Position B | %
73 | 48 | Absolute Throttle Position C | %
74 | 49 | Accelerator Pedal Position D | %
75 | 4A | Accelerator Pedal Position E | %
76 | 4B | Accelerator Pedal Position F | %
77 | 4C | Commanded Throttle Actuator Control | %
78 | 4D | Time run by the engine while MIL activated | minutes
79 | 4E | Time since diagnostic trouble codes cleared | minutes
80 | 4F | External Test Equipment Configuration #1 | Bit Encoded
81 | 50 | External Test Equipment Configuration #2 | Bit Encoded
82 | 51 | Fuel Type | Bit Encoded
83 | 52 | Ethanol fuel % | %
84 | 53 | Absolute Evap system Vapor Pressure | kPa
85 | 54 | Evap system vapor pressure | Pa
86 | 55 | Short term secondary oxygen sensor trim bank 1 and bank 3 | %
87 | 56 | Long term secondary oxygen sensor trim bank 1 and bank 3 | %
88 | 57 | Short term secondary oxygen sensor trim bank 2 and bank 4 | %
89 | 58 | Long term secondary oxygen sensor trim bank 2 and bank 4 | %
90 | 59 | Fuel rail pressure (absolute) | kPa
91 | 5A | Relative accelerator pedal position | %
92 | 5B | Hybrid battery pack remaining life | %
93 | 5C | Engine oil temperature | °C
94 | 5D | Fuel injection timing | °
95 | 5E | Engine fuel rate | L/h
96 | 5F | Emission requirements to which vehicle is designed | Bit Encoded
97 | 62 | Actual engine - percent torque | %
98 | 67 | Engine coolant temperature | Celsius
99 | 6B | Exhaust gas recirculation temperature | Celsius
100 | 6D | Fuel pressure control system | Celsius
101 | 6E | Injection pressure control system | Celsius
102 | 73 | Exhaust pressure | Celsius
103 | 78 | Exhaust Gas temperature Bank 1 | Celsius

<!-- end-table-here -->

## LICENSE

This module is available under a [Apache 2.0 license](http://www.apache.org/licenses/LICENSE-2.0.html), see also the [LICENSE file](https://raw.github.com/nishkalkashyap/obd-utils/master/LICENSE) for details.
