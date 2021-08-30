import React from 'react';
import { Menu } from 'antd';
import { useSelector } from 'react-redux';

function LeftMenu(props) {
  const user = useSelector(state => state.user);
  return (
    <Menu mode={props.mode}>
    <Menu.Item key="home">
      <a href="/">Home page</a>
    </Menu.Item>
    <Menu.Item key="favorite">
      {(user.userData && user.userData.isAuth) &&
        <a href="/favorite">Favorites</a>
      }
    </Menu.Item>
  </Menu>
  )
}

export default LeftMenu