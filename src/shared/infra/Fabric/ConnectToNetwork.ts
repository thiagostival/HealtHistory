import { Gateway } from 'fabric-network';

import { ccp, gatewayDiscovery, wallet, appAdmin } from '@config/blockchain';
import IResponseConnect from '@shared/dtos/IResponseConnect';
import CreateAdmin from './CreateAdmin';

class ConnectToNetworkService {
  public async execute(): Promise<IResponseConnect> {
    const gateway = new Gateway();

    try {
      const adminExists = await wallet.exists(appAdmin);
      if (!adminExists) {
        const createAdmin = new CreateAdmin();
        await createAdmin.execute();
      }

      await gateway.connect(ccp, {
        wallet,
        identity: appAdmin,
        discovery: gatewayDiscovery,
      });

      const network = await gateway.getNetwork('channel1');
      const contract = await network.getContract('scontract');

      const networkObj = {
        contract,
        network,
        gateway,
      };

      return networkObj;
    } catch (error) {
      throw new Error(`Erro ao conectar na rede!\n ${error}`);
    }
  }
}

export default ConnectToNetworkService;
