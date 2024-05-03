import './Login.css';
import config from '../config.json';
import React, {useState} from 'react';
import { Helmet } from 'react-helmet';
import { Form, Input, Button, Checkbox } from 'antd';
import Icon from '../Icon';



const Login = () => {
  const cfg = config.login
  const signUpLink = cfg.actions[0].links[0]
  const forgetPWLink = cfg.actions[0].links[1]

  const formFields = cfg.fields[0].input.reduce((obj, val) => {
    obj[val.name] = "";
    obj["rememberMe"] = false;
    return obj
  }, {})

  const [formData, setFormData] = useState(formFields)
  
  const onSubmit = () => {
    console.log("Submitted values:", formData);
  };

  const onSubmitFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return(
  <div>
    <Helmet>
      <title>Login</title>
    </Helmet>

    <Form className="login-form" onFinish={onSubmit}  onFinishFailed={onSubmitFailed} autoComplete="off">
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
      <Checkbox 
        onChange={(e) => setFormData({...formData, rememberMe: e.target.checked})}
        value={formData.name}
      >
        Remember me
      </Checkbox>
      <a className="login-form-forgot" href={forgetPWLink.url}>
        Forgot password
      </a>
      {cfg.actions[0]
      .buttons.filter(button => button.display === true)
      .map((btn, btnIdx) => (
        <Button
            key={btnIdx}
            type={btn.type}
            htmlType="submit"
            className="login-form-button"
          >
            {btn.value}
        </Button>
      ))}
      <div>
        {signUpLink.prefix}
        <a href={signUpLink.url}>
          {" "} {signUpLink.value}
        </a>
      </div>
    </Form.Item>
    </Form>
  </div>
  )
}

export default Login