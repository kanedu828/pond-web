import { expToLevel, percentToNextLevel, levelToExp } from "./util";

describe('test exp functions', () => {
    it('exp to level are equal', () => {
        const expectedExp = 600;
        const expectedLevel = 22;
        const exp = levelToExp(expectedLevel);
        const level = expToLevel(expectedExp);
        expect(exp).toEqual(expectedExp);
        expect(level).toEqual(expectedLevel);
    });  
});