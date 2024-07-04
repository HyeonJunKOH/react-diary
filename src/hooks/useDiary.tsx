import { useContext, useState, useEffect } from "react";
import { DiaryStateContext } from "../App";
import { useNavigate } from "react-router-dom";
import { Diary } from "../App";


const useDiary = (id:number):Diary|undefined => {
  const data = useContext(DiaryStateContext);
  const [curDiaryItem, setCurDiaryItem] = useState<Diary | undefined>(undefined);
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