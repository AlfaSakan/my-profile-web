/* eslint-disable react-hooks/exhaustive-deps */
import { Checkbox } from 'components/atoms';
import { Search } from 'components/molecules';
import { useEffect, useState } from 'react';

interface Props<T> {
  datas: T[];
  onChangeBox?(_: boolean, _value: string): void;
  addedUsers?: string[];
  userId?: string;
}

const Dropdown: React.FC<Props<any>> = ({
  datas,
  onChangeBox,
  addedUsers = [],
  userId = '',
}) => {
  const [search, setSearch] = useState('');
  const [datasDropdown, setDatasDropdown] = useState<any[]>([]);

  const searchHandler = (val: string) => {
    setSearch(val);
  };

  const filterDatas = () => {
    const filtered = datas.filter((data) =>
      data?.name.toLowerCase().includes(search.toLowerCase())
    );

    setDatasDropdown(filtered);
  };

  useEffect(() => {
    if (!search) {
      setDatasDropdown(datas);
    } else {
      filterDatas();
    }

    return () => {
      setDatasDropdown([]);
    };
  }, [search, datas]);

  return (
    <div
      className="bg-white rounded-md px-4 py-2 absolute top-20 w-full overflow-y-scroll h-28 flex flex-col gap-2"
      onClick={(e) => e.stopPropagation()}
    >
      <Search classname="pl-0" value={search} onChange={searchHandler} />
      {datasDropdown.map((data) => {
        if (data.user_id === userId) return;

        return (
          <div key={`${data?.user_id} checkbox`}>
            <Checkbox
              data={{
                label: data?.name,
                value: data?.user_id,
                checked: addedUsers.includes(data?.user_id),
              }}
              onChange={onChangeBox}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Dropdown;
