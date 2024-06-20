import { useState } from 'react';
import { auth } from '../../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { AccountRecoveryContainer, AccountRecoveryTitle, AccountRecoveryIDInput, AccountRecoveryBtn } from '../../styles/emotion';

export default function AccountRecovery() {
    const [email, setEmail] = useState('');

    const handleEmailChange = (e) => setEmail(e.target.value);

    const handleResetPassword = async () => {
        try {
            await sendPasswordResetEmail(auth, email);
            alert('비밀번호 재설정 이메일을 보냈습니다. 이메일을 확인해주세요.');
        } catch (error) {
            console.error('비밀번호 재설정 이메일 보내기 실패:', error);
            alert('존재하지 않는 아이디 입니다.');
        }
    };
    
    return (
        <AccountRecoveryContainer>
            <AccountRecoveryTitle>아이디/비밀번호 찾기</AccountRecoveryTitle>
            <AccountRecoveryIDInput>
                <input type="text" placeholder="등록한 이메일 주소를 입력하세요" value={email} onChange={handleEmailChange}/>
            </AccountRecoveryIDInput>
            <AccountRecoveryBtn onClick={handleResetPassword}>비밀번호 재설정 이메일 보내기</AccountRecoveryBtn>
        </AccountRecoveryContainer>
    );
};