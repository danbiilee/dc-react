import React, { useCallback, useEffect, useState } from 'react';
import styles from './app.module.css';
import SearchHeader from './components/search_header/search_header';
import VideoDetail from './components/video_detail/video_detail';
import VideoList from './components/video_list/video_list';

/* 
  ๐ฉ๐ฉ๐ฉ ๊ณ ์น  ์  
  1. api_key ์จ๊น ์ฒ๋ฆฌ
  2. ๋คํธ์ํฌ ํต์  ๋ก์ง ๋ถ๋ฆฌ 
    - class์ ํต์ ์ ๊ดํ ๋ก์ง์ ๋ชจ์๋๊ณ , ํ์ํ  ๋ ์ปดํฌ๋ํธ์ ์ฃผ์(dependency injection)
    - unit test๋ฅผ ํด์ผํ  ๊ฒฝ์ฐ, ํ์คํธ๋ฅผ ํ  ๋๋ง๋ค ๋คํธ์ํฌ ํต์ ์ด ๋์ด์ผํ๋ ๊ฒ์ ์ต์! 
      -> testํ  ๋ mock data๊ฐ ๋ค์ด์๋ class๋ฅผ ์ ๋ฌ
  
  ๐ก ๊ฒฐ๋ก : MVC ํจํด์ View์ ์ถฉ์คํ (๋ฉ์ฒญํ) React Component ๋ง๋ค๊ธฐ
*/
function App({ youtube }) {
  const [videos, setVideos] = useState([]);
  const [selecteVideo, setSelecteVideo] = useState(null);

  const selectVideo = video => setSelecteVideo(video);

  /* 
    ๐ก useCallback dependency
    - ์ ๋ฌX: ๋งค๋ฒ ์๋กญ๊ฒ ์์ฑ
    - ๋น ๋ฐฐ์ด: ํ ๋ฒ๋ง ์์ฑ
    - ๋ฐฐ์ด: ๋ฐฐ์ด ์์ ์ ๋ฌํ ๊ฐ์ด ๋ฐ๋ ๋๋ง๋ค ์์ฑ

    โ  useCallback ์ฃผ์์ 
    - ํ ๋ฒ ๋ง๋ค๋ฉด ๋ฉ๋ชจ๋ฆฌ์ ๊ณ์ ๋ณด๊ดํ๋ฏ๋ก ๋ฉ๋ชจ๋ฆฌ์ ์ํฅ์ ์ค
      -> ์ ๋ง ํ์ํ  ๋๋ง ์ฐ๊ธฐ! 
    - ํ์ ์๋ ๊ฒฝ์ฐ: ํด๋น ์ฝ๋ฐฑํจ์๊ฐ ์์ ์ปดํฌ๋ํธ์ props๋ก ์ ๋ฌ๋๋ ๊ฒ ์๋๋ผ ๊ณง๋ฐ๋ก html ํ๊ทธ์ ์ฐ์ด๋ ๊ฒฝ์ฐ 
  
  */
  const search = useCallback(
    query => {
      /* 
      โ ๊ธฐ๋ฅ ์ถ๊ฐ
      - ๋ก๋ฉ ์คํผ๋ ๋ณด์ด๊ธฐ       
      - error state ์ถ๊ฐํ๊ธฐ
    */
      youtube
        .search(query) //
        .then(videos => {
          setVideos(videos);
          setSelecteVideo(null); // โ ๊ฒ์ ์ ๋ค์ grid ๋ชฉ๋ก์ผ๋ก ๋์๊ฐ๊ธฐ
        });
    },
    [youtube]
  );

  useEffect(() => {
    youtube
      .mostPopular() //
      .then(videos => setVideos(videos));

    /* 
      โ  Warning
      React Hook useEffect has a missing dependency: 'youtube'. 
      Either include it or remove the dependency array  react-hooks/exhaustive-deps
      -> ์ด ํ๋ก์ ํธ์์๋ youtube props๊ฐ ๋ฐ๋ ์ผ๋, ๋ฐ๋์ด๋ ์๋ฐ์ดํธ ๋์ด์ผ ํ  ์ด์ ๊ฐ ์์ง๋ง
      ๋ง์ฝ, ์ ํ๋ธ ํด๋ผ์ด์ธํธ๊ฐ ๋ฐ๋๋ค๋ฉด ์๋ก์ด ๋ฐ์ดํฐ๋ฅผ ๋ฐ์์์ผ ํ  ์๋ ์์ผ๋ฏ๋ก dependency์ ์ถ๊ฐ
    */
  }, [youtube]);

  return (
    <div className={styles.app}>
      <SearchHeader onSearch={search} />
      <section className={styles.content}>
        {selecteVideo && (
          <div className={styles.detail}>
            <VideoDetail video={selecteVideo} />
          </div>
        )}
        {/* ๋ฆฌ์กํธ ์ปดํฌ๋ํธ์๋ className์ ์ง์ ํ  ์ ์์. ์คํ์ผ๋ง์ด ํ์ํ๋ฉด ๊ตฌ์กฐ์ ์ผ๋ก ํ๊ทธ ์ถ๊ฐ */}
        <div className={styles.list}>
          <VideoList
            videos={videos}
            onVideoClick={selectVideo}
            display={selecteVideo ? 'list' : 'grid'}
          />
        </div>
      </section>
    </div>
  );
}

export default App;
