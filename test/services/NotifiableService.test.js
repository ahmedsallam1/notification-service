import chai from 'chai';
import NotifiableService from '../../services/NotifiableService';
import User from '../../models/User';
import sinon from 'sinon';
import { TYPES as notifiableTypes } from '../../Constants/NotifiableType';
import { GROUPS as userGroups } from '../../Constants/UserGroup';

const expect = chai.expect;

describe('Notifiable service unit test', () => {
  const model = [
    {
      'id': 1,
      'name': 'test1',
      'group': userGroups.GROUP_B
    },
    {
      'id': 5,
      'name': 'test2',
      'group': userGroups.GROUP_A
    },
    {
      'id': 7,
      'name': 'test3',
      'group': userGroups.GROUP_B
    },
  ];
  const expectedModelByUser = {
    'id': 1,
    'name': 'test1',
    'group': userGroups.GROUP_B
  };
  const expectedModelByGroup = [
    {
      'id': 1,
      'name': 'test1',
      'group': userGroups.GROUP_B
    },
    {
      'id': 7,
      'name': 'test3',
      'group': userGroups.GROUP_B
    },
  ];

  sinon.stub(User, 'find').callsFake(function fakeFn(arg) {
    let result = model.filter(obj => {
      let key = Object.keys(arg)[0];
      return obj[key] === arg[key]
    });

    return result;
  });

  describe('get', () => {
    it('Should return user by id', async () => {
      let notifiableService = new NotifiableService(notifiableTypes.INDIVIDUAL, User);
      let actualModel = await notifiableService.get(1)
      expect(actualModel[0]).to.deep.equal(expectedModelByUser);

    });

    it('Should return list of users by group', async () => {
      let notifiableService = new NotifiableService(notifiableTypes.GROUP, User);

      expect(await notifiableService.get(userGroups.GROUP_B)).to.deep.equal(expectedModelByGroup);
    });
  });
});