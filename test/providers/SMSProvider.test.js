import chai from 'chai';
import sinon from 'sinon';
import SMSProvider from '../../providers/SMSProvider';

const expect = chai.expect;

describe('SMS provider unit test', () => {
    describe('send', () => {
      it('Should log sent message to provided phone number', async () => {
        let spy = sinon.spy(console, 'log');
        let message = 'Hello There';
        let phone = '+2010066666';
        let provider = new SMSProvider(message, phone);

        provider.send();
      
        expect(spy.calledOnce).to.be.true;
        expect(spy.calledWith(`${message} has been sent to ${phone}`)).to.be.true;
      });
    });
});