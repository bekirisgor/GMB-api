import React from 'react';
import { Menu, Container, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import rimoilogo from '../../static/logo-light.png';

const NavBar = () => {
  return (
    <Container>
      <Menu inverted fixed="top" style={{ maxHeight: '75px', backgroundColor: '#17181a' }}>
        <Image src={rimoilogo} size="small" style={{ margin: '10px' }} />
        <Container
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Menu.Item>
            <Link to="/"> Home</Link>
          </Menu.Item>

          <Menu.Item>
            <Link to="/accounts"> Accounts</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/locations"> Location</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/reviews"> Reviews</Link>
          </Menu.Item>
        </Container>
      </Menu>
    </Container>
  );
};

export default NavBar;
