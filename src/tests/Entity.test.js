import { Entity } from "../classes/Entity"

test('error is thrown when trying to instatiate abastract Entity class', 
() => {
    try {
        const entity = new Entity('test');
    } catch (e) {
        expect(e.message).toBe("Abstract classes can't be instantiated.");
    }
})