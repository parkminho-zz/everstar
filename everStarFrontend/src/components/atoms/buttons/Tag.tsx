interface ITagProps {
  children: React.ReactNode;
}

export const Tag = ({ children }: ITagProps) => {
  return (
    <div className="inline-flex items-center justify-center px-4 py-2 bg-greyscaleblack-20 border border-[var(--greyscale-black20,#F0F2F6) rounded-[8px] shadow-small ">
      <label className="kor-p-p4 text-greyscaleblack-100">{children}</label>
    </div>
  );
};
