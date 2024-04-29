import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Create from './components/Create';
import Post from './components/Post';
import Edit from './components/Edit';
import './App.css';
import { supabase } from '/home/nievess10/Documents/finalproject2/final-project-Nievess10-1/final/src/client.js';

const App = () => {
  const [inputs, setInputs] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  const handleSearchInput = async (e) => {
    setSearchInput(e.target.value);

    const { data, error } = await supabase
      .from("Posts")
      .select("*")
      .ilike("title", e.target.value);

    if (e.target.value === '') {
      getPosts();
    }

    setPosts(data);
  };

  const getPosts = async (e) => {
    if (e && e.target.name === 'new-button') {
      const { data, error } = await supabase
        .from("Posts")
        .select("*")
        .order("created_date", { ascending: false })
        .order("created_time", { ascending: false });
      setPosts(data);
    } else if (e && e.target.name === 'popular-button') {
      const { data, error } = await supabase
        .from("Posts")
        .select("*")
        .order("upvotes", { ascending: false });
      setPosts(data);
    } else {
      const { data, error } = await supabase
        .from("Posts")
        .select("*")
        .order("id");
      setPosts(data);
    }
  };

  const handleUpvotes = async (e) => {
    const id = e.currentTarget.id;
    const { data, error } = await supabase
      .from("Posts")
      .select("*")
      .eq("id", id);

    const currUpvotes = data[0].upvotes;

    const { newData, newError } = await supabase
      .from("Posts")
      .update({ upvotes: currUpvotes + 1 })
      .eq("id", id);
    setPosts(data);
    getPosts();
  };

  const onInputChange = (e) => {
    let newInputs = [...inputs];

    if (!e || e.currentTarget.id === 'navbar-right') {
      newInputs[0] = '';
      newInputs[1] = '';
      newInputs[2] = '';
      setInputs(newInputs);
      return;
    }

    if (e.target.name === 'title') {
      newInputs[0] = e.target.value;
    } else if (e.target.name === 'content') {
      newInputs[1] = e.target.value;
    } else {
      newInputs[2] = e.target.value;
    }

    setInputs(newInputs);
  };

  const editInput = (e) => {
    const clickedId = e.currentTarget.id.slice(0, 2);
    const postEdited = posts.filter((post) => post.id == clickedId);

    const editInputs = [
      postEdited[0].title,
      postEdited[0].content,
      postEdited[0].image,
    ];

    setInputs(editInputs);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              allPosts={posts}
              sortPosts={getPosts}
              resetInput={onInputChange}
              search={searchInput}
              onSearch={handleSearchInput}
            />
          }
        />
        <Route
          path="/create"
          element={
            <Create
              allInputs={inputs}
              onInput={onInputChange}
              allPosts={getPosts}
              resetInput={onInputChange}
              search={searchInput}
              onSearch={handleSearchInput}
            />
          }
        />
        {posts &&
          posts.map((post) => {
            return (
              <>
                <Route
                  path={`/id${post.id}`}
                  element={
                    <Post
                      postInfo={post}
                      onUpvoteChange={handleUpvotes}
                      allPosts={getPosts}
                      onEdit={editInput}
                      resetInput={onInputChange}
                      search={searchInput}
                      onSearch={handleSearchInput}
                    />
                  }
                />
                <Route
                  path={`/id${post.id}edit`}
                  element={
                    <Edit
                      allInputs={inputs}
                      onInput={onInputChange}
                      allPosts={getPosts}
                      resetInput={onInputChange}
                      editId={post.id}
                      search={searchInput}
                      onSearch={handleSearchInput}
                    />
                  }
                />
              </>
            );
          })}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
