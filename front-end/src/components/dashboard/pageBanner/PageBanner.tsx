import React from "react";
import { ReactComponent as PageBannerSVG } from "../../../assets/page_banner.svg";

import { Input } from "antd";

import {
  Question,
  useSearchQuestionsLazyQuery,
} from "../../../generated/graphql";

import HorizontalMenu from "../../header/HorizontalMenu";
import QuestionsContext from "../../../contexts/QuestionsProvider";

import "./page-banner.css";

const { Search } = Input;

const PageBanner = ({ isDraftVisible, setIsDraftVisible }) => {
  const [isSearchVisible, setIsSearchVisible] = React.useState(false);
  const { setSearchResults } = React.useContext(QuestionsContext);

  const [searchQuestions] = useSearchQuestionsLazyQuery({
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
        <p className="title-banner">FII NETWORKING</p>
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
