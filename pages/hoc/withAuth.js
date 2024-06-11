import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

const withAuth = (WrappedComponent) => {
    return (props) => {
        const { user } = useAuth();
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