import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useContext} from "react";
import {DiaryDispatchContext} from "../App";
import useDiary from "../hooks/useDiary";
import usePageTitle from "../hooks/usePageTitle";

interface Input {
    createdDate: Date;
    emotionId: number;
    content: string;
}

const Edit = () => {
    const params = useParams();
    const nav = useNavigate();

    // 타입 단언을 사용하여 context가 null이 아님을 보장
    const dispatchContext = useContext(DiaryDispatchContext);
    if (!dispatchContext) {
        throw new Error("DiaryDispatchContext should not be null");
    }

    const {onDelete, onUpdate} = dispatchContext;
    const curDiaryItem = useDiary(Number(params.id));
    usePageTitle(`${params.id}번 일기 수정`);

    const onClickDelete = () =>{
        if(
            window.confirm("일기를 정말 삭제할까요?")
        ){
            // 일기 삭제 로직
            onDelete(Number(params.id));
            nav("/",{replace: true});
        }
    };



    const onSubmit=(input:Input)=>{
        if(window.confirm("일기를 정말 수정할까요?")){
            onUpdate(
                Number(params.id), 
                input.createdDate.getTime(),
                input.emotionId, 
                input.content
            );
            nav("/",{replace:true});
        }
    };

    return (
        <div>
            <Header 
                title={"일기 수정하기"}
                leftChild={<Button onClick={()=>nav(-1)} text={"< 뒤로 가기"}/>}
                rightChild={<Button onClick={onClickDelete} text={"삭제하기"} type={"NEGATIVE"}/>}
            />
            <Editor initData={curDiaryItem} onSubmit={onSubmit}/>
        </div>
    )

}

export default Edit;