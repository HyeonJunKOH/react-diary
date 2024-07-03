import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useNavigate } from "react-router-dom";
import { useContext} from "react";
import { DiaryDispatchContext } from "../App";
import usePageTitle from "../hooks/usePageTitle";

const New = () => {

    const dispatchContext = useContext(DiaryDispatchContext);
    if (!dispatchContext) {
        throw new Error("DiaryDispatchContext should not be null");
    }
    const {onCreate} = dispatchContext;
    const nav = useNavigate();
    usePageTitle("새 일기 쓰기");

    const onSubmit = (input:any)=>{
        onCreate(
            input.createdDate.getTime(),
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