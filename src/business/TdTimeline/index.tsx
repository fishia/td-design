import { replace } from 'ramda';
import React, { FC } from 'react';
import './style/index';

const defaultFieldNames = {
  iconUrl: 'iconUrl',
  start_time: 'start_date',
  end_time: 'end_date',
  text1: 'company',
  text2: 'position',
};

export interface IFieldNamesProps {
  iconUrl?: string;
  start_time?: string;
  end_time?: string;
  text1?: string;
  text2?: string;
}
type hiddenKeyType = 'text1' | 'text2';
export interface TdTimeLineProps {
  className?: string; // 组件自定义样式class
  list: any[]; // 传入数据
  fieldNames?: IFieldNamesProps;
  hiddenKey?: hiddenKeyType[]; // 需要隐藏字段
}

const TdTimeLine: FC<TdTimeLineProps> = (props: TdTimeLineProps) => {
  const {
    className = '',
    list,
    fieldNames = defaultFieldNames,
    hiddenKey,
  } = props;
  const [timeLineList, setTileLineList] = React.useState<IFieldNamesProps[]>(
    [],
  );

  const curFieldNames = { ...defaultFieldNames, ...fieldNames };
  const convertValue = (item: any) => ({
    iconUrl: item[curFieldNames.iconUrl],
    start_time: item[curFieldNames.start_time],
    end_time: item[curFieldNames.end_time],
    text1: item[curFieldNames.text1],
    text2: item[curFieldNames.text2],
  });

  React.useEffect(() => {
    setTileLineList(
      list.map((item: any) => {
        const itemdata = { ...convertValue(item) };
        if (hiddenKey?.length) {
          hiddenKey.forEach((k: hiddenKeyType) => {
            itemdata[k] = replace(/./g, '*', itemdata[k]);
          });
        }
        // debugger;
        return itemdata;
      }),
    );
  }, [list, hiddenKey]);

  return (
    <>
      <div className={`${className} td-time-line-wrap`}>
        {timeLineList.map((item: IFieldNamesProps, index) => (
          <div key={index} className="td-time-line-item">
            <div className='td-time-line-item-tail'></div>
            {item.iconUrl && (
              <img
                className="td-time-line-icon"
                src={item.iconUrl}
                alt=""
              ></img>
            )}
            <span className="td-time-line-time">
              {item.start_time} - {item.end_time}
            </span>
            <span className="td-time-line-txt1">{item.text1}</span> ·{' '}
            <span className="td-time-line-txt2">{item.text2}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default TdTimeLine;
