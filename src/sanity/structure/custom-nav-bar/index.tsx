import React, { ComponentType } from 'react';
import { Stack } from '@sanity/ui';
import { NavbarProps } from 'sanity';

const CustomNavBar: ComponentType<NavbarProps> = (props) => {
  return (
    <Stack>
      <div className="custom-nav-bar">{props.renderDefault(props)}</div>
    </Stack>
  );
};

export default CustomNavBar;
