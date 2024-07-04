import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useNavigate } from "react-router-dom";
import { useContext} from "react";
import { DiaryDispatchContext } from "../App";
import usePageTitle from "../hooks/usePageTitle";
import {Diary} from "../App";



const New = () => {
    const contextValue = useContext(DiaryDispatchContext);

    if (!contextValue) {
        // DiaryDispatchContext의 Provider가 제공되지 않은 경우 처리
        // 예를 들어, 오류 메시지를 출력하거나 기본 동작을 설정할 수 있습니다.
        console.error('DiaryDispatchContext의 Provider가 제공되지 않았습니다.');
        return null; // 또는 다른 적절한 처리
    }

    const {onCreate} = contextValue;
    const nav = useNavigate();
    usePageTitle("새 일기 쓰기");

    const onSubmit = (input:Diary)=>{
        onCreate(
            input.createdDate,
            input.emotionId,
            input.content
        );
        nav('/', {replace: true});
    };

    return (
        <div>
            <Header title={"새 일기 쓰기"}
                leftChild={<Button 
                    onClick={()=>nav(-1)}
                    text={"< 뒤로가기"}/>}
                rightChild
                />
            
            <Editor onSubmit={onSubmit}/>
        </div>
    );
};

export default New;