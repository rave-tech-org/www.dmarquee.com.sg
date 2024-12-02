const eventOnMount = (eventName: string, fn: () => void): (() => void) => {
  const handleFn = () => {
    fn();
  };

  window.addEventListener(eventName, handleFn);

  return () => {
    window.removeEventListener(eventName, handleFn);
  };
};

export default eventOnMount;
