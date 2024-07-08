import './Editor.css';
import EmotionItem from './EmotionItem';
import Button from './Button';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { emotionList } from '../util/constants';
import { getStringedDate } from '../util/get-stringed-date';
import { Diary } from "../App";


interface EditorProps {
    initData?: Partial<Diary>; // 초기 데이터의 타입 정의
    onSubmit: (data: Diary) => void; // onSubmit 콜백 함수의 타입 정의
}

const Editor= ({initData, onSubmit}:EditorProps) =>{
    const [input, setInput] = useState<Partial<Diary>>({
        createdDate : getStringedDate(new Date()),
        emotionId:initData?.emotionId,
        content: initData?.content || "",
    });
    const nav = useNavigate();

    useEffect(()=>{
        if(initData){
            setInput({
                ...initData,
                createdDate: getStringedDate(new Date(initData.createdDate ?? new Date())),
            });
        }
    },[initData])

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        const { name, value: rawValue } = e.target;

        let value: string | number = rawValue;

        if (name === "createdDate") {
            value = getStringedDate(new Date(rawValue));
        } else if (name === "emotionId" && typeof rawValue === "string") {
            value = Number(rawValue);
        }
        setInput(prev=> ({...prev, [name]:value}));
    };

    const handleEmotionChange = (emotionId: number)=>{
        setInput(prev=> ({...prev, emotionId}));
    };

    const onClickSubmitButton = () => {
        if (input.createdDate && input.emotionId && input.content) {
            onSubmit({
                id: initData?.id || 0, // id는 선택적으로 설정하거나 초기화
                createdDate: input.createdDate,
                emotionId: input.emotionId,
                content: input.content,
            } as Diary);
        }
    };

    return (
        <div className="Edtior">
            <section className="date_section">
                <h4>오늘의 날짜</h4>
                <input
                    name='createdDate'
                    onChange={onChangeInput} 
                    value={getStringedDate(new Date(input.createdDate ?? new Date()))} 
                    type='date'
                />
            </section>
            <section className='emotion_section'>
                <h4>오늘의 감정</h4>
                <div className='emotion_list_wrapper'>
                    {emotionList.map((item)=>(
                        <EmotionItem
                            key={item.emotionId}
                            emotionId={item.emotionId}
                            emotionName={item.emotionName}
                            isSelected={item.emotionId === input.emotionId}
                            onEmotionChange={handleEmotionChange}
                        />
                    ))};
                </div>
            </section>
            <section className='content_section'>
                <h4>오늘의 일기</h4>
                <textarea 
                    name='content'
                    value={input.content}
                    onChange={onChangeInput}
                    placeholder='오늘은 어땠나요?'
                />
            </section>
            <section className='button_section'>
                <Button 
                    onClick={() => nav(-1)}
                    text={"취소하기"}
                />
                <Button
                    onClick={onClickSubmitButton}
                    text={"작성완료"} 
                    type={"POSITIVE"}
                />
            </section>
        </div>
    );
};

export default Editor;