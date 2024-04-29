import Navbar from './Navbar';
import './Create.css';
import { supabase } from '/home/nievess10/Documents/finalproject2/final-project-Nievess10-1/final/src/client.js';

const Create = ({
  allInputs,
  onInput,
  allPosts,
  resetInput,
  search,
  onSearch,
}) => {

  const addPost = async () => {
    const { data, error } = await supabase
      .from("Posts")
      .insert([
        { title: allInputs[0], content: allInputs[1], image: allInputs[2] },
      ])
      .single(); // This ensures you're handling a single insertion as a transaction

    if (!error) {
      alert("Post Created!");
      onInput(); // Clear inputs if needed
      allPosts(); // Refetch posts
    } else {
      alert("Error creating post: " + error.message);
    }
  };

  return (
    <>
      <header>
        <Navbar
          onReset={resetInput}
          handleSearch={onSearch}
          searchInput={search}
        />
      </header>
      <section id="form">
        <h1>Create A Post</h1>
        <div className="inputs">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={allInputs[0]}
            onChange={onInput}
          ></input>
          <input
            type="text"
            name="content"
            placeholder="Content"
            value={allInputs[1]}
            onChange={onInput}
          ></input>
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={allInputs[2]}
            onChange={onInput}
          ></input>
        </div>
        <button name="add-button" onClick={addPost}>
          Add Post
        </button>
      </section>
    </>
  );
};

export default Create;
