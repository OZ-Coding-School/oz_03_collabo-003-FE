import ImageCardLanding from './ImageCardLanding';

const LandingDescription = () => {
  const title = 'text-[40px] font-semibold text-black-b2';
  const subTitle = 'text-[15px] text-gray-75';
  const smallFont = 'text-[13px] text-gray-75';
  const reviewsCard = 'w-[546px] rounded-md border-2 border-gray-dc bg-white p-5';
  const reviewDetails = 'pr-[100px] text-[13px] ml-2';

  return (
    <div className='container m-auto size-full'>
      <div className='how-to-use mb-40 size-full'>
        <div className='how-title text-center'>
          <h2 className={`${title} h-auto`}>이용 방법</h2>
          <p className={`${subTitle} mt-6`}>홍보도 하고 정보도 얻고 수익 창출까지!</p>
          <p className={`${subTitle}`}>올디와 함께해보세요.</p>
        </div>
        <div className='how-role mt-10 flex size-full justify-center space-x-10 text-center'>
          <div className='site-owner size-full'>
            <img src='public\images\owner-icon.png' className='m-auto size-auto' alt='owner-icon' />
            <h2 className='mt-6 text-[20px] font-semibold text-black-b2'>SITE OWNER (의뢰자)</h2>
            <p className={`${smallFont} mt-6`}>사이트 정보를 간단하게 등록하고</p>
            <p className={`${smallFont}`}>자신의 서비스 분석을 의뢰하세요</p>
          </div>
          {/* <img src='public\images\connection-curve.png' className='connection-curve h-[111px] w-auto' /> */}
          <div className='site-provider size-full'>
            <img src='public\images\provider-icon.png' className='m-auto size-auto' alt='provider-icon' />
            <h2 className='mt-6 text-[20px] font-semibold text-black-b2'>SITE PROVIDER (분석가)</h2>
            <p className={`${smallFont} mt-6`}>사이트 오너의 등록된 정보를</p>
            <p className={`${smallFont}`}>분석하여 짜임새 있는 구조로 사이트를 등록해요.</p>
            <p className={`${smallFont}`}>이 과정에서 수익 창출이 가능해요.</p>
          </div>
          {/* <img src='public\images\connection-curve.png' className='connection-curve h-[111px] w-auto' /> */}
          <div className='site-shopper size-full'>
            <img src='public\images\shopper-icon.png' className='m-auto size-auto' alt='shopper-icon' />
            <h2 className='mt-6 text-[20px] font-semibold text-black-b2'>SITE SHOPPER (이용자)</h2>
            <p className={`${smallFont} mt-6`}>사이트를 이용하면서 후기를 남기고</p>
            <p className={`${smallFont}`}>사이트의 가치를 매길 수 있어요.</p>
          </div>
        </div>
      </div>
      <div className='possible-things mb-40'>
        <div className='possible-title mb-10 text-center'>
          <p className={`${subTitle}`}>Things to do in ALLTHE</p>
          <h2 className={`${title} m-4 h-auto`}>ALL THE에서 가능한 것들</h2>
          <p className={`${subTitle}`}>어려운 것들을 쉽게 해드리겠습니다. </p>
        </div>
        <div className='possible-image-card'>
          <div className='mb-10 flex justify-center space-x-10'>
            <ImageCardLanding
              title='가치평가 기능'
              description='담은 사이트에 대한 분석 및 업데이트를 한 눈에 볼 수 있어요.'
              imageUrl='public\images\possible-1.png'
              layout='vertical'
              className='w-[350px] bg-white text-center'
            />
            <ImageCardLanding
              title='업무효율화'
              description='요즘 AI를 사용해서 검색, 디자인,  웹페이지나 앱 제작도 10분이면 된다던데 어디서 할지 모르셨죠? 여기 다 모여 있어요.'
              imageUrl='public\images\possible-2.png'
              layout='vertical'
              className='w-[350px] bg-white text-center'
            />
          </div>
          <div className='flex justify-center space-x-10'>
            <ImageCardLanding
              title='정보 획득'
              description='학술 정보, 통계, 스타트업, 교육, 팀 매칭 등 그동안 네이버에 검색해도 잘 안나오던 정보만 모아놓은 플랫폼들!! 올디에서 찾아보세요. '
              imageUrl='public\images\possible-3.png'
              layout='vertical'
              className='w-[350px] bg-white text-center'
            />
            <ImageCardLanding
              title='정부 지원'
              description='그동안 몰라서 못 받았던 정부지원. ‘올디’에서 페이지를 쇼핑하면서 찾아보세요.'
              imageUrl='public\images\possible-4.png'
              layout='vertical'
              className='w-[350px] bg-white text-center'
            />
          </div>
        </div>
      </div>
      <div className='role-image mb-40 size-full'>
        <div className='role-title mb-10 text-center'>
          <h2 className={`${title} mb-5`}>모두에게 도움되는 방향을 추구합니다.</h2>
          <p className={`${subTitle}`}>그동안 검색 사이트의 ‘광고’로 인하여 알려지지 않았던 서비스를 알리고</p>
          <p className={`${subTitle}`}>모든 주체에게 도움이 될 수 있는 방법으로 운영합니다.</p>
        </div>
        <div className='role-image-card w-auto'>
          <ImageCardLanding
            title='사이트 운영자'
            description='공들여 만든 사이트!! 혹시 더 많이 알리고 싶지 않나요? 자신의 서비스를 분석하고 알릴 수 있어요.'
            imageUrl='public\images\role-admin.png'
            layout='horizontal'
            className='mb-10 justify-center'
          />
          <ImageCardLanding
            title='분석 및 제공자'
            description='사이트의 정보를 분석해서 업로드하고 수익을 창출해요'
            imageUrl='public\images\role-provider.png'
            layout='horizontal'
            className='mb-10 block flex-row-reverse justify-center'
          />
          <ImageCardLanding
            title='ALL THE 이용자'
            description='필요한 사이트를 한 눈에 보고 찾을 수 있어요. 게다가 분석 및 평가로 다른 이용자들의 후기가 가능해요.'
            imageUrl='public\images\role-user.png'
            layout='horizontal'
            className='mb-10 justify-center'
          />
        </div>
      </div>
      <div className='reviews size-full'>
        <div className='reviews-title text-center'>
          <h2 className={`${title} mb-5`}>이용 후기</h2>
          <p className='text-gray-75'>그동안 검색 사이트의 ‘광고’로 인하여 알려지지 않았던 서비스를 알리고</p>
          <p className='text-gray-75'>모두에게 도움이 될 수 있는 방법으로 운영합니다.</p>
        </div>
        <div className='reviews-card mb-20 mt-10 flex w-full flex-row flex-wrap justify-center gap-10 text-gray-75'>
          <div className={`${reviewsCard}`}>
            <div className='card-profile mb-3 flex'>
              <img src='public\images\review-profile.png' alt='review-profile' />
              <div className='card-profile-text ml-2'>
                <p className='font-semibold text-black-b2'>김OO</p>
                <p className='text-[15px]'>사이트 오너</p>
              </div>
            </div>
            <p className={`${reviewDetails}`}>
              그동안 제 서비스의 문제점이 무엇인지 몰랐었는데, 올디에 사이트 분석 및 등록 후 개선 방안을 찾고 공정한
              평가를 받을 수 있었어요.
            </p>
          </div>
          <div className={`${reviewsCard}`}>
            <div className='card-profile mb-3 flex'>
              <img src='public\images\review-profile.png' alt='review-profile' />
              <div className='card-profile-text ml-2'>
                <p className='font-semibold text-black-b2'>이OO</p>
                <p className='text-[15px]'>사이트 프로바이더</p>
              </div>
            </div>
            <p className={`${reviewDetails}`}>
              직접 사이트와 서비스를 분석하면서, 이처럼 좋은 서비스가 널리 알려졌으면 좋겠다는 생각이 들었어요. 저도
              많이 배우고 발전했답니다. 수익도 물론 얻었구요.
            </p>
          </div>
          <div className={`${reviewsCard}`}>
            <div className='card-profile mb-3 flex'>
              <img src='public\images\review-profile.png' alt='review-profile' />
              <div className='card-profile-text ml-2'>
                <p className='font-semibold text-black-b2'>고OO</p>
                <p className='text-[15px]'>사이트 이용자</p>
              </div>
            </div>
            <p className={`${reviewDetails}`}>
              필요한 사이트만 한 눈에 모아 보니까 너무 좋아요. 검색해도 맨날 광고글만 나왔었는데, 이제는 필요한게 생기면
              올디부터 찾아요
            </p>
          </div>
          <div className={`${reviewsCard}`}>
            <div className='card-profile mb-3 flex'>
              <img src='public\images\review-profile.png' alt='review-profile' />
              <div className='card-profile-text ml-2'>
                <p className='font-semibold text-black-b2'>갈OO</p>
                <p className='text-[15px]'>사이트 이용자</p>
              </div>
            </div>
            <p className={`${reviewDetails}`}>
              예전에는 이렇게 재미난 툴이나 신기한 정보가 많은지 몰랐어요. 올디를 이용한 후 많은 것들을 새롭게
              배웠습니다.
            </p>
          </div>
          <div className={`${reviewsCard}`}>
            <div className='card-profile mb-3 flex'>
              <img src='public\images\review-profile.png' alt='review-profile' />
              <div className='card-profile-text ml-2'>
                <p className='font-semibold text-black-b2'>하OO</p>
                <p className='text-[15px]'>사이트 이용자</p>
              </div>
            </div>
            <p className={`${reviewDetails}`}>
              올디덕분에 원하는 키워드의 웹사이트를 손쉽게 이용할 수 있었습니다. 간단한 검색 기능과 정확한 결과 덕분에
              시간을 절약할 수 있었습니다. 강력히 추천합니다!
            </p>
          </div>
          <div className={`${reviewsCard}`}>
            <div className='card-profile mb-3 flex'>
              <img src='public\images\review-profile.png' alt='review-profile' />
              <div className='card-profile-text ml-2'>
                <p className='font-semibold text-black-b2'>안OO</p>
                <p className='text-[15px]'>사이트 오너</p>
              </div>
            </div>
            <p className={`${reviewDetails}`}>
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
