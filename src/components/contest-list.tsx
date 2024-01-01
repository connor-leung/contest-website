import { useEffect, useState } from "react";
import { fetchContestList } from "../api-client";
import ContestPreview from "./contest-preview";
import Header from "./header";

const ContestsList = ({ initialContests, onContestClick }) => {
  // Use the correct destructuring assignment
  const [contests, setContests] = useState(initialContests ?? []);

  useEffect(() => {
    if (!initialContests) {
      fetchContestList().then((contests) => {
        setContests(contests);
      });
    }
    
  }, [initialContests]);

  return (
    <>
      <Header message="Naming Contests" />

      <div className="contest-list">
        {contests.map((contest) => {
          //contest.id and other data
          return <ContestPreview key={contest.id} contest={contest} onClick={onContestClick}/>;
        })}
      </div>
    </>
  
  );
};

export default ContestsList;