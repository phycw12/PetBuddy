import ClipLoader from "react-spinners/ClipLoader";
import { LoadingContainer } from '../styles/emotion';

export default function Loading() {
    return(
        <LoadingContainer>
            <ClipLoader color='#adb9b5' size={30}/>
        </LoadingContainer>
    );
};