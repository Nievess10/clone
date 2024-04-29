import Navbar from './Navbar';
import './Create.css';
import { supabase } from '/home/nievess10/Documents/finalproject2/final-project-Nievess10-1/final/src/client.js';

const Edit = ({
  allInputs,
  onInput,
  allPosts,
  resetInput,
  editId,
  search,
  onSearch,
}) => {

  const editPost = async () => {
    const { data, error } = await supabase
      .from("Posts")
      .update({
        title: allInputs[0],
        content: allInputs[1],
        image: allInputs[2],
      })
      .eq("id", editId);
    alert('Post Updated!');
    onInput();
    allPosts();
  };

  return (
    <>
      <header>
        <Navbar
          onReset={resetInput}
          searchInput={search}
          handleSearch={onSearch}
        />
      </header>
      <section id="form">
        <h1>Edit Post</h1>
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
        <button name="add-button" onClick={editPost}>
          Edit Post
        </button>
      </section>
    </>
  );
};

export default Edit;
