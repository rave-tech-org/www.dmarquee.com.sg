export const styles = (styles: { [key: string]: string | boolean }) => {
  const styleNames = Object.entries(styles)
    .filter(([, value]) => value)
    .map(([key]) => key);
  return styleNames.join(' ');
};
