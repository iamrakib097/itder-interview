import { useLocation } from "react-router-dom";

const OrderDetails = () => {
  const location = useLocation();
  const { orderData, cartItems } = location.state || {}; // Destructure passed data
  const order=orderData;
  const cart=cartItems;
  return (
    <div className="m-mt_16px">
      <div className="w-full flex flex-col lg:flex-row items-start justify-center h-full gap-2">
        <div className="bg-white lg:p-p_30px w-full">
          <div className="text-center flex flex-col justify-center items-center">
            <p className="text-xl font-bold">Order Information</p>
            <p className="p-3 rounded-md lg:my-2 my-1 w-fit border bg-[#D2C5A2] font-bold text-lg">
              Order Id:{" "}
              <span className="font-semibold">
                {order?.orderId || Math.floor(Math.random() * 100) + 1}
              </span>
            </p>
          </div>

          <div className="w-full border flex flex-col md:flex-row md:items-start md:mt-4 mt-3 bg-[#D2C5A2] rounded-md p-4">
            {/* Left column for customer details */}
            <div className="md:text-base text-sm flex-1 font-semibold md:border-r-2 md:border-black md:pr-10">
              <p className="font-bold md:mb-4 w-full">Customer Information</p>
              <div className="space-y-1 w-full">
                <div className="flex items-center justify-between">
                  <p>Admission Date :</p>
                  <p>{order?.admission_date || "N/A"}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Full Name :</p>
                  <p className="text-start">{order?.name || "N/A"}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Gender :</p>
                  <p className="text-start">{order?.gender || "N/A"}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Phone Number :</p>
                  <p className="text-start">{order?.phone_no || "N/A"}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Email :</p>
                  <p>{order?.email || "N/A"}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>School/College :</p>
                  <p>{order?.school_collage_name || "N/A"}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>NID Number :</p>
                  <p>{order?.nid_no || "N/A"}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Present Address :</p>
                  <p className="text-start">
                    {order?.present_address || "N/A"}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Permanent Address :</p>
                  <p>{order?.permanent_address || "N/A"}</p>
                </div>

                <div className="flex items-center justify-between">
                  <p>Blood Group :</p>
                  <p>{order?.blood_group || "N/A"}</p>
                </div>
              </div>
            </div>

            {/* Right column for same customer details (if necessary) */}
            <div className="md:text-base text-sm flex-1 font-semibold md:ml-10 mt-m_medium">
              <p className="font-bold md:mb-4 w-full"></p>
              <div className="space-y-1 w-full">
                <div className="flex items-center justify-between">
                  <p>Father's Name :</p>
                  <p className="text-start">
                    {order?.father_name || "N/A"}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Father's Phone No :</p>
                  <p>{order?.father_phone_no || "N/A"}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Job Title :</p>
                  <p className="text-start">{order?.job_title || "N/A"}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Local Guardian Name :</p>
                  <p>{order?.local_guardian_name || "N/A"}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Local Guardian Phone No :</p>
                  <p className="text-start">
                    {order?.local_guardian_phone_no || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Courses section */}
          <div className="lg:my-8 md:my-6 my-8 px-p_4px">
            <p className="md:my-2 font-semibold">Courses:</p>
            <table className="overflow-x-auto border w-full">
              <thead className="b w-full">
                <tr className="text-sm">
                  <th className="lg:w-20 md:w-16 w-8 py-2 md:py-4 lg:py-6 border">
                    Image
                  </th>
                  <th className="lg:w-72 md:w-64 w-40 py-2 md:py-4 lg:py-6 border">
                    Course Name
                  </th>
                  <th className="lg:w-72 md:w-64 w-40 py-2 md:py-4 lg:py-6 border">
                    Student Name
                  </th>
                  <th className="lg:w-20 md:w-20 w-16 py-2 md:py-4 lg:py-6 border">
                    Quantity
                  </th>
                  <th className="lg:w-20 md:w-20 w-16 py-2 md:py-4 lg:py-6 border text-center">
                    Price
                  </th>
                  <th className="lg:w-20 md:w-20 w-16 py-2 md:py-4 lg:py-6 border text-center">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="md:text-base text-sm font-semibold">
                {cart?.map((item, index) => (
                  <tr key={index}>
                    <td className="border text-center w-10 h-12 px-2">
                      <img
                        className="w-full h-full object-cover mx-auto"
                        src={item.photo}
                        alt={item.course_name}
                      />
                    </td>
                    <td className="lg:py-6 md:py-4 py-2 text-center border">
                      {item.course_name}
                    </td>
                    <td className="lg:py-6 md:py-4 py-2 text-center border">
                      {order?.name}
                    </td>
                    <td className="lg:py-6 md:py-4 py-2 text-center border">
                      {item.quantity}
                    </td>
                    <td className="lg:py-6 md:py-4 py-2 text-center border">
                      Tk {item.discount_price}
                    </td>
                    <td className="lg:py-6 md:py-4 py-2 text-center border">
                      Tk {item.quantity * item.discount_price}
                    </td>
                  </tr>
                )) || (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      No items in the order.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
