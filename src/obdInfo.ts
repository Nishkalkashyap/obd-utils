/* eslint-disable no-bitwise */

import { IObdPID, Modes, FuelType } from './obdTypes';

/* eslint-disable @typescript-eslint/no-unused-vars */
function checkHex(n: string) {
  return /^[0-9A-Fa-f]{1,64}$/.test(n);
}

function Hex2Bin(n: string) {
  if (!checkHex(n)) {
    return '';
  }
  return zeroFill(parseInt(n, 16).toString(2), 4);
}

function zeroFill(number: string, width: number) {
  width -= number.toString().length;
  if (width > 0) {
    return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
  }

  return number + ''; // always return a string
}

function bitDecoder(byte: string): number {
  return parseInt(byte, 2);
}

function convertPIDSupported(
  byteA: string,
  byteB: string,
  byteC: string,
  byteD: string
) {
  const hexstring = byteA + byteB + byteC + byteD;
  const pidHex = hexstring.split('');
  console.log(pidHex);
  const pidStatus: boolean[] = [];
  pidHex.forEach(function (hex) {
    const hexPerm = Hex2Bin(hex).split('');
    hexPerm.forEach(function (perm: string) {
      pidStatus.push(perm === '1' ? true : false);
    });
  });
  
  return pidStatus;
}

function convertFuelSystem(byteA: string, byteB: string) {
  const reply: any = {};
  reply.system1 = bitDecoder(byteA);
  if (byteB) {
    reply.system2 = bitDecoder(byteB);
  }

  return reply;
}

function convertDTCCheck(
  byteA: string,
  byteB: string,
  byteC: string,
  byteD: string
) {
  //ByteB, ByteC and ByteD are not read. These bytes are for testing purposes, which is not supported in this module.
  const byteValue: number = parseInt(byteA, 16);
  const numberOfDTCs: number = byteValue % 128;
  const reply: any = {};
  let mil: number;
  if (byteValue >> 7 === 1) {
    mil = 1;
  } else {
    mil = 0;
  }
  reply.numberOfErrors = numberOfDTCs;
  reply.mil = mil;
  return reply;
}

function hexDecoder(byte: string): number {
  return parseInt(byte, 16);
}

function convertCommandedDiesel(byte: string): number {
  return parseInt(byte, 16) / 2;
}

function convertTransmissionActualGear(byteA: string, byteB: string): number {
  return (256 * parseInt(byteA, 16) + parseInt(byteB, 16)) / 1000;
}

function fuelTypeDecoder(byte: string): string {
  const fuelInt = parseInt(byte, 16);
  switch (fuelInt) {
    case 0:
      return FuelType.NOTAVAILABLE;
    case 1:
      return FuelType.GASOLINE;
    case 2:
      return FuelType.METHANOL;
    case 3:
      return FuelType.ETHANOL;
    case 4:
      return FuelType.DIESEL;
    case 5:
      return FuelType.LPG;
    case 6:
      return FuelType.CNG;
    case 7:
      return FuelType.PROPANE;
    case 8:
      return FuelType.ELECTRIC;
    case 9:
      return FuelType.BIFUELGASOLINE;
    case 10:
      return FuelType.BIFUELMETHANOL;
    case 11:
      return FuelType.BIFUELETHANOL;
    case 12:
      return FuelType.BIFUELLPG;
    case 13:
      return FuelType.BIFUELCNG;
    case 14:
      return FuelType.BIFUELPROPANE;
    case 15:
      return FuelType.BIFUELELECTRICITY;
    case 16:
      return FuelType.BIFUELCOMBUSTIONENGINE;
    case 17:
      return FuelType.HYBRIDGASOLINE;
    case 18:
      return FuelType.HYBRIDETHANOL;
    case 19:
      return FuelType.HYBRIDDIESEL;
    case 20:
      return FuelType.HYBRIDELECTRIC;
    case 21:
      return FuelType.HYBRIDCOMBUSTIONENGINE;
    case 22:
      return FuelType.HYBRIDREGENERATIVE;
    case 23:
      return FuelType.BIFUELDIESEL;
    default:
      return 'null';
  }
}

function convertEngineReferenceTorque(byteA: string, byteB: string): number {
  return 256 * parseInt(byteA, 16) + parseInt(byteB, 16);
}

function convertDieselFilter(byteA: string, byteB: string): number {
  return (256 * parseInt(byteA, 16) + parseInt(byteB, 16)) / 10 - 40;
}

function convertMassAirFlow(byteA: string, byteB: string): number {
  return (256 * parseInt(byteA, 16) + parseInt(byteB, 16)) / 32;
}

function convertEngineCoolant(byte: string): number {
  return parseInt(byte, 16) - 40;
}

function convertOdometer(
  byteA: string,
  byteB: string,
  byteC: string,
  byteD: string
): number {
  return (
    (parseInt(byteA, 16) * Math.pow(2, 24) +
      parseInt(byteB, 16) * Math.pow(2, 16) +
      parseInt(byteC, 16) * Math.pow(2, 8) +
      parseInt(byteD, 16)) /
    10
  );
}

function convertDTCRequest(
  byteA: string,
  byteB: string,
  byteC: string,
  byteD: string,
  byteE: string,
  byteF: string
) {
  const reply: any = {};
  reply.errors = [];

  const decodeDTCCode = function (byte1: string, byte2: string) {
    let codeString = '',
      firstChar = '';

    //If 00 00 --> No code.
    if (byte1 === '00' && byte2 === '00') {
      return '-';
    }

    const firstByte = parseInt(byte1, 16);
    const firstCharBytes = firstByte >> 6;
    switch (firstCharBytes) {
      case 0:
        firstChar = 'P';
        break;
      case 1:
        firstChar = 'C';
        break;
      case 2:
        firstChar = 'B';
        break;
      case 3:
        firstChar = 'U';
        break;
      default:
        console.log('Error with DTC');
        break;
    }
    const secondChar = (firstByte >> 4) % 4;
    const thirdChar = firstByte % 16;
    codeString = firstChar + secondChar + thirdChar + byte2;

    return codeString;
  };

  reply.errors[0] = decodeDTCCode(byteA, byteB);
  reply.errors[1] = decodeDTCCode(byteC, byteD);
  reply.errors[2] = decodeDTCCode(byteE, byteF);

  return reply;
}

