import { Button, Select, TextInput } from "flowbite-react";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostCard from "../Component/PostCard";
import ArticlesList from "../Component/ArticlesList";

export default function Search() {
  const [sideBarData, setSideBarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "uncategorized",
  });
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");
    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSideBarData({
        ...sideBarData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
      });
    }
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const searchQuery = urlParams.toString();
        const result = await fetch(`/api/post/getposts?${searchQuery}`);
        const data = await result.json();
        if (result.ok) {
          setLoading(false);
          setPosts(data.posts);
          if (data.posts.length === 9) {
            setShowMore(true);
          } else {
            setShowMore(false);
          }
        } else {
          setLoading(false);
          return;
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSideBarData({ ...sideBarData, searchTerm: e.target.value });
    }
    if (e.target.id === "sort") {
      const order = e.target.value || "desc";
      setSideBarData({ ...sideBarData, sort: order });
    }
    if (e.target.id === "category") {
      const category = e.target.value || "uncategorized";
      setSideBarData({ ...sideBarData, category });
    }
  };
  //   console.log(sideBarData);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", sideBarData.searchTerm);
    urlParams.set("sort", sideBarData.sort);
    urlParams.set("category", sideBarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore=async()=>{
    const numberOfPosts=posts.length;
    const startIndex=numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery=urlParams.toString();

    try {
        const result=await fetch(`/api/post/getposts?${searchQuery}`);
        const data=await result.json();
        if(result.ok){
            setPosts([...posts,...data.posts]);
            if(data.posts.length===9){
                setShowMore(true);
            }
            else{
                setShowMore(false);
            }
        }
        
    } catch (error) {
        console.log(error);
        
    }
   
  }
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <TextInput
              placeholder="Search..."
              id="searchTerm"
              type="text"
              value={sideBarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">Sort:</label>
            <Select onChange={handleChange} id="sort" value={sideBarData.sort}>
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">Category:</label>
            <Select
              onChange={handleChange}
              id="category"
              value={sideBarData.category}
            >
              <option value="uncategorized">Uncategorized</option>
              <option value="reactjs">React.js</option>
              <option value="nodejs">Node.js</option>
              <option value="javascript">JavaScript</option>
              <option value="singlestore">Singlestore</option>
            </Select>
          </div>
          <Button type="submit" gradientDuoTone="purpleToPink" outline>
            Apply Filter
          </Button>
        </form>
      </div>
      <div className="w-full">
        <h1 className="text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-2">
          Post Results:
        </h1>
        <div className="p-7 flex flex-col">
          {!loading && posts.length === 0 && (
            <p className="text-xl text-gray-500">No Posts Found.</p>
          )}
          {loading && <p className="text-xl text-gray-500">Loading...</p>}
          {!loading&&posts &&
            posts.map((post) => <ArticlesList key={post._id} post={post} />)}
            {showMore&&(
                <button onClick={handleShowMore} className="text-teal-500 text-lg hover:underline p-7 w-full">
                    Show More
                </button>
            )

            }
        </div>
      </div>
    </div>
  );
}
