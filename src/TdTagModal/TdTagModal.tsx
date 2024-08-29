import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Button, Divider, Input, message, Modal, Select, Tag } from 'antd';
import cls from 'classnames';
import { some } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
// import { JobTabsProps, FootersProps, ListProps, OptionItem } from '@def/customizeCard';

const allMaxHeight = 168;

const defaultCls = 'career-components-tagmodal';

interface JobTabsProps {
  maxLength?: number;
  options?: OptionItem[];
  onChange?: (e: OptionItemTwo[]) => void;
  value?: OptionItemTwo[];
  selectedList?: OptionItemTwo[];
  title: string;
  describtion?: string;
  addKeyWord?: (name: string) => Promise<OptionItemTwo>;
  placeHolder?: string;
  isAdd?: boolean;
  className?: string;
  beforeChoose?: () => void;
  centered?: boolean;
}

interface FootersProps {
  selectList: OptionItemTwo[];
  removeCard: (e: OptionItemTwo) => void;
  maxLength: number;
  submit: () => void;
}

interface ListProps {
  name: string;
  list?: OptionItemTwo[];
  selectCard?: (e: OptionItemTwo) => void;
  selectList?: OptionItemTwo[];
  isSelectType?: boolean;
  addcard?: (e: OptionItemTwo) => void;
  createTitle?: string;
  addKeyWord?: (name: string) => Promise<OptionItemTwo>;
}

interface OptionItem {
  name: string;
  options?: OptionItemTwo[];
}

export interface OptionItemTwo {
  name: string;
  id: number;
}

const List = (props: ListProps) => {
  // isSelectType    true:选择列表状态    false：自定义状态
  const {
    name,
    list,
    selectCard,
    selectList,
    isSelectType = true,
    addcard,
    createTitle,
    addKeyWord,
  } = props;

  const [isCreate, setIsCreate] = useState(false);
  const [createValue, setcreateValue] = useState('');
  const [isDisable, setIsDisable] = useState(false);
  const [ellipsis, setEllipsis] = useState<boolean>(true);

  const paragraph = useRef<any>(null);

  const inputChange = (e: { target: { value: string } }) => {
    setcreateValue(e.target.value.trim());
  };

  const saveKeyWord = () => {
    // 添加关键字接口
    addKeyWord?.(createValue).then((res) => {
      if (res) {
        addcard?.(res);
        setIsCreate(false);
      }
    });
  };

  useEffect(() => {
    setIsDisable(!(createValue.length > 0));
  }, [createValue]);

  useEffect(() => {
    if (!isCreate) {
      setcreateValue('');
    }
  }, [isCreate]);

  return (
    <React.Fragment>
      <p className="listTitle">{name}</p>
      {isSelectType ? (
        <>
          <div
            style={
              ellipsis
                ? {
                    maxHeight: allMaxHeight,
                    overflow: 'hidden',
                    marginBottom: 0,
                  }
                : { marginBottom: 0 }
            }
          >
            <div
              className={'cardList'}
              ref={paragraph}
              style={{
                marginBottom:
                  paragraph.current?.offsetHeight > allMaxHeight ? 0 : 16,
              }}
            >
              {list?.map((item) => (
                <Tag
                  key={item.id}
                  className={`card ${some(selectList, item) ? 'selected' : ''}`}
                  onClick={() => selectCard?.(item)}
                >
                  {item.name}
                </Tag>
              ))}
            </div>
          </div>
          {paragraph.current?.offsetHeight > allMaxHeight ? (
            <Divider style={{ marginTop: 0 }} className="dividerCss">
              <Button
                size="small"
                className="moreCss"
                onClick={() => {
                  setEllipsis(!ellipsis);
                }}
              >
                {ellipsis ? '更多' : '收起'}
                {ellipsis ? <DownOutlined /> : <UpOutlined />}
              </Button>
            </Divider>
          ) : null}
        </>
      ) : (
        <div className="cardList">
          {isCreate ? (
            <>
              <Input
                placeholder={`请输入自定义添加的${createTitle}`}
                value={createValue}
                onChange={inputChange}
                maxLength={6}
                allowClear
              />
              <Button
                size="large"
                className={`sure ${isDisable ? 'disable' : ''}`}
                onClick={() => saveKeyWord()}
              >
                确认
              </Button>
              <Button
                size="large"
                className="cancel"
                type="link"
                onClick={() => setIsCreate(false)}
              >
                取消
              </Button>
            </>
          ) : (
            <Button className="create" onClick={() => setIsCreate(true)}>
              + 添加关键词
            </Button>
          )}
        </div>
      )}
    </React.Fragment>
  );
};