function convertLoad(byte: string) {
  return parseInt(byte, 16) * (100 / 256);
}

function convertTemp(byte: string) {
  return parseInt(byte, 16) - 40;
}

function convertFuelTrim(byte: string) {
  return (parseInt(byte, 16) - 128) * (100 / 128);
}

function convertFuelRailPressure(byte: string) {
  return parseInt(byte, 16) * 3;
}

function convertIntakePressure(byte: string) {
  return parseInt(byte, 16);
}

function convertRPM(byteA: string, byteB: string) {
  return (parseInt(byteA, 16) * 256 + parseInt(byteB, 16)) / 4;
}

function convertSpeed(byte: string) {
  return parseInt(byte, 16);
}

function convertSparkAdvance(byte: string) {
  return parseInt(byte, 16) / 2 - 64;
}

function convertAirFlowRate(byteA: string, byteB: string) {
  return (parseInt(byteA, 16) * 256.0 + parseInt(byteB, 16)) / 100;
}

function convertThrottlePos(byte: string) {
  return (parseInt(byte, 16) * 100) / 255;
}

function convertOxygenSensorOutput(byte: string) {
  return parseInt(byte, 16) * 0.005;
}

function convertRuntime(byteA: string, byteB: string) {
  return parseInt(byteA, 16) * 256.0 + parseInt(byteB, 16);
}

function convertfrpm(byteA: string, byteB: string) {
  return (parseInt(byteA, 16) * 256 + parseInt(byteB, 16)) * 0.079;
}

function convertfrpd(byteA: string, byteB: string) {
  return (parseInt(byteA, 16) * 256 + parseInt(byteB, 16)) * 10;
}

function convertLambda(
  byteA: string,
  byteB: string,
  byteC: string,
  byteD: string
) {
  const reply: any = {};
  reply.ratio = ((parseInt(byteA, 16) * 256 + parseInt(byteB, 16)) * 2) / 65535;
  reply.voltage =
    ((parseInt(byteC, 16) * 256 + parseInt(byteD, 16)) * 8) / 65535;

  return reply;
}

function convertPercentA(byte: string) {
  return (parseInt(byte, 16) * 100) / 255;
}

function convertPercentB(byte: string) {
  return ((parseInt(byte, 16) - 128) * 100) / 128;
}

function convertDistanceSinceCodesCleared(byteA: string, byteB: string) {
  return parseInt(byteA, 16) * 256 + parseInt(byteB, 16);
}

function convertLambda2(
  byteA: string,
  byteB: string,
  byteC: string,
  byteD: string
) {
  const reply: any = {};
  reply.ratio = (parseInt(byteA, 16) * 256 + parseInt(byteB, 16)) / 32768;
  reply.voltage = (parseInt(byteC, 16) * 256 + parseInt(byteD, 16)) / 256 - 128;

  return reply;
}

function convertCatalystTemperature(byteA: string, byteB: string) {
  return (parseInt(byteA, 16) * 256 + parseInt(byteB, 16)) / 10 - 40;
}

function convertControlModuleVoltage(byteA: string, byteB: string) {
  return (parseInt(byteA, 16) * 256 + parseInt(byteB, 16)) / 1000;
}

function convertAbsoluteLoad(byteA: string, byteB: string) {
  return ((parseInt(byteA, 16) * 256 + parseInt(byteB, 16)) * 100) / 255;
}

function convertLambda3(byteA: string, byteB: string) {
  return (parseInt(byteA, 16) * 256 + parseInt(byteB, 16)) / 32768;
}

function convertAmbientAirTemp(byte: string) {
  return parseInt(byte, 16) - 40;
}

function convertMinutes(byteA: string, byteB: string) {
  return parseInt(byteA, 16) * 256 + parseInt(byteB, 16);
}

function convertExternalTestEquipment(
  byteA: string,
  byteB: string,
  byteC: string,
  byteD: string
) {
  const reply: any = {};
  reply.te1 = bitDecoder(byteA);
  reply.te2 = bitDecoder(byteB);
  reply.te3 = bitDecoder(byteC);
  reply.te4 = bitDecoder(byteD) * 10;

  return reply;
}

function convertExternalTestEquipment2(
  byteA: string,
  byteB: string,
  byteC: string,
  byteD: string
) {
  const reply: any = {};
  reply.te1 = bitDecoder(byteA) * 10;
  reply.te2 = bitDecoder(byteB);
  reply.te3 = bitDecoder(byteC);
  reply.te4 = bitDecoder(byteD);

  return reply;
}

function convertAbsoluteVaporPressure(byteA: string, byteB: string) {
  return (parseInt(byteA, 16) * 256 + parseInt(byteB, 16)) / 200;
}

function convertSystemVaporPressure(byteA: string, byteB: string) {
  return parseInt(byteA, 16) * 256 + parseInt(byteB, 16) - 32767;
}

function convertShortOxygenSensorOutput(byteA: string, byteB: string) {
  const reply: any = {};
  reply.bank1 = ((parseInt(byteA, 16) - 128) * 100) / 128;
  reply.bank2 = ((parseInt(byteB, 16) - 128) * 100) / 128;

  return reply;
}

function convertFuelRailPressureAbs(byteA: string, byteB: string) {
  return (parseInt(byteA, 16) * 256 + parseInt(byteB, 16)) * 10;
}

function convertFuelInjectionTiming(byteA: string, byteB: string) {
  return (parseInt(byteA, 16) * 256 + parseInt(byteB, 16) - 26880) / 128;
}

function convertEngineFuelRate(byteA: string, byteB: string) {
  return (parseInt(byteA, 16) * 256 + parseInt(byteB, 16)) * 0.05;
}

function convertEngineTorque(byte: string) {
  return parseInt(byte, 16) - 125;
}

function convertExhastGasTemperature(byteA: string, byteB: string) {
  return (parseInt(byteA, 16) * 256 + parseInt(byteB, 16)) / 10 - 40;
}
//DTC
function notSupported() {
  console.log('There is no answer. This should not be happening.');
  return;
}
//VIN
function convertVIN_count(byte: string) {
  return byte;
}

