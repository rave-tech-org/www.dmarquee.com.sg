'use client';

import Portal from '@/elements/portal';
import { useTransition, animated } from '@react-spring/web';
import { DropdownArrow } from '@/elements/icons/dropdown-arrow';
import { useState, useRef, useLayoutEffect, useMemo, CSSProperties, useEffect } from 'react';

import { OptionItem, SelectProps } from './type';
import eventOnMount from '@/hooks/events/event-on-mount';
import clickOutside from '@/hooks/events/click-outside';

function Select({
  items,
  onChange,
  label,
  isSelect = false,
  panelClassName,
  controlClassName,
  labelRender,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<OptionItem>(items[0]);
  const componentRef = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);

  const transitions = useTransition(isOpen, {
    from: { opacity: 0, transformOrigin: 'top', transform: 'scaleY(0)' },
    enter: { opacity: 1, transformOrigin: 'top', transform: 'scaleY(1)' },
    leave: { opacity: 0, transformOrigin: 'top', transform: 'scaleY(0)' },
    config: { tension: 300, friction: 20 },
  });

  useLayoutEffect(() => {
    if (isOpen && componentRef.current) {
      const boundingRect = componentRef.current.getBoundingClientRect();
      setRect(boundingRect);
    }
  }, [isOpen]);

  const handleItemClick = (item: OptionItem) => {
    if (isSelect) {
      setSelectedItem(item);
    }
    setIsOpen(false);
    onChange?.(item);
    item.onClickItem?.();
  };

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const positionStyles: CSSProperties = useMemo(() => {
    if (!rect) return {};
    return {
      position: 'absolute',
      top: `${rect?.bottom}px`,
      left: `${rect?.left}px`,
      width: `${rect?.width}px`,
      zIndex: 9999,
    };
  }, [rect]);

  const renderItems = () =>
    transitions(
      (styles, item) =>
        item && (
          <animated.ul style={styles} className="select-panel">
            {items.map((item, key) => (
              <li key={`menu-select-item-${key}`} onClick={() => handleItemClick(item)}>
                {item.icon && <span className="item-icon">{item.icon}</span>}
                {item.label}
              </li>
            ))}
          </animated.ul>
        )
    );

  useEffect(() => {
    if (componentRef.current) {
      clickOutside(componentRef.current, () => setIsOpen(false), ['select-panel']);
    }
    eventOnMount('resize', () => setIsOpen(false));
  }, [isSelect]);

  return (
    <div id="generic-select" ref={componentRef}>
      <div className={`select-control ${controlClassName}`} onClick={toggleOpen}>
        {labelRender?.(selectedItem.label) || label || <span>{selectedItem.label}</span>}
        <DropdownArrow className={`rotate-element select-arrow ${isOpen ? 'on' : ''}`} />
      </div>

      <Portal containerId="generic-select-panel" className={panelClassName}>
        <div style={positionStyles}>{renderItems()}</div>
      </Portal>
    </div>
  );
}

export default Select;
