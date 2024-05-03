import './ATKReportUser.css';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Form, Input, Button, Select, message } from 'antd';
import Icon from '../UserAccount/Icon';
import axios from 'axios';
import config from '../UserAccount/config.json';

const ATKReportUser = () => {
  const [formData, setFormData] = useState({
    photo: null,
    result: null,
  });

  const atkReportConfig = config.atkReport;

  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append('photo', values.photo.file);
      formData.append('result', values.result);

      const response = await axios.post('/api/report', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle successful submission
      message.success('ATK report submitted successfully');
      console.log('ATK report submitted successfully');
    } catch (error) {
      // Handle submission error
      message.error('Error submitting ATK report');
      console.error('Error submitting ATK report:', error);
    }
  };

  const onSubmitFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <Helmet>
        <title>Self-Reporting ATK Result</title>
      </Helmet>
      <Form
        className="atkreport-form"
        onFinish={onSubmit}
        onFinishFailed={onSubmitFailed}
        autoComplete="off"
        initialValues={formData}
      >
        <h1 className="atkreport-form-title">{atkReportConfig.title}</h1>
        {atkReportConfig.fields[0].input.map((input, inputIdx) => (
          <Form.Item
            key={inputIdx}
            name={input.name}
            rules={input.rules}
            label={input.label}
          >
            {input.type === 'file' ? (
              <Input
                type={input.type}
                prefix={<Icon name={input.options.icon} />}
                placeholder={input.placeholder}
                onChange={(e) => setFormData({ ...formData, [input.name]: e.target.files[0] })}
              />
            ) : (
              <Select
                placeholder={input.placeholder}
                onChange={(value) => setFormData({ ...formData, [input.name]: value })}
              >
                {input.options.choices.map((choice) => (
                  <Select.Option key={choice.value} value={choice.value}>
                    {choice.label}
                  </Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>
        ))}
        <Form.Item>
          {atkReportConfig.actions[0].buttons
            .filter((button) => button.display === true)
            .map((btn, btnIdx) => (
              <Button
                key={btnIdx}
                type={btn.type}
                htmlType={btn.htmlType}
                className="atkreport-form-button"
              >
                {btn.value}
              </Button>
            ))}
        </Form.Item>
      </Form>
    </div>
  );
};

export default ATKReportUser;