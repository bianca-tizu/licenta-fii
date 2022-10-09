import React from "react";

import { Form, Input } from "antd";

import {
  Question,
  useSearchQuestionsLazyQuery,
  useSearchQuestionsQuery,
} from "../../../generated/graphql";

import HorizontalMenu from "../../header/HorizontalMenu";

import { ReactComponent as PageBannerSVG } from "../../../assets/page_banner.svg";
import "./page-banner.css";
import { useLazyQuery } from "@apollo/client";
import QuestionsContext from "../../../contexts/QuestionsProvider";

const { Search } = Input;

const PageBanner = ({ isDraftVisible, setIsDraftVisible }) => {
  const [isSearchVisible, setIsSearchVisible] = React.useState(false);
  const { setSearchResults } = React.useContext(QuestionsContext);

  const [
    searchQuestions,
    { loading, error, data },
  ] = useSearchQuestionsLazyQuery({
    onCompleted(data) {
      setSearchResults(data.searchQuestions as Question[]);
    },
  });

  const handleSearch = (keyword: string) => {
    if (keyword) {
      searchQuestions({
        variables: { keyword: keyword, isDraft: isDraftVisible },
      });
    }
  };

  return (
    <>
      <div className="banner-container">
        <p className="title-banner">FII TALKS</p>
        <HorizontalMenu
          isSearchVisible={isSearchVisible}
          setIsSearchVisible={setIsSearchVisible}
          isDraftVisible={isDraftVisible}
          setIsDraftVisible={setIsDraftVisible}
        />
        <PageBannerSVG className="image-banner" />
      </div>
      {isSearchVisible && (
        <div className="search-bar">
          <Search
            style={{ width: "50%" }}
            placeholder="Search here"
            onSearch={handleSearch}
            enterButton
            allowClear
            size="middle"
          />
        </div>
      )}
    </>
  );
};

export default PageBanner;
