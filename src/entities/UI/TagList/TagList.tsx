import React, { FC } from "react";
import { Tag } from "../../model";
import { Stack, Badge } from "react-bootstrap";
import classNames from "classnames";

type TagListProps = {
    tags: Tag[];
    isCenter?: boolean;
};

const TagList: FC<TagListProps> = React.memo((props: TagListProps) => {
    const { tags, isCenter } = props;

    return (
        <Stack
            gap={1}
            direction="horizontal"
            className={classNames("flex-wrap", {
                "justify-content-center": isCenter,
            })}
        >
            {tags.map((tag) => (
                <Badge className="text-truncate" key={tag.id}>
                    {tag.label}
                </Badge>
            ))}
        </Stack>
    );
});

export default TagList;
