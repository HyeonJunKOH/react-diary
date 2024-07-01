import './EmotionItem.css';
import {getEmotionImage} from "../util/get-emotion-image";


// EmotionItem 인터페이스 정의
interface EmotionItemProps{
    emotionId:number;
    emotionName:string;
    isSelected:boolean;
    onClick: () => void;
}

const EmotionItem:React.FC<EmotionItemProps> = ({ emotionId, emotionName, isSelected, onClick }) => {

    const emotionImage = getEmotionImage(emotionId);

    return (
        <div
            onClick={onClick} 
            className={`EmotionItem ${
                isSelected ? `EmotionItem_on_${emotionId}`: ""
            }`}
        >
            {emotionImage && <img src={emotionImage} className='emotion_img' alt={`Emotion ${emotionId}`} />}
            <div className='emotion_name'>{emotionName}</div>
        </div>
    );
};

export default EmotionItem;