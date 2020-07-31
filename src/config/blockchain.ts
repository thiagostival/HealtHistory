import { CouchDBWalletOptions, CouchDBWallet } from 'fabric-network';
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

const url: CouchDBWalletOptions = {
  url: 'http://0.0.0.0:17134',
};

const wallet = new CouchDBWallet(url);

export { wallet, ccp };
