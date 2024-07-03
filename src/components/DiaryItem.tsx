import { useNavigate } from "react-router-dom";
import { getEmotionImage } from "../util/get-emotion-image";
import Button from "./Button";
import "./DiaryItem.css";

// 다이어리 props 정의
interface DiaryProps{
  id:number;
  emotionId:number;
  createdDate:Date;
  content:string;
}

const DiaryItem:React.FC<DiaryProps> = ({id, emotionId, createdDate, content}) => {
  const nav = useNavigate();

  const goDiaryPage = () => {
    nav(`/diary/${id}`);
  };

  const goEditPage = () => {
    nav(`/edit/${id}`);
  };

  const emotionImage = getEmotionImage(emotionId);

  return (
      <div className="DiaryItem">
        <div
          onClick={goDiaryPage}
          className={`img_section img_section_${emotionId}`}
        >
        {emotionImage && <img src={emotionImage} alt={`Emotion ${emotionId}`} />}
        </div>
        <div onClick={goDiaryPage} className="info_section">
          <div className="created_date">
            {new Date(createdDate).toLocaleDateString()}
          </div>
          <div className="content">{content}</div>
        </div>
        <div className="button_section">
          <Button onClick={goEditPage} text={"수정하기"} />
        </div>
      </div>
    );
}


export default DiaryItem;