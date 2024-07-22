import React from "react";

interface IExmapleButtonProps {
  btnText: string;
  func: () => void;
}

//공통적으로 사용하는 작은 컴포넌트 (버튼, 입력 필드 등)
const ExampleButton = ({ btnText, func }: IExmapleButtonProps) => {
  //전달받은 props 사용
  return <button onClick={func}>{btnText}</button>;
};

export default ExampleButton;
