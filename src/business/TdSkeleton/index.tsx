import { Col, Row, Skeleton } from 'antd';
import React, { ReactNode, FC } from 'react';
interface SkeletonAvatarProps {
  active?: boolean; //	是否展示动画效果，仅在单独使用头像骨架时生效	boolean	false
  shape?: 'circle' | 'square'; //指定头像的形状		-
  size?: number | 'large' | 'small' | 'default';
}
export interface TdSkeletonProps {
  tdType: 'profile-detail' | 'profile-list'; // 同道骨架屏类型 'profile-detail':简历详情 'profile-list': 简历列表
  active?: boolean; // 是否展示动画效果
  loading?: boolean; // 为 true 时，显示占位图。反之则直接展示子组件
  avatar?: SkeletonAvatarProps; // 头像属性
  className?: string;
  paragraphSize?: number; // 简历详情paragraph数量
  children: ReactNode;
}

const TdSkeleton: FC<TdSkeletonProps> = (props: TdSkeletonProps) => {
  const {
    tdType,
    active,
    loading = true,
    avatar = {},
    className = '',
    paragraphSize = 7,
    children,
  } = props;

  const paragraphList: number[] = [];
  for (let i = 0; i < paragraphSize; i++) {
    paragraphList[i] = i;
  }
  const ProfileDetail = () => {
    return (
      <>
        <div className={`td-skeleton ${className}`}>
          <Skeleton
            avatar={{ size: 80, ...avatar }}
            paragraph={{ rows: 1 }}
            title={{ width: 95 }}
            active={active}
            loading={loading}
          />
          {paragraphList.map((index) => {
            return (
              <Skeleton
                key={index}
                paragraph={{ rows: 1, width: '100%' }}
                title={{ width: index < paragraphSize - 2 ? 60 : 140 }}
                active={active}
                loading={loading}
              />
            );
          })}
        </div>
        {!loading && children}
      </>
    );
  };

  const ProfileList = () => {
    return (
      <>
        <div className={`td-skeleton ${className}`}>
          {paragraphList.map((index) => {
            return (
              <div className={`td-skeleton-profile-item`} key={index}>
                <Row align={'middle'}>
                  <Col span={18}>
                    <Skeleton
                      avatar={{ size: 60, ...avatar }}
                      paragraph={{ rows: 2 }}
                      title={{ width: 95 }}
                      active={active}
                      loading={loading}
                    />
                  </Col>
                  <Col span={4} offset={2}>
                    {loading && (
                      <Skeleton.Button active={active} size={'default'} block />
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Skeleton
                      title={false}
                      paragraph={{ rows: 1, width: '100%' }}
                      active={active}
                      loading={loading}
                    />
                  </Col>
                </Row>
              </div>
            );
          })}
        </div>
        {!loading && children}
      </>
    );
  };

  const SkeletionContent = {
    'profile-detail': <ProfileDetail />,
    'profile-list': <ProfileList />,
  }[tdType];

  return <>{SkeletionContent}</>;
};

export default TdSkeleton;
