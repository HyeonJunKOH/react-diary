import "./Viewer.css";
import { getEmotionImage } from "../util/get-emotion-image";
import { emotionList } from "../util/constants";


// Viewer 인터페이스 정의
interface ViewerProps{
  emotionId:number,
  content:string,
}

const Viewer:React.FC<ViewerProps> = ({ emotionId, content }) => {
  const emotionItem = emotionList.find(
    (item) => String(item.emotionId) === String(emotionId)
  );


  const emotionImage = getEmotionImage(emotionId);
  return (
    <div className="Viewer">
      <section className="img_section">
        <h4>오늘의 감정</h4>
        <div
          className={`emotion_img_wrapper emotion_img_wrapper_${emotionId}`}
        >
          {emotionImage && <img src={emotionImage} alt={`Emotion ${emotionId}`} />}
          <div>{emotionItem ? emotionItem.emotionName : '알수없음'}</div>
        </div>
      </section>
      <section className="content_section">
        <h4>오늘의 일기</h4>
        <div className="content_wrapper">
          <p>{content}</p>
        </div>
      </section>
    </div>
  );
};

export default Viewer;