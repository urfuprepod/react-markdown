import { Container } from "react-bootstrap";
import { Routes, Route, Navigate } from "react-router-dom";
import NewNote from "./pages/NewNote/NewNote";
import { RawNote, Tag, NoteData, Note } from "./entities/model";
import { useLocalStorage } from "./entities/hooks/useLocalStorage";
import { useEffect, useMemo } from "react";
import { v4 as uuidV4 } from "uuid";
import NotesList from "./pages/NotesList/NotesList";
import NoteLayout from "./pages/NoteLayout/NoteLayout";
import NotePage from "./pages/Note/NotePage";

const App = () => {
    const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
    const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

    const notesWithTags = useMemo<Note[]>(() => {
        return notes.map(({ title, markdown, tagIds, id }) => ({
            title,
            id,
            markdown,
            tags: tags.filter((tag) => tagIds.includes(tag.id)),
        }));
    }, [tags, notes]);

    function onMutateNote({ tags, ...data }: NoteData, id: string | undefined) {
        setNotes((prev) => {
            if (!id)
                return [
                    ...prev,
                    {
                        ...data,
                        id: uuidV4(),
                        tagIds: tags.map((tag) => tag.id),
                    },
                ];
            return prev.map((note) =>
                note.id === id
                    ? { ...data, id, tagIds: tags.map((tag) => tag.id) }
                    : note
            );
        });
    }

    function onAddTag(tag: Tag) {
        setTags((prev) => [...prev, tag]);
    }

    return (
        <Container>
            <Routes>
                <Route
                    path="/"
                    element={
                        <NotesList availableTags={tags} notes={notesWithTags} />
                    }
                />
                <Route
                    path="/new"
                    element={
                        <NewNote
                            availableTags={tags}
                            onAddTag={onAddTag}
                            onSubmit={onMutateNote}
                        />
                    }
                />
                <Route
                    path="/:id"
                    element={<NoteLayout notes={notesWithTags} />}
                >
                    <Route index element={<NotePage />} />
                    <Route
                        path="edit"
                        element={
                            <NewNote
                                availableTags={tags}
                                onAddTag={onAddTag}
                                onSubmit={onMutateNote}
                            />
                        }
                    />
                </Route>
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Container>
    );
};

export default App;
