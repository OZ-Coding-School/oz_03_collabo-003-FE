import React from 'react';
import ImageCard from './ImageCardLanding';

const LandingDescription = () => {
  return (
    <div id='landing-container'>
      <div id='how-to-use'>
        <div>
          <h2>이용 방법</h2>
          <p>홍보도 하고 정보도 얻고 수익 창출까지!올디와 함께해보세요</p>
          <p>올디와 함께해보세요.</p>
          <div id='role-description'>
            <div id='site-owner'>
              <img></img>
              <h2>SITE OWNER(의뢰자)</h2>
              <p>사이트 정보를 간단하게 등록하고</p>
              <p>자신의 서비스 분석을 의뢰하세요</p>
            </div>
            <img id='connection-curve'></img>
            <div id='site-provider'>
              <img></img>
              <h2>SITE PROVIDER(분석가)</h2>
              <p>사이트 오너의 등록된 정보를</p>
              <p>분석하여 짜임새 있는 구조로 사이트를 등록해요.</p>
              <p>이 과정에서 수익 창출이 가능해요.</p>
            </div>
            <img id='connection-curve'></img>
            <div id='site-shopper'>
              <img></img>
              <h2>SITE SHOPPER(이용자)</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingDescription;
