import "./StatBlock.css";
import { StatBlockModels } from "../../../models/StatBlockModels";
import { useEffect, useState } from "react";

interface StatBlockProps {
  statBlockList: StatBlockModels[];
}

const StatBlock: React.FC<StatBlockProps> = ({ statBlockList }) => {
  const [counts, setCounts] = useState<number[]>([]);

  useEffect(() => {
    setCounts(statBlockList.map(() => 0));

    statBlockList.forEach((statBlock, index) => {
      let currentCount = 0;

      const increment = () => {
        setCounts((prevCounts: any) => {
          const newCounts = [...prevCounts];
          newCounts[index] = currentCount;
          return newCounts;
        });
        if (currentCount < statBlock.quantity) {
          currentCount += Math.ceil(statBlock.quantity / 50);

          setTimeout(increment, 16);
        }
      };

      increment();
    });
  }, []);
  return (
    <>
      <div className="statblock-container">
        <ul className="statblock-list">
          {statBlockList.map((statBlock, index) => (
            <li className="statblock-list-item" key={`${statBlock}-${index}`}>
              <h3>{counts[index]}+</h3>
              <p>{statBlock.title}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default StatBlock;
