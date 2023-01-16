import { notification } from "antd";

const ErrorHandler = ({ error }) => {
  return (
    <>
      {error.message
        ? notification.error({ message: "Oh, no!", description: error.message })
        : notification.error({
            message: "Oh, no!",
            description: "It seems that there is a problem.",
          })}
    </>
  );
};

export default ErrorHandler;
