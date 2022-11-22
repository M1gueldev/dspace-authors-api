import {Create, Delete, Read, Update} from "./authors-crud";
import {data as d} from "../utils.test";


describe('Authors CRUD', () => {
    const data = d[0]

    test('Create Author', async () => {
        expect.assertions(1)
        const a = await Create(data)
        expect(a).toEqual(data)
    })
    test('Read Author', async () => {
        expect.assertions(1)
        const a = await Read(data.id)
        expect(a).toEqual(data)
    })
    test('Update Author', async () => {
        expect.assertions(3)
        const NewName = 'Updated Name'
        const update = {
            name: NewName
        }
        const q1 = await Update(update, 42)
        expect(q1.name).toEqual(NewName)
        const q2 = await Update(data, 42)
        expect(q2).toEqual(data)
        const q3 = await Read(42)
        expect(q3).toEqual(data)
    })
    test('Delete Author', async () => {
        expect.assertions(2)
        const a1 = await Delete(42)
        expect(a1).toEqual(data)
        const a2 = await Read(42)
        expect(a2).toBeNull()
    })
})



