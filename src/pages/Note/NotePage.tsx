import React from "react";
import { useNote } from "../NoteLayout/NoteLayout";
import { Button, Col, Row, Stack } from "react-bootstrap";
import TagList from "../../entities/UI/TagList/TagList";
import { Link, Navigate } from "react-router-dom";
import ReactMarkdown from 'react-markdown';

const NotePage = () => {
    const note = useNote();

    if (!note) return <Navigate to="/" />

    const { id, title, tags, markdown } = note;

    return (
        <>
            <Row className="align-items-center mb-4">
                <Col>
                    <h1>{title}</h1>
                    {!!tags.length && <TagList tags={tags} />}
                </Col>
                <Col xs="auto">
                    <Stack gap={2} direction="horizontal">
                        <Link to={`/${id}/edit`}>
                            <Button variant="primary">Edit</Button>
                        </Link>
                        <Button variant="outline-danger">Delete</Button>
                        <Link to="/">
                            <Button variant="outline-secondary">Back</Button>
                        </Link>
                    </Stack>
                </Col>
            </Row>
            <ReactMarkdown>{markdown}</ReactMarkdown>
        </>
    );
};

export default NotePage;