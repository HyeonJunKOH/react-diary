import './EmotionItem.css';
import {getEmotionImage} from "../util/get-emotion-image";
import { MouseEventHandler } from 'react';


// EmotionItem 인터페이스 정의
interface EmotionItemProps{
    emotionId:number;
    emotionName:string;
    isSelected:boolean;
    onEmotionChange: (emotionId:number) => void;
}




const EmotionItem:React.FC<EmotionItemProps> = ({ emotionId, emotionName, isSelected, onEmotionChange }) => {

    const emotionImage = getEmotionImage(emotionId);
    const selectedClass = isSelected ? `EmotionItem_on_${emotionId}` : "";

    return (
        <div
            onClick={()=>onEmotionChange(emotionId)} 
            className={`EmotionItem ${selectedClass}`}
        >
            {emotionImage && <img src={emotionImage} className='emotion_img' alt={`Emotion ${emotionId}`} />}
            <div className='emotion_name'>{emotionName}</div>
        </div>
    );
};

export default EmotionItem;