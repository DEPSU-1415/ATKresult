import './Signup.css';
import config from '../config.json';
import React, {useState} from 'react';
import { Helmet } from 'react-helmet';
import { Form, Input, Button, Checkbox } from 'antd';
import Icon from '../Icon';



const Signup = () => {
  const cfg = config.signup
  const loginLink = cfg.actions[0].links[0]

  const formFields = cfg.fields[0].input.reduce((obj, val) => {
    obj[val.name] = "";
    return obj
  }, {})

  const [formData, setFormData] = useState(formFields)
  
  const onSubmit = () => {
    fetch('/register', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: formData.username,
        password: formData.password,
      }),
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(data => {
      console.log('Success:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  const onSubmitFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return(
  <div>
    <Helmet>
      <title>Signup</title>
    </Helmet>

    <Form className="signup-form" onFinish={onSubmit}  onFinishFailed={onSubmitFailed} autoComplete="off">
      <h1 className="form-title">{cfg.title}</h1>
      
      {cfg.fields[0].input.map((input, inputIdx) => (
        <Form.Item
          key={inputIdx}
          name={input.name}
          rules={input.rules}
        >
          <Input
            prefix={<Icon name={input.options.icon}/>}
            type={input.type}
            placeholder={input.placeholder}
            autoComplete={input.options.autocomplete.toString()}
            onChange={(e) => setFormData({...formData, [input.name]: e.target.value})}
            value={formData.name} 
          />
        </Form.Item>
      ))}
    <Form.Item>
      {cfg.actions[0]
      .buttons.filter(button => button.display === true)
      .map((btn, btnIdx) => (
        <Button
            key={btnIdx}
            type={btn.type}
            htmlType="submit"
            className="signup-form-button"
          >
            {btn.value}
        </Button>
      ))}
      <div>
        {loginLink.prefix}
        <a href={loginLink.url}>
          {" "} {loginLink.value}
        </a>
      </div>
    </Form.Item>
    </Form>
  </div>
  )
}

export default Signup