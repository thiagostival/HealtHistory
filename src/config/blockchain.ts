import { FileSystemWallet } from 'fabric-network';
import path from 'path';
import fs from 'fs';

const configPath = path.join(process.cwd(), './fabric_config.json');
const configJSON = fs.readFileSync(configPath, 'utf8');
const config = JSON.parse(configJSON);

export const {
  gatewayDiscovery,
  appAdmin,
  orgMSPID,
  appAdminSecret,
  caName,
  connection_file,
} = config;

const ccpPath = path.join(process.cwd(), connection_file);
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);

const walletPath = path.join(process.cwd(), 'wallet');
const wallet = new FileSystemWallet(walletPath);

export { wallet, ccp };
