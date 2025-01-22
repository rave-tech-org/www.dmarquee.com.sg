import type { ComponentType } from 'react';
import type { ToolMenuProps } from 'sanity';

const CustomToolMenu: ComponentType<ToolMenuProps> = (props) => {
  const { tools, renderDefault } = props;
  const filtered = ['structure', 'media', 'presentation'];

  const filterTools = tools.filter((tool) => filtered.includes(tool.name));
  return renderDefault({ ...props, tools: filterTools });
};

export default CustomToolMenu;
