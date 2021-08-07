import {getAllPIDs} from '../src/index';
import * as fs from 'fs';

let readme = 'PID | Description | Units\n------------ | -------------| --------------\n';
getAllPIDs().forEach(({pid,description, unit})=>{
    readme = readme.concat(`${pid} | ${description} | ${unit}\n`);
});

fs.writeFileSync('./pids.md', readme);