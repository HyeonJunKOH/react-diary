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
        content: "",
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
        let name = e.target.name;
        let value:string | number = e.target.value;

        // 값의 타입에 따라 적절하게 변환
        if (name === "createdDate") {
            value = getStringedDate(new Date(value)); // Date 객체로 변환
        } else if (name === "emotionId") {
            value = Number(value); // 숫자로 변환
        }

        setInput({
            ...input,
            [name] : value,
        });
    };

    const onClickSubmitButton = () => {
        if (input.createdDate && input.emotionId && input.content) {
            onSubmit({
                id: initData?.id || 0, // id는 선택적으로 설정하거나 초기화
                createdDate: input.createdDate as string,
                emotionId: input.emotionId as number,
                content: input.content as string,
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
                            onClick={()=>
                                onChangeInput({
                                    target : {
                                        name : "emotionId",
                                        value : item.emotionId.toString(),
                                    },
                                })
                            }
                            key={item.emotionId}
                            {...item} 
                            isSelected={item.emotionId === input.emotionId}
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