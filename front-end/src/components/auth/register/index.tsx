import { Form, Input, Button } from 'antd';
import { useHistory } from 'react-router';
import { useRegisterMutation } from "../../../generated/graphql"

const RegistrationForm = () => {
  const [form] = Form.useForm();
  const [register, { data }] = useRegisterMutation();
  const history = useHistory();


  const onFinish = async (values: any) => {
    console.log('Received values of form: ', values);
    const response = await register({variables: {sid: values.sid, email: values.email, password: values.password}});
    if(response.data?.register.user) {
      history.push("/dashboard")
    }
  };

  return (
    <Form
      form={form}
      name="register"
      onFinish={onFinish}
      layout="vertical"
      scrollToFirstError
    >
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        tooltip="Your password should have minimum 1 lowercase character, 1 uppercase character and 1 number."
        rules={[
          {
            required: true,
            message: 'Please input your password!',
            
          },
          {
            validator(_, value) {
              if (!value ||/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/.test(value)) {
                return Promise.resolve()
              }
              return Promise.reject(new Error('The password that you entered should be stronger!'));
            }
          }
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="sid"
        label="SID"
        tooltip="Please enter your student identification number"
        rules={[
          {
            required: true,
            message: 'Please input your student identification number!',
            whitespace: true,
          },
          {
            validator(_, value) {
              if (!value|| value.length > 15){
                return Promise.resolve();
              }
              return Promise.reject(new Error('Student Id is not valid!'));
            }
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegistrationForm;