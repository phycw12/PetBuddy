import { useRouter } from 'next/router';
import useAuthStore from '../zustand/authStore';
import { WritePageContainer, WritePage } from '../../styles/emotion';

export default function WriteBtn() {
    const router = useRouter();
    const { user } = useAuthStore();

    const handleWriteClick = () => {
        if (user) {
            router.push('/write');
        } else {
            alert('로그인이 필요합니다.');
            router.push('/login');
        }
    };

    return (
        <WritePageContainer>
            <WritePage src="/add.svg" alt="Write" onClick={handleWriteClick} />
        </WritePageContainer>
    );
}
