import { useState } from "react";

function useMultiSelect<T, K extends keyof T>(data: T[], key: K) {
  const [multiSelectedArr, setMultiSelectedArr] = useState<T[K][]>([]);

  const onSelectChange = (indexs: number[]) => {
    const prev = [...multiSelectedArr];
    indexs.forEach((index) => {
      if (
        prev.length != 0 &&
        prev.findIndex((i) => i === data[index][key]) !== -1
      ) {
        const _index = prev.findIndex((i) => i === data[index][key]);
        prev.splice(_index, 1);
      } else {
        prev.push(data[index][key]);
      }
    });
    setMultiSelectedArr(prev);
  };

  return {
    onSelectChange,
    multiSelectedArr,
  };
}

export default useMultiSelect;
