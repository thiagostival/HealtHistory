/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { ChaincodeStub, ClientIdentity } = require('fabric-shim');
const { HealthPacientesContract } = require('..');
const winston = require('winston');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);

class TestContext {

    constructor() {
        this.stub = sinon.createStubInstance(ChaincodeStub);
        this.clientIdentity = sinon.createStubInstance(ClientIdentity);
        this.logging = {
            getLogger: sinon.stub().returns(sinon.createStubInstance(winston.createLogger().constructor)),
            setLevel: sinon.stub(),
        };
    }

}

describe('HealthPacientesContract', () => {

    let contract;
    let ctx;

    beforeEach(() => {
        contract = new HealthPacientesContract();
        ctx = new TestContext();
        ctx.stub.getState.withArgs('1001').resolves(Buffer.from('{"value":"health pacientes 1001 value"}'));
        ctx.stub.getState.withArgs('1002').resolves(Buffer.from('{"value":"health pacientes 1002 value"}'));
    });

    describe('#healthPacientesExists', () => {

        it('should return true for a health pacientes', async () => {
            await contract.healthPacientesExists(ctx, '1001').should.eventually.be.true;
        });

        it('should return false for a health pacientes that does not exist', async () => {
            await contract.healthPacientesExists(ctx, '1003').should.eventually.be.false;
        });

    });

    describe('#createHealthPacientes', () => {

        it('should create a health pacientes', async () => {
            await contract.createHealthPacientes(ctx, '1003', 'health pacientes 1003 value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1003', Buffer.from('{"value":"health pacientes 1003 value"}'));
        });

        it('should throw an error for a health pacientes that already exists', async () => {
            await contract.createHealthPacientes(ctx, '1001', 'myvalue').should.be.rejectedWith(/The health pacientes 1001 already exists/);
        });

    });

    describe('#readHealthPacientes', () => {

        it('should return a health pacientes', async () => {
            await contract.readHealthPacientes(ctx, '1001').should.eventually.deep.equal({ value: 'health pacientes 1001 value' });
        });

        it('should throw an error for a health pacientes that does not exist', async () => {
            await contract.readHealthPacientes(ctx, '1003').should.be.rejectedWith(/The health pacientes 1003 does not exist/);
        });

    });

    describe('#updateHealthPacientes', () => {

        it('should update a health pacientes', async () => {
            await contract.updateHealthPacientes(ctx, '1001', 'health pacientes 1001 new value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1001', Buffer.from('{"value":"health pacientes 1001 new value"}'));
        });

        it('should throw an error for a health pacientes that does not exist', async () => {
            await contract.updateHealthPacientes(ctx, '1003', 'health pacientes 1003 new value').should.be.rejectedWith(/The health pacientes 1003 does not exist/);
        });

    });

    describe('#deleteHealthPacientes', () => {

        it('should delete a health pacientes', async () => {
            await contract.deleteHealthPacientes(ctx, '1001');
            ctx.stub.deleteState.should.have.been.calledOnceWithExactly('1001');
        });

        it('should throw an error for a health pacientes that does not exist', async () => {
            await contract.deleteHealthPacientes(ctx, '1003').should.be.rejectedWith(/The health pacientes 1003 does not exist/);
        });

    });

});