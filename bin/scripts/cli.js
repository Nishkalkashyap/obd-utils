#! /usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var index_1 = require("../src/index");
var program = new commander_1.Command();
program
    .command('info <pid>')
    .description('Get info for a PID')
    .action(function (pid) {
    var info = (0, index_1.getPIDInfo)(pid);
    console.log(JSON.stringify(info, null, 4));
});
program
    .command('parse <hexString>')
    .description('Parse an OBD response')
    .action(function (hexString) {
    var parsedResponse = (0, index_1.parseOBDResponse)(hexString);
    console.log(JSON.stringify(parsedResponse, null, 4));
});
program.parse(process.argv);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc2NyaXB0cy9jbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsdUNBQW9DO0FBQ3BDLHNDQUF5RDtBQUV6RCxJQUFNLE9BQU8sR0FBRyxJQUFJLG1CQUFPLEVBQUUsQ0FBQztBQUU5QixPQUFPO0tBQ0YsT0FBTyxDQUFDLFlBQVksQ0FBQztLQUNyQixXQUFXLENBQUMsb0JBQW9CLENBQUM7S0FDakMsTUFBTSxDQUFDLFVBQUMsR0FBRztJQUNSLElBQU0sSUFBSSxHQUFHLElBQUEsa0JBQVUsRUFBQyxHQUFHLENBQUMsQ0FBQztJQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQy9DLENBQUMsQ0FBQyxDQUFDO0FBRVAsT0FBTztLQUNGLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQztLQUM1QixXQUFXLENBQUMsdUJBQXVCLENBQUM7S0FDcEMsTUFBTSxDQUFDLFVBQUMsU0FBUztJQUNkLElBQU0sY0FBYyxHQUFHLElBQUEsd0JBQWdCLEVBQUMsU0FBUyxDQUFDLENBQUM7SUFDbkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN6RCxDQUFDLENBQUMsQ0FBQztBQUVQLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDIn0=