function convertVIN(byte: string) {
  const byteArray = byte.toString().split(',');
  let vin = '';
  let tmp = 0;
  if (byteArray[1] !== '02' || byteArray[2] !== '01') {
    return 'Incompatible value';
  }
  for (let i = 3; i < byteArray.length; i++) {
    if (/[a-zA-Z]+/.exec(byteArray[i])) {
      tmp = parseInt(byteArray[i], 16);
    } else {
      tmp = parseInt(byteArray[i]);
      tmp = parseInt(tmp.toString(), 16);
    }
    vin += String.fromCharCode(tmp);
  }
  return vin;
}

const PIDS = {
  ENGINE_COOLANT_TEMPERATURE_SENSOR: '05',
  FUEL_PRESSURE_SENSOR: '0A',
  INTAKE_MANIFOLD_ABSOLUTE_PRESSURE_SENSOR: '0B',
  ENGINE_RPM: '0C',
  VEHICLE_SPEED_SENSOR: '0D',
  SPARK_ADVANCE: '0E',
  INTAKE_AIR_TEMPERATURE_SENSOR: '0F',
  MASS_AIR_FLOW_SENSOR: '10',
  THROTTLE_POSITION_SENSOR: '11',
  ENGINE_RUNTIME: '1F',
};

const modeRealTime: Modes = Modes['01'];
const modeRequestDTC: Modes = Modes['03'];
const modeClearDTC: Modes = Modes['04'];
const modeVehicleInformation: Modes = Modes['09'];

