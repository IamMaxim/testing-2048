const assert = require('assert');
const g = require('../js/grid');
const kim = require('../js/keyboard_input_manager');
const lsm = require('../js/local_storage_manager');
const ha = require('../js/html_actuator');
const gmm = require('../js/game_manager');
const t = require('../js/tile');
const {Builder, By, Key, until} = require('selenium-webdriver');


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
    });
    describe('Input', function () {
        it("Supported keyboard events are processed (equivalence class testing)", function () {
            // All supported keyboard events correspond to the same class;
            // All unsupported keyboard events also correspond to the same class.

            let gm = new gmm.GameManager(4, kim.KeyboardInputManager, ha.HTMLActuator, lsm.LocalStorageManager);
            let initialGrid = g.Grid.fromState(gm.grid.serialize());

            // let modifiedGM = GameManager.fromState(gm.serialize());
            // modifiedGM.move(0);
            // let expectedGrid = modifiedGM.grid();

            let compareGrids = function (grid1, grid2) {
                for (let i = 0; i < 4; i++)
                    for (let j = 0; i < 4; j++) {
                        if (grid1[i][j] !== grid2[i][j])
                            return false;
                    }
                return true;
            };

            let ev = new gm.KeyboardEvent('keydown', {keyCode: 39});
            dispatchEvent(ev);

            // gm.move(0);
            let finalGrid = gm.grid;

            assert.ok(!compareGrids(initialGrid, finalGrid));
        });

        it("Unsupported keyboard events are not processed (equivalence class testing)", function () {
            // All supported keyboard events correspond to the same class;
            // All unsupported keyboard events also correspond to the same class.

            let gm = new gmm.GameManager(4, kim.KeyboardInputManager, ha.HTMLActuator, lsm.LocalStorageManager);
            let initialGrid = g.Grid.fromState(gm.grid.serialize());

            // let modifiedGM = GameManager.fromState(gm.serialize());
            // modifiedGM.move(0);
            // let expectedGrid = modifiedGM.grid();

            let compareGrids = function (grid1, grid2) {
                for (let i = 0; i < 4; i++)
                    for (let j = 0; i < 4; j++) {
                        if (grid1[i][j] !== grid2[i][j])
                            return false;
                    }
                return true;
            };

            let ev = new KeyboardEvent('keydown', {keyCode: 1});
            dispatchEvent(ev);

            // gm.move(0);
            let finalGrid = gm.grid;

            assert.ok(compareGrids(initialGrid, finalGrid));
        });

    });
    describe('UI', async function () {
        await it('should not fail', async function () {
            let driver = await new Builder().forBrowser('chrome').build();
            try {
                // Navigate to URL
                await driver.get('https://play2048.co');

                // All supported keyboard events correspond to the same class;
                // All unsupported keyboard events also correspond to the same class.

                let gm = new gmm.GameManager(4, kim.KeyboardInputManager, ha.HTMLActuator, lsm.LocalStorageManager);
                let initialGrid = g.Grid.fromState(gm.grid.serialize());

                // let modifiedGM = GameManager.fromState(gm.serialize());
                // modifiedGM.move(0);
                // let expectedGrid = modifiedGM.grid();

                let compareGrids = function (grid1, grid2) {
                    for (let i = 0; i < 4; i++)
                        for (let j = 0; i < 4; j++) {
                            if (grid1[i][j] !== grid2[i][j])
                                return false;
                        }
                    return true;
                };

                let ev = new KeyboardEvent('keydown', {keyCode: 1});
                dispatchEvent(ev);

                // gm.move(0);
                let finalGrid = gm.grid;

                assert.ok(compareGrids(initialGrid, finalGrid));

                done();

                // Enter text "cheese" and perform keyboard action "Enter"
                // await driver.findElement(By.name('q')).sendKeys('cheese', Key.ENTER);
                // let firstResult = await driver.wait(until.elementLocated(By.css('h3')), 10000);
                // console.log(await firstResult.getAttribute('textContent'));
            } finally {
                await driver.quit();
            }
        });
    });
});