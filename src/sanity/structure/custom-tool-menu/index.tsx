import { ComponentType } from 'react';
import { ToolMenuProps } from 'sanity';

const CustomToolMenu: ComponentType<ToolMenuProps> = (props) => {
  const { tools, renderDefault } = props;
  const filterTools = tools.filter((tool) => tool.name === 'structure');
  return renderDefault({ ...props, tools: filterTools });
};

export default CustomToolMenu;
