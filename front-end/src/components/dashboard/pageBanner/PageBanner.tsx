import React from "react";

import { Input } from "antd";

import HorizontalMenu from "../../header/HorizontalMenu";

import { ReactComponent as PageBannerSVG } from "../../../assets/page_banner.svg";
import "./page-banner.css";

const { Search } = Input;

const PageBanner = ({ isDraftVisible, setIsDraftVisible }) => {
  const [isSearchVisible, setIsSearchVisible] = React.useState(false);

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
            onSearch={() => console.log("SEARCH PERFORMED")}
            enterButton
            size="middle"
          />
        </div>
      )}
    </>
  );
};

export default PageBanner;
