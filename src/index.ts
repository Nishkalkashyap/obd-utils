import responsePIDS from './obdInfo';
import {
  IObdPID,
  IObdPIDDescriptor,
  IParsedOBDResponse,
  Modes,
} from './obdTypes';

export function parseOBDResponse(hexString: string): IParsedOBDResponse[] {
  const reply: IParsedOBDResponse = {};
  const response: IParsedOBDResponse[]=[];
  let byteNumber = 0;
  let response_ready=false;
  let valueArray: any[] = []; //New object
  let pidBytesArray= [0];
  let pidRequested=0;
  if (
    hexString === 'NO DATA' ||
    hexString === 'OK' ||
    hexString === '?' ||
    hexString === 'UNABLE TO CONNECT' ||
    hexString === 'SEARCHING...'
  ) {
    //No data or OK is the response, return directly.
    reply.value = hexString;
    response.push(reply);
    return response;
  }
  hexString = hexString.replace(/ /g, ''); //Whitespace trimming //Probably not needed anymore?
  valueArray = [];
  for (byteNumber; byteNumber < hexString.length; byteNumber += 2) {
    valueArray.push(hexString.substring(byteNumber, byteNumber + 2));
  }
  if (valueArray[0] === '41') {
    reply.mode = valueArray[0] as Modes;
    reply.pid = valueArray[1];
    responsePIDS.forEach((pid: IObdPID) => {
      if (pid.pid === reply.pid && !response_ready) {
        let numberOfBytes = pid.bytes;
        if(pidBytesArray.length===1){
          pidBytesArray.push(pid.bytes+2);
          pidRequested+=1;
        }
        reply.name = pid.name;
        reply.unit = pid.unit;
        if(valueArray.length>8){ //da modificare se cambia la richiesta fatta da app
          while(valueArray.length>pidBytesArray[pidBytesArray.length-1]){
            reply.pid=valueArray[pidBytesArray[pidBytesArray.length-1]];
            responsePIDS.forEach((pid: IObdPID) => {
            if (pid.pid === reply.pid) {
              pidBytesArray.push(pidBytesArray[pidBytesArray.length-1]+pid.bytes+1);
              pidRequested+=1;
            }
            });
          }
          for (let i=0;i<pidRequested;i++){
            let pidToParse=valueArray.slice(pidBytesArray[i],pidBytesArray[i+1]).toString().replace(/[^A-Za-z0-9]/g, ' ');
            if(pidToParse.startsWith('41'))
             response.push(parseOBDResponse(pidToParse)[0]);
            else
              response.push(parseOBDResponse("41"+pidToParse)[0]);
            }
          response_ready=true;
        }
        else{
          const convertToUseful = pid.convertToUseful;
          if (!convertToUseful) {
            return;
          }
        
          switch (numberOfBytes) {
            case 1:
              reply.value = convertToUseful(valueArray[2]);
              break;
            case 2:
              reply.value = convertToUseful(valueArray[2], valueArray[3]);
              break;
            case 4:
              reply.value = convertToUseful(
              valueArray[2],
              valueArray[3],
              valueArray[4],
              valueArray[5]
            );
              break;
            case 8:
              reply.value = convertToUseful(
                valueArray[2],
                valueArray[3],
                valueArray[4],
                valueArray[5],
                valueArray[6],
                valueArray[7],
                valueArray[8],
                valueArray[9]
              );
              break;
          }
          
        }  
      }
      
    });
        
  } else if (valueArray[0] === '43') {
    reply.mode = valueArray[0] as Modes;
    responsePIDS.forEach((pid: IObdPID) => {
      if (pid.mode === '03') {
        const convertToUseful = pid.convertToUseful;
        if (!convertToUseful) {
          return;
        }

        reply.name = pid.name;
        reply.unit = pid.unit;

        reply.value = convertToUseful(
          valueArray[1],
          valueArray[2],
          valueArray[3],
          valueArray[4],
          valueArray[5],
          valueArray[6]
        );
      }
    });
  } else if (valueArray[0] === '49') {
    reply.mode = valueArray[0] as Modes;
    responsePIDS.forEach((pid: IObdPID) => {
      if (pid.mode === '09') {
        const convertToUseful = pid.convertToUseful;
        if (!convertToUseful) {
          return;
        }
        reply.name = pid.name;
        reply.unit = pid.unit;
        reply.value = convertToUseful(valueArray.toString().split(','));
      }
    });
  }
  if(response.length===0){
    response.push(reply);
    
  }
    return response;
}

export function getPIDInfo(pid: string): IObdPIDDescriptor | null {
  const responsePid = responsePIDS.find((item) => item.pid === pid);

  return responsePid || null;
}

export function getAllPIDs(): IObdPIDDescriptor[] {
  return responsePIDS;
}

