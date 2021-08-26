interface Note {
    title: string;
    subtitle?: string;
    content?: string;
    tags?: string[];
    _id?: string;
    owner?: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
}

interface NoteWDate extends Note {
    date: Date;
}

function isTitleValid(title: string): boolean {
    // check if title is a string
    if (typeof title !== 'string') return false;
    // check if title is not empty
    if (title.length === 0) return false;
    // check if title is not too long
    if (title.length > 40) return false;
    return true;
}

function isSubtitleValid(subtitle: string): boolean {
    // check if subtitle is a string or undefined
    if ( subtitle == undefined ) return true;
    if (typeof subtitle !== 'string') return false;
    // subtitle is optional so it can be empty
    return subtitle.length <= 40;
}

function isContentValid(content: string): boolean {
    if (content == undefined) return true;
    // check if content is a string
    if (typeof content !== 'string') return false;
    // check if content is not empty
    if (content.length === 0) return false;
    // check if content is not too long
    if (content.length > 400) return false;
    return true;
}

function areTagsValid(tags: string[]): boolean {
    if (tags == undefined) return true;
    // check if tags is an array
    if ( !Array.isArray(tags) ) return false;
    // check if tags is not empty
    if (tags.length === 0) return false;
    // check if tags is not too long
    if (tags.length > 5) return false;
    // check if tags are strings
    for (let tag of tags) {
        if (typeof tag !== 'string') return false;
    }
    return true;
}

export { Note, NoteWDate, isTitleValid, isSubtitleValid, isContentValid, areTagsValid };