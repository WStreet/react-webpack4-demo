import React from 'react';
import './index.less'
import avatar from '../../public/img/avatar.jpg'

export default () => {
  return (
    <div className="container">
      <h1>Hello 步行街</h1>
      <div className="avatar-wrapper">
        <img className="avatar" src={avatar} />
      </div>
    </div>
  )
}