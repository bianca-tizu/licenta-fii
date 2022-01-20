import React from "react";
import { Input, Tag } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const Tags = ({ tags, setTags }: any) => {
  const [tagInputVisible, setTagInputVisible] = React.useState(false);
  const [tagInputValue, setTagInputValue] = React.useState("");

  const handleRemoveTag = (removedTag: String) => {
    const leftTags = tags.filter((tag: string) => tag !== removedTag);
    setTags(leftTags);
  };

  const handleTagInputChange = (event: any) => {
    setTagInputValue(event.target.value);
  };

  const handleInputConfirm = () => {
    if (tagInputValue && tags.indexOf(tagInputValue) === -1) {
      setTags([...tags, tagInputValue]);
    }
    setTagInputValue("");
    setTagInputVisible(false);
  };

  const tagElementsMap = (tag: string) => {
    const tagElement = (
      <Tag
        closable
        onClose={(event) => {
          event.preventDefault();
          handleRemoveTag(tag);
        }}
      >
        {tag}
      </Tag>
    );

    return (
      <span key={tag} style={{ display: "inline-block" }}>
        {tagElement}
      </span>
    );
  };

  const tagChild = tags.length ? tags.map(tagElementsMap) : [];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>{tagChild}</div>
      {tagInputVisible && (
        <Input
          type="text"
          size="small"
          style={{ width: 78 }}
          value={tagInputValue}
          onChange={handleTagInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!tagInputVisible && (
        <Tag
          onClick={() => {
            setTagInputVisible(true);
          }}
          style={{ background: "#fff", borderStyle: "dashed" }}
        >
          <PlusOutlined /> New Tag
        </Tag>
      )}
    </div>
  );
};

export default Tags;
