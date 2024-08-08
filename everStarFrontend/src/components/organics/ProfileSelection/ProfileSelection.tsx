import React, { useState, useEffect } from 'react';
import { Avatar } from 'components/atoms/symbols/Avatar/Avatar';
import { CircleButton } from 'components/atoms/buttons/CircleButton';
import { useNavigate } from 'react-router-dom'; // 리액트 라우터를 사용하여 페이지 이동
import { useSelector, useDispatch } from 'react-redux'; // Redux 사용
import { RootState } from 'store/Store';
import { useFetchPetDetails } from 'hooks/usePets';
import { setPetDetails } from 'store/slices/petSlice'; // Redux 액션

export interface AvatarData {
  id: number;
  src?: string;
  size: 'small' | 'medium' | 'large';
  name?: string;
}

export interface ProfileSelectionProps {
  avatars: AvatarData[];
  onAddAvatar: () => void;
  onAvatarClick?: (index: number) => void;
}

export const ProfileSelection: React.FC<ProfileSelectionProps> = ({
  avatars,
  onAddAvatar,
  onAvatarClick,
}) => {
  const [selectedPetId, setSelectedPetId] = useState<number | null>(null);
  const token = useSelector((state: RootState) => state.auth.accessToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    mutate: fetchPetDetails,
    data: petDetails,
    error: petDetailsError,
  } = useFetchPetDetails(selectedPetId ?? 0, token);

  useEffect(() => {
    if (selectedPetId !== null) {
      console.log('Fetching pet details for pet ID:', selectedPetId);
      fetchPetDetails();
    }
  }, [selectedPetId, fetchPetDetails]);

  useEffect(() => {
    if (petDetails) {
      console.log('Fetched pet details:', petDetails);
      // petDetails를 Redux 스토어에 저장
      dispatch(setPetDetails(petDetails));
      navigate('/earth');
    }

    if (petDetailsError) {
      console.error('Error fetching pet details:', petDetailsError);
    }
  }, [petDetails, petDetailsError, dispatch, navigate]);

  const handleAvatarClick = (index: number) => {
    const petId = avatars[index].id;
    console.log('Avatar clicked, pet ID:', petId);
    setSelectedPetId(petId);
    if (onAvatarClick) {
      onAvatarClick(index);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white w-full max-w-[832px] mx-auto">
      <h1 className="mb-4 text-2xl font-semibold text-greyscaleblack-100">
        여행을 함께 할 친구를 선택해주세요
      </h1>
      <div className="flex flex-wrap justify-center w-full gap-8">
        {avatars.map((avatar, index) => (
          <div key={index} className="flex flex-col items-center">
            <Avatar
              src={avatar.src}
              size={avatar.size}
              name={avatar.name}
              onClick={() => handleAvatarClick(index)}
            />
          </div>
        ))}
        <div className="relative w-[120px] h-[120px] flex items-center justify-center">
          <CircleButton theme="white" icon="plus" disabled={false} onClick={onAddAvatar} />
        </div>
      </div>
    </div>
  );
};
