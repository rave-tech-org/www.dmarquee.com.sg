const clickOutside = (element: HTMLElement, fn: () => void, ignoreClasses: string[] = []): (() => void) => {
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const ignoreElements = Array.from(document.getElementsByClassName(ignoreClasses.join(' ')));
    const shouldIgnore = ignoreElements.some(
      (ignoreElement) => ignoreElement.contains(target) || ignoreElement === target
    );
    if (element && !element.contains(target) && !shouldIgnore) {
      fn();
    }
  };

  document.addEventListener('mousedown', handleClickOutside);

  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
};

export default clickOutside;
