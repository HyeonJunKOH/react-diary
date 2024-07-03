import "./DiaryList.css";
import Button from "./Button";
import DiaryItem from "./DiaryItem";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { Diary } from "../App";


// DiaryListProps 인터페이스 정의
interface DiaryListProps {
  data: Pick<Diary, 'id' | 'emotionId' | 'createdDate' | 'content'>[];
}


const DiaryList:React.FC<DiaryListProps> = ({ data }) => {
  const nav = useNavigate();
  const [sortType, setSortType] = useState<"latest" | "oldest">("latest");

  const onChangeSortType = (e:any) => {
    setSortType(e.target.value as "latest" | "oldest");
  };

  const getSortedData = (): Diary[] => {
    return[...data].toSorted((a, b) => {
      if (sortType === "oldest") {
        return a.createdDate.getTime() - b.createdDate.getTime();
      } else {
        return b.createdDate.getTime() - a.createdDate.getTime();
      }
    });
  };

  const sortedData = getSortedData();



  return (
    <div className="DiaryList">
      <div className="menu_bar">
        <select value={sortType} onChange={onChangeSortType}>
          <option value={"latest"}>최신순</option>
          <option value={"oldest"}>오래된 순</option>
        </select>
        <Button
          onClick={() => nav("/new")}
          text={"새 일기 쓰기"}
          type={"POSITIVE"}
        />
      </div>
      
      <div className="list_wrapper">
        {sortedData.map((item) => (
          <DiaryItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default DiaryList;