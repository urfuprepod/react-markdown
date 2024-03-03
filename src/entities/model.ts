export type NoteData = {
    title: string;
    markdown: string;
    tags: Tag[];
}

export type Tag = {
    id: string;
    label: string;
}

export type Note = {
    id: string;
} & NoteData

export type RawNoteData = {
    title: string;
    markdown: string;
    tagIds: string[]
};

export type RawNote = {
    id: string;
} & RawNoteData;

export type NoteListFilters = {
    title: string;
    selectedTags: Tag[]
}

export type NoteListFiltersKeys = keyof NoteListFilters;