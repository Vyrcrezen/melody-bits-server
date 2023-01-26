import { UserAccount } from "../../src/models/sql/user_account.sql";
import Sinon, { SinonStub } from "sinon";
import { FindOptions, Model } from "sequelize";
import bcrypt from 'bcrypt';
import { authUserData, authUserResolver } from "../../src/graphql/resolver/query/authUser";
import { expect } from "chai";

interface InstancedUserAccount extends UserAccount {
    update: () => Promise<this>;
}


const TestUser = {
    id: 2,
    user_name: 'TestUser',
    clearance: 7,
    hash_id: '4453',
    is_banned: false,
    user_email: 'name@domain.com',
    lang: 'jp',
    user_bio: {
        bio_text: "Bio text"
    },
    update: () => { return new Promise((resolve, _reject) => { resolve(this as unknown as InstancedUserAccount ); }); }
} as InstancedUserAccount;
TestUser.update = TestUser.update.bind(this);

const assertEmptyUserData = (resultData: authUserData) => {
    expect(resultData).to.haveOwnProperty('token', '');
    expect(resultData).to.haveOwnProperty('user_name', '');
    expect(resultData).to.haveOwnProperty('clearance', '');
    expect(resultData).to.have.property('pref').to.have.property('lang', 'en');
}

const assertUserData = (resultData: authUserData) => {
    expect(resultData).to.haveOwnProperty('token');
    expect(resultData).to.haveOwnProperty('user_name', 'TestUser');
    expect(resultData).to.haveOwnProperty('clearance', 7);
    expect(resultData).to.have.property('pref').to.have.property('lang', 'jp');
}

let stubFindOne: SinonStub<[options?: FindOptions<any> | undefined], Promise<Model<any, any> | null>> | undefined;
let stubCompare: SinonStub<[data: string | Buffer, encrypted: string, callback: (err: Error | undefined, same: boolean) => any], void>;

describe('authUser', () => {

    afterEach(() => {
        if (stubFindOne?.restore) {
            stubFindOne.restore();
        }
        if (stubCompare?.restore) {
            stubCompare.restore();
        }
    });

    it('should return code 400 and empty data if no email of password was provided', async () => {

        const result = await authUserResolver({}, { email: '', password: '' });

        try {
            expect(result).to.haveOwnProperty('code', 400);
            assertEmptyUserData(result.data);
        }
        catch (err) {
            throw err;
        }

    });

    it('should return code 400 and empty data if no user was found', async () => {

        stubFindOne = Sinon.stub(UserAccount, 'findOne').returns(new Promise((resolve, _reject) => resolve(null)));

        const result = await authUserResolver({}, { email: 'name@domain.com', password: 'f99sEWsKpMr@pLAeAPgYht6EZ56XUF*S' });

        try {
            expect(result).to.haveOwnProperty('code', 400);
            assertEmptyUserData(result.data);
        }
        catch (err) {
            throw err;
        }
    });

    it('should return code 500 and empty data if the database connection fails', async () => {

        stubFindOne = Sinon.stub(UserAccount, 'findOne').throws();

        const result = await authUserResolver({}, { email: 'name@domain.com', password: 'f99sEWsKpMr@pLAeAPgYht6EZ56XUF*S' });

        try {
            expect(result).to.haveOwnProperty('code', 500);
            assertEmptyUserData(result.data);
        }
        catch (err) {
            throw err;
        }
    });

    it('should return code 401 and empty data if the user is banned', async () => {

        stubFindOne = Sinon.stub(UserAccount, 'findOne').returns(new Promise((resolve, _reject) => resolve({...TestUser, is_banned: true} as InstancedUserAccount)));

        const result = await authUserResolver({}, { email: 'name@domain.com', password: 'f99sEWsKpMr@pLAeAPgYht6EZ56XUF*S' });

        try {
            expect(result).to.haveOwnProperty('code', 401);
            assertEmptyUserData(result.data);
        }
        catch (err) {
            throw err;
        }
    });

    it('should return code 404 and empty data if password is incorrect', async () => {

        stubFindOne = Sinon.stub(UserAccount, 'findOne').returns(new Promise((resolve, _reject) => resolve(TestUser as InstancedUserAccount)));
        stubCompare = Sinon.stub(bcrypt, 'compare').resolves( false );

        const result = await authUserResolver({}, { email: 'name@domain.com', password: 'f99sEWsKpMr@pLAeAPgYht6EZ56XUF*S' });

        try {
            expect(result).to.haveOwnProperty('code', 400);
            assertEmptyUserData(result.data);
        }
        catch (err) {
            throw err;
        }
    });

    it('should return code 200 and valid data if email and password are both correct', async () => {

        stubFindOne = Sinon.stub(UserAccount, 'findOne').returns(new Promise((resolve, _reject) => resolve(TestUser as InstancedUserAccount)));
        stubCompare = Sinon.stub(bcrypt, 'compare').resolves( true );

        const result = await authUserResolver({}, { email: 'name@domain.com', password: 'f99sEWsKpMr@pLAeAPgYht6EZ56XUF*S' });

        try {
            expect(result).to.haveOwnProperty('code', 200);
            assertUserData(result.data);
        }
        catch (err) {
            throw err;
        }
    });

})
