const Divider = (props: { content: string; textClassName?: string }) => {
  const { content, textClassName } = props;
  return (
    <div className="flex items-center justify-center my-2 text-base">
      <div className="h-[1px] grow bg-slate-300 mr-2" />
      <div className={textClassName}>{content}</div>
      <div className="h-[1px] grow bg-slate-300 ml-2" />
    </div>
  );
};

export default Divider;
