import React, { useEffect } from 'react';
import { useList } from './store/useList';
import { url } from './config/config';

const App = () => {
  let { data, getUser, postUser, deleteUser, deleteImage, modalEdit, setModalEdit, idx, setIdx, putUser, setName, name, desc, setDesc } = useList();

  useEffect(() => {
    getUser();
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("Name", e.target['name'].value);
    formdata.append("Description", e.target["description"].value);
    const files = e.target['files'].files;
    for (let i = 0; i < files.length; i++) {
      formdata.append("Images", files[i]);
    }
      postUser(formdata);
      e.target["name"].value = "";
      e.target["description"].value = "";
      e.target["files"].files = null;
  };

  const handleEdit = () => {
    let obj = {
      name: name,
      description: desc,
      id: idx,
    };
    putUser(obj);
    setModalEdit(false);
  };

  return (
    <>
      {modalEdit && (
        <dialog open className="modalEdit fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <button onClick={() => { setModalEdit(false) }} className="absolute top-2 right-2 text-red-500">x</button>
            <h2 className="text-xl font-semibold mb-4">Edit Item</h2>
            <input
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value) }}
              className="w-full p-2 mb-4 border border-gray-300 rounded-md"
              placeholder="Name"
            />
            <input
              type="text"
              value={desc}
              onChange={(e) => { setDesc(e.target.value) }}
              className="w-full p-2 mb-4 border border-gray-300 rounded-md"
              placeholder="Description"
            />
            <input
              type="file"
              multiple
              className="w-full p-2 mb-4 border border-gray-300 rounded-md"
            />
            <button onClick={handleEdit} className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">Submit</button>
          </div>
        </dialog>
      )}

      <form onSubmit={handleAdd} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Item</h2>
        <input
          type="text"
          name="name"
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
          placeholder="Name"
        />
        <input
          type="text"
          name="description"
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
          placeholder="Description"
        />
        <input
          type="file"
          name="files"
          multiple
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          className="w-full p-3 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          + Add
        </button>
      </form>

      <div className="space-y-6">
        {data?.map((el) => {
          return (
            <div key={el.id} className="bg-[#f3f3f3] p-6 rounded-lg shadow-md w-[40%] max-w-md m-auto ">
              <h3 className="text-lg font-semibold">{el.name}</h3>
              <p className="text-gray-700">{el.description}</p>
              {el?.images?.map((elem) => (
                <div key={elem.id} className="mt-4">
                  <img
                    src={url + `/images/${elem.imageName}`}
                    alt={elem.imageName}
                    className="w-32 h-32 object-cover rounded-md"
                  />
                  <button
                    onClick={() => { deleteImage(elem.id) }}
                    className="mt-2 text-sm text-red-500 hover:text-red-700"
                  >
                    Delete Image
                  </button>
                </div>
              ))}
              <div className="mt-4 flex space-x-4">
                <button
                  onClick={() => { deleteUser(el.id) }}
                  className="px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => { setModalEdit(true); setIdx(el.id); setName(el.name); setDesc(el.description); }}
                  className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Edit
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default App;
