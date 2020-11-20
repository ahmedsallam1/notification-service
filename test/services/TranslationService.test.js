import chai from 'chai';
import TranslationService from '../../services/TranslationService';

const expect = chai.expect;

describe('Translation service unit test', () => {
    describe('translate', () => {
      it('Should translate message for existing translation', async () => {
        let message = 'promotions.sms';
        let parameter = 'Test%25';

        let ar_ExpectedTranslation = 'أستخدم البرومو كود ده Test%25 دلوقتي!';
        let en_ExpectedTranslation = 'use this promo code Test%25 now!';

        let ar_Instance = new TranslationService('ar');
        let ar_translation = await ar_Instance.translate(message, {'%code%': parameter});

        expect(ar_ExpectedTranslation).to.equal(ar_translation);

        let en_Instance = new TranslationService('en');
        let en_translation = await en_Instance.translate(message, {'%code%': parameter});
        
        expect(en_ExpectedTranslation).to.equal(en_translation);
      });
    });

    it('Should return back key if message or locale does not exist', async () => {
      let message = 'promotions.non';

      let ExpectedTranslation = 'promotions.non';

      let fr_Instance = new TranslationService('fr');
      let fr_translation = await fr_Instance.translate(message);

      expect(ExpectedTranslation).to.equal(fr_translation);

      let en_Instance = new TranslationService('en');
      let en_translation = await en_Instance.translate(message);
      
      expect(ExpectedTranslation).to.equal(en_translation);
    });
});