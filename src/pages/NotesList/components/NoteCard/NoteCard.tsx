import React, { FC } from "react";
import { Note } from "../../../../entities/model";
import { Badge, Card, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from './styles.module.css';
import TagList from "../../../../entities/UI/TagList/TagList";

const NoteCard: FC<{ note: Note }> = ({ note }) => {
    const { id, title, tags } = note;

    return (
        <Card as={Link} to={`/${id}`} className={`h-100 text-decoration-none text-reset ${styles.card}`}>
            <Card.Body>
                <Stack
                    gap={2}
                    className="align-items-center justify-content-center"
                >
                    <span className="fs-5">{title}</span>
                    {!!tags.length && <TagList tags={tags} isCenter />}
                </Stack>
            </Card.Body>
        </Card>
    );
};

export default NoteCard;
