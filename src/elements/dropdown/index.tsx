'use client';

import { DropdownArrow } from '@/elements/icons/dropdown-arrow';
import { useState } from 'react';

import type { DropDownProps as DropDownPrimitiveProps } from 'antd';
import { Dropdown } from 'antd';

import { cn } from '@/utils/classnames';

import { DropDownInterface } from './type';

function DropDown({
  items,
  onChange,
  label,
  placement = 'bottomRight',
  isSelect = false,
  panelClassName = '',
  controlClassName = '',
  labelRender,
  defaultSelected,
}: DropDownInterface & DropDownPrimitiveProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(defaultSelected);

  return (
    <div id="generic-dropdown">
      <Dropdown
        menu={{
          items,
          onClick: (e) => {
            if (isSelect) setSelectedItem(e);
          },
          id: 'generic-dropdown-panel',
          className: cn(panelClassName, ''),
          triggerSubMenuAction: 'click',
        }}
        trigger={['click']}
        placement={placement}
        onOpenChange={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        <span
          className={`dropdown-control ${controlClassName}`}
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          {labelRender?.(selectedItem?.key) || label || <span>{selectedItem?.key}</span>}
          <DropdownArrow className={`rotate-element dropdown-arrow ${isOpen ? 'on' : ''}`} />
        </span>
      </Dropdown>
    </div>
  );
}

export default DropDown;
