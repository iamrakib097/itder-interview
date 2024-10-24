import React, { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import axios from "axios";

const Search = () => {
  const [formNo, setFormNo] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.post(
        "https://itder.com/api/search-purchase-data",
        {
          form_no: formNo,
          phone_no: phoneNo,
        }
      );

      if (response.data.singleCoursePurchaseData) {
        setResults(response.data.singleCoursePurchaseData);
        setError("");
      }
    } catch (err) {
      setError(
        "Failed to fetch results. Please check the form number and phone number."
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col  font-bold items-center justify-center p-4">
      <h1 className="w-[600px] mx-auto mb-4">Search for Purchase Data</h1>


      <div className="relative w-[600px] mx-auto mb-6">
        <input
          type="text"
          placeholder="Form Number"
          className="text-black px-4 py-2 w-full block h-full rounded border mb-2"
          value={formNo}
          onChange={(e) => setFormNo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone Number"
          className="text-black px-4 py-2 w-full block h-full rounded border"
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
        />
        <IoMdSearch
          onClick={handleSearch}
          className="absolute right-4 top-2 text-md text-black cursor-pointer"
        />
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {results && (
        <div className="w-[1000px] mx-auto bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className=" font-semibold text-lg mb-4">Purchase Information</h2>

          <table className="min-w-full bg-white table-auto border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="py-2 px-4 border border-gray-300">Field</th>
                <th className="py-2 px-4 border border-gray-300">Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border border-gray-300">Name</td>
                <td className="py-2 px-4 border border-gray-300">
                  {results.name}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border border-gray-300">Form No</td>
                <td className="py-2 px-4 border border-gray-300">
                  {results.form_no}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border border-gray-300">Phone No</td>
                <td className="py-2 px-4 border border-gray-300">
                  {results.phone_no}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border border-gray-300">
                  Admission Date
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  {results.admission_date}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border border-gray-300">
                  Course Name
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  {results.course_data?.course_name || "N/A"}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border border-gray-300">Course Fee</td>
                <td className="py-2 px-4 border border-gray-300">
                  {results.course_fee}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border border-gray-300">Total Fee</td>
                <td className="py-2 px-4 border border-gray-300">
                  {results.total_course_fee}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border border-gray-300">
                  School/College
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  {results.school_collage_name}
                </td>
              </tr>
            </tbody>
          </table>

          {results.course_data?.photo && (
            <div className="mt-4">
              <h3 className="text-sm font-semibold">Course Image</h3>
              <img
                src={results.course_data?.photo}
                alt={results.course_data?.course_name}
                className="w-32 h-32 mt-2 border rounded"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
