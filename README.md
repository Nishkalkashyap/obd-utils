# OBD Utils

The aim of this library is to provide utility methods to make it easier to work with the OBD-II protocol.

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
Index | PID | Description | Name | Units
------------ |------------ | -------------|-------------| --------------
1 | 00 | PIDs supported 00-20 | pidsupp0 | Bit Encoded
2 | 01 | Monitor status since DTCs cleared | dtc_cnt | Bit Encoded
3 | 02 | DTC that caused required freeze frame data storage | dtcfrzf | Bit Encoded
4 | 03 | Fuel system 1 and 2 status | fuelsys | Bit Encoded
5 | 04 | Calculated LOAD Value | load_pct | %
6 | 05 | Engine Coolant Temperature | temp | Celsius
7 | 06 | Short Term Fuel Trim - Bank 1,3 | shrtft13 | %
8 | 07 | Long Term Fuel Trim - Bank 1,3 | longft13 | %
9 | 08 | Short Term Fuel Trim - Bank 2,4 | shrtft24 | %
10 | 09 | Long Term Fuel Trim - Bank 2,4 | longft24 | %
11 | 0A | Fuel Pressure | frp | kPa
12 | 0B | Intake Manifold Absolute Pressure | map | kPa
13 | 0C | Engine RPM | rpm | rev/min
14 | 0D | Vehicle Speed Sensor | vss | km/h
15 | 0E | Ignition Timing Advance for #1 Cylinder | sparkadv | degrees relative to #1 cylinder
16 | 0F | Intake Air Temperature | iat | Celsius
17 | 10 | Air Flow Rate from Mass Air Flow Sensor | maf | g/s
18 | 11 | Absolute Throttle Position | throttlepos | %
19 | 12 | Commanded Secondary Air Status | air_stat | Bit Encoded
20 | 13 | Location of Oxygen Sensors | o2sloc | Bit Encoded
21 | 14 | Bank 1 - Sensor 1/Bank 1 - Sensor 1 Oxygen Sensor Output Voltage / Short Term Fuel Trim | o2s11 | V
22 | 15 | Bank 1 - Sensor 2/Bank 1 - Sensor 2 Oxygen Sensor Output Voltage / Short Term Fuel Trim | o2s12 | V
23 | 16 | Bank 1 - Sensor 3/Bank 2 - Sensor 1 Oxygen Sensor Output Voltage / Short Term Fuel Trim | o2s13 | V
24 | 17 | Bank 1 - Sensor 4/Bank 2 - Sensor 2 Oxygen Sensor Output Voltage / Short Term Fuel Trim | o2s14 | V
25 | 18 | Bank 2 - Sensor 1/Bank 3 - Sensor 1 Oxygen Sensor Output Voltage / Short Term Fuel Trim | o2s21 | V
26 | 19 | Bank 2 - Sensor 2/Bank 3 - Sensor 2 Oxygen Sensor Output Voltage / Short Term Fuel Trim | o2s22 | V
27 | 1A | Bank 2 - Sensor 3/Bank 4 - Sensor 1 Oxygen Sensor Output Voltage / Short Term Fuel Trim | o2s23 | V
28 | 1B | Bank 2 - Sensor 4/Bank 4 - Sensor 2 Oxygen Sensor Output Voltage / Short Term Fuel Trim | o2s24 | V
29 | 1C | OBD requirements to which vehicle is designed | obdsup | Bit Encoded
30 | 1D | Location of oxygen sensors | o2sloc2 | Bit Encoded
31 | 1E | Auxiliary Input Status | pto_stat | Bit Encoded
32 | 1F | Time Since Engine Start | runtm | seconds
33 | 20 | PIDs supported 21-40 | piddsupp2 | Bit Encoded
34 | 21 | Distance Travelled While MIL is Activated | mil_dist | km
35 | 22 | Fuel Rail Pressure relative to manifold vacuum | frpm | kPa
36 | 23 | Fuel Rail Pressure (diesel) | frpd | kPa
37 | 24 | Bank 1 - Sensor 1/Bank 1 - Sensor 1 (wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Voltage | lambda11 | (ratio)
38 | 25 | Bank 1 - Sensor 2/Bank 1 - Sensor 2 (wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Voltage | lambda12 | (ratio)
39 | 26 | Bank 1 - Sensor 3 /Bank 2 - Sensor 1(wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Voltage | lambda13 | (ratio)
40 | 27 | Bank 1 - Sensor 4 /Bank 2 - Sensor 2(wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Voltage | lambda14 | (ratio)
41 | 28 | Bank 2 - Sensor 1 /Bank 3 - Sensor 1(wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Voltage | lambda21 | (ratio)
42 | 29 | Bank 2 - Sensor 2 /Bank 3 - Sensor 2(wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Voltage | lambda22 | (ratio)
43 | 2A | Bank 2 - Sensor 3 /Bank 4 - Sensor 1(wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Voltage | lambda23 | (ratio)
44 | 2B | Bank 2 - Sensor 4 /Bank 4 - Sensor 2(wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Voltage | lambda24 | (ratio)
45 | 2C | Commanded EGR | egr_pct | %
46 | 2D | EGR Error | egr_err | %
47 | 2E | Commanded Evaporative Purge | evap_pct | %
48 | 2F | Fuel Level Input | fli | %
49 | 30 | Number of warm-ups since diagnostic trouble codes cleared | warm_ups | 
50 | 31 | Distance since diagnostic trouble codes cleared | clr_dist | km
51 | 32 | Evap System Vapour Pressure | evap_vp | Pa
52 | 33 | Barometric Pressure | baro | kPa
53 | 34 | Bank 1 - Sensor 1/Bank 1 - Sensor 1 (wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Current | lambdac11 | (ratio)
54 | 35 | Bank 1 - Sensor 2/Bank 1 - Sensor 2 (wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Current | lambdac12 | (ratio)
55 | 36 | Bank 1 - Sensor 3/Bank 2 - Sensor 1 (wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Current | lambdac13 | (ratio)
56 | 37 | Bank 1 - Sensor 4/Bank 2 - Sensor 2 (wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Current | lambdac14 | (ratio)
57 | 38 | Bank 2 - Sensor 1/Bank 3 - Sensor 1 (wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Current | lambdac21 | (ratio)
58 | 39 | Bank 2 - Sensor 2/Bank 3 - Sensor 2 (wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Current | lambdac22 | (ratio)
59 | 3A | Bank 2 - Sensor 3/Bank 4 - Sensor 1 (wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Current | lambdac23 | (ratio)
60 | 3B | Bank 2 - Sensor 4/Bank 4 - Sensor 2 (wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Current | lambdac24 | (ratio)
61 | 3C | Catalyst Temperature Bank 1 /  Sensor 1 | catemp11 | Celsius
62 | 3D | Catalyst Temperature Bank 2 /  Sensor 1 | catemp21 | Celsius
63 | 3E | Catalyst Temperature Bank 1 /  Sensor 2 | catemp12 | Celsius
64 | 3F | Catalyst Temperature Bank 2 /  Sensor 2 | catemp22 | Celsius
65 | 40 | PIDs supported 41-60 | piddsupp4 | Bit Encoded
66 | 41 | Monitor status this driving cycle | monitorstat | Bit Encoded
67 | 42 | Control module voltage | vpwr | V
68 | 43 | Absolute Load Value | load_abs | %
69 | 44 | Fuel/air Commanded Equivalence Ratio | lambda | (ratio)
70 | 45 | Relative Throttle Position | tp_r | %
71 | 46 | Ambient air temperature | aat | Celsius
72 | 47 | Absolute Throttle Position B | tp_b | %
73 | 48 | Absolute Throttle Position C | tp_c | %
74 | 49 | Accelerator Pedal Position D | app_d | %
75 | 4A | Accelerator Pedal Position E | app_e | %
76 | 4B | Accelerator Pedal Position F | app_f | %
77 | 4C | Commanded Throttle Actuator Control | tac_pct | %
78 | 4D | Time run by the engine while MIL activated | mil_time | minutes
79 | 4E | Time since diagnostic trouble codes cleared | clr_time | minutes
80 | 4F | External Test Equipment Configuration #1 | exttest1 | Bit Encoded
81 | 50 | External Test Equipment Configuration #2 | exttest2 | Bit Encoded
82 | 51 | Fuel Type | fuel_type | Bit Encoded
83 | 52 | Ethanol fuel % | alch_pct | %
84 | 53 | Absolute Evap system Vapor Pressure | abs_vp | kPa
85 | 54 | Evap system vapor pressure | system_vp | Pa
86 | 55 | Short term secondary oxygen sensor trim bank 1 and bank 3 | s02b13 | %
87 | 56 | Long term secondary oxygen sensor trim bank 1 and bank 3 | l02b13 | %
88 | 57 | Short term secondary oxygen sensor trim bank 2 and bank 4 | s02b24 | %
89 | 58 | Long term secondary oxygen sensor trim bank 2 and bank 4 | l02b24 | %
90 | 59 | Fuel rail pressure (absolute) | frp_abs | kPa
91 | 5A | Relative accelerator pedal position | pedalpos | %
92 | 5B | Hybrid battery pack remaining life | hybridlife | %
93 | 5C | Engine oil temperature | engineoilt | °C
94 | 5D | Fuel injection timing | finjtiming | °
95 | 5E | Engine fuel rate | enginefrate | L/h
96 | 5F | Emission requirements to which vehicle is designed | emmissionreq | Bit Encoded
97 | 62 | Actual engine - percent torque | aet | %
98 | 67 | Engine coolant temperature | ect | Celsius
99 | 6B | Exhaust gas recirculation temperature | egrt | Celsius
100 | 6D | Fuel pressure control system | fpc | Celsius
101 | 6E | Injection pressure control system | ipct | Celsius
102 | 73 | Exhaust pressure | ep | Celsius
103 | 78 | Exhaust Gas temperature Bank 1 | egt | Celsius

<!-- end-table-here -->

## LICENSE

This module is available under a [Apache 2.0 license](http://www.apache.org/licenses/LICENSE-2.0.html), see also the [LICENSE file](https://raw.github.com/nishkalkashyap/obd-utils/master/LICENSE) for details.
