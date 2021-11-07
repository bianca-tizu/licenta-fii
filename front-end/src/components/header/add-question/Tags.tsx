import React from "react";
import { Form, Select, Button, Upload, Input, Tag } from "antd";
import { InboxOutlined, PlusOutlined } from "@ant-design/icons";

const Tags = () => {
  const [inputVisible, setInputVisible] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [tags, setTags] = React.useState(["Tag 1", "Tag 2", "Tag 3"]);

  const handleClose = (removedTag: String) => {
    const leftTags = tags.filter((tag) => tag !== removedTag);
    console.log(leftTags);
    setTags(leftTags);
  };

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
    }
    setInputValue("");
  };

  const forMap = (tag: string) => {
    const tagElem = (
      <Tag
        closable
        onClose={(e) => {
          e.preventDefault();
          handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    );
    return (
      <span key={tag} style={{ display: "inline-block" }}>
        {tagElem}
      </span>
    );
  };

  const tagChild = tags.map(forMap);

  return (
    <div>
      <div style={{ marginBottom: 16 }}>{tagChild}</div>
      {inputVisible && (
        <Input
          type="text"
          size="small"
          style={{ width: 78 }}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag
          onClick={() => {
            setInputVisible(true);
          }}
          className="site-tag-plus"
        >
          <PlusOutlined /> New Tag
        </Tag>
      )}
    </div>
  );
};

export default Tags;
