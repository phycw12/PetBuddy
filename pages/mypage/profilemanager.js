import { ProfileWrapper, ProfileHeader, ProfileImageContainer, ProfileImage, ProfileImageUploadButton, ProfileNicknameInput, ProfilePasswordInput, ProfilePasswordConfirmInput, ProfileButtonContainer, ProfileButton, ProfileWithdrawButton } from '../../styles/emotion';

export default function ProfileManager() {
    return (
    <ProfileWrapper>
        <ProfileHeader>닉네임 님의 프로필</ProfileHeader>
        <ProfileImageContainer>
        <ProfileImage>프로필 이미지</ProfileImage>
        <ProfileImageUploadButton>프로필 수정 이미지 첨부 버튼</ProfileImageUploadButton>
        </ProfileImageContainer>
        <ProfileNicknameInput placeholder="닉네임 변경 input" />
        <ProfilePasswordInput placeholder="비밀번호 변경 input" />
        <ProfilePasswordConfirmInput placeholder="비밀번호 재확인 input" />
        <ProfileButtonContainer>
        <ProfileButton>취소</ProfileButton>
        <ProfileButton>확인</ProfileButton>
        </ProfileButtonContainer>
        <ProfileWithdrawButton>회원탈퇴</ProfileWithdrawButton>
    </ProfileWrapper>
    );
};