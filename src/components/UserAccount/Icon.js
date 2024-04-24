import React from 'react';
import {LockOutlined, UserOutlined} from '@ant-design/icons';

const style = { color: 'rgba(0,0,0,.25)' }

const icons = {
  useroutlined: (<UserOutlined style={style} />),
  lockoutilined: (<LockOutlined style={style} />)
};


const Icon = (props) => {
  return (
    <>{icons[props.name]}</>
  )
};

export default Icon;