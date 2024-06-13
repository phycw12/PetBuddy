import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuthStore from '../stores/authStore';

const withAuth = (WrappedComponent) => {
    return (props) => {
        const user = useAuthStore((state) => state.user);
        const router = useRouter();

        useEffect(() => {
            if (!user) {
                router.push('/login');
            }
        }, [user, router]);

        if (!user) {
            return null; // 로그인 중이거나 리디렉션 중에는 아무것도 렌더링하지 않음
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
