export interface IObdPID {
  mode: Modes;
  pid: string | undefined;
  bytes: 1 | 2 | 3 | 4 | 5 | 6 | 8 | 9;
  name: string;
  description: string;
  min: number;
  max: number;
  unit: string;
  convertToUseful?: (...bytes: any) => string|number;
}
export enum FuelType{
  NOTAVAILABLE= 'Not Available',
  GASOLINE = 'Gasoline',
  METHANOL = 'Methanol',
  ETHANOL = 'Ethanol',
  DIESEL= 'Diesel',
  LPG= 'Lpg',
  CNG= 'Cng',
  PROPANE= 'Propane',
  ELECTRIC= 'Electric',
  BIFUELGASOLINE= 'Bifuel running Gasoline',
  BIFUELMETHANOL ='Bifuel running Methanol',
  BIFUELETHANOL= 'Bifuel running Ethanol',
  BIFUELLPG= 'Bifuel running Lpg',
  BIFUELCNG= 'Bifuel running Cng',
  BIFUELPROPANE= 'Bifuel running Propane',
  BIFUELELECTRICITY='Bifuel running Electricity',
  BIFUELCOMBUSTIONENGINE= 'Bifuel running electric and combustion engine',
  HYBRIDGASOLINE= 'Hybrid Gasoline',
  HYBRIDETHANOL='Hybrid Ethanol',
  HYBRIDDIESEL='Hybrid Diesel',
  HYBRIDELECTRIC='Hybrid Electric',
  HYBRIDCOMBUSTIONENGINE='Hybrid running electric and combustion engine',
  HYBRIDREGENERATIVE='Hybrid regenerative',
  BIFUELDIESEL='Bifuel running diesel',
}
export enum Modes {
  '01' = '01',
  '03' = '03',
  '04' = '04',
  '09' = '09',
}

export interface IParsedOBDResponse
  extends Partial<Pick<IObdPID, 'mode' | 'pid' | 'name' | 'unit'>> {
  value?: string|number;
}

export type IObdPIDDescriptor = Omit<IObdPID, 'convertToUseful'>;
