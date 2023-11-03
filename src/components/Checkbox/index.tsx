const Checkbox = (props: { checked: boolean; onChange: () => void }) => {
  const { checked, onChange } = props;
  return (
    <input
      type="checkbox"
      name=""
      checked={checked}
      title="选择"
      onChange={onChange}
      className="w-4 h-4"
    />
  );
};

export default Checkbox;
