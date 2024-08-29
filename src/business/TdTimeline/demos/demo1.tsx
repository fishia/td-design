import React from 'react';
import { TdTimeline } from 'td-design';

export default () => {
  const data = {
    edu: [
      {
        iconUrl: require('../assets/icon-edu.png'),
        school: '北京邮电大学文法经济学院',
        major: '法律',
        education_name: '大专',
        start_date: '2002',
        end_date: '2005',
      },
      {
        iconUrl: require('../assets/icon-edu.png'),
        school: '云南省景洪市农场中学高中',
        major: '文科',
        education_name: '高中',
        start_date: '1999',
        end_date: '2002',
      },
    ],
    job: [
      {
        iconUrl: require('../assets/icon-job.png'),
        company: '贵州益佰制药',
        position: '医药代表',
        start_date: '2017-10',
        end_date: '至今',
      },
      {
        company: '贵州宏宇',
        position: '医药代表',
        start_date: '2016-09',
        end_date: '2017-09',
      },
      {
        company: '广东发展银行',
        position: '客户代表',
        start_date: '2009-06',
        end_date: '2014-11',
      },
      {
        iconUrl: require('../assets/icon-job.png'),
        company: '中国贸易报民营经济周刊',
        position: '办公室文秘',
        start_date: '2006-11',
        end_date: '2009-01',
      },
    ],
  };

  const combineData = [
    // 合并教育经历、工作经历
    ...data.job,
    ...data.edu.map((item) => ({
      ...item,
      company: item.school,
      position: item.major,
    })).slice(0,1),
  ];

  return (
    <>
      <h4>工作经历</h4>
      <TdTimeline list={data.job} />
      <br />
      <h4>教育经历 'hiddenKey'可配置隐藏字段</h4>
      <TdTimeline
        list={data.edu}
        fieldNames={{ text1: 'school', text2: 'major' }}
        hiddenKey={['text1', 'text2']}
      />
      <br />
      <h4>合并教育经历、工作经历且教育经历仅显示第一条</h4>
      <TdTimeline list={combineData} />
    </>
  );
};
