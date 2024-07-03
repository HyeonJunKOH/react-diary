import './Editor.css';
import EmotionItem from './EmotionItem';
import Button from './Button';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { emotionList } from '../util/constants';
import { getStringedDate } from '../util/get-stringed-date';

// Editor 인터페이스 정의
interface EditorProps {
    initData?: {
        createdDate: Date;
        emotionId: number;
        content: string;
    };
    onSubmit: (input: {
        createdDate: Date;
        emotionId: number;
        content: string;
    }) => void;
};


const Editor:React.FC<EditorProps> = ({initData, onSubmit}) =>{
    const [input, setInput] = useState({
        createdDate : new Date(),
        emotionId : 3,
        content: "",
    });
    const nav = useNavigate();

    useEffect(()=>{
        if(initData){
            setInput({
                ...initData,
                createdDate: new Date(Number(initData.createdDate)),
            });
        }
    },[initData])

    const onChangeInput = (e:any)=>{
        let name = e.target.name;
        let value = e.target.value;

        if(name === "createdDate"){
            value = new Date(value);
        }

        setInput({
            ...input,
            [name] : value,
        });
    };

    const onClickSubmitButton = ()=>{
        onSubmit(input);
    };

    return (
        <div className="Edtior">
            <section className="date_section">
                <h4>오늘의 날짜</h4>
                <input
                    name='createdDate'
                    onChange={onChangeInput} 
                    value={getStringedDate(input.createdDate)} 
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
                                        value : item.emotionId,
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