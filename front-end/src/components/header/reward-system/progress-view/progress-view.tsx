import { Divider } from "antd";
import Card from "antd/lib/card/Card";

const ProgressView = () => {
  return (
    <div className="progress-wrapper">
      <h3 className="progress-title">The Challenging Side</h3>
      <Card title="Progress">
        <p>Content</p>
      </Card>
      <Card title="Challenges">
        <p>Content</p>
      </Card>
    </div>
  );
};

export default ProgressView;