const Footers = (props: FootersProps) => {
  const { selectList, removeCard, maxLength, submit } = props;

  return (
    <div className="footers">
      <div className="titleText">
        已选 ({selectList.length}
        {maxLength < 9999 ? `/${maxLength}` : ''})
      </div>
      <div className="selectedCardList">
        {selectList.map((item) => (
          <Tag
            className="card selected"
            closable
            key={item.id}
            onClose={(e: { preventDefault: () => void }) => {
              e.preventDefault();
              removeCard(item);
            }}
          >
            {item.name}
          </Tag>
        ))}
      </div>
      <Button
        size="large"
        type="primary"
        className="submit"
        onClick={() => submit()}
      >
        确认 {selectList.length}
        {maxLength < 9999 ? `/${maxLength}` : ''}
      </Button>
    </div>
  );
};

const TdTagModal: React.FC<JobTabsProps> = (props) => {
  const {
    maxLength = 8,
    options = [], // 数组
    onChange,
    value = [],
    // selectedList = [], // 已选中的列表，给select options用
    title,
    describtion,
    addKeyWord, // 自定义关键词方法
    placeHolder = '请选择',
    isAdd = false,
    className,
    beforeChoose,
    centered = false,
  } = props;
  const [visible, setVisible] = useState<boolean>(false);
  const [selectList, setSelectList] = useState<OptionItemTwo[]>([]);
  const [checkList, setCheckList] = useState<OptionItemTwo[]>([]);

  useEffect(() => {
    if (value.length > 0) {
      setSelectList(value);
      setCheckList(value);
      return;
    }
    setCheckList(value);
  }, [value]);

  useEffect(() => {
    if (visible) {
      setSelectList(checkList);
    }
  }, [visible]);

  const removeCard = (item: OptionItemTwo) => {
    const arr = selectList.filter((val) => val.id !== item.id);

    setSelectList(arr);
  };

  const addcard = (item: OptionItemTwo) => {
    if (selectList.length < maxLength) {
      setSelectList([...selectList, item]);
    } else {
      message.error(`最多可选${maxLength}个${title}`);
    }
  };

  const selectCard = (item: OptionItemTwo) => {
    if (some(selectList, item)) {
      removeCard(item);
    } else {
      addcard(item);
    }
  };

  const choose = () => {
    beforeChoose?.();

    setVisible(true);
  };

  const cancel = () => {
    // setSelectList([])
    setVisible(false);
  };

  const submit = () => {
    // const arr = selectList.map(item => item.id)
    onChange?.(selectList);
    setCheckList(selectList);
    setVisible(false);
  };

  const changeSelect = (e: number[]) => {
    const arr: React.SetStateAction<OptionItemTwo[]> = [];

    e.forEach((item: number) => {
      selectList.forEach((items) => {
        if (item === items.id) {
          arr.push(items);
        }
      });
    });

    setCheckList(arr);

    onChange?.(arr);
  };

  return (
    <div className={cls(defaultCls, className)}>
      <div onClick={() => choose()}>
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          placeholder={placeHolder}
          value={value.map((item) => item.id)}
          open={false}
          onChange={changeSelect}
          maxTagTextLength={6}
          showArrow={true}
          options={selectList}
          fieldNames={{
            value: 'id',
            label: 'name',
          }}
        >
          {/* {selectList.map((item) => (
            <Option value={item.id} key={item.id}>
              {item.name}
            </Option>
          ))} */}
        </Select>
      </div>
      <Modal
        title={
          <span
            style={{ color: '#262626', fontSize: '16px', fontWeight: 'bold' }}
          >{`请选择${title}`}</span>
        }
        bodyStyle={{ paddingRight: 5 }}
        zIndex={1001}
        open={visible}
        className={cls(`${defaultCls}--JobKeywords`)}
        width="800px"
        footer={
          <Footers
            selectList={selectList}
            removeCard={removeCard}
            maxLength={maxLength}
            submit={submit}
          />
        }
        onCancel={() => cancel()}
        centered={centered}
      >
        {describtion && <div className="title">{describtion}</div>}

        <div className="scrollcontent">
          {options.map((item: any) => (
            <List
              name={item.name}
              list={item.options}
              selectCard={selectCard}
              selectList={selectList}
              key={item.name}
            />
          ))}
          {isAdd ? (
            <List
              name="自定义添加"
              isSelectType={false}
              addcard={addcard}
              createTitle={title}
              addKeyWord={addKeyWord}
            />
          ) : null}
        </div>
      </Modal>
    </div>
  );
};

export default TdTagModal;
