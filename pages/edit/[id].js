import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";

function EditPage() {
  const router = useRouter();
  const { id } = router.query;
  const [item, setItem] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/posts/${id}`);
      const data = await response.json();
      setItem(data.data);
    }
    if (id) {
      fetchData();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault(); // Previne comportamentul default al formularului
    const response = await fetch(`/api/update/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });

    if (response.ok) {
      setIsUpdated(true);
    } else {
      const errorData = await response.json();
      console.error("Update failed:", errorData);
    }
  };

  if (isUpdated) {
    return (
      <p>
        Update successful! <Link href="/">Return to home</Link>
      </p>
    );
  }

  return item ? (
    <div>
      <h1>Edit Item {item._id}</h1>
      <form onSubmit={handleUpdate}>
        <div>
          <label htmlFor="name_roue">Name:</label>
          <input
            type="text"
            id="name_roue"
            name="name_roue"
            value={item.name_roue || ""} // Asigură-te că valoarea nu este undefined
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="localisation">Location:</label>
          <input
            type="text"
            id="localisation"
            name="localisation"
            value={item.localisation || ""} // Asigură-te că valoarea nu este undefined
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  ) : (
    <p>Loading...</p>
  );
}

export default EditPage;
