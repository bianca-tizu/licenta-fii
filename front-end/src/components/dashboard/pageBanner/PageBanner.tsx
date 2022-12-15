import React from "react";

import { Input } from "antd";

import {
  Question,
  useSearchQuestionsLazyQuery,
} from "../../../generated/graphql";

import HorizontalMenu from "../../header/HorizontalMenu";

import { ReactComponent as PageBannerSVG } from "../../../assets/page_banner.svg";
import "./page-banner.css";
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
        variables: { keyword: keyword },
      });
    }
  };

  const handleChange = event => {
    if (event.type !== "change") {
      setSearchResults("");
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
            onChange={handleChange}
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
