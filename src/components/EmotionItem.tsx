import './EmotionItem.css';
import {getEmotionImage} from "../util/get-emotion-image";
import { MouseEventHandler } from 'react';


// EmotionItem 인터페이스 정의
interface EmotionItemProps{
    emotionId:number;
    emotionName:string;
    isSelected:boolean;
    onClick: React.MouseEventHandler<HTMLDivElement>;

    
}



const EmotionItem:React.FC<EmotionItemProps> = ({ emotionId, emotionName, isSelected, onClick }) => {

    const emotionImage = getEmotionImage(emotionId);

    return (
        <div
            onClick={onClick} 
            className={`EmotionItem ${isSelected ? "EmotionItem--selected" : ""}`}
        >
            {emotionImage && <img src={emotionImage} className='emotion_img' alt={`Emotion ${emotionId}`} />}
            <div className='emotion_name'>{emotionName}</div>
        </div>
    );
};

export default EmotionItem;