export default function getComponentProps(prop: any) {
  if (prop && typeof prop === 'object') {
      return prop;
  }
  return {};
}
