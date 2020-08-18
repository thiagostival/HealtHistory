import { Contract, Network, Gateway } from 'fabric-network';

export default interface IResponseConnect {
  contract: Contract;
  network: Network;
  gateway: Gateway;
}
