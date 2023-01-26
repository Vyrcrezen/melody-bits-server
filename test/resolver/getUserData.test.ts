import { expect } from 'chai';
import { afterEach } from 'mocha';
import { FindOptions, Identifier, Model } from 'sequelize';
import Sinon, { SinonStub } from 'sinon';
import { getUserData, UserDataType,  } from '../../src/graphql/resolver/query/getUserData';
import { UserAccount } from '../../src/models/sql/user_account.sql';

const expectEmptyUserObject = (resultData: UserDataType) => {
    expect(resultData).to.haveOwnProperty('user_name');
    expect(resultData).to.haveOwnProperty('user_id');
    expect(resultData).to.haveOwnProperty('user_email');
    expect(resultData).to.haveOwnProperty('hashId');
    expect(resultData).to.haveOwnProperty('registration_time');
    expect(resultData).to.haveOwnProperty('last_online');
}

const contextDifferentUser = {
    jwtAuth: {
        clearance: 7,
        user_id: 10
    }
};

const contextSameUser = {
    jwtAuth: {
        clearance: 7,
        user_id: 2
    }
}

const contextAdmin = {
    jwtAuth: {
        clearance: 2,
        user_id: 11
    }
}

const TestUser = {
    id: 2,
    user_name: 'TestUser',
    clearance: 7,
    hash_id: '4453',
    user_email: 'name@domain.com',
    user_bio: {
        bio_text: "Bio text"
    }
} as UserAccount;

let stubFindByPk: SinonStub<[identifier?: Identifier | undefined, options?: Omit<FindOptions<any>, "where"> | undefined], Promise<Model<any, any> | null>> | undefined;

describe('getUserData', () => {

    afterEach(() => {
        if (stubFindByPk?.restore) {
            stubFindByPk.restore();
        }
    });

    it('should return code 404 and an empty user object if no user was found', async () => {

        stubFindByPk = Sinon.stub(UserAccount, 'findByPk').returns(new Promise((resolve, _reject) => resolve(null)));

        try {
            const result = await getUserData({}, { user_id: '' }, {});

            expect(result).to.haveOwnProperty('code', 404);
            expectEmptyUserObject(result.data);
        }
        catch (err) {
            throw err;
        }
    });

    it('should return code 500, and an empty user object if the database connection fails', async () => {

        stubFindByPk = Sinon.stub(UserAccount, 'findByPk').throws();

        try {
            const result = await getUserData({}, { user_id: '' }, {});

            expect(result).to.haveOwnProperty('code', 500);
            expectEmptyUserObject(result.data);
        }
        catch (err) {
            throw err;
        }
    });

    it('should return code 200 and retain sensitive data if request is not authorized', async () => {

        stubFindByPk = Sinon.stub(UserAccount, 'findByPk').returns(new Promise((resolve, _reject) => { resolve(TestUser); }));

        try {
            const result = await getUserData({}, { user_id: '2' }, contextDifferentUser);

            expect(result).to.haveOwnProperty('code', 200);
            expect(result.data).to.haveOwnProperty('user_id', undefined);
            expect(result.data).to.haveOwnProperty('user_email', undefined);
            expect(result.data).to.haveOwnProperty('hashId', undefined);
            expect(result.data).to.haveOwnProperty('clearance', undefined);
        }
        catch (err) {
            throw err;
        }
    });

    it('should return code 200 and sensitive information if the user is requesting their own information', async () => {

        stubFindByPk = Sinon.stub(UserAccount, 'findByPk').returns(new Promise((resolve, _reject) => { resolve(TestUser); }));

        try {
            const result = await getUserData({}, { user_id: '2' }, contextSameUser);

            expect(result).to.haveOwnProperty('code', 200);
            expect(result.data).to.have.property('user_id').that.is.a('number');
            expect(result.data).to.have.property('user_email').that.is.a('string');
            expect(result.data).to.have.property('hashId').that.is.a('string');
            expect(result.data).to.have.property('clearance').that.is.a('number');
        }
        catch (err) {
            throw err;
        }
    });

    it('should return code 200 and sensitive information if an admin is requesting user data', async () => {

        stubFindByPk = Sinon.stub(UserAccount, 'findByPk').returns(new Promise((resolve, _reject) => { resolve(TestUser); }));

        try {
            const result = await getUserData({}, { user_id: '2' }, contextAdmin);

            expect(result).to.haveOwnProperty('code', 200);
            expect(result.data).to.have.property('user_id').that.is.a('number');
            expect(result.data).to.have.property('user_email').that.is.a('string');
            expect(result.data).to.have.property('hashId').that.is.a('string');
            expect(result.data).to.have.property('clearance').that.is.a('number');
        }
        catch (err) {
            throw err;
        }
    });
});
