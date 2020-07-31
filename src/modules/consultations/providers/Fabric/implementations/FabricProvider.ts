import IResponseConnect from '@modules/consultations/dtos/IResponseConnect';
import ICreateConsulta from '@modules/consultations/dtos/ICreateConsulta';
import ConnectToNetwork from '@modules/consultations/infra/Fabric/ConnectToNetwork';
import IFabricProvider from '../models/IFabricProvider';

class Fabric implements IFabricProvider {
  public async connectToNetwork(): Promise<IResponseConnect> {
    try {
      const connectToNetworkService = new ConnectToNetwork();
      const networkObj = await connectToNetworkService.execute();
      return networkObj;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async createPacient(CPF: string): Promise<string> {
    try {
      const connectToNetworkService = new ConnectToNetwork();
      const networkObj = await connectToNetworkService.execute();

      const args = [CPF];
      const response = await networkObj.contract.submitTransaction(
        'createHealthPacientes',
        ...args,
      );

      return JSON.parse(response.toString());
    } catch (error) {
      return error;
    }
  }

  public async insertConsultation(
    networkObj: IResponseConnect,
    CPF: string,
    consultation: ICreateConsulta,
  ): Promise<{}> {
    try {
      const args = [
        CPF,
        consultation.medico,
        consultation.especialidade,
        consultation.date,
      ];
      const response = await networkObj.contract.submitTransaction(
        'updateHealthPacientes',
        ...args,
      );
      return JSON.parse(response.toString());
    } catch (error) {
      return error;
    }
  }

  public async getConsultation(
    networkObj: IResponseConnect,
    CPF: string,
  ): Promise<{}> {
    try {
      const args = [CPF];
      const response = await networkObj.contract.evaluateTransaction(
        'readHealthPacientes',
        ...args,
      );

      return JSON.parse(response.toString());
    } catch (error) {
      return error;
    }
  }
}

export default Fabric;
