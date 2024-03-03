import React, { FC } from "react";
import { Note } from "../../entities/model";
import { Navigate, Outlet, Routes, useParams, Route, useOutletContext } from "react-router-dom";

type NoteLayoutProps = {
    notes: Note[];
};

const NoteLayout: FC<NoteLayoutProps> = ({ notes }: NoteLayoutProps) => {
    const { id } = useParams();
    const note = notes.find((currentNote) => currentNote.id === id);
    // if (!note) return <Navigate to="/" />;

    return (
        <Outlet context={note} />
    );
};

export function useNote() {
  return useOutletContext<Note|undefined>();
}

export default NoteLayout;
