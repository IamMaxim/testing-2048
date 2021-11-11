const assert = require('assert');
const g = require('../js/grid');
const t = require('../js/tile');

describe('Unit tests', function () {
    describe('Grid', function () {
        describe('Bounds test', function () {
            it('should return false when out-of-bounds coordinate is passed (Blackbox BVA)', function () {
                // Use Boundary Value Analysis.
                // Since we have 4x4 grid in the game (this amount is not dynamic), we know for sure that suitable
                // range is [0, 3]. We also don't know anything about internal logic, so this is a black-box test.
                let values = [
                    [0, 0, true],
                    [0, -1, false],
                    [-1, 0, false],
                    [3, 3, true],
                    [4, 3, false],
                    [3, 4, false],
                ];

                let grid = new g.Grid(4);

                values.forEach(function (args) {
                    assert.equal(grid.withinBounds({
                        x: args[0],
                        y: args[1]
                    }), args[2]);
                });
            });
            it('should return false when out-of-bounds coordinate is passed (Blackbox BVA)', function () {
                // Use Boundary Value Analysis.
                // Since we have 4x4 grid in the game (this amount is not dynamic), we know for sure that suitable
                // range is [0, 3]. We also don't know anything about internal logic, so this is a black-box test.
                let values = [
                    [0, 0, true],
                    [0, -1, false],
                    [-1, 0, false],
                    [3, 3, true],
                    [4, 3, false],
                    [3, 4, false],
                ];

                let grid = new g.Grid(4);

                values.forEach(function (args) {
                    assert.equal(grid.withinBounds({
                        x: args[0],
                        y: args[1]
                    }), args[2]);
                });
            });

        });
        describe('');
    });
});