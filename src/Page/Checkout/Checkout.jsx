import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cartItems, removeCourseFromCart, updateCourseQuantity } = useCart();
  console.log(cartItems);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  const onSubmit = async (formData) => {
    const cartItem = cartItems[0];
    const formattedDate = new Date().toISOString().split("T")[0];
    const orderData = new FormData();
    orderData.append("course_id", cartItem.id || "");
    orderData.append("admission_date", formattedDate || "");
    orderData.append("name", formData.fullName || "");
    orderData.append("father_name", formData.parentName || "");
    orderData.append("father_phone_no", formData.parentNumber || "");
    orderData.append("school_collage_name", formData.school || "");
    orderData.append("job_title", formData.jobInfo || "");
    orderData.append("email", formData.email || "");
    orderData.append("gender", formData.gender.toLowerCase() || "");
    orderData.append("present_address", formData.presentAddress || "");
    orderData.append("permanent_address", formData.permanentAddress || "");
    orderData.append("nid_no", formData.nid || "");
    orderData.append("phone_no", formData.mobile || "");
    orderData.append("local_guardian_name", formData.guardianName || "");
    orderData.append("local_guardian_phone_no", formData.guardianNumber || "");
    orderData.append("date_of_birth", formData.dob || "");
    orderData.append("blood_group", formData.bloodGroup || "");
    orderData.append("course_fee", cartItem.discount_price || "0");
    orderData.append("course_qty", cartItem.quantity || "1");
    orderData.append(
      "total_course_fee",
      (cartItem.discount_price * cartItem.quantity).toString() || "0"
    );
    orderData.append(
      "sub_total_course_fee",
      (cartItem.discount_price * cartItem.quantity).toString() || "0"
    );
    orderData.append("discount_course_fee", "0");

    if (formData.profileImage && formData.profileImage.length > 0) {
      orderData.append("photo", formData.profileImage[0]);
    } else {
      orderData.append("photo", cartItem.photo || "");
    }

    try {
      const response = await fetch("https://itder.com/api/course-purchase", {
        method: "POST",
        body: orderData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Order successfully submitted:", result);

        const plainOrderData = {};
        orderData.forEach((value, key) => {
          plainOrderData[key] = value;
        });

        const orderData1 = { orderData: plainOrderData, cartItems };
        navigate("/order-details", { state: orderData1 });
      } else {
        const errorText = await response.text();
        console.error("Error submitting order:", errorText);
      }
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.discount_price * item.quantity,
    0
  );

  return (
    <div className="mt-5 border mx-2">
      <div className="bg-[#6f42c1] text-white p-6 text-center mb-5">
        <h2 className="text-5xl font-bold">Trainee Admission Form</h2>
      </div>
      <form
        className="bg-white shadow-md rounded-lg p-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-section">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="fullName"
                className="block font-semibold text-base mb-2"
              >
                Full Name:
              </label>
              <input
                type="text"
                id="fullName"
                className="w-full border border-gray-300 rounded-md p-2"
                {...register("fullName", { required: true })}
              />
              {errors.fullName && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div>
              <label
                htmlFor="formNo"
                className="block font-semibold text-base mb-2"
              >
                Form No:
              </label>
              <input
                type="text"
                id="formNo"
                className="w-full border border-gray-300 rounded-md p-2"
                {...register("formNo", { required: true })}
              />
              {errors.formNo && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="parentName"
                className="block font-semibold text-base mb-2"
              >
                Father/Mother Name:
              </label>
              <input
                type="text"
                id="parentName"
                className="w-full border border-gray-300 rounded-md p-2"
                {...register("parentName", { required: true })}
              />
              {errors.parentName && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div>
              <label
                htmlFor="parentNumber"
                className="block font-semibold text-base mb-2"
              >
                Number:
              </label>
              <input
                type="text"
                id="parentNumber"
                className="w-full border border-gray-300 rounded-md p-2"
                {...register("parentNumber", { required: true })}
              />
              {errors.parentNumber && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="school"
                className="block font-semibold text-base mb-2"
              >
                School/College:
              </label>
              <input
                type="text"
                id="school"
                className="w-full border border-gray-300 rounded-md p-2"
                {...register("school", { required: true })}
              />
              {errors.school && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div>
              <label
                htmlFor="jobInfo"
                className="block font-semibold text-base mb-2"
              >
                Job Information:
              </label>
              <input
                type="text"
                id="jobInfo"
                className="w-full border border-gray-300 rounded-md p-2"
                {...register("jobInfo")}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="email"
                className="block font-semibold text-base mb-2"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                className="w-full border border-gray-300 rounded-md p-2"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div>
              <label
                htmlFor="gender"
                className="block font-semibold text-base mb-2"
              >
                Gender:
              </label>
              <select
                id="gender"
                className="w-full border border-gray-300 rounded-md p-2"
                {...register("gender", { required: true })}
              >
                <option value="" disabled selected>
                  Select Gender
                </option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Others">Others</option>
              </select>
              {errors.gender && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="presentAddress"
                className="block font-semibold text-base mb-2"
              >
                Present Address:
              </label>
              <textarea
                id="presentAddress"
                className="w-full border border-gray-300 rounded-md p-2"
                {...register("presentAddress", { required: true })}
              />
              {errors.presentAddress && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div>
              <label
                htmlFor="permanentAddress"
                className="block font-semibold text-base mb-2"
              >
                Permanent Address:
              </label>
              <textarea
                id="permanentAddress"
                className="w-full border border-gray-300 rounded-md p-2"
                {...register("permanentAddress", { required: true })}
              />
              {errors.permanentAddress && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="nid"
                className="block font-semibold text-base mb-2"
              >
                NID Number:
              </label>
              <input
                type="text"
                id="nid"
                className="w-full border border-gray-300 rounded-md p-2"
                {...register("nid", { required: true })}
              />
              {errors.nid && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div>
              <label
                htmlFor="mobile"
                className="block font-semibold text-base mb-2"
              >
                Mobile No:
              </label>
              <input
                type="text"
                id="mobile"
                className="w-full border border-gray-300 rounded-md p-2"
                {...register("mobile", { required: true })}
              />
              {errors.mobile && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="guardianName"
                className="block font-semibold text-base mb-2"
              >
                Local Guardian’s Name:
              </label>
              <input
                type="text"
                id="guardianName"
                className="w-full border border-gray-300 rounded-md p-2"
                {...register("guardianName", { required: true })}
              />
              {errors.guardianName && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div>
              <label
                htmlFor="guardianNumber"
                className="block font-semibold text-base mb-2"
              >
                Local Guardian’s Number:
              </label>
              <input
                type="text"
                id="guardianNumber"
                className="w-full border border-gray-300 rounded-md p-2"
                {...register("guardianNumber", { required: true })}
              />
              {errors.guardianName && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div>
              <label
                htmlFor="dob"
                className="block font-semibold text-base mb-2"
              >
                Date of Birth:
              </label>
              <input
                type="date"
                id="dob"
                className="w-full border border-gray-300 rounded-md p-2"
                {...register("dob", { required: true })}
              />
              {errors.dob && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
          </div>

          {/* Blood Group */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="bloodGroup"
                className="block font-semibold text-base mb-2"
              >
                Blood Group:
              </label>
              <select
                id="bloodGroup"
                className="w-full border border-gray-300 rounded-md p-2"
                {...register("bloodGroup", { required: true })}
              >
                <option value="" disabled selected>
                  Select Blood Group
                </option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
              {errors.bloodGroup && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="profileImage"
              className="block font-semibold text-base mb-2"
            >
              Upload Profile Image:
            </label>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              className="w-full border border-gray-300 rounded-md p-2"
              {...register("profileImage", { required: true })}
            />
            {errors.profileImage && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
        </div>

        <div className="m-mt_16px">
          <h1 className="text-sm text-start md:text-text_xl lg:py-0 font-bold">
            Cart
          </h1>
          <div className="pt-p_16px">
            <div className="lg:flex items-start gap-3">
              <div className="w-full lg:w-[58%] bg-white border-2">
                <table className="overflow-x-auto w-full">
                  <thead>
                    <tr className="border-b-4 border-gray-300">
                      <th className="text-[14.4px] w-6/12 font-bold p-[7px] text-black">
                        Course
                      </th>
                      <th className="text-[14.4px] font-bold p-[7px] text-black">
                        Price
                      </th>
                      <th className="text-[14.4px] font-bold p-[7px] text-black">
                        Quantity
                      </th>
                      <th className="text-[14.4px] font-bold p-[7px] text-black">
                        Sub Total
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {cartItems.map((item) => (
                      <tr
                        key={item.id}
                        className="border-b border-gray-300 overflow-x-auto"
                      >
                        <td>
                          <div className="flex items-center justify-center">
                            <div className="w-[20%] text-center flex items-center justify-center">
                              <RiDeleteBin5Line
                                className="text-xl hover:text-footer_color cursor-pointer"
                                onClick={() => removeCourseFromCart(item.id)} // Handle remove course
                              />
                            </div>
                            <div className="flex flex-col text-center justify-center items-center py-2 w-[80%]">
                              <img
                                className="h-[40px] w-[70px]"
                                src={item.photo}
                                alt={item.course_name}
                              />
                              <p className="text-[14.4px] px-[7px] text-center flex">
                                {item.course_name}{" "}
                                <span className="hidden lg:flex">
                                 
                                </span>
                              </p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p className="text-[14.4px] font-bold p-[7px] text-black text-center">
                            Tk {item.discount_price}
                          </p>
                        </td>
                        <td>
                          <div className="flex justify-center">
                            <div className="border">
                              <button
                                className="px-4 w-[30px] font-bold font_standard my-1.5"
                                onClick={(e) => {
                                  e.preventDefault();
                                  updateCourseQuantity(
                                    item.id,
                                    Math.max(item.quantity - 1, 1)
                                  );
                                }} // Decrease quantity
                              >
                                -
                              </button>
                            </div>
                            <div className="border-y">
                              <input
                                type="number"
                                value={item.quantity}
                                className="font-bold w-[30px] lg:w-[60px] font_standard px-2 text-center mx-auto h-full"
                                readOnly
                              />
                            </div>
                            <div className="border">
                              <button
                                className="px-4 w-[30px] font-bold font_standard my-1.5"
                                onClick={(e) => {
                                  e.preventDefault();
                                  updateCourseQuantity(
                                    item.id,
                                    item.quantity + 1
                                  );
                                }} // Increase quantity
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p className="text-[14.4px] font-bold p-[7px] text-black text-center">
                            Tk{" "}
                            {(item.discount_price * item.quantity).toFixed(2)}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="lg:w-[41%] bg-white border-2">
                <div className="px-[30px]">
                  <h2 className="font-bold text-start text-text_medium pt-2 pb-1 border-b-2 border-black">
                    Cart Summary
                  </h2>
                  <div className="py-3 flex justify-between border-b border-gray-300">
                    <p className="text-black font-bold">Total Price</p>
                    <p className="text-black font-bold">
                      Tk {totalPrice.toFixed(2)}
                    </p>
                  </div>
                  <Link
                    to={`/order-details`}
                    onClick={handleSubmit(onSubmit)}
                    className="font-medium text-black mb-2 border-2 hover:bg-[#D2C5A2] duration-300 py-2 px-4 block text-center mx-auto w-full"
                  >
                    Submit
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
