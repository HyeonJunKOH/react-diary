import Header from "../components/Header";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";
import { useState, useContext } from "react";
import { DiaryStateContext } from "../App";
import usePageTitle from "../hooks/usePageTitle";
import { Diary } from "../App";




const getMonthlyData = (pivotDate:Date, data:Diary[]):Diary[] => {
  const beginTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth(),
    1,
    0,
    0,
    0
  ).getTime();

  const endTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth() + 1,
    0,
    23,
    59,
    59
  ).getTime();

  return data.filter((item) => {
    // 타입 가드를 사용하여 item.createdDate가 Date인 경우에만 getTime()을 호출하도록 처리
    if (item.createdDate instanceof Date) {
      return beginTime <= item.createdDate.getTime() && item.createdDate.getTime() <= endTime;
    }
    return false;
  });
};

const Home = () => {
  const data = useContext(DiaryStateContext) as Diary[];
  const [pivotDate, setPivotDate] = useState(new Date());
  usePageTitle("감정 일기장");

  const monthlyData = getMonthlyData(pivotDate, data);

  const onIncreaseMonth = () => {
    setPivotDate(
      new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1)
    );
  };

  const onDecreaseMonth = () => {
    setPivotDate(
      new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1)
    );
  };

  return (
    <div>
      <Header
        title={`${pivotDate.getFullYear()}년 ${
          pivotDate.getMonth() + 1
        }월`}
        leftChild={<Button onClick={onDecreaseMonth} text={"<"} />}
        rightChild={<Button onClick={onIncreaseMonth} text={">"} />}
      />
      <DiaryList data={monthlyData} />
    </div>
  );
};

export default Home;