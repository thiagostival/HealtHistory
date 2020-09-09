import IResponseConnect from '@modules/consultations/dtos/IResponseConnect';
import ICreateConsulta from '@modules/consultations/dtos/ICreateConsulta';

export default interface IFabricProvider {
  createPacient(CPF: string): Promise<string>;
  insertConsultation(
    networkObj: IResponseConnect,
    CPF: string,
    consultation: ICreateConsulta,
  ): Promise<{}>;
}
