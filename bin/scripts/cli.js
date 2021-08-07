#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var index_1 = require("../src/index");
var program = new commander_1.Command();
program
    .command('info <pid>')
    .description('Get info for a PID')
    .action(function (pid) {
    var info = index_1.getPIDInfo(pid);
    console.log(JSON.stringify(info, null, 4));
});
program
    .command('parse <hexString>')
    .description('Parse an OBD response')
    .action(function (hexString) {
    var parsedResponse = index_1.parseOBDResponse(hexString);
    console.log(JSON.stringify(parsedResponse, null, 4));
});
program.parse(process.argv);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc2NyaXB0cy9jbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsdUNBQW9DO0FBQ3BDLHNDQUF5RDtBQUV6RCxJQUFNLE9BQU8sR0FBRyxJQUFJLG1CQUFPLEVBQUUsQ0FBQztBQUU5QixPQUFPO0tBQ0YsT0FBTyxDQUFDLFlBQVksQ0FBQztLQUNyQixXQUFXLENBQUMsb0JBQW9CLENBQUM7S0FDakMsTUFBTSxDQUFDLFVBQUMsR0FBRztJQUNSLElBQU0sSUFBSSxHQUFHLGtCQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvQyxDQUFDLENBQUMsQ0FBQztBQUVQLE9BQU87S0FDRixPQUFPLENBQUMsbUJBQW1CLENBQUM7S0FDNUIsV0FBVyxDQUFDLHVCQUF1QixDQUFDO0tBQ3BDLE1BQU0sQ0FBQyxVQUFDLFNBQVM7SUFDZCxJQUFNLGNBQWMsR0FBRyx3QkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNuRCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3pELENBQUMsQ0FBQyxDQUFDO0FBRVAsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMifQ==