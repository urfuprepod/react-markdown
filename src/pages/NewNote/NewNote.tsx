import NoteForm from "./components/NoteForm";
import { NoteData, Tag } from "../../entities/model";
import { FC } from "react";
import { useNote } from "../NoteLayout/NoteLayout";

type NewNoteProps = {
    onSubmit: (data: NoteData, id: string | undefined) => void;
    onAddTag: (tag: Tag) => void;
    availableTags: Tag[];
};

const NewNote: FC<NewNoteProps> = (props: NewNoteProps) => {

    const note = useNote();

    return (
        <>
            <h1 className="mb-4">New Note</h1>
            <NoteForm {...props} note={note} />
        </>
    );
};

export default NewNote;