const responsePIDS: IObdPID[] = [
  //Realtime data
  {
    mode: modeRealTime,
    pid: '00',
    bytes: 4,
    name: 'pidsupp0',
    description: 'PIDs supported 00-20',
    min: 0,
    max: 0,
    unit: 'Bit Encoded',
    convertToUseful: convertPIDSupported,
  },
  {
    mode: modeRealTime,
    pid: '01',
    bytes: 4,
    name: 'dtc_cnt',
    description: 'Monitor status since DTCs cleared',
    min: 0,
    max: 0,
    unit: 'Bit Encoded',
    convertToUseful: convertDTCCheck,
  },
  {
    mode: modeRealTime,
    pid: '02',
    bytes: 2,
    name: 'dtcfrzf',
    description: 'DTC that caused required freeze frame data storage',
    min: 0,
    max: 0,
    unit: 'Bit Encoded',
    convertToUseful: bitDecoder,
  },
  {
    mode: modeRealTime,
    pid: '03',
    bytes: 2,
    name: 'fuelsys',
    description: 'Fuel system 1 and 2 status',
    min: 0,
    max: 0,
    unit: 'Bit Encoded',
    convertToUseful: convertFuelSystem,
  },
  {
    mode: modeRealTime,
    pid: '04',
    bytes: 1,
    name: 'load_pct',
    description: 'Calculated LOAD Value',
    min: 0,
    max: 100,
    unit: '%',
    convertToUseful: convertLoad,
  },
  {
    mode: modeRealTime,
    pid: PIDS.ENGINE_COOLANT_TEMPERATURE_SENSOR,
    bytes: 1,
    name: 'temp',
    description: 'Engine Coolant Temperature',
    min: -40,
    max: 215,
    unit: 'Celsius',
    convertToUseful: convertTemp,
  },
  {
    mode: modeRealTime,
    pid: '06',
    bytes: 1,
    name: 'shrtft13',
    description: 'Short Term Fuel Trim - Bank 1,3',
    min: -100,
    max: 99.22,
    unit: '%',
    convertToUseful: convertFuelTrim,
  },
  {
    mode: modeRealTime,
    pid: '07',
    bytes: 1,
    name: 'longft13',
    description: 'Long Term Fuel Trim - Bank 1,3',
    min: -100,
    max: 99.22,
    unit: '%',
    convertToUseful: convertFuelTrim,
  },
  {
    mode: modeRealTime,
    pid: '08',
    bytes: 1,
    name: 'shrtft24',
    description: 'Short Term Fuel Trim - Bank 2,4',
    min: -100,
    max: 99.22,
    unit: '%',
    convertToUseful: convertFuelTrim,
  },
  {
    mode: modeRealTime,
    pid: '09',
    bytes: 1,
    name: 'longft24',
    description: 'Long Term Fuel Trim - Bank 2,4',
    min: -100,
    max: 99.22,
    unit: '%',
    convertToUseful: convertFuelTrim,
  },
  {
    mode: modeRealTime,
    pid: PIDS.FUEL_PRESSURE_SENSOR,
    bytes: 1,
    name: 'frp',
    description: 'Fuel Pressure',
    min: 0,
    max: 765,
    unit: 'kPa',
    convertToUseful: convertFuelRailPressure,
  },
  {
    mode: modeRealTime,
    pid: PIDS.INTAKE_MANIFOLD_ABSOLUTE_PRESSURE_SENSOR,
    bytes: 1,
    name: 'map',
    description: 'Intake Manifold Absolute Pressure',
    min: 0,
    max: 255,
    unit: 'kPa',
    convertToUseful: convertIntakePressure,
  },
  {
    mode: modeRealTime,
    pid: PIDS.ENGINE_RPM,
    bytes: 2,
    name: 'rpm',
    description: 'Engine RPM',
    min: 0,
    max: 16383.75,
    unit: 'rev/min',
    convertToUseful: convertRPM,
  },
  {
    mode: modeRealTime,
    pid: PIDS.VEHICLE_SPEED_SENSOR,
    bytes: 1,
    name: 'speed',
    description: 'Vehicle Speed Sensor',
    min: 0,
    max: 255,
    unit: 'km/h',
    convertToUseful: convertSpeed,
  },
  {
    mode: modeRealTime,
    pid: PIDS.SPARK_ADVANCE,
    bytes: 1,
    name: 'sparkadv',
    description: 'Ignition Timing Advance for #1 Cylinder',
    min: -64,
    max: 63.5,
    unit: 'degrees relative to #1 cylinder',
    convertToUseful: convertSparkAdvance,
  },
  {
    mode: modeRealTime,
    pid: PIDS.INTAKE_AIR_TEMPERATURE_SENSOR,
    bytes: 1,
    name: 'iat',
    description: 'Intake Air Temperature',
    min: -40,
    max: 215,
    unit: 'Celsius',
    convertToUseful: convertTemp,
  },
  {
    mode: modeRealTime,
    pid: PIDS.MASS_AIR_FLOW_SENSOR,
    bytes: 2,
    name: 'maf',
    description: 'Air Flow Rate from Mass Air Flow Sensor',
    min: 0,
    max: 655.35,
    unit: 'g/s',
    convertToUseful: convertAirFlowRate,
  },
  {
    mode: modeRealTime,
    pid: PIDS.THROTTLE_POSITION_SENSOR,
    bytes: 1,
    name: 'throttlepos',
    description: 'Absolute Throttle Position',
    min: 1,
    max: 100,
    unit: '%',
    convertToUseful: convertThrottlePos,
  },
  {
    mode: modeRealTime,
    pid: '12',
    bytes: 1,
    name: 'air_stat',
    description: 'Commanded Secondary Air Status',
    min: 0,
    max: 0,
    unit: 'Bit Encoded',
    convertToUseful: bitDecoder,
  },
  {
    mode: modeRealTime,
    pid: '13',
    bytes: 1,
    name: 'o2sloc',
    description: 'Location of Oxygen Sensors',
    min: 0,
    max: 0,
    unit: 'Bit Encoded',
    convertToUseful: bitDecoder,
  },
  {
    mode: modeRealTime,
    pid: '14',
    bytes: 2,
    name: 'o2s11',
    description:
      'Bank 1 - Sensor 1/Bank 1 - Sensor 1 Oxygen Sensor Output Voltage / Short Term Fuel Trim',
    min: 0,
    max: 1.275,
    unit: 'V',
    convertToUseful: convertOxygenSensorOutput,
  },
  {
    mode: modeRealTime,
    pid: '15',
    bytes: 2,
    name: 'o2s12',
    description:
      'Bank 1 - Sensor 2/Bank 1 - Sensor 2 Oxygen Sensor Output Voltage / Short Term Fuel Trim',
    min: 0,
    max: 1.275,
    unit: 'V',
    convertToUseful: convertOxygenSensorOutput,
  },
  {
    mode: modeRealTime,
    pid: '16',
    bytes: 2,
    name: 'o2s13',
    description:
      'Bank 1 - Sensor 3/Bank 2 - Sensor 1 Oxygen Sensor Output Voltage / Short Term Fuel Trim',
    min: 0,
    max: 1.275,
    unit: 'V',
    convertToUseful: convertOxygenSensorOutput,
  },
  {
    mode: modeRealTime,
    pid: '17',
    bytes: 2,
    name: 'o2s14',
    description:
      'Bank 1 - Sensor 4/Bank 2 - Sensor 2 Oxygen Sensor Output Voltage / Short Term Fuel Trim',
    min: 0,
    max: 1.275,
    unit: 'V',
    convertToUseful: convertOxygenSensorOutput,
  },
  {
    mode: modeRealTime,
    pid: '18',
    bytes: 2,
    name: 'o2s21',
    description:
      'Bank 2 - Sensor 1/Bank 3 - Sensor 1 Oxygen Sensor Output Voltage / Short Term Fuel Trim',
    min: 0,
    max: 1.275,
    unit: 'V',
    convertToUseful: convertOxygenSensorOutput,
  },
  {
    mode: modeRealTime,
    pid: '19',
    bytes: 2,
    name: 'o2s22',
    description:
      'Bank 2 - Sensor 2/Bank 3 - Sensor 2 Oxygen Sensor Output Voltage / Short Term Fuel Trim',
    min: 0,
    max: 1.275,
    unit: 'V',
    convertToUseful: convertOxygenSensorOutput,
  },
  {
    mode: modeRealTime,
    pid: '1A',
    bytes: 2,
    name: 'o2s23',
    description:
      'Bank 2 - Sensor 3/Bank 4 - Sensor 1 Oxygen Sensor Output Voltage / Short Term Fuel Trim',
    min: 0,
    max: 1.275,
    unit: 'V',
    convertToUseful: convertOxygenSensorOutput,
  },
  {
    mode: modeRealTime,
    pid: '1B',
    bytes: 2,
    name: 'o2s24',
    description:
      'Bank 2 - Sensor 4/Bank 4 - Sensor 2 Oxygen Sensor Output Voltage / Short Term Fuel Trim',
    min: 0,
    max: 1.275,
    unit: 'V',
    convertToUseful: convertOxygenSensorOutput,
  },
  {
    mode: modeRealTime,
    pid: '1C',
    bytes: 1,
    name: 'obdsup',
    description: 'OBD requirements to which vehicle is designed',
    min: 0,
    max: 0,
    unit: 'Bit Encoded',
    convertToUseful: bitDecoder,
  },
  {
    mode: modeRealTime,
    pid: '1D',
    bytes: 1,
    name: 'o2sloc2',
    description: 'Location of oxygen sensors',
    min: 0,
    max: 0,
    unit: 'Bit Encoded',
    convertToUseful: bitDecoder,
  },
  {
    mode: modeRealTime,
    pid: '1E',
    bytes: 1,
    name: 'pto_stat',
    description: 'Auxiliary Input Status',
    min: 0,
    max: 0,
    unit: 'Bit Encoded',
    convertToUseful: bitDecoder,
  },
  {
    mode: modeRealTime,
    pid: PIDS.ENGINE_RUNTIME,
    bytes: 2,
    name: 'runtm',
    description: 'Time Since Engine Start',
    min: 0,
    max: 65535,
    unit: 'seconds',
    convertToUseful: convertRuntime,
  },
  {
    mode: modeRealTime,
    pid: '20',
    bytes: 4,
    name: 'piddsupp2',
    description: 'PIDs supported 21-40',
    min: 0,
    max: 0,
    unit: 'Bit Encoded',
    convertToUseful: convertPIDSupported,
  },
  {
    mode: modeRealTime,
    pid: '21',
    bytes: 2,
    name: 'mil_dist',
    description: 'Distance Travelled While MIL is Activated',
    min: 0,
    max: 65535,
    unit: 'km',
    convertToUseful: convertRuntime,
  },
  {
    mode: modeRealTime,
    pid: '22',
    bytes: 2,
    name: 'frpm',
    description: 'Fuel Rail Pressure relative to manifold vacuum',
    min: 0,
    max: 5177.265,
    unit: 'kPa',
    convertToUseful: convertfrpm,
  },
  {
    mode: modeRealTime,
    pid: '23',
    bytes: 2,
    name: 'frpd',
    description: 'Fuel Rail Pressure (diesel)',
    min: 0,
    max: 655350,
    unit: 'kPa',
    convertToUseful: convertfrpd,
  },
  {
    mode: modeRealTime,
    pid: '24',
    bytes: 4,
    name: 'lambda11',
    description:
      'Bank 1 - Sensor 1/Bank 1 - Sensor 1 (wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Voltage',
    min: 0,
    max: 2,
    unit: '(ratio)',
    convertToUseful: convertLambda,
  },
  {
    mode: modeRealTime,
    pid: '25',
    bytes: 4,
    name: 'lambda12',
    description:
      'Bank 1 - Sensor 2/Bank 1 - Sensor 2 (wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Voltage',
    min: 0,
    max: 2,
    unit: '(ratio)',
    convertToUseful: convertLambda,
  },
  {
    mode: modeRealTime,
    pid: '26',
    bytes: 4,
    name: 'lambda13',
    description:
      'Bank 1 - Sensor 3 /Bank 2 - Sensor 1(wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Voltage',
    min: 0,
    max: 2,
    unit: '(ratio)',
    convertToUseful: convertLambda,
  },
  {
    mode: modeRealTime,
    pid: '27',
    bytes: 4,
    name: 'lambda14',
    description:
      'Bank 1 - Sensor 4 /Bank 2 - Sensor 2(wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Voltage',
    min: 0,
    max: 2,
    unit: '(ratio)',
    convertToUseful: convertLambda,
  },
  {
    mode: modeRealTime,
    pid: '28',
    bytes: 4,
    name: 'lambda21',
    description:
      'Bank 2 - Sensor 1 /Bank 3 - Sensor 1(wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Voltage',
    min: 0,
    max: 2,
    unit: '(ratio)',
    convertToUseful: convertLambda,
  },
  {
    mode: modeRealTime,
    pid: '29',
    bytes: 4,
    name: 'lambda22',
    description:
      'Bank 2 - Sensor 2 /Bank 3 - Sensor 2(wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Voltage',
    min: 0,
    max: 2,
    unit: '(ratio)',
    convertToUseful: convertLambda,
  },
  {
    mode: modeRealTime,
    pid: '2A',
    bytes: 4,
    name: 'lambda23',
    description:
      'Bank 2 - Sensor 3 /Bank 4 - Sensor 1(wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Voltage',
    min: 0,
    max: 2,
    unit: '(ratio)',
    convertToUseful: convertLambda,
  },
  {
    mode: modeRealTime,
    pid: '2B',
    bytes: 4,
    name: 'lambda24',
    description:
      'Bank 2 - Sensor 4 /Bank 4 - Sensor 2(wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Voltage',
    min: 0,
    max: 2,
    unit: '(ratio)',
    convertToUseful: convertLambda,
  },
  {
    mode: modeRealTime,
    pid: '2C',
    bytes: 1,
    name: 'egr_pct',
    description: 'Commanded EGR',
    min: 0,
    max: 100,
    unit: '%',
    convertToUseful: convertPercentA,
  },
  {
    mode: modeRealTime,
    pid: '2D',
    bytes: 1,
    name: 'egr_err',
    description: 'EGR Error',
    min: -100,
    max: 99.22,
    unit: '%',
    convertToUseful: convertPercentB,
  },
  {
    mode: modeRealTime,
    pid: '2E',
    bytes: 1,
    name: 'evap_pct',
    description: 'Commanded Evaporative Purge',
    min: 0,
    max: 100,
    unit: '%',
    convertToUseful: convertPercentA,
  },
  {
    mode: modeRealTime,
    pid: '2F',
    bytes: 1,
    name: 'fuelLevelInput',
    description: 'Fuel Level Input',
    min: 0,
    max: 100,
    unit: '%',
    convertToUseful: convertPercentA,
  },
  {
    mode: modeRealTime,
    pid: '30',
    bytes: 1,
    name: 'warm_ups',
    description: 'Number of warm-ups since diagnostic trouble codes cleared',
    min: 0,
    max: 255,
    unit: '',
    convertToUseful: bitDecoder,
  },
  {
    mode: modeRealTime,
    pid: '31',
    bytes: 2,
    name: 'odometer',
    description: 'Distance since diagnostic trouble codes cleared',
    min: 0,
    max: 65535,
    unit: 'km',
    convertToUseful: convertDistanceSinceCodesCleared,
  },
  // <-- pending
  {
    mode: modeRealTime,
    pid: '32',
    bytes: 2,
    name: 'evap_vp',
    description: 'Evap System Vapour Pressure',
    min: -8192,
    max: 8192,
    unit: 'Pa',
  },
  // pending -->
  {
    mode: modeRealTime,
    pid: '33',
    bytes: 1,
    name: 'pressure',
    description: 'Barometric Pressure',
    min: 0,
    max: 255,
    unit: 'kPa',
    convertToUseful: hexDecoder,
  },
  {
    mode: modeRealTime,
    pid: '34',
    bytes: 4,
    name: 'lambdac11',
    description:
      'Bank 1 - Sensor 1/Bank 1 - Sensor 1 (wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Current',
    min: 0,
    max: 2,
    unit: '(ratio)',
    convertToUseful: convertLambda2,
  },
  {
    mode: modeRealTime,
    pid: '35',
    bytes: 4,
    name: 'lambdac12',
    description:
      'Bank 1 - Sensor 2/Bank 1 - Sensor 2 (wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Current',
    min: 0,
    max: 2,
    unit: '(ratio)',
    convertToUseful: convertLambda2,
  },
  {
    mode: modeRealTime,
    pid: '36',
    bytes: 4,
    name: 'lambdac13',
    description:
      'Bank 1 - Sensor 3/Bank 2 - Sensor 1 (wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Current',
    min: 0,
    max: 2,
    unit: '(ratio)',
    convertToUseful: convertLambda2,
  },
  {
    mode: modeRealTime,
    pid: '37',
    bytes: 4,
    name: 'lambdac14',
    description:
      'Bank 1 - Sensor 4/Bank 2 - Sensor 2 (wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Current',
    min: 0,
    max: 2,
    unit: '(ratio)',
    convertToUseful: convertLambda2,
  },
  {
    mode: modeRealTime,
    pid: '38',
    bytes: 4,
    name: 'lambdac21',
    description:
      'Bank 2 - Sensor 1/Bank 3 - Sensor 1 (wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Current',
    min: 0,
    max: 2,
    unit: '(ratio)',
    convertToUseful: convertLambda2,
  },
  {
    mode: modeRealTime,
    pid: '39',
    bytes: 4,
    name: 'lambdac22',
    description:
      'Bank 2 - Sensor 2/Bank 3 - Sensor 2 (wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Current',
    min: 0,
    max: 2,
    unit: '(ratio)',
    convertToUseful: convertLambda2,
  },
  {
    mode: modeRealTime,
    pid: '3A',
    bytes: 4,
    name: 'lambdac23',
    description:
      'Bank 2 - Sensor 3/Bank 4 - Sensor 1 (wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Current',
    min: 0,
    max: 2,
    unit: '(ratio)',
    convertToUseful: convertLambda2,
  },
  {
    mode: modeRealTime,
    pid: '3B',
    bytes: 4,
    name: 'lambdac24',
    description:
      'Bank 2 - Sensor 4/Bank 4 - Sensor 2 (wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Current',
    min: 0,
    max: 2,
    unit: '(ratio)',
    convertToUseful: convertLambda2,
  },
  {
    mode: modeRealTime,
    pid: '3C',
    bytes: 2,
    name: 'catemp11',
    description: 'Catalyst Temperature Bank 1 /  Sensor 1',
    min: -40,
    max: 6513.5,
    unit: 'Celsius',
    convertToUseful: convertCatalystTemperature,
  },
  {
    mode: modeRealTime,
    pid: '3D',
    bytes: 2,
    name: 'catemp21',
    description: 'Catalyst Temperature Bank 2 /  Sensor 1',
    min: -40,
    max: 6513.5,
    unit: 'Celsius',
    convertToUseful: convertCatalystTemperature,
  },
  {
    mode: modeRealTime,
    pid: '3E',
    bytes: 2,
    name: 'catemp12',
    description: 'Catalyst Temperature Bank 1 /  Sensor 2',
    min: -40,
    max: 6513.5,
    unit: 'Celsius',
    convertToUseful: convertCatalystTemperature,
  },
  {
    mode: modeRealTime,
    pid: '3F',
    bytes: 2,
    name: 'catemp22',
    description: 'Catalyst Temperature Bank 2 /  Sensor 2',
    min: -40,
    max: 6513.5,
    unit: 'Celsius',
    convertToUseful: convertCatalystTemperature,
  },
  {
    mode: modeRealTime,
    pid: '40',
    bytes: 4,
    name: 'piddsupp4',
    description: 'PIDs supported 41-60',
    min: 0,
    max: 0,
    unit: 'Bit Encoded',
    convertToUseful: convertPIDSupported,
  },
  // <-- pending
  {
    mode: modeRealTime,
    pid: '41',
    bytes: 4,
    name: 'monitorstat',
    description: 'Monitor status this driving cycle',
    min: 0,
    max: 0,
    unit: 'Bit Encoded',
    convertToUseful: bitDecoder,
  },
  // pending -->
  {
    mode: modeRealTime,
    pid: '42',
    bytes: 2,
    name: 'moduleVoltage',
    description: 'Control module voltage',
    min: 0,
    max: 65535,
    unit: 'V',
    convertToUseful: convertControlModuleVoltage,
  },
  {
    mode: modeRealTime,
    pid: '43',
    bytes: 2,
    name: 'load_abs',
    description: 'Absolute Load Value',
    min: 0,
    max: 25700,
    unit: '%',
    convertToUseful: convertAbsoluteLoad,
  },
  {
    mode: modeRealTime,
    pid: '44',
    bytes: 2,
    name: 'lambda',
    description: 'Fuel/air Commanded Equivalence Ratio',
    min: 0,
    max: 2,
    unit: '(ratio)',
    convertToUseful: convertLambda3,
  },
  {
    mode: modeRealTime,
    pid: '45',
    bytes: 1,
    name: 'tp_r',
    description: 'Relative Throttle Position',
    min: 0,
    max: 100,
    unit: '%',
    convertToUseful: convertPercentA,
  },
  {
    mode: modeRealTime,
    pid: '46',
    bytes: 1,
    name: 'temperature',
    description: 'Ambient air temperature',
    min: -40,
    max: 215,
    unit: 'Celsius',
    convertToUseful: convertAmbientAirTemp,
  },
  {
    mode: modeRealTime,
    pid: '47',
    bytes: 1,
    name: 'tp_b',
    description: 'Absolute Throttle Position B',
    min: 0,
    max: 100,
    unit: '%',
    convertToUseful: convertPercentA,
  },
  {
    mode: modeRealTime,
    pid: '48',
    bytes: 1,
    name: 'tp_c',
    description: 'Absolute Throttle Position C',
    min: 0,
    max: 100,
    unit: '%',
    convertToUseful: convertPercentA,
  },
  {
    mode: modeRealTime,
    pid: '49',
    bytes: 1,
    name: 'accelerator',
    description: 'Accelerator Pedal Position D',
    min: 0,
    max: 100,
    unit: '%',
    convertToUseful: convertPercentA,
  },
  {
    mode: modeRealTime,
    pid: '4A',
    bytes: 1,
    name: 'app_e',
    description: 'Accelerator Pedal Position E',
    min: 0,
    max: 100,
    unit: '%',
    convertToUseful: convertPercentA,
  },
  {
    mode: modeRealTime,
    pid: '4B',
    bytes: 1,
    name: 'app_f',
    description: 'Accelerator Pedal Position F',
    min: 0,
    max: 100,
    unit: '%',
    convertToUseful: convertPercentA,
  },
  {
    mode: modeRealTime,
    pid: '4C',
    bytes: 1,
    name: 'tac_pct',
    description: 'Commanded Throttle Actuator Control',
    min: 0,
    max: 100,
    unit: '%',
    convertToUseful: convertPercentA,
  },
  {
    mode: modeRealTime,
    pid: '4D',
    bytes: 2,
    name: 'mil_time',
    description: 'Time run by the engine while MIL activated',
    min: 0,
    max: 65535,
    unit: 'minutes',
    convertToUseful: convertMinutes,
  },
  {
    mode: modeRealTime,
    pid: '4E',
    bytes: 2,
    name: 'clr_time',
    description: 'Time since diagnostic trouble codes cleared',
    min: 0,
    max: 65535,
    unit: 'minutes',
    convertToUseful: convertMinutes,
  },
  {
    mode: modeRealTime,
    pid: '4F',
    bytes: 4,
    name: 'exttest1',
    description: 'External Test Equipment Configuration #1',
    min: 0,
    max: 0,
    unit: 'Bit Encoded',
    convertToUseful: convertExternalTestEquipment,
  },
  {
    mode: modeRealTime,
    pid: '50',
    bytes: 4,
    name: 'exttest2',
    description: 'External Test Equipment Configuration #2',
    min: 0,
    max: 0,
    unit: 'Bit Encoded',
    convertToUseful: convertExternalTestEquipment2,
  },
  {
    mode: modeRealTime,
    pid: '51',
    bytes: 1,
    name: 'fuel_type',
    description: 'Fuel Type',
    min: 0,
    max: 0,
    unit: 'Bit Encoded',
    convertToUseful: fuelTypeDecoder,
  },
  {
    mode: modeRealTime,
    pid: '52',
    bytes: 1,
    name: 'alch_pct',
    description: 'Ethanol fuel %',
    min: 0,
    max: 100,
    unit: '%',
    convertToUseful: convertPercentA,
  },
  {
    mode: modeRealTime,
    pid: '53',
    bytes: 2,
    name: 'abs_vp',
    description: 'Absolute Evap system Vapor Pressure',
    min: 0,
    max: 327675,
    unit: 'kPa',
    convertToUseful: convertAbsoluteVaporPressure,
  },
  {
    mode: modeRealTime,
    pid: '54',
    bytes: 2,
    name: 'system_vp',
    description: 'Evap system vapor pressure',
    min: -32767,
    max: 32767,
    unit: 'Pa',
    convertToUseful: convertSystemVaporPressure,
  },
  {
    mode: modeRealTime,
    pid: '55',
    bytes: 2,
    name: 's02b13',
    description: 'Short term secondary oxygen sensor trim bank 1 and bank 3',
    min: -100,
    max: 99.22,
    unit: '%',
    convertToUseful: convertShortOxygenSensorOutput,
  },
  {
    mode: modeRealTime,
    pid: '56',
    bytes: 2,
    name: 'l02b13',
    description: 'Long term secondary oxygen sensor trim bank 1 and bank 3',
    min: -100,
    max: 99.22,
    unit: '%',
    convertToUseful: convertShortOxygenSensorOutput,
  },
  {
    mode: modeRealTime,
    pid: '57',
    bytes: 2,
    name: 's02b24',
    description: 'Short term secondary oxygen sensor trim bank 2 and bank 4',
    min: -100,
    max: 99.22,
    unit: '%',
    convertToUseful: convertShortOxygenSensorOutput,
  },
  {
    mode: modeRealTime,
    pid: '58',
    bytes: 2,
    name: 'l02b24',
    description: 'Long term secondary oxygen sensor trim bank 2 and bank 4',
    min: -100,
    max: 99.22,
    unit: '%',
    convertToUseful: convertShortOxygenSensorOutput,
  },
  {
    mode: modeRealTime,
    pid: '59',
    bytes: 2,
    name: 'frp_abs',
    description: 'Fuel rail pressure (absolute)',
    min: 0,
    max: 655350,
    unit: 'kPa',
    convertToUseful: convertFuelRailPressureAbs,
  },
  {
    mode: modeRealTime,
    pid: '5A',
    bytes: 1,
    name: 'pedalpos',
    description: 'Relative accelerator pedal position',
    min: 0,
    max: 100,
    unit: '%',
    convertToUseful: convertPercentA,
  },
  {
    mode: modeRealTime,
    pid: '5B',
    bytes: 1,
    name: 'hybridlife',
    description: 'Hybrid battery pack remaining life',
    min: 0,
    max: 100,
    unit: '%',
    convertToUseful: convertPercentA,
  },
  {
    mode: modeRealTime,
    pid: '5C',
    bytes: 1,
    name: 'engineoilt',
    description: 'Engine oil temperature',
    min: -40,
    max: 210,
    unit: '°C',
    convertToUseful: convertTemp,
  },
  {
    mode: modeRealTime,
    pid: '5D',
    bytes: 2,
    name: 'finjtiming',
    description: 'Fuel injection timing',
    min: -210.0,
    max: 301.992,
    unit: '°',
    convertToUseful: convertFuelInjectionTiming,
  },
  {
    mode: modeRealTime,
    pid: '5E',
    bytes: 2,
    name: 'fuelRate',
    description: 'Engine fuel rate',
    min: 0,
    max: 3212.75,
    unit: 'L/h',
    convertToUseful: convertEngineFuelRate,
  },
  {
    mode: modeRealTime,
    pid: '5F',
    bytes: 1,
    name: 'emmissionreq',
    description: 'Emission requirements to which vehicle is designed',
    min: 0,
    max: 0,
    unit: 'Bit Encoded',
    convertToUseful: bitDecoder,
  },
  {
    mode: modeRealTime,
    pid: '60',
    bytes: 4,
    name: 'piddsupp6',
    description: 'PIDs supported 61-80',
    min: 0,
    max: 0,
    unit: 'Bit Encoded',
    convertToUseful: convertPIDSupported,
  },
  //added some new pid entries
  {
    mode: modeRealTime,
    pid: '61',
    bytes: 1,
    name: 'percentTorque',
    description: 'Demanded engine Percent Torque',
    min: -125,
    max: 130,
    unit: '%',
    convertToUseful: convertEngineTorque,
  },
  {
    mode: modeRealTime,
    pid: '62',
    bytes: 1,
    name: 'aet',
    description: 'Actual engine - percent torque',
    min: -125,
    max: 125,
    unit: '%',
    convertToUseful: convertEngineTorque,
  },
  {
    mode: modeRealTime,
    pid: '63',
    bytes: 2,
    name: 'ert',
    description: 'Engine reference torque',
    min: 0,
    max: 65535,
    unit: 'N*m',
    convertToUseful: convertEngineReferenceTorque,
  },
  {
    mode: modeRealTime,
    pid: '64',
    bytes: 1,
    name: 'ept',
    description: 'Engine pct. torque(idle)',
    min: -125,
    max: 130,
    unit: '%',
    convertToUseful: convertEngineTorque,
  },
  {
    mode: modeRealTime,
    pid: '66',
    bytes: 2,
    name: 'Mass sensor',
    description: 'Mass air flow sensor(A)',
    min: 0,
    max: 2047.96875,
    unit: 'g/s',
    convertToUseful: convertMassAirFlow,
  },
  {
    mode: modeRealTime,
    pid: '67',
    bytes: 1,
    name: 'ect',
    description: 'Engine coolant temperature(sensor 1)',
    min: -40,
    max: 215,
    unit: 'Celsius',
    convertToUseful: convertEngineCoolant,
  },
  {
    mode: modeRealTime,
    pid: '68',
    bytes: 1,
    name: 'iat',
    description: 'Intake air temperature(sensor 1)',
    min: -40,
    max: 215,
    unit: 'Celsius',
    convertToUseful: convertEngineCoolant,
  },
  {
    mode: modeRealTime,
    pid: '6B',
    bytes: 5,
    name: 'egrt',
    description: 'Exhaust gas recirculation temperature',
    min: -40,
    max: 215,
    unit: 'Celsius',
  },
  {
    mode: modeRealTime,
    pid: '6D',
    bytes: 6,
    name: 'fpc',
    description: 'Fuel pressure control system',
    min: -40,
    max: 215,
    unit: 'Celsius',
  },
  {
    mode: modeRealTime,
    pid: '6E',
    bytes: 5,
    name: 'ipct',
    description: 'Injection pressure control system',
    min: -40,
    max: 215,
    unit: 'Celsius',
  },
  {
    mode: modeRealTime,
    pid: '73',
    bytes: 5,
    name: 'ep',
    description: 'Exhaust pressure',
    min: -40,
    max: 215,
    unit: 'Celsius',
  },
  {
    mode: modeRealTime,
    pid: '78',
    bytes: 9,
    name: 'egt',
    description: 'Exhaust Gas temperature Bank 1',
    min: -40,
    max: 215,
    unit: 'Celsius',
    convertToUseful: convertExhastGasTemperature,
  },
  {
    mode: modeRealTime,
    pid: '7C',
    bytes: 2,
    name: 'dpft',
    description: 'Diesel particular filter temperature',
    unit: 'Celsius',
    min: -40,
    max: 6513.5,
    convertToUseful: convertDieselFilter,
  },
  {
    mode: modeRealTime,
    pid: '80',
    bytes: 4,
    name: 'piddsupp8',
    description: 'PIDs supported 81-A0',
    min: 0,
    max: 0,
    unit: 'Bit Encoded',
    convertToUseful: convertPIDSupported,
  },
  {
    mode: modeRealTime,
    pid: '8D',
    bytes: 1,
    name: 'Thr pos G',
    description: 'Throttle position G',
    min: 0,
    max: 100,
    unit: '%',
    convertToUseful: convertThrottlePos,
  },
  {
    mode: modeRealTime,
    pid: '8E',
    bytes: 1,
    name: 'efpt',
    description: 'Engine Friction - Percent Torque',
    min: -125,
    max: 130,
    unit: '%',
    convertToUseful: convertEngineTorque,
  },
  {
    mode: modeRealTime,
    pid: 'A0',
    bytes: 4,
    name: 'piddsuppA',
    description: 'PIDs supported A1-C0',
    min: 0,
    max: 0,
    unit: 'Bit Encoded',
    convertToUseful: convertPIDSupported,
  },
  {
    mode: modeRealTime,
    pid: 'A2',
    bytes: 2,
    name: 'cfr',
    description: 'Cylinder fuel rate',
    min: 0,
    max: 2047.96875,
    unit: 'mg/stroke',
    convertToUseful: convertMassAirFlow,
  },
  {
    mode: modeRealTime,
    pid: 'A4',
    bytes: 2,
    name: 'gear',
    description: 'Transmission actual gear',
    min: 0,
    max: 65.535,
    unit: 'ratio',
    convertToUseful: convertTransmissionActualGear,
  },
  {
    mode: modeRealTime,
    pid: 'A5',
    bytes: 1,
    name: 'cdefd',
    description: 'Commanded Diesel Exhaust Fluid Dosing',
    min: 0,
    max: 127.5,
    unit: '%',
    convertToUseful: convertCommandedDiesel,
  },
  {
    mode: modeRealTime,
    pid: 'A6',
    bytes: 4,
    name: 'odometer',
    description: 'Odometer',
    min: 0,
    max: 429496729.5,
    unit: 'km',
    convertToUseful: convertOdometer,
  },
  {
    mode: modeRealTime,
    pid: 'C0',
    bytes: 4,
    name: 'piddsuppC',
    description: 'PIDs supported C1-E0',
    min: 0,
    max: 0,
    unit: 'Bit Encoded',
    convertToUseful: convertPIDSupported,
  },

  //DTC's
  //   {
  //     mode: modeRequestDTC,
  //     pid: undefined,
  //     bytes: 6,
  //     name: 'requestdtc',
  //     description: 'Requested DTC',
  //     convertToUseful: convertDTCRequest,
  //   }, //n*6 --> For each code, 6 bytes.
  //   {
  //     mode: modeClearDTC,
  //     pid: undefined,
  //     bytes: 0,
  //     name: 'cleardtc',
  //     description: 'Clear Trouble Codes (Clear engine light)',
  //     convertToUseful: notSupported,
  //   },

  //VIN
  //   {
  //     mode: modeVin,
  //     pid: '00',
  //     bytes: 4,
  //     name: 'vinsupp0',
  //     description: 'Vehicle Identification Number',
  //     convertToUseful: bitDecoder,
  //   },
  //   {
  //     mode: modeVin,
  //     pid: '01',
  //     bytes: 1,
  //     name: 'vin_mscout',
  //     description: 'VIN message count',
  //     convertToUseful: convertVIN_count,
  //   },
  //   {
  //     mode: modeVin,
  //     pid: '02',
  //     bytes: 1,
  //     name: 'vin',
  //     description: 'Vehicle Identification Number',
  //     convertToUseful: convertVIN,
  //   },
];
export default responsePIDS;
