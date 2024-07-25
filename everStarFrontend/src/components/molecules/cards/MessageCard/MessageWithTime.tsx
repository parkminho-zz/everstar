import { Message } from '../../Message';

interface IProps {
  flag: boolean;
  contents: string;
  time: string;
}

export const MessageWithTime = ({ flag, contents, time }: IProps) => {
  return (
    <div className="flex w-[293px]">
      {flag ? (
        <div className="flex w-full gap-2">
          <Message color="orange">{contents}</Message>
          <label className="text-base font-medium leading-6 text-[#CCCCCC] mt-3">{time}</label>
        </div>
      ) : (
        <div className="flex items-end w-full gap-2">
          <label className="text-base font-medium leading-6 text-[#CCCCCC] mt-3">{time}</label>
          <Message color="gray">{contents}</Message>
        </div>
      )}
    </div>
  );
};
