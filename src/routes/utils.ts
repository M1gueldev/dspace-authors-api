import type {Author} from "@prisma/client";
export function invalidAuthor(data: Author) {
    return !data.about || data.about === '' ||
       !data.name || data.name === '' ||
       !data.photo || data.photo.length === 0 ||
       !data.photoType || data.photoType === '' ||
        !data
}
