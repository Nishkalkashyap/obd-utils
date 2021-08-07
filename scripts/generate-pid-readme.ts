import {getAllPIDs} from '../src/index';
import * as fs from 'fs';

let readme = 'PID | Description | Units\n------------ | -------------| --------------\n';
getAllPIDs().forEach(({pid,description, unit})=>{
    readme = readme.concat(`${pid} | ${description} | ${unit}\n`);
});

const startIdentifier = '<!-- insert-table-here -->';
const endIdentifier = '<!-- end-table-here -->';
const currentReadme = fs.readFileSync('./README.md').toString();

const startIndex = currentReadme.indexOf(startIdentifier);
const endIndex = currentReadme.indexOf(endIdentifier) + endIdentifier.length;


const contentBeforeStartIdentifier = currentReadme.substring(0, startIndex);
const contentAfterEndIdentifier = currentReadme.substring(endIndex);
const contentInBetween = String().concat(startIdentifier, '\n', readme, '\n', endIdentifier);

const finalReadme = String().concat(contentBeforeStartIdentifier, contentInBetween, contentAfterEndIdentifier);
fs.writeFileSync('README.md', finalReadme);
