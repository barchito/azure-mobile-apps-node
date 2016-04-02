var columns = require('../../../src/data/sqlite/columns'),
    expect = require('chai').expect;

describe('azure-mobile-apps.data.sqlite.columns', function () {
    it("returns empty array for unknown table", function () {
        return columns().for({}).then(function (result) {
            expect(result).to.deep.equal([]);
        });
    });

    it("returns columns set from item", function () {
        return columns().set({ name: 'columns' }, {
                number: 1,
                string: 'test',
                boolean: false,
                date: new Date()
            })
            .then(function () {
                return columns().for({ name: 'columns' });
            })
            .then(function (results) {
                expect(results).to.deep.equal([
                    { name: 'number', type: 'number' },
                    { name: 'string', type: 'string' },
                    { name: 'boolean', type: 'boolean' },
                    { name: 'date', type: 'date' },
                    { name: 'id', type: 'string' },
                    { name: 'createdAt', type: 'date' },
                    { name: 'updatedAt', type: 'date' },
                    { name: 'version', type: 'string' },
                    { name: 'deleted', type: 'boolean' }
                ]);
            });
    });

    it("applies column types to items", function () {
        return columns().set({ name: 'columns' }, {
                number: 1,
                string: 'test',
                boolean: false,
                date: new Date()
            })
            .then(function () {
                return columns().applyTo({ name: 'columns' }, [
                    { number: 2, string: 'test2', boolean: 1, date: '2016-03-31T17:00:00.000Z' },
                    { number: 3, string: 'test3', boolean: 0, date: '2017-04-01T17:01:00.000Z' }
                ]);
            })
            .then(function (results) {
                expect(results).to.deep.equal([
                    { number: 2, string: 'test2', boolean: true, date: new Date('2016-03-31T17:00:00.000Z') },
                    { number: 3, string: 'test3', boolean: false, date: new Date('2017-04-01T17:01:00.000Z') }
                ]);
            });
    });
});
