import { X509WalletMixin } from 'fabric-network';
import FabricCAServices from 'fabric-ca-client';

import {
  appAdmin,
  appAdminSecret,
  orgMSPID,
  caName,
  wallet,
} from '@config/blockchain';

class CreateAdmin {
  public async execute(): Promise<string> {
    const caURL = caName;
    const ca = await new FabricCAServices(caURL);

    try {
      const enrollment = await ca.enroll({
        enrollmentID: appAdmin,
        enrollmentSecret: appAdminSecret,
      });
      const identity = await X509WalletMixin.createIdentity(
        orgMSPID,
        enrollment.certificate,
        enrollment.key.toBytes(),
      );
      await wallet.import(appAdmin, identity);

      return `Successfully enrolled admin user ${appAdmin} and imported it into the wallet`;
    } catch (err) {
      return `User adm not created: ${appAdmin} : ${err}`;
    }
  }
}

export default CreateAdmin;
