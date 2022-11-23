import React from 'react';
import Axios from 'axios';
import {useState, useEffect} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const App = () => {

  // First method using 'reac-infinite-scroll-component'

  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const loader = <h4>Loading...</h4>;
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    Axios.get(`https://jsonplaceholder.typicode.com/posts?_start=0&_limit=12`).then((response) => {
      setImages(response.data);
    });
  }, []);

  const fetchData = () => {
    setPage(page + 1);
    Axios.get(`https://jsonplaceholder.typicode.com/posts?_start=${page*12}&_limit=12`).then((response) => {
      setImages(images.concat(response.data));
    })
    if ((images[images.length - 1]).id === 100){
      setHasMore(false);
      return;
    }
  };

  return (
    <div className="container text-center">
      <InfiniteScroll dataLength = {images.length} next = {fetchData} hasMore = {hasMore} loader = {loader} scrollThreshold = {"0px"} endMessage={<p style={{ textAlign: 'center' }}><b>Yay! You have seen it all</b></p>} >
        <div className = {"row mx-auto"}>
          {images.map((image) => {
            return (
              <div key = {image.id} className = {"col-sm-4 mt-4"}>
                <div className = {"card mx-auto h-100 w-100"} style = {{width: "18rem"}}>
                  <img className = {"card-img-top"} src = {`https://avatars.dicebear.com/api/avataaars/${image.id}.svg`} alt = {"Not found"} />
                  <div className = {"card-body"}>
                      <h5 className = {"card-title"}>{image.userId}</h5>
                      <p className = {"card-text"}>{image.id}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </InfiniteScroll>
    </div>
  );

  // Second method using normal javascript logic.

  // const [images, setImages] = useState([]);
  // const [page, setPage] = useState(0);
  // const [loader, setLoader] = useState(<h4>Loading...</h4>);

  // useEffect(() => {
  //   Axios.get(`https://jsonplaceholder.typicode.com/posts?_start=${page*12}&_limit=12`).then((response) => {
  //     setImages(images => (images.concat(response.data)));
  //   });
  // }, [page]);

  // window.onscroll = () => {
  //   if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight){
  //     if ((images[images.length - 1]).id === 100){
  //       setLoader(<p style={{ textAlign: 'center' }}><b>Yay! You have seen it all</b></p>);
  //       return;
  //     }
  //     setPage(page + 1);
  //   }
  // }

  // return (
  //   <div className="container text-center">
  //       <div className = {"row mx-auto"}>
  //         {images.map((image) => {
  //           return (
  //             <div key = {image.id} className = {"col-sm-4 mt-4"}>
  //               <div className = {"card mx-auto h-100 w-100"} style = {{width: "18rem"}}>
  //                 <img className = {"card-img-top"} src = {`https://avatars.dicebear.com/api/avataaars/${image.id}.svg`} alt = {"Not found"} />
  //                 <div className = {"card-body"}>
  //                     <h5 className = {"card-title"}>{image.userId}</h5>
  //                     <p className = {"card-text"}>{image.id}</p>
  //                 </div>
  //               </div>
  //             </div>
  //           )
  //         })}
  //       </div>
  //       {loader}
  //   </div>
  // );
}

export default App;