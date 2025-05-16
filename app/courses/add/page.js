"use client";
import { useState } from "react";

export default function AddCourse() {
  const [title, setTitle] = useState("");
  const [modules, setModules] = useState([
    {
      id: 1,
      title: "",
      description: "",
      lessons: [{ title: "", content: "" }],
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAddModule = () => {
    setModules([
      ...modules,
      {
        id: modules.length + 1,
        title: "",
        description: "",
        lessons: [{ title: "", content: "" }],
      },
    ]);
  };

  const handleAddLesson = (moduleIndex) => {
    const newModules = [...modules];
    newModules[moduleIndex].lessons.push({ title: "", content: "" });
    setModules(newModules);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, modules }),
      });

      if (res.ok) {
        alert("Course created successfully!");
        // Reset form after successful submission
        setTitle("");
        setModules([
          {
            id: 1,
            title: "",
            description: "",
            lessons: [{ title: "", content: "" }],
          },
        ]);
      } else {
        const errorData = await res.json();
        setError(errorData.error || "Failed to create course");
      }
    } catch (err) {
      setError("An error occurred while creating the course");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Course</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          className="border p-2 w-full mb-4"
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {modules.map((mod, modIdx) => (
          <div key={modIdx} className="border p-4 mb-4 bg-gray-50">
            <input
              placeholder="Module Title"
              className="border p-2 w-full mb-2"
              value={mod.title}
              onChange={(e) => {
                const m = [...modules];
                m[modIdx].title = e.target.value;
                setModules(m);
              }}
              required
            />
            <input
              placeholder="Module Description"
              className="border p-2 w-full mb-2"
              value={mod.description}
              onChange={(e) => {
                const m = [...modules];
                m[modIdx].description = e.target.value;
                setModules(m);
              }}
              required
            />

            {mod.lessons.map((lesson, lessonIdx) => (
              <div key={lessonIdx} className="mb-2">
                <input
                  placeholder="Lesson Title"
                  className="border p-2 w-full mb-1"
                  value={lesson.title}
                  onChange={(e) => {
                    const m = [...modules];
                    m[modIdx].lessons[lessonIdx].title = e.target.value;
                    setModules(m);
                  }}
                  required
                />
                <textarea
                  placeholder="Lesson Content"
                  className="border p-2 w-full"
                  value={lesson.content}
                  onChange={(e) => {
                    const m = [...modules];
                    m[modIdx].lessons[lessonIdx].content = e.target.value;
                    setModules(m);
                  }}
                  required
                />
              </div>
            ))}

            <button
              type="button"
              className="text-sm text-blue-600"
              onClick={() => handleAddLesson(modIdx)}
            >
              + Add Lesson
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddModule}
          className="bg-gray-200 px-4 py-2 mr-2"
        >
          + Add Module
        </button>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Course"}
        </button>
      </form>
    </div>
  );
}
