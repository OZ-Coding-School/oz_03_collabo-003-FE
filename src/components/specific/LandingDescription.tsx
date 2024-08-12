import ImageCardLanding from './ImageCardLanding';

const LandingDescription = () => {
  return (
    <div id='landing-container' className='m-24 h-full'>
      <div id='how-to-use' className='x-[1719px] mb-40 h-[620px]'>
        <div id='how-title' className='h-[204px] text-center'>
          <h2 className='text-black-b2 mt-6 h-[96px] text-[40px] font-medium'>이용 방법</h2>
          <p className='text-[15px] font-normal'>홍보도 하고 정보도 얻고 수익 창출까지!</p>
          <p className='text-[15px] font-normal'>올디와 함께해보세요.</p>
        </div>
        <div id='how-role' className='m-4 flex text-center'>
          <div id='site-owner' className='h-[336px] w-[370px]'>
            <img src='public\images\owner-icon.png' className='ml-12 size-[142px]' />
            <h2 className='text-black-b2 mt-6 text-[22px] font-semibold'>SITE OWNER (의뢰자)</h2>
            <p className='mt-6 text-[13px]'>사이트 정보를 간단하게 등록하고</p>
            <p className='text-[13px]'>자신의 서비스 분석을 의뢰하세요</p>
          </div>
          <img id='connection-curve' src='public\images\connection-curve.png' className='h-[111px] w-[475.29px]' />
          <div id='site-provider' className='h-[336px] w-[370px]'>
            <img src='public\images\provider-icon.png' className='ml-12 size-[142px]' />
            <h2 className='text-black-b2 mt-6 text-[22px] font-semibold'>SITE PROVIDER (분석가)</h2>
            <p className='mt-6 text-[12px]'>사이트 오너의 등록된 정보를</p>
            <p className='text-[12px]'>분석하여 짜임새 있는 구조로 사이트를 등록해요.</p>
            <p className='text-[12px]'>이 과정에서 수익 창출이 가능해요.</p>
          </div>
          <img id='connection-curve' src='public\images\connection-curve.png' className='h-[111px] w-[475.29px]' />
          <div id='site-shopper' className='h-[336px] w-[370px]'>
            <img src='public\images\shopper-icon.png' className='ml-12 size-[142px]' />
            <h2 className='text-black-b2 mt-6 text-[22px] font-semibold'>SITE SHOPPER (이용자)</h2>
            <p className='mt-6 text-[13px]'>사이트를 이용하면서 후기를 남기고</p>
            <p className='text-[13px]'>사이트의 가치를 매길 수 있어요.</p>
          </div>
        </div>
      </div>
      <div id='possible-things' className='mb-40'>
        <div id='possible-title' className='mb-10 text-center'>
          <p className='text-gray-75'>Things to do in ALLTHE</p>
          <h2 className='m-4 text-[40px] font-semibold'>ALL THE에서 가능한 것들</h2>
          <p className='text-gray-75'>어려운 것들을 쉽게 해드리겠습니다. </p>
        </div>
        <div id='possible-image-card'>
          <div className='group-w-[100px] mb-10 flex justify-center space-x-10'>
            <ImageCardLanding
              title='가치평가 기능'
              description='담은 사이트에 대한 분석 및 업데이트를 한 눈에 볼 수 있어요.'
              imageUrl='public\images\possible-1.png'
              layout='vertical'
              className='bg-white-DEFAULT w-[350px] text-center'
            />
            <ImageCardLanding
              title='업무효율화'
              description='요즘 AI를 사용해서 검색, 디자인,  웹페이지나 앱 제작도 10분이면 된다던데 어디서 할지 모르셨죠? 여기 다 모여 있어요.'
              imageUrl='public\images\possible-2.png'
              layout='vertical'
              className='bg-white-DEFAULT w-[350px] text-center'
            />
          </div>
          <div className='flex justify-center space-x-10'>
            <ImageCardLanding
              title='정보 획득'
              description='학술 정보, 통계, 스타트업, 교육, 팀 매칭 등 그동안 네이버에 검색해도 잘 안나오던 정보만 모아놓은 플랫폼들!! 올디에서 찾아보세요. '
              imageUrl='public\images\possible-3.png'
              layout='vertical'
              className='bg-white-DEFAULT w-[350px] text-center'
            />
            <ImageCardLanding
              title='정부 지원'
              description='그동안 몰라서 못 받았던 정부지원. ‘올디’에서 페이지를 쇼핑하면서 찾아보세요.'
              imageUrl='public\images\possible-4.png'
              layout='vertical'
              className='bg-white-DEFAULT w-[350px] text-center'
            />
          </div>
        </div>
      </div>
      <div id='role-image' className='mb-40'>
        <div id='role-title' className='mb-10 text-center'>
          <h2 className='text-[40px] font-semibold'>모두에게 도움되는 방향을 추구합니다.</h2>
          <p>그동안 검색 사이트의 ‘광고’로 인하여 알려지지 않았던 서비스를 알리고</p>
          <p>모든 주체에게 도움이 될 수 있는 방법으로 운영합니다.</p>
        </div>
        <div id='role-image-card' className='grid w-full place-items-center'>
          <ImageCardLanding
            title='사이트 운영자'
            description='공들여 만든 사이트!! 혹시 더 많이 알리고 싶지 않나요? 자신의 서비스를 분석하고 알릴 수 있어요.'
            imageUrl='public\images\role-admin.png'
            layout='horizontal'
            className='mb-10 h-[300px]'
          />
          <ImageCardLanding
            title='분석 및 제공자'
            description='사이트의 정보를 분석해서 업로드하고 수익을 창출해요'
            imageUrl='public\images\role-provider.png'
            layout='horizontal'
            className='p-w-[400] mb-10 h-[300px]'
          />
          <ImageCardLanding
            title='ALL THE 이용자'
            description='필요한 사이트를 한 눈에 보고 찾을 수 있어요. 게다가 분석 및 평가로 다른 이용자들의 후기가 가능해요.'
            imageUrl='public\images\role-user.png'
            layout='horizontal'
            className='mb-10 h-[300px]'
          />
        </div>
      </div>
      <div id='reviews'>
        <div id='reviews-title' className='text-center'>
          <h2 className='text-[40px] font-semibold'>이용 후기</h2>
          <p className='text-gray-75'>그동안 검색 사이트의 ‘광고’로 인하여 알려지지 않았던 서비스를 알리고</p>
          <p className='text-gray-75'>모두에게 도움이 될 수 있는 방법으로 운영합니다.</p>
        </div>
        <div id='reviews-card' className='text-gray-75 m-20 flex'>
          <div id='reviews-card-1' className='w-[546px] rounded-md border-2 border-gray-dc p-10 p-5'>
            <div id='card-profile' className='flex'>
              <img src='public\images\review-profile.png' />
              <div id='card-profile-text'>
                <p className='text-black-b2 font-semibold'>김00</p>
                <p className='text-[15px]'>사이트 오너</p>
              </div>
            </div>
            <p id='review-details' className='text-[13px]'>
              그동안 제 서비스의 문제점이 무엇인지 몰랐었는데, 올디에 사이트 분석 및 등록 후 개선 방안을 찾고 공정한
              평가를 받을 수 있었어요.
            </p>
          </div>
          <div id='reviews-card-2' className='inline-block w-[546px] rounded-md border-2 border-gray-dc p-10 p-5'>
            <div id='card-profile' className='flex'>
              <img src='public\images\review-profile.png' />
              <div id='card-profile-text'>
                <p className='text-black-b2 font-semibold'>이00</p>
                <p className='text-[15px]'>사이트 프로바이더</p>
              </div>
            </div>
            <p id='review-details' className='text-[13px]'>
              직접 사이트와 서비스를 분석하면서, 이처럼 좋은 서비스가 널리 알려졌으면 좋겠다는 생각이 들었어요. 저도
              많이 배우고 발전했답니다. 수익도 물론 얻었구요.
            </p>
          </div>
          <div id='reviews-card-3' className='inline-block w-[546px] rounded-md border-2 border-gray-dc p-10 p-5'>
            <div id='card-profile' className='flex'>
              <img src='public\images\review-profile.png' />
              <div id='card-profile-text'>
                <p className='text-black-b2 font-semibold'>고00</p>
                <p className='text-[15px]'>사이트 이용자</p>
              </div>
            </div>
            <p id='review-details' className='text-[13px]'>
              필요한 사이트만 한 눈에 모아 보니까 너무 좋아요. 검색해도 맨날 광고글만 나왔었는데, 이제는 필요한게 생기면
              올디부터 찾아요
            </p>
          </div>
          <div id='reviews-card-4' className='inline-block w-[546px] rounded-md border-2 border-gray-dc p-10 p-5'>
            <div id='card-profile' className='flex'>
              <img src='public\images\review-profile.png' />
              <div id='card-profile-text'>
                <p className='text-black-b2 font-semibold'>갈00</p>
                <p className='text-[15px]'>사이트 이용자</p>
              </div>
            </div>
            <p id='review-details' className='text-[13px]'>
              예전에는 이렇게 재미난 툴이나 신기한 정보가 많은지 몰랐어요. 올디를 이용한 후 많은 것들을 새롭게
              배웠습니다.
            </p>
          </div>
          <div id='reviews-card-5' className='inline-block w-[546px] rounded-md border-2 border-gray-dc p-10 p-5'>
            <div id='card-profile' className='flex'>
              <img src='public\images\review-profile.png' />
              <div id='card-profile-text'>
                <p className='text-black-b2 font-semibold'>하00</p>
                <p className='text-[15px]'>사이트 이용자</p>
              </div>
            </div>
            <p id='review-details' className='text-[13px]'>
              올디덕분에 원하는 키워드의 웹사이트를 손쉽게 이용할 수 있었습니다. 간단한 검색 기능과 정확한 결과 덕분에
              시간을 절약할 수 있었습니다. 강력히 추천합니다!
            </p>
          </div>
          <div id='reviews-card-6' className='inline-block w-[546px] rounded-md border-2 border-gray-dc p-10 p-5'>
            <div id='card-profile' className='flex'>
              <img src='public\images\review-profile.png' />
              <div id='card-profile-text'>
                <p className='text-black-b2 font-semibold'>안00</p>
                <p className='text-[15px]'>사이트 오너</p>
              </div>
            </div>
            <p id='review-details' className='text-[13px]'>
              우리 웹사이트를 올디에 등록한 이후, 방문자 수가 크게 증가했습니다. 간단한 과정과 효과적인 노출 덕분에
              우리의 고객 기반이 확장되었습니다. 감사합니다!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingDescription;
