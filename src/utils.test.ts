import {readFileSync} from "fs";
import {join} from "path"
import type {Author} from "@prisma/client";
import {invalidAuthor} from "./routes/utils";

const p = join(__dirname, '../__tests__/avatar_base64.txt')
const photo64 = readFileSync(p)
export const i_data: Author = {
    name: 'Elsa Prisma',
    photo: photo64,
    id: 42,
    photoType: 'data:image/jpeg;base64',
    about: '#One morning, when Gregor Samsa woke from troubled dreams.\n' +
        'One morning, when Gregor Samsa woke from troubled dreams, he found himself *transformed* in his bed into a horrible  [vermin](http://en.wikipedia.org/wiki/Vermin "Wikipedia Vermin"). He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover **strong** it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, link waved abouthelplessly as he looked. <cite>“What\'s happened to me?”</cite> he thought. It wasn\'t a dream. His room, a proper human room although a little too small, lay peacefully between its four familiar walls.</p>\n' +
        '\n' +
        '## The bedding was hardly able to cover it.\n' +
        '\n' +
        'It showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer a solid fur muff into which her entire forearm disappeared..\n' +
        '\n' +
        '### Things we know about Gregor\'s sleeping habits.\n' +
        '\n' +
        '- He always slept on his right side.\n' +
        '- He has to get up early (to start another dreadful day).\n' +
        '- He has a drawer and a alarm clock next to his bed.\n' +
        '- His mother calls him when he gets up to late.'

}
export const data = [
        i_data,
        {
            ...i_data,
            id: 41,
            name: 'Jonh Doe'
        },
        {
            ...i_data,
            id: 40,
            name: 'Testing Name'
        }
    ]

test('Checking Utils Functions', () => {
    expect(invalidAuthor(data[0])).toBeFalsy()
    expect(invalidAuthor(data[1])).toBeFalsy()
    expect(invalidAuthor(data[2])).toBeFalsy()
})
