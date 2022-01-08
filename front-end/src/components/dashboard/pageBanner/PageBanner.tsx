import React from "react";
import { Card } from "antd";

const PageBanner = () => {
  const pageBannerPath = "../../../../assets/page_banner";

  return (
    <div className="page-banner">
      <Card
        style={{ width: 300 }}
        cover={<img src={pageBannerPath} alt="Page Banner" />}
      />
    </div>
  );
};

export default PageBanner;
