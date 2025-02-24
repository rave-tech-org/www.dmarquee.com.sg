import { Stack } from '@sanity/ui';
import type { ComponentType } from 'react';
import type { NavbarProps } from 'sanity';
import './styles.scss';

const CustomNavBar: ComponentType<NavbarProps> = (props) => {
  return (
    <Stack>
      <div className="custom-nav-bar">{props.renderDefault(props)}</div>
    </Stack>
  );
};

export default CustomNavBar;
