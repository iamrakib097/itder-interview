// Courses.js
import { useCourses } from "./useCourses";
import { useState } from "react";
import Loading from "../../Utils/Loading";
import { useCart } from "../../context/CartContext";
import toast from "react-hot-toast"; 

const ITEMS_PER_PAGE = 3; 

const Courses = () => {
  const { isLoading, courses, error } = useCourses();
  const [currentPage, setCurrentPage] = useState(1);
  const { addCourseToCart, cartItems } = useCart(); 

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  const totalPages = Math.ceil(courses.courseData.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCourses = courses.courseData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleAddToCart = (course) => {
    if (cartItems.length > 0) {
      toast.error("You can only add one course to the cart at a time!", {
        duration: 4000,
        position: "top-center",
      });
    } else {
      addCourseToCart(course);
      toast.success(`${course.course_name} added to cart!`, {
        duration: 4000,
        position: "top-center",
      });
    }
  };

  return (
    <div className="m-mt_16px">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <div className="relative">
              <img
                className="object-cover h-48 w-full"
                src={course.photo}
                alt={course.course_name}
              />
              <div className="absolute top-0 left-0 p-2">
                <h3 className="text-white text-xl font-bold">
                  {course.course_name}
                </h3>
              </div>
            </div>
            <div className="p-4">
              <h2 className="text-gray-800 text-lg font-semibold mb-2">
                {course.course_name}
              </h2>
              <div className="flex items-center justify-between mb-4">
                <span className="flex text-blue-500 text-md">★★★★★</span>
                <span className="ml-2 text-gray-600 text-md font-bold">
                  {course.trainer_data.name || "Unknown Trainer"}
                </span>
              </div>
              <p className="text-gray-600 text-md mb-4">
                Course Details{" "}
                <span className="text-blue-500">Show Details</span>
              </p>
              <hr />
              <div className="mt-4 flex justify-between items-center">
                <div>
                  <span className="line-through text-gray-400 text-sm">
                    Tk {course.regular_price} (regular price from Api)
                  </span>
                  <span className="text-green-600 text-md font-bold ml-2">
                    -
                    {(
                      ((course.regular_price - course.discount_price) /
                        course.regular_price) *
                      100
                    ).toFixed(0)}
                    %
                  </span>
                  <span className="text-black text-lg font-bold ml-2">
                    Tk {course.discount_price}
                  </span>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleAddToCart(course)}
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

     
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="mx-4 inline-flex items-center justify-center">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Courses;
