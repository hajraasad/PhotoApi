import axios from "axios";
import { useState } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';


const Main = () => {
  const [categories, setCategories] = useState([]);
  const [value, setValue] = useState("");
  const [item, setItem] = useState([]);
  const [flag, setFlag] = useState(false);
  const [page, setPage]=useState(1)

  let id1 = "nyJhH8BmGYE";
  let id2 = "gFSyxW_apvY";
  let id3 = "11531243";
  let id4 = "780010";

  const getPhotosCategory = (id) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `https://api.unsplash.com/collections/${id}/photos?client_id=DxLC6dz1YpRnYGEtN_i3VhClWCg0gaOCqy08lW5qUfo`
        )
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const getSearchItem = (value) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `https://api.unsplash.com/search/photos?client_id=DxLC6dz1YpRnYGEtN_i3VhClWCg0gaOCqy08lW5qUfo&query=${value}&page=${page}`
        )
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const searchItem = async () => {
    const response = await getSearchItem(value).catch((error) => {
      console.log(error);
    });
    if (response) {
      //setItem(response.data.results);
      let list=[...item,...response.data.results]
      setItem(list);
      setPage(page+1)
    } else {
      console.log("error");
    }
  };

  const fetchCategoryData = async (id) => {
    if (!flag) {
      const response = await getPhotosCategory(id).catch((error) => {
        console.log(error);
      });
      if (response) {
        if (response) {
          setCategories(response.data);
          setFlag(true);
        } else {
          console.log("error");
        }
      }
    } else {
      setCategories([]);
      setFlag(false);
    }
  };

  const onClear = () => {
    setItem([]);
    setPage(1)
  };

  const handleKeyDown=(event)=> {
    if(event.key === "Enter") { 
      setPage(1)
      searchItem()
  }
}

  return (
    <div>

      <input value={value} onChange={(e) => { setValue(e.target.value)}} onKeyDown={(e)=>{handleKeyDown(e)}}/>

      <button onClick={() => searchItem()}>Search</button>
      <button type="button" onClick={onClear}>
        clear search
      </button>

      <button
        onClick={() => {
          fetchCategoryData(id1);
        }}
      >
        Category1
      </button>
      <button
        onClick={() => {
          fetchCategoryData(id2);
        }}
      >
        category2
      </button>
      <button
        onClick={() => {
          fetchCategoryData(id3);
        }}
      >
        category3
      </button>
      <button
        onClick={() => {
          fetchCategoryData(id4);
        }}
      >
        category4
      </button>

      {categories?.map((item) => {
        return (
          <div>
            <img src={`${item.urls.thumb}`} />
            <p>Description: {item.alt_description}</p>
          </div>
        );
      })}


   <InfiniteScroll
    next={searchItem}
    hasMore={true} 
    dataLength={item.length}
    height={500}
    loader={<h4>Loading...</h4>}

   >
      {item?.map((object) => {
        return (
          <div>
            <img src={`${object.urls.thumb}`} />
            <p>Description: {object.description}</p>
          </div>
        );
      })}
  
  </InfiniteScroll>
    </div>
   
  );
    }
export default Main;
