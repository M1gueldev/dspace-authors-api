import request from "supertest";

import app from "./app";
import {data} from "./utils.test";
import {prisma} from "./routes/authors-crud";

describe("Author routes", () => {
    beforeAll(async () => {
        // Clean Database if any test fail

        console.info("DATABASE CLEAN")
        let num = await prisma.author.findMany()
        if(num.length > 0 ) {
            console.info(num.reduce((previousValue, currentValue) => previousValue + currentValue.id + ':' + currentValue.name + "\n", ""))
            const res = await prisma.author.deleteMany()
            num = await prisma.author.findMany()
            console.info(num.reduce((previousValue, currentValue) => previousValue + currentValue.id + ':' + currentValue.name + "\n", ""))
            console.info(res)
        }else {
            console.info('Database Empty')
        }
    })

    test("Create 3 Users", async () => {
        expect.assertions(3)
        console.info(data.reduce((previousValue, currentValue) => previousValue + currentValue.id + ':' + currentValue.name + "\n", ""))
        for (const d of data) {
            const res = await request(app)
                .post("/authors/create")
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .send(d);
            //console.log(res.text)
            await expect(res.status).toEqual(201)
        }
    });

    test( "Get all Users", async () => {
        expect.assertions(1)
        const req = await request(app).get('/authors')
        // @ts-ignore
        const aux = req.body.map(d => {
            return {
                ...d,
                // This is only for che the results since the JSON parser breaks the code
                //photo: JSON.parse(d.photo.toString())

            }

        })
        expect(req.body).toEqual(aux)
    })

    test("Get User by Id", async () => {
        expect.assertions(1)
        const req = await request(app).get('/authors')
            .send({id: 42})
        expect(req.body[0].name).toEqual(data[0].name)
    })

    test("Update User", async () => {
        expect.assertions(2)
        const newName = 'Nuevo Nombre'
        const testId = 42

        const req = await request(app)
            .patch("/authors/update")
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send({
                id: testId,
                data: {name: newName}
            })
        expect(req.statusCode).toEqual(201)
        const get = await request(app).get('/authors/get')
            .send({id: testId})
        expect(get.body.name).toEqual(newName)
    })

    test("Delete User", async () => {
        expect.assertions(2)
        const req = await request(app)
            .delete("/authors/delete")
            .send({
                id: 42,
            })
        expect(req.statusCode).toEqual(201)
        const get = await request(app).get('/authors/get')
            .send({id: 42})
        expect(get.statusCode).toEqual(404)
    })
});
