export const AvatarSquare = () => {
  const avatarSrc = require('../../../../assets/symbols/avatar.png');

  return (
    <div className=" w-[340px] h-[250px] self-stretch">
      <img src={avatarSrc} alt="반려동물 프로필 사진" />
    </div>
  );
};
