import { useContext, useState, useEffect } from "react";
import { DiaryStateContext } from "../App";
import { useNavigate } from "react-router-dom";


interface DiaryItem {
  id: number;
  content: string;
  createdDate: Date;
  emotionId: number;
}

const useDiary = (id:number):DiaryItem|undefined => {
  const data = useContext(DiaryStateContext);
  const [curDiaryItem, setCurDiaryItem] = useState<DiaryItem | undefined>(undefined);
  const nav = useNavigate();

  useEffect(() => {

    if (!data) {
      return;
    }

    const currentDiaryItem = data.find(
      (item) => String(item.id) === String(id)
    );

    if (!currentDiaryItem) {
      window.alert("존재하지 않는 일기입니다.");
      nav("/", { replace: true });
    }

    setCurDiaryItem(currentDiaryItem);
  }, [id, data]);

  return curDiaryItem;
};

export default useDiary;