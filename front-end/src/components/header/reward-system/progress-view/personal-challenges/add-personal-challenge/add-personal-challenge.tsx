import { Button, Form, Input, notification } from "antd";
import {
  GetPersonalChallengesDocument,
  useCreateChallengeMutation,
} from "../../../../../../generated/graphql";

import "./add-personal-challenge.css";

const AddPersonalChallenge = ({
  showNewChallengeForm,
  setShowNewChallengeForm,
  setShowSystemChallenges,
}) => {
  const [createChallenge] = useCreateChallengeMutation({
    awaitRefetchQueries: true,
    refetchQueries: [{ query: GetPersonalChallengesDocument }],
  });

  const handleAddChallenge = async values => {
    if (values.challenge) {
      setShowNewChallengeForm(!showNewChallengeForm);
      setShowSystemChallenges(true);
      try {
        const response = await createChallenge({
          variables: {
            content: values.challenge,
            isSystemChallenge: false,
          },
        });
        if (response) {
          notification.success({
            message: "Your challenge was successfully added.",
          });
        }
      } catch (err: any) {
        console.log(err);
        notification.error({
          message: "Oops, there was a problem with your request.",
        });
      }
    }
  };

  return (
    <>
      <p>Define a new challenge</p>
      <Form name="personalChallengeForm" onFinish={handleAddChallenge}>
        <Input.Group compact>
          <Form.Item name="challenge" className="challenge-wrapper">
            <Input placeholder="Add your challenge" allowClear />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Input.Group>
      </Form>
    </>
  );
};

export default AddPersonalChallenge;
