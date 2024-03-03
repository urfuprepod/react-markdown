import React, { useState, FC, useMemo } from "react";
import { Form, Row, Stack, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import {
    NoteListFilters,
    NoteListFiltersKeys,
    Tag,
    Note,
} from "../../entities/model";
import NoteCard from "./components/NoteCard/NoteCard";

type NoteListProps = {
    availableTags: Tag[];
    notes: Note[];
};

const NotesList: FC<NoteListProps> = (props: NoteListProps) => {
    const { availableTags, notes } = props;

    function updateFilters(
        name: NoteListFiltersKeys,
        value: NoteListFilters[NoteListFiltersKeys]
    ) {
        setFilters((prev) => ({ ...prev, [name]: value }));
    }

    const [filters, setFilters] = useState<NoteListFilters>({
        title: "",
        selectedTags: [],
    });

    const filteredNotes = useMemo<Note[]>(() => {
        const { title, selectedTags } = filters;
        return notes.filter((note) => {
            return (
                (!title ||
                    note.title.toLowerCase().includes(title.toLowerCase())) &&
                (!selectedTags.length || selectedTags.every(tag => note.tags.some(noteTag => noteTag.id === tag.id)))
            );
        });
    }, [filters, notes]);

    return (
        <>
            <Row className="align-items-center mb-4">
                <Col>
                    <h1>Notes</h1>
                </Col>
                <Col xs="auto">
                    <Stack gap={2} direction="horizontal">
                        <Link to="/new">
                            <Button variant="primary">Create</Button>
                        </Link>
                        <Button variant="outline-secondary">Edit Tags</Button>
                    </Stack>
                </Col>
            </Row>
            <Form>
                <Row className="mb-4">
                    <Col>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                onChange={(e) =>
                                    updateFilters("title", e.target.value)
                                }
                                type="text"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="tags">
                            <Form.Label>Tags</Form.Label>
                            <ReactSelect
                                isMulti
                                value={filters.selectedTags.map(
                                    ({ label, id }) => ({
                                        label,
                                        value: id,
                                    })
                                )}
                                onChange={(tags) =>
                                    updateFilters(
                                        "selectedTags",
                                        tags.map(({ label, value }) => ({
                                            label,
                                            id: value,
                                        }))
                                    )
                                }
                                options={availableTags.map(({ label, id }) => ({
                                    label,
                                    value: id,
                                }))}
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
            <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
                {filteredNotes.map((note) => (
                    <Col key={note.id}>
                        <NoteCard note={note} />
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default NotesList;
