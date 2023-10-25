#! /usr/bin/env node
import { Command } from 'commander';
import { getPIDInfo,parseOBDResponse } from '../src/index';

const program = new Command();

program
  .command('info <pid>')
  .description('Get info for a PID')
  .action((pid) => {
    const info = getPIDInfo(pid);
    console.log(JSON.stringify(info, null, 4));
  });

program
  .command('parse <hexString>')
  .description('Parse an OBD response')
  .action((hexString) => {
    const parsedResponse = parseOBDResponse(hexString);
    console.log(JSON.stringify(parsedResponse, null, 4));
  });


program.parse(process.argv);
