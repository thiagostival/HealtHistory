/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class HealthPacientesContract extends Contract {

    async healthPacientesExists(ctx, CPF) {
        const buffer = await ctx.stub.getState(CPF);
        return (!!buffer && buffer.length > 0);
    }

    async createHealthPacientes(ctx, CPF) {
        const exists = await this.healthPacientesExists(ctx, CPF);
        if (exists) {
            throw new Error(`The health pacientes ${CPF} already exists`);
        }
        const asset = {
            CPF: CPF,
            consultas: [],
        };
        const buffer = Buffer.from(JSON.stringify(asset));

        const before = Date.now();
        await ctx.stub.putState(CPF, buffer);
        const after = Date.now() - before;

        const response = {
            transactionExecutionTime: after,
        };

        return response;
    }

    async readHealthPacientes(ctx, CPF) {
        const exists = await this.healthPacientesExists(ctx, CPF);
        if (!exists) {
            throw new Error(`The health pacientes ${CPF} does not exist`);
        }
        const before = Date.now();
        const buffer = await ctx.stub.getState(CPF);
        const after = Date.now() - before;

        const asset = JSON.parse(buffer.toString());

        const data = {
            asset,
            transactionExecutionTime: after,
        };

        return data;
    }

    async updateHealthPacientes(ctx, CPF, medico, especialidade, date) {
        const exists = await this.healthPacientesExists(ctx, CPF);
        if (!exists) {
            throw new Error(`The health pacientes ${CPF} does not exist`);
        }
        const paciente = await ctx.stub.getState(CPF);
        const pacienteData = JSON.parse(paciente);

        const consulta = {
            medico: medico,
            especialidade: especialidade,
            data: date,
        };
        pacienteData.consultas.push(consulta);

        const buffer = Buffer.from(JSON.stringify(pacienteData));

        const before = Date.now();
        await ctx.stub.putState(CPF, buffer);
        const after = Date.now() - before;

        const response = {
            transactionExecutionTime: after,
        };

        return response;
    }

    async deleteHealthPacientes(ctx, CPF) {
        const exists = await this.healthPacientesExists(ctx, CPF);
        if (!exists) {
            throw new Error(`The health pacientes ${CPF} does not exist`);
        }
        await ctx.stub.deleteState(CPF);
    }

}

module.exports = HealthPacientesContract;
