"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
function Formulario({ params }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (params.id) {
    fetch(`/api/tasks/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title);
        setDescription(data.description);
      });
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (params.id) {
      const res =await fetch(`/api/tasks/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });
      const data = await res.json();
      console.log(data)
    } else {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });
      const data = await res.json();
    }
    router.refresh();
    router.push(`/`);
  };

  return (
    <div className="container w-full h-screen flex flex-col gap-4 justify-center items-center">
      <h1 className="text-2xl">Formulario</h1>
      <form
        onSubmit={onSubmit}
        className="flex flex-col max-w-md mx-auto gap-4 text-black"
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          name="title"
          type="text"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          name="description"
          rows={3}
          id=""
        ></textarea>
        <button type="submit" className="bg-blue-500 ">
          Submit
        </button>

        {
          params.id && (
            <button
              className="bg-red-500"
              onClick={async () => {
                const res = await fetch(`/api/tasks/${params.id}`, {
                  method: "DELETE",
                });
                const data = await res.json();
                router.refresh();
                router.push(`/`);
              }}
              type="button"
            >
              Delete
            </button>
          )
        }
      </form>
    </div>
  );
}

export default Formulario;
